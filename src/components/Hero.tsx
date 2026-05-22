import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  }

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {/* Radial glow */}
      <div
        className="hero-glow"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 900,
        }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="text-caption"
          style={{ marginBottom: 32, letterSpacing: '0.2em' }}
        >
          PRODUCT · FRONTEND · BUILDER
        </motion.p>

        {/* Hero headline */}
        <motion.h1 variants={item} className="text-hero" style={{ color: 'var(--color-text)', marginBottom: 0 }}>
          I build things
        </motion.h1>
        <motion.h1
          variants={item}
          className="text-hero"
          style={{ color: 'var(--color-text)', marginBottom: 32 }}
        >
          that actually{' '}
          <span style={{ color: 'var(--color-blue-primary)' }}>ship.</span>
        </motion.h1>

        {/* Body copy */}
        <motion.p
          variants={item}
          className="text-body"
          style={{ color: 'var(--color-muted)', marginBottom: 48, maxWidth: 560 }}
        >
          PM thinking. Frontend execution. Real products in production.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
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
      </motion.div>

      {/* Scroll chevron */}
      <motion.div
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          color: 'var(--color-muted)',
        }}
      >
        <span style={{ fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'var(--font-body)' }}>
          scroll
        </span>
        <svg className="chevron-bounce" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  )
}
