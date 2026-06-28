# 人生浪费指南 - 个人博客

一个简洁优雅的个人博客网站，适合发表随笔、游记和分享照片。

## 特点

- 📝 支持 Markdown 渲染
- 🎨 简洁优雅的设计
- 📱 响应式布局，支持移动端
- 🚀 静态页面，可部署到 GitHub Pages
- 🏷️ 支持文章分类和标签

## 栏目规划

- **随笔** - 个人思考与感悟
- **游记** - 旅行经历与故事
- **摄影** - 照片分享
- **关于** - 关于我与这个博客

## 技术栈

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Markdown
- React Router (HashRouter for GitHub Pages)

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:5173 查看效果

## 添加新文章

1. 在 `public/content/` 目录下创建对应的文件夹（`essays` 或 `travel`）
2. 创建 Markdown 文件，格式如下：

```markdown
---
title: "文章标题"
date: "2026-06-28"
tags: ["标签1", "标签2"]
excerpt: "文章摘要"
---

# 文章标题

文章内容...
```

3. 在对应的列表页面组件中添加文章 slug（文件名，不含 .md 后缀）

## 构建

```bash
npm run build
```

构建产物在 `dist/` 目录下

## 部署到 GitHub Pages

### 方法一：手动部署

1. 构建项目：`npm run build`
2. 将 `dist/` 目录下的所有文件推送到 GitHub 仓库的 `gh-pages` 分支
3. 在 GitHub 仓库设置中启用 GitHub Pages，选择 `gh-pages` 分支

### 方法二：使用 GitHub Actions 自动部署

1. 创建 `.github/workflows/deploy.yml` 文件（已包含在后）
2. 推送到 GitHub 后，Actions 会自动构建并部署

## 自定义配置

- 修改博客标题：编辑 `src/App.tsx` 中的标题
- 修改样式：编辑 `src/index.css` 和 Tailwind 配置
- 添加新的栏目：在 `src/components/pages/` 创建新页面，并在 Layout 中添加导航

## 目录结构

```
blog/
├── public/
│   ├── content/          # Markdown 文章
│   │   ├── essays/       # 随笔
│   │   └── travel/       # 游记
│   └── 404.html          # GitHub Pages SPA 路由支持
├── src/
│   ├── components/
│   │   ├── layout/       # 布局组件
│   │   └── pages/        # 页面组件
│   ├── utils/            # 工具函数
│   ├── App.tsx           # 主应用
│   └── main.tsx          # 入口文件
└── dist/                 # 构建产物
```

## License

MIT
