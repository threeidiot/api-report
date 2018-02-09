# api-report

零学习成本，简单好用的 API 管理系统

[![Build Status](https://travis-ci.org/threeidiot/api-report.svg?branch=master)](https://travis-ci.org/threeidiot/api-report)
[![Coverage Status](https://coveralls.io/repos/github/threeidiot/api-report/badge.svg?branch=master)](https://coveralls.io/github/threeidiot/api-report?branch=master)

## TODO

自定义添加编辑所有接口的 header （测试时用来绕过签名）
自定义添加编辑所有接口的公共参数


## 贡献代码

### api 本地部署

api 基于 laravel 开发

```
git clone git@github.com:threeidiot/api-report.git
cd api-report/api

# 下载项目依赖
composer install -vvv

# 复制配置文件，请修改数据库配置
cp .env.example .env

# 生成加密 key
php artisan key:generate

# 创建表结构，并填充必要数据
php artisan migrate --seed

# 启动 api 服务，访问 http://127.0.0.1:7500 展示 api 列表
php artisan serve --host=0.0.0.0 --port=7500
```

### web 本地部署

web 基于 react + mobx + antd-design 开发，开发工具 yarn + webpack + babel

```
git clone git@github.com:threeidiot/api-report.git
cd api-report/web

# 下载项目依赖
yarn install

# 启动 web 服务，访问 http://127.0.0.1:7600 展示 web 界面
yarn start

```
