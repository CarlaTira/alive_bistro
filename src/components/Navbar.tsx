import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { List, X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#community", label: "Community" },
  { href: "#reservations", label: "Reservations" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/8" : "bg-transparent"
        )}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#home" className="text-white font-bold text-lg tracking-tight">
            <span className="text-amber-400">Casa</span>Mia
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#reservations"
              className="hidden md:inline-flex px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-full transition-colors duration-200"
            >
              Book a Table
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-white p-1"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-white text-2xl font-bold hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservations"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-full transition-colors"
            >
              Book a Table
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
