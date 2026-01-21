import api from './api'

export interface Project {
  id: string
  name: string
  description?: string
  status: 'draft' | 'processing' | 'completed' | 'error'
  created_at: string
  updated_at: string
  file_count?: number
  cell_count?: number
}

export interface CreateProjectRequest {
  name: string
  description?: string
}

export interface UpdateProjectRequest {
  name: string
  description?: string
  status?: 'draft' | 'processing' | 'completed' | 'error'
}

export const projectService = {
  // 获取项目列表
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/projects/')
    return response.data
  },

  // 获取单个项目详情
  getProject: async (id: string): Promise<Project> => {
    const response = await api.get<Project>(`/projects/${id}/`)
    return response.data
  },

  // 创建项目
  createProject: async (data: CreateProjectRequest): Promise<Project> => {
    const response = await api.post<Project>('/projects/', data)
    return response.data
  },

  // 更新项目
  updateProject: async (id: string, data: UpdateProjectRequest): Promise<Project> => {
    const response = await api.put<Project>(`/projects/${id}/`, data)
    return response.data
  },

  // 删除项目
  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}/`)
  },
}
