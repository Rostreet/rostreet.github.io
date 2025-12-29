# 个人博客

一个使用 Next.js 16 构建的现代化个人博客网站，采用 App Router 架构和 React Server Components。

## 特性

- 🚀 **Next.js 16** - 使用最新的 App Router 和 React Server Components
- 🎨 **优雅的设计** - 纸质纹理背景、深色模式支持、流畅的动画效果
- 📱 **响应式布局** - 完美适配桌面和移动设备
- ⚡ **性能优化** - 静态生成（SSG）、图片优化、代码分割
- 🔍 **智能搜索** - 支持按分类筛选和关键词搜索，实时结果统计
- 🏷️ **分类徽章** - 每个分类显示文章数量
- ⌨️ **键盘导航** - 支持 Tab 键切换分类
- ♾️ **无限滚动** - 平滑的加载更多体验
- 📷 **摄影作品** - 瀑布流布局展示摄影作品，带详情弹窗
- 📖 **阅读进度条** - 实时显示阅读进度
- 📑 **目录导航** - 自动生成的文章目录，支持滚动高亮
- 🔝 **回到顶部** - 快速返回页面顶部
- 📤 **分享功能** - 原生分享 API 支持

## 技术栈

- **框架**: Next.js 16.1.1
- **UI 库**: React 19.2.3
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4
- **图标**: lucide-react

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

启动开发服务器（默认端口 3000）：

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看结果。

### 生产构建

```bash
npm run build
npm start
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```
blog/
├── app/
│   ├── layout.tsx          # 根布局（导航栏和页脚）
│   ├── page.tsx            # 首页（文章列表、搜索筛选）
│   ├── globals.css         # 全局样式
│   ├── about/
│   │   └── page.tsx        # 关于页面
│   ├── photography/
│   │   └── page.tsx        # 摄影作品页面
│   └── posts/
│       ├── page.tsx        # 文章索引页
│       └── [slug]/
│           └── page.tsx    # 动态文章详情页
├── components/
│   ├── Navigation.tsx      # 导航栏（深色模式切换）
│   ├── Footer.tsx          # 页脚
│   ├── Icons.tsx           # 自定义图标组件
│   ├── ReadingProgressBar.tsx  # 阅读进度条
│   ├── BackToTop.tsx       # 回到顶部按钮
│   ├── TableOfContents.tsx # 文章目录
│   ├── ShareButton.tsx     # 分享按钮
│   └── PostCardSkeleton.tsx # 文章卡片骨架屏
```

## 主要功能

### 文章系统

- 静态生成（SSG）所有文章页面
- 智能搜索和筛选（带结果统计）
- 分类徽章显示文章数量
- 键盘导航支持（Tab 键切换）
- 阅读时间估算
- 发布日期显示

### 摄影作品

- 瀑布流布局（每行 5 列）
- 照片从上方流下的动画效果
- 点击查看详情弹窗
- 详情弹窗采用左右布局（左侧图片，右侧信息）
- 显示拍摄地点、日期、器材等信息

### 文章详情页

- 阅读进度条（顶部固定）
- 目录导航（侧边栏）
- 滚动高亮当前章节
- 回到顶部按钮
- 分享功能

### 主题系统

- 明暗模式切换
- 主题状态持久化
- 防止闪烁（FOUC）的优化
- 纸质纹理背景效果

## 部署

推荐使用 [Vercel](https://vercel.com) 部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/blog)

## 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

## 许可证

MIT
