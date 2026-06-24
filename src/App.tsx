import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Menu from '@/pages/Menu'
import Community from '@/pages/Community'
import Reservations from '@/pages/Reservations'

export default function App() {
  return (
    <div className="min-h-screen bg-brand-cream-100 text-brand-dark font-sans">
      <Navbar />
      <div id="home">
        <Home />
      </div>
      <Menu />
      <Community />
      <Reservations />
      <Footer />
    </div>
  )
}
