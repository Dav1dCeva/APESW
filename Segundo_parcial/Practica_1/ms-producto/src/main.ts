import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

require('dotenv').config();

async function bootstrap() {
  const rabbitMQUrl =
    process.env.RABBITMQ_URL || 'amqp://user:pass@localhost:5672';

  console.log('🔗 Conectando a RabbitMQ:', rabbitMQUrl);

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitMQUrl],
      queue: 'ms-producto-queue',
      queueOptions: { durable: true },
    },
  });

  await app.listen();
  console.log('🚀 MS-Producto escuchando mensajes en RabbitMQ');
}
bootstrap();
