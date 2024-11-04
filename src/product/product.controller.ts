import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, Category } from 'prisma/generated/product';
import { MessagePattern } from '@nestjs/microservices';
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  // Product
  @Post()
  async createProduct(@Body() data: { name: string; price: number; stock: number; description: string; categoryId?: number }): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number): Promise<Product | null> {
    return this.productService.getProductById(id);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() data: Partial<Product>): Promise<Product> {
    return this.productService.updateProduct(id, data);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<Product> {
    return this.productService.deleteProduct(id);
  }
  @MessagePattern({ cmd: 'get_product' })
  async getProduct(data: { id: number }) {
    return await this.productService.getProductById(data.id);
  }
  // Category
  @Post('category')
  async createCategory(@Body() data: { name: string }): Promise<Category> {
    return this.productService.createCategory(data);
  }

  @Get('category')
  async getAllCategories(): Promise<Category[]> {
    return this.productService.getAllCategories();
  }

  @Get('category/:id')
  async getCategoryById(@Param('id') id: number): Promise<Category | null> {
    return this.productService.getCategoryById(id);
  }

  @Put('category/:id')
  async updateCategory(@Param('id') id: number, @Body() data: Partial<Category>): Promise<Category> {
    return this.productService.updateCategory(id, data);
  }

  @Delete('category/:id')
  async deleteCategory(@Param('id') id: number): Promise<Category> {
    return this.productService.deleteCategory(id);
  }
}
