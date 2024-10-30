const { existsSync, readFileSync, writeFileSync } = require('node:fs');
const { resolve } = require('node:path');
const dotenv = require('dotenv');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const NOW = new Date().getTime();

async function parseEnv(appEnv, appSlot) {
  let envFilePath = resolve(__dirname, `../config/env/.env.${appEnv}${appSlot ? `.${appSlot}` : ''}`);
  if (!existsSync(envFilePath)) {
    envFilePath = resolve(__dirname, `../env/.env.${appEnv}`);
  }

  const parsedEnv = dotenv.config({ path: envFilePath }).parsed || {};
  parsedEnv['NEXT_BUILD_TIME'] = NOW;
  return parsedEnv;
}

function addClientEnv(parsedEnv) {
  const filterData = Object.fromEntries(Object.entries(parsedEnv).filter(([key]) => key.includes('NEXT_PUBLIC')));
  const scriptFilePath = resolve(__dirname, '../public/__ENV.js');
  const data = `window.process = {env: {}};window.process.env = ${JSON.stringify(filterData)}`;
  writeFileSync(scriptFilePath, data);
}

async function addServerEnv(appEnv, appSlot) {
  let envFilePath = resolve(__dirname, `../config/env/.env.${appEnv}${appSlot ? `.${appSlot}` : ''}`);
  if (!existsSync(envFilePath)) {
    envFilePath = resolve(__dirname, `../env/.env.${appEnv}`);
  }
  const serverEnvFilePath = resolve(__dirname, '../.env');
  const serverData = readFileSync(envFilePath, 'utf-8').replace('NEXT_BUILD_TIME=', `NEXT_BUILD_TIME=${NOW}`);
  writeFileSync(serverEnvFilePath, serverData);
}

yargs(hideBin(process.argv))
  .command(
    'next-env',
    'Create Next.js runtime environment js',
    y => {
      return y
        .option('env', {
          alias: 'e',
          type: 'string',
          description: 'Environment name(ex: dev, stg, prd)',
          demandOption: true,
        })
        .option('slot', {
          alias: 's',
          type: 'string',
          description: 'Slot Number (ex: 01, 02, 03)',
        })
        .option('mode', {
          alias: 'm',
          type: 'string',
          description: 'App mode (ex: development, production)',
        });
    },
    async args => {
      const appEnv = args.e || args.env || 'dev';
      const appSlot = args.s || args.slot;
      const parsedEnv = await parseEnv(appEnv, appSlot);
      addClientEnv(parsedEnv);
      await addServerEnv(appEnv, appSlot);

      return parsedEnv;
    },
  )
  .parse();
