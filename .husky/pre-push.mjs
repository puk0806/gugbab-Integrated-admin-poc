import fs from "fs";
import { notify } from "./notify.mjs";
import {
  getCurrentUser,
  inferCompareRangesFromStdin,
  getModifiedFilesByUser,
  eslintFixAndStage,
  runGlobalTypecheck,
} from "./utils.mjs";

function main() {
  let stdin = "";
  try {
    stdin = fs.readFileSync(0, "utf8");
  } catch {
    stdin = "";
  }

  const ranges = inferCompareRangesFromStdin(stdin);
  const author = getCurrentUser();

  const modified = new Set();
  for (const r of ranges) {
    const compare = r.tip ? `${r.base}...${r.tip}` : `${r.base}..HEAD`;
    const files = getModifiedFilesByUser(compare, author);
    files.forEach((f) => modified.add(f));
  }

  try {
    const targets = Array.from(modified);
    if (targets.length > 0) {
      console.log("▶ ESLint --fix 대상:", targets.join(", "));
      eslintFixAndStage(targets);
    } else {
      console.log("변경된 파일이 없습니다. (pre-push lint 단계 스킵)");
    }
  } catch {
    console.log(
      "🚨 ESLint 자동수정 중 오류가 발생했습니다. 푸시가 차단됩니다."
    );
    notify("코드 품질 경고", "🚨 ESLint 실패! 👮");
    process.exit(1);
  }

  try {
    console.log("▶ Global typecheck 실행");
    runGlobalTypecheck();
  } catch {
    console.log("🚨 타입 체크에 실패했습니다. 푸시가 차단됩니다.");
    notify("타입 경고", "🚨 Type 에러를 확인해 주세요! 👮");
    process.exit(1);
  }
}

main();
