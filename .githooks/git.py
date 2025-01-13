import re
import subprocess


def git(args):
    args = ["git"] + args
    cmd = subprocess.Popen(args, stdout=subprocess.PIPE)
    details = cmd.stdout.read()
    details = details.decode("utf-8", "replace").strip()
    return details


def get_current_git_dir():
    return git(["rev-parse", "--git-dir"])


def get_changed_files(filter=""):
    args = ["diff", "--cached", "--name-only"]

    if filter != "":
        args.append(f"--diff-filter={filter}")

    changed = git(args)

    return [s.strip() for s in changed.split("\n")]


services = ["app", "storybook", "ui", "utils", "icons", "eslint", "tsconfig","all"]
prefix_verbs = [
    "Add",
    "Remove",
    "Fix",
    "Modify",
    "Improve",
    "Refactor",
    "Simplify",
    "Move",
    "Rename"
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
