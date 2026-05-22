import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
import AppIcon, { EmptyIconSlot } from './AppIcon'
import ProjectOverlay from './ProjectOverlay'
import type { Project } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

// Dock icon definitions
const dockItems = [
  { label: 'Contact', icon: <EnvelopeIcon /> },
  { label: 'LinkedIn', icon: <BriefcaseIcon /> },
  { label: 'GitHub', icon: <CodeIcon /> },
  { label: 'Resume', icon: <DocumentIcon /> },
]

// Total grid slots: 4×4 = 16
const GRID_SLOTS = 16
const EMPTY_SLOTS = GRID_SLOTS - projects.length

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
        { y: 120, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
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
        className="always-dark"
        style={{
          background: '#000',
          padding: '80px 24px 160px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >

        {/* Section header */}
        <p
          className="text-caption"
          style={{ marginBottom: 16, letterSpacing: '0.2em', textAlign: 'center' }}
        >
          THE FOLDER
        </p>
        <h2
          className="text-section-headline"
          style={{ color: 'var(--color-text)', textAlign: 'center', marginBottom: 20 }}
        >
          Every idea. One place.
        </h2>
        <button
          className="btn-ghost"
          style={{ marginBottom: 80 }}
          onClick={() => iphoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
        >
          View all projects ↓
        </button>

        {/* iPhone container with ambient glow */}
        <div style={{ position: 'relative' }}>
          {/* Ambient glow behind iPhone */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,113,227,0.15) 0%, transparent 65%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          {/* iPhone device */}
          <div
            ref={iphoneRef}
            className="iphone-device-wrap"
            style={{
              position: 'relative',
              zIndex: 1,
              width: 340,
              height: 736,
              borderRadius: 54,
              background: '#1C1C1E',
              boxShadow: `
                0 0 0 10px #2C2C2E,
                0 0 0 10.5px #3A3A3C,
                0 40px 80px rgba(0,0,0,0.7),
                0 20px 40px rgba(0,0,0,0.5),
                inset 0 1px 0 rgba(255,255,255,0.08)
              `,
              overflow: 'hidden',
            }}
          >
            {/* Titanium frame highlight (left edge) */}
            <div
              className="iphone-specular"
              style={{
                position: 'absolute',
                left: 8,
                top: '15%',
                height: '70%',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />

            {/* Screen area */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                right: 10,
                bottom: 10,
                borderRadius: 44,
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #050510 0%, #000818 50%, #000000 100%)',
              }}
            >
              {/* Wallpaper glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 240,
                  height: 240,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,113,227,0.12) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Screen inner shadow */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 44,
                  boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.5)',
                  pointerEvents: 'none',
                  zIndex: 10,
                }}
              />

              {/* Dynamic Island cutout */}
              <div
                style={{
                  position: 'absolute',
                  top: 12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 126,
                  height: 37,
                  borderRadius: 20,
                  background: '#000',
                  zIndex: 5,
                }}
              />

              {/* Status bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 58,
                  left: 16,
                  right: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: 4,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: 'var(--font-display)' }}>
                  9:41
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <SignalIcon />
                  <BatteryIcon />
                </div>
              </div>

              {/* App grid */}
              <div
                style={{
                  position: 'absolute',
                  top: 90,
                  left: 12,
                  right: 12,
                  bottom: 88,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 16,
                  padding: '8px 0',
                  alignContent: 'start',
                  zIndex: 3,
                }}
              >
                {projects.map((project) => (
                  <AppIcon
                    key={project.id}
                    project={project}
                    onOpen={handleOpen}
                  />
                ))}
                {Array.from({ length: EMPTY_SLOTS }).map((_, i) => (
                  <EmptyIconSlot key={`empty-${i}`} />
                ))}
              </div>

              {/* Dock */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 14,
                  left: 12,
                  right: 12,
                  zIndex: 4,
                }}
              >
                <div
                  className="glass"
                  style={{
                    borderRadius: 20,
                    padding: '10px 16px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {dockItems.map((item) => (
                    <div
                      key={item.label}
                      title={item.label}
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 15,
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                    >
                      {item.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProjectOverlay
        project={activeProject}
        originRect={originRect}
        onClose={handleClose}
      />
    </>
  )
}

// Inline SVG icons for dock
function EnvelopeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  )
}
function BriefcaseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12" />
    </svg>
  )
}
function CodeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}
function DocumentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" />
      <line x1="8" y1="17" x2="16" y2="17" />
    </svg>
  )
}
function SignalIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
      <rect x="0" y="8" width="3" height="4" rx="1" opacity="0.4" />
      <rect x="4.5" y="5" width="3" height="7" rx="1" opacity="0.6" />
      <rect x="9" y="2" width="3" height="10" rx="1" opacity="0.8" />
      <rect x="13.5" y="0" width="2.5" height="12" rx="1" />
    </svg>
  )
}
function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.5" />
      <rect x="2" y="2" width="16" height="8" rx="2" fill="white" />
      <path d="M23 4v4a2 2 0 0 0 0-4z" fill="white" fillOpacity="0.5" />
    </svg>
  )
}
