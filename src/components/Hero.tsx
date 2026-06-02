import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
}

function WordReveal({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i, arr) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <span className="hero-word" style={{ display: 'inline-block' }}>
            {word}
          </span>
          {i < arr.length - 1 && ' '}
        </span>
      ))}
    </>
  )
}

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)
  const headlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const words = document.querySelectorAll<HTMLElement>('.hero-word')
    if (!words.length) return
    gsap.fromTo(
      words,
      { y: '110%' },
      { y: '0%', stagger: 0.055, duration: 1.1, ease: 'power4.out', delay: 0.2 }
    )
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
        background: 'transparent',
        overflow: 'hidden',
        zIndex: 2,
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      {/* Dark vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.85) 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Subtle grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,113,227,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,113,227,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          zIndex: 0,
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Top-left availability label */}
      <div
        style={{
          position: 'absolute',
          top: 'clamp(80px, 10vw, 120px)',
          left: 'clamp(24px, 6vw, 80px)',
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          className="pulse-dot"
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: '#22c55e',
            flexShrink: 0,
            boxShadow: '0 0 8px #22c55e',
          }}
        />
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
          }}
        >
          Available for roles · Nigeria · 2026
        </span>
      </div>

      {/* Content */}
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Headline */}
        <div ref={headlineRef} style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(72px, 12vw, 148px)',
              fontWeight: 200,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: 'rgba(255,255,255,0.55)',
              textAlign: 'center',
              marginBottom: 0,
            }}
          >
            <WordReveal text="I build things" />
          </h1>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(72px, 12vw, 148px)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              color: '#fff',
              textAlign: 'center',
              marginBottom: 40,
            }}
          >
            <WordReveal text="that actually ship." />
          </h1>
        </div>

        {/* Body */}
        <motion.p
          variants={item}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.45)',
            marginBottom: 52,
            maxWidth: 460,
            lineHeight: 1.65,
            textAlign: 'center',
          }}
        >
          I approach products as systems — where user behavior, retention, and business incentives intersect. I've been building at that intersection since year two.
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
              const el = document.getElementById('iphone-section')
              if (!el) return
              const lenis = (window as any).__lenis
              lenis ? lenis.scrollTo(el) : el.scrollIntoView({ behavior: 'smooth' })
            }}
            style={{ fontWeight: 700, fontSize: 15 }}
          >
            See my work
          </a>
          <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            View Resume
          </a>
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
