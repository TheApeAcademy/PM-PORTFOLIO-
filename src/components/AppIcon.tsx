import { useRef } from 'react'
import type { Project } from '../data/projects'

interface AppIconProps {
  project: Project
  onOpen: (project: Project, rect: DOMRect) => void
}

export default function AppIcon({ project, onOpen }: AppIconProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (ref.current) {
      onOpen(project, ref.current.getBoundingClientRect())
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 5,
        cursor: 'pointer',
      }}
    >
      <div
        ref={ref}
        className="app-icon-wrap"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.name}`}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        style={{
          width: 72,
          height: 72,
          borderRadius: 22,
          background: project.iconGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: project.id === 'rbagency' ? 16 : 28,
          fontWeight: 700,
          color: project.iconColor,
          fontFamily: 'var(--font-display)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        {project.iconLabel}
      </div>
      <span
        style={{
          fontSize: 10,
          color: '#fff',
          fontFamily: 'var(--font-body)',
          textAlign: 'center',
          maxWidth: 72,
          lineHeight: 1.2,
          textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {project.name}
      </span>
    </div>
  )
}

export function EmptyIconSlot() {
  return (
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: 22,
        border: '1px dashed rgba(255,255,255,0.06)',
        background: 'rgba(255,255,255,0.02)',
        flexShrink: 0,
      }}
    />
  )
}
