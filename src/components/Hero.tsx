import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)

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
      {/* Background glow */}
      <div className="hero-glow" style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Floating orbs */}
      <div
        className="hero-orb-1"
        style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,113,227,0.14) 0%, transparent 65%)',
          filter: 'blur(64px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        className="hero-orb-2"
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '6%',
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,113,227,0.09) 0%, transparent 65%)',
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Available pill */}
        <motion.div variants={item} style={{ marginBottom: 28 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '7px 16px',
              borderRadius: 980,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              fontSize: 12,
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.02em',
            }}
          >
            <span
              className="pulse-dot"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#0071E3',
                flexShrink: 0,
              }}
            />
            Available for roles · Cape Town · 2025
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p variants={item} className="text-caption" style={{ marginBottom: 28, letterSpacing: '0.18em' }}>
          PRODUCT · FRONTEND · BUILDER
        </motion.p>

        {/* Headline */}
        <motion.h1 variants={item} className="text-hero" style={{ color: 'var(--color-text)', marginBottom: 0 }}>
          I build things
        </motion.h1>
        <motion.h1 variants={item} className="text-hero" style={{ color: 'var(--color-text)', marginBottom: 36 }}>
          that actually{' '}
          <span style={{ color: 'var(--color-blue-primary)' }}>ship.</span>
        </motion.h1>

        {/* Body */}
        <motion.p
          variants={item}
          className="text-body"
          style={{ color: 'var(--color-muted)', marginBottom: 52, maxWidth: 540 }}
        >
          PM thinking. Frontend execution. Real products in production.
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
          >
            See my work
          </a>
          <a href="/cv.pdf" className="btn-secondary" download>
            Download CV
          </a>
        </motion.div>

        {/* Bottom stat strip */}
        <motion.div
          variants={item}
          style={{
            marginTop: 64,
            display: 'flex',
            gap: 0,
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.07)',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden',
          }}
        >
          {[
            { value: '3', label: 'Products shipped' },
            { value: '4K', label: 'How I think' },
            { value: '∞', label: 'Ideas active' },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: '16px 28px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-blue-primary)',
                  lineHeight: 1,
                }}
              >
                {s.value}
              </span>
              <span style={{ fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll chevron */}
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
          gap: 4,
          color: 'var(--color-muted)',
          pointerEvents: 'none',
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
          scroll
        </span>
        <svg className="chevron-bounce" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        background: 'linear-gradient(to bottom, transparent, #000000)',
        zIndex: 3,
        pointerEvents: 'none',
      }} />
    </section>
  )
}
