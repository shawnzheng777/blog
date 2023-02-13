import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dashboard } from '@/core/dashboard/entity/dashboard.entity';
import { BASE_RSP } from '@/common/common.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dashboard)
    private DashboardRepository: Repository<Dashboard>,
  ) {}

  async createDashboard(data) {
    const { raw } = await this.DashboardRepository.insert(data);

    return {
      base_rsp: BASE_RSP,
      id: raw.insertId,
    };
  }

  async findAll() {
    const data = await this.DashboardRepository.find();
    return {
      base_rsp: BASE_RSP,
      data,
    };
  }

  async search(content: string) {
    const data = await this.DashboardRepository.find({
      where: {
        content: Like(`%${content}%`),
      },
    });
    return {
      base_rsp: BASE_RSP,
      data,
    };
  }
}
