"use client"

import { motion } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Settings, Mail, LogOut, Menu, X } from "lucide-react"
import { useData } from "../../context/DataContext"

export default function AdminSidebar({ open, onToggle }) {
  const location = useLocation()
  const { logout } = useData()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Settings, label: "Services", path: "/admin/services" },
    { icon: Mail, label: "Messages", path: "/admin/messages" },
  ]

  const isActive = (path) => location.pathname === path

  const handleNavClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768 && open) {
      onToggle()
    }
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 inline-flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-violet-300"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </motion.button>
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: open ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="md:hidden fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white z-40 pt-16 px-6 pb-6 flex flex-col"
      >
        <div className="flex flex-col h-full justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
            <p className="text-xs text-slate-400 mt-1">XYZ Innovations</p>
          </motion.div>

          <nav className="space-y-2 flex-1 overflow-auto">
            {menuItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-violet-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="mt-4 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </motion.div>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onToggle}
          className="md:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
      <div className="hidden md:flex md:flex-col md:fixed md:left-0 md:top-0 md:h-screen md:w-64 bg-slate-900 text-white pt-8 px-6 pb-6 z-30">
        <div className="flex flex-col h-full w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
            <p className="text-xs text-slate-400 mt-1">XYZ Innovations</p>
          </div>

          <nav className="space-y-2 flex-1">
            {menuItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? "bg-violet-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="mt-4 w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </div>
    </>
  )
}
