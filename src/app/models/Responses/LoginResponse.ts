import { BaseResponse } from './BaseResponse';

export interface LoginResponse extends BaseResponse {
  data: {
    jwt: string;
  };
}
