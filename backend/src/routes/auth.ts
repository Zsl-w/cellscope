import { Router, Request, Response } from 'express';
import { userService } from '../services/userService';
import { generateToken } from '../utils/jwt';
import { RegisterRequest, LoginRequest, AuthResponse, ErrorResponse } from '../types';

const router = Router();

// 注册接口
router.post('/register', async (req: Request, res: Response) => {
  try {
    const registerData: RegisterRequest = req.body;

    // 验证必填字段（支持 name 或 username 字段）
    const name = registerData.name || registerData.username;
    if (!registerData.email || !registerData.password || !name) {
      res.status(400).json({ detail: 'Email, password and name are required' } as ErrorResponse);
      return;
    }

    // 注册用户（使用 name 字段）
    const user = await userService.register({
      email: registerData.email,
      password: registerData.password,
      name: name,
    });

    // 生成 token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // 返回响应（使用 username 字段以匹配前端）
    const response: AuthResponse = {
      access_token: token,
      token_type: 'bearer',
      user: {
        id: user.id,
        email: user.email,
        username: user.name,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Registration failed';
    res.status(400).json({ detail: errorMessage } as ErrorResponse);
  }
});

// 登录接口（OAuth2 风格，支持 URL-encoded 和 JSON）
router.post('/token', async (req: Request, res: Response) => {
  try {
    // 从请求体中获取数据（支持多种格式）
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      res.status(400).json({ detail: 'Username and password are required' } as ErrorResponse);
      return;
    }

    // 登录验证（username 实际上是 email）
    const user = await userService.login({ email: username, password });

    // 生成 token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // 返回响应（使用 username 字段以匹配前端）
    const response: AuthResponse = {
      access_token: token,
      token_type: 'bearer',
      user: {
        id: user.id,
        email: user.email,
        username: user.name,
      },
    };

    res.status(200).json(response);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Login failed';
    res.status(401).json({ detail: errorMessage } as ErrorResponse);
  }
});

// 获取当前用户信息
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ detail: 'Not authenticated' } as ErrorResponse);
      return;
    }

    const token = authHeader.substring(7);
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());

    const user = await userService.findById(payload.userId);

    if (!user) {
      res.status(404).json({ detail: 'User not found' } as ErrorResponse);
      return;
    }

    // 返回用户信息（将 name 映射为 username 以匹配前端）
    res.status(200).json({
      id: user.id,
      email: user.email,
      username: user.name,  // 将 name 映射为 username
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get user';
    res.status(500).json({ detail: errorMessage } as ErrorResponse);
  }
});

export default router;
