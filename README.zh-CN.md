# Django Vue Frontend
![vue version](https://img.shields.io/badge/vue-2.6.10-brightgreen.svg)
![elementui version](https://img.shields.io/badge/element--ui-2.13.2-brightgreen.svg)


[English](./README.md) | 简体中文

## 介绍

Django Vue Frontend 是一个后管系统的测试Demo页面. 他主要是基于[vue](https://github.com/vuejs/vue) 并且使用[element-ui](https://github.com/ElemeFE/element)作为UI组件.

## 项目准备
- **推荐**使用nvm作为Node.js的版本管理工具
``` bash
nvm install 12.17.0 # 安装 nodejs v12.17.0
npm install # 安装所有依赖
```
- 使用Nginx作为Web服务器
```bash
sudo apt install nginx
sudo mkdir -p /var/www/10.21.0.129/html # 网站的地址是10.21.0.129
sudo chown -R $USER:$USER /var/www/10.21.0.129/html # 当前用户获得目录操作权限
sudo chmod -R 775 /var/www/10.21.0.129 # 设置读写权限
```

## 运行开发环境
1. 在.env.development文件中修改 **VUE_BACKEND_HOST**为后端指定的地址和端口
2. 运行npm脚本来启动开发环境
```bash
npm run dev
```

## 部署
使用Nginx服务器来作为网站的运行服务器
1. 配置nginx
```bash
sudo nano /etc/nginx/sites-available/10.21.0.129 # 这里的10.21.0.129就是之前定义的项目网址
```
添加文件: `/etc/nginx/sites-available/10.21.0.129`
```
server {
  listen 80;
  listen [::]:80;

  root /var/www/10.21.0.129/html
  index index.html index.htm index.nginx-debian.html

  location /api/ {
    proxy_pass http://10.21.0.129:8080/api/;
    proxy_set_header Host $host:$server_port
  }
}
```
```bash
sudo ln -s /etc/nginx/sites-available/10.21.0.129 /etc/nginx/sites-enabled/ # 做一个软连接，这样就不用再创建第二次了
sudo nginx -t
```
2. 启动Nginx服务器
```bash
systemcrtl start nginx
```
3. 把项目文件拷贝到Nginx服务器下
```bash
sudo rm -rf /var/www/10.21.0.129/html/ # 移除Nginx服务器下所有文件内容
sudo mkdir /var/www/10.21.0.129/html # 重新创建文件夹
sudo cp -rf dist/* /var/www/10.21.0.129/html/ # 把项目文件拷贝到Nginx定义的文件夹下
```

## 支持的浏览器

现代浏览器和IE10+

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions |

## 许可证

[MIT](https://github.com/guardianf/Django-Vue-Frontend/blob/develop/LICENSE)

Copyright (c) 2021-present Guardianf
