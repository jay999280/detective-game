import { useGameStore } from '../store/gameStore'
import { TypingText } from './TypingText'
import { PhysicalClueIcon } from './Icons'
import { getPortrait, ExpressionOverlay, getExpressionForPhase } from './Illustrations'
import { useState, useRef, useEffect } from 'react'
import type { Character } from '../types/case'

export function DialogueBox() {
  const currentCase = useGameStore(s => s.currentCase)
  const activeDialogueId = useGameStore(s => s.activeDialogueId)
  const collectedClueIds = useGameStore(s => s.collectedClueIds)
  const startDialogue = useGameStore(s => s.startDialogue)
  const advanceDialogue = useGameStore(s => s.advanceDialogue)
  const selectDialogueOption = useGameStore(s => s.selectDialogueOption)
  const handleChallenge = useGameStore(s => s.handleChallenge)
  const lastHotspotDesc = useGameStore(s => s.lastHotspotDescription)
  const clearHotspotDesc = useGameStore(s => s.clearHotspotDescription)
  const [showOptions, setShowOptions] = useState(false)
  const [typingDone, setTypingDone] = useState(false)
  const pendingCharId = useGameStore(s => s.pendingCharId)
  const triggerShake = useGameStore(s => s.triggerShake)
  const [showEvidencePicker, setShowEvidencePicker] = useState(false)
  const typingKey = useRef(0)

  useEffect(() => {
    setShowOptions(false)
    setTypingDone(false)
    setShowEvidencePicker(false)
    typingKey.current++
  }, [activeDialogueId])

  if (!currentCase) return null

  // If no active dialogue, check if a character was selected for topic-based start
  if (!activeDialogueId && pendingCharId) {
    const char = currentCase.characters.find(c => c.id === pendingCharId)
    if (char?.topics?.length) {
      return (
        <div className="bg-bg-card/95 backdrop-blur border-t border-border px-4 md:px-8 py-3 md:py-5 animate-in">
          <div className="flex items-center gap-3 mb-4">
            {(() => { const idx = currentCase.characters.indexOf(char); const Port = getPortrait(currentCase.id, idx); return Port ? <div className="relative"><Port className="w-9 h-9 text-amber-400/60" /><ExpressionOverlay expression="normal" /></div> : <span className="text-2xl">{char.avatar}</span> })()}
            <div>
              <p className="text-xs text-accent tracking-wider">{char.name}</p>
              <p className="text-[10px] text-text-muted">选择话题</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {char.topics.map(topic => (
              <button
                key={topic.id}
                onClick={() => startDialogue(char.id, topic.id)}
                className="px-5 py-2.5 rounded-full border border-accent/30 text-accent text-sm tracking-wider hover:bg-accent/10 hover:border-accent transition-all duration-300 cursor-pointer"
              >
                {topic.icon} {topic.label}
              </button>
            ))}
            <button
              onClick={() => startDialogue(char.id)}
              className="px-5 py-2.5 rounded-full border border-border text-text-secondary text-sm tracking-wider hover:border-accent/40 transition-all duration-300 cursor-pointer"
            >
              自由交谈
            </button>
          </div>
        </div>
      )
    }
  }

  if (!activeDialogueId) return null

  // Find dialogue
  let speaker: Character | undefined
  let dialogue = undefined
  for (const c of currentCase.characters) {
    const d = c.dialogues.find(d => d.id === activeDialogueId)
    if (d) { speaker = c; dialogue = d; break }
  }
  if (!dialogue) return null

  const isNarrator = dialogue.speaker === 'narrator'
  const hasChallenge = !!dialogue.challenge

  // Filter accessible options
  const accessibleOptions = dialogue.options?.filter(opt =>
    !opt.requiresClue || collectedClueIds.includes(opt.requiresClue)
  ) ?? []

  // Find next dialogue in sequence
  const speakerDialogues = speaker?.dialogues ?? []
  const currentIdx = speakerDialogues.findIndex(d => d.id === activeDialogueId)
  const nextInSequence = currentIdx >= 0 && currentIdx < speakerDialogues.length - 1
    ? speakerDialogues[currentIdx + 1]
    : null

  // Evidence picker
  if (showEvidencePicker) {
    const collectedClues = currentCase.clues.filter(c => collectedClueIds.includes(c.id))
    return (
      <div className="bg-bg-card/95 backdrop-blur border-t border-border px-4 md:px-8 py-3 md:py-5 animate-in">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs tracking-wider text-accent">选择要出示的证据</span>
          <button onClick={() => setShowEvidencePicker(false)} className="text-text-muted text-xs cursor-pointer hover:text-text-secondary">取消</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {collectedClues.map(clue => (
            <button
              key={clue.id}
              onClick={() => {
                handleChallenge('present', clue.id)
                setShowEvidencePicker(false)
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 text-accent text-sm hover:bg-accent/10 transition-all cursor-pointer"
            >
              <PhysicalClueIcon /> {clue.name}
            </button>
          ))}
          {collectedClues.length === 0 && (
            <p className="text-xs text-text-muted">还没有可出示的证据</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-bg-card/95 backdrop-blur border-t border-border px-4 md:px-8 py-3 md:py-5 animate-in">
      {/* Speaker */}
      {!isNarrator && speaker && (
        <div className="flex items-center gap-3 mb-3">
          {(() => { const idx = currentCase.characters.indexOf(speaker); const Port = getPortrait(currentCase.id, idx); const expr = getExpressionForPhase(dialogue.phase); return Port ? <div className="relative"><Port className="w-9 h-9 text-amber-400/60" /><ExpressionOverlay expression={expr} /></div> : <span className="text-2xl">{speaker.avatar}</span> })()}
          <div>
            <p className="text-xs text-accent tracking-wider">{speaker.name}</p>
            <p className="text-[10px] text-text-muted">{speaker.occupation}</p>
          </div>
          <span className="ml-auto text-[10px] text-text-muted tracking-wider">
            {dialogue.phase === 'initial' ? '初次询问' : dialogue.phase === 'deep' ? '深入调查' : '最后摊牌'}
          </span>
        </div>
      )}
      {isNarrator && (
        <div className="mb-3"><span className="text-[10px] tracking-[0.2em] uppercase text-text-muted">旁白</span></div>
      )}

      {/* Dialogue text */}
      <div className="min-h-[3rem] mb-3">
        <TypingText
          key={typingKey.current}
          text={dialogue.text}
          speed={30}
          onDone={() => { setTypingDone(true); setShowOptions(true) }}
          onShake={triggerShake}
          className="text-sm leading-[1.85] text-text-primary tracking-wide"
        />
      </div>

      {/* Challenge feedback */}
      {lastHotspotDesc && (
        <div className="mb-3 p-3 rounded-lg bg-bg-elevated/60 border border-accent/20">
          <p className="text-xs text-text-secondary leading-relaxed tracking-wider">{lastHotspotDesc}</p>
          <button onClick={clearHotspotDesc} className="mt-2 text-[10px] text-accent-dim cursor-pointer">知道了</button>
        </div>
      )}

      {/* Options */}
      {showOptions && !hasChallenge && typingDone && (
        <div className="space-y-2 mt-3 pt-3 border-t border-border/50">
          {/* Normal options */}
          {accessibleOptions.map((opt, i) => (
            <button
              key={i}
              onClick={() => selectDialogueOption(dialogue.options!.indexOf(opt))}
              className="block w-full text-left px-4 py-2.5 rounded-lg border border-accent/20 text-accent text-sm hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_15px_rgba(201,169,110,0.1)] transition-all duration-300 cursor-pointer tracking-wider"
            >
              {opt.text}
            </button>
          ))}

          {/* Evidence objection button */}
          {collectedClueIds.length > 0 && (
            <button
              onClick={() => setShowEvidencePicker(true)}
              className="block w-full text-left px-4 py-2.5 rounded-lg border border-warning/30 text-warning text-sm hover:bg-warning/10 hover:border-warning transition-all duration-300 cursor-pointer tracking-wider"
            >
              ⚡ 出示证据
            </button>
          )}

          {/* Continue if no options */}
          {accessibleOptions.length === 0 && collectedClueIds.length === 0 && nextInSequence && (
            <button
              onClick={() => advanceDialogue(nextInSequence.id)}
              className="text-xs text-text-muted hover:text-text-secondary tracking-wider cursor-pointer transition-colors"
            >
              点击继续 ···
            </button>
          )}

          {/* End */}
          {accessibleOptions.length === 0 && collectedClueIds.length === 0 && !nextInSequence && (
            <p className="text-xs text-text-muted italic tracking-wider">对话结束</p>
          )}
        </div>
      )}

      {/* Challenge UI (Trust / Doubt / Present) */}
      {showOptions && hasChallenge && typingDone && (
        <div className="space-y-2 mt-3 pt-3 border-t border-border/50">
          <p className="text-[10px] text-warning tracking-wider mb-2">证词可信度存疑 — 做出你的判断：</p>
          <div className="flex gap-2">
            <button onClick={() => handleChallenge('trust')}
              className="flex-1 px-4 py-3 rounded-lg border border-success/30 text-success text-sm hover:bg-success/10 transition-all cursor-pointer tracking-wider">
              信任
            </button>
            <button onClick={() => handleChallenge('doubt')}
              className="flex-1 px-4 py-3 rounded-lg border border-warning/30 text-warning text-sm hover:bg-warning/10 transition-all cursor-pointer tracking-wider">
              质疑
            </button>
            <button onClick={() => setShowEvidencePicker(true)}
              className="flex-1 px-4 py-3 rounded-lg border border-contradiction/30 text-contradiction text-sm hover:bg-contradiction/10 transition-all cursor-pointer tracking-wider">
              出示证据
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Export for use by InvestigatePage to trigger topic selection
export { useGameStore }
