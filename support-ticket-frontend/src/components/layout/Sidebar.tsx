import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Home, Ticket, X } from "lucide-react"

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) {
  const { user } = useAuth()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-[#2F3E9E] text-white shadow-lg z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-72 w-64`}
      >
        <div className="flex items-center justify-between p-4 md:hidden">
          <h2 className="text-xl font-bold">MatDash</h2>
          <X className="w-6 h-6 cursor-pointer" onClick={() => setIsOpen(false)} />
        </div>

        <h2 className="hidden md:block text-xl font-bold p-6">MatDash</h2>
        <nav className="space-y-2 px-4">
          {user?.role === "ADMIN" ? (
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-[#3E4B5B] transition"
            >
              <Home className="w-5 h-5" />
              <span>Admin Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/user/dashboard"
              className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-[#3E4B5B] transition"
            >
              <Ticket className="w-5 h-5" />
              <span>My Tickets</span>
            </Link>
          )}
        </nav>
      </aside>
    </>
  )
}