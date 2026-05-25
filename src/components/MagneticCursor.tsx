import { useEffect, useRef } from 'react'

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -200, y: -200 })
  const ring = useRef({ x: -200, y: -200 })
  const rafRef = useRef<number>(0)
  const hovering = useRef(false)

  useEffect(() => {
    document.documentElement.classList.add('custom-cursor')

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      hovering.current = !!(e.target as HTMLElement)?.closest('a, button, [data-cursor]')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)

    const tick = () => {
      const dot = dotRef.current
      const r = ringRef.current

      if (dot) {
        dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      }

      if (r) {
        ring.current.x += (pos.current.x - ring.current.x) * 0.1
        ring.current.y += (pos.current.y - ring.current.y) * 0.1

        const size = hovering.current ? 48 : 28
        const offset = size / 2
        r.style.width = `${size}px`
        r.style.height = `${size}px`
        r.style.transform = `translate(${ring.current.x - offset}px, ${ring.current.y - offset}px)`
        r.style.borderColor = hovering.current
          ? 'rgba(0,113,227,0.9)'
          : 'rgba(255,255,255,0.35)'
        r.style.background = hovering.current ? 'rgba(0,113,227,0.08)' : 'transparent'
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(rafRef.current)
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#fff',
          pointerEvents: 'none',
          zIndex: 100000,
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.35)',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          transition:
            'width 0.25s cubic-bezier(0.25,0.46,0.45,0.94), height 0.25s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.25s ease, background 0.25s ease',
        }}
      />
    </>
  )
}
