import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { ForkKnife, Cookie, Coffee, Egg, Wine, TeaBag, Drop, Carrot } from "@phosphor-icons/react"
import { Coffee as LucideCoffee, Leaf, Flame, Beef, Wheat, Nut, X, Plus, Info, ChevronLeft, ChevronRight } from "lucide-react"

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

type MenuGroup = {
  id: "food" | "drinks"
  label: string
  icon: React.ReactNode
  categories: MenuCategory[]
}

const menuData: MenuGroup[] = [
  {
    id: "food",
    label: "Mâncare",
    icon: <ForkKnife size={20} />,
    categories: [
      {
        id: "breakfast-soups",
        label: "Mic Dejun & Supe",
        icon: <Egg size={18} />,
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
    ],
  },
  {
    id: "drinks",
    label: "Băuturi",
    icon: <Coffee size={20} />,
    categories: [
      {
        id: "coffee-functional",
        label: "Cafea & Funcționale",
        icon: <LucideCoffee size={18} className="text-brand-green-700" />,
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
      {
        id: "teas",
        label: "Ceaiuri & Infuzii",
        icon: <TeaBag size={18} />,
        items: [
          {
            name: "Ceai Verde Sencha",
            description: "Frunze japoneze de sencha infuzate la temperatură blândă, cu note proaspete de iarbă verde și un finish delicat umami.",
            price: "14 RON",
            image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=300&q=80",
            macros: { calories: 2, protein: "0g", carbs: "0g", fat: "0g" }
          },
          {
            name: "Infuzie Mușețel & Lavandă",
            description: "Amestec calmant de flori de mușețel bio și lavandă de Provence, perfect pentru momente de relaxare.",
            price: "14 RON",
            image: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=300&q=80",
            tag: "Relaxare",
            macros: { calories: 3, protein: "0g", carbs: "1g", fat: "0g" }
          },
          {
            name: "Chai Latte Picant",
            description: "Ceai negru Assam fiert lent cu scorțișoară, cardamom și ghimbir, completat cu lapte cremos spumat de ovăz.",
            price: "18 RON",
            image: "https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?auto=format&fit=crop&w=300&q=80",
            macros: { calories: 160, protein: "4g", carbs: "24g", fat: "4g" }
          },
          {
            name: "Ceai de Ghimbir & Lămâie",
            description: "Infuzie energizantă din ghimbir proaspăt ras, lămâie stoarsă la rece și un strop de miere polifloră.",
            price: "15 RON",
            image: "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=300&q=80",
            tag: "Wellness Boost",
            macros: { calories: 45, protein: "0g", carbs: "11g", fat: "0g" }
          },
        ],
      },
      {
        id: "soft-drinks",
        label: "Răcoritoare",
        icon: <Drop size={18} />,
        items: [
          {
            name: "Kombucha de Casă",
            description: "Ceai fermentat artizanal, bogat în probiotice naturale, cu un finish efervescent de fructe de pădure.",
            price: "16 RON",
            image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&w=300&q=80",
            tag: "Probiotic",
            macros: { calories: 30, protein: "0g", carbs: "7g", fat: "0g" }
          },
          {
            name: "Limonadă cu Mentă",
            description: "Lămâi proaspăt stoarse, sirop natural de agave și mentă pisată, servită cu gheață din belșug.",
            price: "14 RON",
            image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?auto=format&fit=crop&w=300&q=80",
            macros: { calories: 90, protein: "0g", carbs: "22g", fat: "0g" }
          },
          {
            name: "Apă cu Castravete & Lime",
            description: "Apă minerală naturală infuzată cu felii de castravete crocant și lime proaspăt, perfect răcoritoare.",
            price: "12 RON",
            image: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?auto=format&fit=crop&w=300&q=80",
            tag: "Hidratare",
            macros: { calories: 5, protein: "0g", carbs: "1g", fat: "0g" }
          },
          {
            name: "Soda Artizanală de Soc",
            description: "Sirop de flori de soc cules manual, completat cu apă minerală pétillante și o felie de lămâie.",
            price: "14 RON",
            image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=300&q=80",
            macros: { calories: 70, protein: "0g", carbs: "17g", fat: "0g" }
          },
        ],
      },
      {
        id: "non-alcoholic",
        label: "Mocktails & Sucuri",
        icon: <Carrot size={18} />,
        items: [
          {
            name: "Suc Proaspăt de Portocale",
            description: "Portocale presate la rece în fața ta, 100% natural, fără adaos de zahăr sau conservanți.",
            price: "16 RON",
            image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=300&q=80",
            macros: { calories: 110, protein: "2g", carbs: "26g", fat: "0g" }
          },
          {
            name: "Green Detox Juice",
            description: "Țelină, măr verde, castravete, spanac proaspăt și un strop de ghimbir, presate la rece.",
            price: "18 RON",
            image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=300&q=80",
            tag: "Detox",
            macros: { calories: 95, protein: "2g", carbs: "21g", fat: "0g" }
          },
          {
            name: "Virgin Mojito",
            description: "Lime proaspăt, mentă pisată, sirop de trestie și sodă efervescentă, un clasic răcoritor fără alcool.",
            price: "18 RON",
            image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=300&q=80",
            macros: { calories: 120, protein: "0g", carbs: "29g", fat: "0g" }
          },
          {
            name: "Sunset Mocktail",
            description: "Piure de mango, suc de citrice proaspete, rozmarin și apă tonică, un cocktail vibrant fără alcool.",
            price: "20 RON",
            image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=300&q=80",
            tag: "Must Try",
            macros: { calories: 140, protein: "1g", carbs: "33g", fat: "0g" }
          },
        ],
      },
      {
        id: "alcoholic",
        label: "Vinuri & Bere",
        icon: <Wine size={18} />,
        items: [
          {
            name: "Vin Natural Alb (pahar)",
            description: "Selecție de vin alb natural, biodinamic, cu aciditate vie și note florale delicate (150ml).",
            price: "28 RON",
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80",
            macros: { calories: 120, protein: "0g", carbs: "4g", fat: "0g" }
          },
          {
            name: "Vin Roșu Biodinamic (pahar)",
            description: "Vin roșu cu fermentație spontană, tanini fini și aromă intensă de fructe de pădure (150ml).",
            price: "30 RON",
            image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&w=300&q=80",
            macros: { calories: 125, protein: "0g", carbs: "4g", fat: "0g" }
          },
          {
            name: "Bere Artizanală IPA",
            description: "Bere artizanală locală, hamei aromat și o amăreală echilibrată, nefiltrată (330ml).",
            price: "22 RON",
            image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=300&q=80",
            tag: "Craft",
            macros: { calories: 210, protein: "2g", carbs: "18g", fat: "0g" }
          },
          {
            name: "Aperol Spritz",
            description: "Aperol, prosecco rece și un strop de sodă, garnisit cu o felie generoasă de portocală.",
            price: "26 RON",
            image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=300&q=80",
            macros: { calories: 180, protein: "0g", carbs: "22g", fat: "0g" }
          },
          {
            name: "Mimosa de Brunch",
            description: "Prosecco rece și suc proaspăt de portocale stoarse, perfect pentru un brunch lejer de weekend.",
            price: "24 RON",
            image: "https://images.unsplash.com/photo-1541557435984-1c79685a082b?auto=format&fit=crop&w=300&q=80",
            tag: "Brunch",
            macros: { calories: 130, protein: "1g", carbs: "14g", fat: "0g" }
          },
        ],
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
  Detox: "bg-brand-green-100 text-brand-green-800 font-bold",
  Relaxare: "bg-purple-100 text-purple-800 font-bold",
  Probiotic: "bg-teal-100 text-teal-800 font-bold",
  Hidratare: "bg-blue-100 text-blue-800 font-bold",
  Craft: "bg-amber-100 text-amber-800 font-bold",
  Brunch: "bg-orange-100 text-orange-800 font-bold",
}

function CategoryBar({
  categories,
  activeCategory,
  onSelect,
  compact,
}: {
  categories: MenuCategory[]
  activeCategory: string
  onSelect: (id: string) => void
  compact: boolean
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft] = useState(false)
  const [canRight, setCanRight] = useState(false)

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanLeft(el.scrollLeft > 4)
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener("resize", updateArrows)
    return () => window.removeEventListener("resize", updateArrows)
  }, [updateArrows, categories])

  const scrollByAmount = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" })
  }

  return (
    <div className="relative w-full mb-10 bg-brand-cream-200/60 border-y border-brand-green-700/10 shadow-inner shadow-brand-green-700/5">
      <div
        ref={scrollRef}
        onScroll={updateArrows}
        className={`flex gap-2.5 overflow-x-auto px-6 md:px-10 scroll-pl-6 md:scroll-pl-10 scroll-pr-6 md:scroll-pr-10 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden transition-[padding] duration-300 ease-out ${compact ? "py-1.5" : "py-3"}`}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={(e) => {
              onSelect(cat.id)
              e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap flex-shrink-0 snap-start transition-all duration-200 font-sans ${
              activeCategory === cat.id
                ? "bg-brand-green-700 text-brand-cream-50 shadow-md shadow-brand-green-700/15"
                : "border border-brand-green-700/10 text-brand-green-700/80 bg-brand-cream-50/70 hover:border-brand-green-700/30 hover:text-brand-green-700 hover:bg-brand-cream-50"
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Left fade + arrow: shown when there are hidden items to the left */}
      <AnimatePresence>
        {canLeft && (
          <motion.button
            type="button"
            onClick={() => scrollByAmount(-1)}
            aria-label="Derulează la stânga"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-y-0 left-0 flex items-center pl-3 pr-10 bg-gradient-to-r from-brand-cream-200 via-brand-cream-200/90 to-transparent"
          >
            <span className="w-9 h-9 rounded-full bg-brand-cream-50 border border-brand-green-700/15 shadow-sm flex items-center justify-center text-brand-green-700">
              <ChevronLeft className="w-4 h-4" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Right fade + arrow: shown when there are hidden items to the right */}
      <AnimatePresence>
        {canRight && (
          <motion.button
            type="button"
            onClick={() => scrollByAmount(1)}
            aria-label="Derulează la dreapta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-y-0 right-0 flex items-center justify-end pr-3 pl-10 bg-gradient-to-l from-brand-cream-200 via-brand-cream-200/90 to-transparent"
          >
            <span className="w-9 h-9 rounded-full bg-brand-cream-50 border border-brand-green-700/15 shadow-sm flex items-center justify-center text-brand-green-700">
              <ChevronRight className="w-4 h-4" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Menu() {
  const [activeGroup, setActiveGroup] = useState<MenuGroup["id"]>("food")
  const [activeCategory, setActiveCategory] = useState(menuData[0].categories[0].id)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  // Whether the sticky menu nav has collapsed into its compact state.
  // Driven by a simple scroll threshold (with hysteresis) instead of a per-frame value so the
  // transition is animated smoothly by CSS rather than re-rendering on every scroll frame.
  const navSentinelRef = useRef<HTMLDivElement>(null)
  const stickyNavRef = useRef<HTMLDivElement>(null)
  const listAnchorRef = useRef<HTMLDivElement>(null)
  const [navCompact, setNavCompact] = useState(false)

  useEffect(() => {
    const NAV_OFFSET = 64 // sticky top offset — tucks the bar flush beneath the fixed header
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = navSentinelRef.current
        if (!el) return
        const top = el.getBoundingClientRect().top
        // Hysteresis: collapse a bit after the stick point, expand a bit before it,
        // so tiny scroll jitters near the threshold don't cause flickering.
        setNavCompact((prev) => (prev ? top < NAV_OFFSET + 24 : top < NAV_OFFSET - 8))
      })
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const activeGroupObj = menuData.find((g) => g.id === activeGroup)!
  const activeCategoryObj =
    activeGroupObj.categories.find((c) => c.id === activeCategory) ?? activeGroupObj.categories[0]

  const handleGroupChange = (groupId: MenuGroup["id"]) => {
    if (groupId === activeGroup) return
    const group = menuData.find((g) => g.id === groupId)!
    setActiveGroup(groupId)
    setActiveCategory(group.categories[0].id)
  }

  // When the visible list changes (group or category), scroll up so the first product of the
  // new list sits just below the sticky nav. Skips the very first render so the page doesn't
  // jump on mount.
  const firstListRender = useRef(true)
  useEffect(() => {
    if (firstListRender.current) {
      firstListRender.current = false
      return
    }
    const anchor = listAnchorRef.current
    if (!anchor) return
    const STICKY_OFFSET = 64 // matches the sticky nav's top offset
    const navHeight = stickyNavRef.current?.offsetHeight ?? 0
    const target =
      anchor.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET - navHeight - 12
    window.scrollTo({ top: Math.max(0, target), behavior: "smooth" })
  }, [activeCategory, activeGroup])

  return (
    <section id="menu" className="min-h-screen py-24 px-6 bg-brand-cream-100 overflow-x-clip">
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

        {/* Sentinel: marks where the nav becomes sticky so we can measure scroll progress */}
        <div ref={navSentinelRef} aria-hidden className="h-0" />

        {/* Sticky menu navigation: both the Food/Drinks toggle and the category chips
            stick to the top together and progressively shrink the gap between them on scroll.
            Full-bleed via margin (no transform) so it doesn't jitter while scrolling, and a
            fully opaque background so no content shows through. It tucks flush beneath the
            fixed header, leaving no transparent strip. */}
        <div ref={stickyNavRef} className="sticky top-16 z-30 w-screen ml-[calc(50%-50vw)] bg-brand-cream-100">
          {/* Group toggle (Food / Drinks) */}
          <div
            className="max-w-4xl mx-auto px-6 flex justify-center transition-[padding,margin] duration-300 ease-out"
            style={{
              paddingTop: navCompact ? 16 : 22,
              marginBottom: navCompact ? 2 : 28,
            }}
          >
            <div
              className="inline-flex p-1.5 rounded-full bg-brand-cream-200/60 border border-brand-green-700/10 origin-top transition-transform duration-300 ease-out"
              style={{ transform: navCompact ? "scale(0.88)" : "scale(1)" }}
            >
              {menuData.map((group) => (
                <button
                  key={group.id}
                  onClick={() => handleGroupChange(group.id)}
                  className={`flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-200 font-sans ${
                    activeGroup === group.id
                      ? "bg-brand-green-700 text-brand-cream-50 shadow-md shadow-brand-green-700/20"
                      : "text-brand-green-700/70 hover:text-brand-green-700"
                  }`}
                >
                  {group.icon}
                  {group.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category chips — full-width bar with dynamic scroll arrows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CategoryBar
                categories={activeGroupObj.categories}
                activeCategory={activeCategory}
                onSelect={setActiveCategory}
                compact={navCompact}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Anchor marking the top of the product list (scroll target on list change) */}
        <div ref={listAnchorRef} aria-hidden className="h-0" />

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
            {activeCategoryObj.items.map((item, i) => (
              <motion.button
                type="button"
                onClick={() => setSelectedItem(item)}
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                className="text-left w-full cursor-pointer flex flex-col overflow-hidden rounded-2xl border border-brand-green-700/10 bg-brand-cream-50 hover:bg-white hover:shadow-lg hover:border-brand-green-700/25 transition-all duration-300 group"
              >
                {item.image && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.tag && (
                      <span className={`absolute top-3 left-3 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-sm ${tagColors[item.tag] ?? "bg-brand-cream-200 text-brand-dark/60"}`}>
                        {item.tag}
                      </span>
                    )}
                    {/* Click-for-details hint, revealed on hover */}
                    <span className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-cream-50/90 backdrop-blur text-brand-green-700 text-[11px] font-bold shadow-sm opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <Plus className="w-3.5 h-3.5" /> Detalii
                    </span>
                  </div>
                )}

                <div className="flex flex-col flex-1 p-4 md:p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-brand-dark font-bold group-hover:text-brand-green-700 transition-colors text-sm sm:text-base font-serif lowercase leading-tight">{item.name}</h3>
                    <span className="text-brand-green-700 font-bold text-xs sm:text-sm whitespace-nowrap">{item.price}</span>
                  </div>

                  {/* Macronutrients & Calories badges */}
                  {item.macros && (
                    <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
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

                  {/* Suggestion that a click opens the full description */}
                  <p className="mt-auto pt-3 flex items-center gap-1.5 text-brand-green-700/70 group-hover:text-brand-green-700 text-[11px] sm:text-xs font-semibold font-sans transition-colors">
                    <Info className="w-3.5 h-3.5" /> Click pentru descriere completă
                  </p>
                </div>
              </motion.button>
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

      {/* Item detail modal */}
      <AnimatePresence>
        {selectedItem && (
          <Dialog static open={!!selectedItem} onClose={() => setSelectedItem(null)} className="relative z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-brand-dark/50 backdrop-blur-sm"
              aria-hidden="true"
            />
            <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
              <DialogPanel className="relative w-full max-w-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 24 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-brand-cream-50 shadow-2xl shadow-brand-dark/30"
              >
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  aria-label="Închide"
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-brand-cream-50/90 backdrop-blur text-brand-dark/70 hover:text-brand-green-700 border border-brand-green-700/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {selectedItem.image && (
                  <div className="w-full h-56 sm:h-64 overflow-hidden">
                    <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <DialogTitle className="text-2xl sm:text-3xl font-extrabold text-brand-green-700 font-serif lowercase leading-tight">
                      {selectedItem.name}
                    </DialogTitle>
                    <span className="text-brand-green-700 font-bold text-base whitespace-nowrap mt-1">{selectedItem.price}</span>
                  </div>

                  {selectedItem.tag && (
                    <span className={`inline-block text-[11px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider mb-4 ${tagColors[selectedItem.tag] ?? "bg-brand-cream-200 text-brand-dark/60"}`}>
                      {selectedItem.tag}
                    </span>
                  )}

                  <p className="text-brand-dark/70 text-sm sm:text-base leading-relaxed font-light font-sans mb-6">{selectedItem.description}</p>

                  {selectedItem.macros && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      <div className="flex flex-col items-center justify-center text-center p-3 rounded-xl bg-brand-green-700/10 border border-brand-green-700/10">
                        <Flame className="w-5 h-5 text-brand-green-700 mb-1" />
                        <span className="text-brand-green-700 font-bold text-sm">{selectedItem.macros.calories} kcal</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center p-3 rounded-xl bg-brand-cream-200/50 border border-brand-green-700/5">
                        <Beef className="w-5 h-5 text-red-700/80 mb-1" />
                        <span className="text-brand-dark/80 font-semibold text-sm">{selectedItem.macros.protein}</span>
                        <span className="text-brand-dark/50 text-[11px] font-medium">Proteine</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center p-3 rounded-xl bg-brand-cream-200/50 border border-brand-green-700/5">
                        <Wheat className="w-5 h-5 text-amber-700/80 mb-1" />
                        <span className="text-brand-dark/80 font-semibold text-sm">{selectedItem.macros.carbs}</span>
                        <span className="text-brand-dark/50 text-[11px] font-medium">Carbohidrați</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center p-3 rounded-xl bg-brand-cream-200/50 border border-brand-green-700/5">
                        <Nut className="w-5 h-5 text-amber-700 mb-1" />
                        <span className="text-brand-dark/80 font-semibold text-sm">{selectedItem.macros.fat}</span>
                        <span className="text-brand-dark/50 text-[11px] font-medium">Grăsimi</span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
              </DialogPanel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  )
}
