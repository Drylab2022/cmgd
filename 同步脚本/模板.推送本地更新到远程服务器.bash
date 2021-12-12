#! /bin/bash

rsync -avz \
  $LocalPath \
  --delete \
  --exclude "node_modules" \
  --exclude ".git" \
  --exclude ".idea" \
  $SshUserName@$RemoteHost:$RemotePath
  echo 完成一遍推送
  
# 此处没有使用--delete参数,是因为我们不打算删除远程服务器上的文件。
# 我们的目的只是修改

# 此处的参数--exclude用来指定哪些子目录不用推送