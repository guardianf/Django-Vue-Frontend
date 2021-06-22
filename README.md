# Django Vue Frontend
![vue version](https://img.shields.io/badge/vue-2.6.10-brightgreen.svg)
![elementui version](https://img.shields.io/badge/element--ui-2.13.2-brightgreen.svg)


English | [简体中文](./README.zh-CN.md)

## Introduction

Django Vue Frontend is a test-demo for admin interfaces. It is based on [vue](https://github.com/vuejs/vue) and uses the UI Toolkit [element-ui](https://github.com/ElemeFE/element).

## Preparation
- Prefer to use nvm to manage version of Node.js
``` bash
nvm install 12.17.0 # install nodejs v12.17.0
npm install # install all rely-ons
```
- Nginx as webserver.
```bash
sudo apt install nginx
sudo mkdir -p /var/www/10.21.0.129/html # here 10.21.0.129 is the domain of the website.
sudo chown -R $USER:$USER /var/www/10.21.0.129/html # assign ownership of the dictionary
sudo chmod -R 775 /var/www/10.21.0.129 # set permission
```

## run dev
1. change **VUE_BACKEND_HOST** in .env.development
2. run npm script
```bash
npm run dev
```

## prod
Use Nginx as webserver to deploy websites
1. config nginx server
```bash
sudo nano /etc/nginx/sites-available/10.21.0.129 # 10.21.0.129 is the domain you defined first
```
file: `/etc/nginx/sites-available/10.21.0.129`
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
sudo ln -s /etc/nginx/sites-available/10.21.0.129 /etc/nginx/sites-enabled/ # soft link sites available to sites enable
sudo nginx -t
```
2. start nginx server
```bash
systemcrtl start nginx
```
3. cp dist to nginx
```bash
sudo rm -rf /var/www/10.21.0.129/html/ # remove all files in dist folder
sudo mkdir /var/www/10.21.0.129/html # make html folder again
sudo cp -rf dist/* /var/www/10.21.0.129/html/ # copy dist files to html folder
```

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions |

## License

[MIT](https://github.com/PanJiaChen/vue-element-admin/blob/master/LICENSE)

Copyright (c) 2017-present PanJiaChen
