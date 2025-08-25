import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5433', 10),
      username: process.env.POSTGRES_USER || 'postgres',
      password: (process.env.DB_PASSWORD || 'password').trim(),
      database: (process.env.POSTGRES_DB || 'users_db').trim(),
      entities: [
        User
      ],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class DatabaseModule {}
