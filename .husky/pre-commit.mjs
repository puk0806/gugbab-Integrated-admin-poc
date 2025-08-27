import fs from "fs";
import { notify } from "./notify.mjs";
import {
  getStagedFiles,
  findPackageName,
  runRootLintCheck,
  runTypecheckForPackages,
  unique,
} from "./utils.mjs";

function runLint() {
  try {
    runRootLintCheck();
  } catch {
    console.log("🚨 ESLint 에러가 있습니다. 커밋이 차단됩니다.");
    notify("컨벤션 경고", "🚨 ESLint 에러를 확인해 주세요! 👮");
    process.exit(1);
  }
}

function runTypesForChangedPkgs() {
  const staged = getStagedFiles();
  const tsFiles = staged.filter((f) =>
    /^(apps|packages)\/.*\.(ts|tsx)$/.test(f)
  );

  const pkgs = unique(tsFiles.map((f) => findPackageName(f)).filter(Boolean));

  try {
    if (pkgs.length > 0) {
      console.log("▶ Typecheck packages:", pkgs.join(", "));
      runTypecheckForPackages(pkgs);
    }
  } catch {
    console.log("🚨 타입 오류가 있습니다. 커밋이 차단됩니다.");
    notify("타입 경고", "🚨 Type 에러를 확인해 주세요! 👮");
    process.exit(1);
  }
}

function main() {
  runLint();
  runTypesForChangedPkgs();
}

try {
  fs.readFileSync(0);
} catch {}

main();
