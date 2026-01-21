# CellScope Mock Backend Server

这是 CellScope 单细胞数据分析平台的 Mock 后端服务器，用于模拟真实的后端 API。

## 功能特性

- ✅ 用户注册（邮箱、密码、用户名）
- ✅ 用户登录（OAuth2 风格，支持 JWT）
- ✅ JWT Token 认证
- ✅ 用户数据持久化（存储在 JSON 文件）
- ✅ 密码加密（bcrypt）
- ✅ CORS 支持
- ✅ 请求日志

## 安装依赖

```bash
cd backend
npm install
```

## 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:8000` 启动。

## 启动生产服务器

```bash
npm run build
npm start
```

## API 端点

### 1. 注册用户

**请求：**
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name"
}
```

**响应：**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### 2. 登录（OAuth2 风格）

**请求：**
```http
POST /api/auth/token
Content-Type: multipart/form-data

username=user@example.com
password=password123
```

**响应：**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

### 3. 获取当前用户

**请求：**
```http
GET /api/auth/me
Authorization: Bearer <access_token>
```

**响应：**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "User Name",
  "createdAt": "2024-01-22T00:00:00.000Z",
  "updatedAt": "2024-01-22T00:00:00.000Z"
}
```

### 4. 健康检查

**请求：**
```http
GET /health
```

**响应：**
```json
{
  "status": "ok",
  "timestamp": "2024-01-22T00:00:00.000Z"
}
```

## 数据存储

用户数据存储在 `data/users.json` 文件中，格式如下：

```json
[
  {
    "id": "uuid",
    "email": "user@example.com",
    "password": "$2a$10$hashed_password",
    "name": "User Name",
    "createdAt": "2024-01-22T00:00:00.000Z",
    "updatedAt": "2024-01-22T00:00:00.000Z"
  }
]
```

## JWT 配置

- **Secret Key**: 环境变量 `JWT_SECRET`，默认值 `your-secret-key-change-in-production`
- **过期时间**: 7 天

## 环境变量

可以创建 `.env` 文件来配置：

```env
PORT=8000
JWT_SECRET=your-production-secret-key
```

## 项目结构

```
backend/
├── src/
│   ├── index.ts              # 服务器入口
│   ├── routes/
│   │   └── auth.ts           # 认证路由
│   ├── middleware/
│   │   └── auth.ts           # JWT 认证中间件
│   ├── services/
│   │   └── userService.ts    # 用户数据服务
│   ├── utils/
│   │   └── jwt.ts            # JWT 工具函数
│   └── types/
│       └── index.ts          # TypeScript 类型定义
├── data/
│   └── users.json            # 用户数据（自动生成）
├── package.json
├── tsconfig.json
└── README.md
```

## 迁移到 FastAPI 后端

当您准备迁移到真实的 FastAPI 后端时：

1. 保持相同的 API 端点和响应格式
2. FastAPI 可以使用相同的 JWT 认证机制
3. 数据存储迁移到 PostgreSQL 数据库
4. 前端代码无需修改，只需更新代理配置的端口

## 故障排查

### 端口被占用

如果 8000 端口被占用，可以通过环境变量修改：

```bash
PORT=8001 npm run dev
```

同时需要更新前端的 `vite.config.ts` 代理配置。

### 数据文件问题

如果遇到数据文件问题，可以删除 `data/users.json` 文件，服务器会自动重新创建。

## 开发建议

- 使用 `npm run dev` 启动开发服务器，支持热重载
- 查看控制台日志以了解 API 请求情况
- 使用 Postman 或 curl 测试 API 端点
