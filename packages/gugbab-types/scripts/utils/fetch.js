const fs = require('fs');
const path = require('path');

const https = require('https');
// const

/**
 *
 * @param {string} url
 * @param {string | https.RequestOptions | URL} options
 */
function get(url, options) {
  const { host, pathname } = new URL(url);
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        host,
        path: pathname,
        port: 443,
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
      reject(error.message);
    });
    req.end();
  });
}

// 로컬 JSON 파일 전용
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

module.exports = { get, getJson };
