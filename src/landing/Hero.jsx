"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
}

export default function Hero() {
  const words = ["Smart", "Bold", "Flexible", "Secure"]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, 2200)

    return () => clearInterval(interval)
  }, [words.length])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-8 px-4">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-200 dark:bg-violet-900/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-200 dark:bg-pink-900/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-block px-4 py-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 rounded-full text-sm font-medium">
            ✨ Welcome to the Future
          </span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Innovation
          <span className="inline-block ml-2 overflow-hidden align-middle w-[6ch] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[currentIndex]}
                className="gradient-text inline-block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {" "}
                {words[currentIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto"
        >
          Transform your business with cutting-edge technology solutions designed for the modern era. Experience
          innovation like never before.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-violet-600 to-pink-600 text-white rounded-lg font-medium flex items-center gap-2 hover:shadow-lg transition-shadow"
          >
            Get Started
            <ArrowRight size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-violet-600 dark:border-violet-400 text-violet-600 dark:text-violet-400 rounded-lg font-medium hover:bg-violet-50 dark:hover:bg-violet-900/10"
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { number: "10K+", label: "Customers" },
            { number: "99.9%", label: "Uptime" },
            { number: "24/7", label: "Support" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
              className="glass-effect p-6 rounded-xl"
            >
              <div className="text-2xl font-bold gradient-text">{stat.number}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
