import { Module } from '@nestjs/common';
import { UserModule } from '@/core/user/user.module';
import { AuthModule } from '@/core/auth/auth.module';
import { DashboardModule } from '@/core/dashboard/dashboard.module';

@Module({
  imports: [UserModule, AuthModule, DashboardModule],
})
export class CoreModule {}
