const stack = [
  'React', 'TypeScript', 'Supabase', 'Vite', 'Three.js', 'GSAP',
  'Tailwind', 'Figma', 'Flutterwave', 'Node.js', 'PostgreSQL',
  'Claude API', 'Vercel', 'Git', 'Framer Motion', 'Python',
]

export default function StackMarquee() {
  const doubled = [...stack, ...stack]

  return (
    <section
      style={{
        background: 'var(--color-black)',
        padding: '80px 0',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <p
        className="text-caption"
        style={{ textAlign: 'center', marginBottom: 32, letterSpacing: '0.2em' }}
      >
        STACK
      </p>

      {/* Fade masks */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: 'linear-gradient(to right, var(--color-black), transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background: 'linear-gradient(to left, var(--color-black), transparent)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div style={{ overflow: 'hidden' }}>
          <div
            className="marquee-track"
            style={{ display: 'flex', gap: 12, width: 'max-content' }}
          >
            {doubled.map((item, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: 32,
                  padding: '0 14px',
                  borderRadius: 980,
                  background: 'var(--color-surface-3)',
                  border: '1px solid var(--color-border)',
                  fontSize: 13,
                  color: 'var(--color-muted)',
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'nowrap',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
