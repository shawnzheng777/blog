import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './enitiy/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UserService],
    providers: [UserService],
    controllers: [UserController],
})

export class UserModule {}