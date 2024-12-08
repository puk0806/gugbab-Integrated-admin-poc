export const QUERY_KEY_FACTORY = <T>(queryKey: keyof typeof QUERY_KEY, param?: T) => {
  const base = [QUERY_KEY[queryKey]] as const;

  if (param) {
    return [...base, param] as const;
  }

  return base;
};

export const QUERY_KEY = Object.freeze({});
