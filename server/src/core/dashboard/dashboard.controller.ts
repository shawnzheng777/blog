import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DashboardService } from '@/core/dashboard/dashboard.service';
import { JwtGuard } from '@/core/auth/guard/jwt.guard';

@Controller('/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getDashboard() {
    return this.dashboardService.getDashboard();
  }

  @Get('/search')
  searchDashboard(@Query('content') content: string) {
    return this.dashboardService.search(content);
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  async createDashboard(@Body() body, @Request() req) {
    return await this.dashboardService.createDashboard({
      ...body,
      ...req.user,
    });
  }
}
