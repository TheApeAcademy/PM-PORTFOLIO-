import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

/* ─── AI Workflow Data ─── */
const aiToolsData: Record<string, { use: string; color: string }> = {
  Claude:      { use: 'PRDs · Research synthesis · Strategy docs', color: '#D97706' },
  ChatGPT:     { use: 'Ideation · User psychology · Copy refinement', color: '#10A37F' },
  Cursor:      { use: 'AI-assisted engineering · Rapid prototyping', color: '#6366F1' },
  Lovable:     { use: 'UI prototyping · MVP scaffolding', color: '#EC4899' },
  'Figma AI':  { use: 'UI generation · Design iteration', color: '#F24E1E' },
  NotebookLM:  { use: 'Research distillation · Source synthesis', color: '#4285F4' },
  v0:          { use: 'Component prototyping · Visual exploration', color: '#9CA3AF' },
  Linear:      { use: 'Roadmap management · Sprint planning', color: '#5E6AD2' },
}

const workflowGroups = [
  { phase: 'Research & Synthesis', color: '#D97706', tools: ['Claude', 'NotebookLM'] },
  { phase: 'Design & Prototype',   color: '#EC4899', tools: ['Figma AI', 'v0', 'Lovable'] },
  { phase: 'Engineering',          color: '#6366F1', tools: ['Cursor'] },
  { phase: 'Think & Communicate',  color: '#10A37F', tools: ['ChatGPT', 'Linear'] },
]

/* ─── Operating Principles ─── */
const operatingPrinciples = [
  {
    label: 'Systems thinker.',
    body: "Before I wrote a single line of ApeAcademy, I mapped every user journey end-to-end. That's not caution. That's how you avoid rebuilding the same thing twice.",
    color: '#0071E3',
  },
  {
    label: 'Technically fluent.',
    body: "I scoped ApeAcademy's entire Flutterwave integration before the first API call. PMs who can't read the code lose the room.",
    color: '#7C3AED',
  },
  {
    label: 'User psychology first.',
    body: "The Spotify analysis started with one question: why do users skip 40% of their own playlists? The answer wasn't the algorithm. It was emotional context. That's the kind of gap I look for.",
    color: '#059669',
  },
  {
    label: 'Execution-obsessed.',
    body: "ApeAcademy had real students paying real money by month four. Ideas without ships are noise. That's the bar I hold myself to.",
    color: '#D97706',
  },
  {
    label: 'Async-native.',
    body: "Every decision I've made on ApeAcademy is documented. If I got hit by a bus tomorrow, someone could pick it up and keep going.",
    color: '#DB2777',
  },
  {
    label: 'Rapid learner.',
    body: 'First Flutterwave integration: 2 days. First full SaaS architecture: solo in 4 months. I compress learning cycles aggressively and I have the receipts.',
    color: '#6366F1',
  },
]

/* ─── Currently Exploring ─── */
const exploring = [
  {
    topic: 'AI agent orchestration',
    description: "After writing the Daye spec, I kept asking: what if the AI ran the whole session autonomously, start to finish? That question led me here.",
  },
  {
    topic: 'Developer tooling UX',
    description: "Cursor changed how I build. That made me obsessed with why great DX compounds into product advantages nobody talks about.",
  },
  {
    topic: 'Fintech infrastructure',
    description: "ApeAcademy runs on Flutterwave. Understanding float economics completely changed how I think about every payment product.",
  },
  {
    topic: 'Product analytics systems',
    description: "You can't find what you don't measure. I want to design the event schema, not just read the dashboard.",
  },
  {
    topic: 'Conversational UI patterns',
    description: "Daye is fundamentally a conversation. That made me realise I barely understand what makes a voice interface feel human.",
  },
  {
    topic: 'Startup distribution strategy',
    description: "ApeAcademy's growth was word-of-mouth. I want to understand how to engineer that intentionally at scale.",
  },
]

/* ─── Animated horizontal rule ─── */
function AnimatedRule({ delay = 0, color = 'rgba(255,255,255,0.08)' }: { delay?: number; color?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} style={{ height: 1, background: color, overflow: 'hidden' }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay, ease }}
        style={{ height: '100%', background: color, transformOrigin: 'left', width: '100%' }}
      />
    </div>
  )
}

/* ─── 3D Tilt wrapper ─── */
function TiltBlock({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width  - 0.5
    const cy = (e.clientY - rect.top)  / rect.height - 0.5
    setTilt({ x: cy * -6, y: cx * 6 })
  }
  const reset = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        ...style,
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.25s ease',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}

export default function HowIWork() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-60px' })

  /* Parallax watermark */
  const { scrollYProgress } = useScroll({ target: sectionRef as React.RefObject<HTMLElement>, offset: ['start end', 'end start'] })
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%'])

  return (
    <section
      style={{
        background: 'var(--color-black)',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--color-border)',
        overflow: 'hidden',
      }}
    >
      {/* Parallax watermark */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          top: '4%',
          left: '-2%',
          fontSize: 'clamp(80px, 18vw, 220px)',
          fontWeight: 900,
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text)',
          opacity: 0.022,
          letterSpacing: '-0.06em',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          userSelect: 'none',
          y: watermarkY,
        }}
      >
        PROCESS
      </motion.div>

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }} ref={sectionRef}>

        {/* ══════════════════════════════════════
            SECTION 1 — AI WORKFLOW
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ marginBottom: 104 }}
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
              maxWidth: 480,
              lineHeight: 1.75,
              marginBottom: 56,
              fontWeight: 300,
            }}
          >
            Not a novelty. Infrastructure. Every workflow I run is AI-assisted. Here's how the stack maps to what I actually do.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {workflowGroups.map((group, gi) => {
              const groupRef = useRef<HTMLDivElement>(null)
              const groupInView = useInView(groupRef, { once: true, margin: '-40px' })
              return (
                <div key={group.phase} ref={groupRef}>
                  <AnimatedRule delay={gi * 0.08} color="rgba(255,255,255,0.07)" />
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={groupInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: gi * 0.08 + 0.1, ease }}
                    style={{
                      padding: 'clamp(16px,2.5vw,24px) 0',
                      display: 'grid',
                      gridTemplateColumns: 'clamp(160px,22vw,240px) 1fr',
                      gap: '0 clamp(20px,3vw,48px)',
                      alignItems: 'start',
                    }}
                  >
                    <div style={{ paddingTop: 2 }}>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: group.color,
                          fontFamily: 'var(--font-body)',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {group.phase}
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 20px', alignItems: 'center' }}>
                      {group.tools.map((toolName, ti) => {
                        const tool = aiToolsData[toolName]
                        return (
                          <motion.span
                            key={toolName}
                            initial={{ opacity: 0, y: 8 }}
                            animate={groupInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: gi * 0.08 + 0.15 + ti * 0.05, ease }}
                            style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8 }}
                          >
                            <span
                              style={{
                                display: 'inline-block',
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: tool?.color ?? group.color,
                                boxShadow: `0 0 8px ${tool?.color ?? group.color}`,
                                flexShrink: 0,
                                position: 'relative',
                                top: -1,
                              }}
                            />
                            <span
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontSize: 15,
                                fontWeight: 700,
                                color: 'var(--color-text)',
                                letterSpacing: '-0.01em',
                              }}
                            >
                              {toolName}
                            </span>
                            {tool?.use && (
                              <span
                                style={{
                                  fontSize: 12,
                                  color: 'var(--color-muted)',
                                  fontFamily: 'var(--font-body)',
                                  fontWeight: 300,
                                }}
                              >
                                · {tool.use}
                              </span>
                            )}
                          </motion.span>
                        )
                      })}
                    </div>
                  </motion.div>
                </div>
              )
            })}
            <AnimatedRule color="rgba(255,255,255,0.07)" />
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            SECTION 2 — OPERATING PRINCIPLES
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          style={{ marginBottom: 104 }}
        >
          <p className="text-caption" style={{ marginBottom: 14, letterSpacing: '0.22em' }}>
            HOW I OPERATE
          </p>
          <h2
            className="text-section-headline"
            style={{ color: 'var(--color-text)', marginBottom: 64, maxWidth: 480 }}
          >
            What working with me looks like.
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {operatingPrinciples.map((p, i) => {
              const pRef = useRef<HTMLDivElement>(null)
              const pInView = useInView(pRef, { once: true, margin: '-40px' })
              const isIndented = i % 2 !== 0
              return (
                <div key={p.label} ref={pRef}>
                  <AnimatedRule delay={i * 0.06} color="rgba(255,255,255,0.06)" />
                  <TiltBlock
                    style={{
                      padding: 'clamp(24px,4vw,44px) 0 clamp(24px,4vw,44px) 0',
                      paddingLeft: isIndented ? 'clamp(0px, 8vw, 120px)' : 0,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
                      animate={pInView ? { opacity: 1, clipPath: 'inset(0% 0 0 0)' } : {}}
                      transition={{ duration: 0.7, delay: i * 0.06 + 0.05, ease }}
                    >
                      <h3
                        style={{
                          fontSize: 'clamp(32px, 5.5vw, 64px)',
                          fontWeight: 800,
                          fontFamily: 'var(--font-display)',
                          color: 'var(--color-text)',
                          letterSpacing: '-0.03em',
                          lineHeight: 1.05,
                          marginBottom: 20,
                        }}
                      >
                        <span style={{ color: p.color }}>{p.label.charAt(0).toUpperCase()}</span>
                        {p.label.slice(1)}
                      </h3>
                      <p
                        style={{
                          fontSize: 15,
                          color: 'var(--color-muted)',
                          fontFamily: 'var(--font-body)',
                          lineHeight: 1.8,
                          maxWidth: 520,
                          fontWeight: 300,
                        }}
                      >
                        {p.body}
                      </p>
                    </motion.div>
                  </TiltBlock>
                </div>
              )
            })}
            <AnimatedRule color="rgba(255,255,255,0.06)" />
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            SECTION 3 — CURRENTLY EXPLORING
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <p className="text-caption" style={{ marginBottom: 14, letterSpacing: '0.22em' }}>
            CURRENTLY EXPLORING
          </p>
          <h2
            className="text-section-headline"
            style={{ color: 'var(--color-text)', marginBottom: 12, maxWidth: 480 }}
          >
            What I'm teaching myself right now.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: 420,
              lineHeight: 1.7,
              marginBottom: 48,
              fontWeight: 300,
            }}
          >
            Nobody assigned this. I just can't stop.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
            }}
            className="exploring-grid"
          >
            {exploring.map((item, i) => (
              <motion.div
                key={item.topic}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, delay: i * 0.06, ease }}
                whileHover={{ y: -4 }}
                style={{
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  padding: '32px 28px',
                  cursor: 'default',
                  transition: 'border-color 0.3s ease, background 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(0,113,227,0.35)'
                  el.style.background = 'rgba(0,113,227,0.05)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'rgba(255,255,255,0.08)'
                  el.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                <div
                  style={{
                    fontSize: 'clamp(48px,7vw,72px)',
                    fontWeight: 900,
                    fontFamily: 'var(--font-display)',
                    background: 'linear-gradient(135deg, #0071E3, #40a0ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: 1,
                    marginBottom: 0,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3
                  style={{
                    fontSize: 'clamp(16px,2vw,20px)',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.01em',
                    marginTop: 12,
                    marginBottom: 0,
                  }}
                >
                  {item.topic}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--color-muted)',
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.75,
                    marginTop: 8,
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
