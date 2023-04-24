import { message } from 'antd';

/**
 * 网络错误码
 */
export enum HttpCode {
  Ok = 200,
  Redirect = 302, // 重定向
  BadRequest = 400, // 请求参数错误
  Unauthorized = 401, // 登录状态已过期，请重新登录
  Forbidden = 403, // 服务器拒绝本次访问
  NotFound = 404, // 请求资源未找到
  InternalServerError = 500, // 内部服务器错误
  BadGateway = 502, // 网关错误
  ServiceUnavailable = 503, // 服务不可用
  GatewayTimeout = 504, // 网关超时
}

/**
 * 业务错误码
 */
export enum BusiCode {
  Ok = 0,
  ErrUnknown = 100001, // 未知错误
  TempUnavailable = 100002, // 服务暂时不可用
  Unauthorized = 100003, // 未授权
  ParamInvalid = 100004, // 参数不合法
  MethodNotAllowed = 100005, // 请求方法错误
  PermissionDenied = 100007, // 无权限、鉴权失败
  NoMatchData = 100009, // 无匹配信息
  ExceedRateLimit = 100011, // 请求频率达到上限
  Error = 100012, // 服务端错误
  NotAllowedToExit = 8001001, // 最后一个管理员，不允许退出
  ExceedMaxCountAdmin = 8002001, // 最多只允许设置10个管理员
}

export const promptMsg = (msg: string, code: number, url?: string) => {
  const api = url?.substr(url?.lastIndexOf('/') + 1);
  message.error(`${msg} [${api}: ${code}]`);
};
