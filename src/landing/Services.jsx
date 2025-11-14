"use client"

import { motion } from "framer-motion"
import { useData } from "../context/DataContext"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function Services() {
  const { services } = useData()

  return (
    <section id="services" className="py-20 px-4 bg-slate-50 dark:bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive solutions designed to accelerate your business growth and innovation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.length === 0 &&
            [1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 animate-pulse"
              >
                <div className="mb-4 inline-flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded mb-1" />
                <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
              </div>
            ))}

          {services.length > 0 &&
            services.map((service) => (
            <motion.div
              key={service._id || service.id}
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.2)" }}
              className="group bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-violet-400 transition-colors"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="mb-4 inline-flex items-center gap-3"
              >
                {service.emoji && <span className="text-5xl">{service.emoji}</span>}
                {service.imageUrl && (
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                )}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400">
                {service.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
