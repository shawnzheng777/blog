import HttpClient from '@/infrastructure/service/request';
import { toCamelCase } from '@/presentation/utils/camel-case';

export interface IUserInfo {
  id?: number;
  username?: string;
  createTime?: string;
  email?: string;
  phone?: string;
  desc?: string;
  uuid?: string;
}

export const getUserInfo = async (username: string): Promise<IUserInfo> => {
  try {
    const res = await HttpClient.Get<IUserInfo>(`user/get-user-info?username=${username}`);
    return toCamelCase(res);
  } catch (err) {
    console.log('getUserInfo err:', err);
    return {};
  }
};
