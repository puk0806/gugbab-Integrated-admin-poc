#!/bin/bash

component_name=''
echo "Enter a component name in PascalCase"
read -rp "=>" component_name

if [ -z "$component_name" ]; then
  echo "Error component name"
  exit 1
fi

node ./scripts/generate-component/generate.js "$component_name"
