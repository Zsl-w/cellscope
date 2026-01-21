import { create } from 'zustand'
import { Project, projectService } from '../services/projectService'

interface ProjectState {
  projects: Project[]
  currentProject: Project | null
  loading: boolean
  error: string | null

  // Actions
  fetchProjects: () => Promise<void>
  fetchProject: (id: string) => Promise<void>
  createProject: (data: { name: string; description?: string }) => Promise<void>
  updateProject: (id: string, data: { name: string; description?: string; status?: 'draft' | 'processing' | 'completed' | 'error' }) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  setCurrentProject: (project: Project | null) => void
  clearError: () => void
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null })
    try {
      const projects = await projectService.getProjects()
      set({ projects, loading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '获取项目列表失败',
        loading: false
      })
    }
  },

  fetchProject: async (id: string) => {
    set({ loading: true, error: null })
    try {
      const project = await projectService.getProject(id)
      set({ currentProject: project, loading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '获取项目详情失败',
        loading: false
      })
    }
  },

  createProject: async (data) => {
    set({ loading: true, error: null })
    try {
      const newProject = await projectService.createProject(data)
      set((state) => ({
        projects: [...state.projects, newProject],
        loading: false
      }))
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '创建项目失败',
        loading: false
      })
      throw error
    }
  },

  updateProject: async (id, data) => {
    set({ loading: true, error: null })
    try {
      const updatedProject = await projectService.updateProject(id, data)
      set((state) => ({
        projects: state.projects.map((p) =>
          p.id === id ? updatedProject : p
        ),
        currentProject:
          state.currentProject?.id === id ? updatedProject : state.currentProject,
        loading: false
      }))
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '更新项目失败',
        loading: false
      })
      throw error
    }
  },

  deleteProject: async (id) => {
    set({ loading: true, error: null })
    try {
      await projectService.deleteProject(id)
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        currentProject: state.currentProject?.id === id ? null : state.currentProject,
        loading: false
      }))
    } catch (error: any) {
      set({
        error: error.response?.data?.message || '删除项目失败',
        loading: false
      })
      throw error
    }
  },

  setCurrentProject: (project) => {
    set({ currentProject: project })
  },

  clearError: () => {
    set({ error: null })
  }
}))
