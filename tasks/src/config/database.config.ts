import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Task } from '../task/entities/task.entity';


@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5434', 10),
        username: process.env.POSTGRES_USER || 'postgres',
        password: (process.env.DB_PASSWORD || 'password').trim(),
        database: (process.env.POSTGRES_DB || 'tasks_db').trim(),
        entities: [
            Task
        ],
        synchronize: true,
        }),
    ],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
