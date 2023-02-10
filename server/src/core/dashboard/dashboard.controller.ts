import { Controller, Post, Request, Body, Query, Get } from '@nestjs/common';
import { DashboardService } from '@/core/dashboard/dashboard.service';

@Controller('/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboard() {
    return this.dashboardService.findAll();
  }

  @Post('/create')
  async createDashboard(@Body() req) {
    return await this.dashboardService.createDashboard(req);
  }
}
