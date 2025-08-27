import { execSync, execFileSync } from "child_process";
import fs from "fs";
import path from "path";

/** 쉘 실행 (문자열 반환) */
export function sh(cmd, opts = {}) {
  return execSync(cmd, { encoding: "utf8", stdio: "pipe", ...opts }).trim();
}

/** 쉘 실행 (부모 stdio 상속) */
export function shInherit(cmd) {
  execSync(cmd, { stdio: "inherit" });
}

/** 빈 입력을 해시하여 길이에 맞는 0 문자열 반환 (sha1/sha256 대응) */
export function getZeroHash() {
  try {
    const out = execFileSync("git", ["hash-object", "--stdin"], {
      input: "",
      encoding: "utf8",
    }).trim();
    return "0".repeat(out.length);
  } catch {
    try {
      const fmt = execSync("git config --get extensions.objectFormat", {
        encoding: "utf8",
        stdio: "pipe",
      }).trim();
      return "0".repeat(fmt === "sha256" ? 64 : 40);
    } catch {
      return "0".repeat(40);
    }
  }
}

/** 현재 Git 사용자 */
export function getCurrentUser() {
  const name = sh("git config user.name") || "";
  const email = sh("git config user.email") || "";
  return { name, email };
}

/** 스테이징된 파일 목록(ACMR) */
export function getStagedFiles() {
  const out = sh("git diff --cached --name-only --diff-filter=ACMR");
  return out ? out.split("\n").filter(Boolean) : [];
}

/** base..HEAD 사이 변경된 TS/TSX 파일 */
export function getChangedTsFilesSince(base) {
  const out = sh(`git diff --name-only --diff-filter=ACMR ${base}..HEAD`);
  return out
    ? out
        .split("\n")
        .filter(Boolean)
        .filter((f) => /^(apps|packages)\/.*\.(ts|tsx)$/.test(f))
    : [];
}

/** 현재 브랜치 upstream (e.g. origin/develop) */
export function getUpstreamRefOrNull() {
  try {
    return sh("git rev-parse --abbrev-ref --symbolic-full-name @{u}");
  } catch {
    return null;
  }
}

/** HEAD와 ref의 merge-base */
export function getMergeBaseWith(ref) {
  return sh(`git merge-base HEAD ${ref}`);
}

/** ref 존재 여부 확인 (refs/remotes/<ref> 또는 임의 ref) */
export function refExists(ref) {
  try {
    sh(`git rev-parse --verify --quiet ${ref}`);
    return true;
  } catch {
    return false;
  }
}

/**
 * 기본 베이스 원격 브랜치 추론:
 * 1) refs/remotes/origin/HEAD → origin/<default>
 * 2) 하드코딩 후보(origin/main) 존재 시 그걸 사용
 * 3) 없으면 null (상위 로직이 로컬 fallback 사용)
 */
export function getDefaultOriginMain() {
  try {
    const sym = sh("git symbolic-ref refs/remotes/origin/HEAD");
    const branch = sym.split("/").slice(-1)[0];
    const ref = `origin/${branch}`;
    if (refExists(`refs/remotes/${ref}`)) {
      return ref;
    }
  } catch {
    // pass
  }
  const hardcoded = "origin/main";
  if (refExists(`refs/remotes/${hardcoded}`)) {
    return hardcoded;
  }
  return null;
}

/** fork-point 우선, 실패 시 merge-base 반환. 둘 다 실패하면 null */
export function getForkPointOrMergeBase(baseRef) {
  try {
    const fork = sh(`git merge-base --fork-point ${baseRef} HEAD`);
    if (fork) {
      return fork;
    }
  } catch {
    // pass
  }
  try {
    const mb = getMergeBaseWith(baseRef);
    if (mb) {
      return mb;
    }
  } catch {
    // pass
  }
  return null;
}

/**
 * pre-push stdin으로 받은 레퍼런스 라인들을 기반으로
 * 비교 범위(base, tip)를 결정합니다.
 * - 새 브랜치 첫 푸시(remoteSha==0)일 때:
 *   1) 현재 브랜치 upstream이 있으면 → fork-point/upstream 기준
 *   2) 없으면 → getDefaultOriginMain() 결과로 fork-point/merge-base
 *   3) 그래도 없으면 → 로컬 fallback (HEAD~1 또는 HEAD)
 * - 기존 브랜치 푸시(remoteSha!=0)일 때:
 *   base=remoteSha, tip=localSha
 * - stdin이 비어있을 때(일부 환경): upstream→default→로컬 fallback 순
 */
export function inferCompareRangesFromStdin(stdinText) {
  const zero = getZeroHash();
  const lines = (stdinText || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    const up = getUpstreamRefOrNull();
    if (up) {
      const base = getForkPointOrMergeBase(up) || null;
      if (base !== null) {
        return [{ base }];
      }
    }
    const def = getDefaultOriginMain();
    if (def !== null) {
      const base = getForkPointOrMergeBase(def) || null;
      if (base !== null) {
        return [{ base }];
      }
    }
    let base = "HEAD~1";
    try {
      base = sh("git rev-parse HEAD~1");
    } catch {
      base = sh("git rev-parse HEAD");
    }
    return [{ base }];
  }

  const ranges = [];
  for (const line of lines) {
    const [localRef, localSha, remoteRef, remoteSha] = line.split(/\s+/);
    if (localSha === zero) {
      continue;
    }
    if (remoteSha === zero) {
      // 새 브랜치 첫 푸시: "그 피처를 딴 헤드(포크 포인트)"를 우선 사용
      const up = getUpstreamRefOrNull();
      if (up) {
        const base = getForkPointOrMergeBase(up) || null;
        if (base !== null) {
          ranges.push({ base, tip: localSha });
          continue;
        }
      }
      const def = getDefaultOriginMain();
      if (def !== null) {
        const base = getForkPointOrMergeBase(def) || null;
        if (base !== null) {
          ranges.push({ base, tip: localSha });
          continue;
        }
      }
      let base = "HEAD~1";
      try {
        base = sh("git rev-parse HEAD~1");
      } catch {
        base = sh("git rev-parse HEAD");
      }
      ranges.push({ base, tip: localSha });
    } else {
      ranges.push({ base: remoteSha, tip: localSha });
    }
  }
  return ranges;
}

/** git log 출력에서 특정 author가 수정한 파일만 추출 */
export function filterFilesByUser(logOutput, author) {
  const { name, email } = author || {};
  const want = `${name} <${email}>`;
  const modified = new Set();
  let capture = false;

  for (const line of (logOutput || "").split("\n")) {
    if (line === "") {
      capture = false;
      continue;
    }
    if (line.startsWith(want)) {
      capture = true;
      continue;
    }
    if (capture && line.trim() && !line.includes(" ")) {
      modified.add(line.trim());
    }
  }
  return Array.from(modified);
}

/** compareRange(A..B/A...B)에서 author가 수정한 파일만 반환 */
export function getModifiedFilesByUser(compareRange, author) {
  const out = sh(
    `git log --name-only --pretty=format:'%an <%ae>' ${compareRange} --diff-filter=d`
  );
  return filterFilesByUser(out, author);
}

/** 파일이 속한 가장 가까운 package.json의 name 찾기 */
export function findPackageName(filePath) {
  let currentDir = path.dirname(filePath);
  const root = path.parse(currentDir).root;

  while (true) {
    const pkg = path.join(currentDir, "package.json");
    try {
      const json = JSON.parse(fs.readFileSync(pkg, "utf8"));
      return json.name || null;
    } catch {
      // pass
    }
    if (currentDir === root) {
      break;
    }
    currentDir = path.dirname(currentDir);
  }
  return null;
}

/** JS/TS 류 확장자 필터 */
export function pickTsLike(files) {
  const rx = /\.(ts|tsx|js|jsx)$/i;
  return (files || []).filter((f) => rx.test(f));
}

/** 중복 제거 */
export function unique(arr) {
  return Array.from(new Set(arr));
}

/** 루트 린트 실행(검사만) */
export function runRootLintCheck() {
  shInherit("pnpm lint");
}

/** 변경된 패키지 한정 typecheck */
export function runTypecheckForPackages(pkgs) {
  for (const name of unique(pkgs)) {
    shInherit(`pnpm --filter "${name}" run typecheck`);
  }
}

/** 전역 typecheck */
export function runGlobalTypecheck() {
  shInherit("pnpm run typecheck");
}

/** ESLint --fix 후 re-stage */
export function eslintFixAndStage(files) {
  const tsLike = pickTsLike(files);

  const existing = tsLike.filter((f) => {
    try {
      return fs.existsSync(f);
    } catch {
      return false;
    }
  });

  const targets = unique(existing);

  if (targets.length === 0) {
    console.log("ESLint --fix 대상 파일이 없습니다. (모두 삭제/이동되었을 가능성)");
    return;
  }

  for (const f of targets) {
    console.log(`ESLint --fix: ${f}`);
    shInherit(`pnpm exec eslint --fix "${f}"`);
  }

  const list = targets.map((f) => `"${f}"`).join(" ");
  shInherit(`git add ${list}`);
}