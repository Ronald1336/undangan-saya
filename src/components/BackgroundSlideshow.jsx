/* BackgroundSlideshow.jsx — Global background photo slideshow */
import { useState, useEffect } from 'react'

const PHOTOS = [
  '/foto1.webp',
  '/foto4.webp',
  '/foto7.webp',
  '/foto11.webp',
  '/foto14.webp',
]

export default function BackgroundSlideshow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHOTOS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      {PHOTOS.map((src, i) => {
        const isActive = i === index;
        const isNext = i === (index + 1) % PHOTOS.length;
        const isPrev = i === (index - 1 + PHOTOS.length) % PHOTOS.length;
        const shouldLoad = isActive || isNext || isPrev;

        return (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out"
            style={{ opacity: isActive ? 0.75 : 0 }}
          >
            {shouldLoad && (
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            )}
          </div>
        )
      })}
      {/* Light overlay for readability */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,15,10,0.3) 0%, rgba(30,20,16,0.25) 50%, rgba(26,15,10,0.3) 100%)' }} />
    </div>
  )
}
