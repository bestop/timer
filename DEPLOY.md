# 时光机 - GitHub 部署指南

## 项目信息
- **项目名称**: 时光机
- **技术栈**: Next.js 16 + TypeScript + Tailwind CSS + shadcn/ui
- **功能**: 四个时钟（日、月、年、人生）的可视化时间进度显示

## 部署步骤

### 方法 1：通过 GitHub 网页界面部署（推荐新手）

#### 1. 创建 GitHub 仓库
1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `time-machine`（或你喜欢的名称）
   - **Description**: `简洁优雅的四个时钟，显示日、月、年、人生的时间进度`
   - **Public/Private**: 根据需要选择
3. **不要**勾选 "Initialize this repository with a README"（避免冲突）
4. 点击 "Create repository"

#### 2. 推送代码到 GitHub

在项目目录下运行以下命令：

```bash
cd /home/z/my-project

# 添加 GitHub 远程仓库（替换 USERNAME 为你的 GitHub 用户名，REPO 为仓库名）
git remote add origin https://github.com/USERNAME/REPO.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

**示例**：
```bash
git remote add origin https://github.com/yourusername/time-machine.git
git branch -M main
git push -u origin main
```

### 方法 2：通过 GitHub CLI 部署（推荐）

如果你安装了 GitHub CLI：

```bash
cd /home/z/my-project

# 登录 GitHub（首次使用）
gh auth login

# 创建仓库并推送
gh repo create time-machine --public --source=. --remote=origin --push
```

### 方法 3：使用 SSH 密钥（推荐）

如果你配置了 SSH 密钥：

```bash
cd /home/z/my-project

# 添加 SSH 远程仓库
git remote add origin git@github.com:USERNAME/REPO.git

# 推送代码
git branch -M main
git push -u origin main
```

## 部署到 Vercel（免费托管）

创建 GitHub 仓库后，可以轻松部署到 Vercel：

### 1. 自动部署（推荐）
1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 选择刚创建的 `time-machine` 仓库
5. Vercel 会自动检测 Next.js 项目
6. 点击 "Deploy" 即可

### 2. 手动配置（如果需要）
在 Vercel 项目设置中：

**Build Command**:
```
bun run build
```

**Output Directory**:
```
.next
```

**Install Command**:
```
bun install
```

## 部署到其他平台

### Netlify
1. 访问 https://netlify.com
2. 连接 GitHub 账号
3. 选择 `time-machine` 仓库
4. 配置构建设置：
   - **Build command**: `bun run build`
   - **Publish directory**: `out`（需要先配置静态导出）

### 部署到自己的服务器

```bash
# 在服务器上克隆仓库
git clone https://github.com/USERNAME/REPO.git

# 进入项目目录
cd REPO

# 安装依赖
bun install

# 构建项目
bun run build

# 启动生产服务器
bun start
```

## 项目文件说明

### 核心文件
- `src/app/page.tsx` - 主要页面组件（四个时钟）
- `src/app/layout.tsx` - 布局组件和 metadata
- `src/app/globals.css` - 全局样式

### 配置文件
- `package.json` - 项目依赖和脚本
- `tsconfig.json` - TypeScript 配置
- `tailwind.config.ts` - Tailwind CSS 配置
- `next.config.ts` - Next.js 配置
- `components.json` - shadcn/ui 配置

### 组件库
- `src/components/ui/` - shadcn/ui 组件

## 常见问题

### 1. 推送时提示认证错误
**解决方案**：
- 使用 SSH: `git remote set-url origin git@github.com:USERNAME/REPO.git`
- 或使用 Personal Access Token

### 2. Vercel 部署失败
**检查**：
- 确保 `package.json` 中的 scripts 配置正确
- 检查构建日志中的错误信息
- 确保环境变量配置正确（如果有的话）

### 3. 本地测试
在推送前，先本地测试：

```bash
# 运行开发服务器
bun run dev

# 或构建生产版本测试
bun run build
bun start
```

## 后续维护

### 添加新功能后提交
```bash
# 查看更改
git status

# 添加文件
git add .

# 提交更改
git commit -m "描述你的更改"

# 推送到 GitHub
git push
```

### 创建版本标签
```bash
git tag v1.0.0
git push origin v1.0.0
```

## 许可证

建议在 GitHub 仓库中添加 `LICENSE` 文件，选择合适的开源许可证（如 MIT、Apache 2.0 等）。

---

**祝部署顺利！🎉**
