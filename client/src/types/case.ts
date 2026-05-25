export type CaseStyle = 'honkaku' | 'social' | 'crime' | 'suspense'
export type CaseDifficulty = 'easy' | 'medium' | 'hard'
export type CaseType = 'murder' | 'missing' | 'theft' | 'kidnapping'
export type ClueType = 'physical' | 'testimony' | 'contradiction'
export type DialoguePhase = 'initial' | 'deep' | 'confrontation'
export type SceneAtmosphere = 'crime_scene' | 'interior' | 'street' | 'office' | 'morgue' | 'station'
export type Score = 'S' | 'A' | 'B' | 'C'

export interface CaseMeta {
  title: string
  style: CaseStyle
  difficulty: CaseDifficulty
  type: CaseType
  summary: string
}

export interface Victim {
  name: string
  age: number
  occupation: string
  causeOfDeath: string
  timeOfDeath: string
  location: string
}

export interface DialogueOption {
  text: string
  leadsTo: string
  unlocksClue?: string
  trustEffect?: number
  requiresClue?: string
  objectionClue?: string
}

export interface DialogueChallenge {
  type: 'trust' | 'doubt' | 'present'
  correctChoice: 'trust' | 'doubt' | 'present'
  clueToPresent?: string
  trustReaction: string
  doubtReaction: string
  presentReaction: string
}

export interface Dialogue {
  id: string
  text: string
  speaker: string
  phase: DialoguePhase
  options?: DialogueOption[]
  challenge?: DialogueChallenge
}

export interface DialogueTopic {
  id: string
  label: string
  icon: string
  leadsTo: string
}

export interface Character {
  id: string
  name: string
  age: number
  occupation: string
  avatar: string
  relationToVictim: string
  surfaceMotive: string
  hiddenSecret: string
  alibi: string
  telltaleLie: string
  personality: string
  dialogues: Dialogue[]
  topics?: DialogueTopic[]
}

export interface ClueReaction {
  clueId: string
  text: string
  trustEffect: number
}

export interface SceneHotspot {
  id: string
  label: string
  description: string
  unlocksClue?: string
}

export interface Scene {
  id: string
  name: string
  description: string
  atmosphere: SceneAtmosphere
  hotspots: SceneHotspot[]
  charactersPresent: string[]
}

export interface Clue {
  id: string
  name: string
  description: string
  type: ClueType
  foundInScene?: string
  foundInDialogue?: string
  relatedCharacter?: string
  isKeyEvidence: boolean
}

export interface TimelineEvent {
  time: string
  event: string
}

export interface Truth {
  culpritId: string
  motive: string
  method: string
  methodClueIds: string[]
  motiveClueId: string
  timeline: TimelineEvent[]
  keyEvidenceIds: string[]
  twist: string
  fullStory: string
}

export interface CaseData {
  id: string
  meta: CaseMeta
  victim: Victim
  characters: Character[]
  scenes: Scene[]
  clues: Clue[]
  truth: Truth
}

export interface CaseGenerateParams {
  style: CaseStyle
  difficulty: CaseDifficulty
  type: CaseType
  characterCount: number
  usePreset?: boolean
  presetId?: string
}

export interface VerdictSubmission {
  culpritId: string
  motiveClueId: string
  methodClueIds: string[]
  collectedCount?: number
  totalClues?: number
}

export interface VerdictResult {
  score: Score
  culpritCorrect: boolean
  motiveCorrect: boolean
  methodCorrect: boolean
  missedKeyClues: string[]
  truth: Truth
  searchCompleteness: number
  accuracy: number
  keyFindings: string[]
  reportSummary: string
}

export interface CaseListItem {
  id: string
  title: string
  style: CaseStyle
  difficulty: CaseDifficulty
  score?: Score
  completed: boolean
  isPreset: boolean
  createdAt: string
}

export type GamePhase = 'home' | 'generating' | 'opening' | 'investigating' | 'reasoning' | 'verdict'

export interface GameState {
  phase: GamePhase
  currentCase: CaseData | null
  collectedClueIds: string[]
  viewedClueIds: string[]
  inspectedHotspotIds: string[]
  currentSceneId: string | null
  activeDialogueId: string | null
  dialogueHistory: string[]
  characterTrust: Record<string, number>
  suspectMarks: Record<string, number>
  notes: string
  actionCount: number
}
