import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '../../protos/user.proto'),
      url: '0.0.0.0:5001',
    },
  });
  await app.listen();
  console.log('Users gRPC microservice running on localhost:5001');
}
bootstrap();
