---
id: "1"
title: "你好，世界！"
excerpt: "这是我的第一篇博客文章，包含了多种 Markdown 语法示例和测试用例。"
coverImage: "/images/hello-world.jpg"
publishDate: "2024-01-01"
author:
  name: "张三"
  image: "/images/authors/zhangsan.jpg"
tags:
  - 介绍
  - 博客
  - Markdown
  - 测试
format: markdown
---

# 你好，世界！

这是我的第一篇博客文章。让我们来测试一下各种 Markdown 语法。

## 1. 文本格式化

在这里，我将展示基本的文本格式化：

- **粗体文本** 展示重点内容
- _斜体文本_ 用于强调
- ~~删除线~~ 表示废弃的内容
- `行内代码` 用于展示代码片段

## 2. 代码块展示

### JavaScript 示例

```javascript
function greeting(name) {
  console.log(Hello, ${name}!);
  return {
    message: 'Welcome to my blog',
    timestamp: new Date()
  };
}
// 使用箭头函数
const add = (a, b) => a + b;
```

### Python 示例

```python
class BlogPost:
  def init(self, title, content):
    self.title = title
    self.content = content
  def publish(self):
    print(f"Publishing: {self.title}")
    return True
```

## 3. 列表展示

### 3.1 无序列表

- 第一项
  - 子项 A
  - 子项 B
- 第二项
  - 子项 C
    - 更深层级
    - 另一个深层级
- 第三项

### 3.2 有序列表

1. 首先
2. 其次
3. 最后
   1. 子列表
   2. 另一个子项

## 4. 引用和提示

> 这是一段引用文本，可以用来展示重要的观点或者引用他人的话语。
>
> 多行引用也是支持的。

## 5. 表格展示

| 功能   | 支持情况 | 备注      |
| ------ | -------- | --------- |
| 标题   | ✅       | 多级标题  |
| 列表   | ✅       | 有序/无序 |
| 代码块 | ✅       | 支持高亮  |
| 表格   | ✅       | 基础表格  |

## 6. 链接和图片

### 6.1 链接

- [访问我的 GitHub](https://github.com)
- [查看我的作品集](#projects)
- [联系我](mailto:example@example.com)

### 6.2 图片

![示例图片](/images/1.png)
_图片描述文本_

## 7. 任务列表

- [x] 创建博客
- [x] 编写第一篇文章
- [ ] 添加评论功能
- [ ] 优化移动端显示

## 8. 数学公式

当 $a \ne 0$ 时，方程 $ax^2 + bx + c = 0$ 的解为：

$$x = {-b \pm \sqrt{b^2-4ac} \over 2a}$$

## 9. 总结

这篇文章展示了多种 Markdown 语法的使用方式，包括：

1. 标题（多级标题）
2. 文本格式化
3. 代码块（支持语法高亮）
4. 列表（有序和无序）
5. 引用
6. 表格
7. 链接和图片
8. 任务列表
9. 数学公式

### 后续计划

接下来我会继续分享更多有趣的内容，敬请期待！

---

> 文章结束，欢迎在下方评论区留言交流！
