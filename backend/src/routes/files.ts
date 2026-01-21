import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { fileService } from '../services/fileService';
import { ErrorResponse } from '../types';

const router = Router();

// 配置文件上传
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
  fileFilter: (req, file, cb) => {
    // 允许的文件类型
    const allowedTypes = [
      'text/csv',
      'text/plain',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/x-hdf5',
      'application/octet-stream',
    ];

    const allowedExtensions = ['.csv', '.txt', '.xlsx', '.xls', '.h5', '.h5ad', '.h5ad.gz'];

    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only CSV, TXT, Excel, and H5 files are allowed.'));
    }
  },
});

// 上传文件
router.post('/upload/:projectId', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ detail: 'Not authenticated' } as ErrorResponse);
      return;
    }

    const projectId = req.params.id || req.params.projectId;

    if (!req.file) {
      res.status(400).json({ detail: 'No file uploaded' } as ErrorResponse);
      return;
    }

    const file = await fileService.uploadFile(
      userId,
      projectId,
      req.file.originalname,
      req.file.buffer,
      req.file.mimetype
    );

    // 转换为前端期望的格式
    const formattedFile = {
      id: file.id,
      project_id: file.projectId,
      filename: file.filename,
      original_name: file.originalName,
      file_size: file.fileSize,
      file_type: file.fileType,
      uploaded_at: file.uploadedAt,
    };

    res.status(201).json(formattedFile);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload file';
    const statusCode = errorMessage.includes('Invalid file type') ? 400 : 500;
    res.status(statusCode).json({ detail: errorMessage } as ErrorResponse);
  }
});

// 获取项目的文件列表
router.get('/project/:projectId', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ detail: 'Not authenticated' } as ErrorResponse);
      return;
    }

    const projectId = req.params.projectId;

    const files = await fileService.getFilesByProjectId(projectId);

    // 过滤只返回用户自己的文件
    const userFiles = files.filter(f => f.userId === userId);

    // 转换为前端期望的格式
    const formattedFiles = userFiles.map(f => ({
      id: f.id,
      project_id: f.projectId,
      filename: f.filename,
      original_name: f.originalName,
      file_size: f.fileSize,
      file_type: f.fileType,
      uploaded_at: f.uploadedAt,
    }));

    res.status(200).json(formattedFiles);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to get files';
    res.status(500).json({ detail: errorMessage } as ErrorResponse);
  }
});

// 删除文件
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ detail: 'Not authenticated' } as ErrorResponse);
      return;
    }

    const fileId = req.params.id;

    await fileService.deleteFile(fileId, userId);

    res.status(204).send();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete file';
    const statusCode = errorMessage === 'File not found' ? 404 : 500;
    res.status(statusCode).json({ detail: errorMessage } as ErrorResponse);
  }
});

export default router;
