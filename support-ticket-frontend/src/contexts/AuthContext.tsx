// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react"
import api from "@/api/axios"
import { useNavigate } from "react-router-dom"

type UserResponse = {
  id: number
  username: string
  role: string
}

type AuthContextType = {
  user: UserResponse | null
  token: string | null
  login: (token: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("authToken"))
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      setIsLoading(true)
      api.get("/auth/me")
        .then(res => {
          setUser(res.data.data)
          setIsLoading(false)
        })
        .catch(() => {
          logout()
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [token])

  const login = (newToken: string) => {
    localStorage.setItem("authToken", newToken)
    setToken(newToken)
    setIsLoading(true)
    api.get("/auth/me", {
      headers: { Authorization: `Bearer ${newToken}` }
    }).then(res => {
      setUser(res.data.data)
      setIsLoading(false)
    })
      .catch(() => {
        logout()
        setIsLoading(false)
      })
  }

  const logout = () => {
    localStorage.removeItem("authToken")
    setToken(null)
    setUser(null)
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
