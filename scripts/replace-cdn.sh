#!/bin/bash

# 定义要查找的目录
dir="./dist"

find "$dir" -type f -name "*.html" -print0 | while IFS= read -r -d '' file; do
    # 根据操作系统决定是否提供 -i 选项的参数
    if [[ "$(uname)" == "Darwin" ]]; then
        # macOS
        sed -i '' -e 's|"/_astro/|"https://cdn.peterchen97.cn/_astro/|g' -e 's| /_astro/| https://cdn.peterchen97.cn/_astro/|g' \
        -e 's|=/assets/|=https://cdn.peterchen97.cn/assets/|g' "$file"
    else
        # Linux
        sed -i -e 's|"/_astro/|"https://cdn.peterchen97.cn/_astro/|g' -e 's| /_astro/| https://cdn.peterchen97.cn/_astro/|g' -e 's|=/assets/|=https://cdn.peterchen97.cn/assets/|g' "$file"
    fi
done