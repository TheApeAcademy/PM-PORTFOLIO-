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
  { name: 'v0', use: 'Component prototyping · Visual exploration', color: '#9CA3AF' },
  { name: 'Linear', use: 'Roadmap management · Sprint planning', color: '#5E6AD2' },
]

const operatingPrinciples = [
  {
    label: 'Systems thinker',
    body: 'I model the full system before touching any part of it. Isolated feature decisions create technical and product debt.',
    color: '#0071E3',
  },
  {
    label: 'Technically fluent',
    body: "I can read the codebase, scope the engineering lift, and write the first prototype. PMs who can't engage with the build lose credibility with engineers.",
    color: '#7C3AED',
  },
  {
    label: 'User psychology first',
    body: 'Every decision I make is grounded in how users actually behave, not how we wish they did. Incentives beat intentions every time.',
    color: '#059669',
  },
  {
    label: 'Execution-obsessed',
    body: "Ideas without ships are just noise. I've been shipping since year two of university — not planning to stop.",
    color: '#D97706',
  },
  {
    label: 'Async-native',
    body: "I communicate in writing first. Decisions are documented, reasoning is traceable, and nothing exists only in someone's memory.",
    color: '#DB2777',
  },
  {
    label: 'Rapid learner',
    body: 'I compress learning cycles aggressively. First Flutterwave integration: 2 days. First SaaS architecture: solo in 4 months.',
    color: '#6366F1',
  },
]

const exploring = [
  { topic: 'AI agent orchestration', description: 'Multi-step autonomous workflows beyond single-turn prompts', emoji: '🤖' },
  { topic: 'Developer tooling UX', description: 'Why great DX compounds into product moats', emoji: '⚙️' },
  { topic: 'Fintech infrastructure', description: 'Payment rails, float economics, and embedded finance', emoji: '💸' },
  { topic: 'Product analytics systems', description: 'Event schema design, cohort analysis, and retention mechanics', emoji: '📊' },
  { topic: 'Conversational UI patterns', description: 'Voice, chat, and ambient interfaces at product scale', emoji: '💬' },
  { topic: 'Startup distribution strategy', description: 'Go-to-market sequencing for zero-to-one products', emoji: '🚀' },
]

export default function HowIWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

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
      <div style={{ maxWidth: 1100, margin: '0 auto' }} ref={sectionRef}>

        {/* ══════════════════════════════════════════════════
            AI WORKFLOW STACK
        ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: 96 }}
        >
          <p className="text-caption" style={{ marginBottom: 14, letterSpacing: '0.22em' }}>
            AI WORKFLOW STACK
          </p>
          <h2
            className="text-section-headline"
            style={{ color: 'var(--color-text)', marginBottom: 14, maxWidth: 560 }}
          >
            I work natively with AI.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: 500,
              lineHeight: 1.7,
              marginBottom: 44,
              fontWeight: 300,
            }}
          >
            Not as a novelty — as infrastructure. Every PM workflow I run is AI-assisted: research,
            synthesis, prototyping, documentation, and decision-making.
          </p>

          <div className="ai-tools-grid">
            {aiTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.04 * i, ease }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  padding: '18px 18px 16px',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderTop: `2px solid ${tool.color}`,
                  background: 'rgba(255,255,255,0.025)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  boxShadow: `inset 0 -16px 32px -8px ${tool.color}08, 0 8px 24px rgba(0,0,0,0.3)`,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  transition: 'box-shadow 0.3s ease',
                }}
              >
                {/* Color glow dot */}
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: tool.color,
                    boxShadow: `0 0 10px ${tool.color}`,
                    marginBottom: 2,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.2,
                  }}
                >
                  {tool.name}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: 'var(--color-muted)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.6,
                    fontWeight: 300,
                  }}
                >
                  {tool.use}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            OPERATING PRINCIPLES
        ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.12, ease }}
          style={{ marginBottom: 96 }}
        >
          <p className="text-caption" style={{ marginBottom: 14, letterSpacing: '0.22em' }}>
            HOW I OPERATE
          </p>
          <h2
            className="text-section-headline"
            style={{ color: 'var(--color-text)', marginBottom: 44, maxWidth: 500 }}
          >
            What working with me looks like.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {operatingPrinciples.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.06, ease }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'clamp(48px,6vw,72px) 1fr',
                  gap: '0 clamp(16px,2.5vw,28px)',
                  padding: 'clamp(18px,2.5vw,24px) clamp(18px,2.5vw,28px)',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderLeft: `2px solid ${p.color}55`,
                  background: 'rgba(255,255,255,0.02)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  alignItems: 'center',
                  cursor: 'default',
                  transition: 'border-left-color 0.3s ease, background 0.3s ease',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderLeftColor = `${p.color}BB`
                  el.style.background = 'rgba(255,255,255,0.04)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderLeftColor = `${p.color}55`
                  el.style.background = 'rgba(255,255,255,0.02)'
                }}
              >
                {/* Large gradient number */}
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(28px,4vw,40px)',
                    fontWeight: 800,
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    background: `linear-gradient(135deg, ${p.color} 0%, ${p.color}44 100%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Content */}
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(14px,1.8vw,17px)',
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      marginBottom: 5,
                      letterSpacing: '-0.01em',
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
                      fontWeight: 300,
                    }}
                  >
                    {p.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            CURRENTLY EXPLORING
        ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.22, ease }}
        >
          <p className="text-caption" style={{ marginBottom: 14, letterSpacing: '0.22em' }}>
            CURRENTLY EXPLORING
          </p>
          <h2
            className="text-section-headline"
            style={{ color: 'var(--color-text)', marginBottom: 14, maxWidth: 480 }}
          >
            What's on the reading list.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: 440,
              lineHeight: 1.7,
              marginBottom: 44,
              fontWeight: 300,
            }}
          >
            The topics I'm actively thinking about — not for assignments, just because they're interesting problems.
          </p>

          <div className="exploring-grid">
            {exploring.map((item, i) => (
              <motion.div
                key={item.topic}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.18 + i * 0.07, ease }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                style={{
                  padding: 'clamp(18px,2.5vw,26px)',
                  borderRadius: 18,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.025)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)',
                  cursor: 'default',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(0,113,227,0.35)'
                  el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.4), 0 0 40px rgba(0,113,227,0.1)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(255,255,255,0.06)'
                  el.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.3)'
                }}
              >
                {/* Subtle top glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(0,113,227,0.4), transparent)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Large gradient number */}
                <span
                  style={{
                    display: 'block',
                    fontSize: 'clamp(36px,5vw,52px)',
                    fontWeight: 800,
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.05em',
                    lineHeight: 1,
                    marginBottom: 14,
                    background: 'linear-gradient(135deg, #0071E3 0%, rgba(0,113,227,0.25) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <p
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(14px,1.8vw,16px)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: 8,
                    lineHeight: 1.3,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {item.topic}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    color: 'var(--color-muted)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.65,
                    fontWeight: 300,
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
