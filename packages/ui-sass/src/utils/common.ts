export function bem(rootClass: string, prefix?: string) {
  if (prefix) {
    rootClass = `${prefix}-${rootClass}`;
  }

  const func = (elementClasses?: string, modifyClasses?: Record<string, string | boolean>) => {
    const classes: string[] = [];
    const rootClassName = elementClasses ? `${rootClass}__${elementClasses}` : rootClass;

    if (elementClasses) {
      classes.push(`${rootClass}__${elementClasses}`);
    } else {
      classes.push(rootClassName);
    }

    if (modifyClasses) {
      for (const key in modifyClasses) {
        if (!key) {
          continue;
        }
        if (modifyClasses[key]) {
          const modifyClass = `${rootClassName}--${key}`;
          classes.push(modifyClass);
          continue;
        }
      }
    }
    return classes.join(' ');
  };

  return func;
}

export function classnames(...arg: Array<string | Record<string, boolean>>) {
  const classes: string[] = [];
  for (let index = 0; index < arg.length; index++) {
    const className = arg[index];
    if (typeof className === 'string') {
      classes.push(className);
    } else {
      Object.entries(className).forEach(([name, isValid]) => {
        if (isValid) {
          classes.push(name);
        }
      });
    }
  }
  return classes.join(' ');
}

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
