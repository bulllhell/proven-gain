import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { TbArrowUpRight } from 'react-icons/tb'

const PILLARS = [
  {
    title: 'Full-Service Execution',
    desc:  'From store setup and branding to paid ads and SEO — one team handles everything end to end.',
  },
  {
    title: 'Data-Driven Decisions',
    desc:  'We validate products, test creatives and optimise conversion before you spend a dollar on inventory.',
  },
  {
    title: 'Operators, Not Just Consultants',
    desc:  "We've launched and scaled our own stores. We bring that firsthand experience to every client we work with.",
  },
]

const up = (d = 0) => ({
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] } },
})

export default function AboutUs() {
  return (
    <section style={{
      background: 'var(--bg-raised)',
      padding: '6rem 0',
      borderTop: '1px solid var(--bg-border)',
      borderBottom: '1px solid var(--bg-border)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.75rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 60,
          alignItems: 'center',
        }}>

          {/* ── Left: copy ── */}
          <div>
            <motion.span
              variants={up(0.05)} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)', fontSize: 9,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                padding: '5px 14px', borderRadius: 100,
                background: 'var(--brand-muted)', border: '1px solid var(--brand-border)',
                color: 'var(--brand-light)', marginBottom: 20,
              }}
            >
              Who We Are
            </motion.span>

            <motion.h2
              variants={up(0.1)} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: 'clamp(1.85rem, 3.4vw, 2.7rem)',
                color: 'var(--snow)', lineHeight: 1.1,
                letterSpacing: '-0.02em', marginBottom: 18,
              }}
            >
              We Build Shopify Stores That{' '}
              <span style={{
                background: 'linear-gradient(120deg, #d55124, #f0a07a)',
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                Actually Sell
              </span>
            </motion.h2>

            <motion.p
              variants={up(0.15)} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{
                fontFamily: 'var(--font-body)', fontSize: 14.5,
                color: 'var(--snow-dim)', lineHeight: 1.78,
                marginBottom: 32, maxWidth: 440,
              }}
            >
              We're a tight-knit team of e-commerce operators, designers and growth strategists.
              We don't just build stores — we run them ourselves, which means everything we do is
              tested, proven and built for real results in the US, Canada, Australia and Europe.
            </motion.p>

            {/* Pillars */}
            <motion.div
              variants={up(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {PILLARS.map(({ title, desc }) => (
                <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: '#d55124', flexShrink: 0, marginTop: 6,
                  }} />
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: 13.5, color: 'var(--snow)', marginBottom: 3,
                    }}>
                      {title}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 12.5,
                      color: 'var(--snow-muted)', lineHeight: 1.65,
                    }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={up(0.28)} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 36, flexWrap: 'wrap' }}
            >
              <Link
                to="/services"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13,
                  padding: '11px 22px', borderRadius: 100,
                  background: 'var(--brand-grad)', color: '#fff',
                  boxShadow: '0 6px 22px rgba(213,81,36,0.36)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 10px 28px rgba(213,81,36,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(213,81,36,0.36)' }}
              >
                See Our Services <TbArrowUpRight size={14} />
              </Link>

              <Link
                to="/book-a-call"
                style={{
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13,
                  color: 'var(--snow-muted)',
                  borderBottom: '1px solid var(--bg-border)',
                  paddingBottom: 1,
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--snow)'; e.currentTarget.style.borderColor = 'var(--snow-muted)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--snow-muted)'; e.currentTarget.style.borderColor = 'var(--bg-border)' }}
              >
                Book a Free Call
              </Link>
            </motion.div>
          </div>

          {/* ── Right: photo ── */}
          <motion.div
            variants={up(0.18)} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', height: 460 }}
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop"
              alt="Our team collaborating"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.85) saturate(0.9)' }}
            />

            {/* Stat badge */}
            <div style={{
              position: 'absolute', bottom: 22, left: 22,
              background: 'rgba(12,11,10,0.82)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 14,
              padding: '14px 18px',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {[['50+', 'Stores Launched'], ['4.2x', 'Avg ROAS']].map(([num, label], i) => (
                  <>
                    <div key={num}>
                      <p style={{
                        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem',
                        background: 'linear-gradient(135deg, #d55124, #f5a585)',
                        WebkitBackgroundClip: 'text', backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        lineHeight: 1, marginBottom: 3,
                      }}>
                        {num}
                      </p>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--snow-muted)' }}>
                        {label}
                      </p>
                    </div>
                    {i === 0 && (
                      <div key="div" style={{ width: 1, height: 38, background: 'rgba(255,255,255,0.1)' }} />
                    )}
                  </>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}