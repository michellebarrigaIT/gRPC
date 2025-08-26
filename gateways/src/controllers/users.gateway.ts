import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import type { Client, ClientGrpc, GrpcMethod, Transport } from '@nestjs/microservices';
import type { CreateUserRequest, UpdateUserRequest, UserServiceClient } from '../proto/user';

@Controller('users')
export class UsersGateway {
  private userService!: UserServiceClient;
  
  constructor(@Inject('USER_PACKAGE') private client: ClientGrpc) {}
  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  @Post()
  createUser(@Body() data: CreateUserRequest){
    return this.userService.createUser(data);
  }

  @Get()
  findAll() {
    return this.userService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne({ id: Number(id) });
  }

  @Put()
  update(@Body() data: UpdateUserRequest) {
    return this.userService.updateUser(data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser( { id: Number(id) } );
  }
}
