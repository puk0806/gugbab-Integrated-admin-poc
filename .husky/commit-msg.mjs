/* eslint-disable no-console */
import fs from 'fs';
import { notify } from './notify.mjs';

const SERVICES = ['app', 'storybook', 'ui', 'utils', 'icons', 'eslint', 'tsconfig', 'types', 'all'];
const VERBS = ['Add', 'Remove', 'Fix', 'Modify', 'Improve', 'Refactor', 'Simplify', 'Move', 'Rename', 'Merge'];

const msgFile = process.argv[2];
const raw = fs.readFileSync(msgFile, 'utf8');
const title = raw.split('\n')[0].trim();

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const servicesPattern = SERVICES.map(escape).join('|');
const verbsPattern = VERBS.join('|');

const pattern = new RegExp(
  `^(?:\\[(?:${servicesPattern})\\]\\s+)?(?:${verbsPattern})\\b(?:\\s+.+)?$`
);

function main() {
  if (!pattern.test(title)) {
    console.log('🚨 Git 컨벤션을 준수해주세요! 👮');
    console.log('허용 예시:');
    console.log('  [app] Add CreateUser API');
    console.log('  Fix broken ESLint config');
    console.log('');
    console.log(`Services: ${SERVICES.join(', ')}`);
    console.log(`Verbs   : ${VERBS.join(', ')}`);
    notify('컨벤션 경고', '🚨 Git 컨벤션을 준수해주세요! 👮');
    process.exit(1);
  }
}

main();
