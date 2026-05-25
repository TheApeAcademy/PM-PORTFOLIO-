import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import ProjectOverlay from './ProjectOverlay'
import type { Project } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const gridProjects = projects.filter((p) => p.showInGrid)

const dockItems = [
  { label: 'Mail', href: 'mailto:j0shbankole19@gmail.com', bg: '#0071E3', icon: <MailIcon /> },
  { label: 'Phone', href: 'tel:+2348165320780', bg: '#34C759', icon: <PhoneIcon /> },
  { label: 'WhatsApp', href: 'https://wa.me/2348165320780', target: '_blank', bg: '#25D366', icon: <WhatsAppIcon /> },
  { label: 'Resume', href: '/resume.html', target: '_blank', bg: '#FF9500', icon: <ResumeIcon /> },
]

export default function IPhoneSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const iphoneRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [originRect, setOriginRect] = useState<DOMRect | null>(null)
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !iphoneRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        iphoneRef.current,
        { y: 100, opacity: 0, scale: 0.88 },
        {
          y: 0, opacity: 1, scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 25%',
            scrub: 1.2,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const outer = iphoneRef.current
    const el = tiltRef.current
    if (!outer || !el) return

    let animId: number | null = null
    let currentX = 2, currentY = -6, targetX = 2, targetY = -6

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    function animate() {
      currentX = lerp(currentX, targetX, 0.10)
      currentY = lerp(currentY, targetY, 0.10)
      el!.style.transform = `perspective(1200px) rotateX(${currentX}deg) rotateY(${currentY}deg) translateZ(0)`
      if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
        animId = requestAnimationFrame(animate)
      } else { animId = null }
    }

    const onMove = (e: MouseEvent) => {
      const r = outer.getBoundingClientRect()
      const nx = (e.clientX - r.left) / r.width - 0.5
      const ny = (e.clientY - r.top) / r.height - 0.5
      targetX = -ny * 14; targetY = nx * 18
      if (!animId) animId = requestAnimationFrame(animate)
    }

    const onLeave = () => {
      targetX = 2; targetY = -6
      if (!animId) animId = requestAnimationFrame(animate)
    }

    outer.addEventListener('mousemove', onMove as EventListener)
    outer.addEventListener('mouseleave', onLeave)
    el.style.transform = `perspective(1200px) rotateX(2deg) rotateY(-6deg) translateZ(0)`

    return () => {
      outer.removeEventListener('mousemove', onMove as EventListener)
      outer.removeEventListener('mouseleave', onLeave)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  const handleOpen = (project: Project, rect: DOMRect) => {
    setOriginRect(rect)
    setActiveProject(project)
  }
  const handleClose = () => {
    setActiveProject(null)
    setOriginRect(null)
  }

  return (
    <>
      <section
        id="iphone-section"
        ref={sectionRef}
        className="always-dark iphone-fullscreen"
        style={{
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          padding: 'clamp(60px, 8vw, 100px) 24px clamp(80px, 10vw, 140px)',
          overflow: 'hidden',
        }}
      >
        {/* Ambient background glow — inset so it never overflows */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,80,220,0.22) 0%, transparent 65%),
              radial-gradient(ellipse 40% 30% at 50% 60%, rgba(0,113,227,0.06) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        />

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 72px)', position: 'relative', zIndex: 2 }}
        >
          <p className="text-caption" style={{ marginBottom: 14, letterSpacing: '0.22em' }}>
            THE FOLDER
          </p>
          <h2
            className="text-section-headline"
            style={{
              color: 'var(--color-text)',
              marginBottom: 20,
              fontWeight: 800,
              letterSpacing: '-0.03em',
            }}
          >
            Every idea. One place.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: 400,
              margin: '0 auto 28px',
              lineHeight: 1.65,
              fontWeight: 300,
            }}
          >
            Tap any project to go deep. The problem, the thinking, the decisions.
          </p>
          <button
            className="btn-ghost"
            onClick={() => iphoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          >
            View all projects ↓
          </button>
        </motion.div>

        {/* iPhone 17 Pro Max */}
        <div ref={iphoneRef} className="iphone-outer-wrap" style={{ position: 'relative', zIndex: 2 }}>
          {/* Ambient glow behind phone — clamped so it can't cause overflow */}
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(400px, 90vw)',
              height: 'min(400px, 90vw)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,113,227,0.14) 0%, transparent 65%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Phone wrapper */}
          <div className="iphone-device-wrap" style={{ position: 'relative', zIndex: 1 }}>
            {/* Natural Titanium outer frame — 14-stop metallic gradient */}
            <div
              ref={tiltRef}
              style={{
                width: 393,
                height: 852,
                borderRadius: 55,
                background: `linear-gradient(
                  148deg,
                  rgba(255,255,255,0.92) 0%, #E2E2EA 3%, #C6C6D2 8%, #D8D8E4 15%,
                  #B8B8C8 22%, #CCCCD8 30%, #B4B4C4 39%, #CCCCD8 49%,
                  #B2B2C2 59%, #C6C6D4 69%, #B8B8C8 79%, #D2D2E0 89%,
                  #EAEAF2 96%, #C4C4D2 100%
                )`,
                padding: 13,
                boxShadow: `
                  0 0 0 0.5px rgba(255,255,255,0.88),
                  0 0 0 1px rgba(80,80,105,0.65),
                  0 0 0 1.5px rgba(140,140,165,0.18),
                  inset 0 2px 0 rgba(255,255,255,0.8),
                  inset 0 -2px 0 rgba(0,0,0,0.1),
                  inset 2px 0 0 rgba(255,255,255,0.5),
                  inset -2px 0 0 rgba(0,0,0,0.07),
                  0 60px 150px rgba(0,0,0,0.92),
                  0 25px 65px rgba(0,0,0,0.58),
                  0 8px 22px rgba(0,0,0,0.40)
                `,
                position: 'relative',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
              }}
            >
              {/* Corner glint — top-left titanium flare */}
              <div style={{
                position: 'absolute', top: 0, left: 0, width: 120, height: 120,
                borderRadius: '55px 0 0 0',
                background: 'radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.55) 0%, transparent 65%)',
                pointerEvents: 'none', zIndex: 2,
              }} />
              {/* Action button (left side, top — iPhone 15+) */}
              <div style={{ position: 'absolute', left: -4, top: 118, width: 4, height: 34, borderRadius: '2px 0 0 2px', background: 'linear-gradient(to right, #9A9AA2, #C8C8D0)', boxShadow: '-2px 0 5px rgba(0,0,0,0.55)', zIndex: 5 }} />
              {/* Volume up */}
              <div style={{ position: 'absolute', left: -4, top: 168, width: 4, height: 66, borderRadius: '2px 0 0 2px', background: 'linear-gradient(to right, #9A9AA2, #C8C8D0)', boxShadow: '-2px 0 5px rgba(0,0,0,0.55)', zIndex: 5 }} />
              {/* Volume down */}
              <div style={{ position: 'absolute', left: -4, top: 248, width: 4, height: 66, borderRadius: '2px 0 0 2px', background: 'linear-gradient(to right, #9A9AA2, #C8C8D0)', boxShadow: '-2px 0 5px rgba(0,0,0,0.55)', zIndex: 5 }} />
              {/* Power button (right side) */}
              <div style={{ position: 'absolute', right: -4, top: 190, width: 4, height: 92, borderRadius: '0 2px 2px 0', background: 'linear-gradient(to left, #9A9AA2, #C8C8D0)', boxShadow: '2px 0 5px rgba(0,0,0,0.55)', zIndex: 5 }} />

              {/* Screen */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 43,
                  overflow: 'hidden',
                  background: `
                    radial-gradient(ellipse 110% 60% at 50% 110%, rgba(0,80,220,0.65) 0%, rgba(0,40,130,0.4) 30%, transparent 60%),
                    radial-gradient(ellipse 80% 45% at 25% 100%, rgba(50,0,180,0.3) 0%, transparent 50%),
                    radial-gradient(ellipse 60% 35% at 75% 95%, rgba(0,120,255,0.22) 0%, transparent 45%),
                    radial-gradient(ellipse 50% 25% at 50% 50%, rgba(0,30,80,0.15) 0%, transparent 60%),
                    linear-gradient(180deg, #020307 0%, #030610 20%, #04080F 60%, #020407 100%)
                  `,
                  position: 'relative',
                }}
              >
                {/* Screen glass sheen — upper reflection */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, height: '46%',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.028) 55%, transparent 100%)',
                    borderRadius: '43px 43px 0 0',
                    pointerEvents: 'none',
                    zIndex: 20,
                  }}
                />
                {/* Side-specular light stripe */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10%', left: 0, width: 2, bottom: '10%',
                    background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)',
                    borderRadius: 2,
                    pointerEvents: 'none',
                    zIndex: 21,
                  }}
                />

                {/* Dynamic Island with camera + Face ID detail */}
                <div
                  style={{
                    position: 'absolute',
                    top: 14,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 126,
                    height: 37,
                    borderRadius: 20,
                    background: '#000',
                    zIndex: 15,
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,1), 0 0 0 0.5px rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 11,
                    gap: 5,
                  }}
                >
                  {/* Camera lens */}
                  <div style={{
                    width: 13, height: 13, borderRadius: '50%',
                    background: 'radial-gradient(circle at 35% 35%, #1A1A2E 0%, #000 60%)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: 'inset 0 0 5px rgba(0,0,0,0.9)',
                    position: 'relative', flexShrink: 0,
                  }}>
                    <div style={{
                      position: 'absolute', top: 2.5, left: 2.5,
                      width: 3.5, height: 3.5, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.20)',
                    }} />
                  </div>
                  {/* Face ID sensor dots */}
                  <div style={{ display: 'flex', gap: 3, marginLeft: 3 }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
                    ))}
                  </div>
                </div>

                {/* Status bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 60,
                    left: 24,
                    right: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 10,
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#fff', fontFamily: '-apple-system, SF Pro Display, var(--font-display)' }}>
                    9:41
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <SignalIcon />
                    <WifiIcon />
                    <BatteryIcon />
                  </div>
                </div>

                {/* App grid */}
                <div
                  style={{
                    position: 'absolute',
                    top: 110,
                    left: 20,
                    right: 20,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 22,
                    padding: '8px 4px',
                    alignContent: 'start',
                    zIndex: 5,
                  }}
                >
                  {gridProjects.map((project) => (
                    <AppIconCell
                      key={project.id}
                      project={project}
                      onOpen={handleOpen}
                    />
                  ))}
                </div>

                {/* Dock area */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 14,
                    right: 14,
                    zIndex: 10,
                  }}
                >
                  {/* Home indicator */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                    <div style={{ width: 120, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.35)' }} />
                  </div>

                  {/* Dock */}
                  <div
                    style={{
                      borderRadius: 26,
                      padding: '12px 18px',
                      display: 'flex',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      background: 'rgba(255,255,255,0.09)',
                      backdropFilter: 'blur(30px)',
                      WebkitBackdropFilter: 'blur(30px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    {dockItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.target as '_blank' | undefined}
                        rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                        title={item.label}
                        aria-label={item.label}
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: 14,
                          background: item.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          textDecoration: 'none',
                          flexShrink: 0,
                          boxShadow: `0 4px 12px ${item.bg}55, inset 0 1px 0 rgba(255,255,255,0.3)`,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.15) translateY(-3px)' }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) translateY(0)' }}
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectOverlay project={activeProject} originRect={originRect} onClose={handleClose} />
    </>
  )
}

function AppIconCell({ project, onOpen }: { project: Project; onOpen: (p: Project, r: DOMRect) => void }) {
  const ref = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    onOpen(project, rect)
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, cursor: 'pointer' }}
      onClick={handleClick}
      ref={ref}
    >
      {/* iOS-style app icon */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 15,
          background: project.iconGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          boxShadow: `
            0 4px 14px rgba(0,0,0,0.6),
            0 1px 4px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.12),
            0 0 0 0.5px ${project.iconColor}55
          `,
          transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.1)' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)' }}
        onMouseDown={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(0.93)' }}
        onMouseUp={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.1)' }}
      >
        {/* Icon gloss */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '50%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
            borderRadius: '15px 15px 0 0',
            pointerEvents: 'none',
          }}
        />
        <span style={{ position: 'relative', zIndex: 1, lineHeight: 1, fontSize: project.iconLabel.length > 1 ? 18 : 26 }}>
          {project.iconLabel}
        </span>
      </div>
      {/* App name */}
      <span
        style={{
          fontSize: 10,
          color: 'rgba(255,255,255,0.88)',
          fontFamily: '-apple-system, SF Pro Text, var(--font-body)',
          fontWeight: 400,
          textAlign: 'center',
          letterSpacing: '0.01em',
          lineHeight: 1.2,
          maxWidth: 62,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
        }}
      >
        {project.name}
      </span>
    </div>
  )
}

// Realistic dock icons
function MailIcon() {
  return (
    <svg width="26" height="22" viewBox="0 0 26 22" fill="none">
      <rect width="26" height="22" rx="0" fill="none" />
      <path d="M1 3.5L13 12.5L25 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M1 3.5H25V18.5C25 19.6 24.1 20.5 23 20.5H3C1.9 20.5 1 19.6 1 18.5V3.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  )
}
function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="white">
      <path d="M13 2C7 2 2 7 2 13c0 2 .5 3.8 1.5 5.4L2 24l5.8-1.5C9.2 23.5 11 24 13 24c6 0 11-5 11-11S19 2 13 2zm5.5 15.4c-.2.7-1.3 1.3-1.8 1.4-.5.1-1 .1-3-.6-3.6-1.5-5.9-5.1-6.1-5.4-.2-.3-1.3-1.7-1.3-3.2 0-1.5.8-2.2 1.1-2.5.3-.3.6-.4.9-.4h.6c.2 0 .5-.1.7.5l1 2.4c.1.3.1.6-.1.8l-.4.5c-.2.2-.3.4-.1.8.5 1 1.3 1.9 2.2 2.6.6.4 1.3.8 2 1.1.4.2.6.1.8-.1l.6-.7c.2-.3.5-.4.8-.2l2.4 1.1c.3.1.5.3.5.6 0 .3-.2 1.1-.8 1.7z" />
    </svg>
  )
}
function ResumeIcon() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
      <rect x="1" y="1" width="20" height="24" rx="3" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M5 8h12M5 12h12M5 16h8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function SignalIcon() {
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="4.5" y="5.5" width="3" height="6.5" rx="1" />
      <rect x="9" y="3" width="3" height="9" rx="1" />
      <rect x="13.5" y="0" width="3" height="12" rx="1" />
    </svg>
  )
}
function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
      <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
      <path d="M3.8 6.5C5 5.3 6.4 4.5 8 4.5s3 .8 4.2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M1 3.5C3 1.5 5.4 0.5 8 0.5s5 1 7 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  )
}
function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="white" strokeOpacity="0.45" />
      <rect x="2" y="2" width="18" height="9" rx="2" fill="white" />
      <path d="M25 4.5v4c.8-.4 1.3-1.2 1.3-2S25.8 4.9 25 4.5z" fill="white" fillOpacity="0.45" />
    </svg>
  )
}
