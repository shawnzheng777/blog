export interface BaseRsp {
  code: number;
  msg: string;
}

export enum BaseCode {
  Success = 0,
  Fail = 100012,
  ServerError = 500,
}

export const BASE_RSP: BaseRsp = {
  code: BaseCode.Success,
  msg: 'success',
};
