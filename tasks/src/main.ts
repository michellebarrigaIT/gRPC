import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { TaskModule } from './task/task.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TaskModule, {
    transport: Transport.GRPC,
    options: {
      package: 'task',
      protoPath: join(__dirname, '../../protos/task.proto'),
      url: '0.0.0.0:5002',
    },
  });
  await app.listen();
  console.log('Tasks gRPC microservice running on localhost:5002');
}
bootstrap();
