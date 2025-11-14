"use client"

import { useTheme } from "../context/ThemeContext"
import Navbar from "../landing/Navbar"
import Hero from "../landing/Hero"
import Services from "../landing/Services"
import Testimonials from "../landing/Testimonials"
import Contact from "../landing/Contact"
import Footer from "../landing/Footer"

export default function LandingPage() {
  const { isDark } = useTheme()

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: isDark ? "#0f172a" : "#ffffff",
        color: isDark ? "#f1f5f9" : "#0f172a",
      }}
    >
      <Navbar />

      <main className="pt-20">
        <Hero />
        <Services />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
