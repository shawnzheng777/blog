import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/core/user/enitiy/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { BASE_RSP } from '@/common/common.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private AuthRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async validateUser (userinfo) {
        const { username, password } = userinfo;
        const userInfo = await this.AuthRepository.findOne({
            where: { username },
            select: ['username', 'password'],
        })

        if (!userInfo || userInfo.password !== password) {
            throw new HttpException(
                {
                    msg: '用户名密码错误',
                    code: HttpStatus.BAD_GATEWAY,
                },
                HttpStatus.BAD_GATEWAY,
            );
        }
        return {
            base_rsp: BASE_RSP,
            user: userInfo.username,
        };
    }

    async login(user) {
        const payload = { username: user.username };
        return {
            base_rsp: BASE_RSP,
            token: this.jwtService.sign(payload),
        };
    }
}

