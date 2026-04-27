/* Gift.jsx — Wedding Gift + RSVP / Ucapan */
import { useState } from 'react'
import { Copy, Check, Send } from 'lucide-react'

export default function Gift() {
  const [copied, setCopied] = useState(false)
  const [wishes, setWishes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('rg_wishes') || '[]') } catch { return [] }
  })
  const [form, setForm] = useState({ name: '', message: '', attending: 'hadir' })
  const [sending, setSending] = useState(false)

  const rekening = '307701027727532'
  const bank = 'BRI'
  const nama = 'Arnoldus Haryanto Garum'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rekening)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = rekening
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return
    setSending(true)
    setTimeout(() => {
      const newWish = {
        ...form,
        id: Date.now(),
        time: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      }
      const updated = [newWish, ...wishes]
      setWishes(updated)
      localStorage.setItem('rg_wishes', JSON.stringify(updated))
      setForm({ name: '', message: '', attending: 'hadir' })
      setSending(false)
    }, 500)
  }

  return (
    <section id="gift" className="relative py-16 px-5" style={{ background: 'rgba(26,15,10,0.35)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      
      {/* ── Wedding Gift ── */}
      <div className="reveal text-center mb-10">
        <h2 className="section-divider max-w-xs mx-auto font-display text-xl tracking-[0.3em] uppercase text-brown-200">
          WEDDING GIFT
        </h2>
        <p className="font-sans text-xs text-brown-400 mt-4 max-w-sm mx-auto leading-relaxed">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.
        </p>
      </div>

      <div className="reveal max-w-sm mx-auto mb-16">
        <div className="glass-card p-6 text-center">
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
              style={{ background: 'linear-gradient(135deg, #003d79, #0066cc)', color: '#fff' }}>
              {bank}
            </span>
          </div>
          <p className="font-serif text-sm text-brown-200 mb-1">a.n.</p>
          <p className="font-serif text-base font-bold text-brown-100 mb-4">{nama}</p>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="font-mono text-lg tracking-wider text-gold-light">{rekening}</span>
            <button 
              onClick={handleCopy}
              className="p-2 rounded-lg transition-all duration-300 cursor-pointer"
              style={{ background: copied ? 'rgba(34,197,94,0.2)' : 'rgba(139,111,71,0.2)', border: '1px solid rgba(139,111,71,0.3)' }}
              aria-label="Copy rekening"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-brown-300" />}
            </button>
          </div>
          {copied && (
            <p className="text-xs text-green-400 animate-fade-in">Nomor rekening berhasil disalin!</p>
          )}
        </div>
      </div>

      {/* ── RSVP & Ucapan ── */}
      <div className="reveal text-center mb-8">
        <h2 className="section-divider max-w-xs mx-auto font-display text-xl tracking-[0.3em] uppercase text-brown-200">
          UCAPAN & DOA
        </h2>
        <p className="font-sans text-xs text-brown-400 mt-4 max-w-sm mx-auto leading-relaxed">
          Berikan ucapan dan doa terbaik untuk kedua mempelai
        </p>
      </div>

      <div className="reveal max-w-sm mx-auto mb-10">
        <form onSubmit={handleSubmit} className="glass-card p-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block font-sans text-xs text-brown-300 mb-1.5 tracking-wide">Nama</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Masukkan nama Anda"
              className="w-full px-4 py-2.5 rounded-lg font-sans text-sm text-brown-100 placeholder-brown-500 outline-none transition-all duration-300 focus:ring-1 focus:ring-brown-400"
              style={{ background: 'rgba(26,15,10,0.6)', border: '1px solid rgba(139,111,71,0.25)' }}
              required
            />
          </div>

          {/* Attendance */}
          <div>
            <label className="block font-sans text-xs text-brown-300 mb-1.5 tracking-wide">Kehadiran</label>
            <select
              value={form.attending}
              onChange={(e) => setForm({ ...form, attending: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg font-sans text-sm text-brown-100 outline-none transition-all duration-300 focus:ring-1 focus:ring-brown-400 cursor-pointer"
              style={{ background: 'rgba(26,15,10,0.6)', border: '1px solid rgba(139,111,71,0.25)' }}
            >
              <option value="hadir">✓ Hadir</option>
              <option value="tidak">✗ Tidak Hadir</option>
              <option value="ragu">? Masih Ragu</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block font-sans text-xs text-brown-300 mb-1.5 tracking-wide">Ucapan & Doa</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tulis ucapan dan doa Anda..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg font-sans text-sm text-brown-100 placeholder-brown-500 outline-none resize-none transition-all duration-300 focus:ring-1 focus:ring-brown-400"
              style={{ background: 'rgba(26,15,10,0.6)', border: '1px solid rgba(139,111,71,0.25)' }}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-sans text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, rgba(139,111,71,0.4), rgba(139,111,71,0.2))',
              border: '1px solid rgba(139,111,71,0.4)',
              color: '#D4B896',
            }}
          >
            <Send size={14} />
            {sending ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
        </form>
      </div>

      {/* ── Wishes List ── */}
      {wishes.length > 0 && (
        <div className="reveal max-w-sm mx-auto">
          <p className="font-sans text-xs text-brown-400 mb-4 text-center">{wishes.length} Ucapan</p>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
            {wishes.map((w) => (
              <div key={w.id} className="glass-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif text-sm font-bold text-brown-200">{w.name}</span>
                  <span className="font-sans text-[10px] text-brown-500">{w.time}</span>
                </div>
                <p className="font-sans text-xs text-brown-300 leading-relaxed mb-2">{w.message}</p>
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-sans"
                  style={{
                    background: w.attending === 'hadir' ? 'rgba(34,197,94,0.15)' : w.attending === 'tidak' ? 'rgba(239,68,68,0.15)' : 'rgba(234,179,8,0.15)',
                    color: w.attending === 'hadir' ? '#4ade80' : w.attending === 'tidak' ? '#f87171' : '#facc15',
                    border: `1px solid ${w.attending === 'hadir' ? 'rgba(34,197,94,0.3)' : w.attending === 'tidak' ? 'rgba(239,68,68,0.3)' : 'rgba(234,179,8,0.3)'}`,
                  }}>
                  {w.attending === 'hadir' ? '✓ Hadir' : w.attending === 'tidak' ? '✗ Tidak Hadir' : '? Ragu'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
