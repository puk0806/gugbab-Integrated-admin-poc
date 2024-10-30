#!/bin/bash

STANDALONE_PATH='./.next/standalone'

cp -r public $STANDALONE_PATH
mkdir $STANDALONE_PATH/config
cp -r env $STANDALONE_PATH/config/env
cp -r .next/static $STANDALONE_PATH/.next
cp -r scripts/prestart $STANDALONE_PATH

pwd

cd $STANDALONE_PATH/prestart
yarn add pnpm
pnpm install

echo "build success!"

exit 0
