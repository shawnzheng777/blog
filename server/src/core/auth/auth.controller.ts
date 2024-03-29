import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from '@/core/auth/auth.service';
import { LocalGuard } from '@/core/auth/guard/local.guard';
import { JwtGuard } from '@/core/auth/guard/jwt.guard';
import { UserDto } from '@/core/user/user.dto';
import { BASE_RSP } from '@/common/common.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/user')
  @UseGuards(JwtGuard)
  getProfile(@Request() req) {
    return {
      base_rsp: BASE_RSP,
      ...req.user,
    };
  }

  @Post('/validate-user')
  async validate(@Body() req: UserDto) {
    return this.authService.validateUser(req);
  }
}
