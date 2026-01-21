import api from './api'
import { Project } from '../types'

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const response = await api.get<Project[]>('/projects')
    return response.data
  },

  getProject: async (id: string): Promise<Project> => {
    const response = await api.get<Project>(`/projects/${id}`)
    return response.data
  },

  createProject: async (data: {
    name: string
    description: string
  }): Promise<Project> => {
    const response = await api.post<Project>('/projects', data)
    return response.data
  },

  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`)
  },
}
