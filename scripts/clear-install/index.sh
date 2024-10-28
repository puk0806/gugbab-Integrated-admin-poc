#!/bin/bash

echo "remove node_modules:"
echo "  \$ROOT/node_modules"
rm -r "node_modules"
for d in packages/*/node_modules; do
  echo "  $d"
  rm -r "$d"
done

for d in apps/*/node_modules; do
  echo "  $d"
  rm -r "$d"
done

pnpm store prune

pnpm install
