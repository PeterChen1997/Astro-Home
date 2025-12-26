# CLAUDE.md

本文件为 Claude Code 提供项目指南，帮助理解和开发本代码库。

## 项目概述

**龙场茶室** - 基于 Astro 框架构建的个人博客网站，采用岛屿架构（Island Architecture），大部分内容为静态生成，仅在需要交互的地方加载 React 组件。

- **站点地址**: https://blog.peterchen97.cn
- **站点名称**: 龙场茶室
- **技术栈**: Astro + React + Tailwind CSS + TypeScript

## 开发命令

```bash
# 开发服务器（不要自己运行，需要用户确认）
npm run dev          # 或 npm start - 启动 Astro 开发服务器

# 构建
npm run build        # 构建生产版本

# 预览
npm run preview      # 预览构建后的站点（监听所有网络接口）
npm run serve        # 使用 http-server 提供 dist 目录服务

# Storybook
npm run storybook    # 启动 Storybook 开发服务器（端口 6006）
npm run build-storybook  # 构建 Storybook 静态版本

# Chromatic
npm run chromatic    # 运行 Chromatic 可视化测试
```

## 项目架构

### 核心框架与集成

| 技术 | 用途 |
|------|------|
| **Astro** | 主框架，采用岛屿架构 |
| **React 17** | 交互式组件 |
| **Tailwind CSS** | 样式系统，支持暗色模式 |
| **TypeScript** | 类型安全 |
| **astro-imagetools** | 图片优化 |
| **astro-compress** | 内容压缩（图片除外） |
| **@astrojs/rss** | RSS 订阅 |
| **@astrojs/sitemap** | 站点地图生成 |

### 第三方服务

| 服务 | 用途 |
|------|------|
| **Sentry** | 错误追踪 |
| **LogRocket** | 用户会话录制 |
| **Umami** | 网站分析 (a.hweb.peterchen97.cn) |
| **n8n** | 邮件订阅 webhook |
| **Fly.io** | 部署平台 |

## 目录结构

```
src/
├── components/          # 可复用组件
│   ├── BaseHead.astro   # SEO meta 标签和 head 元素
│   ├── Header.astro     # 导航栏
│   ├── Footer.astro     # 页脚
│   ├── Main.astro       # 主内容包装器
│   ├── Content.astro    # 文章内容包装器
│   ├── PostCard.astro   # 文章卡片预览
│   ├── PageHeader.astro # 页面标题
│   ├── CommonPicture.astro  # 图片组件
│   ├── DropdownMenu.tsx # 移动端下拉菜单 (React)
│   ├── ThemeToggleButton.tsx  # 主题切换按钮 (React)
│   ├── Comments.tsx     # 评论组件 (React)
│   ├── Subscribe.tsx    # 邮件订阅 (React)
│   └── ViewedCount.tsx  # 阅读计数 (React)
├── layouts/
│   └── BlogPost.astro   # 博客文章布局
├── pages/
│   ├── index.astro      # 首页
│   ├── posts.astro      # 文章列表页
│   ├── projects.astro   # 项目展示页
│   ├── links.astro      # 友链页
│   ├── about.md         # 关于页面
│   ├── 404.md           # 404 页面
│   ├── posts/           # 博客文章 (Markdown)
│   └── rss.xml.js       # RSS 订阅生成
├── libs/
│   └── readingTime.ts   # 阅读时间计算
├── styles/
│   └── global.css       # 全局样式
├── stories/             # Storybook 故事
├── backlogs/            # 草稿文章
├── config.ts            # 站点配置
└── utils.ts             # 工具函数

public/
├── assets/
│   ├── imgs/            # 图片资源（哈希命名）
│   ├── audios/          # 音频文件
│   └── videos/          # 视频文件
├── favicon.svg          # 站点图标
└── robots.txt           # 爬虫规则
```

## 博客文章格式

### Frontmatter 模板

```yaml
---
layout: "../../layouts/BlogPost.astro"
title: "文章标题"
description: "文章描述"
pubDate: "YYYY-MM-DD"
heroImage: "/assets/imgs/xxx.png"  # 可选，封面图
tags: ["标签1", "标签2"]           # 可选
updatedDate: "YYYY-MM-DD"          # 可选，更新日期
---
```

### 文章命名规范

- 文件位置: `src/pages/posts/`
- 命名格式: `序号-标题.md` (如 `37-旅行出游 Checklist.md`)
- 序号用于排序，从 00 开始

### 图片资源

- 存放位置: `public/assets/imgs/`
- 引用方式: `/assets/imgs/文件名.png`
- 命名: 使用哈希命名确保唯一性

## 关键配置文件

### astro.config.mjs

- **站点 URL**: `https://blog.peterchen97.cn`
- **Markdown 增强**: 使用 `rehype-add-classes` 插件为 Markdown 元素添加 Tailwind 类
- **压缩**: 启用 `astro-compress`，但排除图片

### src/config.ts

```typescript
export const SITE_TITLE = '龙场茶室'
export const SITE_DESCRIPTION = '一只练习时长六年半的 Web 开发练习生...'
export const HOMEPAGE_URL = 'https://blog.peterchen97.cn'
```

### tailwind.config.cjs

- 暗色模式: 使用 `class` 策略
- 内容扫描: `./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}`

## 导航菜单配置

菜单定义在 `src/components/DropdownMenu.tsx` 的 `MENUS` 数组中：

```typescript
export const MENUS = [
  { key: 'posts', path: '/posts/index.html', title: '文章' },
  { key: 'about', path: '/about/index.html', title: '关于' },
  { key: 'projects', path: '/projects/index.html', title: '项目' },
  { key: 'links', path: '/links/index.html', title: '友链' },
  { key: 'daily', path: 'https://daily.peterchen97.cn', title: '日常', target: '_blank' },
  { key: 'photos', path: 'https://peterchen97.notion.site/...', title: '照片', target: '_blank' },
  { key: 'rss', path: '/rss.xml', title: 'RSS', icon: BiRss, target: '_blank' },
  { key: 'github', path: 'https://github.com/PeterChen1997', title: 'Github', icon: IoLogoGithub, target: '_blank' }
]
```

## 样式系统

### 暗色模式

- 通过 `class` 策略控制（`html` 元素添加 `dark` 类）
- 主题状态保存在 `localStorage.theme`
- 切换逻辑在 `BaseHead.astro` 中初始化

### Markdown 样式

在 `astro.config.mjs` 中通过 `rehype-add-classes` 配置：

| 元素 | 样式类 |
|------|--------|
| `h1` | `text-3xl font-bold py-4` |
| `h2` | `text-2xl font-bold py-4` |
| `h3` | `text-xl font-bold py-3` |
| `p` | `leading-8 tracking-[.1em]` |
| `a` | `underline underline-offset-2 hover:text-orange-500 decoration-orange-500` |
| `code` | `bg-gray-200 dark:bg-gray-800 p-1 rounded-md text-red-500 mx-1` |
| `img` | `border border-slate-300 dark:border-zinc-700 rounded-xl mb-6 max-h-[500px] mx-auto` |

### 主题色

- **主色调**: 橙色 (`orange-500`, `orange-600`)
- **暗色背景**: 灰色 (`gray-700`, `gray-800`)

## 部署

### Fly.io 配置

```toml
app = "astro-peterchen97"
internal_port = 3000
```

部署流程:
1. `npm run build` 构建
2. 使用 `fly deploy` 部署到 Fly.io

## React 组件使用

Astro 中使用 React 组件时需要添加 `client:*` 指令：

```astro
<!-- 页面加载时立即水合 -->
<ViewedCount postId={title} client:load />

<!-- 组件可见时水合 -->
<Comments client:visible />

<!-- 组件可见时水合 -->
<ThemeToggle client:visible />
```

## 开发注意事项

1. **不要自动运行开发服务器** - 需要用户确认后才能运行 `npm run dev`
2. **大需求完成后运行构建检查** - 执行 `npm run build` 确保没有构建错误
3. **DB reset 操作需要确认** - 任何数据库重置操作需要用户确认
4. **使用 yarn** - 项目使用 yarn 作为包管理器（yarn@1.22.19）
5. **阅读时间计算** - 基于中文 500 字/分钟的阅读速度

## 常用依赖

### UI 组件库
- **antd**: 提供 Button、Input、Select、Space 等组件
- **@headlessui/react**: 提供无障碍的下拉菜单等组件
- **react-icons**: 图标库

### HTTP 请求
- **axios**: HTTP 客户端
- **axios-hooks**: React hooks 封装

### 日期处理
- **dayjs**: 日期格式化（使用中文 locale）
