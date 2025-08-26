import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UsersGateway } from './controllers/users.gateway';
import { TasksGateway } from './controllers/task.gateway';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(__dirname, '../../protos/user.proto'),
          url: '0.0.0.0:5001',
          loader: { keepCase: true },
        },
      },
      {
        name: 'TASK_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'task',
          protoPath: join(__dirname, '../../protos/task.proto'),
          url: '0.0.0.0:5002',
          loader: { keepCase: true },
        },
      },
    ]),
  ],
  controllers: [UsersGateway, TasksGateway],
})
export class AppModule {}
