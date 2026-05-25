import { useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.25, 0.46, 0.45, 0.94] as const

export default function Footer() {
  const [emailHovered, setEmailHovered] = useState(false)

  return (
    <footer
      className="always-dark"
      style={{
        background: '#000',
        padding: 'clamp(80px,10vw,140px) clamp(24px,6vw,80px) 48px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        position: 'relative',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {/* Blue radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,113,227,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
        >
          <h2
            style={{
              fontSize: 'clamp(40px,7vw,88px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-display)',
              lineHeight: 1.0,
              marginBottom: 40,
            }}
          >
            Let's build something.
          </h2>
        </motion.div>

        {/* Email link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          style={{ marginBottom: 64 }}
        >
          <motion.a
            href="mailto:j0shbankole19@gmail.com"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              fontSize: 'clamp(22px,4vw,48px)',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.03em',
              textDecoration: 'none',
              background: emailHovered
                ? 'linear-gradient(135deg, #0071E3, #40a0ff)'
                : 'none',
              WebkitBackgroundClip: emailHovered ? 'text' : undefined,
              WebkitTextFillColor: emailHovered ? 'transparent' : 'var(--color-text)',
              color: emailHovered ? 'transparent' : 'var(--color-text)',
              transition: 'all 0.3s ease',
            }}
          >
            j0shbankole19@gmail.com
            <motion.span
              animate={{ x: emailHovered ? 8 : 0, opacity: emailHovered ? 1 : 0.3 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'inline-block', fontSize: '0.7em' }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Social chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}
        >
          {[
            { label: 'j0shbankole19@gmail.com', href: 'mailto:j0shbankole19@gmail.com' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/joshua-bankole' },
            { label: 'GitHub', href: 'https://github.com/JoshuaBankole' },
          ].map((chip) => (
            <a
              key={chip.label}
              href={chip.href}
              target={chip.href.startsWith('http') ? '_blank' : undefined}
              rel={chip.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 980,
                fontSize: 13,
                color: 'var(--color-muted)',
                fontFamily: 'var(--font-body)',
                textDecoration: 'none',
                transition: 'border-color 0.25s ease, color 0.25s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,113,227,0.5)'
                e.currentTarget.style.color = '#fff'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                e.currentTarget.style.color = 'var(--color-muted)'
              }}
            >
              {chip.label}
            </a>
          ))}
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 32 }} />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p
            style={{
              fontSize: 12,
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              lineHeight: 1.6,
            }}
          >
            Built by Banks · Cape Town 2025 · © Bankole
          </p>
          <p
            style={{
              fontSize: 12,
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Design & Engineering
          </p>
        </div>

      </div>
    </footer>
  )
}
