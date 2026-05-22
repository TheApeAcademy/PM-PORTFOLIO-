import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDarkModeContext } from '../App'

export default function DynamicIsland() {
  const [expanded, setExpanded] = useState(false)
  const { isDark, toggle } = useDarkModeContext()

  const scrollToIPhone = () => {
    document.getElementById('iphone-section')?.scrollIntoView({ behavior: 'smooth' })
    setExpanded(false)
  }

  return (
    <motion.div
      onHoverStart={() => setExpanded(true)}
      onHoverEnd={() => setExpanded(false)}
      animate={{ width: expanded ? 320 : 120 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        height: 36,
        borderRadius: 20,
        background: isDark ? '#1C1C1E' : '#FFFFFF',
        boxShadow: isDark
          ? '0 4px 24px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset'
          : '0 4px 24px rgba(0,0,0,0.12), 0 1px 0 rgba(0,0,0,0.04) inset',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Collapsed state — always visible */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 120,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          flexShrink: 0,
        }}
      >
        {/* Profile avatar */}
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            border: '1.5px solid rgba(255,255,255,0.3)',
            background: 'linear-gradient(135deg, #0071E3 0%, #003D7A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 10,
            color: '#fff',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          B
        </div>

        {/* Mode toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle dark mode"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            color: isDark ? '#F5F5F7' : '#1D1D1F',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 320,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              gap: 8,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                border: '1.5px solid white',
                background: 'linear-gradient(135deg, #0071E3 0%, #003D7A 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                color: '#fff',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              B
            </div>

            {/* Name */}
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                color: isDark ? '#F5F5F7' : '#1D1D1F',
                flex: 1,
                whiteSpace: 'nowrap',
              }}
            >
              Banks
            </span>

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: isDark ? '#F5F5F7' : '#1D1D1F',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* View projects */}
            <button
              onClick={scrollToIPhone}
              style={{
                background: '#0071E3',
                border: 'none',
                borderRadius: 980,
                padding: '4px 12px',
                fontSize: 11,
                fontWeight: 600,
                fontFamily: 'var(--font-display)',
                color: '#fff',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              View Projects
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}
