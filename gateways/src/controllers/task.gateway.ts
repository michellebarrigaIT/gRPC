import { Controller, Get, Post, Body, Patch, Param, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateTaskRequest, TaskServiceClient } from 'src/proto/task';


@Controller('tasks')
export class TasksGateway {
  private taskService: TaskServiceClient;

  constructor(@Inject('TASK_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.taskService = this.client.getService<TaskServiceClient>('TaskService');
  }

  @Post()
  async create(@Body() data: CreateTaskRequest) {
    try {
        const res = await lastValueFrom(this.taskService.createTask(data));
        return res.task;
    } catch (error: any) {
      if (error.code === 5) {
        throw new NotFoundException(error.details || 'Resource not found');
      }
      throw new InternalServerErrorException(error.details || 'Internal error');
    }
  }

  @Get()
  async findAll() {
    const res = await lastValueFrom(this.taskService.findAllTasks({}));
    return res.tasks;
  }
}
