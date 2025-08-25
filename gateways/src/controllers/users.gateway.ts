import { Body, Controller, Inject, Post } from '@nestjs/common';
import type { Client, ClientGrpc, GrpcMethod, Transport } from '@nestjs/microservices';
import type { CreateUserRequest, UserServiceClient } from '../proto/user';

@Controller('users')
export class UsersGateway {
  private userService!: UserServiceClient;
  
  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  @Post()
  createUser(@Body() data: CreateUserRequest){
    console.log('Creating user:', data);
    return this.userService.createUser(data);
  }
}
