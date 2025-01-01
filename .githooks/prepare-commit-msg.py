import sys
from git import (
    get_current_git_dir,
    validate_message,
)
from utils import notify

file_name = sys.argv[2]
with open(file_name, "r") as file:
    message = file.read()

git_dir = get_current_git_dir()
target_service = ""
target_ticket = ""


if not validate_message(message):
    print("🚨 Git 컨벤션을 준수해주세요! 👮")
    print("")
    notify("컨벤션 경고", "🚨 Git 컨벤션을 준수해주세요! 👮")
    sys.exit(1)
