"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"
import { Moon, Sun, Menu, X } from "lucide-react"

const mobileMenuContainerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const mobileMenuItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
}

export default function Navbar() {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav
      className="fixed top-0 w-full z-50 backdrop-blur-md border-b"
      style={{
        backgroundColor: isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
        borderColor: isDark ? "#1e293b" : "#e2e8f0",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xl sm:text-2xl font-bold gradient-text cursor-pointer whitespace-nowrap"
          onClick={() => {
            navigate("/")
            window.scrollTo({ top: 0, behavior: "smooth" })
            setIsMenuOpen(false)
          }}
        >
          XYZ Innovations
        </motion.div>
        <div className="hidden md:flex items-center gap-6">
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#services"
            className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400"
          >
            Services
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#testimonials"
            className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400"
          >
            Testimonials
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#contact"
            className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-400"
          >
            Contact
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/admin-login"
            className="px-4 py-2 bg-violet-600 text-white rounded-full text-sm font-medium hover:bg-violet-700 whitespace-nowrap"
          >
            Admin
          </motion.a>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              isDark ? "text-slate-100/90 hover:text-white" : "text-slate-700 hover:text-slate-900"
            }`}
          >
            {isMenuOpen ? <X size={20} strokeWidth={2.2} /> : <Menu size={20} strokeWidth={2.2} />}
          </button>
        </div>
      </motion.div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`md:hidden fixed inset-x-0 top-14 z-40 h-[70vh] min-h-[60vh] backdrop-blur-xl border-t ${
            isDark
              ? "bg-slate-900/75 border-slate-800/60"
              : "bg-slate-100/90 border-slate-300/70"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="h-full flex flex-col items-center justify-start px-6 pt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              variants={mobileMenuContainerVariants}
              initial="hidden"
              animate="visible"
              className={`w-full max-w-md rounded-2xl shadow-xl px-6 py-6 flex flex-col gap-5 border ${
                isDark
                  ? "bg-slate-900/95 border-slate-700/80"
                  : "bg-white border-slate-300"
              }`}
            >
              <div className="flex flex-col gap-3 text-center">
                <motion.a
                  variants={mobileMenuItemVariants}
                  href="#services"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    isDark
                      ? "text-slate-200 hover:text-violet-400"
                      : "text-slate-800 hover:text-violet-600"
                  }`}
                >
                  Services
                </motion.a>
                <motion.a
                  variants={mobileMenuItemVariants}
                  href="#testimonials"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    isDark
                      ? "text-slate-200 hover:text-violet-400"
                      : "text-slate-800 hover:text-violet-600"
                  }`}
                >
                  Testimonials
                </motion.a>
                <motion.a
                  variants={mobileMenuItemVariants}
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    isDark
                      ? "text-slate-200 hover:text-violet-400"
                      : "text-slate-800 hover:text-violet-600"
                  }`}
                >
                  Contact
                </motion.a>
              </div>

              <div className="flex justify-center">
                <motion.a
                  variants={mobileMenuItemVariants}
                  href="/admin-login"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center px-3 py-1.5 bg-violet-600 text-white rounded-full text-xs font-medium hover:bg-violet-700 whitespace-nowrap shadow-sm"
                >
                  Admin
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}
