/* Couple.jsx — The Groom & The Bride */

export default function Couple() {
  return (
    <section id="couple" className="relative py-16 px-5" style={{ background: 'rgba(26,15,10,0.15)' }}>
      
      {/* Bible Verse */}
      <div className="reveal-fade max-w-md mx-auto mb-14">
        <div className="text-center mb-4">
          <span className="font-serif italic text-sm text-gold-light tracking-wide">
            1 Yohanes 4:16
          </span>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-brown-400 to-transparent mx-auto mt-2"></div>
        </div>
        <div className="glass-card p-5">
          <p className="font-serif italic text-sm leading-relaxed text-brown-100 text-center" style={{ lineHeight: '1.8' }}>
            Kita telah mengenal dan telah percaya akan kasih Allah kepada kita. Allah adalah kasih, dan barangsiapa tetap berada di dalam kasih, ia tetap berada di dalam Allah dan Allah di dalam dia
          </p>
        </div>
      </div>

      {/* Groom & Bride — Single Glass Panel */}
      <div className="reveal-zoom max-w-sm mx-auto">
        <div className="glass-panel p-8">
          {/* The Groom */}
          <div className="text-center mb-10">
            <h3 className="font-display text-lg tracking-[0.25em] uppercase text-brown-300 mb-6">
              THE GROOM
            </h3>
            <div className="photo-frame mx-auto mb-6" style={{ maxWidth: '280px', aspectRatio: '3/4' }}>
              <img 
                src="/the-groom.jpg" 
                alt="The Groom" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h2 className="font-script text-3xl md:text-4xl text-gold-light mb-3" style={{ lineHeight: '1.3' }}>
              Arnoldus Haryanto Garum
            </h2>
            <p className="font-serif text-sm text-brown-200 italic leading-relaxed">
              Putra kedua dari Bapak Rofinus Garum<br />
              dan Ibu Avelina Ramla
            </p>
          </div>

          {/* Ampersand */}
          <div className="text-center my-8">
            <span className="font-script text-5xl text-brown-400" style={{ opacity: 0.7 }}>&amp;</span>
          </div>

          {/* The Bride */}
          <div className="text-center">
            <h3 className="font-display text-lg tracking-[0.25em] uppercase text-brown-300 mb-6">
              THE BRIDE
            </h3>
            <div className="photo-frame mx-auto mb-6" style={{ maxWidth: '280px', aspectRatio: '3/4' }}>
              <img 
                src="/the-bride.jpg" 
                alt="The Bride" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <h2 className="font-script text-3xl md:text-4xl text-gold-light mb-3" style={{ lineHeight: '1.3' }}>
              Eugracia Mariani Vitus
            </h2>
            <p className="font-serif text-sm text-brown-200 italic leading-relaxed">
              Putri Pertama dari Bapak Adrianus Vitus<br />
              dan Ibu Ermelinda Rajuni Gatur
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
