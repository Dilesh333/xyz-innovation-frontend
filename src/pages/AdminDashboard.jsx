"use client"

import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import AdminSidebar from "../components/admin/AdminSidebar"
import ServicesManagement from "../components/admin/ServicesManagement"
import MessagesViewer from "../components/admin/MessagesViewer"
import AdminHome from "../components/admin/AdminHome"
import { useTheme } from "../context/ThemeContext"

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { isDark } = useTheme()

  return (
    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: isDark ? "#0f172a" : "#f8fafc",
        color: isDark ? "#f1f5f9" : "#0f172a",
      }}
    >
      <AdminSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex-1 overflow-auto transition-all duration-300 pt-16 md:pt-6 pr-2 md:pl-64"
      >
        <Routes>
          <Route path="dashboard" element={<AdminHome />} />
          <Route path="services" element={<ServicesManagement />} />
          <Route path="messages" element={<MessagesViewer />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
      </motion.main>
    </div>
  )
}
