import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

interface LabEntry {
  id: string
  company: string
  category: string
  accentColor: string
  iconBg: string
  iconLabel: string
  status: 'Full PRD' | 'Analysis Complete' | 'In Progress'
  tagline: string
  problem: string
  rootCause: string
  proposal: string
  impact: string
  docUrl?: string
}

const entries: LabEntry[] = [
  {
    id: 'spotify-daye',
    company: 'Spotify',
    category: 'Music · AI · Retention',
    accentColor: '#1DB954',
    iconBg: 'linear-gradient(135deg, #050F08 0%, #0D2414 100%)',
    iconLabel: '♫',
    status: 'Full PRD',
    tagline: 'The music platform that forgot how to listen.',
    problem:
      "Spotify's core interaction model — search, press play, shuffle — hasn't meaningfully evolved since 2006. 31% of users self-report \"playlist paralysis\". Static playlists degrade emotionally over time. The platform knows nothing about WHY you're listening: a late-night Lagos rooftop session and a 6am gym lift receive identical algorithmic treatment. TikTok and Apple Music are actively converging on conversational music. Spotify's window to lead is narrow.",
    rootCause:
      'The product optimises for catalogue discovery, not session quality. There is no emotional context layer — the platform treats music preference as categorical (genre, artist) rather than situational (mood, energy arc, social context). The recommendation engine looks backward at history rather than forward into the current moment.',
    proposal:
      'Daye — an AI-native conversational layer built on top of Spotify\'s existing Audio Features API. Users speak or type intent naturally ("give me late-night Lagos rooftop energy, start mellow, build slowly") and Daye interprets emotional intent, curates an adaptive session, and manages transitions like a professional DJ. Real-time queue re-evaluation every 2 tracks. Harmonic mixing. BPM arc management. Voice + text modes. Free tier gets 2 Daye sessions/day to create habit loop and drive Premium conversion.',
    impact: '+18% session duration · <8% skip rate · +12% Premium conversion · NPS target 65+',
    docUrl: '/daye-case-study.html',
  },
  {
    id: 'alexa-memory',
    company: 'Amazon Alexa',
    category: 'Voice AI · Smart Home · Identity',
    accentColor: '#00A8E0',
    iconBg: 'linear-gradient(135deg, #030A12 0%, #061522 100%)',
    iconLabel: 'A',
    status: 'Analysis Complete',
    tagline: "The assistant that knows your home but doesn't know you.",
    problem:
      "Alexa resets to zero at the start of every conversation. It has no persistent memory, no household identity model, and no ability to distinguish between family members reliably. A product that calls itself an \"assistant\" but forgets every interaction is a contradiction. Smart home routines fail silently — users never learn why — so they abandon automation entirely. After the initial novelty wears off, engagement collapses because there is no relationship to deepen.",
    rootCause:
      "Alexa was architecturally designed as a command interface, not a relational one. The interaction model — \"trigger word + command + response\" — was correct in 2014 but has not evolved with user expectation. The absence of voice-profile-level personalisation means the platform serves the device, not the person using it. Silent failure in routines compounds this: no feedback loop means no improvement in trust.",
    proposal:
      'Persistent Memory Layer (opt-in): A user-consent-gated memory system where Alexa retains context across sessions — preferences, recurring patterns, ongoing tasks. Voice ID per household member with automatic profile switching. Proactive micro-context: \"You usually ask for traffic at 7:50am — want me to start automatically?\" Silent failure alerts with plain-language diagnosis: \"Your morning routine failed because the smart plug didn\'t respond — tap to fix.\" This repositions Alexa from command tool to ambient relationship.',
    impact:
      'Daily active use retention +24% · Routine adoption +40% · Household NPS recovery from 34 → 58',
  },
  {
    id: 'linkedin-signal',
    company: 'LinkedIn',
    category: 'Professional Network · Discovery · Signal',
    accentColor: '#0A66C2',
    iconBg: 'linear-gradient(135deg, #010810 0%, #021020 100%)',
    iconLabel: 'in',
    status: 'Analysis Complete',
    tagline: "A network of 1 billion people where nobody can find the right signal.",
    problem:
      'LinkedIn\'s feed is algorithmically optimised for engagement, not relevance. The result: a scroll of corporate announcements, motivational quotes, and "I\'m excited to announce" posts that train users to disengage. Job seekers apply to hundreds of roles and hear nothing. Hiring managers are buried in unqualified applications. The connection model conflates "colleague" with "contact" with "person I met once" — destroying the signal value of a recommendation.',
    rootCause:
      'LinkedIn optimises for time-on-platform over professional value delivered. Engagement (likes, comments, shares) as a primary metric incentivises viral emotional content over substantive professional exchange. The job matching algorithm treats skills as keywords, not capabilities. Applications are unverified claims on a PDF — the platform does nothing to validate them before they reach a hiring manager.',
    proposal:
      'Three interventions: (1) Feed Quality Score — a user-adjustable signal/noise dial that deprioritises engagement-bait and surfaces only content from people you\'ve actually worked with or explicitly follow for professional insight. (2) Verified Skills badges — short async assessments that validate claimed skills before an application reaches a recruiter. (3) Warm Intro Layer — when applying to a role, surface first and second-degree connections at the company with a one-tap "ask for context".',
    impact:
      'Recruiter response rate +35% · Application-to-interview conversion +28% · Feed session satisfaction NPS +22pts',
  },
]

const statusColors: Record<LabEntry['status'], { bg: string; text: string; border: string }> = {
  'Full PRD':         { bg: 'rgba(29,185,84,0.12)',  text: '#1DB954', border: 'rgba(29,185,84,0.25)' },
  'Analysis Complete':{ bg: 'rgba(0,113,227,0.12)',  text: '#0071E3', border: 'rgba(0,113,227,0.25)' },
  'In Progress':      { bg: 'rgba(134,134,139,0.12)',text: '#86868B', border: 'rgba(134,134,139,0.2)' },
}

function ImpactChips({ impact, accentColor }: { impact: string; accentColor: string }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {impact.split(' · ').map((chip, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            padding: '5px 12px',
            borderRadius: 8,
            background: `${accentColor}12`,
            border: `1px solid ${accentColor}30`,
            fontSize: 11,
            color: accentColor,
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            lineHeight: 1.5,
          }}
        >
          {chip}
        </span>
      ))}
    </div>
  )
}

function ContentBlock({ label, content, accentColor }: { label: string; content: string; accentColor: string }) {
  return (
    <div>
      <p
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: accentColor,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body)',
          marginBottom: 10,
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: 14,
          color: 'rgba(134,134,139,0.9)',
          lineHeight: 1.85,
          fontFamily: 'var(--font-body)',
          fontWeight: 300,
        }}
      >
        {content}
      </p>
    </div>
  )
}

export default function ProductLab() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
  const [activeId, setActiveId] = useState(entries[0].id)

  const active = entries.find(e => e.id === activeId) ?? entries[0]
  const sc = statusColors[active.status]

  return (
    <section
      className="always-dark"
      style={{
        background: '#000',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
      }}
    >
      {/* Background watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '6%',
          right: '-2%',
          fontSize: 'clamp(80px, 18vw, 220px)',
          fontWeight: 900,
          fontFamily: 'var(--font-display)',
          color: '#fff',
          opacity: 0.018,
          letterSpacing: '-0.06em',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        INTELLIGENCE
      </div>

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 800,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${active.accentColor}08 0%, transparent 60%)`,
          pointerEvents: 'none',
          transition: 'background 0.6s ease',
        }}
      />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: 56 }}
        >
          <p className="text-caption" style={{ marginBottom: 16, letterSpacing: '0.22em' }}>
            INTELLIGENCE LAB
          </p>
          <h2
            className="text-section-headline"
            style={{ color: '#F5F5F7', marginBottom: 16, maxWidth: 640, fontWeight: 800, letterSpacing: '-0.03em' }}
          >
            How I think about other people's products.
          </h2>
          <p
            style={{
              fontSize: 16,
              color: '#86868B',
              fontFamily: 'var(--font-body)',
              maxWidth: 520,
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Unsolicited analyses I wrote because I couldn't stop seeing the problems. Structured as if I was already inside the company.
          </p>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          style={{
            display: 'flex',
            gap: 4,
            marginBottom: 32,
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: 0,
          }}
        >
          {entries.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setActiveId(entry.id)}
              style={{
                padding: '10px 20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                fontWeight: activeId === entry.id ? 700 : 400,
                color: activeId === entry.id ? entry.accentColor : '#86868B',
                borderBottom: activeId === entry.id ? `2px solid ${entry.accentColor}` : '2px solid transparent',
                marginBottom: -1,
                transition: 'all 0.2s ease',
                letterSpacing: '-0.01em',
              }}
            >
              {entry.company}
            </button>
          ))}
        </motion.div>

        {/* Animated content panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease }}
            style={{
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.025)',
              backdropFilter: 'blur(40px) saturate(180%)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%)',
              overflow: 'hidden',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 32px 80px rgba(0,0,0,0.4)',
              position: 'relative',
            }}
          >
            {/* Brand ambient glow */}
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0,
                width: '45%', height: '260px',
                background: `radial-gradient(ellipse at 10% 0%, ${active.accentColor}14 0%, transparent 65%)`,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Top accent line */}
            <div style={{ height: 2, background: `linear-gradient(90deg, ${active.accentColor}CC 0%, ${active.accentColor}30 50%, transparent 80%)` }} />

            {/* Card header */}
            <div
              style={{
                padding: 'clamp(20px,3vw,32px) clamp(20px,3vw,36px)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 18,
                flexWrap: 'wrap',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: 52, height: 52,
                  borderRadius: 15,
                  background: active.iconBg,
                  border: `1px solid ${active.accentColor}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: active.iconLabel.length > 1 ? 16 : 22,
                  fontWeight: 800,
                  color: active.accentColor,
                  fontFamily: 'var(--font-display)',
                  flexShrink: 0,
                  boxShadow: `0 0 24px ${active.accentColor}20`,
                }}
              >
                {active.iconLabel}
              </div>

              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(18px,2.8vw,26px)',
                      fontWeight: 800,
                      color: '#F5F5F7',
                      letterSpacing: '-0.025em',
                    }}
                  >
                    {active.company}
                  </span>
                  <span
                    style={{
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', padding: '3px 10px', borderRadius: 980,
                      background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
                    }}
                  >
                    {active.status}
                  </span>
                </div>
                <p style={{ fontSize: 10, color: '#686868', fontFamily: 'var(--font-body)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
                  {active.category}
                </p>
                <p
                  style={{
                    fontSize: 'clamp(14px,1.8vw,17px)',
                    fontWeight: 600, fontStyle: 'italic',
                    color: 'rgba(245,245,247,0.82)',
                    fontFamily: 'var(--font-display)', lineHeight: 1.45,
                  }}
                >
                  "{active.tagline}"
                </p>
              </div>
            </div>

            {/* Impact strip */}
            <div
              style={{
                padding: '12px clamp(20px,3vw,36px)',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
                background: `${active.accentColor}06`,
                position: 'relative', zIndex: 1,
              }}
            >
              <span
                style={{
                  fontSize: 9, fontWeight: 700, color: active.accentColor,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-body)', flexShrink: 0, opacity: 0.8,
                }}
              >
                Impact Target
              </span>
              <ImpactChips impact={active.impact} accentColor={active.accentColor} />
            </div>

            {/* Single-column body — readable on all screen sizes */}
            <div
              style={{
                padding: 'clamp(20px,3vw,32px) clamp(20px,3vw,36px)',
                display: 'flex', flexDirection: 'column', gap: 28,
                position: 'relative', zIndex: 1,
              }}
            >
              <ContentBlock label="Problem" content={active.problem} accentColor={active.accentColor} />
              <ContentBlock label="Root Cause" content={active.rootCause} accentColor={active.accentColor} />
              <ContentBlock label="Proposed Solution" content={active.proposal} accentColor={active.accentColor} />

              {active.docUrl && (
                <a
                  href={active.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    fontSize: 13, fontWeight: 600, color: active.accentColor,
                    fontFamily: 'var(--font-display)', textDecoration: 'none',
                    padding: '10px 18px', borderRadius: 12,
                    border: `1px solid ${active.accentColor}30`,
                    background: `${active.accentColor}08`,
                    transition: 'all 0.2s ease',
                    alignSelf: 'flex-start',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${active.accentColor}18`; e.currentTarget.style.borderColor = `${active.accentColor}55` }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${active.accentColor}08`; e.currentTarget.style.borderColor = `${active.accentColor}30` }}
                >
                  Read full PRD document
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Closing CTA — links to iPhone / projects section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          style={{ marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}
        >
          <p style={{ fontSize: 13, color: '#38383A', fontFamily: 'var(--font-body)', letterSpacing: '0.03em' }}>
            These are the three I published. I've got more in progress.
          </p>
          <a
            href="#iphone-section"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 13, fontWeight: 600, color: '#0071E3',
              fontFamily: 'var(--font-display)', textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            See my projects
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
