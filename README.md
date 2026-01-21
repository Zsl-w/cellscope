# 单细胞数据分析平台

专业的单细胞 RNA 测序数据分析平台，提供完整的数据处理、可视化和分析工具集。

## 项目简介

本项目是一个现代化的单细胞数据分析平台，基于 Web 技术构建，旨在为生物信息学研究者和数据科学家提供便捷的数据分析工具。

### 核心特性

- 📊 **数据可视化**: 直观展示单细胞数据的聚类结果、基因表达模式
- 🔬 **多种分析算法**: 支持 PCA、t-SNE、UMAP 等降维算法
- 📁 **多格式支持**: 支持 .h5ad、.loom、.mtx 等主流单细胞数据格式
- 🚀 **高性能计算**: 基于 Python 的高效数据处理后端
- 💻 **现代化界面**: 使用 React + Ant Design 构建的响应式用户界面
- 🔐 **用户认证**: 完善的用户登录和权限管理系统

## 项目结构

```
singlecell-analysis/
├── frontend/              # 前端应用
│   ├── src/
│   │   ├── components/    # 公共组件
│   │   ├── pages/         # 页面组件
│   │   ├── layouts/       # 布局组件
│   │   ├── store/         # 状态管理 (Zustand)
│   │   ├── services/      # API 服务
│   │   └── types/         # TypeScript 类型定义
│   ├── package.json
│   └── vite.config.ts
└── backend/               # 后端应用 (开发中)
    └── app/
        ├── main.py        # FastAPI 入口
        ├── api/           # API 路由
        └── services/      # 业务逻辑
```

## 技术栈

### 前端

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **UI 组件库**: Ant Design 5
- **路由**: React Router 6
- **状态管理**: Zustand
- **HTTP 客户端**: Axios

### 后端

- **框架**: FastAPI
- **数据处理**: Scanpy, AnnData
- **科学计算**: NumPy, SciPy, Pandas
- **机器学习**: scikit-learn
- **可视化**: Matplotlib, Seaborn

## 快速开始

### 环境要求

- **Node.js**: >= 16.0.0
- **Python**: >= 3.9
- **npm**: >= 8.0.0

### 安装前端依赖

```bash
cd frontend
npm install
```

### 启动前端开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建前端生产版本

```bash
npm run build
```

### 启动后端服务 (开发中)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## 开发指南

### 前端开发

#### 项目结构说明

```
frontend/src/
├── components/          # 可复用组件
│   ├── Header/         # 导航栏
│   ├── Footer/         # 页脚
│   └── HeroSection/    # 首页 Hero 区域
├── pages/              # 页面组件
│   └── Home/           # 首页
├── layouts/            # 布局组件
│   └── MainLayout/     # 主布局
├── store/              # Zustand 状态管理
│   ├── authStore.ts    # 认证状态
│   └── projectStore.ts # 项目状态
├── services/           # API 服务层
│   ├── api.ts          # Axios 配置
│   ├── authService.ts  # 认证 API
│   └── projectService.ts # 项目 API
└── types/              # TypeScript 类型
    └── index.ts        # 类型定义
```

#### 添加新页面

1. 在 `src/pages/` 下创建新页面组件
2. 在 `src/App.tsx` 中添加路由配置

```typescript
// 示例：添加分析页面
import Analysis from './pages/Analysis';

// 在路由配置中添加
<Route path="/analysis" element={<ProtectedRoute><Analysis /></ProtectedRoute>} />
```

#### API 调用

所有 API 调用应通过 `services/` 下的服务层进行，已配置拦截器自动处理认证。

```typescript
import { authAPI } from './services/authService';

const handleLogin = async () => {
  const response = await authAPI.login({ username, password });
  // 处理响应
};
```

### 后端开发

#### API 路由示例

```python
from fastapi import APIRouter
from app.services.analysis_service import perform_pca

router = APIRouter(prefix="/api/analysis", tags=["analysis"])

@router.post("/pca")
async def run_pca(file_id: str, n_components: int = 50):
    """执行 PCA 降维"""
    result = await perform_pca(file_id, n_components)
    return result
```

## 功能模块

### 已实现功能

- ✅ 响应式首页设计
- ✅ 用户认证系统
- ✅ 项目管理界面
- ✅ 文件上传功能

### 规划功能

- 🚧 数据可视化（散点图、热图、t-SNE、UMAP）
- 🚧 数据预处理（质量控制、归一化、批次效应校正）
- 🚧 聚类分析（K-means、Leiden、Louvain）
- 🚧 差异表达分析
- 🚧 细胞类型注释
- 🚧 轨迹分析

## 支持的数据格式

- **.h5ad**: AnnData 格式 (推荐)
- **.loom**: Loom 格式
- **.mtx**: Matrix Market 格式
- **.csv**: 基因表达矩阵

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

## 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 [GitHub Issue](../../issues)
- 发送邮件至项目维护者

## 致谢

感谢以下开源项目：

- [React](https://react.dev/)
- [Ant Design](https://ant.design/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Scanpy](https://scanpy.readthedocs.io/)
- [AnnData](https://anndata.readthedocs.io/)

---

⭐ 如果这个项目对你有帮助，请给我们一个 Star！
