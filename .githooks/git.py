import re
import subprocess


def git(args):
    args = ["git"] + args
    cmd = subprocess.Popen(args, stdout=subprocess.PIPE)
    details = cmd.stdout.read()
    details = details.decode("utf-8", "replace").strip()
    return details


def run_command(command):
    try:
        return subprocess.check_output(command, shell=True, text=True).strip()
    except subprocess.CalledProcessError as e:
        return e.output


def get_current_git_dir():
    return git(["rev-parse", "--git-dir"])


def get_current_user():
    name = git(["config", "user.name"])
    email = git(["config", "user.email"])
    return name, email


def get_changed_files(filter=""):
    args = ["diff", "--cached", "--name-only"]

    if filter != "":
        args.append(f"--diff-filter={filter}")

    changed = git(args)

    return [s.strip() for s in changed.split("\n")]


def get_modified_files_by_user(compare_range, author=None):
    cmd = f"git log --name-only --pretty=format:'%an <%ae>' {compare_range}"
    log_output = run_command(cmd)
    return filter_files_by_user(log_output, author=author)


def filter_files_by_user(log_output, author=None):
    """It should filter logs with author

    >>> input = '''
    ... puk0806 <puk0806@naver.com>
    ... .githooks/git.py
    ... .githooks/config.py
    ...
    ... puk0806 <puk0806@naver.com>
    ... .githooks/git.py
    ... .githooks/config.py
    ... '''
    ...
    >>> sorted(filter_files_by_user(input, ["puk0806", "puk0806@naver.com"]))
    ['.githooks/config.py', '.githooks/git.py']
    """
    modified_files = set()
    capture_next_line = False

    for line in log_output.splitlines():
        if author[0] in line and author[1] in line:
            capture_next_line = True
        elif capture_next_line and line.strip() and " " not in line:
            modified_files.add(line.strip())
        elif line == "":
            capture_next_line = False

    return list(modified_files)


def get_zero_hash():
    empty_hash = subprocess.check_output(
        "git hash-object --stdin </dev/null", shell=True, text=True
    ).strip()
    zero_hash = re.sub(r"[0-9a-f]", "0", empty_hash)
    return zero_hash


services = ["app", "storybook", "ui", "utils", "icons", "eslint", "tsconfig", "all"]
prefix_verbs = [
    "Add",
    "Remove",
    "Fix",
    "Modify",
    "Improve",
    "Refactor",
    "Simplify",
    "Move",
    "Rename",
    "Merge",
]
services_pattern = "|".join(services)
verbs_pattern = "|".join(prefix_verbs)


def validate_message(message):
    """It should validate message by pattern

    >>> validate_message('Random message')
    False
    >>> validate_message('Add this')
    True
    """
    default_pattern = rf"^(\[({services_pattern})\] )?({verbs_pattern})"
    return re.match(default_pattern, message) is not None
