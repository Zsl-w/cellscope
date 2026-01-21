import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { File } from '../types';

const DATA_DIR = path.join(__dirname, '../../data');
const FILES_DB = path.join(DATA_DIR, 'files.json');
const UPLOAD_DIR = path.join(__dirname, '../../uploads');

// 确保目录存在
async function ensureDirectories() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }

  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

// 读取文件数据库
async function readFilesDB(): Promise<File[]> {
  try {
    const data = await fs.readFile(FILES_DB, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// 写入文件数据库
async function writeFilesDB(files: File[]): Promise<void> {
  await fs.writeFile(FILES_DB, JSON.stringify(files, null, 2));
}

// 文件服务
class FileService {
  async uploadFile(
    userId: string,
    projectId: string,
    originalName: string,
    fileBuffer: Buffer,
    mimeType: string
  ): Promise<File> {
    await ensureDirectories();

    const fileId = uuidv4();
    const ext = path.extname(originalName);
    const filename = `${fileId}${ext}`;
    const filePath = path.join(UPLOAD_DIR, filename);

    // 保存文件到磁盘
    await fs.writeFile(filePath, fileBuffer);

    // 创建文件记录
    const file: File = {
      id: fileId,
      userId,
      projectId,
      filename,
      originalName,
      fileSize: fileBuffer.length,
      fileType: mimeType,
      uploadedAt: new Date().toISOString(),
    };

    // 保存到数据库
    const files = await readFilesDB();
    files.push(file);
    await writeFilesDB(files);

    return file;
  }

  async getFilesByProjectId(projectId: string): Promise<File[]> {
    const files = await readFilesDB();
    return files.filter(f => f.projectId === projectId);
  }

  async getFileById(fileId: string): Promise<File | null> {
    const files = await readFilesDB();
    return files.find(f => f.id === fileId) || null;
  }

  async deleteFile(fileId: string, userId: string): Promise<void> {
    const files = await readFilesDB();
    const fileIndex = files.findIndex(f => f.id === fileId);

    if (fileIndex === -1) {
      throw new Error('File not found');
    }

    const file = files[fileIndex];

    // 验证所有权
    if (file.userId !== userId) {
      throw new Error('Access denied');
    }

    // 删除物理文件
    try {
      const filePath = path.join(UPLOAD_DIR, file.filename);
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Failed to delete physical file:', error);
    }

    // 从数据库删除
    files.splice(fileIndex, 1);
    await writeFilesDB(files);
  }
}

export const fileService = new FileService();
