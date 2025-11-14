"use client"

import { motion } from "framer-motion"
import { useData } from "../../context/DataContext"
import { BarChart3, Mail, Settings } from "lucide-react"

export default function AdminHome() {
  const { services, messages } = useData()

  const stats = [
    { icon: Settings, label: "Services", value: services.length },
    { icon: Mail, label: "Messages", value: messages.length },
    { icon: BarChart3, label: "Unread", value: messages.filter((m) => !m.isRead).length },
  ]

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Welcome back to your admin panel</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-lg text-violet-600 dark:text-violet-400">
                <stat.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="hidden md:block bg-white dark:bg-slate-800 p-8 rounded-xl border border-slate-200 dark:border-slate-700"
      >
        <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
        <div className="space-y-3 text-slate-600 dark:text-slate-400">
          <p>👉 Manage your services in the Services tab</p>
          <p>📧 View customer messages in the Messages tab</p>
          <p>🌐 Check the live landing page for real-time updates</p>
        </div>
      </motion.div>
    </div>
  )
}
