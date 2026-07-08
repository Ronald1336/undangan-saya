import { useState, useEffect, useCallback, useRef } from 'react'
import Couple from './components/Couple'
import Countdown from './components/Countdown'
import Event from './components/Event'
import Gallery from './components/Gallery'
import Story from './components/Story'
import Gift from './components/Gift'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import MusicToggle from './components/MusicToggle'
import AutoScroll from './components/AutoScroll'
import BackgroundSlideshow from './components/BackgroundSlideshow'

/* ── Helper: read guest name from URL ── */
function getGuestName() {
  const params = new URLSearchParams(window.location.search)
  return params.get('to') || 'Tamu Undangan'
}

/* ── Scroll reveal hook ── */
function useScrollReveal(isReady) {
  const isReadyRef = useRef(false)
  isReadyRef.current = isReady

  useEffect(() => {
    if (!isReadyRef.current) return

    // Small delay to ensure DOM is painted
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('visible')
            }
          })
        },
        { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
      )
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom, .reveal-fade').forEach((el) => observer.observe(el))
    }, 100)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady])
}

/* ── Active section tracker ── */
function useActiveSection(sectionIds, isReady) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    if (!isReady) return

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              setActive(e.target.id)
            }
          })
        },
        { threshold: 0.3 }
      )
      sectionIds.forEach((id) => {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      })
    }, 200)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady])

  return active
}

const SLIDESHOW_PHOTOS = [
  '/foto1.webp',
  '/foto2.webp',
  '/foto3.webp',
  '/foto4.webp',
  '/foto5.webp',
  '/foto6.webp',
  '/foto7.webp',
  '/foto8.webp',
  '/foto9.webp',
  '/foto10.webp',
  '/foto11.webp',
  '/foto12.webp',
  '/foto13.webp',
  '/foto14.webp',
  '/foto15.webp',
]

export default function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const audioRef = useRef(null)
  const guest = getGuestName()

  useScrollReveal(isOpen)
  const activeSection = useActiveSection(['couple', 'countdown', 'gallery', 'gift'], isOpen)

  // Slideshow timer
  useEffect(() => {
    if (isOpen) return
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDESHOW_PHOTOS.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isOpen])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    // Try to play music
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false))
    }

    // Request fullscreen for a more immersive experience
    const docEl = document.documentElement
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().catch((err) => {
        console.warn("Fullscreen request failed:", err)
      })
    } else if (docEl.webkitRequestFullscreen) {
      try {
        docEl.webkitRequestFullscreen()
      } catch (err) {
        console.warn("WebKit Fullscreen request failed:", err)
      }
    } else if (docEl.msRequestFullscreen) {
      try {
        docEl.msRequestFullscreen()
      } catch (err) {
        console.warn("MS Fullscreen request failed:", err)
      }
    }
  }, [])

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => {})
    }
  }, [isPlaying])

  return (
    <>
      {/* Background slideshow only on cover page to prevent iOS OOM crashes */}
      {!isOpen && <BackgroundSlideshow />}

      {/* When open, use a lightweight CSS gradient background */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          style={{ background: 'linear-gradient(160deg, #1A0F0A 0%, #2C1810 40%, #1A0F0A 70%, #0F0805 100%)' }}
          aria-hidden="true"
        />
      )}

      {/* Audio */}
      <audio ref={audioRef} src="/lagu.mp3" loop preload="none" />

      {/* Cover / Opening — placeholder for now */}
      {!isOpen && (
        <section
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'linear-gradient(180deg, #1A0F0A 0%, #2C1810 50%, #1A0F0A 100%)' }}
        >
          {/* Background photo slideshow */}
          {SLIDESHOW_PHOTOS.map((src, i) => {
            const isActive = i === slideIndex;
            const isNext = i === (slideIndex + 1) % SLIDESHOW_PHOTOS.length;
            const isPrev = i === (slideIndex - 1 + SLIDESHOW_PHOTOS.length) % SLIDESHOW_PHOTOS.length;
            const shouldLoad = isActive || isNext || isPrev;

            return (
              <div
                key={src}
                className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
                style={{ opacity: isActive ? 0.35 : 0 }}
              >
                {shouldLoad && (
                  <img src={src} alt="" className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
                )}
              </div>
            )
          })}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(26,15,10,0.5) 0%, rgba(26,15,10,0.9) 100%)' }}></div>

          <div className="relative z-10 text-center px-6">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-brown-400 mb-3"
              style={{ animation: 'fadeIn 0.8s ease 0.2s forwards', opacity: 0 }}>
              THE WEDDING OF
            </p>
            <h1 className="font-script text-5xl md:text-6xl text-gold-light mb-2"
              style={{ animation: 'fadeInUp 0.8s ease 0.5s forwards', opacity: 0, lineHeight: '1.3' }}>
              Ronald
            </h1>
            <p className="font-script text-3xl text-brown-300 mb-1"
              style={{ animation: 'fadeIn 0.6s ease 0.8s forwards', opacity: 0 }}>&amp;</p>
            <h1 className="font-script text-5xl md:text-6xl text-gold-light mb-6"
              style={{ animation: 'fadeInUp 0.8s ease 1s forwards', opacity: 0, lineHeight: '1.3' }}>
              Grace
            </h1>

            <div className="w-16 h-px bg-gradient-to-r from-transparent via-brown-400 to-transparent mx-auto mb-6"
              style={{ animation: 'fadeIn 0.6s ease 1.3s forwards', opacity: 0 }}></div>

            <p className="font-serif italic text-xs text-brown-300 mb-2"
              style={{ animation: 'fadeIn 0.6s ease 1.5s forwards', opacity: 0 }}>
              Kepada Yth.
            </p>
            <p className="font-serif text-sm text-brown-100 mb-8"
              style={{ animation: 'fadeIn 0.6s ease 1.7s forwards', opacity: 0 }}>
              Bapak/Ibu/Saudara/i<br />{guest}
            </p>

            <button
              onClick={handleOpen}
              className="px-8 py-3 rounded-full font-sans text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer hover:scale-105"
              style={{
                animation: 'fadeInUp 0.8s ease 2s forwards',
                opacity: 0,
                background: 'linear-gradient(135deg, rgba(139,111,71,0.3), rgba(139,111,71,0.15))',
                border: '1px solid rgba(139,111,71,0.5)',
                color: '#D4B896',
                backdropFilter: 'blur(10px)',
              }}
            >
              ✉ Buka Undangan
            </button>
          </div>
        </section>
      )}

      {/* Main Content */}
      {isOpen && (
        <>
          <main className="relative z-10">
            <Couple />
            <Countdown />
            <Event />
            <Gallery audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            <Story />
            <Gift />
            <Footer />
          </main>

          <MusicToggle isPlaying={isPlaying} toggle={toggleMusic} />
          <AutoScroll />
          <BottomNav activeSection={activeSection} />
        </>
      )}
    </>
  )
}
