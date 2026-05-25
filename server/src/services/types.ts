export type CaseStyle = 'honkaku' | 'social' | 'crime' | 'suspense'
export type CaseDifficulty = 'easy' | 'medium' | 'hard'
export type CaseType = 'murder' | 'missing' | 'theft' | 'kidnapping'

export interface CaseGenerateParams {
  style: CaseStyle
  difficulty: CaseDifficulty
  type: CaseType
  characterCount: number
}

export interface CaseData {
  id: string
  meta: {
    title: string
    style: string
    difficulty: string
    type: string
    summary: string
  }
  victim: {
    name: string
    age: number
    occupation: string
    causeOfDeath: string
    timeOfDeath: string
    location: string
  }
  characters: any[]
  scenes: any[]
  clues: any[]
  truth: any
}
