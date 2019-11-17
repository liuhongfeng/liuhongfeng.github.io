---
layout: post
title:  "IDEA Terminal git log 中文显示乱码问题"
categories: Git
tags: IDEA Git
author: 红影
---

* content
{:toc}

IntelliJ IDEA Windows 下 git log 中文乱码解决

## 问题描述

在 Git 命令学习过程中，遇到在 IDEA 开发工具的 Terminal 下执行 `git log` 提交说明中文显示乱码，输出如下：
``` bash
$ git log
commit dbdc72b768154d62bb39dd7998b4fb663d33fa4a
Author: liuhongfeng <liuhongfeng@git>
Date:   Thu Sep 27 16:33:37 2018 +0800

    <E6><89><93><E5><8C><85><E9><83><A8><E7><BD><B2>
```

## 解决方法

在 Windows 系统 Git 安装目录 `Git\etc` 下找到 bash.bashrc 文件，编辑器打开后，在尾行追加如下内容：
``` bash
export LANG="zh_CN.UTF-8"
export LC_ALL="zh_CN.UTF-8"
```

关闭当前 Terminal 的 session 连接，然后 New Session 连接，终端下再次执行 `git log`
``` bash
$ git log
commit dbdc72b768154d62bb39dd7998b4fb663d33fa4a
Author: liuhongfeng <liuhongfeng@git>
Date:   Thu Sep 27 16:33:37 2018 +0800

    打包部署
```

提交说明中文显示正常