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

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]

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
    <section id="reservations" className="min-h-screen py-24 px-6 bg-[#040804]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-emerald-400 uppercase tracking-[0.3em] text-xs font-semibold mb-3">TE AȘTEPTĂM CU DRAG</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Rezervă o Masă</h2>
          <p className="text-white/60 max-w-md mx-auto font-light text-sm">Asigură-ți locul în oaza noastră de liniște și energie. Îți vom confirma rezervarea în cel mai scurt timp.</p>
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
            <div className="p-6 rounded-2xl border border-white/5 bg-white/2 space-y-5">
              <InfoRow icon={<MapPin size={18} className="text-emerald-400" />} label="Adresă" value="Calea Victoriei 122, București" />
              <InfoRow icon={<Clock size={18} className="text-emerald-400" />} label="Luni - Vineri" value="08:00 – 21:00" />
              <InfoRow icon={<Clock size={18} className="text-emerald-400" />} label="Sâmbătă - Duminică" value="09:00 – 22:00" />
              <InfoRow icon={<Phone size={18} className="text-emerald-400" />} label="Telefon" value="+40 722 000 123" />
            </div>
            <p className="text-white/40 text-xs px-1 leading-relaxed font-light">
              Pentru grupuri mari (8+ persoane) sau organizarea de evenimente private de wellbeing, te rugăm să ne contactezi direct la numărul de telefon. Ne bucurăm să fim gazda voastră!
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
                className="h-full flex flex-col items-center justify-center text-center p-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/5"
              >
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-white text-xl font-bold mb-2">Solicitare Înregistrată!</h3>
                <p className="text-white/60">Mulțumim, {form.name}! Îți vom confirma masa pe e-mail în câteva minute.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm(initialForm) }}
                  className="mt-6 text-sm text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                >
                  Efectuează o altă rezervare
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Numele Tău" name="name" type="text" value={form.name} onChange={handleChange} required placeholder="Popescu Andrei" />
                  <Field label="Adresă Email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="andrei@example.com" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Telefon (opțional)" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="0722 000 123" />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/60 text-sm font-light">Număr de Persoane</label>
                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/60 transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                        <option key={n} value={n} className="bg-[#050905]">{n} {n === 1 ? "oaspete" : "oaspeți"}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Data" name="date" type="date" value={form.date} onChange={handleChange} required />
                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/60 text-sm font-light">Ora Preferată</label>
                    <select
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      required
                      className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/60 transition-colors"
                    >
                      <option value="" disabled className="bg-[#050905]">Alege o oră</option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t} className="bg-[#050905]">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/60 text-sm font-light">Mențiuni Speciale / Alergii (opțional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Alergii alimentare, preferințe pentru masă sau ocazii speciale..."
                    className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/60 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl transition-colors duration-200 mt-2 shadow-lg shadow-emerald-500/10"
                >
                  Trimite Rezervarea
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
      <label className="text-white/60 text-sm font-light">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm placeholder:text-white/20 focus:outline-none focus:border-emerald-500/60 transition-colors"
      />
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div>
        <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5 font-semibold">{label}</div>
        <div className="text-white text-sm font-light">{value}</div>
      </div>
    </div>
  )
}
