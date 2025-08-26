import { Controller, Get, Post, Body, Patch, Param, Inject, NotFoundException, InternalServerErrorException, Put, Delete } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateTaskRequest, TaskServiceClient } from '../proto/task';


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

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
        const res = await lastValueFrom(this.taskService.findTaskById({ id: Number(id) }));
        return res.task;
    } catch (error: any) {
        if (error.code === 5) {
            throw new NotFoundException(error.details || 'Resource not found');
        }
        throw new InternalServerErrorException(error.details || 'Internal error');
    }
  }
  
  @Patch(':id/complete')
  async completeTask(@Param('id') id: string) {
    try {
        const res = await lastValueFrom(this.taskService.completeTask({ id: Number(id) }));
        return res.task;
    } catch (error: any) {
        if (error.code === 5) {
            throw new NotFoundException(error.details || 'Resource not found');
        } else if (error.code === 9) {
            throw new NotFoundException(error.details || 'Task already completed :)');
        }
        throw new InternalServerErrorException(error.details || 'Internal error');
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    try {
        const res = await lastValueFrom(this.taskService.updateTask({ id: Number(id), ...data }));
        return res.task;
    } catch (error: any) {
        if (error.code === 5) {
            throw new NotFoundException(error.details || 'Resource not found');
        }
        throw new InternalServerErrorException(error.details || 'Internal error');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
        await lastValueFrom(this.taskService.removeTask({ id: Number(id) }));
        return { message: 'Task successfully deleted' };
    } catch (error: any) {
        if (error.code === 5) {
            throw new NotFoundException(error.details || 'Resource not found');
        }
        throw new InternalServerErrorException(error.details || 'Internal error');
    }
  }
}
