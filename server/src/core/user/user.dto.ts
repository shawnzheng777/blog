import { IsOptional, IsNotEmpty } from 'class-validator';
export class UserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  createTime: string;

  @IsNotEmpty()
  uuid: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  email: string;

  @IsOptional()
  desc: string;
}
