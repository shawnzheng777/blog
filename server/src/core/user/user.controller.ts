import { Controller, Get, Param, Delete, Post, Body, Query } from '@nestjs/common';
import { UserService } from '@/core/user/user.service';
import { User } from '@/core/user/enitiy/user.entity';
import { UserDto } from '@/core/user/user.dto';
import {BaseCode} from '@/common/common.dto'

@Controller('/user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/create-user')
    async createUser(@Body() data: UserDto ) {
        const entity = await this.userService.findName(data.username);
        if (entity?.username) {
            return {
               base_rsp: { code: BaseCode.Fail, msg: '用户名已存在' },
            };
        }
        return this.userService.create(data);
    }

    @Post('/update-user')
    updateUser(@Body() data: UserDto ) {
        return this.userService.updateUser(data);
    }

    @Get('/get-all-user')
    getAllUser(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('/get-user-by-id')
    getUserById(@Query('id') id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    @Delete('/delete-user-by-id/:id')
    deleteUserById(@Param('id') id:number) {
        return this.userService.remove(id);
    }
}