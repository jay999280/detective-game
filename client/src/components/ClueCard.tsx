import type { Clue } from '../types/case'
import { PhysicalClueIcon, TestimonyIcon, ContradictionIcon } from './Icons'

const typeColors: Record<string, string> = {
  physical: 'border-clue-physical text-clue-physical',
  testimony: 'border-clue-testimony text-clue-testimony',
  contradiction: 'border-contradiction text-contradiction'
}

const typeLabels: Record<string, string> = {
  physical: '物证',
  testimony: '证言',
  contradiction: '矛盾'
}

const typeIcons = {
  physical: PhysicalClueIcon,
  testimony: TestimonyIcon,
  contradiction: ContradictionIcon
}

interface Props {
  clue: Clue
  isNew?: boolean
  onClick?: () => void
}

export function ClueCard({ clue, isNew, onClick }: Props) {
  const TypeIcon = typeIcons[clue.type]
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg border bg-bg-card transition-all hover:border-accent cursor-pointer ${typeColors[clue.type]} ${isNew ? 'ring-1 ring-accent clue-new' : ''}`}
    >
      <div className="flex items-center gap-2">
        <TypeIcon className="text-base flex-shrink-0" />
        <span className="text-sm font-medium text-text-primary">{clue.name}</span>
        <span className="text-xs ml-auto text-text-secondary">{typeLabels[clue.type]}</span>
      </div>
    </button>
  )
}
