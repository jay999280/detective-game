import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { TypingText } from '../components/TypingText'
import { CharacterCard } from '../components/CharacterCard'
import { FileIcon, ScrollIcon, StarIcon } from '../components/Icons'
import { useState, useRef, useEffect } from 'react'

export function OpeningPage() {
  const navigate = useNavigate()
  const currentCase = useGameStore(s => s.currentCase)
  const setPhase = useGameStore(s => s.setPhase)
  const [step, setStep] = useState(0)
  const [typingDone, setTypingDone] = useState(false)
  const typingKey = useRef(0)

  useEffect(() => {
    setTypingDone(false)
    typingKey.current++
  }, [step])

  if (!currentCase) {
    navigate('/')
    return null
  }

  const { meta, victim, characters } = currentCase

  const introPhases = [
    { text: meta.summary, label: '案件概要', Icon: FileIcon },
    { text: `被害人：${victim.name}，${victim.age}岁，${victim.occupation}。\n死因：${victim.causeOfDeath}\n死亡时间：${victim.timeOfDeath}\n案发地点：${victim.location}`, label: '被害人信息', Icon: StarIcon },
    { text: `经初步调查，以下 ${characters.length} 人与本案有关。\n请你前往案发现场，展开调查。`, label: '调查指令', Icon: ScrollIcon }
  ]

  const isLastIntro = step >= introPhases.length
  const currentPhase = !isLastIntro ? introPhases[step] : null
  const PhaseIcon = currentPhase?.Icon

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Case Title */}
      <div className="text-center mb-10 animate-in">
        <div className="text-accent-dim text-[10px] tracking-[0.3em] uppercase mb-3">Case File</div>
        <h1 className="text-2xl md:text-4xl text-accent tracking-wide mb-2">{meta.title}</h1>
        <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-text-muted border border-border rounded-full px-4 py-1">
          {meta.difficulty === 'easy' ? '简单' : meta.difficulty === 'medium' ? '中等' : '困难'}
        </span>
      </div>

      {!isLastIntro ? (
        <div className="bg-bg-card border border-border rounded-2xl overflow-hidden shadow-2xl animate-in animate-in-delay-1">
          {/* Phase Header */}
          <div className="px-6 py-3 border-b border-border bg-bg-elevated/30 flex items-center gap-2">
            {PhaseIcon && <PhaseIcon />}
            <span className="text-xs tracking-[0.2em] uppercase text-accent">{introPhases[step].label}</span>
            <span className="text-[10px] text-text-muted ml-auto">
              {step + 1} / {introPhases.length}
            </span>
          </div>

          {/* Content */}
          <div className="p-8 min-h-[220px]">
            <TypingText
              key={typingKey.current}
              text={introPhases[step].text}
              speed={35}
              onDone={() => setTypingDone(true)}
              className="text-sm leading-[1.9] text-text-primary whitespace-pre-line tracking-wide"
            />
          </div>

          {/* Fixed Button Area */}
          <div className="px-8 pb-6 flex justify-center">
            {typingDone ? (
              <button
                onClick={() => setStep(s => s + 1)}
                className="px-8 py-3 rounded-full border border-accent/40 text-accent text-sm tracking-[0.15em] hover:bg-accent/10 hover:border-accent hover:shadow-[0_0_20px_rgba(201,169,110,0.15)] transition-all duration-300 cursor-pointer animate-in"
              >
                {step < introPhases.length - 1 ? '继续阅读' : '查看嫌疑人名单'}
              </button>
            ) : (
              <div className="h-11" />
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Character List */}
          <div className="space-y-3 mb-10">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-border-light" />
              <span className="text-xs tracking-[0.2em] uppercase text-text-muted">嫌疑人名单</span>
              <span className="w-8 h-px bg-border-light" />
            </div>
            {characters.map((char, i) => (
              <div key={char.id} className="animate-in" style={{ animationDelay: `${0.1 + i * 0.1}s`, opacity: 0 }}>
                <CharacterCard character={char} charIndex={i} />
              </div>
            ))}
          </div>

          {/* Start Investigation Button */}
          <div className="animate-in animate-in-delay-4">
            <button
              onClick={() => {
                setPhase('investigating')
                navigate('/investigate')
              }}
              className="w-full py-5 rounded-xl font-display text-sm tracking-[0.2em] transition-all duration-300 cursor-pointer bg-accent text-bg-deep hover:bg-accent-light hover:shadow-[0_0_40px_rgba(201,169,110,0.3)] active:scale-[0.98]"
            >
              前往案发现场
            </button>
          </div>
        </>
      )}
    </div>
  )
}
