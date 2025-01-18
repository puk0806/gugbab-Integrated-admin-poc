import os
import json

_CURRENT_DIR = os.path.dirname(__file__)
_CONFIG_FILE_PATH = os.path.join(_CURRENT_DIR, "..", "githooks.config.json")

try:
    with open(_CONFIG_FILE_PATH, "r") as file:
        config = json.load(file)
except FileNotFoundError:
    config = {}
except json.JSONDecodeError:
    config = {}

check_quality_before_push = config.get("checkQualityBeforePush", False)
check_type_before_push = config.get("checkTypeBeforePush", False)
