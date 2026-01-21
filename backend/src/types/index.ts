export interface User {
  id: string;
  email: string;
  password: string;
  name: string;  // 存储时使用 name
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;  // 返回给前端时使用 username
  createdAt: string;
  updatedAt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;     // 支持后端的 name 字段
  username?: string; // 支持前端的 username 字段
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    username: string;  // 使用 username 以匹配前端
  };
}

export interface ErrorResponse {
  detail: string;
}

// Project types
export interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  status: 'draft' | 'processing' | 'completed' | 'error';
  file_count?: number;
  cell_count?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
}

export interface UpdateProjectRequest {
  name: string;
  description?: string;
  status?: 'draft' | 'processing' | 'completed' | 'error';
}

// File types
export interface File {
  id: string;
  projectId: string;
  userId: string;
  filename: string;
  originalName: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
}

export interface FileResponse {
  id: string;
  project_id: string;
  filename: string;
  original_name: string;
  file_size: number;
  file_type: string;
  uploaded_at: string;
}
