import { useGameStore } from '../store/gameStore'
import type { Character } from '../types/case'
import { getPortrait, ExpressionOverlay, type Expression } from './Illustrations'

const fallbackColors = [
  'text-amber-400/60', 'text-blue-400/60', 'text-red-400/60',
  'text-emerald-400/60', 'text-purple-400/60', 'text-cyan-400/60', 'text-orange-400/60'
]

interface Props {
  character: Character; charIndex: number
  trust?: number; suspicion?: number; onClick?: () => void
  expression?: Expression
}

export function CharacterCard({ character, charIndex, trust = 0, suspicion, onClick, expression = 'normal' }: Props) {
  const caseId = useGameStore(s => s.currentCase?.id || '')
  const Port = getPortrait(caseId, charIndex)
  const colorIdx = charIndex % fallbackColors.length

  return (
    <button onClick={onClick}
      className="w-full text-left p-5 rounded-xl border border-border bg-bg-card hover:border-accent/40 hover:bg-bg-elevated/30 hover:shadow-[0_0_20px_rgba(201,169,110,0.06)] transition-all duration-300 cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-bg-elevated border border-border flex items-center justify-center flex-shrink-0 overflow-hidden group-hover:scale-105 transition-transform duration-300 relative">
          {Port
            ? <Port className={`w-full h-full ${fallbackColors[colorIdx]}`} />
            : <span className={`text-lg font-display opacity-60 ${fallbackColors[colorIdx]}`}>{character.name[0]}</span>
          }
          <ExpressionOverlay expression={expression} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-display text-sm text-text-primary tracking-wider group-hover:text-accent transition-colors">{character.name}</span>
            <span className="text-[10px] text-text-muted tracking-wider">{character.age}岁</span>
          </div>
          <div className="text-xs text-text-secondary tracking-wider mb-1">{character.occupation}</div>
          <div className="text-xs text-text-muted tracking-wider">与被害人：{character.relationToVictim}</div>

          {suspicion !== undefined && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className="text-[10px] text-text-muted tracking-wider w-10">嫌疑度</span>
              {[1,2,3,4,5].map(level => (
                <div key={level} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${level <= suspicion ? (level >= 4 ? 'bg-contradiction shadow-[0_0_6px_rgba(212,120,110,0.4)]' : 'bg-warning shadow-[0_0_6px_rgba(201,132,110,0.3)]') : 'bg-border'}`} />
              ))}
              <span className="text-[10px] text-text-muted w-4 text-right">{suspicion}/5</span>
            </div>
          )}
          {trust !== 0 && (
            <div className="mt-1.5 text-[10px] tracking-wider">
              <span className={trust > 0 ? 'text-success' : 'text-contradiction'}>
                信任 {trust > 0 ? '↑' : '↓'} {Math.abs(trust)}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
