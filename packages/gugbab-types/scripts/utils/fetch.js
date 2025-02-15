import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { URL } from 'url';

/**
 *
 * @param {string} url
 * @param {string | https.RequestOptions | URL} options
 */
function get(url, options) {
  const { host, pathname, port, protocol } = new URL(url);

  const requestModule = protocol === 'https:' ? https : http;

  const finalHost = host.split(':')[0];
  const finalPort = port || (protocol === 'https:' ? 443 : 80);

  return new Promise((resolve, reject) => {
    const req = requestModule.request(
      {
        host: finalHost,
        path: pathname,
        port: finalPort,
        method: 'GET',
        ...options,
      },
      res => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`Failed to fetch ${url}. Status code is ${res.statusCode}`));
        }

        const body = [];

        res.on('data', function (chunk) {
          body.push(chunk);
        });

        res.on('end', function () {
          try {
            const parsed = JSON.parse(Buffer.concat(body).toString());
            resolve(parsed);
          } catch (e) {
            reject(e);
          }
        });
      },
    );

    req.on('error', error => {
      reject(error);
    });
    req.end();
  });
}

function getJson(localPath) {
  try {
    const jsonPath = path.resolve(localPath.endsWith('.json') ? localPath : `${localPath}.json`);
    const fileContents = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export { get, getJson };
