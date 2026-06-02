import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const milestones = [
  {
    year: '2022',
    title: 'Started seeing things.',
    body: 'Enrolled in cybersecurity. Spent more time writing up product problems than studying for exams. The gaps were everywhere. Couldn\'t help it.',
    tag: 'Year one',
  },
  {
    year: '2023',
    title: 'Started saying them out loud.',
    body: 'Wrote my first full product pitch to a company I\'d never spoken to. Problem, root cause, solution, projected impact. They didn\'t respond. I sent another one.',
    tag: 'Pitch mode',
  },
  {
    year: '2024',
    title: 'Started shipping.',
    body: 'Built ApeAcademy solo. PM, frontend, design. All of it. Real Flutterwave payments. Real students. Real assignments. From zero to live in 4 months.',
    tag: 'Founder mode',
  },
  {
    year: '2025',
    title: 'Scaling the thinking.',
    body: 'Daye concept. LinkedIn analysis. Alexa analysis. Building a body of work that walks into the room before I do. Nigeria.',
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
      initial={{ opacity: 0, x: -20, rotateX: 8 }}
      animate={inView ? { opacity: 1, x: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.08, ease }}
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 1px 1fr',
        gap: '0 32px',
        alignItems: 'start',
        position: 'relative',
        perspective: 800,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Year — with large watermark behind */}
      <div style={{ paddingTop: 3, textAlign: 'right', position: 'relative' }}>
        {/* Watermark year */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            right: -8,
            top: -12,
            fontSize: milestone.year === '∞' ? 52 : 64,
            fontWeight: 900,
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            opacity: inView ? 0.045 : 0,
            transition: 'opacity 0.6s ease',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          {milestone.year}
        </span>

        {/* Visible year label */}
        <span
          style={{
            fontSize: milestone.year === '∞' ? 20 : 12,
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            color: inView ? 'var(--color-blue-primary)' : 'var(--color-muted)',
            transition: 'color 0.4s ease',
            lineHeight: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {milestone.year}
        </span>
      </div>

      {/* Track + dot */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, ease }}
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: 'var(--color-blue-primary)',
            border: '2px solid var(--color-black)',
            flexShrink: 0,
            zIndex: 1,
            marginTop: 4,
            boxShadow: inView ? '0 0 12px rgba(0,113,227,0.6)' : 'none',
            transition: 'box-shadow 0.4s ease',
          }}
        />
        {index < milestones.length - 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            style={{
              flex: 1,
              width: 1,
              background: 'linear-gradient(to bottom, var(--color-blue-primary), rgba(0,113,227,0.1))',
              transformOrigin: 'top',
              marginTop: 4,
              minHeight: 90,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: index < milestones.length - 1 ? 64 : 0, paddingTop: 0, position: 'relative', zIndex: 1 }}>
        {milestone.tag && (
          <span
            style={{
              display: 'inline-block',
              fontSize: 10,
              fontWeight: 600,
              color: 'var(--color-blue-primary)',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            {milestone.tag}
          </span>
        )}
        <h3
          style={{
            fontSize: 'clamp(22px, 3.5vw, 36px)',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            marginBottom: 12,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}
        >
          {milestone.title}
        </h3>
        <p
          style={{
            fontSize: 15,
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.8,
            maxWidth: 480,
            fontWeight: 300,
          }}
        >
          {milestone.body}
        </p>
      </div>
    </motion.div>
  )
}

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--color-black)',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--color-border)',
        overflow: 'hidden',
      }}
    >
      {/* Background watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '8%',
          right: '-3%',
          fontSize: 'clamp(80px, 18vw, 200px)',
          fontWeight: 900,
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text)',
          opacity: 0.022,
          letterSpacing: '-0.06em',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        JOURNEY
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <p className="text-caption" style={{ marginBottom: 16, letterSpacing: '0.18em' }}>
            THE JOURNEY
          </p>
          <h2
            className="text-section-headline"
            style={{ color: 'var(--color-text)', marginBottom: 72 }}
          >
            How I got here.
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {milestones.map((m, i) => (
            <MilestoneItem key={m.year} milestone={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
