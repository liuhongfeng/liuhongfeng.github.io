---
layout: post
title:  "Java int 取值范围及进制转换"
categories: Java基础 进制
tags: Java基础 进制
author: 红影
---

* content
{:toc}

#### 图解 int 的取值范围
![int-value-range](https://images.liuhongfeng.com/image/blog/int-value-range.png)

#### 进制转换

```
/**
 * 进制转换
 */
public static void main(String[] args) {
    int x = 8;
    // 十进制转二进制 方式一
    System.out.println(Integer.toBinaryString(x));
    // 十进制转二进制 方式二
    System.out.println(Integer.toString(x, 2));
    // 二进制转十进制
    System.out.println(Integer.valueOf("1000", 2));
}
```

