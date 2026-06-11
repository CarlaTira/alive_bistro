import { InstagramLogo, FacebookLogo, TiktokLogo } from "@phosphor-icons/react"

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/8 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-white font-bold text-xl mb-1">
              <span className="text-amber-400">Casa</span>Mia
            </div>
            <p className="text-white/40 text-sm">42 Heartwood Lane, Old Town</p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#menu" className="hover:text-white transition-colors">Menu</a>
            <a href="#reservations" className="hover:text-white transition-colors">Reservations</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
          </div>

          {/* Socials */}
          <div className="flex gap-4 text-white/50">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors" aria-label="Instagram">
              <InstagramLogo size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" aria-label="Facebook">
              <FacebookLogo size={20} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="TikTok">
              <TiktokLogo size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 text-center text-white/25 text-xs">
          © {new Date().getFullYear()} CasaMia. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
