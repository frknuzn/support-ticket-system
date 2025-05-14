import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { Bell, Menu } from "lucide-react"

export default function Navbar({ setSidebarOpen }: { setSidebarOpen: (open: boolean) => void }) {
  const { logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm flex items-center h-16 px-4 z-10">
      <Menu
        className="w-6 h-6 text-[#2F3E9E] cursor-pointer md:hidden"
        onClick={() => setSidebarOpen(true)}
      />

      <h1 className="text-lg font-bold text-[#2F3E9E] ml-4 md:ml-0">Support System</h1>

      <div className="ml-auto flex items-center space-x-4">
        <Bell className="w-5 h-5 text-gray-600 cursor-pointer" />
        <Button variant="outline" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </header>
  )
}