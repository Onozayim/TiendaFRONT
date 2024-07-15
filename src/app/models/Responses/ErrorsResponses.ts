import { BaseResponse } from './BaseResponse';

export interface ErrorResponses extends BaseResponse {
  data?: { errors?: string[] };
}
