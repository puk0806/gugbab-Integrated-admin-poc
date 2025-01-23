/** 문자와 숫자, 허용 특수문자 - + # ( ) [ ] % & . ㈜ ㈔  */
export function validateKeyword(keyword?: string) {
  if (!keyword) return false;
  const regex = new RegExp(/^[ㄱ-힣a-zA-Z0-9\d\-+#()[\]%&,.㈜㈔'`/\t\s]+$/gi);
  return regex.test(keyword);
}

/**
 * keyword tag 문자열 체크
 * @param keyword
 */
export function validateHtmlKeyword(keyword?: string) {
  if (!keyword) return false;
  const regex = new RegExp(/<[^>]*>?/gi);
  return regex.test(keyword);
}
