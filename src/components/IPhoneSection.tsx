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
        {/* Ambient background glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0,80,220,0.18) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 20% 80%, rgba(60,0,180,0.08) 0%, transparent 50%),
              radial-gradient(ellipse 40% 30% at 80% 70%, rgba(0,113,227,0.06) 0%, transparent 40%)
            `,
            pointerEvents: 'none',
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
            Tap any project to go deep — the problem, the thinking, the decisions.
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
          {/* Ambient glow behind phone */}
          <div
            style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 600,
              height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,113,227,0.12) 0%, transparent 65%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* Phone wrapper */}
          <div className="iphone-device-wrap" style={{ position: 'relative', zIndex: 1 }}>
            {/* Natural Titanium outer frame */}
            <div
              style={{
                width: 393,
                height: 852,
                borderRadius: 55,
                background: 'linear-gradient(145deg, #D2D2D7 0%, #ACACB1 25%, #C4C4C9 50%, #9E9EA3 75%, #B8B8BD 100%)',
                padding: 13,
                boxShadow: `
                  0 0 0 0.5px rgba(255,255,255,0.35),
                  0 0 0 1.5px #6A6A6F,
                  0 60px 140px rgba(0,0,0,0.85),
                  0 30px 70px rgba(0,0,0,0.55),
                  0 10px 30px rgba(0,0,0,0.4),
                  inset 0 1.5px 0 rgba(255,255,255,0.5),
                  inset 0 -1px 0 rgba(0,0,0,0.25)
                `,
                position: 'relative',
              }}
            >
              {/* Volume buttons (left side) */}
              <div style={{ position: 'absolute', left: -3.5, top: 140, width: 3.5, height: 36, borderRadius: '2px 0 0 2px', background: 'linear-gradient(to right, #8C8C91, #ACACB1)', boxShadow: '-1px 0 3px rgba(0,0,0,0.4)' }} />
              <div style={{ position: 'absolute', left: -3.5, top: 188, width: 3.5, height: 64, borderRadius: '2px 0 0 2px', background: 'linear-gradient(to right, #8C8C91, #ACACB1)', boxShadow: '-1px 0 3px rgba(0,0,0,0.4)' }} />
              <div style={{ position: 'absolute', left: -3.5, top: 264, width: 3.5, height: 64, borderRadius: '2px 0 0 2px', background: 'linear-gradient(to right, #8C8C91, #ACACB1)', boxShadow: '-1px 0 3px rgba(0,0,0,0.4)' }} />
              {/* Power button (right side) */}
              <div style={{ position: 'absolute', right: -3.5, top: 190, width: 3.5, height: 90, borderRadius: '0 2px 2px 0', background: 'linear-gradient(to left, #8C8C91, #ACACB1)', boxShadow: '1px 0 3px rgba(0,0,0,0.4)' }} />

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
                {/* Screen gloss overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.05) 100%)',
                    borderRadius: 43,
                    pointerEvents: 'none',
                    zIndex: 20,
                  }}
                />

                {/* Dynamic Island */}
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 5,
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.06), inset 0 0 8px rgba(0,0,0,0.8)',
                  }}
                >
                  {/* Live music indicator in Dynamic Island */}
                  <span style={{ fontSize: 11, color: '#1DB954', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: '-0.01em' }}>♫</span>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 14 }}>
                    {[5, 10, 7, 12, 8].map((h, i) => (
                      <div
                        key={i}
                        style={{
                          width: 2.5,
                          height: h,
                          background: '#1DB954',
                          borderRadius: 2,
                          animation: `musicBar 0.8s ease-in-out ${i * 0.12}s infinite alternate`,
                        }}
                      />
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
        <span style={{ position: 'relative', zIndex: 1, lineHeight: 1 }}>
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
