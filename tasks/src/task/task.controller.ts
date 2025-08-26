import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @GrpcMethod('TaskService', 'CreateTask')
  async createTask(data: CreateTaskDto) {
    const t = await this.taskService.create(data);
    return { task: this.map(t) };
  }

  @GrpcMethod('TaskService', 'FindAllTasks')
  async findAllTasks(_: {}) {
    const list = await this.taskService.findAll();
    return { tasks: list.map(this.map) };
  }

  private map = (t: any) => ({
    id: t.id,
    title: t.title,
    description: t.description,
    completed: t.completed,
    createdBy: t.createdBy,
    createdAt: t.createdAt?.toISOString?.() ?? String(t.created_at),
  });
}
