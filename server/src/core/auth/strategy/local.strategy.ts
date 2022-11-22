import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '@/core/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService :AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        } as IStrategyOptions);
    }

    async validate (username: string, password: string) {
        return await this.authService.validateUser({ username, password });
    }
}

