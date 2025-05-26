#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd ./src/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init -b master
git add -A 
git commit -m 'update'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:liuzhaoxu1996/liuzhaoxu1996.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -