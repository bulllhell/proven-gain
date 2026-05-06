import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiPlayCircleFill,
  RiInstagramLine,
  RiExternalLinkLine,
  RiCloseLine,
  RiStarFill,
  RiHeartFill,
  RiEyeLine,
} from 'react-icons/ri'
import prov1 from '../../assets/prov1.jpeg'
import prov2 from '../../assets/prov2.jpeg'
import prov3 from '../../assets/prov3.jpeg'
import prov4 from '../../assets/prov4.jpeg'

// ── Reel data ─────────────────────────────────────────────────
const reels = [
  {
    id: 1,
    url: 'https://www.instagram.com/reel/DKG5fNFKhwp/?igsh=MWtxN294YzN1YWRjZg==',
    thumbnail: prov1,
    title: 'How We Built a $50K/Month Shopify Store',
    caption: 'The exact strategy we used to take a brand new Shopify store from zero to $50K/month in under 90 days.',
    likes: '8.4K',
    views: '124K',
    tag: 'Case Study',
    tagColor: '#d55124',
  },
  {
    id: 2,
    url: 'https://www.instagram.com/reel/DLvXs4gKpFU/?igsh=Mm0weHUza3N2ODJ0',
    thumbnail: prov2,
    title: '3 Shopify Mistakes Killing Your Sales',
    caption: 'This is another review from one of our successful cilent making huge sale on his store #shopify. ..',
    likes: '11.2K',
    views: '198K',
    tag: 'Tips',
    tagColor: '#e8714a',
  },
  {
    id: 3,
    url: 'https://www.instagram.com/reel/DQ60vTwCr88/?igsh=c3JodWUyYmNzNGpl',
    thumbnail: prov3,
    title: 'Brand Identity That Makes Customers Buy',
    caption: 'How a powerful brand identity transformed this store\'s conversion rate and built real customer loyalty.',
    likes: '6.9K',
    views: '87K',
    tag: 'Branding',
    tagColor: '#d55124',
  },
  {
    id: 4,
    url: 'https://www.instagram.com/reel/DVfvP-RClNN/?igsh=Zm5lMXJyczFxdGhp',
    thumbnail: prov4,
    title: 'Growth Funnel That Changed Everything',
    caption: 'One funnel, $120K in 60 days. Here\'s exactly how the funnel we built for our client scaled fast.',
    likes: '9.7K',
    views: '155K',
    tag: 'Funnels',
    tagColor: '#e8714a',
  },
]

const IG_PROFILE = 'https://www.instagram.com/ecomevolve'

// ── Modal ─────────────────────────────────────────────────────
function ReelModal({ reel, onClose }) {
  return (
    <AnimatePresence>
      {reel && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden shadow-2xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--brand-border)', borderRadius: '20px' }}>

              {/* Thumbnail */}
              <div className="relative h-64 overflow-hidden">
                <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-card), rgba(22,17,17,0.4), transparent)' }} />

                {/* Instagram play indicator */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl"
                    style={{ background: 'var(--brand-grad)', boxShadow: '0 0 40px var(--brand-glow)' }}
                  >
                    <RiInstagramLine className="text-white text-2xl" />
                  </div>
                  <span className="text-white text-xs font-semibold bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    Opens on Instagram
                  </span>
                </div>

                {/* Tag */}
                <span
                  className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{ background: `${reel.tagColor}22`, color: reel.tagColor, border: `1px solid ${reel.tagColor}44` }}
                >
                  {reel.tag}
                </span>

                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white transition-all"
                  style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
                >
                  <RiCloseLine />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col gap-4">
                <div>
                  <h3 className="font-bold text-base leading-snug mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)' }}>
                    {reel.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--snow-dim)' }}>{reel.caption}</p>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--snow-muted)' }}>
                  <span className="flex items-center gap-1.5">
                    <RiHeartFill style={{ color: '#d55124' }} />
                    {reel.likes} likes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <RiEyeLine />
                    {reel.views} views
                  </span>
                </div>

                {/* Note */}
                <div className="rounded-xl p-3 text-xs leading-relaxed" style={{ background: 'var(--bg-raised)', color: 'var(--snow-muted)', border: '1px solid var(--bg-border)' }}>
                  📱 This video is hosted on Instagram. Tap below to watch the full reel in a new tab.
                </div>

                {/* CTA */}
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-white font-semibold py-3 px-5 rounded-xl text-sm transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'var(--brand-grad)', boxShadow: '0 4px 20px var(--brand-glow)', fontFamily: 'var(--font-display)' }}
                >
                  <RiInstagramLine className="text-base" />
                  Watch on Instagram
                  <RiExternalLinkLine className="text-xs" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── Reel Card ─────────────────────────────────────────────────
function ReelCard({ reel, index, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(reel)}
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        background: 'var(--bg-card)',
        border: hovered ? '1px solid var(--brand-border)' : '1px solid var(--bg-border)',
        boxShadow: hovered ? '0 20px 60px var(--brand-glow)' : '0 4px 20px rgba(0,0,0,0.4)',
      }}
    >
      {/* Thumbnail — portrait */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '9/14' }}>
        <motion.img
          src={reel.thumbnail}
          alt={reel.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-card) 0%, rgba(22,17,17,0.3) 40%, transparent 100%)' }} />

        {/* Tag */}
        <span
          className="hidden xs:block absolute top-2.5 left-2.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
          style={{ background: `${reel.tagColor}22`, color: reel.tagColor, border: `1px solid ${reel.tagColor}40` }}
        >
          {reel.tag}
        </span>

        {/* Stats */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1 items-end">
          <span className="flex items-center gap-0.5 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}>
            <RiHeartFill className="text-[#d55124]" style={{ fontSize: '9px' }} />
            {reel.likes}
          </span>
          <span className="flex items-center gap-0.5 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }}>
            <RiEyeLine style={{ fontSize: '9px' }} />
            {reel.views}
          </span>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: hovered ? 1.12 : 1, opacity: hovered ? 1 : 0.75 }}
            transition={{ duration: 0.25 }}
            className="w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: hovered ? 'var(--brand-grad)' : 'rgba(213,81,36,0.85)',
              boxShadow: hovered ? '0 0 32px var(--brand-glow)' : 'none',
            }}
          >
            <RiPlayCircleFill className="text-white text-xl sm:text-2xl ml-0.5" />
          </motion.div>
        </div>

        {/* IG badge */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 text-white font-bold px-1.5 sm:px-2 py-0.5 rounded-full"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', fontSize: '9px' }}>
          <RiInstagramLine style={{ color: '#d55124', fontSize: '10px' }} />
          <span className="hidden sm:inline">@ecomevolve</span>
          <span className="sm:hidden">IG</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-2.5 sm:p-4">
        <h3 className="font-bold leading-snug line-clamp-2"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)', fontSize: 'clamp(11px, 2.5vw, 13px)' }}>
          {reel.title}
        </h3>
        <p className="hidden sm:block text-xs mt-1.5 leading-relaxed line-clamp-2" style={{ color: 'var(--snow-muted)' }}>
          {reel.caption}
        </p>
      </div>
    </motion.div>
  )
}

// ── Main Component ─────────────────────────────────────────────
export default function VideoReviews() {
  const [activeReel, setActiveReel] = useState(null)

  return (
    <section className="section-py relative overflow-hidden" style={{ background: 'var(--bg-raised)' }}>

      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(213,81,36,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(213,81,36,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="container relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-3 mb-8 sm:mb-12"
        >
          {/* Top row */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: 'var(--brand-light)' }}>
                <RiStarFill />
                Client Results
              </span>
            </div>
            <a
              href={IG_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] sm:text-sm font-semibold px-3 sm:px-5 py-2 rounded-full transition-all duration-300"
              style={{
                border: '1px solid var(--brand-border)',
                color: 'var(--snow-dim)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--brand)'; e.currentTarget.style.color = 'var(--snow)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--brand-border)'; e.currentTarget.style.color = 'var(--snow-dim)' }}
            >
              <RiInstagramLine style={{ color: 'var(--brand)' }} />
              <span className="hidden sm:inline">Follow</span> @ecomevolve
              <RiExternalLinkLine className="text-[10px]" />
            </a>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)' }}>
            Real People.{' '}
            <span className="text-brand-grad">Real Results.</span>
          </h2>
          <p className="text-sm leading-relaxed max-w-md" style={{ color: 'var(--snow-dim)' }}>
            Watch how we've helped entrepreneurs build profitable brands and Shopify stores from scratch.
          </p>
        </motion.div>

        {/* Reels grid — 2 col mobile, 4 col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {reels.map((reel, i) => (
            <ReelCard key={reel.id} reel={reel} index={i} onClick={setActiveReel} />
          ))}
        </div>

        {/* Bottom IG strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-4 sm:px-6 py-5 text-center sm:text-left"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--brand-border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-lg flex-shrink-0"
              style={{ background: 'var(--brand-grad)', boxShadow: '0 4px 16px var(--brand-glow)' }}
            >
              <RiInstagramLine />
            </div>
            <div>
              <p className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)', color: 'var(--snow)' }}>
                Want to see more results?
              </p>
              <p className="text-xs" style={{ color: 'var(--snow-muted)' }}>
                Daily tips and client wins on Instagram
              </p>
            </div>
          </div>
          <a
            href={IG_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0"
            style={{
              background: 'var(--brand-grad)',
              boxShadow: '0 4px 16px var(--brand-glow)',
              fontFamily: 'var(--font-display)',
            }}
          >
            <RiInstagramLine />
            Watch More on Instagram
            <RiExternalLinkLine className="text-xs" />
          </a>
        </motion.div>

      </div>

      {/* Modal */}
      <ReelModal reel={activeReel} onClose={() => setActiveReel(null)} />
    </section>
  )
}