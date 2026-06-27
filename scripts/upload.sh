#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "==> Building..."
rm -rf ./dist
yarn build

echo "==> Uploading to Qiniu (incremental, skipping unchanged files)..."
~/Downloads/qshell qupload2 --src-dir=dist --bucket=peter-blog --overwrite --check-hash --thread-count 5

echo "==> Refreshing CDN..."
~/Downloads/qshell cdnrefresh -i ./scripts/refresh.txt

echo "==> Deploy complete!"
