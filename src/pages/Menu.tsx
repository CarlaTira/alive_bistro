import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ForkKnife, Wine, Coffee, Cookie } from "@phosphor-icons/react"

type MenuItem = {
  name: string
  description: string
  price: string
  tag?: string
}

type MenuCategory = {
  id: string
  label: string
  icon: React.ReactNode
  items: MenuItem[]
}

const menuData: MenuCategory[] = [
  {
    id: "starters",
    label: "Starters",
    icon: <ForkKnife size={20} />,
    items: [
      { name: "Burrata & Heirloom Tomato", description: "Fresh burrata, heirloom tomatoes, basil oil, sea salt", price: "$14", tag: "Seasonal" },
      { name: "Crispy Calamari", description: "Lemon aioli, smoked paprika, pickled chilli", price: "$13" },
      { name: "Bone Marrow Toast", description: "Sourdough, gremolata, capers, soft herbs", price: "$16", tag: "Chef's Pick" },
      { name: "Soup of the Day", description: "Ask your server for today's selection", price: "$10" },
    ],
  },
  {
    id: "mains",
    label: "Mains",
    icon: <ForkKnife size={20} weight="fill" />,
    items: [
      { name: "Slow-Braised Short Rib", description: "24h braised beef rib, celery root purée, red wine jus", price: "$36", tag: "Signature" },
      { name: "Pan-Seared Sea Bass", description: "Saffron risotto, beurre blanc, micro herbs", price: "$32" },
      { name: "Wild Mushroom Pappardelle", description: "Forest mushrooms, truffle cream, parmesan, chives", price: "$24" },
      { name: "Free-Range Roast Chicken", description: "Half chicken, roasted garlic, jus, seasonal vegetables", price: "$28" },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    icon: <Wine size={20} />,
    items: [
      { name: "House Red", description: "A rotating selection of small-batch reds", price: "$9 / glass" },
      { name: "Natural White", description: "Crisp, low-intervention whites from Europe", price: "$10 / glass" },
      { name: "Spritz of the Week", description: "Ask your server — changes every Friday", price: "$12", tag: "New" },
      { name: "Non-Alcoholic Pairing", description: "Housemade sodas and shrubs", price: "$7" },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: <Cookie size={20} />,
    items: [
      { name: "Warm Chocolate Fondant", description: "Salted caramel, vanilla ice cream", price: "$12", tag: "Must Try" },
      { name: "Lemon Tart", description: "Crisp pastry, Italian meringue, lemon curd", price: "$10" },
      { name: "Cheese Selection", description: "Three artisan cheeses, quince, sourdough crackers", price: "$16" },
    ],
  },
]

const tagColors: Record<string, string> = {
  "Chef's Pick": "bg-amber-500/20 text-amber-400",
  Signature: "bg-amber-500/20 text-amber-400",
  Seasonal: "bg-green-500/20 text-green-400",
  "Must Try": "bg-red-500/20 text-red-400",
  New: "bg-blue-500/20 text-blue-400",
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].id)
  const activeMenu = menuData.find((c) => c.id === activeCategory)!

  return (
    <section id="menu" className="min-h-screen py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-amber-400 uppercase tracking-[0.3em] text-sm mb-3">What We Serve</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Our Menu</h2>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {menuData.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-amber-500 text-black"
                  : "border border-white/20 text-white/60 hover:border-white/50 hover:text-white"
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
            className="space-y-4"
          >
            {activeMenu.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="flex items-start justify-between gap-4 p-5 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/6 hover:border-white/15 transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    {item.tag && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[item.tag] ?? "bg-white/10 text-white/60"}`}>
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                </div>
                <span className="text-amber-400 font-semibold text-sm whitespace-nowrap">{item.price}</span>
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
          className="mt-16 p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 flex items-center gap-4"
        >
          <Coffee size={32} className="text-amber-400 flex-shrink-0" />
          <div>
            <p className="text-white font-semibold">All-day coffee & pastries available</p>
            <p className="text-white/50 text-sm">Single-origin espresso · Flat whites · Seasonal pastries from our in-house bakery</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
