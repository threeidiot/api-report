#! /bin/bash

# laravel 的 sqlite 数据库和配置文件
touch api/database/database.sqlite
cp .env.example .env

# 打镜像
docker-compose build

# laravel key 、数据、优化
docker-compose exec api php artisan key:generate
docker-compose exec api php artisan migrate --seed
docker-compose exec api php artisan optimize

# 启动
docker-compose up -d nginx
