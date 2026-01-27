# GitHub Pages 部署指南

本项目已配置为自动部署到 GitHub Pages。

## 部署步骤

### 1. 创建 GitHub 仓库

1. 在 GitHub 上创建一个新仓库
2. 将你的代码推送到仓库：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo-name.git
git push -u origin main
```

### 2. 配置 GitHub Pages

1. 进入仓库的 **Settings** 页面
2. 在左侧菜单中找到 **Pages**
3. 在 **Build and deployment** 部分：
   - **Source**: 选择 `GitHub Actions`

### 3. 启用工作流

1. 推送代码到 `main` 分支后，GitHub Actions 会自动运行
2. 进入 **Actions** 标签页查看部署状态
3. 部署成功后，你的博客将在以下地址可用：
   - 用户页面：`https://your-username.github.io/`
   - 项目页面：`https://your-username.github.io/repo-name/`

### 4. 配置 Base Path（可选）

如果你的仓库名称不是 `your-username.github.io`，需要配置 base path：

编辑 `next.config.ts`，取消注释并修改：

```typescript
basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/repo-name',
```

或者在 GitHub Actions 中设置环境变量。

## 本地构建测试

在部署前，你可以本地测试构建：

```bash
bun run build
```

构建产物将生成在 `out/` 目录中。

## 工作流说明

GitHub Actions 工作流（`.github/workflows/deploy.yml`）会：

1. 使用 Bun 运行时环境
2. 使用 `bun install` 安装依赖
3. 运行 `bun run build` 生成静态文件
4. 将 `out/` 目录部署到 GitHub Pages

## 故障排除

### 构建失败

- 检查 **Actions** 标签页查看错误日志
- 确保 `package.json` 中的依赖都正确安装
- 检查 TypeScript 类型错误

### 页面显示空白

- 打开浏览器开发者工具查看控制台错误
- 检查静态资源路径是否正确
- 确认 `basePath` 配置正确

### 更新未生效

- GitHub Actions 可能需要几分钟来部署
- 清除浏览器缓存
- 检查 Actions 页面确认部署成功

## 自定义域名（可选）

如果使用自定义域名：

1. 在仓库 **Settings > Pages** 中添加自定义域名
2. 在你的域名提供商处添加 DNS 记录：
   - 类型：`CNAME`
   - 名称：`@`（或你的子域名）
   - 值：`your-username.github.io`

3. 在项目根目录创建 `CNAME` 文件（内容为你的域名）

## 故障排除（进阶）

### 样式文件（CSS）未加载

**症状**：页面显示但没有样式，浏览器控制台显示 404 错误，CSS 文件路径错误。

**原因**：仓库命名与部署类型不匹配。

#### GitHub 用户页面 vs 项目页面

**用户页面（User Pages）** - 推荐
- 仓库名：`username.github.io`
- 访问地址：`https://username.github.io/`
- 无需配置 `basePath`
- 适合个人博客/主页

**项目页面（Project Pages）**
- 仓库名：任意名称
- 访问地址：`https://username.github.io/repo-name/`
- 需要配置 `basePath: '/repo-name'`
- 适合项目文档

#### 解决方案

如果使用用户页面（推荐）：
1. 将仓库重命名为 `your-username.github.io`
2. 确保 `next.config.ts` 中没有设置 `basePath`
3. 推送代码后等待 GitHub Actions 自动部署

如果使用项目页面：
1. 编辑 `next.config.ts`，配置 `basePath`：
   ```typescript
   basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/repo-name',
   ```
2. 在 GitHub Actions 中设置环境变量 `NEXT_PUBLIC_BASE_PATH`

### 页面空白或样式异常

1. **强制刷新浏览器**
   - Mac: `Cmd + Shift + R`
   - Windows: `Ctrl + Shift + R`

2. **清除浏览器缓存**
   - 打开开发者工具（F12）
   - 右键点击刷新按钮，选择"清空缓存并硬性重新加载"

3. **检查网络请求**
   - 打开开发者工具 > Network 标签
   - 刷新页面，查看 CSS 文件是否成功加载（状态码 200）

### 构建失败

1. 查看 GitHub Actions 日志，定位错误信息
2. 常见问题：
   - 依赖安装失败：检查 `package.json` 和 `bun.lockb`
   - TypeScript 错误：运行 `bun run lint` 本地检查
   - 静态导出错误：确保没有使用仅限服务器的功能

### 更新未生效

1. GitHub Actions 部署需要 2-3 分钟
2. 查看 Actions 页面确认部署状态
3. 检查部署页面：`https://github.com/username/repo/deployments`

## 更多信息

- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
