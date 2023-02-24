import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from '@/core/dashboard/dashboard.controller';
import { DashboardService } from '@/core/dashboard/dashboard.service';
import { Dashboard } from '@/core/dashboard/entity/dashboard.entity';
import { User } from '@/core/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dashboard, User])],
  exports: [DashboardService],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
