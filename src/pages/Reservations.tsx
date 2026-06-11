import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Phone } from "lucide-react"

type FormState = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  notes: string
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  notes: "",
}

const timeSlots = ["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]

export default function Reservations() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: wire up to email API (Resend) or backend
    setSubmitted(true)
  }

  return (
    <section id="reservations" className="min-h-screen py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-amber-400 uppercase tracking-[0.3em] text-sm mb-3">Come Dine With Us</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Book a Table</h2>
          <p className="text-white/50 max-w-md mx-auto">Reserve your spot — we'll confirm within a few hours.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-2xl border border-white/8 bg-white/3 space-y-5">
              <InfoRow icon={<MapPin size={18} className="text-amber-400" />} label="Address" value="42 Heartwood Lane, Old Town" />
              <InfoRow icon={<Clock size={18} className="text-amber-400" />} label="Lunch" value="Mon–Fri  12:00 – 15:00" />
              <InfoRow icon={<Clock size={18} className="text-amber-400" />} label="Dinner" value="Daily  18:00 – 22:30" />
              <InfoRow icon={<Phone size={18} className="text-amber-400" />} label="Phone" value="+1 (555) 000-1234" />
            </div>
            <p className="text-white/40 text-sm px-1 leading-relaxed">
              For large groups (8+) or private events, please call us directly. We love hosting celebrations!
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl border border-amber-500/30 bg-amber-500/5"
              >
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-white text-xl font-bold mb-2">Request Received!</h3>
                <p className="text-white/60">Thanks, {form.name}! We'll confirm your table by email shortly.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm(initialForm) }}
                  className="mt-6 text-sm text-amber-400 hover:text-amber-300 underline underline-offset-4"
                >
                  Make another reservation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Your Name" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Jane Smith" />
                  <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 555 000 0000" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/60 text-sm">Guests</label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/12 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500/60 transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <option key={n} value={n} className="bg-[#1a1a1a]">{n} {n === 1 ? "guest" : "guests"}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/60 text-sm">Preferred Time</label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border border-white/12 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500/60 transition-colors"
                    >
                      <option value="" disabled className="bg-[#1a1a1a]">Select a time</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t} className="bg-[#1a1a1a]">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-sm">Special Requests (optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Allergies, celebrations, seating preference…"
                    className="bg-white/5 border border-white/12 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500/60 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl transition-colors duration-200"
                >
                  Request Reservation
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label, name, type, value, onChange, required, placeholder,
}: {
  label: string
  name: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/60 text-sm">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="bg-white/5 border border-white/12 text-white rounded-xl px-4 py-3 text-sm placeholder:text-white/25 focus:outline-none focus:border-amber-500/60 transition-colors"
      />
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{label}</div>
        <div className="text-white text-sm">{value}</div>
      </div>
    </div>
  )
}
