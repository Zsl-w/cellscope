import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { User, RegisterRequest, LoginRequest } from '../types';

const DATA_DIR = path.join(__dirname, '../../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// 确保数据目录和文件存在
async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(USERS_FILE);
    } catch {
      await fs.writeFile(USERS_FILE, '[]');
    }
  } catch (error) {
    console.error('Error ensuring data file:', error);
  }
}

// 读取用户数据
async function readUsers(): Promise<User[]> {
  await ensureDataFile();
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
}

// 写入用户数据
async function writeUsers(users: User[]): Promise<void> {
  await ensureDataFile();
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users:', error);
    throw error;
  }
}

// 用户服务
export const userService = {
  // 注册用户
  async register(data: RegisterRequest): Promise<User> {
    const users = await readUsers();

    // 检查邮箱是否已存在
    const existingUser = users.find(u => u.email === data.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 创建新用户（支持 name 或 username 字段）
    const newUser: User = {
      id: uuidv4(),
      email: data.email,
      password: hashedPassword,
      name: data.name || data.username,  // 优先使用 name，如果没有则使用 username
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeUsers(users);

    // 返回不包含密码的用户信息
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  },

  // 登录验证
  async login(data: LoginRequest): Promise<User> {
    const users = await readUsers();

    // 查找用户
    const user = users.find(u => u.email === data.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // 验证密码
    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // 返回不包含密码的用户信息
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },

  // 根据 ID 获取用户
  async findById(userId: string): Promise<User | null> {
    const users = await readUsers();
    const user = users.find(u => u.id === userId);
    if (!user) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },

  // 根据 email 获取用户
  async findByEmail(email: string): Promise<User | null> {
    const users = await readUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  },
};
