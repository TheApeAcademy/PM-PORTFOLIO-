import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

/* ─── Product Approach Steps ─── */
const approachSteps = [
  { number: '01', label: 'Observe friction', detail: 'Find where users are working around the product, not with it.' },
  { number: '02', label: 'Identify behavioral patterns', detail: 'Separate what users say they want from what the data reveals they do.' },
  { number: '03', label: 'Map incentives', detail: 'Understand what the business optimizes for and where that conflicts with user needs.' },
  { number: '04', label: 'Analyze tradeoffs', detail: 'Every fix creates a new constraint. Surface them before proposing solutions.' },
  { number: '05', label: 'Prototype rapidly', detail: 'The fastest way to test an assumption is to make it visible.' },
  { number: '06', label: 'Measure impact', detail: 'Define the success metric before touching the scope.' },
]

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
    description: "The Daye spec raised a question I haven't stopped thinking about: at what point does an AI-assisted feature become an AI-operated product, and what does that mean for the PM's role in defining behavior.",
  },
  {
    topic: 'Developer tooling UX',
    description: "Cursor changed the speed and quality of how I ship. That made me want to understand the mechanics behind why great DX compounds into durable product advantages — and why most tooling gets this wrong.",
  },
  {
    topic: 'Fintech infrastructure',
    description: "Building on Flutterwave exposed the operational layer beneath every payment product. Float economics, settlement timing, failure modes — the infrastructure shapes the product strategy whether you acknowledge it or not.",
  },
  {
    topic: 'Product analytics systems',
    description: "Dashboards answer questions you already know to ask. I'm interested in designing the event schema upstream — the decisions about what to instrument reveal more about product thinking than the reports themselves.",
  },
  {
    topic: 'Conversational UI patterns',
    description: "Daye surfaced how little consensus exists on what makes a conversational interface feel native versus transactional. That distinction shapes retention in ways that most teams don't measure until it's too late.",
  },
  {
    topic: 'Startup distribution strategy',
    description: "ApeAcademy's early traction was organic. I want to understand the mechanics of engineering that intentionally — not through paid acquisition, but through distribution architecture built into the product from day one.",
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

function ExploringAccordion() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease }}
    >
      <p className="text-caption" style={{ marginBottom: 14, letterSpacing: '0.22em' }}>
        CURRENTLY EXPLORING
      </p>
      <h2
        className="text-section-headline"
        style={{ color: 'var(--color-text)', marginBottom: 8, maxWidth: 540 }}
      >
        What I'm teaching myself right now.
      </h2>
      <p style={{
        fontSize: 15,
        color: 'var(--color-muted)',
        fontFamily: 'var(--font-body)',
        fontWeight: 300,
        marginBottom: 52,
        lineHeight: 1.65,
      }}>
        Nobody assigned this. I just can't stop.
      </p>

      <div>
        {exploring.map((item, i) => {
          const isActive = active === i
          return (
            <div
              key={item.topic}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{ cursor: 'default', position: 'relative' }}
            >
              {/* top rule */}
              <div style={{ height: 1, background: isActive ? 'rgba(0,113,227,0.3)' : 'rgba(255,255,255,0.07)', transition: 'background 0.35s ease' }} />

              {/* left accent bar */}
              <motion.div
                animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                initial={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 1,
                  bottom: 0,
                  width: 2,
                  background: 'linear-gradient(to bottom, #0071E3, #40a0ff)',
                  transformOrigin: 'top',
                }}
              />

              <motion.div
                animate={{ x: isActive ? 18 : 0, background: isActive ? 'rgba(0,113,227,0.035)' : 'transparent' }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ padding: 'clamp(20px,3vw,28px) 0 clamp(20px,3vw,28px) clamp(16px,2vw,24px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}
              >
                <h3 style={{
                  fontSize: 'clamp(24px,4vw,48px)',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.05,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.72)',
                  transition: 'color 0.3s ease',
                  margin: 0,
                  flex: 1,
                }}>
                  {item.topic}
                </h3>
                <motion.span
                  animate={{ rotate: isActive ? 45 : 0, color: isActive ? '#3BA0FF' : 'rgba(255,255,255,0.2)' }}
                  transition={{ duration: 0.3, ease }}
                  style={{ fontSize: 22, lineHeight: 1, display: 'block', flexShrink: 0, color: 'rgba(255,255,255,0.2)' }}
                >
                  →
                </motion.span>
              </motion.div>

              {/* Expanding description */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    key="desc"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p style={{
                      fontSize: 15,
                      color: 'rgba(255,255,255,0.48)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      lineHeight: 1.75,
                      maxWidth: 620,
                      paddingLeft: 'clamp(16px,2vw,24px)',
                      paddingBottom: 'clamp(20px,3vw,28px)',
                      marginTop: -8,
                    }}>
                      {item.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
      </div>
    </motion.div>
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
            SECTION 0 — HOW I APPROACH PRODUCTS
        ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
          style={{ marginBottom: 104 }}
        >
          <p className="text-caption" style={{ marginBottom: 14, letterSpacing: '0.22em' }}>
            HOW I APPROACH PRODUCTS
          </p>
          <h2
            className="text-section-headline"
            style={{ color: 'var(--color-text)', marginBottom: 14, maxWidth: 560 }}
          >
            The process, in order.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: 480,
              lineHeight: 1.75,
              marginBottom: 52,
              fontWeight: 300,
            }}
          >
            Every analysis, every pitch, every product decision I make runs through this sequence.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(240px, 30vw, 320px), 1fr))',
              gap: 16,
            }}
          >
            {approachSteps.map((step, i) => {
              const stepRef = useRef<HTMLDivElement>(null)
              const stepInView = useInView(stepRef, { once: true, margin: '-40px' })
              return (
                <motion.div
                  key={step.number}
                  ref={stepRef}
                  initial={{ opacity: 0, y: 16 }}
                  animate={stepInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07, ease }}
                  style={{
                    padding: '22px 24px',
                    borderRadius: 16,
                    border: '1px solid rgba(255,255,255,0.07)',
                    background: 'rgba(255,255,255,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'rgba(0,113,227,0.6)',
                      fontFamily: 'var(--font-body)',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                    }}
                  >
                    {step.label}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      color: 'var(--color-muted)',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      lineHeight: 1.65,
                    }}
                  >
                    {step.detail}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

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
        <ExploringAccordion />

      </div>
    </section>
  )
}
