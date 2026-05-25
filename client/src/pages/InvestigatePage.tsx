import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { SceneView } from '../components/SceneView'
import { ClueBar } from '../components/ClueBar'
import { DialogueBox } from '../components/DialogueBox'
import { getPortrait } from '../components/Illustrations'
import { useEffect, useState } from 'react'

type SidebarTab = 'clues' | 'suspects'

export function InvestigatePage() {
  const navigate = useNavigate()
  const currentCase = useGameStore(s => s.currentCase)
  const currentSceneId = useGameStore(s => s.currentSceneId)
  const setCurrentScene = useGameStore(s => s.setCurrentScene)
  const startDialogue = useGameStore(s => s.startDialogue)
  const collectedClueIds = useGameStore(s => s.collectedClueIds)
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('clues')
  const [showPanel, setShowPanel] = useState(false)
  const [transitionKey, setTransitionKey] = useState(0)

  useEffect(() => {
    if (!currentCase) { navigate('/'); return }
    if (!currentSceneId && currentCase.scenes.length > 0) {
      setCurrentScene(currentCase.scenes[0].id)
    }
  }, [currentCase])

  if (!currentCase) return null

  const currentScene = currentCase.scenes.find(s => s.id === currentSceneId)

  const switchScene = (sceneId: string) => {
    if (sceneId === currentSceneId) return
    setTransitionKey(k => k + 1)
    setTimeout(() => setCurrentScene(sceneId), 300)
  }

  const fallbackColors = ['text-amber-400/60', 'text-blue-400/60', 'text-red-400/60', 'text-emerald-400/60', 'text-purple-400/60']

  return (
    <div className="h-screen flex flex-col">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-3 md:px-6 py-2 md:py-3 bg-bg-card/80 backdrop-blur border-b border-border gap-2">
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <button onClick={() => navigate('/')} className="text-text-muted hover:text-text-secondary text-xs tracking-wider cursor-pointer transition-colors">
            ←
          </button>
          <span className="hidden md:block w-px h-4 bg-border" />
          <h2 className="font-display text-xs md:text-sm text-accent tracking-wider truncate max-w-[120px] md:max-w-none">{currentCase.meta.title}</h2>
        </div>

        {/* Scene Tabs - horizontal scroll on mobile */}
        <div className="flex gap-1 bg-bg-elevated/50 rounded-full p-0.5 border border-border overflow-x-auto flex-shrink scrollbar-none">
          {currentCase.scenes.map((scene) => (
            <button
              key={scene.id}
              onClick={() => switchScene(scene.id)}
              className={`text-[10px] md:text-xs px-2 md:px-4 py-1 md:py-1.5 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer tracking-wider ${currentSceneId === scene.id ? 'bg-accent text-bg-deep shadow-lg' : 'text-text-secondary hover:text-text-primary'}`}
            >
              {scene.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Mobile panel toggle */}
          <button
            onClick={() => setShowPanel(!showPanel)}
            className="md:hidden text-[10px] tracking-wider px-3 py-1.5 rounded-full border border-accent/30 text-accent cursor-pointer"
          >
            {showPanel ? '关闭' : `线索·${collectedClueIds.length}`}
          </button>

          <button
            onClick={() => navigate('/reasoning')}
            className="text-[10px] md:text-xs tracking-[0.15em] px-3 md:px-5 py-1.5 md:py-2 rounded-full border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            推理 →
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Scene Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {currentScene && (
            <div key={transitionKey} className="ink-transition-in">
              <SceneView scene={currentScene} />
            </div>
          )}

          {/* Characters Present in Scene */}
          {currentScene && currentScene.charactersPresent.length > 0 && (
            <div className="mt-6 md:mt-10">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <span className="w-4 md:w-6 h-px bg-border-light" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted">现场人物</span>
              </div>
              <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-none">
                {currentScene.charactersPresent.map((charId) => {
                  const char = currentCase.characters.find(c => c.id === charId)
                  if (!char) return null
                  const idx = currentCase.characters.findIndex(c => c.id === charId)
                  const Port = getPortrait(currentCase.id, idx)
                  return (
                    <button key={char.id} onClick={() => startDialogue(char.id)}
                      className="flex flex-col items-center gap-1.5 md:gap-2 p-3 md:p-4 rounded-xl bg-bg-card border border-border hover:border-accent/50 transition-all duration-300 cursor-pointer group flex-shrink-0 min-w-[80px] md:min-w-[90px]"
                    >
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-bg-elevated border border-border flex items-center justify-center overflow-hidden relative">
                        {Port ? <Port className="w-full h-full text-amber-400/60" /> : <span className="text-lg md:text-2xl">{char.avatar}</span>}
                      </div>
                      <span className="text-[10px] md:text-xs tracking-wider text-text-secondary group-hover:text-text-primary transition-colors">{char.name}</span>
                      <span className="text-[9px] md:text-[10px] text-text-muted hidden md:block">{char.occupation}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-80 border-l border-border bg-bg-card/50 flex-col">
          <div className="flex border-b border-border">
            <button onClick={() => setSidebarTab('clues')}
              className={`flex-1 py-3 text-xs tracking-[0.15em] transition-colors cursor-pointer ${sidebarTab === 'clues' ? 'text-accent border-b-2 border-accent -mb-[1px]' : 'text-text-muted hover:text-text-secondary'}`}
            >线索 · {collectedClueIds.length}</button>
            <button onClick={() => setSidebarTab('suspects')}
              className={`flex-1 py-3 text-xs tracking-[0.15em] transition-colors cursor-pointer ${sidebarTab === 'suspects' ? 'text-accent border-b-2 border-accent -mb-[1px]' : 'text-text-muted hover:text-text-secondary'}`}
            >嫌疑人</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {sidebarTab === 'clues' ? <ClueBar /> : (
              <div className="space-y-2">
                {currentCase.characters.map((char, i) => {
                  const Port = getPortrait(currentCase.id, i)
                  return (
                    <button key={char.id} onClick={() => startDialogue(char.id)}
                      className="w-full text-left p-3 md:p-4 rounded-xl border border-border bg-bg-card hover:border-accent/40 transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-bg-elevated border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                          {Port ? <Port className={`w-full h-full ${fallbackColors[i % 5]}`} /> : <span className="text-lg">{char.avatar}</span>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs md:text-sm tracking-wider text-text-primary group-hover:text-accent transition-colors">{char.name}</span>
                            <span className="text-[10px] text-text-muted">{char.age}岁</span>
                          </div>
                          <div className="text-[10px] md:text-xs text-text-secondary tracking-wider">{char.occupation}</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Panel */}
        {showPanel && (
          <div className="md:hidden border-t border-border bg-bg-card/95 max-h-[45vh] flex flex-col animate-in">
            <div className="flex border-b border-border flex-shrink-0">
              <button onClick={() => setSidebarTab('clues')}
                className={`flex-1 py-2.5 text-[10px] tracking-[0.15em] ${sidebarTab === 'clues' ? 'text-accent border-b-2 border-accent -mb-[1px]' : 'text-text-muted'}`}
              >线索 · {collectedClueIds.length}</button>
              <button onClick={() => setSidebarTab('suspects')}
                className={`flex-1 py-2.5 text-[10px] tracking-[0.15em] ${sidebarTab === 'suspects' ? 'text-accent border-b-2 border-accent -mb-[1px]' : 'text-text-muted'}`}
              >嫌疑人</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {sidebarTab === 'clues' ? <ClueBar /> : (
                <div className="grid grid-cols-2 gap-2">
                  {currentCase.characters.map((char, i) => {
                    const Port = getPortrait(currentCase.id, i)
                    return (
                      <button key={char.id} onClick={() => { startDialogue(char.id); setShowPanel(false) }}
                        className="text-left p-3 rounded-xl border border-border bg-bg-card active:border-accent/40 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full bg-bg-elevated border border-border flex items-center justify-center overflow-hidden flex-shrink-0">
                            {Port ? <Port className={`w-full h-full ${fallbackColors[i % 5]}`} /> : <span className="text-base">{char.avatar}</span>}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[11px] tracking-wider text-text-primary">{char.name}</div>
                            <div className="text-[9px] text-text-muted">{char.occupation}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Dialogue Panel */}
      <DialogueBox />
    </div>
  )
}
