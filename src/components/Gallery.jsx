/* Gallery.jsx — Photo Grid */

export default function Gallery() {
  const photos = [
    { id: 1, src: '/galeri-1.jpg.jpeg', alt: 'Momen 1', span: 'col-span-2 row-span-2' },
    { id: 2, src: '/galeri-2.jpg.jpeg', alt: 'Momen 2', span: '' },
    { id: 3, src: '/galeri-3.jpg.jpeg', alt: 'Momen 3', span: '' },
    { id: 4, src: '/galeri-4.jpg.jpeg', alt: 'Momen 4', span: '' },
    { id: 5, src: '/galeri-5.jpg.jpeg', alt: 'Momen 5', span: '' },
    { id: 6, src: '/galeri-6.jpg.jpeg', alt: 'Momen 6', span: 'col-span-2' },
  ]

  return (
    <section id="gallery" className="relative py-16 px-5" style={{ background: 'rgba(30,20,16,0.35)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
      {/* Heading */}
      <div className="reveal text-center mb-10">
        <h2 className="section-divider max-w-xs mx-auto font-display text-xl tracking-[0.3em] uppercase text-brown-200">
          GALLERY
        </h2>
      </div>

      {/* Photo Grid */}
      <div className="reveal max-w-md mx-auto grid grid-cols-3 gap-2">
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
