import { RefObject, useEffect } from 'react';

const listenerCallbacks = new WeakMap();

let observer: IntersectionObserver | undefined;

function handleIntersections(entries: IntersectionObserverEntry[]) {
  entries.forEach(entry => {
    if (listenerCallbacks.has(entry.target)) {
      const cb = listenerCallbacks.get(entry.target);
      if (entry.isIntersecting || entry.intersectionRatio > 0) {
        observer?.unobserve(entry.target);
        listenerCallbacks.delete(entry.target);
        cb();
      }
    }
  });
}

function getIntersectionObserver() {
  if (observer === undefined) {
    observer = new IntersectionObserver(handleIntersections, {
      rootMargin: '100px',
      threshold: 0.15,
    });
  }
  return observer;
}

function useIntersection(elem: RefObject<HTMLImageElement>, callback: () => void) {
  useEffect(() => {
    if (!elem.current) {
      return;
    }
    const target = elem.current;
    const observer = getIntersectionObserver();
    listenerCallbacks.set(target, callback);
    observer.observe(target);

    return () => {
      listenerCallbacks.delete(target);
      observer.unobserve(target);
    };
  }, [callback, elem]);
}

export default useIntersection;
