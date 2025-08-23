/* eslint-disable no-console */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { notify } from './notify.mjs';

function findPackageName(filePath) {
  let currentDir = path.dirname(filePath);

  while (currentDir !== path.parse(currentDir).root) {
    const packageJsonPath = path.join(currentDir, 'package.json');

    currentDir = path.dirname(currentDir);
    try {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      return packageJson.name || null;
    } catch {
      //
    }
  }
  // package.json을 찾지 못한 경우
  return null;
}

function runLintStaged() {
  try {
    execSync('pnpm lint', { stdio: 'inherit' });
  } catch {
    console.log('🚨 eslint rule을 확인해주세요! 👮');
    console.log('');
    notify('🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨', 'eslint rule을 확인해주세요! 👮');
    process.exit(1);
  }
}

function runTypecheck() {
  const diffFiles = execSync('git diff --cached --name-only', { encoding: 'utf-8' }).split('\n').filter(Boolean);
  const tsFiles = diffFiles.filter(file => /^(packages|apps)\/.*\.(ts|tsx)$/.test(file));

  const packageNames = Array.from(
    tsFiles.reduce((acc, file) => {
      const packageName = findPackageName(file);
      if (!packageName) return acc;
      acc.add(packageName);
      return acc;
    }, new Set()),
  );

  for (const packageName of packageNames) {
    try {
        execSync(`pnpm --filter "${packageName}" run typecheck`, { stdio: 'inherit' });
    } catch {
      console.log('🚨 type을 확인해주세요! 👮');
      console.log('');
      notify('🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨', 'type을 확인해주세요! 👮');
      process.exit(1);
    }
  }
}

function main() {
  runLintStaged();
  runTypecheck();
}

main();
