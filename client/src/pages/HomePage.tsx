import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { fetchCases, fetchCase } from '../api/client'
import { MurderIcon, MissingIcon, TheftIcon, KidnapIcon, FileIcon } from '../components/Icons'
import type { CaseGenerateParams, CaseListItem } from '../types/case'

const styleOptions = [
  { value: 'honkaku', label: '本格推理', desc: '逻辑与诡计的艺术' },
  { value: 'social', label: '社会派', desc: '人性深渊的凝视' },
  { value: 'crime', label: '刑侦', desc: '证据链中的真相' },
  { value: 'suspense', label: '悬疑', desc: '步步逼近的恐惧' }
] as const

const difficultyOptions = [
  { value: 'easy', label: '简单', desc: '3 名嫌疑人' },
  { value: 'medium', label: '中等', desc: '5 名嫌疑人' },
  { value: 'hard', label: '困难', desc: '6 名嫌疑人' }
] as const

const typeOptions = [
  { value: 'murder', label: '谋杀', Icon: MurderIcon },
  { value: 'missing', label: '失踪', Icon: MissingIcon },
  { value: 'theft', label: '盗窃', Icon: TheftIcon },
  { value: 'kidnapping', label: '绑架', Icon: KidnapIcon }
] as const

export function HomePage() {
  const navigate = useNavigate()
  const loadCase = useGameStore(s => s.loadCase)
  const [style, setStyle] = useState<CaseGenerateParams['style']>('honkaku')
  const [difficulty, setDifficulty] = useState<CaseGenerateParams['difficulty']>('medium')
  const [caseType, setCaseType] = useState<CaseGenerateParams['type']>('murder')
  const [characterCount, setCharacterCount] = useState(5)
  const [usePreset, setUsePreset] = useState(true)
  const [historyCases, setHistoryCases] = useState<CaseListItem[]>([])
  const [loading, setLoading] = useState(false)
  const [showNewCase, setShowNewCase] = useState(false)

  useEffect(() => { fetchCases().then(setHistoryCases).catch(() => {}) }, [])

  const presets = historyCases.filter(c => c.isPreset)

  const startGame = async () => {
    setLoading(true)
    if (usePreset && presets.length > 0) {
      const caseData = await fetchCase(presets[0].id)
      loadCase(caseData)
      navigate('/opening')
    } else {
      navigate('/generate', { state: { style, difficulty, type: caseType, characterCount, usePreset: false } })
    }
    setLoading(false)
  }

  const loadHistoryCase = async (id: string) => {
    const caseData = await fetchCase(id)
    loadCase(caseData)
    navigate('/opening')
  }

  const difficultyLabel = (d: string) => d === 'easy' ? '简单' : d === 'medium' ? '中等' : '困难'
  const styleLabel = (s: string) => {
    if (s === 'honkaku') return '本格'
    if (s === 'social') return '社会派'
    if (s === 'crime') return '刑侦'
    return '悬疑'
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Logo */}
      <div className="text-center mb-14 animate-in">
        <div className="inline-flex items-center gap-4 mb-4">
          <span className="w-16 h-px bg-accent-dim" />
          <FileIcon className="text-3xl text-accent" />
          <span className="w-16 h-px bg-accent-dim" />
        </div>
        <h1 className="text-3xl md:text-5xl font-display text-accent tracking-[0.05em] mb-3">侦探档案</h1>
        <p className="text-text-secondary text-sm tracking-[0.15em]">The Detective Archives</p>
      </div>

      {/* Archive Shelf */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-border-light" />
          <span className="text-xs tracking-[0.3em] uppercase text-text-muted">案件档案架</span>
          <span className="flex-1 h-px bg-border/50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {/* Preset Case Folders */}
          {presets.map((p, i) => {
            const isCase1 = p.id === 'preset-01'
            const coverGradient = isCase1
              ? 'from-slate-900/60 via-blue-950/40 to-bg-card'
              : 'from-amber-950/60 via-red-950/30 to-bg-card'
            const coverBorder = isCase1
              ? 'border-blue-800/30 hover:border-blue-700/50'
              : 'border-amber-800/30 hover:border-amber-700/50'
            const coverGlow = isCase1
              ? 'shadow-[0_0_30px_rgba(59,130,246,0.08)]'
              : 'shadow-[0_0_30px_rgba(217,119,6,0.08)]'
            const accentColor = isCase1
              ? 'from-blue-400/30 to-cyan-400/30'
              : 'from-amber-400/30 to-orange-400/30'
            const decorIcon = isCase1 ? '🔒' : '🕯'
            const decorLabel = isCase1 ? '密室杀人' : '民国悬疑'
            return (
              <button
                key={p.id}
                onClick={() => loadHistoryCase(p.id)}
                className={`relative rounded-xl overflow-hidden border ${coverBorder} ${coverGlow} cursor-pointer group animate-in animate-in-delay-1 hover:scale-[1.02] transition-all duration-500`}
                style={{ animationDelay: `${0.1 + i * 0.1}s` }}
              >
                {/* Cover background */}
                <div className={`bg-gradient-to-b ${coverGradient} p-6 pt-16 pb-6 min-h-[240px] flex flex-col justify-end relative`}>
                  {/* Atmospheric overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,110,0.06),transparent_60%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,169,110,0.04),transparent_50%)]" />

                  {/* Top bar */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-bg-deep/90 to-transparent" />
                  <div className="absolute top-4 left-5 right-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileIcon className="text-accent-dim/50 w-4 h-4" />
                      <span className="text-[10px] tracking-[0.25em] uppercase text-text-muted/50">Case No.{i + 1}</span>
                    </div>
                    <span className="text-[10px] tracking-wider text-accent-dim/60 px-2 py-0.5 rounded-full border border-accent-dim/20 bg-bg-deep/40">{decorLabel}</span>
                  </div>

                  {/* Decorative element */}
                  <div className="absolute top-12 right-6 text-4xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 select-none">{decorIcon}</div>

                  {/* Case title */}
                  <h3 className="font-display text-base text-text-primary tracking-wider group-hover:text-accent transition-colors mb-2 relative z-10">{p.title}</h3>
                  <p className="text-xs text-text-muted tracking-wider mb-3 line-clamp-2 relative z-10">
                    {isCase1 ? '午夜时分的反锁办公室，完好的落地窗，一把沾血的裁纸刀...' : '1936年上海法租界，遗书笔迹的微妙异常，改了又改的遗嘱...'}
                  </p>

                  {/* Bottom info bar */}
                  <div className="flex gap-2 relative z-10">
                    <span className="text-[10px] tracking-wider text-text-muted px-2 py-0.5 rounded-full border border-border/40 bg-bg-deep/40">{difficultyLabel(p.difficulty)}</span>
                    <span className="text-[10px] tracking-wider text-text-muted px-2 py-0.5 rounded-full border border-border/40 bg-bg-deep/40">{styleLabel(p.style)}</span>
                  </div>

                  {/* Glow line on hover */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent ${accentColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>

                {/* Frame border */}
                <div className="absolute inset-0 border-[3px] border-border/15 rounded-xl pointer-events-none" />
              </button>
            )
          })}

          {/* New Case Button */}
          <button
            onClick={() => setShowNewCase(!showNewCase)}
            className={`relative rounded-xl overflow-hidden border-2 border-dashed cursor-pointer group animate-in animate-in-delay-2 transition-all duration-500 min-h-[220px] flex flex-col items-center justify-center ${showNewCase ? 'border-accent/40 bg-accent/5' : 'border-border/40 hover:border-accent/30 bg-bg-card/30'}`}
          >
            <span className="text-4xl mb-3 opacity-40 group-hover:opacity-60 transition-opacity">+</span>
            <span className="text-xs tracking-[0.15em] text-text-muted group-hover:text-text-secondary transition-colors">新案件</span>
          </button>
        </div>
      </div>

      {/* New Case Config Panel */}
      {showNewCase && (
        <div className="mb-16 bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl animate-in">
          <div className="px-8 py-4 border-b border-border bg-bg-elevated/30 flex items-center justify-between">
            <span className="text-xs tracking-[0.2em] text-accent">案件配置</span>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <span className={`text-[10px] tracking-wider transition-colors ${!usePreset ? 'text-accent' : 'text-text-muted'}`}>AI 生成</span>
              <button
                onClick={() => setUsePreset(!usePreset)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${!usePreset ? 'bg-accent' : 'bg-border-light'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${!usePreset ? 'left-5' : 'left-0.5'}`} />
              </button>
              <span className={`text-[10px] tracking-wider transition-colors ${usePreset ? 'text-accent' : 'text-text-muted'}`}>预设</span>
            </label>
          </div>

          {!usePreset ? (
            <div className="p-8 space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {typeOptions.map(opt => (
                  <button key={opt.value} onClick={() => setCaseType(opt.value)}
                    className={`p-4 rounded-xl border text-center transition-all duration-300 cursor-pointer ${caseType === opt.value ? 'border-accent bg-accent/10' : 'border-border hover:border-border-light hover:bg-bg-elevated/30'}`}
                  >
                    <opt.Icon className="text-xl mx-auto mb-1" />
                    <div className="text-xs tracking-wider">{opt.label}</div>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {styleOptions.map(opt => (
                  <button key={opt.value} onClick={() => setStyle(opt.value)}
                    className={`p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${style === opt.value ? 'border-accent bg-accent/10' : 'border-border hover:border-border-light hover:bg-bg-elevated/30'}`}
                  >
                    <div className="text-xs tracking-wider mb-0.5">{opt.label}</div>
                    <div className="text-[10px] text-text-muted">{opt.desc}</div>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {difficultyOptions.map(opt => (
                  <button key={opt.value} onClick={() => setDifficulty(opt.value)}
                    className={`p-3 rounded-xl border text-center transition-all duration-300 cursor-pointer ${difficulty === opt.value ? 'border-accent bg-accent/10' : 'border-border hover:border-border-light hover:bg-bg-elevated/30'}`}
                  >
                    <div className="text-xs tracking-wider">{opt.label}</div>
                    <div className="text-[10px] text-text-muted">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-text-secondary text-sm tracking-wider">无需 API Key，即刻开始推理</p>
            </div>
          )}

          <div className="px-8 pb-6">
            <button onClick={startGame} disabled={loading}
              className="w-full py-4 rounded-xl font-display text-sm tracking-[0.15em] transition-all duration-300 cursor-pointer disabled:opacity-40 bg-accent text-bg-deep hover:bg-accent-light hover:shadow-[0_0_30px_rgba(201,169,110,0.25)] active:scale-[0.98]"
            >
              {loading ? '正在调阅档案...' : '开始调查'}
            </button>
          </div>
        </div>
      )}

      {/* History */}
      {historyCases.filter(c => !c.isPreset).length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-border-light" />
            <span className="text-xs tracking-[0.3em] uppercase text-text-muted">已归档案件</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {historyCases.filter(c => !c.isPreset).map((c, i) => (
              <button key={c.id} onClick={() => loadHistoryCase(c.id)}
                className={`text-left p-5 rounded-xl bg-bg-card border border-border hover:border-accent/40 transition-all duration-300 cursor-pointer group animate-in animate-in-delay-3`}
                style={{ animationDelay: `${0.4 + i * 0.1}s`, opacity: 0 }}
              >
                <div className="text-sm tracking-wider group-hover:text-accent transition-colors mb-2">{c.title}</div>
                <div className="text-[10px] text-text-muted tracking-wider">
                  {difficultyLabel(c.difficulty)} · {new Date(c.createdAt).toLocaleDateString('zh-CN')}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
