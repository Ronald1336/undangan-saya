/* BackgroundSlideshow.jsx — Global background photo slideshow */
import { useState, useEffect } from 'react'

const PHOTOS = [
  '/couple.jpg.jpeg',
  '/galeri-1.jpg.jpeg',
  '/galeri-2.jpg.jpeg',
  '/galeri-3.jpg.jpeg',
  '/galeri-4.jpg.jpeg',
  '/galeri-5.jpg.jpeg',
  '/galeri-6.jpg.jpeg',
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
      {PHOTOS.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[2500ms] ease-in-out"
          style={{ opacity: index === i ? 0.75 : 0 }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}
      {/* Light overlay for readability */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(26,15,10,0.3) 0%, rgba(30,20,16,0.25) 50%, rgba(26,15,10,0.3) 100%)' }} />
    </div>
  )
}
