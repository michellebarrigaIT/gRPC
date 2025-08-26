import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { RpcException, type ClientGrpc } from '@nestjs/microservices';
import { UserServiceClient } from 'src/proto/user';
import { lastValueFrom } from 'rxjs';
import { status } from '@grpc/grpc-js';

@Injectable()
export class TaskService {
  private userService!: UserServiceClient;

  constructor(
    @InjectRepository(Task) 
    private readonly taskRepository: Repository<Task>,
    @Inject('USER_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.client.getService<UserServiceClient>('UserService');
  }

  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);

    try {
      await lastValueFrom(this.userService.findOne({ id: task.createdBy }));
    } catch (e) {
      throw new RpcException({ code: status.NOT_FOUND, message: 'User does not exist' });
    }

    return this.taskRepository.save(task);
  }

  findAll() {
    return this.taskRepository.find();
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new RpcException({ code: status.NOT_FOUND, message: 'Task not found' });
    return task;
  }

  async completeTask(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) throw new RpcException({ code: status.NOT_FOUND, message: 'Task not found' });

    if (task.completed) {
      throw new RpcException({ code: status.FAILED_PRECONDITION, message: 'Task already completed' });
    }
    
    task.completed = true;
    return this.taskRepository.save(task);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
