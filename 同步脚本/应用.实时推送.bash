#! /bin/bash

source 配置.本地.bash
source 配置.远端.bash

while true
do
  source 模板.推送本地更新到远程服务器.bash
  echo 完成一遍
  sleep 1
done

