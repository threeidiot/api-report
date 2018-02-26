#! /bin/bash

# 创建 sqlite 数据库
touch api/database/database.sqlite

# 复制 laravel 配置文件
if [ ! -f "api/.env" ] 
then
    cp api/.env.example api/.env
fi

# 安装 laravel 依赖
cd api
if [ -d "vendor" ] 
then
    rm -rf vendor
fi
composer install
php artisan key:generate
php artisan migrate --seed

# 安装 npm 依赖
cd ../web
if [ -d "node_modules" ] 
then
    rm -rf node_modules
fi
yarn install

echo 'Success! Please execute the local-run.sh file.'
