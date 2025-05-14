import { Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import React from 'react'

export default function AdminRoute({ children }: { children: React.ReactElement }) {
  const { user, token, isLoading } = useAuth()

  // Yükleme durumunda bir loading göstergesi gösterebilirsiniz
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>
  }

  if (!token || !user) {
    return <Navigate to="/" replace />
  }

  if (user.role !== 'ADMIN') {
    return <Navigate to="/user/dashboard" replace />
  }

  return children
}
