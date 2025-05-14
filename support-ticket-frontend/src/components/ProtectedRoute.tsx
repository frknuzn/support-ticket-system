import { Navigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const { user, token, isLoading } = useAuth()
  
  // Yükleme durumunda bir loading göstergesi gösterebilirsiniz
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>
  }
  
  // Hem token hem de user kontrolü yapıyoruz
  if (!token || !user) {
    return <Navigate to="/" />
  }
  
  return children
}
