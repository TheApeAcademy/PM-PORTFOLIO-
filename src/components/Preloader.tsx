import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const letters = containerRef.current?.querySelectorAll<HTMLElement>('.preloader-letter-inner')
    if (!letters || !progressRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        })
      },
    })

    tl.fromTo(
      letters,
      { y: '110%' },
      {
        y: '0%',
        stagger: 0.07,
        duration: 0.7,
        ease: 'power4.out',
      }
    )

    tl.to(
      progressRef.current,
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      },
      '+=0.5'
    )

    tl.add(() => {}, '+=0.1')

    return () => {
      tl.kill()
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(4px, 1vw, 12px)',
          marginBottom: 16,
        }}
      >
        {'BANKS'.split('').map((letter, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              lineHeight: 1,
            }}
          >
            <span
              className="preloader-letter-inner"
              style={{
                display: 'inline-block',
                fontSize: 'clamp(72px, 14vw, 140px)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.05em',
                fontFamily: 'var(--font-display)',
                lineHeight: 0.9,
              }}
            >
              {letter}
            </span>
          </span>
        ))}
      </div>

      <p
        style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.28)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          marginTop: 8,
        }}
      >
        Loading experience
      </p>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'rgba(255,255,255,0.07)',
          overflow: 'hidden',
        }}
      >
        <div
          ref={progressRef}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #0071E3, #3BA0FF)',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </div>
  )
}
