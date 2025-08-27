import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column() 
  title: string;

  @Column({ type: 'text', nullable: true }) 
  description: string;

  @Column({ default: false }) 
  completed: boolean;

  @Column() 
  createdBy: number;

  @CreateDateColumn({ type: 'timestamptz' }) 
  createdAt: Date;
}
