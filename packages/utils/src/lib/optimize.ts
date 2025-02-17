type Callback<T extends any[]> = (...args: T) => any;
const DEFAULT_WAIT = 500;

export function fit<T extends any[]>(func: Callback<T>) {
  let ticking = false;

  return (...args: T) => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        func(...args);
        ticking = false;
      });
    }
  };
}

export function throttle<T extends any[]>(func: Callback<T>, wait = DEFAULT_WAIT) {
  let timer: ReturnType<typeof setTimeout> | null;

  return (...args: T) => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func(...args);
      }, wait);
    }
  };
}

export function debounce<T extends any[]>(func: Callback<T>, timeout = DEFAULT_WAIT) {
  let timer: ReturnType<typeof setTimeout>;

  function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timer);
      func(...args);
    };
    clearTimeout(timer);
    timer = setTimeout(later, timeout);
  }
  executedFunction.cancel = function () {
    clearTimeout(timer);
  };
  return executedFunction;
}

export function onNextRender(func: () => void) {
  setTimeout(() => {
    requestAnimationFrame(func);
  });
}
