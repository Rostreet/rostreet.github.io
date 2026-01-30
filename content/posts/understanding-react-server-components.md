---
title: 深入理解 React Server Components
date: 2024-12-27
readTime: 8 分钟
category: React
author: Zhai Changhao
excerpt: React Server Components 彻底改变了我们构建 React 应用的方式。让我们深入了解其工作原理。
---

# React Server Components 深度解析

React Server Components (RSC) 是 React 团队引入的一项重大变革，它彻底改变了我们构建 React 应用的方式。

## 什么是 Server Components？

Server Components 是一种在服务器上渲染的组件，它们：

- 在服务器上执行
- 不发送到客户端的 JavaScript bundle 中
- 可以直接访问后端资源
- 不能使用 hooks 和状态

## 核心概念

### 1. 服务器组件 vs 客户端组件

```typescript
// 服务器组件（默认）
async function BlogList() {
  const posts = await db.query('SELECT * FROM posts');
  return (
    <div>
      {posts.map(post => <BlogPost key={post.id} {...post} />)}
    </div>
  );
}

// 客户端组件（使用 'use client'）
'use client';
import { useState } from 'react';

function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>{likes}</button>;
}
```

### 2. 何时使用服务器组件

✅ **适合服务器组件**：

- 获取数据
- 访问后端资源
- 保存机密信息
- 保持大型依赖库在服务器端

❌ **不适合服务器组件**：

- 需要用户交互（点击、输入）
- 使用浏览器 API
- 使用 React hooks 和状态
- 使用自定义的 useEffect、useState 等

### 3. 组合使用

最佳实践是混合使用两种组件：

```typescript
// 服务器组件
import LikeButton from './LikeButton';

async function BlogPost({ id }) {
  const post = await fetchPost(id);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <LikeButton postId={id} />
    </article>
  );
}
```

## 性能优势

### 1. 减少客户端 JavaScript

服务器组件的代码不会发送到客户端，这意味着：

- 更小的 bundle 大小
- 更快的页面加载
- 更少的数据传输

### 2. 数据获取优化

```typescript
// 传统方式（客户端）
function BlogPost({ id }) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <Loading />;
  return <div>{post.title}</div>;
}

// 服务器组件方式
async function BlogPost({ id }) {
  const post = await fetchPost(id);
  return <div>{post.title}</div>;
}
```

## 最佳实践

1. **默认使用服务器组件**：只在需要交互时添加 'use client'
2. **保持组件树的平衡**：避免过深的嵌套
3. **使用 Suspense**：优雅处理加载状态
4. **数据预取**：在服务器上预取数据以提升性能

## 总结

React Server Components 是一个强大的工具，它让我们能够在服务器和客户端之间做出明智的选择，从而构建更快速、更高效的 Web 应用。

掌握 Server Components 将帮助你在现代 Web 开发中保持竞争优势。
