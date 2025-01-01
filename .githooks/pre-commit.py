import sys
import subprocess
from git import get_changed_files

changed_files = get_changed_files('ACMR')
files_str = ' '.join(changed_files)

if not changed_files:
    sys.exit(0)

try:
    # Prettify all selected files
    files = ' '.join([f"'{file}'" for file in changed_files])
    subprocess.run(
        f"npx prettier --ignore-unknown --write {files}",
        shell=True
    )

    # Add back the modified/prettified files to staging
    subprocess.run(
        f'git add {files_str}',
        shell=True
    )
except subprocess.CalledProcessError as e:
    print(f'An error occurred: {e.output}')
    exit(1)
