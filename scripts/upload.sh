#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "==> Building..."
rm -rf ./dist
pnpm build

echo "==> Replacing CDN paths..."
bash scripts/replace-cdn.sh

echo "==> Uploading to Qiniu (incremental, skipping unchanged files)..."
~/Downloads/qshell qupload2 --src-dir=dist --bucket=peter-blog --overwrite --check-hash --rescan-local --thread-count 5

echo "==> Refreshing CDN..."
~/Downloads/qshell cdnrefresh -i ./scripts/refresh.txt

echo "==> Deploy complete!"
