import { useEffect, useCallback } from 'react'
import { useGameStore } from '../store/gameStore'
import { startAudio, stopAudio, setMood, playClick, playClueFound, playShock, playTypewriter } from './engine'

export function useAudioManager() {
  const phase = useGameStore(s => s.phase)
  const activeDialogueId = useGameStore(s => s.activeDialogueId)
  const collectedClueIds = useGameStore(s => s.collectedClueIds)
  const lastHotspotDesc = useGameStore(s => s.lastHotspotDescription)

  // First-click activation
  const activate = useCallback(() => {
    startAudio()
    document.removeEventListener('click', activate)
  }, [])

  useEffect(() => {
    document.addEventListener('click', activate, { once: true })
    return () => document.removeEventListener('click', activate)
  }, [])

  // Mood switching
  useEffect(() => {
    const moodMap: Record<string, 'menu' | 'investigation' | 'confrontation' | 'verdict'> = {
      home: 'menu', generating: 'menu', opening: 'menu',
      investigating: 'investigation', reasoning: 'investigation',
      verdict: 'verdict'
    }
    setMood(moodMap[phase] || 'menu')
  }, [phase])

  // Typewriter tick on dialogue change
  useEffect(() => {
    if (activeDialogueId) playTypewriter()
  }, [activeDialogueId])

  // Clue found chime
  const prevClueCount = useGameStore.getState().collectedClueIds.length
  useEffect(() => {
    const current = collectedClueIds.length
    if (current > prevClueCount) playClueFound()
  }, [collectedClueIds.length])

  // Shock on challenge feedback
  useEffect(() => {
    if (lastHotspotDesc) playShock()
  }, [lastHotspotDesc])

  return { activate }
}

export { playClick, playClueFound, playShock }
