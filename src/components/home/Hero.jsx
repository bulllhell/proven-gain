import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { TbTrendingUp, TbShoppingCart, TbStar, TbShieldCheck } from 'react-icons/tb'

/* ─── animation presets ────────────────────────────── */
const up = (d = 0) => ({
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] } },
})
const right = (d = 0) => ({
  hidden: { opacity: 0, x: 36 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.75, delay: d, ease: [0.22, 1, 0.36, 1] } },
})

/* ═══════════════════════════════════════════════════
   CHART — always strictly increasing
═══════════════════════════════════════════════════ */
const MONTHS = ['J','F','M','A','M','J','J','A','S','O','N','D']

function genUptrend(seed = 0) {
  const points = []
  let val = 12 + (seed % 7)
  for (let i = 0; i < 12; i++) {
    const step = 5.5 + (seed % 3)
    const jitter = Math.sin(seed * 1.3 + i) * 2.5
    val += step + Math.abs(jitter)
    points.push(Math.min(val, 100))
  }
  return points
}

function buildPath(data, W, H, pad = 16) {
  const uw = W - pad * 2
  const uh = H - pad * 2
  const mn = data[0]
  const mx = data[data.length - 1]
  const range = mx - mn || 1
  const coords = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * uw,
    y: pad + uh - ((v - mn) / range) * uh,
  }))
  let d = `M ${coords[0].x.toFixed(1)} ${coords[0].y.toFixed(1)}`
  for (let i = 1; i < coords.length; i++) {
    const cp1x = (coords[i - 1].x + coords[i].x) / 2
    d += ` C ${cp1x.toFixed(1)} ${coords[i-1].y.toFixed(1)} ${cp1x.toFixed(1)} ${coords[i].y.toFixed(1)} ${coords[i].x.toFixed(1)} ${coords[i].y.toFixed(1)}`
  }
  return { path: d, coords }
}

function buildArea(data, W, H, pad = 16) {
  const { path, coords } = buildPath(data, W, H, pad)
  const lastX = coords[coords.length - 1].x
  const firstX = coords[0].x
  const bottom = H - pad + 3
  return `${path} L ${lastX.toFixed(1)} ${bottom} L ${firstX.toFixed(1)} ${bottom} Z`
}

/* ── SVG Line Chart ── */
function LiveChart({ data }) {
  const W = 320, H = 110, pad = 16
  const { path: linePath, coords } = buildPath(data, W, H, pad)
  const area = buildArea(data, W, H, pad)
  const lastPt = coords[coords.length - 1]
  const [pathKey, setPathKey] = useState(0)
  useEffect(() => { setPathKey(k => k + 1) }, [data])

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        {/* Orange-red area gradient */}
        <linearGradient id="og-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#d55124" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#d55124" stopOpacity="0.00" />
        </linearGradient>
        {/* Orange-red line gradient */}
        <linearGradient id="og-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#a33d19" />
          <stop offset="55%"  stopColor="#d55124" />
          <stop offset="100%" stopColor="#e8714a" />
        </linearGradient>
        <filter id="og-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {[0.3, 0.6].map((t, i) => (
        <line key={i}
          x1={pad} y1={H * t} x2={W - pad} y2={H * t}
          stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 5"
        />
      ))}

      <path d={area} fill="url(#og-area)" />

      <path
        key={pathKey}
        d={linePath}
        fill="none"
        stroke="url(#og-line)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#og-glow)"
        style={{
          strokeDasharray: 1200,
          strokeDashoffset: 0,
          animation: 'dash-in 1.2s ease forwards',
        }}
      />

      {coords.filter((_, i) => i % 2 === 0).map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={2.5} fill="rgba(213,81,36,0.50)" />
      ))}

      <circle
        cx={lastPt.x} cy={lastPt.y} r={5}
        fill="#d55124" stroke="rgba(255,255,255,0.18)" strokeWidth="2"
        filter="url(#og-glow)"
        style={{ animation: 'pulse-last 2s ease-in-out infinite' }}
      />

      <style>{`
        @keyframes dash-in {
          from { stroke-dashoffset: 1200; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes pulse-last {
          0%,100% { r: 5; opacity: 1; }
          50%      { r: 6.5; opacity: 0.75; }
        }
      `}</style>
    </svg>
  )
}

/* ── Bar Chart ── */
function BarRow({ data }) {
  const max = data[data.length - 1]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 40 }}>
      {data.map((v, i) => {
        const pct = (v / max) * 100
        const isLast = i === data.length - 1
        return (
          <div key={i} style={{
            flex: 1,
            height: `${Math.max(pct, 8)}%`,
            borderRadius: '3px 3px 1px 1px',
            background: isLast
              ? 'linear-gradient(180deg, #e8714a 0%, #d55124 100%)'
              : `rgba(213,81,36,${0.10 + (pct / 100) * 0.30})`,
            boxShadow: isLast ? '0 0 8px rgba(213,81,36,0.40)' : 'none',
            transition: 'height 0.6s ease',
          }} />
        )
      })}
    </div>
  )
}

/* ── Dashboard ── */
function Dashboard() {
  const [seed,   setSeed]   = useState(0)
  const [data,   setData]   = useState(() => genUptrend(0))
  const [rev,    setRev]    = useState(128_400)
  const [orders, setOrders] = useState(3_241)
  const [roas,   setRoas]   = useState(4.2)
  const [yoy,    setYoy]    = useState(186)

  useEffect(() => {
    const id = setInterval(() => {
      setSeed(s => {
        const ns = s + 1
        setData(genUptrend(ns))
        return ns
      })
      setRev(v    => v + Math.round(800  + Math.random() * 1200))
      setOrders(v => v + Math.round(8    + Math.random() * 20))
      setRoas(v   => parseFloat(Math.min(8, v + Math.random() * 0.2).toFixed(1)))
      setYoy(v    => v + Math.round(Math.random() * 3))
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const fmt = v => `$${(v / 1000).toFixed(1)}k`

  return (
    <div style={{
      background: '#161111',
      borderRadius: 18,
      border: '1px solid rgba(213,81,36,0.20)',
      boxShadow: '0 4px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px 12px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--snow-muted)', marginBottom: 4,
          }}>
            EcomEvolve · Revenue
          </p>
          <p style={{
            fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.3rem',
            color: 'var(--snow)', letterSpacing: '-0.02em',
          }}>
            {fmt(rev)}
          </p>
        </div>
        {/* YoY badge — orange-red accent */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 11px', borderRadius: 100,
          background: 'var(--brand-muted)', border: '1px solid var(--brand-border)',
          fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--brand-light)',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--brand)',
            animation: 'pulseB 2s ease-in-out infinite',
          }} />
          +{yoy}% YoY
        </div>
      </div>

      {/* Line chart */}
      <div style={{ padding: '12px 16px 4px' }}>
        <LiveChart data={data} />
      </div>

      {/* Month labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 20px 10px' }}>
        {MONTHS.filter((_, i) => i % 2 === 0).map((m, i) => (
          <span key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: 8, color: 'var(--snow-muted)' }}>{m}</span>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ padding: '0 20px 12px' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--snow-muted)', marginBottom: 7,
        }}>
          Orders / Month
        </p>
        <BarRow data={data} />
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { label: 'Orders', value: orders.toLocaleString() },
          { label: 'AOV',    value: '$43.2',    up: '+8%' },
          { label: 'ROAS',   value: `${roas}×`, up: '+0.2' },
        ].map(({ label, value, up: u }, i) => (
          <div key={label} style={{
            padding: '10px 12px', textAlign: 'center',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 8, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--snow-muted)', marginBottom: 4,
            }}>{label}</p>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '0.95rem', color: 'var(--snow)',
            }}>{value}</p>
            {u && (
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 9,
                color: 'var(--brand-light)', marginTop: 2,
              }}>↑ {u}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Floating Toast ── */
function Toast({ icon: Icon, title, sub, accent, delay, pos }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute', ...pos,
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 13px', borderRadius: 12,
        background: '#161111',
        border: '1px solid rgba(213,81,36,0.18)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.55)',
        minWidth: 190, zIndex: 10,
      }}
    >
      <div style={{
        width: 28, height: 28, borderRadius: 8, flexShrink: 0,
        background: `${accent}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={13} color={accent} />
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, color: 'var(--snow)' }}>{title}</p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--snow-muted)' }}>{sub}</p>
      </div>
    </motion.div>
  )
}

/* ── Ticker ── */
const TICKS = [
  '50+ Stores Built','★ 5.0 Rating','USA · Canada · Australia · Europe',
  'First Sales in 14 Days','Full-Service Team','Shopify Experts',
  '50+ Stores Built','★ 5.0 Rating','USA · Canada · Australia · Europe',
  'First Sales in 14 Days','Full-Service Team','Shopify Experts',
]

function Ticker() {
  return (
    <div style={{
      overflow: 'hidden',
      borderTop: '1px solid rgba(213,81,36,0.12)',
      padding: '11px 0',
    }}>
      <div style={{
        display: 'flex', gap: 44, whiteSpace: 'nowrap',
        width: 'max-content', animation: 'ticker 26s linear infinite',
      }}>
        {TICKS.map((t, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--snow-muted)',
          }}>
            <span style={{
              width: 4, height: 4, borderRadius: '50%',
              background: 'var(--brand)', flexShrink: 0,
            }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   HERO — MAIN EXPORT
═══════════════════════════════════════════════════ */
export default function Hero() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 40)
    return () => clearTimeout(t)
  }, [])

  return (
    <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>

      {/* Dot grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.028) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }} />

      {/* Orange-red glow — shifted to match brand */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 60% at 68% 40%, rgba(213,81,36,0.09) 0%, transparent 62%)',
      }} />

      {/* Subtle warm vignette at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
        pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(163,61,25,0.04) 0%, transparent 100%)',
      }} />

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 1.5rem 40px', width: '100%' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── LEFT: Copy ── */}
            <div>

              {/* Eyebrow pill */}
              <motion.div variants={up(0.05)} initial="hidden" animate={ready ? 'show' : 'hidden'} style={{ marginBottom: 20 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.20em',
                  textTransform: 'uppercase',
                  padding: '6px 14px', borderRadius: 100,
                  background: 'var(--brand-muted)', border: '1px solid var(--brand-border)',
                  color: 'var(--brand-light)',
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: 'var(--brand)',
                    animation: 'pulseB 2s ease-in-out infinite',
                  }} />
                  Shopify Growth Partners
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={up(0.13)} initial="hidden" animate={ready ? 'show' : 'hidden'}
                style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: 'clamp(2.4rem, 4.8vw, 4.2rem)',
                  lineHeight: 1.07, letterSpacing: '-0.02em',
                  color: 'var(--snow)', marginBottom: 20,
                }}
              >
                Launch. Scale.{' '}
                <span className="text-brand-grad">Dominate</span>
                <br />Your Market.
              </motion.h1>

              {/* Sub-copy */}
              <motion.p
                variants={up(0.21)} initial="hidden" animate={ready ? 'show' : 'hidden'}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '1.05rem',
                  lineHeight: 1.72, color: 'var(--snow-dim)',
                  maxWidth: 420, marginBottom: 30,
                }}
              >
                We build, optimize, and scale Shopify stores for entrepreneurs in the US,
                Canada, Australia &amp; Europe — from first product to first $100k month.
              </motion.p>

              {/* CTAs */}
              <motion.div
                variants={up(0.29)} initial="hidden" animate={ready ? 'show' : 'hidden'}
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}
              >
                <Link
                  to="/book-a-call"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14,
                    padding: '12px 26px', borderRadius: 100,
                    background: 'var(--brand-grad)', color: '#fff',
                    boxShadow: '0 6px 24px rgba(213,81,36,0.38)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.04)'
                    e.currentTarget.style.boxShadow = '0 10px 32px rgba(213,81,36,0.52)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(213,81,36,0.38)'
                  }}
                >
                  Start My Store <HiArrowRight size={15} />
                </Link>

                <Link
                  to="/#packages"
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
                    padding: '11px 22px', borderRadius: 100,
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'var(--snow-dim)',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--brand-border)'
                    e.currentTarget.style.color = 'var(--brand-bright)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                    e.currentTarget.style.color = 'var(--snow-dim)'
                  }}
                >
                  View Packages
                </Link>
              </motion.div>

              {/* Social proof */}
              <motion.div
                variants={up(0.37)} initial="hidden" animate={ready ? 'show' : 'hidden'}
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 18 }}
              >
                {/* Avatars */}
                <div style={{ display: 'flex' }}>
                  {['#d55124','#a33d19','#e8714a','#f5a585','#c97a5a'].map((c, i) => (
                    <div key={i} style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: c, border: '2px solid var(--bg)',
                      marginLeft: i === 0 ? 0 : -8, zIndex: 5 - i,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 10, color: '#fff',
                    }}>
                      {['J','M','S','R','K'][i]}
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <TbStar key={i} size={12} color="#e8714a" style={{ fill: '#e8714a' }} />
                    ))}
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: 10,
                      color: 'var(--snow-muted)', marginLeft: 5,
                    }}>5.0</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--snow-muted)' }}>
                    Trusted by 50+ entrepreneurs
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <TbShieldCheck size={14} color="var(--brand-light)" />
                  <span style={{
                    fontFamily: 'var(--font-body)', fontWeight: 500,
                    fontSize: 12, color: 'var(--snow-muted)',
                  }}>
                    Shopify Certified
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Dashboard ── */}
            <motion.div
              variants={right(0.25)} initial="hidden" animate={ready ? 'show' : 'hidden'}
              style={{ position: 'relative', paddingTop: 20, paddingBottom: 20 }}
            >
              <Dashboard />

              <Toast
                icon={TbShoppingCart}
                title="New Order — $127"
                sub="Austin, TX · just now"
                accent="#d55124"
                delay={1.3}
                pos={{ top: -14, right: 0 }}
              />
              <Toast
                icon={TbTrendingUp}
                title="Monthly Goal Reached 🎯"
                sub="+186% revenue this year"
                accent="#e8714a"
                delay={1.7}
                pos={{ bottom: 0, left: -10 }}
              />
            </motion.div>

          </div>
        </div>

        <Ticker />
      </div>
    </section>
  )
}