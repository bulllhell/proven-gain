import { motion } from 'framer-motion'

const up = (d = 0) => ({
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] },
  },
})

// ─── Store Data ───────────────────────────────────────────────────────────────

const STORES = [
  {
    name: 'Elegance Universe',
    niche: 'Smart Living',
    url: 'https://eleganceuniverse.com/',
    handle: 'eleganceuniverse.com',
    platform: 'Shopify',
    desc: 'Premium smart living essentials — home tech, lifestyle, and modern convenience.',
    image:
      'https://images.stockcake.com/public/6/2/c/62c9c8a2-7962-4730-b52e-9979b61e3450_large/modern-smart-home-stockcake.jpg',
  },
  {
    name: 'SW Builds',
    niche: 'Baby Store',
    url: 'https://sw-builds.myshopify.com/',
    handle: 'sw-builds',
    platform: 'Shopify',
    desc: 'Curated baby essentials for new parents — safe, soft, and thoughtfully made.',
    image:
      'https://us.123rf.com/450wm/actiongp/actiongp2206/actiongp220600163/187289529-baby-accessories-concept-top-view-photo-of-pink-shirt-booties-pacifier-chain-knitted-bunny-toy.jpg?ver=6',
  },
  {
    name: 'Andrew Omnix',
    niche: 'Fitness',
    url: 'https://andrewomnix.com/',
    handle: 'andrewomnix.com',
    platform: 'Custom Store',
    desc: 'High-performance fitness gear and training products built for serious athletes.',
    image:
      'https://t3.ftcdn.net/jpg/04/29/35/62/360_F_429356296_CVQ5LkC6Pl55kUNLqLisVKgTw9vjyif1.jpg',
  },
  {
    name: 'God Scent Sanctuary',
    niche: 'Baby & Fragrance',
    url: 'https://godscent-sanctuary.myshopify.com/',
    handle: 'godscent-sanctuary',
    platform: 'Shopify',
    desc: 'Fragrance-infused baby products — gentle, aromatic, and beautifully crafted.',
    image:
      'https://kangaroocareindia.com/static/media/blog-120.7629f9879cab648cc6a4.png',
  },
  {
    name: 'X22TVB',
    niche: 'Self Care',
    url: 'https://x22tvb-mw.myshopify.com',
    handle: 'x22tvb-mw',
    platform: 'Shopify',
    desc: 'Self care and wellness products — skin, mind, and body essentials.',
    image:
      'https://www.heinens.com/content/uploads/2022/08/Heinens-Health-And-Beauty-products-800x550-1.jpg',
  },
]

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = {
  page: {
    background: 'var(--bg)',
    minHeight: '100vh',
    paddingTop: 120,
    paddingBottom: 96,
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 1.5rem',
  },
  badge: {
    display: 'inline-block',
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.20em',
    textTransform: 'uppercase',
    padding: '6px 14px',
    borderRadius: 100,
    background: 'var(--brand-muted)',
    border: '1px solid var(--brand-border)',
    color: 'var(--brand-light)',
    marginBottom: 18,
  },
  h1: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 'clamp(2.2rem, 4.2vw, 3.6rem)',
    color: 'var(--snow)',
    lineHeight: 1.08,
    marginBottom: 18,
  },
  gradSpan: {
    background: 'var(--brand-grad)',
    backgroundSize: '300% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'shimmer 4s linear infinite',
  },
  subhead: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.05rem',
    color: 'var(--snow-dim)',
    lineHeight: 1.7,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 24,
    marginTop: 0,
  },
  card: {
    background: 'var(--bg-card)',
    borderRadius: 20,
    border: '1px solid var(--bg-border)',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  imgWrap: {
    height: 200,
    overflow: 'hidden',
    position: 'relative',
    background: 'var(--brand-muted)',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
    display: 'block',
  },
  imgTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    padding: '5px 11px',
    borderRadius: 100,
    background: 'rgba(10,8,8,0.85)',
    color: 'var(--brand-light)',
    backdropFilter: 'blur(8px)',
    border: '1px solid var(--brand-border)',
  },
  imgArrow: {
    position: 'absolute',
    bottom: 10,
    right: 12,
    fontSize: 15,
    background: 'rgba(10,8,8,0.90)',
    borderRadius: '50%',
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--brand-light)',
    border: '1px solid var(--brand-border)',
  },
  cardBody: {
    padding: '20px 24px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  niche: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'var(--snow-muted)',
    marginBottom: 6,
  },
  storeName: {
    fontFamily: 'var(--font-display)',
    fontWeight: 700,
    fontSize: '1.15rem',
    color: 'var(--snow)',
    marginBottom: 10,
    lineHeight: 1.3,
  },
  storeDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'var(--snow-dim)',
    lineHeight: 1.6,
    marginBottom: 'auto',
  },
  cardFoot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
    paddingTop: 14,
    borderTop: '1px solid var(--bg-border)',
  },
  handle: {
    fontFamily: 'var(--font-mono)',
    fontSize: 8,
    letterSpacing: '0.05em',
    padding: '4px 10px',
    borderRadius: 100,
    background: 'var(--brand-muted)',
    color: 'var(--brand-light)',
    border: '1px solid var(--brand-border)',
  },
  platformLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: 9,
    color: 'var(--snow-muted)',
  },
  igBanner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 24,
    marginTop: 48,
    borderRadius: 20,
    overflow: 'hidden',
    background: 'var(--brand-grad)',
    padding: '36px 40px',
    textDecoration: 'none',
    cursor: 'pointer',
    boxShadow: '0 8px 32px var(--brand-glow)',
    border: '1px solid var(--brand-border)',
    transition: 'all 0.3s ease',
  },
  igEyebrow: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.70)',
    marginBottom: 8,
  },
  igH3: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 'clamp(1.2rem, 2.8vw, 1.55rem)',
    color: '#fff',
    marginBottom: 10,
    lineHeight: 1.2,
  },
  igP: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 1.6,
  },
  igRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    flexShrink: 0,
  },
  igBtn: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#fff',
    background: 'rgba(255,255,255,0.18)',
    padding: '8px 18px',
    borderRadius: 100,
    whiteSpace: 'nowrap',
    border: '1px solid rgba(255,255,255,0.30)',
  },
  footNote: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'var(--snow-muted)',
    textAlign: 'center',
    marginTop: 32,
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Portfolio() {
  return (
    <section style={S.page}>
      {/* shimmer keyframe injected once */}
      <style>{`@keyframes shimmer{0%{background-position:-300% center}100%{background-position:300% center}}`}</style>

      <div style={S.inner}>

        {/* ── Header ── */}
        <motion.div
          variants={up(0.05)}
          initial="hidden"
          animate="show"
          style={{ maxWidth: 580, marginBottom: 56 }}
        >
          <span style={S.badge}>Our Work</span>
          <h1 style={S.h1}>
            Stores We've{' '}
            <span style={S.gradSpan}>Built & Scaled</span>
          </h1>
          <p style={S.subhead}>
            Real stores. Real results. Every brand below was built or scaled by
            our team — click to visit them live.
          </p>
        </motion.div>

        {/* ── Store Grid ── */}
        <div style={S.grid}>
          {STORES.map(({ name, niche, url, handle, platform, desc, image }, i) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              variants={up(0.1 + i * 0.08)}
              initial="hidden"
              animate="show"
              style={S.card}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow =
                  '0 20px 40px rgba(213,81,36,0.25)'
                e.currentTarget.style.borderColor = 'var(--brand-border)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'
                e.currentTarget.style.borderColor = 'var(--bg-border)'
              }}
            >
              {/* Image */}
              <div style={S.imgWrap}>
                <img
                  src={image}
                  alt={name}
                  style={S.img}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.08)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                />
                <span style={S.imgTag}>Store</span>
                <span style={S.imgArrow}>↗</span>
              </div>

              {/* Body */}
              <div style={S.cardBody}>
                <p style={S.niche}>{niche}</p>
                <h3 style={S.storeName}>{name}</h3>
                <p style={S.storeDesc}>{desc}</p>
                <div style={S.cardFoot}>
                  <span style={S.handle}>{handle}</span>
                  <span style={S.platformLabel}>{platform}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── Instagram CTA ── */}
        <motion.a
          href="https://www.instagram.com/provengain_strategies?igsh=MTdxdWwwZXdqcWJ0ag=="
          target="_blank"
          rel="noopener noreferrer"
          variants={up(0.55)}
          initial="hidden"
          animate="show"
          style={S.igBanner}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow =
              '0 16px 48px rgba(213,81,36,0.45)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 32px var(--brand-glow)'
          }}
        >
          <div style={{ flex: 1, minWidth: 240 }}>
            <p style={S.igEyebrow}>More Proof & Results</p>
            <h3 style={S.igH3}>Check @provengain_strategies on Instagram</h3>
            <p style={S.igP}>
              Real revenue screenshots, store breakdowns, case studies, and
              client wins — updated regularly. See the results for yourself.
            </p>
          </div>

          <div style={S.igRight}>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <rect width="56" height="56" rx="16" fill="rgba(255,255,255,0.15)" />
              <rect x="14" y="14" width="28" height="28" rx="8" stroke="white" strokeWidth="2.2" fill="none" />
              <circle cx="28" cy="28" r="7" stroke="white" strokeWidth="2.2" fill="none" />
              <circle cx="38" cy="18" r="2.2" fill="white" />
            </svg>
            <span style={S.igBtn}>Follow & See More ↗</span>
          </div>
        </motion.a>

        {/* ── Footer Note ── */}
        <motion.p
          variants={up(0.65)}
          initial="hidden"
          animate="show"
          style={S.footNote}
        >
          Click any store to visit it live · Follow our Instagram for ongoing
          results, case studies & client testimonials
        </motion.p>
      </div>
    </section>
  )
}
