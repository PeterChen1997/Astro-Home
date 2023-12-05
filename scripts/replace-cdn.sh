#!/bin/bash

# 定义要查找的目录
dir="./dist"

find "$dir" -type f -name "*.html" -print0 | while IFS= read -r -d '' file; do
    sed -i '' -e 's|"/_astro/|"https://cdn.peterchen97.cn/_astro/|g' -e 's| /_astro/| https://cdn.peterchen97.cn/_astro/|g' "$file"
done