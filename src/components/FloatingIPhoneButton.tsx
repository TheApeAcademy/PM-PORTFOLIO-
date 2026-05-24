import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingIPhoneButton() {
  const [visible, setVisible] = useState(false)
  const [inSection, setInSection] = useState(false)
  const [shaking, setShaking] = useState(false)
  const btnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 100) setVisible(true) }
    window.addEventListener('scroll', onScroll, { passive: true })

    const section = document.getElementById('iphone-section')
    let observer: IntersectionObserver | null = null
    if (section) {
      observer = new IntersectionObserver(([e]) => setInSection(e.isIntersecting), { threshold: 0.15 })
      observer.observe(section)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer?.disconnect()
    }
  }, [])

  const handleClick = useCallback(() => {
    if (shaking) return
    setShaking(true)
    setTimeout(() => setShaking(false), 600)
    setTimeout(() => {
      document.getElementById('iphone-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 300)
  }, [shaking])

  const show = visible && !inSection

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          ref={btnRef}
          drag
          dragMomentum={false}
          dragElastic={0.08}
          dragConstraints={{ left: -320, right: 0, top: -600, bottom: 0 }}
          initial={{ opacity: 0, scale: 0.4, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.4, y: 30 }}
          transition={{ type: 'spring', stiffness: 340, damping: 26 }}
          whileDrag={{ scale: 1.06, cursor: 'grabbing' }}
          onClick={handleClick}
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            zIndex: 200,
            cursor: 'grab',
            userSelect: 'none',
            touchAction: 'none',
          }}
        >
          {/* Outer glow ring */}
          <div
            className="iphone-btn-glow"
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: 28,
              background: 'transparent',
              pointerEvents: 'none',
            }}
          />

          {/* iPhone body */}
          <div
            className={shaking ? 'iphone-btn-shake' : ''}
            style={{
              width: 72,
              height: 120,
              borderRadius: 22,
              background: 'linear-gradient(160deg, #242428 0%, #1A1A1E 40%, #111114 100%)',
              border: '1.5px solid rgba(255,255,255,0.14)',
              boxShadow: `
                0 0 0 1px rgba(0,113,227,0.35),
                0 24px 60px rgba(0,0,0,0.75),
                0 8px 24px rgba(0,0,0,0.5),
                0 0 40px rgba(0,113,227,0.18),
                inset 0 1px 0 rgba(255,255,255,0.12),
                inset 0 -1px 0 rgba(0,0,0,0.4)
              `,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px 8px 8px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Screen deep glow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at 50% 65%, rgba(0,113,227,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Screen gloss */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
              pointerEvents: 'none',
              borderRadius: '22px 22px 0 0',
            }} />

            {/* Dynamic Island pill */}
            <div style={{
              width: 30,
              height: 9,
              borderRadius: 5,
              background: '#000',
              flexShrink: 0,
              position: 'relative',
              zIndex: 2,
              boxShadow: '0 1px 4px rgba(0,0,0,0.6)',
            }} />

            {/* App icons grid */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
              width: '100%',
              position: 'relative',
              zIndex: 2,
              padding: '0 2px',
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, width: '100%' }}>
                {[
                  { bg: 'linear-gradient(135deg, #0A1628, #1A3050)', icon: '🦍', glow: '#0071E3' },
                  { bg: 'linear-gradient(135deg, #041208, #0A2214)', icon: '♫', glow: '#1DB954' },
                ].map((app, i) => (
                  <div key={i} style={{
                    aspectRatio: '1',
                    borderRadius: 9,
                    background: app.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 15,
                    boxShadow: `0 2px 8px rgba(0,0,0,0.5), 0 0 0 0.5px ${app.glow}44`,
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(180deg, rgba(255,255,255,0.12), transparent)', borderRadius: '9px 9px 0 0', pointerEvents: 'none' }} />
                    <span style={{ position: 'relative', zIndex: 1 }}>{app.icon}</span>
                  </div>
                ))}
              </div>
              <p style={{
                fontSize: 7,
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textAlign: 'center',
              }}>
                Projects
              </p>
            </div>

            {/* Home bar */}
            <div style={{
              width: 28,
              height: 3,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.28)',
              flexShrink: 0,
              position: 'relative',
              zIndex: 2,
            }} />
          </div>

          {/* Drag hint label */}
          <div style={{
            position: 'absolute',
            bottom: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 8,
            color: 'rgba(255,255,255,0.22)',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}>
            drag me
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
