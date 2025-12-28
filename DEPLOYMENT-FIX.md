# GitHub Pages 部署指南 - rostreet.github.io

## 当前问题诊断

访问 URL 显示为：`https://rostreet.github.io/zhaichanghao.github.io/`

**原因**：仓库名被设置为 `zhaichanghao.github.io`，而你的 GitHub 用户名是 `rostreet`。

## 解决方案

### 步骤 1：重命名仓库

1. 访问当前仓库设置：
   ```
   https://github.com/Rostreet/blog/settings
   ```

2. 在 **Repository name** 输入框中，将仓库名改为：
   ```
   rostreet.github.io
   ```
   ⚠️ **注意**：必须是 `你的用户名.github.io` 的格式

3. 点击 **Rename** 按钮

### 步骤 2：启用 GitHub Pages

重命名后，访问 Pages 设置：
```
https://github.com/Rostreet/rostreet.github.io/settings/pages
```

在 **Build and deployment** 部分：
- **Source**：选择 `GitHub Actions`
- 点击 **Save** 保存

### 步骤 3：等待自动部署

1. 查看 GitHub Actions 状态：
   ```
   https://github.com/Rostreet/rostreet.github.io/actions
   ```

2. 部署成功后（约 2-3 分钟），访问你的博客：
   ```
   https://rostreet.github.io/
   ```

### 步骤 4：清除浏览器缓存

如果部署成功但样式仍显示不正常：
1. 按 `Cmd + Shift + R` (Mac) 或 `Ctrl + Shift + R` (Windows) 强制刷新
2. 或者清除浏览器缓存后重新访问

## 为什么 CSS 没有加载？

当前仓库名是 `zhaichanghao.github.io`，作为项目页面部署，所以：
- 访问地址：`https://rostreet.github.io/zhaichanghao.github.io/`
- CSS 路径：`/_next/static/chunks/xxx.css`
- 实际 CSS 位置：`/zhaichanghao.github.io/_next/static/chunks/xxx.css`
- **结果**：浏览器找不到 CSS 文件

将仓库重命名为 `rostreet.github.io` 后：
- 访问地址：`https://rostreet.github.io/`
- CSS 路径：`/_next/static/chunks/xxx.css`
- 实际 CSS 位置：`/_next/static/chunks/xxx.css`
- **结果**：CSS 正确加载 ✅

## GitHub 用户页面 vs 项目页面

### 用户页面（User Pages）
- 仓库名：`username.github.io`
- 访问地址：`https://username.github.io/`
- **推荐**：适合个人博客/主页
- 当前项目应该使用这种方式

### 项目页面（Project Pages）
- 仓库名：`任意名称`
- 访问地址：`https://username.github.io/repo-name/`
- 需要 basePath 配置

## 当前配置状态

✅ `next.config.ts` - 已正确配置，无 basePath
✅ `package.json` - 构建脚本正确
✅ GitHub Actions - 工作流配置正确
✅ CSS 文件 - 构建输出正常

只需将仓库重命名为 `rostreet.github.io` 即可！

## 验证部署

部署成功后，你可以验证：

1. 访问 `https://rostreet.github.io/`
2. 检查浏览器开发者工具：
   - 打开 Console（控制台）：没有错误
   - 打开 Network（网络）：CSS 文件成功加载（状态码 200）
   - 打开 Elements（元素）：页面有样式，不是空白

## 需要帮助？

如果问题仍未解决：

1. 查看 GitHub Actions 日志：
   ```
   https://github.com/Rostreet/rostreet.github.io/actions
   ```

2. 检查部署状态：
   ```
   https://github.com/Rostreet/rostreet.github.io/deployments
   ```

3. 本地测试构建：
   ```bash
   npm run build
   ls out/_next/static/chunks/*.css
   ```
   应该能看到 CSS 文件
