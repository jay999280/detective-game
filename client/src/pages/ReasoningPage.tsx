import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { ReasoningBoard } from '../components/ReasoningBoard'

export function ReasoningPage() {
  const navigate = useNavigate()
  const currentCase = useGameStore(s => s.currentCase)

  if (!currentCase) { navigate('/'); return null }

  return (
    <div className="h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 bg-bg-card/80 backdrop-blur border-b border-border">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/investigate')} className="text-text-muted hover:text-text-secondary text-xs tracking-wider cursor-pointer transition-colors">
            ← 返回调查
          </button>
          <span className="w-px h-4 bg-border" />
          <h2 className="font-display text-sm text-accent tracking-wider">{currentCase.meta.title} · 推理</h2>
        </div>

        <button
          onClick={() => navigate('/verdict')}
          className="text-xs tracking-[0.15em] px-5 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_15px_rgba(201,169,110,0.2)] transition-all duration-300 cursor-pointer"
        >
          提交结论 →
        </button>
      </nav>

      <div className="flex-1 overflow-y-auto p-8">
        <ReasoningBoard />
      </div>
    </div>
  )
}
