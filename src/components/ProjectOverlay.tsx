import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '../data/projects'

interface ProjectOverlayProps {
  project: Project | null
  originRect: DOMRect | null
  onClose: () => void
}

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94]

export default function ProjectOverlay({ project, originRect, onClose }: ProjectOverlayProps) {
  const isOpen = !!project

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const statusColor = (status: string) => {
    if (status === 'Live') return '#2D7A4F'
    if (status === 'In Progress') return '#0071E3'
    return '#86868B'
  }

  return (
    <AnimatePresence>
      {isOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 1000,
            }}
          />

          {/* Panel */}
          <motion.div
            initial={
              originRect
                ? {
                    top: originRect.top,
                    left: originRect.left,
                    width: originRect.width,
                    height: originRect.height,
                    borderRadius: 22,
                    opacity: 0,
                  }
                : { opacity: 0, scale: 0.96 }
            }
            animate={{
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              borderRadius: 0,
              opacity: 1,
            }}
            exit={
              originRect
                ? {
                    top: originRect.top,
                    left: originRect.left,
                    width: originRect.width,
                    height: originRect.height,
                    borderRadius: 22,
                    opacity: 0,
                  }
                : { opacity: 0, scale: 0.96 }
            }
            transition={{ duration: 0.6, ease }}
            style={{
              position: 'fixed',
              zIndex: 1001,
              background: '#000',
              overflow: 'hidden',
            }}
          >
            {/* Scrollable content */}
            <div
              style={{
                height: '100%',
                overflowY: 'auto',
                padding: 'clamp(40px, 6vw, 80px) clamp(24px, 6vw, 80px)',
                maxWidth: 1100,
                margin: '0 auto',
              }}
            >
              {/* Back button */}
              <button
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-muted)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  padding: 0,
                  marginBottom: 40,
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to folder
              </button>

              {/* Status tag */}
              <div style={{ marginBottom: 16 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 12px',
                    borderRadius: 980,
                    background: `${statusColor(project.status)}22`,
                    border: `1px solid ${statusColor(project.status)}44`,
                    fontSize: 12,
                    fontFamily: 'var(--font-body)',
                    color: statusColor(project.status),
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: statusColor(project.status),
                    }}
                  />
                  {project.status}
                </span>
              </div>

              {/* Project name */}
              <h1
                className="text-hero"
                style={{ color: 'var(--color-text)', marginBottom: 16 }}
              >
                {project.name}
              </h1>

              {/* Tagline */}
              <p
                style={{
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  color: 'var(--color-muted)',
                  fontFamily: 'var(--font-body)',
                  marginBottom: 64,
                  maxWidth: 640,
                  lineHeight: 1.5,
                }}
              >
                {project.tagline}
              </p>

              {/* Two-column body */}
              <div
                className="overlay-body"
              >
                {/* Left: narrative */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                  <ContentBlock title="The Problem" body={project.problem} />
                  <ContentBlock title="The Solution" body={project.solution} />

                  <div>
                    <SectionLabel>My Role</SectionLabel>
                    <p style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7 }}>
                      {project.role}
                    </p>
                  </div>

                  <div>
                    <SectionLabel>Key Decisions</SectionLabel>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, listStyle: 'none', padding: 0 }}>
                      {project.keyDecisions.map((d, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            gap: 12,
                            color: 'var(--color-muted)',
                            fontFamily: 'var(--font-body)',
                            fontSize: 15,
                            lineHeight: 1.7,
                          }}
                        >
                          <span style={{ color: 'var(--color-blue-primary)', flexShrink: 0, marginTop: 2 }}>→</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: meta */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {/* Stack */}
                  <div>
                    <SectionLabel>Tech Stack</SectionLabel>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          style={{
                            padding: '5px 12px',
                            borderRadius: 980,
                            background: 'var(--color-surface-3)',
                            border: '1px solid var(--color-border)',
                            fontSize: 12,
                            color: 'var(--color-muted)',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div>
                    <SectionLabel>Key Metrics</SectionLabel>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 16px',
                            borderRadius: 12,
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          <span style={{ fontSize: 13, color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>
                            {m.label}
                          </span>
                          <span style={{ fontSize: 14, color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <SectionLabel>Timeline</SectionLabel>
                    <p style={{ color: 'var(--color-text)', fontFamily: 'var(--font-body)', fontSize: 15 }}>
                      {project.timeline}
                    </p>
                  </div>

                  {/* Links */}
                  {(project.liveUrl || project.githubUrl) && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <SectionLabel>Links</SectionLabel>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary"
                          style={{ width: 'fit-content' }}
                        >
                          View Live Site ↗
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary"
                          style={{ width: 'fit-content' }}
                        >
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-caption"
      style={{ marginBottom: 12, letterSpacing: '0.15em' }}
    >
      {children}
    </p>
  )
}

function ContentBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      <p style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8 }}>
        {body}
      </p>
    </div>
  )
}
