import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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
      'LinkedIn\'s feed is algorithmically optimised for engagement, not relevance. The result: a scroll of corporate announcements, motivational quotes, and "I\'m excited to announce" posts that train users to disengage. Job seekers apply to hundreds of roles and hear nothing. Hiring managers are buried in unqualified applications. The connection model conflates "colleague" with "contact" with "person I met once" — destroying the signal value of a recommendation. The platform has become the professional version of Facebook\'s worst habits.',
    rootCause:
      'LinkedIn optimises for time-on-platform over professional value delivered. Engagement (likes, comments, shares) as a primary metric incentivises viral emotional content over substantive professional exchange. The job matching algorithm treats skills as keywords, not capabilities. Applications are unverified claims on a PDF — the platform does nothing to validate them before they reach a hiring manager.',
    proposal:
      'Three interventions: (1) Feed Quality Score — a user-adjustable signal/noise dial that deprioritises engagement-bait and surfaces only content from people you\'ve actually worked with or explicitly follow for professional insight. (2) Verified Skills badges — short async assessments (not tests, but demonstrated work samples) that validate claimed skills before an application is visible to a recruiter. (3) Warm Intro Layer — when applying to a role, surface first and second-degree connections at the company with a one-tap "ask for context" that respects both parties\' time.',
    impact:
      'Recruiter response rate +35% · Application-to-interview conversion +28% · Feed session satisfaction NPS +22pts',
  },
]

const statusColors: Record<LabEntry['status'], { bg: string; text: string; border: string }> = {
  'Full PRD': { bg: 'rgba(29,185,84,0.12)', text: '#1DB954', border: 'rgba(29,185,84,0.25)' },
  'Analysis Complete': { bg: 'rgba(0,113,227,0.12)', text: '#0071E3', border: 'rgba(0,113,227,0.25)' },
  'In Progress': { bg: 'rgba(134,134,139,0.12)', text: '#86868B', border: 'rgba(134,134,139,0.2)' },
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
            letterSpacing: '0.01em',
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
          fontSize: 13,
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

function LabCard({ entry, index }: { entry: LabEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const sc = statusColors[entry.status]

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease } }}
      style={{
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.07)',
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.07), 0 40px 100px rgba(0,0,0,0.5)`,
        transition: 'box-shadow 0.4s ease',
        cursor: 'default',
      }}
    >
      {/* Brand ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '280px',
          background: `radial-gradient(ellipse at 10% 0%, ${entry.accentColor}16 0%, transparent 65%)`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Top accent line */}
      <div
        style={{
          height: 2,
          background: `linear-gradient(90deg, ${entry.accentColor}CC 0%, ${entry.accentColor}40 50%, transparent 80%)`,
          position: 'relative',
          zIndex: 1,
        }}
      />

      {/* Header */}
      <div
        style={{
          padding: 'clamp(20px,3vw,32px) clamp(20px,3vw,36px) clamp(16px,2.5vw,24px)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 18,
          position: 'relative',
          zIndex: 1,
          flexWrap: 'wrap',
        }}
      >
        {/* Brand icon */}
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 16,
            background: entry.iconBg,
            border: `1px solid ${entry.accentColor}30`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: entry.iconLabel.length > 1 ? 16 : 24,
            fontWeight: 800,
            color: entry.accentColor,
            fontFamily: 'var(--font-display)',
            flexShrink: 0,
            boxShadow: `0 0 28px ${entry.accentColor}22`,
          }}
        >
          {entry.iconLabel}
        </div>

        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(18px,2.5vw,24px)',
                fontWeight: 800,
                color: '#F5F5F7',
                letterSpacing: '-0.025em',
              }}
            >
              {entry.company}
            </span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '3px 10px',
                borderRadius: 980,
                background: sc.bg,
                color: sc.text,
                border: `1px solid ${sc.border}`,
              }}
            >
              {entry.status}
            </span>
          </div>
          <p
            style={{
              fontSize: 10,
              color: '#686868',
              fontFamily: 'var(--font-body)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            {entry.category}
          </p>
          <p
            style={{
              fontSize: 'clamp(14px,1.8vw,17px)',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'rgba(245,245,247,0.82)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.45,
            }}
          >
            "{entry.tagline}"
          </p>
        </div>
      </div>

      {/* Impact strip */}
      <div
        style={{
          padding: '14px clamp(20px,3vw,36px)',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexWrap: 'wrap',
          background: `${entry.accentColor}06`,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: entry.accentColor,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
            flexShrink: 0,
            opacity: 0.8,
          }}
        >
          Impact Target
        </span>
        <ImpactChips impact={entry.impact} accentColor={entry.accentColor} />
      </div>

      {/* Content — 2-column horizontal layout */}
      <div className="lab-content-grid" style={{ position: 'relative', zIndex: 1 }}>
        {/* Left: Problem + Root Cause */}
        <div className="lab-content-col">
          <ContentBlock label="Problem" content={entry.problem} accentColor={entry.accentColor} />
          <div style={{ height: 28 }} />
          <ContentBlock label="Root Cause" content={entry.rootCause} accentColor={entry.accentColor} />
        </div>

        {/* Right: Proposed Solution + CTA */}
        <div className="lab-content-col lab-content-col-right">
          <ContentBlock label="Proposed Solution" content={entry.proposal} accentColor={entry.accentColor} />
          {entry.docUrl && (
            <a
              href={entry.docUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                marginTop: 24,
                fontSize: 12,
                fontWeight: 600,
                color: entry.accentColor,
                fontFamily: 'var(--font-display)',
                textDecoration: 'none',
                padding: '9px 16px',
                borderRadius: 10,
                border: `1px solid ${entry.accentColor}30`,
                background: `${entry.accentColor}08`,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${entry.accentColor}18`
                e.currentTarget.style.borderColor = `${entry.accentColor}55`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${entry.accentColor}08`
                e.currentTarget.style.borderColor = `${entry.accentColor}30`
              }}
            >
              Read full PRD document
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function ProductLab() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })

  return (
    <section
      className="always-dark"
      style={{
        background: '#000',
        padding: 'clamp(80px, 10vw, 140px) clamp(20px, 6vw, 80px)',
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 900,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0,113,227,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
          style={{ marginBottom: 64 }}
        >
          <p className="text-caption" style={{ marginBottom: 16, letterSpacing: '0.22em' }}>
            INTELLIGENCE LAB
          </p>
          <h2
            className="text-section-headline"
            style={{ color: '#F5F5F7', marginBottom: 20, maxWidth: 700, fontWeight: 800, letterSpacing: '-0.03em' }}
          >
            How I think about other people's products.
          </h2>
          <p
            style={{
              fontSize: 17,
              color: '#86868B',
              fontFamily: 'var(--font-body)',
              maxWidth: 560,
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Unsolicited analyses — real problems I found, root causes I dug into, solutions I'd ship. No fluff. Just structured thinking, written as if I was already inside the company.
          </p>
        </motion.div>

        {/* Stacked full-width cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {entries.map((entry, i) => (
            <LabCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6, ease }}
          style={{
            marginTop: 48,
            fontSize: 11,
            color: '#38383A',
            fontFamily: 'var(--font-body)',
            textAlign: 'center',
            letterSpacing: '0.04em',
          }}
        >
          Unsolicited analyses — not affiliated with or endorsed by these companies.
        </motion.p>
      </div>
    </section>
  )
}
