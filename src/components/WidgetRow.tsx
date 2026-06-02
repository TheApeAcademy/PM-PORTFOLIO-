import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const


/* ── Activity Ring ──────────────────────── */
function Ring({
  pct,
  r,
  color,
  sw = 9,
  inView,
  delay = 0,
}: {
  pct: number
  r: number
  color: string
  sw?: number
  inView: boolean
  delay?: number
}) {
  const C = 2 * Math.PI * r
  const offset = C * (1 - pct / 100)
  return (
    <>
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={sw} />
      <motion.circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={sw}
        strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        animate={{ strokeDashoffset: inView ? offset : C }}
        transition={{ duration: 1.4, delay, ease }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '60px 60px' }}
      />
    </>
  )
}


/* ── Widget shell ───────────────────────── */
function Widget({
  children,
  w = 200,
  h = 220,
  gradient,
  className,
  style: extraStyle,
  floatIndex = 0,
}: {
  children: React.ReactNode
  w?: number
  h?: number
  gradient?: string
  className?: string
  style?: React.CSSProperties
  floatIndex?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = (e.clientX - rect.left) / rect.width
    const cy = (e.clientY - rect.top) / rect.height
    setTilt({ x: (cy - 0.5) * -14, y: (cx - 0.5) * 14 })
    setGlowPos({ x: cx * 100, y: cy * 100 })
  }
  const reset = () => setTilt({ x: 0, y: 0 })

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 3.5 + floatIndex * 0.4,
        repeat: Infinity,
        ease: [0.45, 0, 0.55, 1],
        delay: floatIndex * 0.3,
      }}
      style={{ display: 'inline-block' }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className={`widget-card ${className ?? ''}`}
        style={{
          width: w,
          height: h,
          borderRadius: 22,
          padding: 18,
          border: '1px solid rgba(255,255,255,0.09)',
          background: gradient ?? 'rgba(28,28,30,0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)`,
          transform: `perspective(700px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          willChange: 'transform',
          ...extraStyle,
        }}
      >
        {/* Widget glass sheen */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)',
            pointerEvents: 'none',
          }}
        />
        {/* Mouse-tracked glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(0,113,227,0.08) 0%, transparent 60%)`,
            pointerEvents: 'none',
            borderRadius: 22,
            transition: 'background 0.15s ease',
          }}
        />
        {children}
      </div>
    </motion.div>
  )
}

function WidgetLabel({ children }: { children: string }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
        color: 'var(--color-muted)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </span>
  )
}

/* ── Widget 1: Location ─────────────────── */
export function LocationWidget({ inView }: { inView: boolean }) {
  return (
    <Widget
      floatIndex={0}
      gradient="linear-gradient(145deg, #020818 0%, #001233 60%, #002466 100%)"
      style={{ border: '1px solid rgba(0,113,227,0.2)' }}
    >
      <WidgetLabel>Based in</WidgetLabel>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#0071E3" />
            <circle cx="12" cy="9" r="2.5" fill="#001233" />
          </svg>
          <span style={{ fontSize: 11, color: 'rgba(0,113,227,0.9)', fontFamily: 'var(--font-body)' }}>Nigeria</span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          style={{
            fontSize: 28,
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            color: '#fff',
            lineHeight: 1.1,
          }}
        >
          Nigeria
        </motion.span>
        <span style={{ fontSize: 12, color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
          Actively looking
        </span>
      </div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          padding: '4px 10px',
          borderRadius: 980,
          background: 'rgba(0,113,227,0.15)',
          border: '1px solid rgba(0,113,227,0.25)',
          width: 'fit-content',
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#0071E3' }} />
        <span style={{ fontSize: 10, color: '#0071E3', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
          Open to work
        </span>
      </div>
    </Widget>
  )
}

/* ── Widget 2: Activity Rings ───────────── */
export function ActivityWidget({ inView }: { inView: boolean }) {
  return (
    <Widget floatIndex={1}>
      <WidgetLabel>Skills</WidgetLabel>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <Ring pct={92} r={46} color="#0071E3" inView={inView} delay={0.1} />
          <Ring pct={84} r={34} color="#4DB8FF" inView={inView} delay={0.25} />
          <Ring pct={73} r={22} color="#A8D8FF" inView={inView} delay={0.4} />
        </svg>
        {/* Center label */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
            92
          </span>
          <span style={{ fontSize: 9, color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>PM</span>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        {[
          { label: 'PM', color: '#0071E3' },
          { label: 'Frontend', color: '#4DB8FF' },
          { label: 'Psychology', color: '#A8D8FF' },
        ].map((r) => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>{r.label}</span>
          </div>
        ))}
      </div>
    </Widget>
  )
}

/* ── Widget 3: Now Building ─────────────── */
export function BuildingWidget({ inView }: { inView: boolean }) {
  const projects = [
    { name: 'ApeAcademy', pct: 88, status: 'Live' },
    { name: 'RB Studio', pct: 52, status: 'Building' },
    { name: 'Job Finder', pct: 28, status: 'Concept' },
  ]
  return (
    <Widget floatIndex={2}>
      <WidgetLabel>Now Building</WidgetLabel>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
        {projects.map((p, i) => (
          <div key={p.name} style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
                {p.name}
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: p.status === 'Live' ? '#0071E3' : 'var(--color-muted)',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {p.status}
              </span>
            </div>
            <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', borderRadius: 2, background: 'var(--color-blue-primary)', width: `${p.pct}%`, transformOrigin: 'left' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: inView ? 1 : 0 }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.15, ease }}
              />
            </div>
          </div>
        ))}
      </div>
    </Widget>
  )
}

/* ── Widget 4: Product Mode ─────────────── */
export function PitchWidget({ inView }: { inView: boolean }) {
  return (
    <Widget
      floatIndex={3}
      gradient="linear-gradient(145deg, #020818 0%, #001233 100%)"
      style={{ border: '1px solid rgba(0,113,227,0.18)' }}
    >
      <WidgetLabel>Product Mode</WidgetLabel>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          style={{
            fontSize: 52,
            fontWeight: 700,
            fontFamily: 'var(--font-display)',
            color: 'var(--color-blue-primary)',
            lineHeight: 1,
          }}
        >
          5+
        </motion.span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
            lineHeight: 1.3,
          }}
        >
          Pitches sent to companies
        </span>
        <span
          style={{
            fontSize: 11,
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.5,
          }}
        >
          Unsolicited. Always solutions, never complaints.
        </span>
      </div>
    </Widget>
  )
}

