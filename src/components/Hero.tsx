import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
}

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()
  const orb1Y = useTransform(scrollY, [0, 600], [0, -80])
  const orb2Y = useTransform(scrollY, [0, 600], [0, -50])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className="always-dark"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        overflow: 'hidden',
        zIndex: 2,
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      {/* Subtle grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,113,227,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,113,227,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          zIndex: 0,
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Background radial glow */}
      <div className="hero-glow" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Parallax orbs — max-width clamped so they never overflow mobile */}
      <motion.div
        style={{
          y: orb1Y,
          position: 'absolute',
          top: '10%',
          left: '-5%',
          width: 'min(480px, 100vw)',
          height: 'min(480px, 100vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,113,227,0.16) 0%, transparent 65%)',
          filter: 'blur(72px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        className="hero-orb-1"
        aria-hidden
      />
      <motion.div
        style={{
          y: orb2Y,
          position: 'absolute',
          bottom: '15%',
          right: '-5%',
          width: 'min(360px, 80vw)',
          height: 'min(360px, 80vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,80,200,0.1) 0%, transparent 65%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        className="hero-orb-2"
        aria-hidden
      />

      {/* Content */}
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Available pill */}
        <motion.div variants={item} style={{ marginBottom: 32 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 18px',
              borderRadius: 980,
              border: '1px solid rgba(0,113,227,0.25)',
              background: 'rgba(0,113,227,0.07)',
              backdropFilter: 'blur(12px)',
              fontSize: 12,
              color: 'rgba(0,160,255,0.85)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.04em',
              fontWeight: 500,
            }}
          >
            <span
              className="pulse-dot"
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#0071E3', flexShrink: 0 }}
            />
            Available for roles · Cape Town · 2025
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          variants={item}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Product · Frontend · Builder
        </motion.p>

        {/* Headline — mixed weights for visual impact */}
        <motion.h1
          variants={item}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 9vw, 104px)',
            fontWeight: 300,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            marginBottom: 0,
          }}
        >
          I build things
        </motion.h1>
        <motion.h1
          variants={item}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 9vw, 104px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: '#fff',
            textAlign: 'center',
            marginBottom: 36,
          }}
        >
          that actually{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #0071E3 0%, #3BA0FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ship.
          </span>
        </motion.h1>

        {/* Body */}
        <motion.p
          variants={item}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.45)',
            marginBottom: 52,
            maxWidth: 520,
            lineHeight: 1.65,
            textAlign: 'center',
          }}
        >
          PM thinking. Frontend execution. I don't wait for permission to build. I've been shipping real products since year two of university.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <a
            href="#iphone-section"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('iphone-section')?.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{ fontWeight: 700, fontSize: 15 }}
          >
            See my work
          </a>
          <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            View Resume
          </a>
        </motion.div>

        {/* Bottom stat strip */}
        <motion.div
          variants={item}
          style={{
            marginTop: 72,
            display: 'flex',
            gap: 0,
            borderRadius: 18,
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.025)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
          }}
        >
          {[
            { value: '3', label: 'Products shipped' },
            { value: '4K', label: 'Thinking in 4K' },
            { value: '∞', label: 'Ideas never stop' },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: '18px 32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  background: 'linear-gradient(135deg, #0071E3 0%, #3BA0FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'nowrap',
                  fontWeight: 400,
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          bottom: 36,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          color: 'rgba(255,255,255,0.25)',
          pointerEvents: 'none',
        }}
      >
        <span style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
          scroll
        </span>
        <svg className="chevron-bounce" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>

      {/* Bottom fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 140,
          background: 'linear-gradient(to bottom, transparent, #000)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}
