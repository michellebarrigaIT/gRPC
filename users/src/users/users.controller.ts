import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserByIdRequest,
  Empty,
} from '../../../protos/generated/user';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(data: CreateUserRequest) {
    const user = await this.usersService.create(data);
    return { id: user.id, username: user.username, email: user.email };
  }

  @GrpcMethod('UserService', 'FindAll')
  async findAll(_: Empty) {
    const users = await this.usersService.findAll();
    return { users };
  }

  @GrpcMethod('UserService', 'FindOne')
  async findOne(data: UserByIdRequest) {
    const user = await this.usersService.findOne(data.id);
    return { id: user.id, username: user.username, email: user.email };
  }

  @GrpcMethod('UserService', 'UpdateUser')
  async updateUser(data: UpdateUserRequest) {
    const user = await this.usersService.update(data.id, data);
    return { id: user.id, username: user.username, email: user.email };
  }

  @GrpcMethod('UserService', 'RemoveUser')
  async removeUser(data: UserByIdRequest) {
    await this.usersService.remove(data.id);
    return {};
  }
}
