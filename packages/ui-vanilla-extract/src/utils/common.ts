export function classnames(...args: Array<string | Record<string, boolean>>) {
  const classes: string[] = [];
  for (let index = 0; index < args.length; index++) {
    const classname = args[index];
    if (typeof classname === 'string') {
      classes.push(classname);
      continue;
    }

    Object.entries(classname).forEach(([name, isValid]) => {
      if (!isValid) {
        return;
      }

      classes.push(name);
    });
  }

  return classes.join(' ');
}
