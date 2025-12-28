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
npm run build
```

构建产物将生成在 `out/` 目录中。

## 工作流说明

GitHub Actions 工作流（`.github/workflows/deploy.yml`）会：

1. 使用 Node.js 20 环境
2. 安装依赖
3. 运行 `npm run build` 生成静态文件
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

## 更多信息

- [Next.js 静态导出文档](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
