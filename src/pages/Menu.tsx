import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ForkKnife, Cookie } from "@phosphor-icons/react"
import { Coffee as LucideCoffee, Leaf, Flame, Beef, Wheat, Nut } from "lucide-react"

type MenuItem = {
  name: string
  description: string
  price: string
  image?: string
  tag?: string
  macros?: {
    calories: number
    protein: string
    carbs: string
    fat: string
  }
}

type MenuCategory = {
  id: string
  label: string
  icon: React.ReactNode
  items: MenuItem[]
}

const menuData: MenuCategory[] = [
  {
    id: "breakfast-soups",
    label: "Breakfast & Supe",
    icon: <ForkKnife size={20} />,
    items: [
      { 
        name: "Avocado Toast cu Ou Poșat", 
        description: "Pâine artizanală cu maia, avocado cremos, ou bio poșat, fulgi de chilli rubinii și semințe active hidratate.", 
        price: "28 RON", 
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80",
        tag: "Firesc",
        macros: { calories: 345, protein: "12g", carbs: "28g", fat: "16g" }
      },
      { 
        name: "Shakshuka Verde cu Legume", 
        description: "Două ouă bio poșate în sos aromat de spanac proaspăt, dovlecel rântălit, mazăre dulce și presărat cu brânză feta fină.", 
        price: "32 RON", 
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
        tag: "Echilibru", 
        macros: { calories: 290, protein: "14g", carbs: "12g", fat: "18g" }
      },
      { 
        name: "Supă Cremă de Linte & Ghimbir", 
        description: "Supă catifelată de linte roșie bio, infuzată cu ghimbir proaspăt energizant, lapte pur de cocos și semințe crocante de dovleac.", 
        price: "24 RON", 
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=80",
        tag: "Wellness Boost",
        macros: { calories: 310, protein: "11g", carbs: "42g", fat: "9g" }
      },
      { 
        name: "Granola Alive de Casă cu Iaurt", 
        description: "Ovăz crocant copt în miere polifloră, mix bogat de nuci pecan, semințe de cânepă și hrișcă activată, servite cu iaurt grecesc fin și fructe de pădure.", 
        price: "26 RON",
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=300&q=80",
        macros: { calories: 380, protein: "15g", carbs: "45g", fat: "12g" }
      },
    ],
  },
  {
    id: "mains-salads",
    label: "Mâncăruri & Salate",
    icon: <Leaf size={20} className="text-brand-green-700" />,
    items: [
      { 
        name: "Golden Turmeric Salmon", 
        description: "File de somon sălbatic la cuptor infuzat cu turmeric activ antiinflamator, servit pe pat de orez negru imperial și sparanghel tânăr la abur.", 
        price: "58 RON", 
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=300&q=80",
        tag: "Signature",
        macros: { calories: 512, protein: "38g", carbs: "35g", fat: "14g" }
      },
      { 
        name: "Alive Buddha Bowl cu Quinoa", 
        description: "Un bol bogat în nutrienți cu quinoa organică, edamame crocante, bucăți cremoase de avocado, cartof dulce copt, năut rumenit la cuptor și dressing fin de tahini-lămâie.", 
        price: "42 RON", 
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
        tag: "Echilibru",
        macros: { calories: 440, protein: "14g", carbs: "52g", fat: "15g" }
      },
      { 
        name: "Pui Marinat cu Piure de Conopidă", 
        description: "Piept de pui crescut la sol marinat în unt bio și cimbru sălbatic, însoțit de un piure cald și aerat de conopidă cu usturoi copt și ierburi aromate.", 
        price: "46 RON",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80",
        macros: { calories: 390, protein: "32g", carbs: "10g", fat: "14g" }
      },
      { 
        name: "Salată Mediteraneană cu Falafel", 
        description: "Mix crocant de frunze verzi, falafel aromat pregătit la cuptor (fără ulei încins), castraveți, roșii cherry, măsline Kalamata și iaurt ecologic cremos cu mentă.", 
        price: "38 RON",
        image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=300&q=80",
        macros: { calories: 350, protein: "11g", carbs: "38g", fat: "12g" }
      },
    ],
  },
  {
    id: "desserts",
    label: "Deserturi fără Zahăr",
    icon: <Cookie size={20} />,
    items: [
      { 
        name: "Răsfăț cu Ciocolată Raw-Vegan", 
        description: "Tort fin preparat rece din cacao organică criollo crudă, curmale medjool, sâmburi de macadamia crocanți și ulei presat la rece de cocos.", 
        price: "26 RON", 
        image: "https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&w=300&q=80",
        tag: "Must Try",
        macros: { calories: 280, protein: "50% mai puțin zahăr", carbs: "22g", fat: "11g" }
      },
      { 
        name: "Tartă Fresh de Lămâie și Caju", 
        description: "Crustă crocantă din migdale și curmale, acoperită cu o cremă mătăsoasă de caju, suc de lămâie stors la rece și coajă de lime bio.", 
        price: "24 RON",
        image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=300&q=80",
        macros: { calories: 245, protein: "5g", carbs: "19g", fat: "10g" }
      },
      { 
        name: "Chia Pudding cu Mango", 
        description: "Semințe de chia ecologice hidratate în lapte dens de migdale de casă, acoperite cu piure pur catifelat de mango proaspăt și cardamom verde.", 
        price: "22 RON",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
        macros: { calories: 195, protein: "4g", carbs: "24g", fat: "6g" }
      },
    ],
  },
  {
    id: "drinks",
    label: "Băuturi Funcționale & Cafea",
    icon: <LucideCoffee size={20} className="text-brand-green-700" />,
    items: [
      { 
        name: "Flat White de Origine", 
        description: "Espresso dublu preparat meticulos din boabe de origine unică selecționate (Etiopia/Columbia), servit cu lapte cremos organic de ovăz.", 
        price: "16 RON",
        image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=300&q=80",
        macros: { calories: 110, protein: "3g", carbs: "12g", fat: "2g" }
      },
      { 
        name: "Matcha Collaged Latte", 
        description: "Pudră ceremonială de ceai verde Matcha adusă direct din Uji (Japonia), combinată cu colagen marin hidrolizat premium și lapte cald de migdale.", 
        price: "22 RON", 
        image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=300&q=80",
        tag: "Beauty Tonic",
        macros: { calories: 140, protein: "10g", carbs: "15g", fat: "3g" }
      },
      { 
        name: "Recovery Green Smoothie", 
        description: "Blend intens din spanac proaspăt baby, spirulină bio, banană, unt organic de arahide, lapte cald de cocos, mix de magneziu natural și proteină densă.", 
        price: "24 RON", 
        image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=300&q=80",
        tag: "Recovery",
        macros: { calories: 290, protein: "15g", carbs: "26g", fat: "8g" }
      },
      { 
        name: "Active Performance Shake", 
        description: "Un mix de energie curată: shot concentrat de espresso, cacao organică, pudră de proteină vegană, adaptogeni naturali (Maca și Ashwagandha) și lapte cald de migdale.", 
        price: "26 RON", 
        image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80",
        tag: "Energy",
        macros: { calories: 270, protein: "18g", carbs: "22g", fat: "6g" }
      },
    ],
  },
]

const tagColors: Record<string, string> = {
  "Wellness Boost": "bg-brand-green-100 text-brand-green-800 font-bold",
  Signature: "bg-brand-green-700 text-brand-cream-50 font-bold",
  Echilibru: "bg-brand-green-100 text-brand-green-800 font-bold",
  Firesc: "bg-brand-green-100 text-brand-green-800 font-bold",
  "Must Try": "bg-red-100 text-red-800 font-bold",
  "Beauty Tonic": "bg-pink-100 text-pink-800 font-bold",
  Recovery: "bg-blue-100 text-blue-800 font-bold",
  Energy: "bg-amber-100 text-amber-800 font-bold",
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id)
  const activeMenu = menuData.find((c) => c.id === activeCategory)!

  return (
    <section id="menu" className="min-h-screen py-24 px-6 bg-brand-cream-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-brand-green-700 uppercase tracking-[0.3em] text-xs font-bold mb-3 font-sans">CONSTRUIT PENTRU ECHILIBRU & ENERGIE</p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-brand-green-700 tracking-tight font-serif lowercase">Meniul Nostru<span className="text-brand-green-500 font-sans">.</span></h2>
          <p className="text-brand-dark/80 text-sm mt-3 max-w-xl mx-auto font-light leading-relaxed font-sans">
            Preparate nutritive, delicioase și complet funcționale, infuzate cu super-alimente și adaptogeni benefici.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {menuData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 font-sans ${
                activeCategory === cat.id
                  ? "bg-brand-green-700 text-brand-cream-50 shadow-md shadow-brand-green-700/15 scale-102"
                  : "border border-brand-green-700/10 text-brand-green-700/80 bg-brand-cream-50/50 hover:border-brand-green-700/30 hover:text-brand-green-700 hover:bg-brand-cream-200/50"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {activeMenu.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="flex items-start gap-4 p-4 md:p-5 rounded-2xl border border-brand-green-700/10 bg-brand-cream-50 hover:bg-white hover:shadow-md hover:border-brand-green-700/25 transition-all duration-300 group"
              >
                {item.image && (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-brand-green-700/10 group-hover:border-brand-green-700/25 transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-brand-dark font-bold group-hover:text-brand-green-700 transition-colors text-sm sm:text-base font-serif lowercase">{item.name}</h3>
                      {item.tag && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${tagColors[item.tag] ?? "bg-brand-cream-200 text-brand-dark/60"}`}>
                          {item.tag}
                        </span>
                      )}
                    </div>
                    <span className="text-brand-green-700 font-bold text-xs sm:text-sm whitespace-nowrap">{item.price}</span>
                  </div>

                  {/* Macronutrients & Calories badge indicator directly between title and description */}
                  {item.macros && (
                    <div className="flex flex-wrap gap-2 mb-2.5 text-xs sm:text-sm">
                      <span className="px-2.5 py-1 rounded bg-brand-green-700/10 text-brand-green-700 font-bold flex items-center gap-1.5 border border-brand-green-700/10">
                        <Flame className="w-3.5 h-3.5" /> {item.macros.calories} kcal
                      </span>
                      <span className="px-2.5 py-1 rounded bg-brand-cream-200/50 text-brand-dark/80 font-medium flex items-center gap-1.5 border border-brand-green-700/5" title="Proteine">
                        <Beef className="w-3.5 h-3.5 text-red-700/80" /> {item.macros.protein} Proteine
                      </span>
                      <span className="px-2.5 py-1 rounded bg-brand-cream-200/50 text-brand-dark/80 font-medium flex items-center gap-1.5 border border-brand-green-700/5" title="Carbohidrați">
                        <Wheat className="w-3.5 h-3.5 text-amber-700/80" /> {item.macros.carbs} Carbohidrați
                      </span>
                      <span className="px-2.5 py-1 rounded bg-brand-cream-200/50 text-brand-dark/80 font-medium flex items-center gap-1.5 border border-brand-green-700/5" title="Grăsimi Sănătoase">
                        <Nut className="w-3.5 h-3.5 text-amber-700" /> {item.macros.fat} Grăsimi
                      </span>
                    </div>
                  )}

                  <p className="text-brand-dark/60 text-xs sm:text-sm leading-relaxed font-light line-clamp-3 font-sans">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Coffee section teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-6 rounded-2xl border border-brand-green-700/15 bg-brand-cream-200/50 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left"
        >
          <div className="w-12 h-12 rounded-full bg-brand-green-700/10 flex items-center justify-center flex-shrink-0 text-brand-green-700">
            <LucideCoffee size={24} />
          </div>
          <div>
            <p className="text-brand-green-700 font-bold text-base font-serif lowercase">Toate cafelele noastre sunt de specialitate</p>
            <p className="text-brand-dark/70 text-xs md:text-sm font-light mt-1 font-sans">Oferim espresso single-origin în fiecare zi, lapte bio vegetal la alegere gratuit și o selecție superbă de deserturi raw-vegane gătite zilnic.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
