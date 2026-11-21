#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

QSHELL="${QSHELL:-$HOME/Downloads/qshell}"
upload_lists="$(mktemp -d)"
trap 'rm -rf "$upload_lists"' EXIT

upload() {
  "$QSHELL" qupload2 --src-dir="$PROJECT_DIR/dist" --bucket=peter-blog \
    --overwrite --check-exists --check-hash --thread-count 5 \
    --failure-list "$upload_lists/failed" "$@"
  if [[ -s "$upload_lists/failed" ]]; then
    cat "$upload_lists/failed" >&2
    return 1
  fi
}

echo "==> Building..."
rm -rf ./dist
pnpm build

# 注意：不要在此改写资源路径为 cdn.peterchen97.cn。
# 站点资源（/_astro、/assets）都在 peter-blog bucket，由 blog.peterchen97.cn 服务；
# cdn.peterchen97.cn 绑定的是另一个 bucket（self-peter-chen），改写会导致图片 404。
# 历史上 replace-cdn.sh 曾因此被移除（commit 8e7728d），此处保持相对路径。

echo "==> Uploading assets before HTML..."
upload --rescan-local --skip-suffixes .html
node scripts/qiniu-cache.mjs "$QSHELL" assets

echo "==> Uploading HTML..."
"$QSHELL" dircache dist -o "$upload_lists/all"
awk -F '\t' '$1 ~ /[.]html$/' "$upload_lists/all" > "$upload_lists/html"
test -s "$upload_lists/html"
upload --file-list "$upload_lists/html"
node scripts/qiniu-cache.mjs "$QSHELL" html "$upload_lists/refresh"

echo "==> Refreshing blog HTML and directory URLs..."
"$QSHELL" cdnrefresh -i "$upload_lists/refresh"

echo "==> Deploy complete!"
