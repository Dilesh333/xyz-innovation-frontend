"use client"

import { motion } from "framer-motion"
import { useData } from "../../context/DataContext"
import { Mail, Trash2, CheckCircle2 } from "lucide-react"
import toast from "react-hot-toast"
import { useState } from "react"

export default function MessagesViewer() {
  const { messages, refreshMessages, toggleMessageRead, deleteMessage } = useData()
  const [selectedId, setSelectedId] = useState(null)

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString()
  }

  return (
    <div className="p-6 lg:p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Messages</h1>
          <p className="text-slate-600 dark:text-slate-400">View and manage contact form submissions</p>
        </div>
        <button
          onClick={refreshMessages}
          className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
        >
          Refresh
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-4"
      >
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <Mail size={40} className="mx-auto mb-3 text-slate-400" />
            <p className="text-slate-600 dark:text-slate-400">No messages yet</p>
          </motion.div>
        ) : (
          messages.map((message, idx) => (
            <motion.div
              key={message._id || message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedId(selectedId === (message._id || message.id) ? null : (message._id || message.id))}
              className={`p-6 rounded-xl border cursor-pointer transition-all ${
                message.isRead
                  ? "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  : "bg-violet-50 dark:bg-violet-900/20 border-violet-300 dark:border-violet-600"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{message.name}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{message.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={async (e) => {
                      e.stopPropagation()
                      try {
                        await toggleMessageRead(message._id || message.id)
                        toast.success(
                          message.isRead ? "Marked as unread." : "Marked as read."
                        )
                      } catch {
                        toast.error("Failed to update message state.")
                      }
                    }}
                    className={`px-2 sm:px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium flex items-center justify-center gap-1 ${
                      message.isRead
                        ? "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                        : "bg-violet-600 text-white"
                    }`}
                  >
                    <span className="sm:hidden flex items-center justify-center">
                      <CheckCircle2 size={16} />
                    </span>
                    <span className="hidden sm:inline">
                      {message.isRead ? "Unread" : "Mark as Read"}
                    </span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async (e) => {
                      e.stopPropagation()
                      try {
                        await deleteMessage(message._id || message.id)
                        toast.success("Message deleted.")
                      } catch {
                        toast.error("Failed to delete message.")
                      }
                    }}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </motion.button>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: selectedId === (message._id || message.id) ? 1 : 0,
                  height: selectedId === (message._id || message.id) ? "auto" : 0,
                }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                  <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{message.message}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{formatDate(message.createdAt || message.timestamp)}</p>
                </div>
              </motion.div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  )
}
