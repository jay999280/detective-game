import { useEffect, useState } from 'react'
import { useGameStore } from '../store/gameStore'

export function ScreenShake() {
  const shake = useGameStore(s => s.shakeScreen)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (shake === 0) return
    const intensity = 6
    const dur = 400
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      if (elapsed > dur) { setOffset({ x: 0, y: 0 }); clearInterval(timer); return }
      const decay = 1 - elapsed / dur
      setOffset({
        x: (Math.random() - 0.5) * intensity * decay * 2,
        y: (Math.random() - 0.5) * intensity * decay * 2
      })
    }, 16)
    return () => clearInterval(timer)
  }, [shake])

  if (offset.x === 0 && offset.y === 0) return null
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]" style={{
      transform: `translate(${offset.x}px, ${offset.y}px)`
    }} />
  )
}

// Ink vignette pulse + golden seal — replaces the cheap full-screen flash
export function ClueFlash() {
  const flash = useGameStore(s => s.clueFlash)

  if (!flash) return null
  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]" aria-hidden>
      {/* Layer 1: Ink bleed vignette — edges darken then release */}
      <div
        className="absolute inset-0 animate-in"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(15,11,8,0.85) 100%)',
          animation: 'inkVignettePulse 0.8s ease-out forwards'
        }}
      />

      {/* Layer 2: Golden filament arcs — brief trace then fade */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M5 15 Q50 -5 95 15"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-accent/40"
          style={{ animation: 'filamentTrace 0.7s ease-out forwards' }}
        />
        <path
          d="M5 85 Q50 105 95 85"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          className="text-accent/30"
          style={{ animation: 'filamentTrace 0.7s ease-out 0.05s forwards' }}
        />
        <circle
          cx="50" cy="12" r="3"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-accent/50"
          style={{ animation: 'sealStamp 1s ease-out forwards' }}
        />
        <circle
          cx="50" cy="12" r="1"
          fill="currentColor"
          className="text-accent/40"
          style={{ animation: 'sealStamp 1s ease-out forwards' }}
        />
      </svg>

      {/* Layer 3: Subtle corner accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-accent/30 rounded-tl"
        style={{ animation: 'cornerAccent 0.6s ease-out forwards' }} />
      <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-accent/30 rounded-tr"
        style={{ animation: 'cornerAccent 0.6s ease-out 0.05s forwards' }} />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-accent/30 rounded-bl"
        style={{ animation: 'cornerAccent 0.6s ease-out 0.1s forwards' }} />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-accent/30 rounded-br"
        style={{ animation: 'cornerAccent 0.6s ease-out 0.15s forwards' }} />

      <style>{`
        @keyframes inkVignettePulse {
          0% { opacity: 1; }
          30% { opacity: 0.7; }
          100% { opacity: 0; }
        }
        @keyframes filamentTrace {
          0% { opacity: 0; stroke-dashoffset: 200; stroke-dasharray: 200; }
          40% { opacity: 1; }
          100% { opacity: 0; stroke-dashoffset: 0; stroke-dasharray: 200; }
        }
        @keyframes sealStamp {
          0% { opacity: 0; transform: scale(3); }
          30% { opacity: 0.8; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.8); }
        }
        @keyframes cornerAccent {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}
