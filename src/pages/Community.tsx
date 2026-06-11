import { motion } from "framer-motion"
import { InstagramLogo, FacebookLogo, TiktokLogo } from "@phosphor-icons/react"

const socialLinks = [
  {
    name: "Instagram",
    handle: "@ourrestaurant",
    description: "Daily specials, behind-the-scenes kitchen moments, and food photography.",
    icon: <InstagramLogo size={28} />,
    href: "https://instagram.com",
    color: "hover:border-pink-500/50 hover:bg-pink-500/5",
    iconColor: "text-pink-400",
  },
  {
    name: "Facebook",
    handle: "Our Restaurant",
    description: "Events, community updates, and special occasion menus.",
    icon: <FacebookLogo size={28} />,
    href: "https://facebook.com",
    color: "hover:border-blue-500/50 hover:bg-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    name: "TikTok",
    handle: "@ourrestaurant",
    description: "Recipe videos, staff picks, and a peek into what makes us tick.",
    icon: <TiktokLogo size={28} />,
    href: "https://tiktok.com",
    color: "hover:border-white/50 hover:bg-white/5",
    iconColor: "text-white",
  },
]

const highlights = [
  { label: "Happy guests served", value: "12,000+" },
  { label: "Years in business", value: "25+" },
  { label: "Community events hosted", value: "80+" },
  { label: "5-star reviews", value: "600+" },
]

export default function Community() {
  return (
    <section id="community" className="min-h-screen py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-amber-400 uppercase tracking-[0.3em] text-sm mb-3">Join Us Online</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Community</h2>
          <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
            Follow along for daily specials, events, and the stories behind every plate. We love hearing from you.
          </p>
        </motion.div>

        {/* Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className={`block p-6 rounded-2xl border border-white/10 bg-white/3 transition-all duration-300 ${social.color}`}
            >
              <div className={`mb-4 ${social.iconColor}`}>{social.icon}</div>
              <h3 className="text-white font-bold text-lg">{social.name}</h3>
              <p className="text-amber-400 text-sm mb-3">{social.handle}</p>
              <p className="text-white/50 text-sm leading-relaxed">{social.description}</p>
            </motion.a>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl border border-white/8 bg-white/3"
        >
          {highlights.map((h) => (
            <div key={h.label} className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">{h.value}</div>
              <div className="text-white/50 text-sm">{h.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
