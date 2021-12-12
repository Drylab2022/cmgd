#! /usr/bin/bash

/usr/sbin/sshd -d

# 以下代码调试用：只有sshd服务器异常退出才会执行
# while true; do
# echo 'xxx'
# sleep 65535
# done
