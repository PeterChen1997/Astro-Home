sudo rm -rf ./dist
sudo yarn build

sudo rm -rf /Users/peterchen/.qshell/users/晨阳/qupload2

# 需要删除缓存
sudo ~/Downloads/qshell qupload2 --src-dir=dist --bucket=peter-blog --overwrite --thread-count 5
# 不删除缓存
# ~/Downloads/qshell qupload2 --src-dir=dist --bucket=peter-blog --thread-count 100
sudo ~/Downloads/qshell cdnrefresh -i ./scripts/refresh.txt