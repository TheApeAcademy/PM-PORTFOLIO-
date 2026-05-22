import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const storyLines = [
  'Final year cybersecurity student.',
  'Shipping SaaS since year two.',
  'ApeAcademy processes real payments.',
  'Real students. Real assignments.',
  'Attention to detail is non-negotiable.',
  'I think in 4K — photographic product vision.',
  'Customer psychology is my second language.',
  'Been my own PM from day one.',
  'I find problems companies haven\'t named yet.',
  'Then I pitch the solution. Always.',
  'Cape Town in 3 months.',
  'Let\'s build something.',
]

const stats = [
  { value: '3', label: 'Products shipped' },
  { value: '∞', label: 'Ideas on deck' },
  { value: '2', label: 'Roles targeting' },
  { value: '4K', label: 'How I think' },
]

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        padding: '28px 24px',
        borderRadius: 20,
        border: '1px solid var(--color-border)',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
      }}
    >
      <span
        style={{
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 700,
          fontFamily: 'var(--font-display)',
          color: 'var(--color-blue-primary)',
          lineHeight: 1,
        }}
      >
        {stat.value}
      </span>
      <span style={{ fontSize: 12, color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
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
          { opacity: 0.07 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: line,
              start: 'top 78%',
              end: 'top 42%',
              scrub: 0.9,
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
        {/* Left: sticky story text */}
        <div className="about-sticky">
          <p className="text-caption" style={{ marginBottom: 36, letterSpacing: '0.18em' }}>
            THE STORY
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {storyLines.map((line, i) => (
              <p
                key={i}
                ref={(el) => { if (el) linesRef.current[i] = el }}
                style={{
                  fontSize: 'clamp(20px, 2.8vw, 36px)',
                  fontWeight: 500,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text)',
                  opacity: 0.07,
                  lineHeight: 1.35,
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Right: stats + bio */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 'clamp(0px, 4vw, 80px)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 12,
            }}
          >
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          {/* Bio card */}
          <div
            style={{
              padding: '28px 24px',
              borderRadius: 20,
              border: '1px solid var(--color-border)',
              background: 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <p className="text-caption" style={{ marginBottom: 14, letterSpacing: '0.15em' }}>
              ABOUT THE BUILDER
            </p>
            <p
              style={{
                fontSize: 14,
                color: 'var(--color-muted)',
                lineHeight: 1.85,
                fontFamily: 'var(--font-body)',
              }}
            >
              I have an almost photographic ability to visualise products — I see the full user
              journey before a single wireframe exists. Thinking in 4K. That mental model, combined
              with a deep understanding of customer psychology, means I build the right features in
              the right order for the right person.
            </p>
            <p
              style={{
                fontSize: 14,
                color: 'var(--color-muted)',
                lineHeight: 1.85,
                fontFamily: 'var(--font-body)',
                marginTop: 14,
              }}
            >
              I regularly identify overlooked problems in companies and send unsolicited pitches —
              full product thinking, not feature requests. Everything lives on my profile, updated
              continuously.
            </p>
          </div>

          {/* Insight callout */}
          <div
            style={{
              padding: '20px 24px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(0,113,227,0.1) 0%, rgba(0,61,122,0.06) 100%)',
              border: '1px solid rgba(0,113,227,0.2)',
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: 'rgba(0,113,227,0.9)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}
            >
              "Companies miss revenue because they optimise for the happy path and ignore the exit
              interview. I find those blind spots — and I fix them."
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
