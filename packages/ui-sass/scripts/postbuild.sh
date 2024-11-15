#!/bin/bash

ls
# dist 하위 폴더 전부 삭제
cd ./dist || echo "no dir"
for dir in */; do
  rm -rf "$dir"
done

cd ../
pnpm sass-compile 
