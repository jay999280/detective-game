import { useState } from 'react'
import { useGameStore } from '../store/gameStore'
import { CharacterCard } from './CharacterCard'

type Tab = 'clues' | 'relations' | 'timeline'

export function ReasoningBoard() {
  const currentCase = useGameStore(s => s.currentCase)
  const collectedClueIds = useGameStore(s => s.collectedClueIds)
  const suspectMarks = useGameStore(s => s.suspectMarks)
  const notes = useGameStore(s => s.notes)
  const setSuspectMark = useGameStore(s => s.setSuspectMark)
  const updateNotes = useGameStore(s => s.updateNotes)
  const characterTrust = useGameStore(s => s.characterTrust)
  const [tab, setTab] = useState<Tab>('clues')

  if (!currentCase) return null

  const collectedClues = currentCase.clues.filter(c => collectedClueIds.includes(c.id))
  const typeLabel = (t: string) => t === 'physical' ? '物证' : t === 'testimony' ? '证言' : '矛盾'
  const typeColor = (t: string) =>
    t === 'physical' ? 'text-clue-physical border-clue-physical/40' :
    t === 'testimony' ? 'text-clue-testimony border-clue-testimony/40' :
    'text-contradiction border-contradiction/40'

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'clues', label: '线索清单', count: collectedClues.length },
    { id: 'relations', label: '关系图谱' },
    { id: 'timeline', label: '时间线' }
  ]

  return (
    <div className="max-w-5xl mx-auto px-2 md:px-0">
      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-border pb-0">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-5 py-2.5 text-xs tracking-[0.15em] rounded-t-lg transition-all cursor-pointer ${tab === t.id ? 'text-accent border-b-2 border-accent -mb-[1px] bg-accent/5' : 'text-text-muted hover:text-text-secondary'}`}
          >
            {t.label}
            {t.count !== undefined && <span className="ml-1.5 text-text-muted">({t.count})</span>}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8">
        {/* Left: Active tab content */}
        <div className="md:col-span-3">
          {tab === 'clues' && (
            collectedClues.length === 0 ? (
              <div className="p-12 text-center rounded-xl border border-dashed border-border bg-bg-card/50">
                <p className="text-text-muted text-xs tracking-wider">尚未收集线索</p>
              </div>
            ) : (
              <div className="space-y-2">
                {collectedClues.map(clue => (
                  <div key={clue.id} className={`p-4 rounded-xl border bg-bg-card transition-all ${typeColor(clue.type)}`}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm tracking-wider text-text-primary">{clue.name}</span>
                      <span className="text-[10px] tracking-wider">{typeLabel(clue.type)}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed tracking-wider">{clue.description}</p>
                    {clue.isKeyEvidence && <span className="inline-block mt-2 text-[10px] text-accent tracking-wider">★ 关键证据</span>}
                    {clue.relatedCharacter && (
                      <span className="inline-block mt-2 ml-3 text-[10px] text-text-muted tracking-wider">
                        → {currentCase.characters.find(c => c.id === clue.relatedCharacter)?.name || '未知'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )
          )}

          {tab === 'relations' && (
            <div className="p-6 rounded-xl border border-border bg-bg-card min-h-[300px]">
              <div className="text-center mb-6">
                <span className="text-2xl">🕯</span>
                <p className="text-xs text-text-muted tracking-wider mt-1">{currentCase.victim.name}</p>
                <p className="text-[10px] text-contradiction tracking-wider">被害人</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {currentCase.characters.map(char => (
                  <div key={char.id} className="p-3 rounded-lg border border-border bg-bg-elevated/30 text-center">
                    <p className="text-2xl mb-1">{char.avatar}</p>
                    <p className="text-xs tracking-wider text-text-primary">{char.name}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{char.relationToVictim}</p>
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="text-[10px] text-text-secondary leading-relaxed">{char.surfaceMotive}</p>
                    </div>
                    {suspectMarks[char.id] > 0 && (
                      <div className="mt-2 flex justify-center gap-0.5">
                        {[1,2,3,4,5].map(l => (
                          <div key={l} className={`w-2 h-2 rounded-full ${l <= suspectMarks[char.id] ? 'bg-contradiction' : 'bg-border'}`} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'timeline' && (
            <div className="p-6 rounded-xl border border-border bg-bg-card min-h-[200px]">
              <div className="space-y-0">
                {currentCase.truth.timeline.map((e, i) => (
                  <div key={i} className="flex gap-4 py-3 border-b border-border/40 last:border-0">
                    <span className="text-accent font-mono text-xs tracking-wider w-16 flex-shrink-0 pt-0.5">{e.time}</span>
                    <div className="flex-1">
                      <span className="text-sm text-text-primary tracking-wider">{e.event}</span>
                    </div>
                  </div>
                ))}
                <p className="text-[10px] text-text-muted text-center mt-4 tracking-wider">完成案件后可查看完整时间线</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Suspects + Notes */}
        <div className="md:col-span-2 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-border-light" />
              <span className="text-xs tracking-[0.2em] uppercase text-text-muted">嫌疑人</span>
            </div>
            <div className="space-y-2">
              {currentCase.characters.map((char, i) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  charIndex={i}
                  trust={characterTrust[char.id] || 0}
                  suspicion={suspectMarks[char.id] || 0}
                  onClick={() => {
                    const current = suspectMarks[char.id] || 0
                    setSuspectMark(char.id, current >= 5 ? 0 : current + 1)
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-6 h-px bg-border-light" />
              <span className="text-xs tracking-[0.2em] uppercase text-text-muted">推理笔记</span>
            </div>
            <textarea
              value={notes}
              onChange={e => updateNotes(e.target.value)}
              placeholder="动机推测 / 矛盾点 / 案件还原..."
              className="w-full h-40 p-5 rounded-xl bg-bg-card border border-border text-sm text-text-primary placeholder-text-muted/60 resize-none focus:outline-none focus:border-accent/40 focus:shadow-[0_0_20px_rgba(201,169,110,0.06)] transition-all duration-300 tracking-wider leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
