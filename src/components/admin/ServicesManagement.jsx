"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useData } from "../../context/DataContext"
import { Plus, Edit2, Trash2, X } from "lucide-react"
import toast from "react-hot-toast"

export default function ServicesManagement() {
  const { services, addService, updateService, deleteService } = useData()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({ title: "", description: "", emoji: "", imageUrl: "" })
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.title || !formData.description) {
      alert("Please fill all fields")
      return
    }
    try {
      setSaving(true)
      if (editingId) {
        await updateService(editingId, formData)
        toast.success(`"${formData.title}" has been updated.`)
      } else {
        const created = await addService(formData)
        toast.success(`"${created.title || formData.title}" has been added.`)
      }

      setFormData({ title: "", description: "", emoji: "", imageUrl: "" })
      setShowForm(false)
      setEditingId(null)
    } catch (err) {
      toast.error("Failed to save service. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (service) => {
    const id = service._id || service.id
    const title = service.title || "Service"
    try {
      await deleteService(id)
      toast.success(`"${title}" has been deleted.`)
    } catch (err) {
      toast.error("Failed to delete service. Please try again.")
    }
  }

  const handleEdit = (service) => {
    setFormData({
      title: service.title || "",
      description: service.description || "",
      emoji: service.emoji || "",
      imageUrl: service.imageUrl || "",
    })
    setEditingId(service._id || service.id)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({ title: "", description: "", emoji: "", imageUrl: "" })
  }

  return (
    <div className="p-6 lg:p-8">
      <motion.div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Services Management</h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Manage and update your services</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="self-end sm:self-auto inline-flex items-center justify-center w-10 lg:w-auto h-10 bg-violet-600 text-white rounded-full lg:rounded-lg shadow-md hover:bg-violet-700 px-0 lg:px-4 gap-0 lg:gap-2 text-sm"
            aria-label="Add service"
          >
            <Plus size={18} />
            <span className="hidden lg:inline">Add Service</span>
          </motion.button>
        </div>
      </motion.div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{editingId ? "Edit Service" : "Add New Service"}</h2>
            <button onClick={handleClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
                placeholder="Service title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-600 resize-none"
                placeholder="Service description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Emoji</label>
              <input
                type="text"
                value={formData.emoji}
                onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
                placeholder="☁️"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700"
              >
                {editingId ? "Update Service" : "Add Service"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-2 border border-slate-300 dark:border-slate-600 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {saving &&
          [1, 2].map((i) => (
            <div
              key={`saving-${i}`}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 animate-pulse"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-md bg-slate-200 dark:bg-slate-700" />
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
                  <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
                </div>
              </div>
              <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
              <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded mb-1" />
              <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
          ))}
        {services.map((service, idx) => (
          <motion.div
            key={service._id || service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {service.emoji && <span className="text-4xl">{service.emoji}</span>}
                {service.imageUrl && (
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-10 h-10 rounded-md object-cover border border-slate-300 dark:border-slate-600"
                  />
                )}
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(service)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <Edit2 size={18} className="text-blue-600" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(service)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                >
                  <Trash2 size={18} className="text-red-600" />
                </motion.button>
              </div>
            </div>
            <h3 className="font-semibold mb-2">{service.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {services.length === 0 && !showForm && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400 mb-4">No services yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700"
          >
            Create your first service
          </button>
        </motion.div>
      )}
    </div>
  )
}
