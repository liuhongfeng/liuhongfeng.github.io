---
layout: post
title:  "LeetCode-21 题解分析与思考"
categories: LeetCode 算法
tags: LeetCode 算法
author: 红影
---

* content
{:toc}

LeetCode-21 题解分析与思考

#### [21. 合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

> 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
> 示例：
> 输入：1->2->4, 1->3->4
> 输出：1->1->2->3->4->4

一开始看到这个题目，很是迷惑，不熟悉链表的数据结构，不清楚 `ListNode` 参数对象是什么样子的，想要做这个题目，首先需要构建一个单链表。

<img width="569" alt="单链表" src="https://user-images.githubusercontent.com/17230780/70864976-1323fa80-1f93-11ea-9d17-33ce332158ac.png">

单链表每个节点必然包含

- 自己的数据域
- 指向下一个节点的指针（尾节点指针为 NULL）

知道单链表的数据结构后，对于此题依旧毫无头绪，不知如何下手，只有先看题解，进行分析理解。

#### 递归解法
> 与官方题解有点不同，对 `l1.val == l2.val` 节点值相等的情况，做了单独处理，减少了递归次数。
```
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    if (l1 == null) {
        return l2;
    } else if (l2 == null) {
        return l1;
    } else if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else if (l1.val > l2.val) {
        l2.next = mergeTwoLists(l1, l2.next);
        return l2;
    } else {
        l2.next = mergeTwoLists(l1.next, l2.next);
        l1.next = l2;
        return l1;
    }
}
```

1. 首先判断 `l1` 和 `l2` 是否为 `null`，如果为 `null`，直接返回另一方数据，这个比较好理解，一方为 `null`，直接使用另一方链表，不需要对链表的节点数据进行比较排序了。

2. 如果 `l1` 和 `l2` 节点都不为 `null`，那么比较两方节点中的数据值。
    > 分为三种情况
    > - `l1.val < l2.val`
    > ① `l1` 节点的位置确定，因为 `l1` 节点的值小，按顺序要排在前面。
    > ② `l2` 节点的位置无法确定，需要与 `l1` 节点的下一个节点值进行比较。
    > ③ `l1` 节点的指针指向 ② 的结果。
    > ④ 返回 `l1` 节点。
    > - `l1.val > l2.val`
    > ① `l2` 节点的位置确定，因为 `l2` 节点的值小，按顺序要排在前面。
    > ② `l1` 节点的位置无法确定，需要与 `l2` 节点的下一个节点值进行比较。
    > ③ `l2` 节点的指针指向 ② 的结果。
    > ④ 返回 `l2` 节点。
    > - `l1.val == l2.val`
    > ① `l1` 和 `l2` 节点的位置都可以确定，且紧密相邻。
    > ② `l1` 节点的下一个节点值 和 `l2` 节点的下一个节点值进行比较。
    > ③ `l2` 节点的指针指向 ② 的结果。
    > ④ `l1` 节点指向 `l2` 节点。
    > ⑤ 返回 `l1` 节点。

迭代循环第 1、2 步，直到 `l1` 或 `l2` 节点为 `null`

<img width="336" alt="结果" src="https://user-images.githubusercontent.com/17230780/70864984-29ca5180-1f93-11ea-830b-e4cf22120c31.png">

复杂度分析

> l1 节点数为 n
> l2 节点数为 m
- 时间复杂度为 O(n)
    > 会遍历每一个节点 (n + m) 进行比较
- 空间复杂度为 O(n)
    > 最多会调用 (n + m) 次函数
