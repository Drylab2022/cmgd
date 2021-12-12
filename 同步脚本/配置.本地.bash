#! /bin/bash
 
# 当前脚本路径路径
CurrentBashPath=$0
# 当前脚本路径完整路径
CurrentBashFullPath=$(realpath CurrentBashPath) 
# 当前脚本所在目录
CurrentBashDir=$(dirname $CurrentBashFullPath)

LocalPath="$CurrentBashDir/../programs/"