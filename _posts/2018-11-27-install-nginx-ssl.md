---
layout: post
title:  "记一次 Nginx 服务器安装 SSL 证书"
categories: Nginx SSL
tags: Nginx SSL
author: 红影
---

* content
{:toc}

> 双十一阿里云搞优惠活动，早就想接触下阿里云的产品了，随即购买了阿里云的服务器，还挺便宜一年 199 元，不知道下一年的双十一会不会比这个优惠，同时也购买了域名，申请了免费的 SSL 证书。

#### 前言

云服务器分配完毕后，开始搭建环境、配置 Nginx 服务，Nginx 服务配置参考了菜鸟教程的 [Nginx 安装配置](https://www.runoob.com/linux/nginx-install-setup.html)

购买的域名是 `liuhongfeng.cn`，本来是想购买 `liuhongfeng.com` 这个域名的，无奈已被别人占用，域名购买成功后，配置解析到已买的阿里云服务器，解析成功后就可以直接通过域名访问服务了，但是域名没有进行备案，访问域名跳转到了备案提示页面，不备案是不行的，接着在阿里云进行域名备案，初审、邮寄幕布、拍照、提交资料到管局，千等万等，18 天后备案终于成功。

#### 正题

阿里云的免费证书还是很好申请的，工作日的话，基本半个小时就申请下来了，在证书控制台下载 Nginx 版本证书，文件解压后会得到下面这两个文件：

![证书解压](https://images.hongying239.com/image/blog/decompression.png)

`.crt` 文件是安全证书

`.key` 文件是证书的私钥文件

#### 安装流程
1. 将 `.crt` 证书文件的扩展名修改为 `.pem`

2. 在 Nginx 的安装目录下创建 `cert` 目录，并且将两个文件拷贝到 `cert` 目录中，如下图所示：
![cert 目录](https://images.hongying239.com/image/blog/cert.png)

3. 打开 Nginx 安装目录下 `conf` 目录中的 `nginx.conf` 文件，在文件的最后添加如下配置信息：
```
# HTTPS server
server {
    listen 443; #监听的端口
    server_name localhost;
    ssl on;
    root html; #网站目录
    index index.html index.htm; #默认访问文件优先顺序
    ssl_certificate   cert/cert-1541670637888_www.liuhongfeng.cn.pem;
    ssl_certificate_key  cert/cert-1541670637888_www.liuhongfeng.cn.key;
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
        location / {
        root html;
        index index.html index.htm;
    }
}
```
保存退出

4. 检查配置文件 `nginx.conf` 的正确性
```
[root@hongfeng nginx]# /usr/local/webserver/nginx/sbin/nginx -t
nginx: the configuration file /usr/local/webserver/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/webserver/nginx/conf/nginx.conf test is successful
```

5. nginx 重启：
```
[root@hongfeng nginx]# /usr/local/webserver/nginx/sbin/nginx -s reopen
```

此时通过 `https://liuhongfeng.cn` 或者 `https://www.liuhongfeng.cn` 访问服务会显示如下：

![访问服务](https://images.hongying239.com/image/blog/access_service.png)

跳转后的链接左侧，出现小锁子的图标，说明 SSL 证书安装成功。

但是此时通过 `liuhongfeng.cn` 或 `www.liuhongfeng.cn` 访问还不是 `https` 请求，需要将访问的默认 80 端口请求重定向到 `https` 的 443 端口上，这就用到了 Nginx 的 `rewrite` 的方法，将所有的 `http` 请求通过 `rewrite` 重写到 `https` 上。

再次编辑 `nginx.conf` 文件，将 `server_name` 的值设为域名地址，下面追加 `rewrite ^(.*)$ https://$host$1 permanent;`，如下所示：

```
server {
    listen       80;
    server_name  liuhongfeng.cn;
    rewrite ^(.*)$ https://$host$1 permanent;

    location / {
        root   html;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

保存退出

再次执行第4、5步，访问 `liuhongfeng.cn` 或 `www.liuhongfeng.cn` 就直接跳转到了 `https://liuhongfeng.cn` 或 `https://www.liuhongfeng.cn`

#### 名词解释

##### SSL 证书
> SSL 证书是遵守 SSL 安全套接层协议的服务器数字证书。SSL 证书由浏览器中受信任的根证书颁发机构在验证服务器身份后颁发，具有网站身份验证和加密传输双重功能。

##### HTTPS
> HTTPS 是一种基于 SSL 协议的网站加密传输协议。
>
> 网站安装SSL证书后，使用 HTTPS 加密协议访问，可激活客户端浏览器到网站服务器之间的 SSL 加密通道（SSL 协议），从而实现高强度双向加密传输，防止传输数据被泄露或篡改。简单来说，HTTPS = HTTP + SSL，是 HTTP 的安全版。

名词解释参考：
[名词解释_产品简介_SSL证书-阿里云](https://help.aliyun.com/knowledge_detail/42228.html?spm=a2c4g.11186623.6.595.224174d5KDhoaF)