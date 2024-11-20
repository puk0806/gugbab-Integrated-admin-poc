import { addSeparator } from './number';

/** 용량계산(byte->)  as-is : FileSizeFormatProvider() */
export const formatBytes = (bytes: number, decimals = 2, space = '') => {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B`', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + space + sizes[i];
};

/**
 * 시간계산 (seconds -> minutes:seconds)
 *
 * example) 125 -> 02:05
 **/
export const formatTimes = (seconds: number, minuteToSecond = 60) => {
  const formattedMinutes = `${Math.floor(seconds / minuteToSecond)}`.padStart(2, '0');
  const formattedSeconds = `${seconds % minuteToSecond}`.padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

/**
 * 숫자 단위 계산
 *
 * example) 1000 -> 1,000 1000000 -> 100만
 */
export const formatMoney = (number: number): string => {
  /**
   * 급여 노출 정책
   *
   * 메인:
   *
   * 10만원 미만: 원 단위까지 모두 표기
   * 10만원 이상: 천 원 이하 단위 절삭하고 만 원 단위까지 표기
   *
   * 메인 외:
   *
   * 공통: 원 단위까지 모두 표기
   */
  const hundredThousand = 100_000;

  if (number >= hundredThousand) {
    // 원은 의존 명사라 띄어 써야 한단 사실을 모르지 않습니다.
    return `${addSeparator(number / hundredThousand)}만원`;
  }

  return `${addSeparator(number)}원`;
};

export const getGcd = (first: number, second: number): number => (second > 0 ? getGcd(second, first % second) : first);

export const formatPhoneNumber = (value: string | number) => {
  const dashRemoved = `${value}`.replace(/-/g, '');

  if (dashRemoved.length < 8) {
    return dashRemoved;
  }

  const headRegex = /^(02|031|032|033|041|042|043|044|051|052|053|054|055|061|062|063|064|010|011|016|017|018|019)/;
  const currentHead = dashRemoved.match(headRegex)?.[0];

  if (!currentHead) {
    return `${value}`;
  }

  return `${currentHead}-${dashRemoved.replace(headRegex, '').replace(/(\d{3,4})(\d{4})/, '$1-$2')}`;
};
