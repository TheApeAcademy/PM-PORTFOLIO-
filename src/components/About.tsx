import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const storyLines = [
  'Final year cybersecurity student.',
  'Shipping SaaS since year two.',
  'ApeAcademy processes real payments.',
  'Real students. Real assignments.',
  'Attention to detail is non-negotiable.',
  'I think in 4K — vivid product imagination.',
  'Customer psychology is my second language.',
  'I\'ve been my own PM from day one.',
  'I find problems companies haven\'t named yet.',
  'Then I pitch the solution.',
  'Cape Town in 3 months.',
  'Let\'s build something.',
]

const stats = [
  { value: '3', label: 'Products shipped' },
  { value: '∞', label: 'Ideas on deck' },
  { value: '2', label: 'Roles I\'m targeting' },
  { value: '4K', label: 'How I think' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const linesRef = useRef<HTMLParagraphElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      linesRef.current.forEach((line, i) => {
        gsap.fromTo(
          line,
          { opacity: 0.08 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: line,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 0.8,
            },
            delay: i * 0.02,
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
        padding: '120px 24px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        {/* Left: story text */}
        <div style={{ position: 'sticky', top: 120 }}>
          <p
            className="text-caption"
            style={{ marginBottom: 40, letterSpacing: '0.2em' }}
          >
            THE STORY
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {storyLines.map((line, i) => (
              <p
                key={i}
                ref={(el) => { if (el) linesRef.current[i] = el }}
                style={{
                  fontSize: 'clamp(22px, 3vw, 40px)',
                  fontWeight: 500,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text)',
                  opacity: 0.08,
                  lineHeight: 1.3,
                  transition: 'opacity 0.3s ease',
                }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Right: stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
            paddingTop: 80,
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                padding: 32,
                borderRadius: 20,
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-blue-primary)',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: 'var(--color-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}

          {/* Extended bio card */}
          <div
            style={{
              gridColumn: '1 / -1',
              padding: 32,
              borderRadius: 20,
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
            }}
          >
            <p
              className="text-caption"
              style={{ marginBottom: 12, letterSpacing: '0.15em' }}
            >
              ABOUT THE BUILDER
            </p>
            <p
              style={{
                fontSize: 15,
                color: 'var(--color-muted)',
                lineHeight: 1.8,
                fontFamily: 'var(--font-body)',
              }}
            >
              I have an almost photographic ability to visualise products —
              I can see the entire user journey in my head before a single wireframe exists.
              That mental model, combined with a deep understanding of customer psychology,
              means I don't just build features. I build the right features, in the right order,
              for the right person.
            </p>
            <p
              style={{
                fontSize: 15,
                color: 'var(--color-muted)',
                lineHeight: 1.8,
                fontFamily: 'var(--font-body)',
                marginTop: 12,
              }}
            >
              I regularly identify overlooked problems in companies and send unsolicited pitches —
              with solutions. Not complaints. Not feature requests. Full product thinking.
              All my work, pitches, and ideas live on my profile — updated continuously.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
