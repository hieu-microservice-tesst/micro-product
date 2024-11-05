import { Injectable } from '@nestjs/common';
import {  Product, Category } from 'prisma/generated/product';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class ProductService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  // Product methods
  async createProduct(data: { name: string; price: number; stock: number; description: string; categoryId?: number }): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async getAllProducts(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async updateProduct(id: number, data: Partial<Product>): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: number): Promise<Product> {
    return this.prisma.product.delete({ where: { id } });
  }

  // Category
  async createCategory(data: { name: string }): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async getAllCategories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async getCategoryById(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({ where: { id } });
  }

  async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: number): Promise<Category> {
    return this.prisma.category.delete({ where: { id } });
  }
}
