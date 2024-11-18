import { existsSync, mkdirSync } from 'fs';

const DIST = './dist';

if (!existsSync(DIST)) {
  mkdirSync(DIST);
}
