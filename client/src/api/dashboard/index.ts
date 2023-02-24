import { apiPost, apiGet } from '@/infrastructure/axios';
import moment from 'moment';

interface CreateParams {
  username: string;
  content: string;
}

export interface DashboardResp {
  id: number;
  title: string;
  content: string;
  create_time: string;
  like: number;
}

// 获取面版信息
export const getDashboard = async (): Promise<DashboardResp[]> => {
  try {
    const { data } = await apiGet('/dashboard');
    return data;
  } catch (e) {
    console.log('getDashboard e:', e);
    return [];
  }
};

// 创建面版信息
export const createDashboard = async (params: CreateParams) => {
  try {
    const body = {
      ...params,
      create_time: moment().format(),
      like: 0,
    };
    return await apiPost('/dashboard/create', body);
  } catch (e) {
    console.log('createDashboard e:', e);
    return null;
  }
};
