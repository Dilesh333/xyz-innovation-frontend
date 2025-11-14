"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useData } from "../context/DataContext"
import { Send } from "lucide-react"

export default function Contact() {
  const { addMessage } = useData()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      try {
        await addMessage(formData)
        setFormData({ name: "", email: "", message: "" })
        setErrors({})
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 5000)
      } catch (err) {
        setErrors({ submit: "Failed to send message. Please try again." })
      }
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-slate-600 dark:text-slate-400">Have questions? We'd love to hear from you.</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700"
        >
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg"
            >
              ✓ Thank you! Your message has been sent successfully.
            </motion.div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-600 ${
                errors.name ? "border-red-500" : "border-slate-300 dark:border-slate-700"
              }`}
              placeholder="Your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-600 ${
                errors.email ? "border-red-500" : "border-slate-300 dark:border-slate-700"
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className={`w-full px-4 py-2 border rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-600 resize-none ${
                errors.message ? "border-red-500" : "border-slate-300 dark:border-slate-700"
              }`}
              placeholder="Your message here..."
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
          >
            Send Message
            <Send size={18} />
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
