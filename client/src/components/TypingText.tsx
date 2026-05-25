import { useState, useEffect, useRef } from 'react'

interface Segment {
  text: string
  type: 'normal' | 'bold' | 'pause' | 'shake'
  delay: number // ms
}

function parse(text: string): Segment[] {
  const segs: Segment[] = []
  let i = 0; let buf = ''
  while (i < text.length) {
    if (text[i] === '*' && i + 1 < text.length) {
      const end = text.indexOf('*', i + 1)
      if (end > i) {
        if (buf) segs.push({ text: buf, type: 'normal', delay: 35 })
        segs.push({ text: text.slice(i + 1, end), type: 'bold', delay: 50 })
        buf = ''; i = end + 1; continue
      }
    }
    if (text.slice(i, i + 6) === '~pause') {
      if (buf) segs.push({ text: buf, type: 'normal', delay: 35 })
      segs.push({ text: '', type: 'pause', delay: 600 })
      buf = ''; i += 6; continue
    }
    if (text.slice(i, i + 6) === '!shake') {
      if (buf) segs.push({ text: buf, type: 'normal', delay: 35 })
      segs.push({ text: '', type: 'shake', delay: 200 })
      buf = ''; i += 6; continue
    }
    buf += text[i]; i++
  }
  if (buf) segs.push({ text: buf, type: 'normal', delay: 35 })
  return segs
}

interface Props {
  text: string; speed?: number; onDone?: () => void; className?: string
  onShake?: () => void
}

export function TypingText({ text, speed = 35, onDone, className = '', onShake }: Props) {
  const [rendered, setRendered] = useState<{ char: string; type: Segment['type'] }[]>([])
  const [done, setDone] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const allCharsRef = useRef<{ char: string; type: Segment['type'] }[]>([])

  useEffect(() => {
    setDone(false)
    setRendered([])
    const segments = parse(text)
    const all: { char: string; type: Segment['type'] }[] = []
    for (const s of segments) {
      if (s.type === 'pause') {
        all.push({ char: '', type: 'pause' })
      } else if (s.type === 'shake') {
        all.push({ char: '', type: 'shake' })
      } else {
        for (const ch of s.text) all.push({ char: ch, type: s.type })
      }
    }
    allCharsRef.current = all

    let idx = 0
    function tick() {
      if (idx >= all.length) { setDone(true); onDone?.(); return }
      const item = all[idx]
      if (item.type === 'shake') {
        setRendered(prev => [...prev, item])
        onShake?.()
        idx++; timerRef.current = setTimeout(tick, 600); return
      }
      if (item.type === 'pause') {
        setRendered(prev => [...prev, item])
        idx++; timerRef.current = setTimeout(tick, 500); return
      }
      setRendered(prev => [...prev, item])
      idx++
      timerRef.current = setTimeout(tick, item.type === 'bold' ? speed * 1.4 : speed)
    }
    tick()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [text, speed])

  return (
    <span className={className}>
      {rendered.map((item, i) => {
        if (item.type === 'pause') return <span key={i} className="inline-block w-3" />
        if (item.type === 'shake') return null // shake is a side-effect, no visual
        if (item.type === 'bold') return (
          <span key={i} className="text-accent font-semibold animate-in">{item.char}</span>
        )
        return <span key={i}>{item.char}</span>
      })}
      {!done && <span className="inline-block w-0.5 h-4 bg-accent ml-0.5 animate-pulse" />}
    </span>
  )
}
