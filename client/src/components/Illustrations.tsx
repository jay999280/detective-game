import type { SVGProps, FC } from 'react'

const bp: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 100 100', fill: 'none', width: '1em', height: '1em'
}

// === CHARACTER PORTRAITS (ink brush style) ===

export function BusinessWomanPortrait(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 80 96">
    {/* Hair */}
    <ellipse cx="40" cy="20" rx="26" ry="24" fill="currentColor" opacity="0.9"/>
    <rect x="14" y="24" width="52" height="30" rx="8" fill="currentColor" opacity="0.85"/>
    {/* Face */}
    <ellipse cx="40" cy="28" rx="16" ry="19" fill="currentColor" opacity="0.35"/>
    {/* Eyes */}
    <ellipse cx="32" cy="26" rx="3" ry="2" fill="currentColor" opacity="0.6"/>
    <ellipse cx="48" cy="26" rx="3" ry="2" fill="currentColor" opacity="0.6"/>
    {/* Collar */}
    <path d="M24 54L40 44L56 54" stroke="currentColor" strokeWidth="2" opacity="0.7" fill="none"/>
    <path d="M28 58L40 48L52 58V70H28V58Z" fill="currentColor" opacity="0.3"/>
    {/* Hair detail */}
    <path d="M18 32Q24 14 40 16Q56 14 62 32" stroke="currentColor" strokeWidth="1.5" opacity="0.5" fill="none"/>
  </svg>
}

export function BusinessManPortrait(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 80 96">
    {/* Hair */}
    <path d="M16 28Q20 10 40 12Q60 10 64 28" fill="currentColor" opacity="0.8"/>
    <rect x="14" y="16" width="52" height="14" rx="6" fill="currentColor" opacity="0.85"/>
    {/* Face */}
    <ellipse cx="40" cy="32" rx="15" ry="18" fill="currentColor" opacity="0.35"/>
    {/* Glasses */}
    <rect x="26" y="28" width="12" height="8" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    <rect x="42" y="28" width="12" height="8" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    <line x1="38" y1="32" x2="42" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    {/* Suit */}
    <path d="M22 58L40 46L58 58" stroke="currentColor" strokeWidth="2" opacity="0.7" fill="none"/>
    <path d="M24 62L40 50L56 62V76H24V62Z" fill="currentColor" opacity="0.3"/>
    {/* Tie */}
    <path d="M38 44L36 60L40 64L44 60L42 44Z" fill="currentColor" opacity="0.4"/>
  </svg>
}

export function WomanWithHatPortrait(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 80 96">
    {/* Hat */}
    <ellipse cx="40" cy="14" rx="28" ry="6" fill="currentColor" opacity="0.8"/>
    <rect x="24" y="6" width="32" height="12" rx="3" fill="currentColor" opacity="0.75"/>
    <path d="M18 16L22 40" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
    {/* Hair */}
    <path d="M16 22Q24 10 40 14Q56 10 64 22" fill="currentColor" opacity="0.7"/>
    {/* Face */}
    <ellipse cx="40" cy="30" rx="14" ry="17" fill="currentColor" opacity="0.35"/>
    {/* Eyes */}
    <ellipse cx="33" cy="28" rx="2.5" ry="1.8" fill="currentColor" opacity="0.6"/>
    <ellipse cx="47" cy="28" rx="2.5" ry="1.8" fill="currentColor" opacity="0.6"/>
    {/* Dress */}
    <path d="M24 54L40 44L56 54" stroke="currentColor" strokeWidth="1.8" opacity="0.7" fill="none"/>
    <path d="M22 58L40 46L58 58V74H22V58Z" fill="currentColor" opacity="0.25"/>
  </svg>
}

export function GuardPortrait(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 80 96">
    {/* Cap */}
    <path d="M16 22Q20 6 40 6Q60 6 64 22" fill="currentColor" opacity="0.85"/>
    <rect x="10" y="16" width="60" height="8" rx="2" fill="currentColor" opacity="0.9"/>
    <rect x="14" y="24" width="52" height="4" rx="1" fill="currentColor" opacity="0.7"/>
    {/* Badge */}
    <circle cx="40" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
    <polygon points="40,8 42,11 45,11 43,13.5 44,16.5 40,14.5 36,16.5 37,13.5 35,11 38,11" fill="currentColor" opacity="0.4"/>
    {/* Face */}
    <ellipse cx="40" cy="36" rx="16" ry="18" fill="currentColor" opacity="0.3"/>
    {/* Eyes */}
    <ellipse cx="33" cy="34" rx="2.8" ry="2" fill="currentColor" opacity="0.5"/>
    <ellipse cx="47" cy="34" rx="2.8" ry="2" fill="currentColor" opacity="0.5"/>
    {/* Uniform */}
    <path d="M20 62L40 48L60 62" stroke="currentColor" strokeWidth="2" opacity="0.7" fill="none"/>
    <path d="M18 66L40 50L62 66V80H18V66Z" fill="currentColor" opacity="0.3"/>
    {/* Epaulets */}
    <rect x="18" y="56" width="14" height="4" rx="1" fill="currentColor" opacity="0.4"/>
    <rect x="48" y="56" width="14" height="4" rx="1" fill="currentColor" opacity="0.4"/>
  </svg>
}

export function YoungManPortrait(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 80 96">
    {/* Hair */}
    <path d="M14 28Q18 8 40 12Q62 8 66 28" fill="currentColor" opacity="0.85"/>
    <path d="M18 18Q30 6 40 8Q50 6 62 18" fill="currentColor" opacity="0.9"/>
    {/* Face */}
    <ellipse cx="40" cy="32" rx="15" ry="18" fill="currentColor" opacity="0.35"/>
    {/* Eyes */}
    <ellipse cx="33" cy="30" rx="2.5" ry="2" fill="currentColor" opacity="0.6"/>
    <ellipse cx="47" cy="30" rx="2.5" ry="2" fill="currentColor" opacity="0.6"/>
    {/* Casual collar */}
    <path d="M26 56L40 44L54 56" stroke="currentColor" strokeWidth="1.8" opacity="0.65" fill="none"/>
    <path d="M28 60L40 48L52 60V74H28V60Z" fill="currentColor" opacity="0.25"/>
  </svg>
}

export function DoctorPortrait(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 80 96">
    {/* Hair (balding) */}
    <path d="M18 26Q22 16 32 16Q38 16 40 18Q42 16 48 16Q58 16 62 26" fill="currentColor" opacity="0.7"/>
    {/* Face */}
    <ellipse cx="40" cy="30" rx="16" ry="19" fill="currentColor" opacity="0.35"/>
    {/* Round glasses */}
    <circle cx="33" cy="28" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    <circle cx="47" cy="28" r="6" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
    <line x1="39" y1="28" x2="41" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
    {/* White coat */}
    <path d="M22 56L40 42L58 56" stroke="currentColor" strokeWidth="2" opacity="0.75" fill="none"/>
    <path d="M20 60L40 44L60 60V78H20V60Z" fill="currentColor" opacity="0.35"/>
    {/* Stethoscope hint */}
    <path d="M46 56Q52 64 48 72" stroke="currentColor" strokeWidth="1.5" opacity="0.4" fill="none"/>
    <circle cx="48" cy="74" r="5" stroke="currentColor" strokeWidth="1.2" opacity="0.35"/>
  </svg>
}

export function ElderButlerPortrait(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 80 96">
    {/* Hair (graying) */}
    <path d="M16 26Q20 14 34 14Q40 16 46 14Q60 14 64 26" fill="currentColor" opacity="0.55"/>
    <path d="M20 18Q34 8 40 10Q46 8 60 18" fill="currentColor" opacity="0.45"/>
    {/* Face (older, lined) */}
    <ellipse cx="40" cy="33" rx="15" ry="17" fill="currentColor" opacity="0.3"/>
    {/* Eyes */}
    <ellipse cx="33" cy="30" rx="2.5" ry="1.8" fill="currentColor" opacity="0.5"/>
    <ellipse cx="47" cy="30" rx="2.5" ry="1.8" fill="currentColor" opacity="0.5"/>
    {/* Mustache */}
    <path d="M32 36Q40 38 48 36" stroke="currentColor" strokeWidth="2" opacity="0.5" fill="none"/>
    {/* Butler suit */}
    <path d="M20 60L40 44L60 60" stroke="currentColor" strokeWidth="2" opacity="0.7" fill="none"/>
    <path d="M22 64L40 46L58 64V78H22V64Z" fill="currentColor" opacity="0.28"/>
    {/* Bow tie */}
    <polygon points="34,44 40,48 46,44 46,50 40,46 34,50" fill="currentColor" opacity="0.4"/>
  </svg>
}

// === SCENE ILLUSTRATIONS ===

export function CrimeSceneBg(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 120 60" preserveAspectRatio="xMidYMid slice">
    {/* Floor */}
    <rect x="0" y="40" width="120" height="20" fill="currentColor" opacity="0.06"/>
    <line x1="0" y1="42" x2="120" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
    {/* Window */}
    <rect x="75" y="8" width="35" height="28" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none"/>
    <line x1="92.5" y1="8" x2="92.5" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
    <line x1="75" y1="22" x2="110" y2="22" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
    {/* Desk */}
    <rect x="30" y="28" width="35" height="3" rx="1" fill="currentColor" opacity="0.15"/>
    <rect x="32" y="31" width="2" height="11" fill="currentColor" opacity="0.12"/>
    <rect x="61" y="31" width="2" height="11" fill="currentColor" opacity="0.12"/>
    {/* Body outline (crime scene tape area) */}
    <path d="M45 42Q48 32 54 36Q60 32 63 42" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none" strokeDasharray="3 2"/>
    {/* Police tape */}
    <line x1="10" y1="12" x2="35" y2="18" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
    <line x1="35" y1="18" x2="55" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
    {/* Evidence markers */}
    <circle cx="50" cy="54" r="1.5" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    <circle cx="56" cy="52" r="1.5" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
  </svg>
}

export function InteriorSceneBg(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 120 60" preserveAspectRatio="xMidYMid slice">
    {/* Floor */}
    <rect x="0" y="42" width="120" height="18" fill="currentColor" opacity="0.05"/>
    {/* Walls */}
    <rect x="0" y="0" width="120" height="42" fill="currentColor" opacity="0.02"/>
    {/* Chandelier */}
    <line x1="60" y1="0" x2="60" y2="8" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
    <path d="M48 8Q60 2 72 8" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none"/>
    <circle cx="52" cy="10" r="1.5" fill="currentColor" opacity="0.15"/>
    <circle cx="60" cy="10" r="1.5" fill="currentColor" opacity="0.15"/>
    <circle cx="68" cy="10" r="1.5" fill="currentColor" opacity="0.15"/>
    {/* Reception desk */}
    <rect x="15" y="24" width="30" height="4" rx="1" fill="currentColor" opacity="0.12"/>
    <rect x="17" y="28" width="2" height="16" fill="currentColor" opacity="0.1"/>
    <rect x="41" y="28" width="2" height="16" fill="currentColor" opacity="0.1"/>
    {/* Monitor on desk */}
    <rect x="22" y="18" width="14" height="8" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.18" fill="none"/>
    <rect x="23.5" y="19.5" width="11" height="5" rx="0.5" fill="currentColor" opacity="0.06"/>
    {/* Register book */}
    <rect x="80" y="26" width="20" height="3" rx="0.5" fill="currentColor" opacity="0.1"/>
    <line x1="82" y1="27.5" x2="98" y2="27.5" stroke="currentColor" strokeWidth="0.3" opacity="0.15"/>
  </svg>
}

export function StreetSceneBg(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 120 60" preserveAspectRatio="xMidYMid slice">
    {/* Sky */}
    <rect x="0" y="0" width="120" height="30" fill="currentColor" opacity="0.03"/>
    {/* Ground */}
    <rect x="0" y="42" width="120" height="18" fill="currentColor" opacity="0.06"/>
    <line x1="0" y1="42" x2="120" y2="42" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
    {/* Street lamp */}
    <line x1="30" y1="12" x2="30" y2="42" stroke="currentColor" strokeWidth="1.5" opacity="0.25"/>
    <path d="M22 12L30 6L38 12" stroke="currentColor" strokeWidth="1" opacity="0.2" fill="none"/>
    <circle cx="30" cy="14" r="3" fill="currentColor" opacity="0.12"/>
    {/* Buildings */}
    <rect x="0" y="10" width="18" height="32" fill="currentColor" opacity="0.04"/>
    <rect x="20" y="16" width="15" height="26" fill="currentColor" opacity="0.05"/>
    <rect x="85" y="8" width="20" height="34" fill="currentColor" opacity="0.04"/>
    <rect x="100" y="14" width="20" height="28" fill="currentColor" opacity="0.05"/>
    {/* Car silhouette */}
    <rect x="55" y="36" width="20" height="5" rx="2" fill="currentColor" opacity="0.08"/>
    <rect x="58" y="33" width="14" height="5" rx="2" fill="currentColor" opacity="0.06"/>
    <circle cx="60" cy="42" r="2" fill="currentColor" opacity="0.1"/>
    <circle cx="72" cy="42" r="2" fill="currentColor" opacity="0.1"/>
  </svg>
}

export function OfficeSceneBg(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 120 60" preserveAspectRatio="xMidYMid slice">
    {/* Floor */}
    <rect x="0" y="44" width="120" height="16" fill="currentColor" opacity="0.04"/>
    {/* Windows */}
    <rect x="4" y="6" width="22" height="34" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.15" fill="none"/>
    <line x1="15" y1="6" x2="15" y2="40" stroke="currentColor" strokeWidth="0.4" opacity="0.1"/>
    <rect x="94" y="6" width="22" height="34" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.15" fill="none"/>
    <line x1="105" y1="6" x2="105" y2="40" stroke="currentColor" strokeWidth="0.4" opacity="0.1"/>
    {/* Large desk */}
    <rect x="30" y="28" width="50" height="4" rx="1.5" fill="currentColor" opacity="0.12"/>
    <rect x="33" y="32" width="2" height="14" fill="currentColor" opacity="0.08"/>
    <rect x="75" y="32" width="2" height="14" fill="currentColor" opacity="0.08"/>
    {/* Chair */}
    <rect x="48" y="38" width="14" height="2" rx="1" fill="currentColor" opacity="0.1"/>
    <rect x="52" y="40" width="6" height="10" fill="currentColor" opacity="0.08"/>
    <rect x="50" y="26" width="10" height="6" rx="2" fill="currentColor" opacity="0.08"/>
    {/* Shelf */}
    <rect x="86" y="10" width="30" height="18" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.12" fill="none"/>
    <line x1="86" y1="16" x2="116" y2="16" stroke="currentColor" strokeWidth="0.4" opacity="0.1"/>
    <line x1="86" y1="22" x2="116" y2="22" stroke="currentColor" strokeWidth="0.4" opacity="0.1"/>
  </svg>
}

export function MorgueSceneBg(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 120 60" preserveAspectRatio="xMidYMid slice">
    {/* Walls (cold, clinical) */}
    <rect x="0" y="0" width="120" height="60" fill="currentColor" opacity="0.02"/>
    {/* Tiled floor hints */}
    <line x1="0" y1="46" x2="120" y2="46" stroke="currentColor" strokeWidth="0.4" opacity="0.1"/>
    <line x1="0" y1="52" x2="120" y2="52" stroke="currentColor" strokeWidth="0.4" opacity="0.1"/>
    {/* Examination table */}
    <rect x="40" y="28" width="40" height="4" rx="1.5" fill="currentColor" opacity="0.1"/>
    <rect x="43" y="32" width="2" height="16" fill="currentColor" opacity="0.07"/>
    <rect x="75" y="32" width="2" height="16" fill="currentColor" opacity="0.07"/>
    {/* Overhead lamp */}
    <line x1="60" y1="0" x2="60" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
    <rect x="46" y="14" width="28" height="3" rx="1" fill="currentColor" opacity="0.1"/>
    {/* Medical cabinet */}
    <rect x="8" y="16" width="16" height="26" rx="1" stroke="currentColor" strokeWidth="0.8" opacity="0.12" fill="none"/>
    <line x1="8" y1="22" x2="24" y2="22" stroke="currentColor" strokeWidth="0.4" opacity="0.08"/>
    <line x1="8" y1="28" x2="24" y2="28" stroke="currentColor" strokeWidth="0.4" opacity="0.08"/>
    {/* Cross symbol */}
    <line x1="100" y1="16" x2="112" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.12"/>
    <line x1="106" y1="10" x2="106" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.12"/>
  </svg>
}

export function StationSceneBg(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 120 60" preserveAspectRatio="xMidYMid slice">
    {/* Floor */}
    <rect x="0" y="44" width="120" height="16" fill="currentColor" opacity="0.04"/>
    {/* Police badge on wall */}
    <circle cx="60" cy="14" r="10" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
    <polygon points="60,5 64,11 71,11 66,15 68,21 60,17 52,21 54,15 49,11 56,11" fill="currentColor" opacity="0.08"/>
    {/* Counter/desk */}
    <rect x="10" y="28" width="100" height="4" rx="1" fill="currentColor" opacity="0.1"/>
    <rect x="14" y="32" width="2" height="14" fill="currentColor" opacity="0.06"/>
    <rect x="104" y="32" width="2" height="14" fill="currentColor" opacity="0.06"/>
    {/* Filing cabinet */}
    <rect x="90" y="16" width="10" height="14" rx="0.5" fill="currentColor" opacity="0.06"/>
    <rect x="91" y="18" width="8" height="3" rx="0.3" fill="currentColor" opacity="0.04"/>
    <rect x="91" y="22" width="8" height="3" rx="0.3" fill="currentColor" opacity="0.04"/>
    {/* Bulletin board */}
    <rect x="16" y="12" width="20" height="14" rx="0.5" stroke="currentColor" strokeWidth="0.6" opacity="0.1" fill="none"/>
    <rect x="19" y="15" width="14" height="2" rx="0.3" fill="currentColor" opacity="0.06"/>
    <rect x="19" y="19" width="10" height="2" rx="0.3" fill="currentColor" opacity="0.05"/>
  </svg>
}

// === DECORATIVE ELEMENTS ===

export function InkSplash(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="18" fill="currentColor" opacity="0.04"/>
    <circle cx="30" cy="30" r="10" fill="currentColor" opacity="0.06"/>
    <path d="M30 12Q28 20 32 28Q36 20 34 12Z" fill="currentColor" opacity="0.05"/>
    <path d="M12 30Q20 28 28 32Q20 36 12 34Z" fill="currentColor" opacity="0.05"/>
    <path d="M48 28Q40 30 36 34Q44 38 48 32Z" fill="currentColor" opacity="0.04"/>
  </svg>
}

export function OrnamentDivider(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 200 12">
    <line x1="0" y1="6" x2="80" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
    <circle cx="100" cy="6" r="2" fill="currentColor" opacity="0.25"/>
    <circle cx="100" cy="6" r="4" stroke="currentColor" strokeWidth="0.5" opacity="0.15"/>
    <line x1="120" y1="6" x2="200" y2="6" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
  </svg>
}

export function CornerBracket(p: SVGProps<SVGSVGElement>) {
  return <svg {...bp} {...p} viewBox="0 0 24 24">
    <path d="M2 8V2H8" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>
    <path d="M22 16V22H16" stroke="currentColor" strokeWidth="1" opacity="0.3" fill="none"/>
  </svg>
}

// Scene illustration mapping
export const SceneIllustrations: Record<string, (p: SVGProps<SVGSVGElement>) => JSX.Element> = {
  crime_scene: CrimeSceneBg,
  interior: InteriorSceneBg,
  street: StreetSceneBg,
  office: OfficeSceneBg,
  morgue: MorgueSceneBg,
  station: StationSceneBg
}

// Portrait mapping by archetype (name-based)
const archetypes: Record<string, (p: SVGProps<SVGSVGElement>) => JSX.Element> = {
  assistant: BusinessWomanPortrait,
  executive: BusinessManPortrait,
  wife: WomanWithHatPortrait,
  guard: GuardPortrait,
  competitor: YoungManPortrait,
  butler: ElderButlerPortrait,
  doctor: DoctorPortrait,
}

// Character archetype assignments by case + index
const archetypeMap: Record<string, string[]> = {
  'preset-01': ['assistant', 'executive', 'wife', 'guard', 'competitor'],
  'preset-02': ['executive', 'assistant', 'butler', 'wife', 'doctor'],
}

type PortraitComponent = (p: SVGProps<SVGSVGElement>) => React.JSX.Element

export function getPortrait(caseId: string, charIndex: number): PortraitComponent | null {
  const archetype = archetypeMap[caseId]?.[charIndex]
  if (archetype) return archetypes[archetype] as PortraitComponent
  return null
}

// === EXPRESSION OVERLAYS ===

export type Expression = 'normal' | 'tense' | 'shocked'

export function ExpressionOverlay({ expression }: { expression: Expression }) {
  if (expression === 'normal') return null
  const svgProps = { viewBox: '0 0 80 96', width: '100%', height: '100%', className: 'absolute inset-0' }

  if (expression === 'tense') return (
    <svg {...svgProps} fill="none">
      {/* Sweat drop */}
      <path d="M58 16Q60 20 58 24" stroke="currentColor" strokeWidth="1.5" opacity="0.5" className="text-cyan-400/70 animate-pulse" />
      <circle cx="58" cy="26" r="1.5" fill="currentColor" opacity="0.4" className="text-cyan-400/70" />
      {/* Tension lines near temple */}
      <line x1="20" y1="20" x2="24" y2="24" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <line x1="18" y1="24" x2="22" y2="28" stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
    </svg>
  )

  if (expression === 'shocked') return (
    <svg {...svgProps} fill="none">
      {/* Wide eyes */}
      <circle cx="33" cy="28" r="3.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" className="text-amber-400/70" />
      <circle cx="47" cy="28" r="3.5" stroke="currentColor" strokeWidth="1.5" opacity="0.6" className="text-amber-400/70" />
      <circle cx="33" cy="28" r="1" fill="currentColor" opacity="0.5" className="text-amber-400/70" />
      <circle cx="47" cy="28" r="1" fill="currentColor" opacity="0.5" className="text-amber-400/70" />
      {/* Shock lines */}
      <line x1="10" y1="10" x2="16" y2="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="64" y1="10" x2="70" y2="6" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <line x1="6" y1="18" x2="12" y2="16" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      <line x1="68" y1="18" x2="74" y2="16" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
    </svg>
  )

  return null
}

export function getExpressionForPhase(phase: string): Expression {
  if (phase === 'confrontation') return 'shocked'
  if (phase === 'deep') return 'tense'
  return 'normal'
}
