export function group<K extends string | number | symbol, V>(
  array: V[],
  callbackfn: (input: V, i: number) => K,
): Record<K, V[]> {
  // eslint-disable-next-line
    const map: Record<string | number | symbol, any> = {};

  for (let i = 0, max = array.length; i < max; i++) {
    const x = array[i];
    const key = callbackfn(x, i);
    const selected = map[key];

    if (selected) {
      selected.push(x);
    } else {
      map[key] = [x];
    }
  }

  return map as Record<K, V[]>;
}

export function groupToMap<K, V>(array: V[], callbackfn: (input: V, i: number) => K): Map<K, V[]> {
  const map = new Map<K, V[]>();

  for (let i = 0, max = array.length; i < max; i++) {
    const x = array[i];
    const key = callbackfn(x, i);
    const selected = map.get(key);

    if (selected) {
      selected.push(x);
    } else {
      map.set(key, [x]);
    }
  }

  return map;
}

export function chunk<T>(array: T[], size = 2): T[][] {
  const chunked = [];

  for (let i = 0, max = array.length; i < max; i += size) {
    chunked.push(array.slice(i, i + size));
  }

  return chunked;
}
// eslint-disable-next-line
  export function combine<T>(array: Record<string, any>[]): T {
  return array.reduce((acc, cur) => Object.assign(acc, cur), {}) as T;
}
// eslint-disable-next-line
  export const removeNullish = <T extends Record<string, any>>(data: T) =>
  // Used `!= null` to remove nullish values
  // eslint-disable-next-line
    Object.fromEntries<T>(Object.entries(data).filter(([_, value]) => value != null)) as {
    [K in keyof T as T[K] extends null ? never : K]: NonNullable<T[K]>;
  };
// eslint-disable-next-line
  export const removeFalsy = <T extends Record<string, any>>(data: T) => {
  const obj: Partial<T> = {};

  for (const key in data) {
    if (data[key]) {
      obj[key] = data[key];
    }
  }

  return obj as unknown as { [K in keyof T as T[K] extends null ? never : K]: NonNullable<T[K]> };
};

export const arrayOfAll = <T, U extends T[] = T[]>(arr: U & ([T] extends [U[number]] ? unknown : never)) => arr;

export const pickRandom = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/**
 * **주의**: `arr`의 길이가 3보다 작으면 infinite loop이 됩니다
 */
export const pickUniqueItems = <T>(arr: T[], length = arr.length) => {
  const pickedItems: T[] = [];

  // eslint-disable-next-line no-constant-condition
  while (1) {
    if (pickedItems.length === length) {
      break;
    }

    const picked = pickRandom(arr);

    if (
      // Same as previous item
      pickedItems[pickedItems.length - 1] === picked ||
      // Same as first item when picking last item
      (pickedItems.length === length - 1 && pickedItems[0] === picked)
    ) {
      continue;
    }

    pickedItems.push(picked);
  }

  return pickedItems;
};

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
