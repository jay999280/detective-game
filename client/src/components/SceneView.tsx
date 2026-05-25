import { useGameStore } from '../store/gameStore'
import { CrimeSceneIcon, InteriorIcon, StreetIcon, OfficeIcon, MorgueIcon, StationIcon, CloseIcon } from './Icons'
import { SceneIllustrations } from './Illustrations'
import type { Scene } from '../types/case'

const atmosphereStyles: Record<string, { gradient: string; Icon: typeof CrimeSceneIcon; label: string; accent: string }> = {
  crime_scene: { gradient: 'from-red-950/30 via-bg-deep/80 to-bg-card', Icon: CrimeSceneIcon, label: '案发现场', accent: 'border-red-800/40' },
  interior: { gradient: 'from-amber-950/30 via-bg-deep/80 to-bg-card', Icon: InteriorIcon, label: '室内', accent: 'border-amber-800/40' },
  street: { gradient: 'from-slate-900/40 via-bg-deep/80 to-bg-card', Icon: StreetIcon, label: '街道', accent: 'border-slate-700/40' },
  office: { gradient: 'from-blue-950/20 via-bg-deep/80 to-bg-card', Icon: OfficeIcon, label: '办公室', accent: 'border-blue-800/30' },
  morgue: { gradient: 'from-gray-900/50 via-bg-deep/80 to-bg-card', Icon: MorgueIcon, label: '法医室', accent: 'border-gray-700/40' },
  station: { gradient: 'from-slate-900/30 via-bg-deep/80 to-bg-card', Icon: StationIcon, label: '警察局', accent: 'border-slate-700/40' }
}

interface Props { scene: Scene }

export function SceneView({ scene }: Props) {
  const collectClue = useGameStore(s => s.collectClue)
  const collectedClueIds = useGameStore(s => s.collectedClueIds)
  const inspectedHotspotIds = useGameStore(s => s.inspectedHotspotIds)
  const inspectHotspot = useGameStore(s => s.inspectHotspot)
  const lastHotspotDesc = useGameStore(s => s.lastHotspotDescription)
  const clearHotspotDesc = useGameStore(s => s.clearHotspotDescription)

  const style = atmosphereStyles[scene.atmosphere] || atmosphereStyles.interior
  const SceneIllo = SceneIllustrations[scene.atmosphere]

  return (
    <div className="space-y-5">
      {/* Scene Atmosphere Card */}
      <div className={`relative rounded-2xl overflow-hidden border ${style.accent} shadow-2xl`}>
        {/* Scene illustration background */}
        {SceneIllo && (
          <div className="absolute inset-0 text-text-primary opacity-30">
            <SceneIllo className="w-full h-full" />
          </div>
        )}
        <div className={`relative z-10 bg-gradient-to-b ${style.gradient} p-5 md:p-8 min-h-[160px] md:min-h-[200px]`}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-32 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs tracking-[0.2em] uppercase px-3 py-1 rounded-full border ${style.accent} text-text-secondary bg-bg-deep/50`}>
                <style.Icon /> {style.label}
              </span>
              <h3 className="font-display text-xl text-text-primary tracking-wide">{scene.name}</h3>
            </div>
            <p className="text-text-secondary leading-[1.9] text-sm tracking-wider">{scene.description}</p>
          </div>
        </div>
      </div>

      {/* Hotspot feedback popup */}
      {lastHotspotDesc && (
        <div className="p-4 rounded-xl bg-bg-elevated/60 border border-accent/30 animate-in">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-text-secondary leading-relaxed tracking-wider">{lastHotspotDesc}</p>
            <button onClick={clearHotspotDesc} className="text-text-muted hover:text-text-primary flex-shrink-0 cursor-pointer"><CloseIcon /></button>
          </div>
        </div>
      )}

      {/* Scene completion */}
      <div className="flex items-center gap-2">
        <span className="w-4 h-px bg-border-light" />
        <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted">
          可调查区域 · {scene.hotspots.filter(h => h.unlocksClue && collectedClueIds.includes(h.unlocksClue!)).length}/{scene.hotspots.length}
        </span>
      </div>

      {/* Hotspots */}
      <div className="grid gap-2">
        {scene.hotspots.map(hotspot => {
          const alreadyFound = hotspot.unlocksClue && collectedClueIds.includes(hotspot.unlocksClue)
          const inspected = inspectedHotspotIds.includes(hotspot.id)
          return (
            <button
              key={hotspot.id}
              onClick={() => {
                if (hotspot.unlocksClue && !alreadyFound) collectClue(hotspot.unlocksClue)
                inspectHotspot(hotspot.id, hotspot.description)
              }}
              className={`text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${alreadyFound ? 'border-border/30 bg-bg-card/30' : inspected ? 'border-accent/20 bg-bg-elevated/30' : 'border-border bg-bg-card hover:border-accent/40 hover:bg-bg-elevated/50 hover:shadow-[0_0_15px_rgba(201,169,110,0.06)]'}`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm ${alreadyFound ? 'opacity-40' : ''}`}>
                  {alreadyFound ? '✅' : inspected ? '👁' : '🔎'}
                </span>
                <span className={`text-sm tracking-wider ${alreadyFound ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                  {hotspot.label}
                </span>
                {!alreadyFound && (
                  <span className="ml-auto text-[10px] text-accent-dim tracking-wider">
                    {inspected ? '已查看' : '点击调查'}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
