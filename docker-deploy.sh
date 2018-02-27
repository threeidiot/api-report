#! /bin/bash

# 创建 sqlite 数据库
touch api/database/database.sqlite

# 复制 laravel 配置文件
if [ ! -f "api/.env" ] 
then
    cp api/.env.example api/.env
fi

# 安装依赖 
sudo docker-compose run composer
sudo docker-compose run node

# 启动容器
sudo docker-compose up -d nginx

# laravel key 、数据、优化
sudo docker-compose exec api php artisan key:generate
sudo docker-compose exec api php artisan migrate --seed --env=docker
sudo docker-compose exec api php artisan optimize

