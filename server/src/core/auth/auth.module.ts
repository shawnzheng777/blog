import { Module, Global } from '@nestjs/common';
import { AuthService } from '@/core/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '@/core/auth/auth.controller';
import { LocalStrategy } from '@/core/auth/strategy/local.strategy';
import { JwtStrategy } from '@/core/auth/strategy/jwt.strategy';
import { User } from '@/core/user/enitiy/user.entity';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.register({
            signOptions: { expiresIn: '1d' },
            secret: '233safe',
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService, JwtModule],
    controllers: [AuthController],
})

export class AuthModule {}

