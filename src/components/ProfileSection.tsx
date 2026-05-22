import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ActivityWidget } from './WidgetRow'

gsap.registerPlugin(ScrollTrigger)

const slides = [
  {
    eyebrow: null,
    text: 'Hi.\nI\'m Banks.',
    big: true,
  },
  {
    eyebrow: 'WHO I AM',
    text: 'Final year cybersecurity student. My own PM since year two of uni.',
    big: false,
  },
  {
    eyebrow: 'HOW I THINK',
    text: 'Photographic product imagination. I see the full user journey before a wireframe exists. I call it thinking in 4K.',
    big: false,
  },
  {
    eyebrow: 'WHAT DRIVES ME',
    text: 'Customer psychology is not a skill I acquired. It\'s how I naturally read every product decision. I know why users click — and why they don\'t.',
    big: false,
  },
  {
    eyebrow: 'MY MOVE',
    text: 'I send unsolicited pitches to companies. Not feature requests — full problem → root cause → solution → projected impact. Because I see the gap and I cannot stay quiet.',
    big: false,
  },
]

export default function ProfileSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) return
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      slides.forEach((_slide, i) => {
        const el = slideRefs.current[i]
        if (!el) return
        tl.set(el, { opacity: 0, y: 24 })
        tl.to(el, { opacity: 1, y: 0, duration: 0.8 })
        tl.to(el, { opacity: 1, duration: 1.5 })
        tl.to(el, { opacity: 0, y: -24, duration: 0.8 })
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1,
        animation: tl,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const isMobileCheck = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <section
      ref={sectionRef}
      className="always-dark"
      style={{
        background: '#000',
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: isMobileCheck ? 'clamp(80px, 12vw, 120px)' : 0,
        paddingBottom: isMobileCheck ? 60 : 0,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(20px, 6vw, 80px)',
          display: 'flex',
          flexDirection: isMobileCheck ? 'column' : 'row',
          alignItems: 'center',
          gap: 60,
        }}
      >
        {/* Left: cross-fade text area */}
        <div
          style={{
            flex: '0 0 60%',
            position: 'relative',
            height: isMobileCheck ? 'auto' : '100vh',
          }}
        >
          {slides.map((slide, i) => (
            isMobileCheck ? (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  marginBottom: 48,
                  paddingTop: i === 0 ? 'clamp(80px, 10vw, 120px)' : 0,
                }}
              >
                {slide.eyebrow && (
                  <p
                    className="text-caption"
                    style={{ marginBottom: 12, letterSpacing: '0.18em', color: 'var(--color-blue-primary)' }}
                  >
                    {slide.eyebrow}
                  </p>
                )}
                <p
                  style={{
                    fontSize: slide.big ? 'clamp(56px, 8vw, 88px)' : 'clamp(22px, 3vw, 36px)',
                    fontWeight: slide.big ? 700 : 500,
                    fontFamily: slide.big ? 'var(--font-display)' : 'var(--font-display)',
                    color: '#fff',
                    lineHeight: 1.15,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {slide.text}
                </p>
              </motion.div>
            ) : (
              <div
                key={i}
                ref={(el) => { slideRefs.current[i] = el }}
                className="profile-slide"
              >
                {slide.eyebrow && (
                  <p
                    className="text-caption"
                    style={{ marginBottom: 16, letterSpacing: '0.18em', color: 'var(--color-blue-primary)' }}
                  >
                    {slide.eyebrow}
                  </p>
                )}
                <p
                  style={{
                    fontSize: slide.big ? 'clamp(56px, 8vw, 88px)' : 'clamp(22px, 3vw, 36px)',
                    fontWeight: slide.big ? 700 : 500,
                    fontFamily: 'var(--font-display)',
                    color: '#fff',
                    lineHeight: 1.2,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {slide.text}
                </p>
              </div>
            )
          ))}
        </div>

        {/* Right: ActivityWidget */}
        <div
          style={{
            flex: '0 0 40%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityWidget inView={true} />
        </div>
      </div>

    </section>
  )
}
