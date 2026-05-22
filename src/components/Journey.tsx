import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const milestones = [
  {
    year: '2022',
    title: 'Saw the gap.',
    body: 'Started cybersecurity. Spotted product problems everywhere on day one. Started writing them down instead of ignoring them.',
    tag: 'Year one',
  },
  {
    year: '2023',
    title: 'Started pitching.',
    body: 'Sent my first unsolicited product pitch to a company. A full write-up — problem, root cause, solution, impact estimate. Never stopped.',
    tag: 'Pitch mode',
  },
  {
    year: '2024',
    title: 'Started shipping.',
    body: 'Built ApeAcademy solo. PM, frontend, design — all of it. Real payment processing. Real students. Real assignments. Shipped in 4 months.',
    tag: 'Founder mode',
  },
  {
    year: '2025',
    title: 'Scaling the thinking.',
    body: 'RB Studio. Job Finder concept. Building a body of work that speaks louder than a CV. Cape Town next.',
    tag: 'Now',
  },
  {
    year: '∞',
    title: 'The work continues.',
    body: 'Always a new problem. Always a new pitch. Always something closer to shipped.',
    tag: null,
  },
]

function MilestoneItem({ milestone, index }: { milestone: typeof milestones[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease }}
      style={{
        display: 'grid',
        gridTemplateColumns: '56px 1px 1fr',
        gap: '0 28px',
        alignItems: 'start',
        position: 'relative',
      }}
    >
      {/* Year */}
      <div style={{ paddingTop: 3, textAlign: 'right' }}>
        <span
          style={{
            fontSize: milestone.year === '∞' ? 20 : 13,
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            color: inView ? 'var(--color-blue-primary)' : 'var(--color-muted)',
            transition: 'color 0.4s ease',
            lineHeight: 1,
          }}
        >
          {milestone.year}
        </span>
      </div>

      {/* Track + dot */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, ease }}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--color-blue-primary)',
            border: '2px solid #000',
            flexShrink: 0,
            zIndex: 1,
            marginTop: 4,
          }}
        />
        {/* Line below dot (except last item) */}
        {index < milestones.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            style={{
              flex: 1,
              width: 1,
              background: 'linear-gradient(to bottom, var(--color-blue-primary), rgba(0,113,227,0.12))',
              transformOrigin: 'top',
              marginTop: 4,
              minHeight: 80,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: index < milestones.length - 1 ? 56 : 0, paddingTop: 0 }}>
        {milestone.tag && (
          <span
            style={{
              display: 'inline-block',
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--color-blue-primary)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            {milestone.tag}
          </span>
        )}
        <h3
          style={{
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            marginBottom: 10,
            lineHeight: 1.2,
          }}
        >
          {milestone.title}
        </h3>
        <p
          style={{
            fontSize: 15,
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.75,
            maxWidth: 480,
          }}
        >
          {milestone.body}
        </p>
      </div>
    </motion.div>
  )
}

export default function Journey() {
  return (
    <section
      style={{
        background: 'var(--color-black)',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <p className="text-caption" style={{ marginBottom: 16, letterSpacing: '0.18em' }}>
          THE JOURNEY
        </p>
        <h2
          className="text-section-headline"
          style={{ color: 'var(--color-text)', marginBottom: 72 }}
        >
          How I got here.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {milestones.map((m, i) => (
            <MilestoneItem key={m.year} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
