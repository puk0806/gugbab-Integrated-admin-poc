import { ErrorStatusCode } from '../types/code';

const errorMessages: { [key in ErrorStatusCode]: string } = {
  400: '잘못된 요청입니다. 다시 시도해 주세요.',
  401: '로그인이 필요한 페이지입니다. 로그인 페이지로 이동합니다.',
  403: '페이지에 접근할 권한이 없습니다.',
  404: '잘못된 요청입니다. 다시 시도해 주세요.',
  500: '처리하는데 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.',
};

export function getErrorMessage(errorStatusCode: ErrorStatusCode): string {
  return `${errorMessages[errorStatusCode]}`;
}
