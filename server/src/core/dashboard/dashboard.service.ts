import { Like, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dashboard } from '@/core/dashboard/entity/dashboard.entity';
import { BASE_RSP } from '@/common/common.dto';
import { User } from '@/core/user/entity/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dashboard)
    private DashboardRepository: Repository<Dashboard>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async createDashboard(data) {
    const userEntity = await this.UserRepository.findOneBy({
      username: data.username,
    });
    const { raw } = await this.DashboardRepository.insert({
      ...data,
      user: userEntity,
    });

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

  async getDashboard() {
    try {
      const data = await this.DashboardRepository.createQueryBuilder(
        'dashboard',
      )
        .leftJoinAndSelect('dashboard.user', 'user')
        .orderBy({ ['dashboard.create_time']: 'DESC' })
        .getMany();
      const filterData = data.map((item) => {
        return {
          ...item,
          user: { ...item.user, password: undefined },
        };
      });
      return {
        base_rsp: BASE_RSP,
        data: filterData,
      };
    } catch (err) {
      throw new HttpException(
        {
          msg: err,
          code: HttpStatus.BAD_GATEWAY,
        },
        HttpStatus.BAD_GATEWAY,
      );
    }
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
