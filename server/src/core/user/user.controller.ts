import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { UserService } from '@/core/user/user.service';
import { User } from '@/core/user/entity/user.entity';
import { UserDto } from '@/core/user/user.dto';
import { BusiCode } from '@/common/common.dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create-user')
  async createUser(@Body() data: UserDto) {
    const entity = await this.userService.findName(data.username);
    if (entity?.username) {
      return {
        base_rsp: { code: BusiCode.TempUnavailable, msg: '用户名已存在' },
      };
    }
    return this.userService.create(data);
  }

  @Post('/update-user')
  updateUser(@Body() data: UserDto) {
    return this.userService.updateUser(data);
  }

  @Get('/get-all-user')
  getAllUser(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/get-user-info')
  getUserInfo(@Query('username') username: string): Promise<User> {
    return this.userService.findUserInfo(username);
  }

  @Delete('/delete-user-by-id/:id')
  deleteUserById(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
