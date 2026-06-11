import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const brandStoryItems = [
  {
    year: "1998",
    title: "Where It All Began",
    text: "A small family kitchen, a handful of recipes passed down through generations, and a passion for bringing people together around the table.",
  },
  {
    year: "2005",
    title: "Growing the Vision",
    text: "We opened our first doors to the public, welcoming neighbours, strangers, and friends with the same warmth we'd always known at home.",
  },
  {
    year: "2015",
    title: "A New Chapter",
    text: "Renovated, refined, and reinvigorated — we expanded our kitchen and our team, staying true to our roots while embracing bold new flavours.",
  },
  {
    year: "Today",
    title: "Still Cooking with Heart",
    text: "Every dish that leaves our kitchen carries the same love and intention as the very first one. Pull up a chair — there's always room for one more.",
  },
]

function ParallaxHero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center">
      {/* Parallax background */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center scale-110"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Hero content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-amber-400 uppercase tracking-[0.3em] text-sm font-medium mb-4"
        >
          Est. 1998
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Food Made with <span className="text-amber-400">Soul</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-white/80 text-lg md:text-xl mb-10"
        >
          A neighbourhood restaurant rooted in tradition, elevated with love.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-full transition-colors duration-200"
          >
            View Our Menu
          </a>
          <a
            href="#reservations"
            className="px-8 py-3 border border-white/50 hover:border-white text-white font-semibold rounded-full transition-colors duration-200"
          >
            Book a Table
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-white/40" />
      </motion.div>
    </section>
  )
}

function BrandStorySection() {
  return (
    <section className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-amber-400 uppercase tracking-[0.3em] text-sm mb-3">Our Story</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">A Journey Through Flavour</h2>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          <div className="space-y-16">
            {brandStoryItems.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <span className="text-amber-400 text-sm uppercase tracking-widest font-medium">{item.year}</span>
                  <h3 className="text-2xl font-bold text-white mt-1 mb-3">{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.text}</p>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:flex w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-500/20 flex-shrink-0 z-10" />

                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <ParallaxHero />
      <BrandStorySection />
    </main>
  )
}
