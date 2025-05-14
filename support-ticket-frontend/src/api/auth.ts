// src/api/auth.ts
import api from './axios'

export interface LoginRequest {
  username: string
  password: string
}

export interface RegisterRequest {
  username: string
  password: string
}

export type UserResponse = {
    id: number
    username: string
    role: string
}

export interface User {
  id: number
  username: string
  role: 'USER' | 'ADMIN'
}

export interface AuthResponse {
  token: string
  id: number
  username: string
  role: 'USER' | 'ADMIN'
}

export const login = async (data: LoginRequest) => {
  const response = await api.post<{ data: AuthResponse }>('/auth/login', data)

  const { token, id, username, role } = response.data.data

 const user: User = {
  id,
  username,
  role: role.replace('ROLE_', '') as 'USER' | 'ADMIN'
}

  return { user, token }
}

export const register = async (data: RegisterRequest) => {
  await api.post('/auth/register', data)
}

export const getCurrentUser = async () => {
  const response = await api.get<{ data: User }>('/auth/me')
  return response.data.data
}