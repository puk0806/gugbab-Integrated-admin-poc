import { ErrorCode, ErrorStatusCode } from './code';

export interface ErrorResponse {
  status: ErrorStatusCode;
  errorCode: ErrorCode;
  message: string;
}
