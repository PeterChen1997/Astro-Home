dir="./dist"

# 使用 find 命令查找并统计目录中的文件数量
file_count=$(find "$dir" -type f | wc -l)

echo "文件数量: $file_count"