"use client"

import { createContext, useState, useContext, useEffect } from "react"

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error("useData must be used within DataProvider")
  }
  return context
}

const defaultTestimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    company: "TechCorp Inc",
    message: "XYZ Innovations transformed our workflow. We saw a 40% productivity increase in just 3 months!",
    avatar: "👩‍💼",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    company: "Digital Solutions",
    message: "The support team is incredible. They helped us migrate seamlessly without any downtime.",
    avatar: "👨‍💻",
  },
  {
    id: 3,
    name: "Emma Thompson",
    company: "Global Ventures",
    message: "Best investment we made. The ROI speaks for itself. Highly recommended!",
    avatar: "👩‍🔬",
  },
  {
    id: 4,
    name: "Ronne Galle",
    company: "Project Manager",
    message: "Their team delivered our platform on time with excellent communication at every stage of the project.",
    avatar: "🧑🏾‍💼",
  },
  {
    id: 5,
    name: "Hanna Lisem",
    company: "Product Lead",
    message: "Clean architecture, modern UI, and rock-solid performance. It feels like we added a full in-house tech squad.",
    avatar: "👩‍💻",
  },
  {
    id: 6,
    name: "Missy Limana",
    company: "Engineer",
    message: "They quickly understood our requirements and turned complex ideas into intuitive, user-friendly solutions.",
    avatar: "👩‍🔧",
  },
  {
    id: 7,
    name: "David Klein",
    company: "CTO, FinEdge",
    message: "From infrastructure to delivery pipelines, their expertise helped us scale confidently without downtime.",
    avatar: "👨‍💼",
  },
]

export function DataProvider({ children }) {
  const [services, setServices] = useState([])
  const [messages, setMessages] = useState([])
  const [testimonials] = useState(defaultTestimonials)
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return null
    return localStorage.getItem("token") || null
  })
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!(typeof window !== "undefined" && localStorage.getItem("token")))

  const API_BASE = import.meta.env.VITE_API_BASE || "/api"
  const authHeader = () => (token ? { Authorization: `Bearer ${token}` } : {})

  useEffect(() => {
    fetch(`${API_BASE}/services`)
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setServices(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!token) return
    fetch(`${API_BASE}/messages`, { headers: { ...authHeader() } })
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setMessages(data))
      .catch(() => {})
  }, [token])

  const addService = async (service) => {
    const res = await fetch(`${API_BASE}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(service),
    })
    if (!res.ok) throw new Error("Failed to create service")
    const created = await res.json()
    setServices([created, ...services])
    return created
  }

  const updateService = async (id, updatedService) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...authHeader() },
      body: JSON.stringify(updatedService),
    })
    if (!res.ok) throw new Error("Failed to update service")
    const updated = await res.json()
    setServices(services.map((s) => (s._id === updated._id ? updated : s)))
  }

  const deleteService = async (id) => {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: "DELETE",
      headers: { ...authHeader() },
    })
    if (!res.ok) throw new Error("Failed to delete service")
    setServices(services.filter((s) => (s._id || s.id) !== id))
  }

  const addMessage = async (payload) => {
    const res = await fetch(`${API_BASE}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error("Failed to send message")
    const created = await res.json()
    setMessages([created, ...messages])
    return created
  }

  const refreshMessages = async () => {
    if (!token) return
    const res = await fetch(`${API_BASE}/messages`, { headers: { ...authHeader() } })
    if (!res.ok) throw new Error("Failed to fetch messages")
    const list = await res.json()
    if (Array.isArray(list)) setMessages(list)
  }

  const toggleMessageRead = async (id) => {
    const res = await fetch(`${API_BASE}/messages/${id}/toggle`, {
      method: "PATCH",
      headers: { ...authHeader() },
    })
    if (!res.ok) throw new Error("Failed to toggle message")
    const updated = await res.json()
    setMessages(messages.map((m) => ((m._id || m.id) === id ? updated : m)))
  }

  const deleteMessage = async (id) => {
    const res = await fetch(`${API_BASE}/messages/${id}`, {
      method: "DELETE",
      headers: { ...authHeader() },
    })
    if (!res.ok) throw new Error("Failed to delete message")
    setMessages(messages.filter((m) => (m._id || m.id) !== id))
  }

  const login = async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) return false
    const data = await res.json()
    setToken(data.token)
    setIsLoggedIn(true)
    localStorage.setItem("token", data.token)
    try {
      const r = await fetch(`${API_BASE}/messages`, { headers: { ...authHeader(), Authorization: `Bearer ${data.token}` } })
      const list = await r.json()
      if (Array.isArray(list)) setMessages(list)
    } catch {}
    return true
  }

  const logout = () => {
    setIsLoggedIn(false)
    setToken(null)
    localStorage.removeItem("token")
  }

  return (
    <DataContext.Provider
      value={{
        services,
        messages,
        testimonials,
        isLoggedIn,
        addService,
        updateService,
        deleteService,
        addMessage,
        refreshMessages,
        toggleMessageRead,
        deleteMessage,
        login,
        logout,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
