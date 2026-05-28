import { useState, useEffect, useRef } from 'react'
import { ArrowDown, Pause } from 'lucide-react'

export default function AutoScroll() {
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollRef = useRef(null)

  const toggleScroll = () => {
    setIsScrolling((prev) => !prev)
  }

  useEffect(() => {
    if (!isScrolling) return

    let lastTime = performance.now()
    const speed = 35 // pixels per second (comfortable reading speed)

    const scrollLoop = (time) => {
      const delta = (time - lastTime) / 1000
      lastTime = time

      const scrollAmount = speed * delta
      window.scrollBy(0, scrollAmount)

      // Check if reached the bottom of the page
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5
      if (isBottom) {
        setIsScrolling(false)
      } else {
        scrollRef.current = requestAnimationFrame(scrollLoop)
      }
    }

    scrollRef.current = requestAnimationFrame(scrollLoop)

    // Stop auto scrolling on manual scroll interaction
    const handleManualScroll = (e) => {
      if (e.isTrusted) {
        setIsScrolling(false)
      }
    }

    window.addEventListener('wheel', handleManualScroll, { passive: true })
    window.addEventListener('touchstart', handleManualScroll, { passive: true })

    return () => {
      if (scrollRef.current) {
        cancelAnimationFrame(scrollRef.current)
      }
      window.removeEventListener('wheel', handleManualScroll)
      window.removeEventListener('touchstart', handleManualScroll)
    }
  }, [isScrolling])

  return (
    <button
      onClick={toggleScroll}
      className={`auto-scroll-toggle ${isScrolling ? 'active' : ''}`}
      aria-label={isScrolling ? 'Hentikan Gulir Otomatis' : 'Mulai Gulir Otomatis'}
      title={isScrolling ? 'Pause Auto Scroll' : 'Auto Scroll'}
    >
      {isScrolling ? (
        <Pause size={18} className="animate-pulse" />
      ) : (
        <ArrowDown size={18} className="animate-bounce" style={{ animationDuration: '2s' }} />
      )}
    </button>
  )
}
