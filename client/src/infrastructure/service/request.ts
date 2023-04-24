import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { message } from 'antd';
import NProgress from 'nprogress';
import { BusiCode, promptMsg } from '@/infrastructure/service/code';

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
    console.log('res', response);
    if (base_rsp && base_rsp.code !== BusiCode.Ok) {
      promptMsg(base_rsp.msg, base_rsp.code, response.config.url);
    }
    return Promise.resolve(response.data);
  },
  (err: AxiosError<any>) => {
    const { response } = err;
    if (response?.status === 401) {
      message.warning('请先登录');
      localStorage.removeItem('token');
      setTimeout(() => {
        window.history.pushState({}, '', '/login');
        window.location.reload();
      }, 1000);
      return;
    }
    if (response?.status) {
      const msg = response?.data?.msg;
      const code = response.data?.code;
      const url = response.config.url;
      promptMsg(msg, code, url);
    }
    return Promise.reject(err);
  }
);

class HttpClient {
  Post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
  }

  Get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return axiosInstance.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    });
  }
}

const httpClient = new HttpClient();

export default httpClient;
