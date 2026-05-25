export default function Footer() {
  return (
    <footer
      className="always-dark"
      style={{
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '40px clamp(24px, 6vw, 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        position: 'relative',
        zIndex: 2,
      }}
    >
      <p
        style={{
          fontSize: 13,
          color: '#86868B',
          fontFamily: 'var(--font-body)',
          lineHeight: 1.6,
        }}
      >
        Built by Banks. Cape Town, 2025. © Bankole
      </p>
      <a
        href="mailto:j0shbankole19@gmail.com"
        style={{
          fontSize: 13,
          color: '#86868B',
          fontFamily: 'var(--font-body)',
          textDecoration: 'none',
          transition: 'color 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.color = '#F5F5F7')}
        onMouseOut={(e) => (e.currentTarget.style.color = '#86868B')}
      >
        j0shbankole19@gmail.com
      </a>
    </footer>
  )
}
