# ⏰ 时光机

简洁优雅的时间可视化工具，展示日、月、年、人生的时间进度。

![时光机](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwind-css)

## ✨ 功能特性

- 🌅 **日时钟** - 实时显示当前时间，环形进度条展示一天的时间流逝
- 📅 **月时钟** - 显示本月已用天数和剩余天数
- 🌟 **年时钟** - 显示今年已用天数和剩余天数
- 💫 **人生时钟** - 显示已用年龄和预期寿命，支持自定义设置
- 💾 **数据持久化** - 人生时钟设置自动保存到本地存储
- 📱 **响应式设计** - 完美适配手机、平板、桌面端
- 🎨 **简洁优雅** - 现代化 UI 设计，流畅的动画效果
- ⚡ **实时更新** - 每秒自动刷新，感受时间的流转

## 🎯 技术栈

### 核心框架
- **Next.js 16** - React 框架，App Router
- **TypeScript 5** - 类型安全的 JavaScript
- **Tailwind CSS 4** - 实用优先的 CSS 框架
- **shadcn/ui** - 高质量、可访问的 UI 组件库

### 主要特性
- **SVG 环形进度条** - 自定义组件，可视化时间进度
- **LocalStorage** - 客户端数据持久化
- **React Hooks** - useState、useEffect 状态管理
- **响应式布局** - 移动优先设计

## 🚀 快速开始

### 安装依赖

```bash
bun install
```

或使用 npm：

```bash
npm install
```

### 运行开发服务器

```bash
bun run dev
```

或

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
bun run build
```

或

```bash
npm run build
```

### 启动生产服务器

```bash
bun start
```

或

```bash
npm start
```

## 📁 项目结构

```
src/
├── app/
│   ├── layout.tsx          # 布局组件和 metadata
│   ├── page.tsx            # 主页面（四个时钟）
│   └── globals.css         # 全局样式
├── components/
│   └── ui/                # shadcn/ui 组件库
│       ├── card.tsx
│       ├── progress.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── button.tsx
├── hooks/
│   ├── use-mobile.ts       # 移动端检测
│   └── use-toast.ts       # Toast 提示
└── lib/
    └── utils.ts           # 工具函数
```

## 🎨 功能详解

### 日时钟 🌅
- 显示当前时间（HH:MM:SS 格式）
- 环形进度条展示一天中已过的时间比例
- 显示已用时和剩余时间
- 实时更新，每秒刷新

### 月时钟 📅
- 显示当前日期（几号）
- 显示月份和年份
- 计算已用天数和剩余天数
- 考虑不同月份的天数差异

### 年时钟 🌟
- 显示今年的第几天
- 显示当前年份
- 计算已用天数和剩余天数
- 自动识别闰年（366/365 天）

### 人生时钟 💫
- 显示当前年龄（支持小数精度）
- 显示预期寿命（默认 78 岁）
- 计算已用年份和剩余年份
- **可自定义设置**：
  - 点击"设置年龄"按钮
  - 输入当前年龄（精确到小数）
  - 设置预期寿命
  - 自动保存到本地存储

## 🌐 在线预览

部署在 Vercel 上的在线版本：[时光机](https://time.hijoe.net)

*（请替换为你的实际部署地址）*

## 📦 部署

### Vercel（推荐）

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 选择本仓库
5. 点击 "Deploy"

Vercel 会自动检测 Next.js 项目并完成部署。

### 其他平台

项目也可以部署到：
- **Netlify** - https://netlify.com
- **GitHub Pages** - 使用静态导出
- **自托管服务器** - 使用 Docker 或 PM2

详细的部署指南请查看 [DEPLOY.md](./DEPLOY.md)

## 🔧 开发指南

### 添加新的时钟

1. 在 `src/app/page.tsx` 中添加新的时钟卡片
2. 使用 `CircularProgressBar` 组件展示进度
3. 添加相应的计算逻辑
4. 确保响应式布局

### 自定义样式

- 修改 `src/app/globals.css` 调整全局样式
- 修改 `tailwind.config.ts` 调整 Tailwind 配置
- 使用 Tailwind 工具类进行快速样式调整

### 组件使用

项目使用 shadcn/ui 组件，参考文档：[shadcn/ui](https://ui.shadcn.com)

## 🐛 常见问题

### Q: 为什么加载时显示"加载中..."？

A: 这是为了解决 React 服务端渲染（SSR）和客户端渲染时间不一致的问题，确保用户体验流畅。

### Q: 人生时钟的数据会丢失吗？

A: 不会。所有设置都保存在浏览器的 LocalStorage 中，刷新页面后依然保留。

### Q: 如何修改默认的预期寿命？

A: 点击人生时钟卡片底部的"设置年龄"按钮，输入你想要的预期寿命即可。

### Q: 支持深色模式吗？

A: 项目已配置 next-themes，可以轻松添加深色模式支持。

## 📝 开发计划

- [ ] 添加深色模式切换
- [ ] 支持多语言（国际化）
- [ ] 添加更多时钟（如周时钟、世纪时钟）
- [ ] 支持自定义时间主题和颜色
- [ ] 添加时间倒计时功能
- [ ] 导出时间报告

## 🤝 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 👨‍💻 作者

**bestop** - [GitHub](https://github.com/bestop)

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Lucide Icons](https://lucide.dev/) - 图标库

## 📧 联系方式

如有问题或建议，请：
- 提交 [Issue](https://github.com/bestop/timer/issues)
- 发送邮件：[hijoe@outlook.com]

---

⭐ 如果这个项目对你有帮助，请给个 Star！

**时光不语，却回答了所有问题**
