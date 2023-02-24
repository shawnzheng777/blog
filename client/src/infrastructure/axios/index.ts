import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { message } from 'antd';
import NProgress from 'nprogress';

const config: AxiosRequestConfig = {
  baseURL: '/api',
  timeout: 1000000,
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  NProgress.start();
  const token = localStorage.getItem('token');
  if (config?.headers && token) {
    config.headers.token = token;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    NProgress.done();
    const { base_rsp } = response.data;
    if (base_rsp) {
      base_rsp.code !== 0 && message.error(base_rsp.msg);
    }
    return Promise.resolve(response.data);
  },
  (err: AxiosError<any>) => {
    if (err?.response?.status === 401) {
      message.warning('请先登录');
      setTimeout(() => {
        window.history.pushState({}, '', '/login');
        window.location.reload();
      }, 1000);
      return;
    }
    if (err?.response?.status) {
      message.error(err?.response?.data?.msg || '服务不可用');
    }
  }
);

export const apiPost = <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });
};

export const apiGet = <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return axiosInstance.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });
};
