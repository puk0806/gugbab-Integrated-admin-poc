#!/bin/sh

echo "\033[0;34mCLI\033[0m Sass Compile start"

COMPONENTS_DIR="src/components"
SCSS_DIR="public/styles/components.scss"

used_scss_to_components=$(find "$COMPONENTS_DIR" -type f -name "index.scss" | sed "s#src/components#@import \"../../src/components#" | sed "s#/index.scss#\";#")

# 배열 대신 문자열 사용
scss_import_text_str=$(echo "$used_scss_to_components" | tr '\n' ' ')

# 배열 검사 로직 대체
not_write_scss_str=""
for scss_import_text in $scss_import_text_str; do
  if ! grep -q "$scss_import_text" "$SCSS_DIR"; then
    not_write_scss_str="$not_write_scss_str $scss_import_text"
  fi
done

if [ -n "$not_write_scss_str" ]; then
  echo "\033[0;31mError\033[0m ${not_write_scss_str} is not write"
  exit 1
fi

npx sass --no-source-map --load-path=. --style=compressed public/styles:public/styles

echo "\x1b[32mSASS\x1b[0m ⚡️Compile success"
