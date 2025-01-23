export const changePhoneNumber = (phone: string) => {
  let returnVal = phone.replace(/[^0-9]/g, '').replace(/-/g, '');
  if (returnVal.substring(0, 2) === '02') {
    if (returnVal.length <= 9) {
      returnVal = returnVal
        .substring(0, 9)
        .replace(/^(\d{0,2})(\d{0,3})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/-{1,2}$/g, '');
    } else if (returnVal.length >= 10) {
      returnVal = returnVal
        .substring(0, 10)
        .replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/-{1,2}$/g, '');
    }
  } else {
    if (returnVal.substring(0, 1) === '1') {
      returnVal = returnVal
        .substring(0, 8)
        .replace(/^(\d{0,4})(\d{0,4})$/g, '$1-$2')
        .replace(/-{1}$/g, '');
    } else if (returnVal.length <= 10) {
      returnVal = returnVal
        .substring(0, 10)
        .replace(/^(\d{0,3})(\d{0,3})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/-{1,2}$/g, '');
    } else if (returnVal.length >= 11) {
      returnVal = returnVal
        .substring(0, 11)
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/-{1,2}$/g, '');
    }
  }
  return returnVal;
};

export function formatNumberWith(x: string | number, decorator = ',') {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, decorator);
}

function addSeparatorToNumber(value: number) {
  if (Number.isNaN(value)) {
    return '';
  }

  return value.toLocaleString('ko-KR');
}

/**
 * 숫자에 쉼표 추가
 *
 * example) 9000 -> 9,000
 * */
export function addSeparator(value: string | number) {
  if (typeof value === 'number') {
    return addSeparatorToNumber(value);
  }

  return addSeparatorToNumber(+value);
}

/** `max`를 포함하지 않는 무작위 Integer 반환 */
export function getRandomInt(min: number, max: number) {
  const intMin = Math.ceil(min);
  const intMax = Math.floor(max);

  return Math.floor(Math.random() * (intMax - intMin)) + intMin;
}

/** `max`를 포함하는 무작위 Integer 반환 */
export function getRandomIntInclusive(min: number, max: number) {
  const intMin = Math.ceil(min);
  const intMax = Math.floor(max);

  return Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
}

export function removeSeparator(value: string | number) {
  if (!value) {
    return '0';
  }
  return `${value}`.split(',').join('');
}
