#!/bin/bash

FIX_FILEPATH=''

read -rp "enter a component group path: " FIX_FILEPATH

node scripts/svgFix.js "$FIX_FILEPATH" || exit 1