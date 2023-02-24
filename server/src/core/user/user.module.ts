import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Dashboard } from '@/core/dashboard/entity/dashboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Dashboard])],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
