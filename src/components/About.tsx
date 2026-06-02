import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LocationWidget } from './WidgetRow'

gsap.registerPlugin(ScrollTrigger)

const storyLines = [
  'Final year cybersecurity student.',
  'I shipped my first SaaS in year two. Nobody asked me to.',
  'ApeAcademy processes real payments.',
  'Real students. Real assignments.',
  'I look for friction users have normalized. That\'s where the product opportunity lives.',
  'I model user journeys end-to-end before touching the solution space.',
  'Checkout abandonment is almost never a payment problem. It\'s a trust problem built upstream.',
  'Every product decision on ApeAcademy was mine to frame and defend.',
  'The most valuable problems are the ones that haven\'t been named yet.',
  'Then I frame it: problem, root cause, proposed intervention, expected impact.',
  'Nigeria. Actively looking.',
  'Let\'s build something.',
]

const stats = [
  { value: 3, suffix: '', label: 'Products live', color: '#0071E3' },
  { value: 4, suffix: 'K', label: 'I see in 4K', color: '#40A0FF' },
  { value: 5, suffix: '+', label: 'Pitches sent cold', color: '#0071E3' },
  { value: 2, suffix: '', label: 'Roles targeting', color: '#40A0FF' },
]

function useCountUp(target: number, inView: boolean, duration = 1400) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])
  return count
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCountUp(stat.value, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-3d glow-hover animated-border"
      style={{
        padding: '28px 22px',
        borderRadius: 20,
        border: '1px solid var(--color-border)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle inner glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${stat.color}55, transparent)`,
        pointerEvents: 'none',
      }} />
      <span
        className="count-up"
        style={{
          fontSize: 'clamp(40px, 6vw, 60px)',
          fontWeight: 800,
          fontFamily: 'var(--font-display)',
          background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}99 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        {count}{stat.suffix}
      </span>
      <span style={{ fontSize: 11, color: 'var(--color-muted)', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {stat.label}
      </span>
    </motion.div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const linesRef = useRef<HTMLParagraphElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      linesRef.current.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0.06 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: line,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 0.8,
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-black)',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div className="about-grid">
        {/* Left: story lines — each fades in on scroll */}
        <div className="about-sticky">
          <p className="text-caption" style={{ marginBottom: 36, letterSpacing: '0.18em' }}>
            THE STORY
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {storyLines.map((line, i) => (
              <p
                key={i}
                ref={(el) => { if (el) linesRef.current[i] = el }}
                style={{
                  fontSize: 'clamp(18px, 2.6vw, 32px)',
                  fontWeight: i % 3 === 0 ? 700 : 300,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text)',
                  opacity: 0.06,
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em',
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Right: stats + bio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 'clamp(0px, 4vw, 80px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glow-hover"
            style={{
              padding: '28px 24px',
              borderRadius: 20,
              border: '1px solid var(--color-border)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(12px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,113,227,0.4), transparent)' }} />
            <p className="text-caption" style={{ marginBottom: 14, letterSpacing: '0.15em' }}>
              ABOUT THE BUILDER
            </p>
            <p style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.85, fontFamily: 'var(--font-body)', fontWeight: 300 }}>
              I approach product problems from the behavioral layer down. When I designed ApeAcademy's payment flow, I'd already mapped 200 student edge cases before touching the code — not because I'm cautious, but because the mental model existed before the implementation did.
            </p>
            <p style={{ fontSize: 14, color: 'var(--color-muted)', lineHeight: 1.85, fontFamily: 'var(--font-body)', marginTop: 14, fontWeight: 300 }}>
              I've written structured product analyses for Spotify, Amazon, and LinkedIn — framed as internal working documents, not external critiques. The goal isn't to suggest these teams missed something obvious. It's to practice how I'd approach ambiguous problems with incomplete information.
            </p>
          </motion.div>

          {/* Insight quote */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              padding: '22px 24px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(0,113,227,0.08) 0%, rgba(0,61,122,0.04) 100%)',
              border: '1px solid rgba(0,113,227,0.18)',
              borderLeft: '3px solid rgba(0,113,227,0.7)',
            }}
          >
            <p style={{ fontSize: 13, color: 'rgba(0,160,255,0.85)', fontFamily: 'var(--font-body)', lineHeight: 1.75, fontStyle: 'italic', fontWeight: 300 }}>
              "The most tractable product improvements live in the gap between what users say they want and what their behavior actually reveals."
            </p>
          </motion.div>

          <div style={{ marginTop: 8 }}>
            <LocationWidget inView={true} />
          </div>
        </div>
      </div>
    </section>
  )
}
