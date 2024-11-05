import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product/product.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'product_queue',
      queueOptions: { durable: false },
    },
  });
  app.startAllMicroservices().catch(error => console.error('Microservice error:', error));
  
  await app.listen(3002);
}
bootstrap()