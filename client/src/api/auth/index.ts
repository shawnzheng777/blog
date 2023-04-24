import { apiPost } from '@/infrastructure/axios';
import { toSnakeCase } from '@/presentation/utils/snake-case';

export type LoginParams = {
  username: string;
  password: string;
  createTime: string;
  desc?: string;
};

export const loginUser = async (params: LoginParams) => {
  try {
    const { token, user } = await apiPost('auth/login', params);
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
    return await apiPost('user/create-user', toSnakeCase(params));
  } catch (e) {
    console.log('register e:', e);
    return null;
  }
};
