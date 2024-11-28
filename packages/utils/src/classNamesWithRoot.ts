/**
 * `classNames.bind(styles)`에 기본으로 사용되는 클래스명을 추가한 함수
 *
 * `const cx = classNamesWithRoot(styles, 'parent')`과 같이 선언 후\
 * `cx('__child')`와 같이 사용
 */
export function classNamesWithRoot(styles: Record<string, string> = {}, rootClassName = '') {
  const hasOwn = {}.hasOwnProperty;
  const func = (...classNames: unknown[]) => {
    const classes: string[] = [];

    if (classNames.length === 0) {
      // It's root
      classes.push(styles[rootClassName] || rootClassName);
    }

    for (let i = 0, max = classNames.length; i < max; i++) {
      const name = classNames[i];

      // HACK: To add extra class names in root
      if (name === '') {
        classes.push(styles[rootClassName] || rootClassName);
      }

      if (!name) {
        continue;
      }

      const nameType = typeof name;

      if (nameType === 'string' || nameType === 'number') {
        const nameWithRoot = rootClassName + name;
        classes.push(styles[nameWithRoot] || nameWithRoot);
        continue;
      }

      if (Array.isArray(name)) {
        func(name);
        continue;
      }

      if (nameType === 'object') {
        // It's not null and array, so it must be an object.
        for (const key in name as Record<string, unknown>) {
          const keyWithRoot = rootClassName + key;
          if (hasOwn.call(name, keyWithRoot) && (name as Record<string, unknown>)[keyWithRoot]) {
            classes.push(styles[keyWithRoot] || keyWithRoot);
          }
        }
      }
    }

    return classes.join(' ');
  };

  return func;
}
