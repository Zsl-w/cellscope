import api from './api'
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types'

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    // 使用 URLSearchParams 发送 application/x-www-form-urlencoded 格式
    const params = new URLSearchParams()
    params.append('username', data.email)
    params.append('password', data.password)

    const response = await api.post<AuthResponse>('/auth/token', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    return response.data
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data)
    return response.data
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me')
    return response.data
  },
}
