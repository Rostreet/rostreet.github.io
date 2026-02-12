import fs from "node:fs";
import path from "node:path";
import RSS from "rss";

// 文章数据 - 与 app/posts/[slug]/page.tsx 中的 posts 保持同步
const posts = {
	"getting-started-with-nextjs": {
		slug: "getting-started-with-nextjs",
		title: "开始使用 Next.js 构建现代化应用",
		excerpt:
			"探索 Next.js 15 的强大功能，包括服务端组件、App Router 以及最新的性能优化特性。了解如何使用这个强大的 React 框架构建高性能的 Web 应用。",
		date: "2024-12-28",
		readTime: "5 分钟",
		category: "前端开发",
		content: `
# 简介

Next.js 是一个强大的 React 框架，提供了许多开箱即用的功能，让开发者能够快速构建高性能的 Web 应用。它由 Vercel 团队开发维护，是目前最流行的 React 框架之一。

## 主要特性

### 1. 服务端组件 (Server Components)

服务端组件是 Next.js 13+ 引入的革命性功能，它允许组件在服务器上渲染，从而：

- 减少客户端 JavaScript 体积
- 提升首屏加载速度
- 直接访问后端资源
- 保护敏感代码不发送到客户端

\`\`\`typescript
// 这是一个服务端组件
async function BlogPost({ id }: { id: string }) {
  const post = await fetchPost(id);
  return <article>{post.content}</article>;
}
\`\`\`

### 2. App Router

新的 App Router 基于最新的 React 特性构建，提供了：

- 基于文件系统的路由
- 布局和嵌套布局
- 数据加载和变更
- 流式渲染和 Suspense
- 服务端操作和表单处理

### 3. 性能优化

Next.js 自动进行多种优化：

- **图片优化**：自动调整图片大小和格式
- **字体优化**：自动优化字体加载
- **脚本优化**：智能加载第三方脚本
- **预取**：智能预取可能访问的页面
- **代码分割**：自动分割代码以减少初始加载

### 4. 开发体验

- **热重载**：快速的开发反馈
- **TypeScript 支持**：开箱即用的类型检查
- **快速刷新**：保持组件状态的热重载
- **ESLint 支持**：内置代码质量检查

## 开始使用

使用以下命令创建新的 Next.js 项目：

\`\`\`bash
npx create-next-app@latest my-blog
cd my-blog
npm run dev
\`\`\`

## 项目结构

\`\`\`
my-app/
├── app/
│   ├── layout.tsx      # 根布局
│   ├── page.tsx        # 首页
│   └── blog/           # 博客路由
│       ├── page.tsx
│       └── [slug]/     # 动态路由
│           └── page.tsx
├── public/             # 静态资源
├── styles/             # 样式文件
└── package.json
\`\`\`

## 最佳实践

1. **使用服务端组件**：默认情况下使用服务端组件，只在需要交互时使用客户端组件
2. **数据获取**：在服务端组件中直接使用 async/await 获取数据
3. **图片优化**：使用 Next.js Image 组件优化图片加载
4. **路由管理**：利用文件系统路由简化导航逻辑

## 结语

Next.js 是构建现代 Web 应用的绝佳选择，它提供了强大的功能和优秀的开发体验。无论是个人博客还是企业级应用，Next.js 都能满足你的需求。

开始你的 Next.js 之旅吧！
    `,
	},
	"understanding-react-server-components": {
		slug: "understanding-react-server-components",
		title: "深入理解 React Server Components",
		excerpt:
			"React Server Components 彻底改变了我们构建 React 应用的方式。让我们深入了解其工作原理、使用场景以及最佳实践。",
		date: "2024-12-27",
		readTime: "8 分钟",
		category: "React",
		content: `
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

\`\`\`typescript
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
\`\`\`

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

\`\`\`typescript
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
\`\`\`

## 性能优势

### 1. 减少客户端 JavaScript

服务器组件的代码不会发送到客户端，这意味着：

- 更小的 bundle 大小
- 更快的页面加载
- 更少的数据传输

### 2. 数据获取优化

\`\`\`typescript
// 传统方式（客户端）
function BlogPost({ id }) {
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetch(\`/api/posts/\${id}\`)
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
\`\`\`

## 最佳实践

1. **默认使用服务器组件**：只在需要交互时添加 'use client'
2. **保持组件树的平衡**：避免过深的嵌套
3. **使用 Suspense**：优雅处理加载状态
4. **数据预取**：在服务器上预取数据以提升性能

## 总结

React Server Components 是一个强大的工具，它让我们能够在服务器和客户端之间做出明智的选择，从而构建更快速、更高效的 Web 应用。

掌握 Server Components 将帮助你在现代 Web 开发中保持竞争优势。
    `,
	},
	"typescript-best-practices": {
		slug: "typescript-best-practices",
		title: "TypeScript 最佳实践指南",
		excerpt:
			"提升你的 TypeScript 代码质量，学习类型系统的高级用法、泛型、条件类型和常见模式的实现。",
		date: "2024-12-26",
		readTime: "6 分钟",
		category: "TypeScript",
		content: `
# TypeScript 最佳实践

TypeScript 已经成为现代前端开发的标准，它能帮助我们捕获错误、提高代码质量和开发效率。

## 类型基础

### 1. 使用 interface vs type

\`\`\`typescript
// 使用 interface 定义对象结构
interface User {
  id: number;
  name: string;
  email: string;
}

// 使用 type 定义联合类型或交叉类型
type Status = 'pending' | 'approved' | 'rejected';
type UserWithStatus = User & { status: Status };
\`\`\`

### 2. 避免使用 any

\`\`\`typescript
// ❌ 不好
function processData(data: any) {
  return data.value;
}

// ✅ 好
function processData(data: { value: string }) {
  return data.value;
}

// ✅ 更好 - 使用泛型
function processData<T extends { value: string }>(data: T): T {
  return data;
}
\`\`\`

## 高级类型

### 1. 泛型约束

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
\`\`\`

### 2. 条件类型

\`\`\`typescript
type NonNullable<T> = T extends null | undefined ? never : T;
\`\`\`

### 3. 映射类型

\`\`\`typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};
\`\`\`

## 实用模式

### 1. 类型守卫

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: unknown) {
  if (isString(value)) {
    // TypeScript 知道这里 value 是 string
    console.log(value.toUpperCase());
  }
}
\`\`\`

### 2. Discriminated Unions

\`\`\`typescript
type Success = {
  status: 'success';
  data: string;
};

type Error = {
  status: 'error';
  message: string;
};

type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === 'success') {
    console.log(result.data);
  } else {
    console.log(result.message);
  }
}
\`\`\`

### 3. Utility Types

\`\`\`typescript
// Partial - 所有属性可选
type PartialUser = Partial<User>;

// Required - 所有属性必需
type RequiredUser = Required<Partial<User>>;

// Pick - 选择部分属性
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - 排除部分属性
type CreateUserInput = Omit<User, 'id'>;

// Record - 构建对象类型
type UserMap = Record<string, User>;
\`\`\`

## 配置最佳实践

### tsconfig.json 推荐

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
\`\`\`

## 代码组织

### 1. 导出类型

\`\`\`typescript
// types.ts
export interface User { }
export type UserRole = 'admin' | 'user';

// 使用
import { User, UserRole } from './types';
\`\`\`

### 2. 类型导入

\`\`\`typescript
// 仅导入类型
import type { User } from './types';
import { userService } from './services'; // 导入值
\`\`\`

## 总结

遵循这些 TypeScript 最佳实践，将帮助你：

- 编写更安全的代码
- 提高开发效率
- 减少运行时错误
- 改善代码可维护性

TypeScript 是一个强大的工具，掌握它将让你的开发工作事半功倍。
    `,
	},
};

// 站点配置
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rostreet.github.io";
const sitePath = process.env.NEXT_PUBLIC_SITE_PATH || "/blog";

// 创建 RSS feed
const feed = new RSS({
	title: "zch's Blog",
	description: "关于前端开发、React、TypeScript 的技术博客",
	feed_url: `${siteUrl}${sitePath}/rss.xml`,
	site_url: siteUrl,
	language: "zh-CN",
	pubDate: new Date(),
	ttl: 60,
	generator: "Next.js 16 + RSS",
});

// 添加所有文章到 feed
for (const post of Object.values(posts)) {
	feed.item({
		title: post.title,
		description: post.excerpt,
		url: `${siteUrl}${sitePath}/posts/${post.slug}`,
		date: new Date(post.date),
		categories: [post.category],
		author: "Zhai Changhao",
		custom_elements: [{ "content:encoded": post.content.trim() }],
	});
}

// 生成 XML
const xml = feed.xml({ indent: true });

// 确保 public 目录存在
const publicDir = path.join(process.cwd(), "public");
if (!fs.existsSync(publicDir)) {
	fs.mkdirSync(publicDir, { recursive: true });
}

// 写入文件
fs.writeFileSync(path.join(publicDir, "rss.xml"), xml);

console.log("✅ RSS feed generated successfully!");
console.log(`📝 Location: ${path.join(publicDir, "rss.xml")}`);
console.log(`🌐 URL: ${siteUrl}${sitePath}/rss.xml`);
