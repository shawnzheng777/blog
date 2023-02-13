import { Controller, Post, Body, Query, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from '@/core/dashboard/dashboard.service';
import { JwtGuard } from '@/core/auth/guard/jwt.guard';

@Controller('/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboard() {
    return this.dashboardService.findAll();
  }

  @Get('/search')
  searchDashboard(@Query('content') content: string) {
    return this.dashboardService.search(content);
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  async createDashboard(@Body() req) {
    return await this.dashboardService.createDashboard(req);
  }
}
