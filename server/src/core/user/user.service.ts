import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './enitiy/user.entity';
import { UserDto } from '@/core/user/user.dto';
import {BASE_RSP} from '@/common/common.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(data: UserDto) {
        const { raw } = await this.usersRepository.insert(data);
        return {
            base_rsp: BASE_RSP,
            id: raw.insertId,
        };
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id } );
    }

    findName(username: string) {
        return this.usersRepository.findOneBy({ username } );
    }

    async remove(id: number) {
        await this.usersRepository.delete({ id });
        return { code: 0, msg: 'success' }
    }

    async updateUser(data: UserDto) {
        const entity = await this.findName(data.username);
        const update = await this.usersRepository.merge(entity, data);
        await this.usersRepository.save(update);
        return { code: 0, msg: 'success' };
    }
}