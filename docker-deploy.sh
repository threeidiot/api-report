#! /bin/bash

# laravel 的 sqlite 数据库和配置文件
touch api/database/database.sqlite
cp api/.env.example api/.env

# 安装依赖 
docker-compose run composer
docker-compose run node

# 启动容器
docker-compose up -d nginx

# laravel key 、数据、优化
docker-compose exec api php artisan key:generate
docker-compose exec api php artisan migrate --seed
docker-compose exec api php artisan optimize

