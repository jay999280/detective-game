import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { verifyCase } from '../api/client'
import type { VerdictResult } from '../types/case'

export function VerdictPage() {
  const navigate = useNavigate()
  const currentCase = useGameStore(s => s.currentCase)
  const collectedClueIds = useGameStore(s => s.collectedClueIds)
  const resetGame = useGameStore(s => s.resetGame)
  const [step, setStep] = useState(0)
  const [culpritId, setCulpritId] = useState('')
  const [motiveClueId, setMotiveClueId] = useState('')
  const [methodClueIds, setMethodClueIds] = useState<string[]>([])
  const [result, setResult] = useState<VerdictResult | null>(null)
  const [verifying, setVerifying] = useState(false)

  if (!currentCase) { navigate('/'); return null }

  const clueOptions = currentCase.clues.filter(c => collectedClueIds.includes(c.id))

  const toggleMethodClue = (id: string) => {
    setMethodClueIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const submit = async () => {
    setVerifying(true)
    const res = await verifyCase(currentCase.id, {
      culpritId, motiveClueId, methodClueIds,
      collectedCount: collectedClueIds.length,
      totalClues: currentCase.clues.length
    })
    setResult(res)
    setStep(3)
    setVerifying(false)
  }

  const scoreStyle: Record<string, string> = {
    S: 'text-success border-success bg-success/5',
    A: 'text-accent border-accent bg-accent/5',
    B: 'text-warning border-warning bg-warning/5',
    C: 'text-contradiction border-contradiction bg-contradiction/5'
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8 md:py-14">
      <div className="text-center mb-10 animate-in">
        <div className="text-accent-dim text-[10px] tracking-[0.3em] uppercase mb-3">Final Verdict</div>
        <h1 className="text-3xl font-display text-accent tracking-wide">真相揭晓</h1>
      </div>

      {!result ? (
        <div className="space-y-5">
          {/* Culprit */}
          <div className={`bg-bg-card border border-border rounded-2xl overflow-hidden animate-in animate-in-delay-1 transition-all duration-500 ${step >= 0 ? 'shadow-2xl' : 'opacity-60'}`}>
            <div className="px-6 py-3 border-b border-border bg-bg-elevated/30 flex items-center gap-2">
              <span className="text-xs tracking-[0.2em] uppercase text-accent">第一步 · 指认真凶</span>
            </div>
            <div className="p-5 space-y-2">
              {currentCase.characters.map(char => (
                <button key={char.id} onClick={() => { setCulpritId(char.id); setStep(1) }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${culpritId === char.id ? 'border-accent bg-accent/10 shadow-[0_0_15px_rgba(201,169,110,0.1)]' : 'border-border hover:border-border-light hover:bg-bg-elevated/30'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{char.avatar}</span>
                    <span className="text-sm tracking-wider group-hover:text-accent transition-colors">{char.name}</span>
                    <span className="text-[10px] text-text-muted">{char.occupation}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Motive */}
          {step >= 1 && (
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden animate-in animate-in-delay-2 shadow-2xl">
              <div className="px-6 py-3 border-b border-border bg-bg-elevated/30 flex items-center gap-2">
                <span className="text-xs tracking-[0.2em] uppercase text-accent">第二步 · 动机</span>
                <span className="text-[10px] text-text-muted">选择能证明动机的关键线索</span>
              </div>
              <div className="p-5 space-y-2">
                {clueOptions.map(clue => (
                  <button key={clue.id} onClick={() => { setMotiveClueId(clue.id); setStep(2) }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${motiveClueId === clue.id ? 'border-accent bg-accent/10' : 'border-border hover:border-border-light hover:bg-bg-elevated/30'}`}
                  >
                    <span className="text-sm tracking-wider">{clue.name}</span>
                    <span className="text-xs text-text-secondary ml-3">{clue.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Method */}
          {step >= 2 && (
            <div className="bg-bg-card border border-border rounded-2xl overflow-hidden animate-in animate-in-delay-3 shadow-2xl">
              <div className="px-6 py-3 border-b border-border bg-bg-elevated/30 flex items-center gap-2">
                <span className="text-xs tracking-[0.2em] uppercase text-accent">第三步 · 作案手法</span>
                <span className="text-[10px] text-text-muted">选择相关线索（可多选）</span>
              </div>
              <div className="p-5 space-y-2">
                {clueOptions.map(clue => (
                  <button key={clue.id} onClick={() => toggleMethodClue(clue.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer ${methodClueIds.includes(clue.id) ? 'border-accent bg-accent/10' : 'border-border hover:border-border-light hover:bg-bg-elevated/30'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${methodClueIds.includes(clue.id) ? 'text-accent' : 'text-text-muted'}`}>
                        {methodClueIds.includes(clue.id) ? '●' : '○'}
                      </span>
                      <span className="text-sm tracking-wider">{clue.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          {step >= 2 && (
            <button onClick={submit} disabled={!culpritId || !motiveClueId || verifying}
              className="w-full py-5 rounded-xl font-display text-sm tracking-[0.2em] transition-all duration-300 cursor-pointer disabled:opacity-40 bg-accent text-bg-deep hover:bg-accent-light hover:shadow-[0_0_30px_rgba(201,169,110,0.25)] active:scale-[0.98] animate-in animate-in-delay-4"
            >
              {verifying ? '正在比对真相...' : '提交最终推理'}
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6 animate-in">
          {/* Score */}
          <div className={`text-center p-10 rounded-2xl border-2 ${scoreStyle[result.score]}`}>
            <div className="text-7xl font-display mb-3">{result.score}</div>
            <p className="text-sm tracking-wider">
              {result.score === 'S' ? '完美推理' :
               result.score === 'A' ? '接近真相' :
               result.score === 'B' ? '方向正确' : '推理失败'}
            </p>
            <p className="text-xs text-text-muted mt-1 tracking-wider">{result.reportSummary}</p>
          </div>

          {/* Multi-dimension Stats */}
          <div className="grid grid-cols-3 gap-3 animate-in animate-in-delay-1">
            <div className="p-4 rounded-xl bg-bg-card border border-border text-center">
              <div className="text-2xl font-display text-accent">{result.searchCompleteness}%</div>
              <div className="text-[10px] text-text-muted tracking-wider mt-1">搜证完整度</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-card border border-border text-center">
              <div className="text-2xl font-display text-accent">{result.accuracy}%</div>
              <div className="text-[10px] text-text-muted tracking-wider mt-1">推理准确度</div>
            </div>
            <div className="p-4 rounded-xl bg-bg-card border border-border text-center">
              <div className="text-2xl font-display text-accent">{result.keyFindings.length}</div>
              <div className="text-[10px] text-text-muted tracking-wider mt-1">关键成就</div>
            </div>
          </div>

          {/* Key Findings */}
          <div className="p-5 rounded-xl bg-bg-card border border-border animate-in animate-in-delay-2">
            <h4 className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">推理报告</h4>
            <div className="space-y-1.5">
              {result.keyFindings.map((f, i) => (
                <p key={i} className="text-sm text-text-secondary tracking-wider">· {f}</p>
              ))}
            </div>
          </div>

          {/* Full Story */}
          <div className="bg-bg-card border border-border rounded-2xl p-8">
            <h3 className="font-display text-lg text-accent mb-5 tracking-wide">案件真相</h3>
            <p className="text-sm leading-[1.9] text-text-primary whitespace-pre-line tracking-wider">{result.truth.fullStory}</p>

            {/* Timeline */}
            <div className="mt-6 p-5 rounded-xl bg-bg-elevated/50 border border-border">
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-text-muted mb-3">时间线</h4>
              <div className="space-y-1.5">
                {result.truth.timeline.map((e, i) => (
                  <div key={i} className="flex gap-3 text-sm py-1">
                    <span className="text-accent font-mono text-xs tracking-wider w-16 flex-shrink-0">{e.time}</span>
                    <span className="text-text-secondary tracking-wider">{e.event}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Missed Clues */}
            {result.missedKeyClues.length > 0 && (
              <div className="mt-4 p-5 rounded-xl bg-warning/5 border border-warning/20">
                <h4 className="text-[10px] tracking-[0.2em] uppercase text-warning mb-2">遗漏的关键线索</h4>
                {result.missedKeyClues.map(id => {
                  const clue = currentCase.clues.find(c => c.id === id)
                  return clue ? (
                    <p key={id} className="text-sm text-text-secondary tracking-wider">· {clue.name} — {clue.description}</p>
                  ) : null
                })}
              </div>
            )}

            {/* Twist */}
            <div className="mt-4 p-5 rounded-xl bg-accent/5 border border-accent/20">
              <h4 className="text-[10px] tracking-[0.2em] uppercase text-accent mb-2">关键反转</h4>
              <p className="text-sm text-text-primary tracking-wider leading-relaxed">{result.truth.twist}</p>
            </div>
          </div>

          <button onClick={() => { resetGame(); navigate('/') }}
            className="w-full py-5 rounded-xl font-display text-sm tracking-[0.2em] transition-all duration-300 cursor-pointer bg-accent text-bg-deep hover:bg-accent-light hover:shadow-[0_0_30px_rgba(201,169,110,0.25)] active:scale-[0.98]"
          >
            返回档案室
          </button>
        </div>
      )}
    </div>
  )
}
