const levels = ['log', 'info', 'debug', 'warn', 'error'] as const;

type Logger = { [K in (typeof levels)[number]]: (...message: any[]) => void };

const splitLoggerArray = (arr: any[], filterFn: (arg: any) => any, initialValue: any) =>
  arr.reduce(
    (acc, cur) => {
      const filter = filterFn(cur);

      if (filter) {
        return { ...acc, filtered: { ...acc.filtered, ...cur } };
      } else {
        return { ...acc, unfiltered: [...acc.unfiltered, cur] };
      }
    },
    { filtered: initialValue, unfiltered: [] },
  );

const logger: Logger = (() => {
  const print = (type: (typeof levels)[number], ...messages: any[]) => {
    const level = levels.includes(type) ? type : 'debug';
    const { filtered, unfiltered } = splitLoggerArray(
      messages,
      v => typeof v === 'object' && v != null && !Array.isArray(v) && ('req' in v || 'prd' in v || 'dev' in v),
      {},
    );

    const kstTimeZone = +new Date() + 3240 * 10000;
    const dateTime = new Date(kstTimeZone).toISOString().replace('T', ' ').replace(/\..*/, '');

    switch (level) {
      case 'info':
        if (typeof window !== 'undefined') {
          console.info('%c info ', 'background: blue; color: white;', ...messages);
          break;
        }

        if (filtered.dev) {
          console.info(...unfiltered);
          break;
        }

        if (filtered.req) {
          const { req, statusCode, url } = filtered;
          const headers = req.headers;
          const ip = headers['x-forwarded-for'] || req.socket.remoteAddress;

          console.info(
            `${JSON.stringify({
              dateTime,
              type: 'ACCESS',
              xForwardedFor: ip,
              httpStatus: statusCode,
              method: 'GET',
              urlPath: url,
              protocol: 'https',
              referer: headers['referer'],
              userAgent: headers['user-agent'],
              clientIp: ip.split(',')[0],
            })}`,
          );
          break;
        }
        console.info(JSON.stringify({ dateTime, type: 'INFO', messages: unfiltered }));
        break;
      case 'debug':
        if (typeof window !== 'undefined') {
          console.debug('%c debug ', 'background: green; color: white;', ...unfiltered);
          break;
        }
        console.debug(JSON.stringify({ dateTime, type: 'DEBUG', messages: unfiltered }));
        break;
      case 'warn':
        if (typeof window !== 'undefined') {
          console.warn('%c warn ', 'background: orange; color: white;', ...unfiltered);
          break;
        }
        console.warn(JSON.stringify({ dateTime, type: 'WARN', messages: unfiltered }));
        break;
      case 'error':
        if (typeof window !== 'undefined') {
          console.error('%c error ', 'background: red; color: white;', ...unfiltered);
          break;
        }
        console.error(JSON.stringify({ dateTime, type: 'ERROR', messages: unfiltered }));
        break;
      case 'log':
      default:
        if (typeof window !== 'undefined') {
          console.log('%c log ', 'background: green; color: white;', ...unfiltered);
        } else {
          console.log(...unfiltered);
        }
    }
  };

  return levels.reduce((acc, cur) => ({ ...acc, [cur]: print.bind(null, cur) }), {}) as Logger;
})();

export default logger;
