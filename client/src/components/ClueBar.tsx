import { useGameStore } from '../store/gameStore'
import { ClueCard } from './ClueCard'
import { useState } from 'react'

export function ClueBar() {
  const currentCase = useGameStore(s => s.currentCase)
  const collectedClueIds = useGameStore(s => s.collectedClueIds)
  const viewedClueIds = useGameStore(s => s.viewedClueIds)
  const viewClue = useGameStore(s => s.viewClue)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (!currentCase) return null

  const collectedClues = currentCase.clues.filter(c => collectedClueIds.includes(c.id))
  const selectedClue = selectedId ? currentCase.clues.find(c => c.id === selectedId) : null

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-xs uppercase tracking-wider text-text-secondary mb-3">
        线索 ({collectedClues.length})
      </h3>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {collectedClues.length === 0 && (
          <p className="text-xs text-text-secondary italic">尚未收集到线索</p>
        )}
        {collectedClues.map(clue => (
          <ClueCard
            key={clue.id}
            clue={clue}
            isNew={!viewedClueIds.includes(clue.id)}
            onClick={() => {
              viewClue(clue.id)
              setSelectedId(clue.id)
            }}
          />
        ))}
      </div>

      {selectedClue && (
        <div className="mt-3 p-4 rounded-lg bg-bg-card border border-accent/30">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-sm text-text-primary">{selectedClue.name}</h4>
            <button onClick={() => setSelectedId(null)} className="text-text-secondary text-xs hover:text-text-primary">✕</button>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">{selectedClue.description}</p>
        </div>
      )}
    </div>
  )
}
