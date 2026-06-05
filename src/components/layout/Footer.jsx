import { Link } from 'react-router-dom'
import { FaInstagram, FaTiktok, FaXTwitter, FaWhatsapp } from 'react-icons/fa6'
import { TbArrowRight } from 'react-icons/tb'
import provLogo from '../../assets/provL.jpeg'

const COLS = {
  Company: [
    { label: 'Home',        to: '/' },
    { label: 'Services',    to: '/services' },
    { label: 'Portfolio',   to: '/portfolio' },
    { label: 'Book a Call', to: '/book-a-call' },
  ],
  Services: [
    { label: 'Store Setup',      to: '/services' },
    { label: 'Product Research', to: '/services' },
    { label: 'Paid Advertising', to: '/services' },
    { label: 'Brand Identity',   to: '/services' },
  ],
}

const SOCIALS = [
  { icon: FaInstagram,  href: 'https://www.instagram.com/provengain_strategies?igsh=MWtidnhpNDE1bTQwZQ%3D%3D&utm_source=qr', label: 'Instagram' },
  { icon: FaTiktok,     href: 'https://www.tiktok.com/@proven.gain.agency?_r=1&_t=ZS-96DP8zMoqRA',                            label: 'TikTok' },
  { icon: FaXTwitter,   href: 'https://x.com/provengain?s=21',                                                               label: 'X' },
  { icon: FaWhatsapp,   href: 'https://wa.me/2349128305158',                                                                 label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-raised)', borderTop: '1px solid var(--bg-border)' }}>

      {/* ── CTA strip ── */}
      <div style={{
        background: 'linear-gradient(135deg, #7a2810 0%, #a33d19 40%, #d55124 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

        <div style={{
          position: 'relative', maxWidth: 1200, margin: '0 auto',
          padding: '3.2rem 1.5rem',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <div>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(1.3rem, 2.4vw, 1.75rem)',
              color: '#fff', marginBottom: 7, letterSpacing: '-0.01em',
            }}>
              Ready to build your profitable store?
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.60)' }}>
              Join entrepreneurs across US, Canada, Australia &amp; Europe.
            </p>
          </div>

          <Link
            to="/book-a-call"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 26px', borderRadius: 100,
              background: '#fff',
              color: '#a33d19',
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14,
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.35)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)' }}
          >
            Book a Free Call <TbArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '3.5rem 1.5rem 2.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '2.5rem',
      }}>

        {/* Brand column */}
        <div style={{ gridColumn: 'span 2' }}>
          <Link to="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 18,
            textDecoration: 'none',
          }}>
            {/* Logo — increased from 38 → 56 */}
            <img
              src={provLogo}
              alt="EcomEvolve"
              style={{ height: 56, width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 13,
            color: 'var(--snow-muted)', lineHeight: 1.75, maxWidth: 260, marginBottom: 24,
          }}>
            We help entrepreneurs build, optimize, and scale profitable Shopify stores
            from day one to $100k months.
          </p>

          {/* Socials */}
          <div style={{ display: 'flex', gap: 9 }}>
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label} href={href} aria-label={label}
                target="_blank" rel="noopener noreferrer"
                style={{
                  width: 36, height: 36, borderRadius: 10,
                  border: '1px solid var(--bg-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--snow-muted)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background  = 'var(--brand-muted)'
                  e.currentTarget.style.borderColor = 'var(--brand-border)'
                  e.currentTarget.style.color       = 'var(--brand-light)'
                  e.currentTarget.style.transform   = 'scale(1.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background  = 'transparent'
                  e.currentTarget.style.borderColor = 'var(--bg-border)'
                  e.currentTarget.style.color       = 'var(--snow-muted)'
                  e.currentTarget.style.transform   = 'scale(1)'
                }}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav columns */}
        {Object.entries(COLS).map(([heading, items]) => (
          <div key={heading}>
            <h4 style={{
              fontFamily: 'var(--font-mono)', fontSize: 9,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--brand-light)', marginBottom: 18,
            }}>
              {heading}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--snow-muted)', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--snow)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--snow-muted)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid var(--bg-border)', padding: '1.1rem 1.5rem' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 8,
        }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--snow-muted)' }}>
            © {new Date().getFullYear()} EcomEvolve. All rights reserved.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--brand)' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--snow-muted)' }}>
              US · CA · AU · EU
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}