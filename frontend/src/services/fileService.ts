import api from './api';

export interface FileResponse {
  id: string;
  project_id: string;
  filename: string;
  original_name: string;
  file_size: number;
  file_type: string;
  uploaded_at: string;
}

export const fileService = {
  // 上传文件
  async uploadFile(projectId: string, file: File): Promise<FileResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post<FileResponse>(`/files/upload/${projectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  // 获取项目的文件列表
  async getProjectFiles(projectId: string): Promise<FileResponse[]> {
    const response = await api.get<FileResponse[]>(`/files/project/${projectId}`);
    return response.data;
  },

  // 删除文件
  async deleteFile(fileId: string): Promise<void> {
    await api.delete(`/files/${fileId}`);
  },

  // 格式化文件大小
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  },
};
