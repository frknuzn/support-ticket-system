import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar"
import { useState } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F5F6FA] overflow-x-hidden">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`transition-all ${sidebarOpen ? "pl-64" : "md:pl-72"} pt-16`}>
        <Navbar setSidebarOpen={setSidebarOpen} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}