import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import projectsRouter from './routes/projects';
import filesRouter from './routes/files';
import { authMiddleware } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 8000;

// 中间件
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 请求日志
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API 路由
app.use('/api/auth', authRouter);
app.use('/api/projects', authMiddleware, projectsRouter);
app.use('/api/files', authMiddleware, filesRouter);

// 健康检查
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ detail: 'Not found' });
});

// 错误处理
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ detail: err.message || 'Internal server error' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 Mock Backend Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   POST   /api/auth/register   - Register a new user`);
  console.log(`   POST   /api/auth/token      - Login (OAuth2 style)`);
  console.log(`   GET    /api/auth/me         - Get current user`);
  console.log(`   GET    /api/projects/       - Get user's projects`);
  console.log(`   POST   /api/projects/       - Create a new project`);
  console.log(`   GET    /api/projects/:id    - Get project details`);
  console.log(`   PUT    /api/projects/:id    - Update project`);
  console.log(`   DELETE /api/projects/:id    - Delete project`);
  console.log(`   POST   /api/files/upload/:projectId - Upload file`);
  console.log(`   GET    /api/files/project/:projectId - Get project files`);
  console.log(`   DELETE /api/files/:id       - Delete file`);
  console.log(`   GET    /health              - Health check`);
});

export default app;
