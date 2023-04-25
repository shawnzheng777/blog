import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { UserDto } from '@/core/user/user.dto';
import { BASE_RSP, BusiCode } from '@/common/common.dto';
import * as uuid from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: UserDto) {
    const { raw } = await this.usersRepository.insert({
      ...data,
      uuid: uuid.v4(),
    });
    return {
      base_rsp: BASE_RSP,
      id: raw.insertId,
    };
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserInfo(username: string): Promise<User> {
    if (!username) {
      throw new HttpException(
        {
          msg: 'no username',
          code: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const userInfo = await this.usersRepository.findOneBy({ username });

    return {
      id: userInfo.id,
      uuid: userInfo.uuid,
      username: userInfo.username,
      create_time: userInfo.create_time,
      email: userInfo.email,
      phone: userInfo.phone,
      desc: userInfo.desc,
    };
  }

  findName(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: number) {
    await this.usersRepository.delete({ id });
    return { code: BusiCode.Ok, msg: 'success' };
  }

  async updateUser(data: UserDto) {
    const entity = await this.findName(data.username);
    const update = await this.usersRepository.merge(entity, data);
    await this.usersRepository.save(update);
    return { code: BusiCode.Ok, msg: 'success' };
  }
}
