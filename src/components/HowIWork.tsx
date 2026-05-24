import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

const aiTools = [
  { name: 'Claude', use: 'PRDs · Research synthesis · Strategy docs', color: '#D97706' },
  { name: 'ChatGPT', use: 'Ideation · User psychology · Copy refinement', color: '#10A37F' },
  { name: 'Cursor', use: 'AI-assisted engineering · Rapid prototyping', color: '#6366F1' },
  { name: 'Lovable', use: 'UI prototyping · MVP scaffolding', color: '#EC4899' },
  { name: 'Figma AI', use: 'UI generation · Design iteration', color: '#F24E1E' },
  { name: 'NotebookLM', use: 'Research distillation · Source synthesis', color: '#4285F4' },
  { name: 'v0', use: 'Component prototyping · Visual exploration', color: '#000' },
  { name: 'Linear', use: 'Roadmap management · Sprint planning', color: '#5E6AD2' },
]

const operatingPrinciples = [
  {
    label: 'Systems thinker',
    body: 'I model the full system before touching any part of it. Isolated feature decisions create technical and product debt.',
  },
  {
    label: 'Technically fluent',
    body: "I can read the codebase, scope the engineering lift, and write the first prototype. PMs who can't engage with the build lose credibility with engineers.",
  },
  {
    label: 'User psychology first',
    body: 'Every decision I make is grounded in how users actually behave, not how we wish they did. Incentives beat intentions every time.',
  },
  {
    label: 'Execution-obsessed',
    body: "Ideas without ships are just noise. I've been shipping since year two of university — not planning to stop.",
  },
  {
    label: 'Async-native',
    body: 'I communicate in writing first. Decisions are documented, reasoning is traceable, and nothing exists only in someone\'s memory.',
  },
  {
    label: 'Rapid learner',
    body: 'I compress learning cycles aggressively. First Flutterwave integration: 2 days. First SaaS architecture: solo in 4 months.',
  },
]

const exploring = [
  { topic: 'AI agent orchestration', description: 'Multi-step autonomous workflows beyond single-turn prompts' },
  { topic: 'Developer tooling UX', description: 'Why great DX compounds into product moats' },
  { topic: 'Fintech infrastructure', description: 'Payment rails, float economics, and embedded finance' },
  { topic: 'Product analytics systems', description: 'Event schema design, cohort analysis, and retention mechanics' },
  { topic: 'Conversational UI patterns', description: 'Voice, chat, and ambient interfaces at product scale' },
  { topic: 'Startup distribution strategy', description: 'Go-to-market sequencing for zero-to-one products' },
]

export default function HowIWork() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

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
      <div style={{ maxWidth: 1200, margin: '0 auto' }} ref={ref}>

        {/* ── AI Workflow Stack ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ marginBottom: 80 }}
        >
          <p className="text-caption" style={{ marginBottom: 16, letterSpacing: '0.22em' }}>
            AI WORKFLOW STACK
          </p>
          <h2
            className="text-section-headline"
            style={{ color: 'var(--color-text)', marginBottom: 16, maxWidth: 600 }}
          >
            I work natively with AI.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: 520,
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Not as a novelty — as infrastructure. Every PM workflow I run is AI-assisted: research,
            synthesis, prototyping, documentation, and decision-making.
          </p>

          <div className="ai-tools-grid">
            {aiTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * i, ease }}
                style={{
                  padding: '16px 18px',
                  borderRadius: 14,
                  border: '1px solid var(--color-border)',
                  background: 'rgba(255,255,255,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--color-text)',
                  }}
                >
                  {tool.name}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: 'var(--color-muted)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.5,
                  }}
                >
                  {tool.use}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Operating Principles ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          style={{ marginBottom: 80 }}
        >
          <p className="text-caption" style={{ marginBottom: 16, letterSpacing: '0.22em' }}>
            HOW I OPERATE
          </p>
          <h2
            className="text-section-headline"
            style={{ color: 'var(--color-text)', marginBottom: 40, maxWidth: 540 }}
          >
            What working with me looks like.
          </h2>

          <div className="principles-grid">
            {operatingPrinciples.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease }}
                style={{
                  padding: '22px 20px',
                  borderRadius: 16,
                  border: '1px solid var(--color-border)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 14,
                    fontWeight: 700,
                    color: 'var(--color-blue-primary)',
                    marginBottom: 8,
                  }}
                >
                  {p.label}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--color-muted)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.75,
                  }}
                >
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Currently Exploring ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        >
          <p className="text-caption" style={{ marginBottom: 16, letterSpacing: '0.22em' }}>
            CURRENTLY EXPLORING
          </p>
          <h2
            className="text-section-headline"
            style={{ color: 'var(--color-text)', marginBottom: 16, maxWidth: 520 }}
          >
            What's on the reading list.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: 480,
              lineHeight: 1.7,
              marginBottom: 36,
            }}
          >
            The topics I'm actively thinking about — not for assignments, just because they're interesting problems.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {exploring.map((item, i) => (
              <motion.div
                key={item.topic}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: '16px 0',
                  borderBottom: i < exploring.length - 1 ? '1px solid var(--color-border)' : 'none',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--color-blue-primary)',
                    fontFamily: 'var(--font-body)',
                    marginTop: 3,
                    flexShrink: 0,
                    width: 20,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: 3,
                    }}
                  >
                    {item.topic}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: 'var(--color-muted)',
                      fontFamily: 'var(--font-body)',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
