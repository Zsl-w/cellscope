import { Router, Request, Response } from 'express';
import { projectService } from '../services/projectService';
import { CreateProjectRequest, UpdateProjectRequest, ErrorResponse } from '../types';

const router = Router();

// 获取项目列表
router.get('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ detail: 'Not authenticated' } as ErrorResponse);
      return;
    }

    const projects = await projectService.getProjectsByUserId(userId);

    // 转换为前端期望的格式
    const formattedProjects = projects.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      status: p.status,
      created_at: p.createdAt,
      updated_at: p.updatedAt,
      file_count: p.file_count || 0,
      cell_count: p.cell_count || 0,
    }));

    res.status(200).json(formattedProjects);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get projects';
    res.status(500).json({ detail: errorMessage } as ErrorResponse);
  }
});

// 获取单个项目详情
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ detail: 'Not authenticated' } as ErrorResponse);
      return;
    }

    const projectId = req.params.id;
    const project = await projectService.findById(projectId);

    if (!project) {
      res.status(404).json({ detail: 'Project not found' } as ErrorResponse);
      return;
    }

    // 验证所有权
    if (project.userId !== userId) {
      res.status(403).json({ detail: 'Access denied' } as ErrorResponse);
      return;
    }

    // 转换为前端期望的格式
    const formattedProject = {
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
      file_count: project.file_count || 0,
      cell_count: project.cell_count || 0,
    };

    res.status(200).json(formattedProject);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get project';
    res.status(500).json({ detail: errorMessage } as ErrorResponse);
  }
});

// 创建项目
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ detail: 'Not authenticated' } as ErrorResponse);
      return;
    }

    const createData: CreateProjectRequest = req.body;

    // 创建项目
    const project = await projectService.createProject(userId, createData);

    // 转换为前端期望的格式
    const formattedProject = {
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
      file_count: project.file_count || 0,
      cell_count: project.cell_count || 0,
    };

    res.status(201).json(formattedProject);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create project';
    const statusCode = errorMessage === 'Project name is required' ? 400 : 500;
    res.status(statusCode).json({ detail: errorMessage } as ErrorResponse);
  }
});

// 更新项目
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ detail: 'Not authenticated' } as ErrorResponse);
      return;
    }

    const projectId = req.params.id;
    const updateData: UpdateProjectRequest = req.body;

    // 更新项目
    const project = await projectService.updateProject(projectId, userId, updateData);

    // 转换为前端期望的格式
    const formattedProject = {
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
      file_count: project.file_count || 0,
      cell_count: project.cell_count || 0,
    };

    res.status(200).json(formattedProject);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update project';
    const statusCode = errorMessage === 'Project name is required' ? 400 : 
                      errorMessage === 'Project not found' ? 404 : 500;
    res.status(statusCode).json({ detail: errorMessage } as ErrorResponse);
  }
});

// 删除项目
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ detail: 'Not authenticated' } as ErrorResponse);
      return;
    }

    const projectId = req.params.id;

    // 删除项目
    await projectService.deleteProject(projectId, userId);

    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete project';
    const statusCode = errorMessage === 'Project not found' ? 404 : 500;
    res.status(statusCode).json({ detail: errorMessage } as ErrorResponse);
  }
});

export default router;
