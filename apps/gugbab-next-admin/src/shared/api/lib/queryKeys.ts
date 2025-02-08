/**
 * ex)
 * const QUERY_KEY = Object.freeze({
 *   POSTS: 'POSTS',
 * });
 * - QUERY_KEY_FACTORY('POSTS') => ['POSTS']
 * - QUERY_KEY_FACTORY('POSTS', '1') => ['POSTS', '1']
 */

export const QUERY_KEY_FACTORY = <T>(queryKey: keyof typeof QUERY_KEY, param?: T) => {
  const base = [QUERY_KEY[queryKey]] as const;

  if (param) {
    return [...base, param] as const;
  }

  return base;
};

export const QUERY_KEY = Object.freeze({
  CARD: 'CARD',
  CARD_ID: 'CARD_ID',
  CARDS_TOP10: 'CARDS_TOP10',
  BRAND: 'BRAND',
  BRANDS_TOP10: 'BRANDS_TOP10',
  BRANDS_BY_CONDITION: 'BRANDS_BY_CONDITION',
});
