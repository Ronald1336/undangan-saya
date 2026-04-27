/* BottomNav.jsx — Sticky Bottom Navigation */
import { Users, CalendarDays, Image, MessageCircle } from 'lucide-react'

const navItems = [
  { id: 'couple', label: 'Couple', icon: Users },
  { id: 'countdown', label: 'Date', icon: CalendarDays },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'gift', label: 'Pesan', icon: MessageCircle },
]

export default function BottomNav({ activeSection }) {
  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="bottom-nav flex" aria-label="Section navigation">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeSection === item.id
        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={isActive ? 'active' : ''}
            aria-label={`Go to ${item.label}`}
          >
            <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
            <span className="font-sans" style={{ fontSize: '9px', letterSpacing: '0.05em' }}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
