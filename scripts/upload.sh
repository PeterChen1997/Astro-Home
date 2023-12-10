# rm -rf ./dist
# sudo yarn build
# 需要删除缓存
# ~/Downloads/qshell qupload2 --src-dir=dist --bucket=peter-blog --overwrite --thread-count 100
# 不删除缓存
# ~/Downloads/qshell qupload2 --src-dir=dist --bucket=peter-blog --thread-count 100
# ~/Downloads/qshell cdnrefresh -i ./scripts/refresh.txt