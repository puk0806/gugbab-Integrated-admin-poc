export function parseCookie(string = '') {
  if (!string) {
    return {};
  }

  return Object.fromEntries(
    string
      .split(';')
      .map(x => x.split('='))
      .map(([key, value]) => [decodeURIComponent(key?.trim()), decodeURIComponent(value?.trim())]),
  );
}
