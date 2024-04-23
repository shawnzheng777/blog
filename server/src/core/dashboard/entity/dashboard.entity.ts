import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@/core/user/entity/user.entity';

@Entity()
export class Dashboard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'mediumtext', charset: 'utf8mb4' })
  title: string;

  @Column({ type: 'mediumtext', charset: 'utf8mb4' })
  content: string;

  @Column()
  create_time: string;

  @Column({ type: 'mediumtext', charset: 'utf8mb4', default: null })
  tag: string;

  @Column()
  like: number;

  @ManyToOne(() => User, (user) => user.dashboard)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
