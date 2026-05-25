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
    if (status === 'Live') return '#34C759'
    if (status === 'In Progress') return '#0071E3'
    return '#8E8E93'
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
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000 }}
          />

          {/* Panel */}
          <motion.div
            initial={originRect ? { top: originRect.top, left: originRect.left, width: originRect.width, height: originRect.height, borderRadius: 22, opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ top: 0, left: 0, width: '100vw', height: '100vh', borderRadius: 0, opacity: 1 }}
            exit={originRect ? { top: originRect.top, left: originRect.left, width: originRect.width, height: originRect.height, borderRadius: 22, opacity: 0 } : { opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease }}
            style={{ position: 'fixed', zIndex: 1001, background: '#000', overflow: 'hidden' }}
          >
            <div
              style={{
                height: '100%',
                overflowY: 'auto',
                padding: 'clamp(40px, 6vw, 80px) clamp(24px, 6vw, 80px) clamp(60px, 8vw, 120px)',
                maxWidth: 1100,
                margin: '0 auto',
              }}
            >
              {/* Back */}
              <button
                onClick={onClose}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'none', border: 'none', color: '#86868B',
                  cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: 14,
                  padding: 0, marginBottom: 40, transition: 'color 0.2s',
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#F5F5F7')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#86868B')}
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
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '4px 12px', borderRadius: 980,
                    background: `${statusColor(project.status)}20`,
                    border: `1px solid ${statusColor(project.status)}40`,
                    fontSize: 11, fontFamily: 'var(--font-body)',
                    color: statusColor(project.status),
                    letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor(project.status) }} />
                  {project.status}
                </span>
              </div>

              {/* Project name */}
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(40px, 7vw, 80px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  color: '#F5F5F7',
                  marginBottom: 18,
                }}
              >
                {project.name}
              </h1>

              {/* Tagline */}
              <p
                style={{
                  fontSize: 'clamp(16px, 2vw, 22px)',
                  color: '#86868B',
                  fontFamily: 'var(--font-body)',
                  marginBottom: 40,
                  maxWidth: 640,
                  lineHeight: 1.55,
                  fontWeight: 300,
                }}
              >
                {project.tagline}
              </p>

              {/* BIG Case Study / Live Site CTA */}
              {project.caseStudyUrl && (
                <div
                  style={{
                    marginBottom: 56,
                    padding: '28px 32px',
                    borderRadius: 20,
                    background: 'linear-gradient(135deg, rgba(0,113,227,0.12) 0%, rgba(0,60,150,0.08) 100%)',
                    border: '1px solid rgba(0,113,227,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 24,
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#F5F5F7', marginBottom: 6 }}>
                      {project.id === 'daye' ? 'Full Case Study →  PRD, research, roadmap' : 'See it live in production'}
                    </p>
                    <p style={{ fontSize: 13, color: '#86868B', fontFamily: 'var(--font-body)', fontWeight: 300 }}>
                      {project.id === 'daye'
                        ? 'Deep-dive into every product decision: problem framing, user research, technical architecture, go-to-market.'
                        : 'Real users. Real assignments. Real payments. Built solo in 4 months.'}
                    </p>
                  </div>
                  <a
                    href={project.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '14px 28px',
                      borderRadius: 980,
                      background: '#0071E3',
                      color: '#fff',
                      fontFamily: 'var(--font-display)',
                      fontSize: 15,
                      fontWeight: 700,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'opacity 0.2s, transform 0.2s',
                      boxShadow: '0 8px 24px rgba(0,113,227,0.35)',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'scale(1.03)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
                  >
                    {project.id === 'daye' ? 'Read Full Case Study' : 'View Live Site'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                </div>
              )}

              {/* Daye — workflow visual */}
              {project.id === 'daye' && <DayeWorkflowMockups />}

              {/* Two-column body */}
              <div className="overlay-body">
                {/* Left: narrative */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
                  <ContentBlock title="The Problem" body={project.problem} />
                  <ContentBlock title="The Solution" body={project.solution} />

                  <div>
                    <SectionLabel>My Role</SectionLabel>
                    <p style={{ color: '#F5F5F7', fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7, fontWeight: 400 }}>
                      {project.role}
                    </p>
                  </div>

                  <div>
                    <SectionLabel>Key Decisions</SectionLabel>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', padding: 0 }}>
                      {project.keyDecisions.map((d, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex', gap: 14,
                            color: '#86868B', fontFamily: 'var(--font-body)',
                            fontSize: 15, lineHeight: 1.75, fontWeight: 300,
                          }}
                        >
                          <span style={{ color: '#0071E3', flexShrink: 0, marginTop: 3, fontWeight: 700 }}>→</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: meta */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {/* Metrics (visual bars for Daye) */}
                  {project.id === 'daye' ? (
                    <div>
                      <SectionLabel>Projected Impact</SectionLabel>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {[
                          { label: 'Session duration', value: '+18%', pct: 72, color: '#1DB954' },
                          { label: 'Skip rate (target)', value: '<8%', pct: 88, color: '#0071E3' },
                          { label: 'Premium conversion', value: '+12%', pct: 60, color: '#AF52DE' },
                          { label: 'NPS target', value: '65+', pct: 65, color: '#FF9F0A' },
                        ].map((m) => (
                          <div key={m.label}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontSize: 12, color: '#86868B', fontFamily: 'var(--font-body)', fontWeight: 400 }}>{m.label}</span>
                              <span style={{ fontSize: 13, color: '#F5F5F7', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{m.value}</span>
                            </div>
                            <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.06)' }}>
                              <div style={{ height: '100%', width: `${m.pct}%`, borderRadius: 2, background: m.color, transition: 'width 1s ease' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <SectionLabel>Key Metrics</SectionLabel>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {project.metrics.map((m) => (
                          <div
                            key={m.label}
                            style={{
                              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                              padding: '12px 16px', borderRadius: 12,
                              background: 'rgba(255,255,255,0.03)',
                              border: '1px solid rgba(255,255,255,0.07)',
                            }}
                          >
                            <span style={{ fontSize: 13, color: '#86868B', fontFamily: 'var(--font-body)' }}>{m.label}</span>
                            <span style={{ fontSize: 14, color: '#F5F5F7', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{m.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stack */}
                  <div>
                    <SectionLabel>Stack</SectionLabel>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          style={{
                            padding: '5px 12px', borderRadius: 980,
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            fontSize: 12, color: '#86868B',
                            fontFamily: 'var(--font-body)',
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <SectionLabel>Timeline</SectionLabel>
                    <p style={{ color: '#F5F5F7', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 400 }}>
                      {project.timeline}
                    </p>
                  </div>

                  {/* Links */}
                  {project.liveUrl && !project.caseStudyUrl && (
                    <div>
                      <SectionLabel>Links</SectionLabel>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{ width: 'fit-content' }}
                      >
                        View Live Site ↗
                      </a>
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

function DayeWorkflowMockups() {
  const screens = [
    {
      label: 'Before Daye',
      sub: 'Standard Spotify',
      bg: '#191414',
      accent: '#1DB954',
      content: (
        <div style={{ padding: '12px 10px', height: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 10, color: '#000', fontWeight: 900 }}>♫</span>
            </div>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-body)' }}>Spotify</span>
          </div>
          <p style={{ fontSize: 8, color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>Good evening</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            {['#3D1C72', '#0D3349', '#1C2A1E', '#2A1C0D'].map((c, i) => (
              <div key={i} style={{ height: 28, borderRadius: 4, background: c, display: 'flex', alignItems: 'center', gap: 4, padding: '0 5px' }}>
                <div style={{ width: 16, height: 16, borderRadius: 2, background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />
              </div>
            ))}
          </div>
          <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-body)', marginTop: 2 }}>Same playlist. Again.</p>
          <div style={{ marginTop: 'auto', padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ height: 5, width: 60, borderRadius: 2, background: 'rgba(255,255,255,0.6)', marginBottom: 3 }} />
              <div style={{ height: 4, width: 40, borderRadius: 2, background: 'rgba(255,255,255,0.25)' }} />
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.5)' }} />
              <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '4px 0 4px 7px', borderColor: 'transparent transparent transparent #000', marginLeft: 1 }} />
              </div>
              <div style={{ width: 12, height: 12, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.5)' }} />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Type your vibe',
      sub: 'Daye listening',
      bg: '#050F08',
      accent: '#1DB954',
      content: (
        <div style={{ padding: '12px 10px', height: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 13, color: '#1DB954' }}>♫</span>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: '0.06em' }}>DAYE</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* User message */}
            <div style={{ alignSelf: 'flex-end', background: '#0071E3', borderRadius: '8px 8px 2px 8px', padding: '5px 8px', maxWidth: '80%' }}>
              <p style={{ fontSize: 7, color: '#fff', fontFamily: 'var(--font-body)', lineHeight: 1.4 }}>
                late-night Lagos rooftop energy, start mellow, build slowly
              </p>
            </div>
            {/* Daye response */}
            <div style={{ alignSelf: 'flex-start', background: 'rgba(29,185,84,0.12)', border: '1px solid rgba(29,185,84,0.2)', borderRadius: '2px 8px 8px 8px', padding: '5px 8px', maxWidth: '85%' }}>
              <p style={{ fontSize: 7, color: '#1DB954', fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: 3 }}>Building your session →</p>
              {['Burna Boy · On The Low', 'Davido · Risky', 'WizKid · Essence'].map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
                  <div style={{ width: 14, height: 14, borderRadius: 2, background: ['#2D1F5E', '#1F3D2A', '#1A2D1E'][i] }} />
                  <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Input bar */}
          <div style={{ height: 22, borderRadius: 11, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', padding: '0 8px', gap: 4 }}>
            <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--font-body)', flex: 1 }}>Tell Daye how you feel...</span>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#1DB954', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="6" height="6" viewBox="0 0 10 10" fill="#000"><path d="M1 9L9 5L1 1v3l5 1-5 1v3z" /></svg>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'Daye Active',
      sub: 'Session curated',
      bg: '#040C08',
      accent: '#1DB954',
      content: (
        <div style={{ padding: '10px', height: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 7, color: '#1DB954', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.08em' }}>NOW PLAYING</span>
            <span style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>3 tracks queued</span>
          </div>
          {/* Album art */}
          <div style={{ height: 70, borderRadius: 8, background: 'linear-gradient(145deg, #1A2E3A 0%, #0D1F2A 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 70%, rgba(29,185,84,0.2) 0%, transparent 60%)' }} />
            <span style={{ fontSize: 24, position: 'relative' }}>🌙</span>
          </div>
          <div>
            <p style={{ fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)', marginBottom: 2 }}>On The Low</p>
            <p style={{ fontSize: 7, color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>Burna Boy</p>
          </div>
          {/* Progress */}
          <div>
            <div style={{ height: 2, borderRadius: 1, background: 'rgba(255,255,255,0.1)', marginBottom: 3 }}>
              <div style={{ width: '35%', height: '100%', borderRadius: 1, background: '#1DB954' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>1:24</span>
              <span style={{ fontSize: 6, color: 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)' }}>4:02</span>
            </div>
          </div>
          {/* Daye insight */}
          <div style={{ marginTop: 'auto', padding: '6px 8px', borderRadius: 6, background: 'rgba(29,185,84,0.08)', border: '1px solid rgba(29,185,84,0.18)' }}>
            <p style={{ fontSize: 6.5, color: '#1DB954', fontFamily: 'var(--font-body)', lineHeight: 1.45 }}>
              ♫ BPM rising in 2 tracks. Session building toward your rooftop peak.
            </p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div style={{ marginBottom: 64 }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', color: '#86868B', textTransform: 'uppercase', marginBottom: 20 }}>
        HOW IT WORKS
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          alignItems: 'start',
        }}
        className="daye-mockups-grid"
      >
        {screens.map((screen, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            {/* Mini phone */}
            <div
              style={{
                width: 150,
                height: 290,
                borderRadius: 28,
                background: 'linear-gradient(145deg, #C8C8CD 0%, #AEAEB3 40%, #C0C0C5 100%)',
                padding: 7,
                boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 22,
                  background: screen.bg,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Mini Dynamic Island */}
                <div
                  style={{
                    position: 'absolute',
                    top: 6,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 50,
                    height: 14,
                    borderRadius: 7,
                    background: '#000',
                    zIndex: 10,
                  }}
                />
                <div style={{ paddingTop: 26, height: '100%' }}>
                  {screen.content}
                </div>
              </div>
            </div>
            {/* Caption */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#F5F5F7', fontFamily: 'var(--font-display)', marginBottom: 3 }}>{screen.label}</p>
              <p style={{ fontSize: 11, color: '#86868B', fontFamily: 'var(--font-body)', fontWeight: 300 }}>{screen.sub}</p>
            </div>
            {/* Arrow connector (not on last) */}
            {idx < screens.length - 1 && (
              <div style={{ position: 'absolute', display: 'none' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 600, color: '#86868B', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>
      {children}
    </p>
  )
}

function ContentBlock({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <SectionLabel>{title}</SectionLabel>
      <p style={{ color: '#86868B', fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.85, fontWeight: 300 }}>
        {body}
      </p>
    </div>
  )
}
