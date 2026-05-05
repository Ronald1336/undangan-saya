/* Story.jsx — Love Story Timeline */

const stories = [
  {
    title: 'Satu Muara',
    text: 'Sebuah perjalanan tentang dua jiwa yang memilih untuk berhenti mencari dan mulai membangun.',
    photo: '/galeri-1.jpg.jpeg',
    photoPosition: 'right',
  },
  {
    title: 'Tentang Bertumbuh',
    text: 'Bukan tentang seberapa cepat kita sampai, tapi tentang seberapa kuat kita bertahan saat langkah terasa berat. Kita hanyalah dua orang sederhana yang sepakat bahwa cinta bukan hanya soal debar di dada, melainkan soal komitmen untuk tetap tinggal saat musim berganti dan badai menyapa.',
    photo: '/galeri-3.jpg.jpeg',
    photoPosition: 'left',
  },
  {
    title: 'Sabar & Pembuktian',
    text: 'Ada ribuan kompromi di balik senyuman. Ada jutaan doa yang kita bisikkan di sepertiga malam. Kita belajar bahwa mencintai adalah kerja keras; tentang bagaimana meredam ego, membasuh luka dengan maaf, dan mengubah keraguan menjadi keyakinan yang tak tergoyahkan. Bukan sekadar janji di lisan, tapi bukti nyata melalui pengorbanan yang menyatukan dua keluarga dalam satu restu yang tulus.',
    photo: '/galeri-4.jpg.jpeg',
    photoPosition: 'right',
  },
  {
    title: 'Ketentuan & Doa',
    text: 'Dunia mungkin penuh ketidakpastian, namun di hadapan Sang Pemilik Hati, kita menaruh seluruh harap. Kami percaya bahwa setiap detak waktu telah diatur dengan indah. Dengan segala kerendahan hati dan kepasrahan, kami menanti saat di mana sebuah ikrar suci akan menyatukan dua napas dalam satu pengabdian yang abadi.',
    photo: '/galeri-5.jpg.jpeg',
    photoPosition: 'left',
  },
  {
    title: 'Menuju Langkah Baru',
    text: '"Akan tiba masanya..."\nHari di mana kami membuka babak baru sebagai satu kesatuan. Mohon doa restu agar setiap langkah kami kedepan senantiasa dibimbing oleh cahaya-Nya, penuh ketenangan, dan dilingkupi keberkahan yang tak terputus.',
    photo: '/galeri-6.jpg.jpeg',
    photoPosition: 'right',
  },
]

export default function Story() {
  return (
    <section id="story" className="relative py-16 px-4" style={{ background: 'rgba(26,15,10,0.1)' }}>
      {/* Heading */}
      <div className="reveal text-center mb-12">
        <h2 className="section-divider max-w-xs mx-auto font-display text-xl tracking-[0.3em] uppercase text-brown-200">
          LOVE STORY
        </h2>
      </div>

      {/* Stories */}
      <div className="max-w-lg mx-auto space-y-6">
        {stories.map((s, i) => (
          <div key={i} className="reveal relative">
            {/* Layout container */}
            <div className={`flex items-stretch gap-3 ${s.photoPosition === 'left' ? 'flex-row-reverse' : 'flex-row'}`}
              style={{ minHeight: '200px' }}
            >
              {/* Text with frosted glass behind it */}
              <div className="flex-1 relative">
                <div className="glass-card relative z-10 h-full p-4">
                  <h4 className="font-serif text-base font-bold text-brown-100 mb-3">{s.title}</h4>
                  <p className="font-sans text-xs text-brown-300 leading-relaxed" style={{ lineHeight: '1.9', whiteSpace: 'pre-line' }}>
                    {s.text}
                  </p>
                </div>
              </div>

              {/* Photo */}
              <div className="w-[140px] flex-shrink-0 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(139,111,71,0.2)' }}>
                <img
                  src={s.photo}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
