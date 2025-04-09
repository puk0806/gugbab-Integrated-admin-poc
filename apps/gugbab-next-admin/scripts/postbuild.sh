#!/bin/bash

STANDALONE_PATH='.next/standalone/apps/gugbab-next-admin'

cp -r public $STANDALONE_PATH
mkdir $STANDALONE_PATH/config
cp -r env $STANDALONE_PATH/config/env
cp -r .next/static $STANDALONE_PATH/.next
cp -r scripts/pre-start $STANDALONE_PATH

pwd

cd $STANDALONE_PATH/pre-start
npm  install

echo "build success!"

exit 0
