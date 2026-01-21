# 单细胞数据分析平台 - 前端

专业的单细胞 RNA 测序数据分析工具前端项目

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Ant Design 5
- **路由**: React Router 6
- **状态管理**: Zustand
- **HTTP 客户端**: Axios
- **图标**: @ant-design/icons

## 项目结构

```
frontend/
├── src/
│   ├── components/          # 公共组件
│   │   ├── Header/         # 导航栏
│   │   ├── Footer/         # 页脚
│   │   ├── HeroSection/    # Hero区域
│   │   ├── FeaturesSection/    # 功能特性展示
│   │   ├── WorkflowSection/    # 使用流程
│   │   └── FileFormatsSection/ # 数据格式支持
│   ├── pages/              # 页面组件
│   │   └── Home/           # 首页
│   ├── layouts/            # 布局组件
│   │   └── MainLayout/     # 主布局
│   ├── store/              # 状态管理
│   │   ├── authStore.ts    # 认证状态
│   │   └── projectStore.ts # 项目状态
│   ├── services/           # API服务
│   │   ├── api.ts          # Axios配置
│   │   ├── authService.ts  # 认证API
│   │   └── projectService.ts # 项目API
│   ├── types/              # TypeScript类型
│   │   └── index.ts        # 类型定义
│   ├── App.tsx             # 根组件
│   ├── main.tsx            # 入口文件
│   └── index.css           # 全局样式
├── public/                 # 静态资源
├── index.html              # HTML模板
├── package.json            # 依赖配置
├── tsconfig.json           # TypeScript配置
├── vite.config.ts          # Vite配置
└── README.md               # 项目说明
```

## 快速开始

### 安装依赖

```bash
cd frontend
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 功能特性

### 首页

- **Hero 区域**: 醒目的标题和 CTA 按钮
- **功能特性**: 展示 6 个核心功能
- **使用流程**: 4 步分析流程说明
- **数据格式支持**: 展示支持的文件格式
- **响应式设计**: 支持移动端和桌面端

### 核心组件

- **Header**: 导航栏，包含登录/注册按钮
- **Footer**: 页脚，包含链接和版权信息
- **MainLayout**: 主布局，包含 Header 和 Footer

### 状态管理

- **authStore**: 用户认证状态管理
- **projectStore**: 项目状态管理

### API 服务

- **authService**: 认证相关 API
- **projectService**: 项目相关 API

## 开发说明

### 添加新页面

1. 在 `src/pages/` 下创建新页面组件
2. 在 `src/App.tsx` 中添加路由配置

### 添加新组件

1. 在 `src/components/` 下创建组件文件夹
2. 创建 `index.tsx` 文件
3. 导出组件

### API 调用

使用 `services/` 下的服务层进行 API 调用，已配置拦截器处理认证和错误。

### 状态管理

使用 Zustand 进行状态管理，在 `store/` 下创建对应的 store 文件。

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT
