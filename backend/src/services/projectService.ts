import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Project, CreateProjectRequest, UpdateProjectRequest } from '../types';

const DATA_DIR = path.join(__dirname, '../../data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');

// 确保数据目录和文件存在
async function ensureDataFile() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(PROJECTS_FILE);
    } catch {
      await fs.writeFile(PROJECTS_FILE, '[]');
    }
  } catch (error) {
    console.error('Error ensuring data file:', error);
  }
}

// 读取项目数据
async function readProjects(): Promise<Project[]> {
  await ensureDataFile();
  try {
    const data = await fs.readFile(PROJECTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

// 写入项目数据
async function writeProjects(projects: Project[]): Promise<void> {
  await ensureDataFile();
  try {
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
  } catch (error) {
    console.error('Error writing projects:', error);
    throw error;
  }
}

// 项目服务
export const projectService = {
  // 获取用户的所有项目
  async getProjectsByUserId(userId: string): Promise<Project[]> {
    const projects = await readProjects();
    return projects.filter(p => p.userId === userId);
  },

  // 根据 ID 获取项目
  async findById(projectId: string): Promise<Project | null> {
    const projects = await readProjects();
    const project = projects.find(p => p.id === projectId);
    return project || null;
  },

  // 创建项目
  async createProject(userId: string, data: CreateProjectRequest): Promise<Project> {
    const projects = await readProjects();

    // 验证必填字段
    if (!data.name || data.name.trim() === '') {
      throw new Error('Project name is required');
    }

    // 创建新项目
    const newProject: Project = {
      id: uuidv4(),
      userId: userId,
      name: data.name.trim(),
      description: data.description?.trim(),
      status: 'draft',
      file_count: 0,
      cell_count: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    projects.push(newProject);
    await writeProjects(projects);

    return newProject;
  },

  // 更新项目
  async updateProject(projectId: string, userId: string, data: UpdateProjectRequest): Promise<Project> {
    const projects = await readProjects();

    // 查找项目并验证所有权
    const projectIndex = projects.findIndex(p => p.id === projectId && p.userId === userId);
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }

    // 验证必填字段
    if (!data.name || data.name.trim() === '') {
      throw new Error('Project name is required');
    }

    // 更新项目信息
    const updatedProject = {
      ...projects[projectIndex],
      name: data.name.trim(),
      description: data.description?.trim(),
      status: data.status || projects[projectIndex].status,
      updatedAt: new Date().toISOString(),
    };

    projects[projectIndex] = updatedProject;
    await writeProjects(projects);

    return updatedProject;
  },

  // 删除项目
  async deleteProject(projectId: string, userId: string): Promise<void> {
    const projects = await readProjects();

    // 查找项目并验证所有权
    const projectIndex = projects.findIndex(p => p.id === projectId && p.userId === userId);
    if (projectIndex === -1) {
      throw new Error('Project not found');
    }

    // 删除项目
    projects.splice(projectIndex, 1);
    await writeProjects(projects);
  },
};
