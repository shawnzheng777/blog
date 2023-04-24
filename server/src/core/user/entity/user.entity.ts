import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Dashboard } from '@/core/dashboard/entity/dashboard.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password?: string;

  @Column()
  create_time: string;

  @Column()
  desc: string;

  @OneToMany(() => Dashboard, (dashboard) => dashboard.user)
  dashboard?: Dashboard[];
}
