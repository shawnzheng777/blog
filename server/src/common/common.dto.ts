export interface BaseRsp {
  code: number;
  msg: string;
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

export const BASE_RSP: BaseRsp = {
  code: BusiCode.Ok,
  msg: 'success',
};
