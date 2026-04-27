/* MusicToggle.jsx — Floating music button */
import { Music, VolumeX } from 'lucide-react'

export default function MusicToggle({ isPlaying, toggle }) {
  return (
    <button
      onClick={toggle}
      className="music-toggle"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <Music size={18} className="animate-pulse" />
      ) : (
        <VolumeX size={18} />
      )}
    </button>
  )
}
