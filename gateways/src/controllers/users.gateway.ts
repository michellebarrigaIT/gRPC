import { Body, Controller, Delete, Get, Inject, InternalServerErrorException, NotFoundException, Param, Post, Put } from '@nestjs/common';
import type { Client, ClientGrpc, GrpcMethod, Transport } from '@nestjs/microservices';
import type { CreateUserRequest, UpdateUserRequest, UserServiceClient } from '../proto/user';
import { catchError, lastValueFrom } from 'rxjs';

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
  async findOne(@Param('id') id: string) {
    return lastValueFrom(
      this.userService.findOne({ id: Number(id) }).pipe(
        catchError((error) => {
          if (error.code === 5) {
            throw new NotFoundException(error.details || 'User not found');
          }
          throw new InternalServerErrorException(error.details || 'Internal error');
        }),
      ),
    );
  }

  @Put()
  update(@Body() data: UpdateUserRequest) {
    return lastValueFrom(
      this.userService.updateUser(data).pipe(
        catchError((error) => {
          if (error.code === 5) {
            throw new NotFoundException(error.details || 'User not found');
          }
          throw new InternalServerErrorException(error.details || 'Internal error');
        }),
      ),
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return lastValueFrom(
      this.userService.removeUser({ id: Number(id) }).pipe(
        catchError((error) => {
          if (error.code === 5) {
            throw new NotFoundException(error.details || 'User not found');
          }
          throw new InternalServerErrorException(error.details || 'Internal error');
        }),
      ),
    );
  }
}
