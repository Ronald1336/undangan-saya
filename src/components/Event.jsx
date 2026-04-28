/* Event.jsx — Pemberkatan Details */
import { MapPin } from 'lucide-react'

export default function Event() {
  const events = [
    {
      title: 'Pemberkatan',
      date: 'Jumaat, 17 Juli 2026',
      time: '09 : 00 WITA - Selesai',
      venue: 'Gereja Katolik Paroki St. Stanislaus, Orong',
      address: 'Jl. Pastoran, Orong, Kec. Welak, Kabupaten Manggarai Barat, Nusa Tenggara Tim.',
      mapUrl: 'https://maps.google.com/?q=Gereja+Katolik+Paroki+St.+Stanislaus+Orong+Welak+Manggarai+Barat',
      align: 'left',
    },
    {
      title: 'Resepsi',
      date: 'Jumaat, 17 Juli 2026',
      time: '20 : 00 WITA - Selesai',
      venue: 'Lapangan Sepak Bola, Orong',
      address: 'Jl. Pastoran, Orong, Kec. Welak, Kabupaten Manggarai Barat, Nusa Tenggara Tim.',
      mapUrl: 'https://maps.google.com/?q=Lapangan+Sepak+Bola+Orong+Welak+Manggarai+Barat',
      align: 'right',
    },
  ]

  return (
    <section id="event" className="relative py-16 px-5 overflow-hidden" style={{ background: 'rgba(26,15,10,0.3)' }}>
      <div className="relative z-10">
        {events.map((ev, i) => (
          <div 
            key={i} 
            className={`reveal max-w-sm mb-10 ${ev.align === 'right' ? 'ml-auto mr-4' : 'ml-4'}`}
          >
            <div className="event-card">
              <h3 className="font-display text-xl tracking-[0.15em] text-brown-100 mb-3">
                {ev.title}
              </h3>
              <p className="font-serif text-sm font-bold text-brown-300 mb-1">
                {ev.date}
              </p>
              <p className="font-sans text-xs text-brown-400 mb-4">
                {ev.time}
              </p>
              <div className="w-12 h-px bg-brown-500 mb-4"></div>
              <p className="font-serif text-sm font-bold text-brown-200 mb-1">
                {ev.venue}
              </p>
              <p className="font-sans text-xs text-brown-400 leading-relaxed mb-4">
                {ev.address}
              </p>
              <a 
                href={ev.mapUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-location"
              >
                <MapPin size={14} />
                See Location
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
