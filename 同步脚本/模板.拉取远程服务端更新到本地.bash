#! /bin/bash

# 这段代码有效的前提条件
# 1.ssh免密登录设置成功
# 2.环境变量设置正确

rsync -avz --delete \
  $SshUserName@$RemoteHost:$RemotePath \
  $LocalPath
  echo 完成一次拉取
