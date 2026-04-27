/* Footer.jsx — Closing */

export default function Footer() {
  return (
    <footer className="py-16 px-6 text-center" style={{ background: 'linear-gradient(180deg, #1E1410 0%, #0D0804 100%)' }}>
      <div className="max-w-lg mx-auto">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-brown-500 mb-3">
          THE WEDDING OF
        </p>
        <h2 className="font-script text-4xl text-gold-light mb-4" style={{ lineHeight: '1.4' }}>
          Ronald &amp; Grace
        </h2>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-brown-400 to-transparent mx-auto mb-4"></div>
        <p className="font-serif italic text-xs text-brown-400 mb-2">
          17 Juli 2026
        </p>
        <p className="font-serif italic text-xs text-brown-500 leading-relaxed max-w-xs mx-auto mb-8">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </p>
        <p className="font-sans text-[9px] tracking-widest uppercase text-brown-600">
          © 2026 — With Love
        </p>
      </div>
    </footer>
  )
}
