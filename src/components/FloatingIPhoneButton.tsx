import { useEffect, useRef, useState } from 'react'

export default function FloatingIPhoneButton() {
  const [visible, setVisible] = useState(false)
  const [inSection, setInSection] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80 && !visible) setVisible(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const section = document.getElementById('iphone-section')
    let observer: IntersectionObserver | null = null
    if (section) {
      observer = new IntersectionObserver(
        ([entry]) => setInSection(entry.isIntersecting),
        { threshold: 0.15 }
      )
      observer.observe(section)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer?.disconnect()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [visible])

  const handleClick = () => {
    document.getElementById('iphone-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const show = visible && !inSection

  return (
    <button
      onClick={handleClick}
      aria-label="Jump to projects"
      title="View all my work"
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 60,
        width: 52,
        height: 52,
        borderRadius: 15,
        background: 'rgba(10,10,10,0.9)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.9)',
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity 0.35s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.2s ease',
        boxShadow: '0 0 0 1px rgba(0,113,227,0.18), 0 8px 28px rgba(0,0,0,0.5)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 1.5px rgba(0,113,227,0.5), 0 8px 28px rgba(0,0,0,0.6), 0 0 20px rgba(0,113,227,0.18)'
        e.currentTarget.style.transform = 'translateY(-3px) scale(1.06)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 1px rgba(0,113,227,0.18), 0 8px 28px rgba(0,0,0,0.5)'
        e.currentTarget.style.transform = 'translateY(0) scale(1)'
      }}
    >
      <PhoneDeviceIcon />
    </button>
  )
}

function PhoneDeviceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {/* Phone body */}
      <rect x="6.5" y="1.5" width="11" height="21" rx="2.5" stroke="#0071E3" strokeWidth="1.4" />
      {/* Dynamic Island */}
      <rect x="9.5" y="3.5" width="5" height="1.8" rx="0.9" fill="#0071E3" opacity="0.75" />
      {/* Screen dot — apps metaphor */}
      <circle cx="12" cy="13" r="2.5" fill="#0071E3" opacity="0.22" />
      <circle cx="12" cy="13" r="1.2" fill="#0071E3" opacity="0.55" />
      {/* Home bar */}
      <rect x="10" y="20" width="4" height="1.2" rx="0.6" fill="#0071E3" opacity="0.45" />
    </svg>
  )
}
