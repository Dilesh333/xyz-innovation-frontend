"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useData } from "../context/DataContext"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function Testimonials() {
  const { testimonials } = useData()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return
    if (isHovered) return

    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 3000)

    return () => clearInterval(id)
  }, [testimonials, isHovered])

  return (
    <section id="testimonials" className="py-20 px-4 bg-sky-50/70 dark:bg-slate-900/40">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">Testimonials</h2>
          <p className="text-slate-600 dark:text-slate-400">What our clients say about working with us</p>
        </motion.div>

        <div
          className="relative flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.2)" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full md:w-[75%] lg:w-[65%] bg-white/90 dark:bg-slate-900 p-10 rounded-3xl shadow-xl border border-slate-200/70 dark:border-slate-700/70 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 shadow-md flex items-center justify-center mb-4 overflow-hidden">
              <span className="text-4xl">{testimonials[currentIndex].avatar}</span>
            </div>
            <div className="mb-4">
              <p className="text-xl font-semibold text-violet-700 dark:text-violet-400">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {testimonials[currentIndex].company}
              </p>
            </div>
            <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-200 max-w-xl mx-auto">
              “{testimonials[currentIndex].message}”
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={goToPrevious}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-slate-800/80 shadow-md rounded-full hover:bg-white dark:hover:bg-slate-800"
          >
            <ChevronLeft size={22} className="text-slate-700 dark:text-slate-200" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            onClick={goToNext}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 dark:bg-slate-800/80 shadow-md rounded-full hover:bg-white dark:hover:bg-slate-800"
          >
            <ChevronRight size={22} className="text-slate-700 dark:text-slate-200" />
          </motion.button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.15 }}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "w-6 bg-violet-600" : "w-2 bg-slate-300 dark:bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
