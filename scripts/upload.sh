#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "==> Building..."
rm -rf ./dist
pnpm build

# 注意：不要在此改写资源路径为 cdn.peterchen97.cn。
# 站点资源（/_astro、/assets）都在 peter-blog bucket，由 blog.peterchen97.cn 服务；
# cdn.peterchen97.cn 绑定的是另一个 bucket（self-peter-chen），改写会导致图片 404。
# 历史上 replace-cdn.sh 曾因此被移除（commit 8e7728d），此处保持相对路径。

echo "==> Uploading to Qiniu (incremental, skipping unchanged files)..."
~/Downloads/qshell qupload2 --src-dir=dist --bucket=peter-blog --overwrite --check-hash --rescan-local --thread-count 5

echo "==> Refreshing CDN..."
~/Downloads/qshell cdnrefresh -i ./scripts/refresh.txt

echo "==> Deploy complete!"
