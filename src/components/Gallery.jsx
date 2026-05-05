/* Gallery.jsx — Video + Photo Grid */
import { useEffect, useRef, useState, useCallback } from 'react'
import { Play } from 'lucide-react'

const YOUTUBE_VIDEO_ID = '3NK-7tSpucM'

export default function Gallery({ audioRef, isPlaying, setIsPlaying }) {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const playerRef = useRef(null)
  const containerRef = useRef(null)
  const fadeIntervalRef = useRef(null)

  const photos = [
    { id: 1, src: '/galeri-1.jpg.jpeg', alt: 'Momen 1', span: 'col-span-2 row-span-2' },
    { id: 2, src: '/galeri-2.jpg.jpeg', alt: 'Momen 2', span: '' },
    { id: 3, src: '/galeri-3.jpg.jpeg', alt: 'Momen 3', span: '' },
    { id: 4, src: '/galeri-4.jpg.jpeg', alt: 'Momen 4', span: '' },
    { id: 5, src: '/galeri-5.jpg.jpeg', alt: 'Momen 5', span: '' },
    { id: 6, src: '/galeri-6.jpg.jpeg', alt: 'Momen 6', span: 'col-span-2' },
  ]

  // Fade out background music
  const fadeOutMusic = useCallback(() => {
    if (!audioRef?.current) return
    clearInterval(fadeIntervalRef.current)
    const audio = audioRef.current
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume > 0.05) {
        audio.volume = Math.max(0, audio.volume - 0.05)
      } else {
        audio.volume = 0
        audio.pause()
        clearInterval(fadeIntervalRef.current)
      }
    }, 50)
  }, [audioRef])

  // Fade in background music
  const fadeInMusic = useCallback(() => {
    if (!audioRef?.current) return
    clearInterval(fadeIntervalRef.current)
    const audio = audioRef.current
    audio.volume = 0
    audio.play().then(() => {
      setIsPlaying(true)
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume < 0.95) {
          audio.volume = Math.min(1, audio.volume + 0.05)
        } else {
          audio.volume = 1
          clearInterval(fadeIntervalRef.current)
        }
      }, 50)
    }).catch(() => {})
  }, [audioRef, setIsPlaying])

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT) return
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)
  }, [])

  // Initialize player when video is shown
  useEffect(() => {
    if (!showVideo) return

    const initPlayer = () => {
      if (playerRef.current) return
      playerRef.current = new window.YT.Player('yt-player', {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onStateChange: (e) => {
            // 1 = playing, 2 = paused, 0 = ended
            if (e.data === 1) {
              setVideoPlaying(true)
              fadeOutMusic()
            } else if (e.data === 2) {
              setVideoPlaying(false)
              if (isPlaying) fadeInMusic()
            } else if (e.data === 0) {
              setVideoPlaying(false)
              fadeInMusic()
            }
          },
        },
      })
    }

    if (window.YT && window.YT.Player) {
      initPlayer()
    } else {
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      clearInterval(fadeIntervalRef.current)
    }
  }, [showVideo, fadeOutMusic, fadeInMusic, isPlaying])

  // Pause video when scrolled out of view
  useEffect(() => {
    if (!containerRef.current || !showVideo) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && playerRef.current) {
          try {
            const state = playerRef.current.getPlayerState()
            if (state === 1) { // playing
              playerRef.current.pauseVideo()
              setVideoPlaying(false)
              fadeInMusic()
            }
          } catch {}
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [showVideo, fadeInMusic])

  const handlePlayClick = () => {
    setShowVideo(true)
  }

  return (
    <section id="gallery" className="relative py-16 px-5" style={{ background: 'rgba(30,20,16,0.15)' }}>
      {/* Heading */}
      <div className="reveal-fade text-center mb-10">
        <h2 className="section-divider max-w-xs mx-auto font-display text-xl tracking-[0.3em] uppercase text-brown-200">
          GALLERY
        </h2>
      </div>

      {/* Video */}
      <div ref={containerRef} className="reveal-zoom max-w-md mx-auto mb-8">
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            aspectRatio: '16/9',
            border: '1px solid rgba(139,111,71,0.2)',
          }}
        >
          {!showVideo ? (
            /* Thumbnail with play button */
            <button
              onClick={handlePlayClick}
              className="w-full h-full relative group cursor-pointer"
            >
              <img
                src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`}
                alt="Video"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:bg-black/40">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: 'rgba(139,111,71,0.8)',
                    border: '2px solid rgba(212,184,150,0.6)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Play size={28} className="text-brown-100 ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3">
                <span className="px-2 py-1 rounded text-[10px] font-sans uppercase tracking-wider text-brown-200"
                  style={{ background: 'rgba(26,15,10,0.7)', backdropFilter: 'blur(8px)' }}>
                  ▶ Tonton Video
                </span>
              </div>
            </button>
          ) : (
            /* YouTube Player */
            <div id="yt-player" className="w-full h-full" />
          )}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="reveal stagger-3 max-w-md mx-auto grid grid-cols-3 gap-2">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className={`${photo.span} overflow-hidden rounded-lg group cursor-pointer`}
            style={{ aspectRatio: photo.span.includes('row-span-2') ? '1/1' : photo.span.includes('col-span-2') ? '2/1' : '1/1' }}
          >
            <img 
              src={photo.src} 
              alt={photo.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
