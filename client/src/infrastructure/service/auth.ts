import HttpClient from '@/infrastructure/service/request';
import { toSnakeCase } from '@/presentation/utils/snake-case';

export type LoginParams = {
  username: string;
  password: string;
  createTime: string;
  desc?: string;
};

export const loginUser = async (params: LoginParams) => {
  try {
    const { token, user } = await HttpClient.Post('auth/login', params);
    return {
      token,
      user,
    };
  } catch (e) {
    console.log('login e:', e);
    return null;
  }
};

export const registerUser = async (params: LoginParams) => {
  try {
    return await HttpClient.Post('user/create-user', toSnakeCase(params));
  } catch (e) {
    console.log('register e:', e);
    return null;
  }
};
