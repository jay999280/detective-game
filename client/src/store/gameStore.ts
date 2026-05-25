import { create } from 'zustand'
import type { CaseData, GamePhase } from '../types/case'

interface GameState {
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
  lastHotspotDescription: string | null
  pendingCharId: string | null
  shakeScreen: number
  clueFlash: boolean

  loadCase: (caseData: CaseData) => void
  setPhase: (phase: GamePhase) => void
  collectClue: (clueId: string) => void
  viewClue: (clueId: string) => void
  inspectHotspot: (hotspotId: string, description: string) => void
  clearHotspotDescription: () => void
  setCurrentScene: (sceneId: string) => void
  startDialogue: (charId: string, topicId?: string) => void
  advanceDialogue: (dialogueId: string) => void
  selectDialogueOption: (optionIndex: number) => void
  handleChallenge: (choice: 'trust' | 'doubt' | 'present', clueId?: string) => void
  updateCharacterTrust: (charId: string, delta: number) => void
  setSuspectMark: (charId: string, level: number) => void
  updateNotes: (text: string) => void
  resetGame: () => void
  incrementAction: () => void
  triggerShake: () => void
  triggerClueFlash: () => void
}

const initialState = {
  phase: 'home' as GamePhase,
  currentCase: null,
  collectedClueIds: [],
  viewedClueIds: [],
  inspectedHotspotIds: [],
  currentSceneId: null,
  activeDialogueId: null,
  dialogueHistory: [],
  characterTrust: {} as Record<string, number>,
  suspectMarks: {} as Record<string, number>,
  notes: '',
  actionCount: 0,
  lastHotspotDescription: null,
  pendingCharId: null,
  shakeScreen: 0,
  clueFlash: false
}

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  loadCase: (caseData) =>
    set({
      currentCase: caseData, phase: 'opening',
      collectedClueIds: [], viewedClueIds: [], inspectedHotspotIds: [],
      dialogueHistory: [], characterTrust: {}, suspectMarks: {},
      notes: '', currentSceneId: null, activeDialogueId: null, actionCount: 0,
      lastHotspotDescription: null, pendingCharId: null, shakeScreen: 0, clueFlash: false
    }),

  setPhase: (phase) => set({ phase }),

  collectClue: (clueId) => {
    const { collectedClueIds } = get()
    if (!collectedClueIds.includes(clueId)) {
      set({ collectedClueIds: [...collectedClueIds, clueId] })
      // Flash effect on new clue
      set({ clueFlash: true })
      setTimeout(() => set({ clueFlash: false }), 600)
    }
    if (!get().viewedClueIds.includes(clueId)) {
      set({ viewedClueIds: [...get().viewedClueIds, clueId] })
    }
  },

  viewClue: (clueId) => {
    if (!get().viewedClueIds.includes(clueId)) {
      set({ viewedClueIds: [...get().viewedClueIds, clueId] })
    }
  },

  inspectHotspot: (hotspotId, description) => {
    if (!get().inspectedHotspotIds.includes(hotspotId)) {
      set({ inspectedHotspotIds: [...get().inspectedHotspotIds, hotspotId] })
    }
    set({ lastHotspotDescription: description })
    get().incrementAction()
  },

  clearHotspotDescription: () => set({ lastHotspotDescription: null }),

  setCurrentScene: (sceneId) => set({ currentSceneId: sceneId }),

  startDialogue: (charId, topicId) => {
    const { currentCase } = get()
    if (!currentCase) return
    const char = currentCase.characters.find(c => c.id === charId)
    if (!char?.dialogues.length) return
    get().incrementAction()

    // If character has topics and no topic picked, show topic selector
    if (char.topics?.length && !topicId) {
      set({ pendingCharId: charId, activeDialogueId: null })
      return
    }

    let firstDialogueId = char.dialogues[0].id
    if (topicId && char.topics) {
      const topic = char.topics.find(t => t.id === topicId)
      if (topic) firstDialogueId = topic.leadsTo
    }
    set({ pendingCharId: null })
    get().advanceDialogue(firstDialogueId)
  },

  advanceDialogue: (dialogueId) => {
    const { dialogueHistory } = get()
    if (!dialogueHistory.includes(dialogueId)) {
      set({ dialogueHistory: [...dialogueHistory, dialogueId] })
    }
    set({ activeDialogueId: dialogueId })
  },

  selectDialogueOption: (optionIndex) => {
    const { currentCase, activeDialogueId, collectedClueIds } = get()
    if (!currentCase || !activeDialogueId) return

    const character = currentCase.characters.find(c =>
      c.dialogues.some(d => d.id === activeDialogueId)
    )
    if (!character) return

    const dialogue = character.dialogues.find(d => d.id === activeDialogueId)
    if (!dialogue?.options) return

    // Filter options by required clues
    const accessibleOptions = dialogue.options.filter(opt =>
      !opt.requiresClue || collectedClueIds.includes(opt.requiresClue)
    )
    const option = accessibleOptions[optionIndex]
    if (!option) return

    get().incrementAction()

    if (option.unlocksClue) {
      get().collectClue(option.unlocksClue)
    }
    if (option.trustEffect) {
      get().updateCharacterTrust(character.id, option.trustEffect)
    }

    get().advanceDialogue(option.leadsTo)
  },

  handleChallenge: (choice, clueId) => {
    const { currentCase, activeDialogueId } = get()
    if (!currentCase || !activeDialogueId) return

    const character = currentCase.characters.find(c =>
      c.dialogues.some(d => d.id === activeDialogueId)
    )
    if (!character) return
    const dialogue = character.dialogues.find(d => d.id === activeDialogueId)
    if (!dialogue?.challenge) return

    get().incrementAction()
    const ch = dialogue.challenge

    if (choice === 'trust') {
      get().updateCharacterTrust(character.id, 5)
      set({ lastHotspotDescription: ch.trustReaction })
    } else if (choice === 'doubt') {
      get().updateCharacterTrust(character.id, -3)
      set({ lastHotspotDescription: ch.doubtReaction })
    } else if (choice === 'present') {
      if (ch.clueToPresent && clueId === ch.clueToPresent) {
        get().updateCharacterTrust(character.id, -10)
        set({ lastHotspotDescription: ch.presentReaction })
      } else {
        get().updateCharacterTrust(character.id, 5)
        set({ lastHotspotDescription: '这份证据似乎与当前的证词无关...' })
      }
    }

    if (ch.correctChoice === choice) {
      // Find next dialogue after challenge
      const nextId = currentCase.characters
        .flatMap(c => c.dialogues)
        .find(d => d.id !== activeDialogueId && d.speaker === character.id)?.id
      if (nextId) get().advanceDialogue(nextId)
    }
  },

  updateCharacterTrust: (charId, delta) => {
    const current = get().characterTrust[charId] || 0
    set({ characterTrust: { ...get().characterTrust, [charId]: Math.max(-50, Math.min(50, current + delta)) } })
  },

  setSuspectMark: (charId, level) => {
    set({ suspectMarks: { ...get().suspectMarks, [charId]: Math.max(0, Math.min(5, level)) } })
  },

  updateNotes: (text) => set({ notes: text }),

  incrementAction: () => set(s => ({ actionCount: s.actionCount + 1 })),

  triggerShake: () => set(s => ({ shakeScreen: s.shakeScreen + 1 })),

  triggerClueFlash: () => {
    set({ clueFlash: true })
    setTimeout(() => set({ clueFlash: false }), 600)
  },

  resetGame: () => set({
    ...initialState,
    characterTrust: {}, suspectMarks: {}, inspectedHotspotIds: [],
    lastHotspotDescription: null, pendingCharId: null, shakeScreen: 0, clueFlash: false
  })
}))
