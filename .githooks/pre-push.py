import os
import subprocess
import multiprocessing
import sys
from git import get_zero_hash, get_current_user, get_modified_files_by_user
from config import check_quality_before_push, check_type_before_push

ZERO = get_zero_hash()
CURRENT_PATH = os.path.dirname(__file__)
BASE_PATH = os.path.dirname(CURRENT_PATH)
current_user = get_current_user()


def lint_files(modified_files):
    allowed_extensions = [".js", ".jsx", ".ts", ".tsx"]
    files = [
        file
        for file in modified_files
        if os.path.splitext(file)[-1].lower() in allowed_extensions
    ]

    try:
        command = f"pnpm run eslint --no-error-on-unmatched-pattern {' '.join(files)} --ext {','.join(allowed_extensions)}"
        result = subprocess.run(
            command,
            shell=True,
            check=True,
            text=True,
            capture_output=True,
            cwd=BASE_PATH,
        )
        print("ESLint finished successfully.")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print("ESLint reported an error:")
        print(e.stderr, e.stdout)
        sys.exit(e.returncode)


def type_check(target):
    try:
        return subprocess.run(f"pnpm run {target}:typecheck", shell=True).returncode
    except subprocess.CalledProcessError as e:
        print(e)
        return e.returncode


for line in sys.stdin.readlines():
    local_ref, local_sha1, remote_ref, remote_sha1 = line.strip().split()

    if local_sha1 == ZERO:
        print("Skipping deleted branch:", local_ref)
        continue

    if remote_sha1 == ZERO:
        print(f"Processing new branch: {local_ref}")
        # Empty tree hash to master
        compare_range = f"master...{local_sha1}"
    else:
        print(f"Processing existing branch: {local_ref}")
        compare_range = f"{remote_sha1}...{local_sha1}"

    modified_files = get_modified_files_by_user(compare_range, author=current_user)

    print("modified_files : ", modified_files)

    # 코드 퀄리티 검사
    if check_quality_before_push:
        lint_files(modified_files)

    # 타입 검사
    if check_type_before_push:
        # 변경된 모든 파일들에 대해 병렬로 타입 검사 수행
        with multiprocessing.Pool(4) as pool:
            results = list(pool.map(type_check, modified_files))

        if not all(x == 0 or x is None for x in results):
            print("타입 체크에 실패했습니다.")
            sys.exit(1)
