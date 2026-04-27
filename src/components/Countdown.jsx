/* Countdown.jsx — Save The Date */
import { useState, useEffect } from 'react'

const TARGET = new Date('2026-07-17T09:00:00+08:00').getTime()

export default function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })

  useEffect(() => {
    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, TARGET - now)
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n) => String(n).padStart(2, '0').split('')

  const units = [
    { label: 'Days', value: t.d },
    { label: 'Hours', value: t.h },
    { label: 'Minutes', value: t.m },
    { label: 'Second', value: t.s },
  ]

  return (
    <section id="countdown" className="relative py-16 px-5" style={{ background: 'rgba(26,15,10,0.3)' }}>
      {/* Heading */}
      <div className="reveal text-center mb-10">
        <h2 className="section-divider max-w-xs mx-auto font-display text-xl tracking-[0.3em] uppercase text-brown-200">
          SAVE THE DATE
        </h2>
      </div>

      {/* Timer */}
      <div className="reveal flex justify-center gap-4 md:gap-6 max-w-md mx-auto">
        {units.map((u, i) => (
          <div key={i} className="text-center">
            <div className="flex gap-1 mb-2">
              {pad(u.value).map((digit, j) => (
                <div key={j} className="countdown-digit">
                  <span className="font-serif text-2xl md:text-3xl font-bold text-brown-300">
                    {digit}
                  </span>
                </div>
              ))}
            </div>
            <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-brown-400">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
