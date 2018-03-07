# api-report

零学习成本，简单好用的 API 管理系统 [点击查看 Demo](http://www.apireport.cn/)

[![Build Status](https://travis-ci.org/threeidiot/api-report.svg?branch=master)](https://travis-ci.org/threeidiot/api-report)
[![Coverage Status](https://coveralls.io/repos/github/threeidiot/api-report/badge.svg?branch=master)](https://coveralls.io/github/threeidiot/api-report?branch=master)


## docker 运行

如果你还没有安装 docker, 请先[安装 docker](https://docs.docker.com/install/)

```bash

# 克隆项目
git clone git@github.com:threeidiot/api-report.git

# 进入项目目录
cd api-report

# 部署脚本
bash docker-deploy.sh

```

安装完成后请访问 http://0.0.0.0:7600, 如果需要绑定域名可配置 nginx, 配置如下

```
server {
    listen          80;
    server_name     www.apireport.cn; # 修改为你自己的域名
    charset         utf-8;

    gzip_static on;
    gzip_proxied any;
    proxy_http_version 1.1;

    location / {
        proxy_pass         http://0.0.0.0:7600;
        proxy_redirect     off;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $remote_addr;
    }
}
```

## 本地运行

1. 请先安装 php7.1
1. 请先安装 composer
1. 请先安装 yarn

```bash

# 克隆项目
git clone git@github.com:threeidiot/api-report.git

# 进入项目目录
cd api-report

# 安装项目依赖
bash local-install.sh

# 本地运行
bash local-run.sh

```

安装完成后请访问 http://0.0.0.0:7600



## todo

1. 项目描述、接口描述
1. 界面调整，左边栏改为主菜单，顶部左侧改为当前项目状态和菜单，顶部右侧预留
1. 将临时的 Input 改成 Select 限制输入
1. 增加路径参数
1. 导入导出 swagger 文件
1. 修改接口可通知队友
1. 项目成熟后公开项目

