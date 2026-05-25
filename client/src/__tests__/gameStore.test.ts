import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from '../store/gameStore'
import type { CaseData } from '../types/case'

const mockCase: CaseData = {
  id: 'test-case-1',
  meta: {
    title: '测试案件',
    style: 'honkaku',
    difficulty: 'easy',
    type: 'murder',
    summary: '一起测试谋杀案'
  },
  victim: {
    name: '张三',
    age: 35,
    occupation: '商人',
    causeOfDeath: '刀伤',
    timeOfDeath: '2026-05-24 22:00',
    location: '办公室'
  },
  characters: [
    {
      id: 'char-1',
      name: '李四',
      age: 30,
      occupation: '会计',
      avatar: '👨‍💼',
      relationToVictim: '同事',
      surfaceMotive: '薪资纠纷',
      hiddenSecret: '挪用公款',
      alibi: '在家睡觉',
      telltaleLie: '我那天没见过他',
      dialogues: [
        {
          id: 'dlg-1',
          text: '那天我一直在办公室加班。',
          speaker: 'char-1',
          phase: 'initial',
          options: [
            { text: '追问加班细节', leadsTo: 'dlg-2', trustEffect: -5 },
            { text: '相信他', leadsTo: 'dlg-3', trustEffect: 5 }
          ]
        },
        { id: 'dlg-2', text: '好吧，其实我中途出去了一趟。', speaker: 'char-1', phase: 'deep' },
        { id: 'dlg-3', text: '谢谢你的配合。', speaker: 'narrator', phase: 'initial' }
      ]
    }
  ],
  scenes: [
    {
      id: 'scene-1',
      name: '案发现场',
      description: '办公室一片狼藉。',
      atmosphere: 'crime_scene',
      hotspots: [
        { id: 'hot-1', label: '桌上的文件', description: '文件被翻动过', unlocksClue: 'clue-1' }
      ],
      charactersPresent: ['char-1']
    }
  ],
  clues: [
    {
      id: 'clue-1',
      name: '带血的文件',
      description: '一份沾有血迹的财务报表',
      type: 'physical',
      foundInScene: 'scene-1',
      isKeyEvidence: true
    },
    {
      id: 'clue-2',
      name: '矛盾的时间线',
      description: '李四声称在加班，但打卡记录显示7点就离开了',
      type: 'contradiction',
      foundInDialogue: 'dlg-2',
      relatedCharacter: 'char-1',
      isKeyEvidence: true
    }
  ],
  truth: {
    culpritId: 'char-1',
    motive: '掩盖挪用公款',
    method: '用裁纸刀刺杀死者',
    methodClueIds: ['clue-1'],
    motiveClueId: 'clue-2',
    timeline: [{ time: '22:00', event: '被害人被发现死亡' }],
    keyEvidenceIds: ['clue-1', 'clue-2'],
    twist: '会计才是真凶',
    fullStory: '完整的案件故事...'
  }
}

beforeEach(() => {
  useGameStore.getState().resetGame()
})

describe('gameStore', () => {
  describe('initial state', () => {
    it('starts in home phase', () => {
      expect(useGameStore.getState().phase).toBe('home')
    })

    it('has no current case', () => {
      expect(useGameStore.getState().currentCase).toBeNull()
    })

    it('has empty clue collections', () => {
      expect(useGameStore.getState().collectedClueIds).toEqual([])
      expect(useGameStore.getState().viewedClueIds).toEqual([])
    })
  })

  describe('loadCase', () => {
    it('sets currentCase and changes phase to opening', () => {
      useGameStore.getState().loadCase(mockCase)
      expect(useGameStore.getState().currentCase).toEqual(mockCase)
      expect(useGameStore.getState().phase).toBe('opening')
    })
  })

  describe('collectClue', () => {
    it('adds clue to collectedClueIds', () => {
      useGameStore.getState().loadCase(mockCase)
      useGameStore.getState().collectClue('clue-1')
      expect(useGameStore.getState().collectedClueIds).toContain('clue-1')
    })

    it('does not add duplicate clues', () => {
      useGameStore.getState().loadCase(mockCase)
      useGameStore.getState().collectClue('clue-1')
      useGameStore.getState().collectClue('clue-1')
      expect(useGameStore.getState().collectedClueIds).toEqual(['clue-1'])
    })
  })

  describe('viewClue', () => {
    it('marks clue as viewed', () => {
      useGameStore.getState().loadCase(mockCase)
      useGameStore.getState().viewClue('clue-1')
      expect(useGameStore.getState().viewedClueIds).toContain('clue-1')
    })
  })

  describe('setCurrentScene', () => {
    it('changes current scene', () => {
      useGameStore.getState().loadCase(mockCase)
      useGameStore.getState().setCurrentScene('scene-1')
      expect(useGameStore.getState().currentSceneId).toBe('scene-1')
    })
  })

  describe('advanceDialogue', () => {
    it('sets active dialogue and adds to history', () => {
      useGameStore.getState().loadCase(mockCase)
      useGameStore.getState().advanceDialogue('dlg-1')
      expect(useGameStore.getState().activeDialogueId).toBe('dlg-1')
      expect(useGameStore.getState().dialogueHistory).toContain('dlg-1')
    })
  })

  describe('selectDialogueOption', () => {
    it('follows option to next dialogue', () => {
      useGameStore.getState().loadCase(mockCase)
      useGameStore.getState().advanceDialogue('dlg-1')
      useGameStore.getState().selectDialogueOption(0)
      expect(useGameStore.getState().activeDialogueId).toBe('dlg-2')
    })
  })

  describe('updateCharacterTrust', () => {
    it('updates trust for a character', () => {
      useGameStore.getState().loadCase(mockCase)
      useGameStore.getState().updateCharacterTrust('char-1', 10)
      expect(useGameStore.getState().characterTrust['char-1']).toBe(10)
    })
  })

  describe('setSuspectMark', () => {
    it('records suspicion level', () => {
      useGameStore.getState().loadCase(mockCase)
      useGameStore.getState().setSuspectMark('char-1', 3)
      expect(useGameStore.getState().suspectMarks['char-1']).toBe(3)
    })
  })

  describe('updateNotes', () => {
    it('saves player notes', () => {
      useGameStore.getState().updateNotes('这是关键线索')
      expect(useGameStore.getState().notes).toBe('这是关键线索')
    })
  })

  describe('resetGame', () => {
    it('resets to initial state', () => {
      useGameStore.getState().loadCase(mockCase)
      useGameStore.getState().collectClue('clue-1')
      useGameStore.getState().resetGame()
      expect(useGameStore.getState().phase).toBe('home')
      expect(useGameStore.getState().currentCase).toBeNull()
      expect(useGameStore.getState().collectedClueIds).toEqual([])
    })
  })
})
