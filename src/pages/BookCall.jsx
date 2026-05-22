import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  RiCalendarLine,
  RiCheckboxCircleFill,
  RiArrowRightUpLine,
  RiUserLine,
  RiMailLine,
  RiPhoneLine,
  RiStore2Line,
  RiMessage2Line,
  RiInstagramLine,
  RiWhatsappLine,
  RiTimeLine,
  RiShieldCheckLine,
  RiStarFill,
  RiCloseLine,
} from 'react-icons/ri'
import { SiShopify } from 'react-icons/si'

// ── Data ──────────────────────────────────────────────────────
const services = [
  'Shopify Store Setup',
  'Brand Identity & Logo',
  'Growth Funnels',
  'Social Media Marketing',
  'SEO & Paid Ads',
  'Email Marketing (Klaviyo)',
  'Custom / Not Sure Yet',
]

const budgets = [
  'Under $300',
  '$300 – $500',
  '$500 – $1,000',
  '$1,000+',
  'Not sure yet',
]

const steps = [
  {
    icon: RiCalendarLine,
    title: 'Book Your Call',
    desc: 'Fill the form and pick a time that works for you.',
  },
  {
    icon: RiMessage2Line,
    title: 'Discovery Session',
    desc: 'We talk about your brand, goals, and what you need to grow.',
  },
  {
    icon: RiStore2Line,
    title: 'Get Your Plan',
    desc: 'We map out a clear strategy and recommend the best package or custom solution.',
  },
  {
    icon: RiArrowRightUpLine,
    title: 'We Execute',
    desc: 'Once you\'re in, we get to work — fast, focused, and results-driven.',
  },
]

const perks = [
  { icon: RiShieldCheckLine, text: '100% free, zero obligation' },
  { icon: RiTimeLine,        text: '30-minute focused session' },
  { icon: RiStarFill,        text: 'Tailored advice for your brand' },
  { icon: SiShopify,         text: 'Shopify & e-commerce experts' },
]

// ── Variants ──────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
}

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
}

// ── Form Field ────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[var(--warm)] text-xs font-semibold uppercase tracking-wider">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs mt-0.5">{error}</p>
      )}
    </div>
  )
}

const inputClass =
  'bg-[var(--bg-raised)] border border-[var(--bg-border)] focus:border-[var(--brand)]/50 focus:ring-1 focus:ring-[var(--brand)]/20 text-[var(--snow)] placeholder-[var(--snow-muted)] text-sm px-4 py-3 rounded-xl outline-none transition-all duration-200 w-full'

// ── Success Screen ────────────────────────────────────────────
function SuccessScreen({ name, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center text-center gap-6 py-10"
    >
      {/* Animated check */}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center text-3xl text-emerald-400">
          <RiCheckboxCircleFill />
        </div>
        <div className="absolute inset-0 rounded-full border border-emerald-400/20 animate-ping" />
      </div>

      <div className="flex flex-col gap-2">
        <h3
          className="text-[var(--snow)] font-black text-2xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          You're booked, {name}! 🎉
        </h3>
        <p className="text-[var(--snow-muted)] text-sm leading-relaxed max-w-sm mx-auto">
          We've received your request and will reach out within <strong className="text-[var(--warm)]">24 hours</strong> to confirm your call time. Check your inbox and WhatsApp.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-2">
        <a
          href="https://www.instagram.com/proven_gain"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-[var(--brand)]/30 hover:border-[var(--brand)]/60 text-[var(--warm)] hover:text-[var(--snow)] font-semibold px-5 py-2.5 rounded-full transition-all duration-300 text-sm"
        >
          <RiInstagramLine className="text-[var(--brand)]" />
          Follow on Instagram
        </a>
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-[var(--snow-muted)] hover:text-[var(--warm)] font-medium text-sm transition-colors"
        >
          Submit another request
        </button>
      </div>
    </motion.div>
  )
}

// ── Main Page ─────────────────────────────────────────────────
export default function BookCall() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', business: '',
    service: '', budget: '', message: '', preferredTime: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    if (errors[key]) setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim())   e.email   = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.service)        e.service = 'Please select a service'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/payments/booking`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setSubmitted(true)
    } catch (err) {
      setErrors({ submit: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen">

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[var(--brand)]/05 blur-[120px] rounded-full pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(var(--snow) 1px, transparent 1px), linear-gradient(90deg, var(--snow) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto"
          >
            <motion.span variants={fadeUp} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand)] bg-[var(--brand)]/10 border border-[var(--brand)]/20 px-4 py-2 rounded-full">
              <RiCalendarLine />
              Free Discovery Call
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl font-black text-[var(--snow)] leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let's Build Your{' '}
              <span
                style={{
                  background: 'linear-gradient(120deg, var(--brand-light), var(--warm))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Brand Together
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[var(--snow-muted)] text-base leading-relaxed max-w-lg">
              Book a free 30-minute call. No pitch, no pressure — just a real conversation about your brand and how we can grow it.
            </motion.p>

            {/* Perks */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 pt-1">
              {perks.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5 text-[var(--warm)] text-xs font-medium">
                  <Icon className="text-[var(--brand)] text-sm" />
                  {text}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="pb-28">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">

            {/* ── Left: Process + contact ── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="lg:sticky lg:top-28 flex flex-col gap-8"
            >

              {/* How it works */}
              <div className="flex flex-col gap-5">
                <h3
                  className="text-[var(--snow)] font-bold text-lg"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  How It Works
                </h3>
                <div className="flex flex-col gap-4">
                  {steps.map(({ icon: Icon, title, desc }, i) => (
                    <div key={title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
                          style={{ background: 'rgba(232,99,26,0.15)', color: 'var(--brand)' }}
                        >
                          <Icon />
                        </div>
                        {i < steps.length - 1 && (
                          <div className="w-px flex-1 bg-gradient-to-b from-[var(--brand)]/30 to-transparent mt-2" />
                        )}
                      </div>
                      <div className="pb-4">
                        <p className="text-[var(--snow)] font-semibold text-sm mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
                          {title}
                        </p>
                        <p className="text-[var(--snow-muted)] text-xs leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-[var(--brand)]/20 via-[var(--snow)]/05 to-transparent" />

              {/* Social contact */}
              <div className="flex flex-col gap-4">
                <h3
                  className="text-[var(--snow)] font-bold text-sm"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Or reach out directly
                </h3>
                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/message/your-whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--bg-border)] hover:border-emerald-400/30 rounded-xl px-4 py-3 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-400/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <RiWhatsappLine className="text-lg" />
                    </div>
                    <div>
                      <p className="text-[var(--snow)] font-semibold text-sm">WhatsApp</p>
                      <p className="text-[var(--snow-muted)] text-xs">Quick replies, usually within 1hr</p>
                    </div>
                    <RiArrowRightUpLine className="ml-auto text-[var(--snow-muted)] group-hover:text-[var(--brand)] transition-colors" />
                  </a>

                  <a
                    href="https://www.instagram.com/proven_gain"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--bg-border)] hover:border-[var(--brand)]/30 rounded-xl px-4 py-3 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[var(--brand)]/10 flex items-center justify-center text-[var(--brand)] group-hover:scale-110 transition-transform">
                      <RiInstagramLine className="text-lg" />
                    </div>
                    <div>
                      <p className="text-[var(--snow)] font-semibold text-sm">@proven_gain</p>
                      <p className="text-[var(--snow-muted)] text-xs">DM us on Instagram</p>
                    </div>
                    <RiArrowRightUpLine className="ml-auto text-[var(--snow-muted)] group-hover:text-[var(--brand)] transition-colors" />
                  </a>

                  <a
                    href="mailto:hello@proven-gain.com"
                    className="flex items-center gap-3 bg-[var(--bg-card)] border border-[var(--bg-border)] hover:border-[var(--warm)]/30 rounded-xl px-4 py-3 transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[var(--warm)]/10 flex items-center justify-center text-[var(--warm)] group-hover:scale-110 transition-transform">
                      <RiMailLine className="text-lg" />
                    </div>
                    <div>
                      <p className="text-[var(--snow)] font-semibold text-sm">Email Us</p>
                      <p className="text-[var(--snow-muted)] text-xs">hello@proven-gain.com</p>
                    </div>
                    <RiArrowRightUpLine className="ml-auto text-[var(--snow-muted)] group-hover:text-[var(--brand)] transition-colors" />
                  </a>
                </div>
              </div>

            </motion.div>

            {/* ── Right: Form ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="relative rounded-3xl border border-[var(--brand)]/15 bg-[var(--bg-card)] overflow-hidden">
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--brand)] to-transparent" />

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <SuccessScreen
                        key="success"
                        name={form.name.split(' ')[0]}
                        onReset={() => {
                          setSubmitted(false)
                          setForm({ name: '', email: '', phone: '', business: '', service: '', budget: '', message: '', preferredTime: '' })
                        }}
                      />
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5"
                      >
                        <div className="mb-1">
                          <h2 className="text-[var(--snow)] font-black text-xl mb-1" style={{ fontFamily: "var(--font-display)" }}>
                            Book Your Free Call
                          </h2>
                          <p className="text-[var(--snow-muted)] text-xs">Fill this in and we'll confirm your time within 24 hours.</p>
                        </div>

                        {/* Name + Email */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field label="Full Name *" error={errors.name}>
                            <div className="relative">
                              <RiUserLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--snow-muted)] text-sm" />
                              <input
                                type="text"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={e => set('name', e.target.value)}
                                className={`${inputClass} pl-9 ${errors.name ? 'border-red-500/50' : ''}`}
                              />
                            </div>
                          </Field>

                          <Field label="Email Address *" error={errors.email}>
                            <div className="relative">
                              <RiMailLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--snow-muted)] text-sm" />
                              <input
                                type="email"
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={e => set('email', e.target.value)}
                                className={`${inputClass} pl-9 ${errors.email ? 'border-red-500/50' : ''}`}
                              />
                            </div>
                          </Field>
                        </div>

                        {/* Phone + Business */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field label="WhatsApp / Phone">
                            <div className="relative">
                              <RiPhoneLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--snow-muted)] text-sm" />
                              <input
                                type="tel"
                                placeholder="+1 234 567 8900"
                                value={form.phone}
                                onChange={e => set('phone', e.target.value)}
                                className={`${inputClass} pl-9`}
                              />
                            </div>
                          </Field>

                          <Field label="Business / Brand Name">
                            <div className="relative">
                              <RiStore2Line className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--snow-muted)] text-sm" />
                              <input
                                type="text"
                                placeholder="Your Brand Co."
                                value={form.business}
                                onChange={e => set('business', e.target.value)}
                                className={`${inputClass} pl-9`}
                              />
                            </div>
                          </Field>
                        </div>

                        {/* Service */}
                        <Field label="Service You're Interested In *" error={errors.service}>
                          <div className="flex flex-wrap gap-2">
                            {services.map(s => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => set('service', s)}
                                className={`text-xs font-semibold px-3.5 py-2 rounded-full border transition-all duration-200
                                  ${form.service === s
                                    ? 'bg-[var(--brand)] border-[var(--brand)] text-white shadow-lg shadow-[var(--brand)]/25'
                                    : 'bg-transparent border-[var(--white-muted)] text-[var(--snow-muted)] hover:border-[var(--brand)]/40 hover:text-[var(--warm)]'
                                  }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                          {errors.service && <p className="text-red-400 text-xs">{errors.service}</p>}
                        </Field>

                        {/* Budget */}
                        <Field label="Approximate Budget">
                          <div className="flex flex-wrap gap-2">
                            {budgets.map(b => (
                              <button
                                key={b}
                                type="button"
                                onClick={() => set('budget', b)}
                                className={`text-xs font-semibold px-3.5 py-2 rounded-full border transition-all duration-200
                                  ${form.budget === b
                                    ? 'bg-[var(--warm)]/15 border-[var(--warm)]/60 text-[var(--warm)]'
                                    : 'bg-transparent border-[var(--white-muted)] text-[var(--snow-muted)] hover:border-[var(--warm)]/30 hover:text-[var(--warm)]'
                                  }`}
                              >
                                {b}
                              </button>
                            ))}
                          </div>
                        </Field>

                        {/* Preferred time */}
                        <Field label="Preferred Call Time">
                          <input
                            type="text"
                            placeholder="e.g. Weekdays after 5pm GMT, or weekends"
                            value={form.preferredTime}
                            onChange={e => set('preferredTime', e.target.value)}
                            className={inputClass}
                          />
                        </Field>

                        {/* Message */}
                        <Field label="Tell Us About Your Brand">
                          <textarea
                            rows={4}
                            placeholder="What are you building? Where are you stuck? What's your goal in the next 90 days?"
                            value={form.message}
                            onChange={e => set('message', e.target.value)}
                            className={`${inputClass} resize-none`}
                          />
                        </Field>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-light)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-full transition-all duration-300 shadow-xl shadow-[var(--brand)]/30 hover:-translate-y-0.5 text-sm mt-1"
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <RiCalendarLine className="text-base" />
                              Book My Free Call
                              <RiArrowRightUpLine />
                            </>
                          )}
                        </button>

                        {/* Footer note */}
                        <p className="text-[var(--snow-muted)] text-[11px] text-center leading-relaxed">
                          By submitting, you agree to be contacted via email or WhatsApp to confirm your session. No spam, ever.
                        </p>

                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  )
}