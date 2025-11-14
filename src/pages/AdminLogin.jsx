"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { useData } from "../context/DataContext"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const { login } = useData()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) {
      navigate("/admin/dashboard")
    } else {
      setError("Invalid credentials. Try admin@xyz.com / admin123")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center px-4 py-6 sm:px-6">
      <div className="w-full max-w-md">
        <div className="bg-slate-900 rounded-2xl shadow-xl px-5 py-6 sm:p-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-6 sm:mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold gradient-text mb-2">Admin Login</h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">XYZ Innovations Dashboard</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@xyz.com"
                className="w-full px-3 py-2 sm:px-4 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-200">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 sm:px-4 border border-slate-700 rounded-lg bg-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-full text-sm sm:text-base font-medium hover:shadow-lg transition-shadow"
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-5 sm:mt-6 p-4 sm:p-5 bg-slate-800 rounded-lg text-xs sm:text-sm text-slate-200">
            <p className="font-medium mb-1">Demo Credentials:</p>
            <p>
              Email: <code className="bg-slate-900 px-2 py-1 rounded text-slate-100">admin@xyz.com</code>
            </p>
            <p>
              Password: <code className="bg-slate-900 px-2 py-1 rounded text-slate-100">admin123</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
