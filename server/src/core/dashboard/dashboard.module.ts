import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from '@/core/dashboard/dashboard.controller';
import { DashboardService } from '@/core/dashboard/dashboard.service';
import { Dashboard } from '@/core/dashboard/entity/dashboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dashboard])],
  exports: [DashboardService],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
