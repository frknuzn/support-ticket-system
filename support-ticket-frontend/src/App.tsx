// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import UserDashboard from "@/pages/UserDashboard"
import AdminDashboard from "@/pages/AdminDashboard"
import ProtectedRoute from "@/components/ProtectedRoute"
import AdminRoute from "@/components/AdminRoute"
import Layout from "@/components/layout/Layout"
import { AuthProvider } from "@/contexts/AuthContext"

export default function App() {
  return (
    <Router>
      <AuthProvider> 
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user/dashboard" element={
            <ProtectedRoute>
              <Layout><UserDashboard /></Layout>
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <Layout><AdminDashboard /></Layout>
            </AdminRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  )
}