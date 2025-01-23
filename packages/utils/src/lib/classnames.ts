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
