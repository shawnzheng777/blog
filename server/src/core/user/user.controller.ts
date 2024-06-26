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
import { BusiCode, CommonRes } from '@/common/common.dto';

@Controller('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create-user')
  async createUser(@Body() body: UserDto) {
    const entity = await this.userService.findName(body.username);
    if (entity?.username) {
      return {
        base_rsp: { code: BusiCode.TempUnavailable, msg: '用户名已存在' },
      };
    }
    return this.userService.create(body);
  }

  @Post('/send-code')
  sendCode(@Body() body: { email: string }) {
    return this.userService.sendCode(body);
  }

  @Post('/update-user')
  updateUser(@Body() body: UserDto) {
    return this.userService.updateUser(body);
  }

  @Get('/get-all-user')
  getAllUser(): Promise<CommonRes<User[]>> {
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
