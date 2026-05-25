import type { SVGProps } from 'react'

const baseProps: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.6',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  width: '1em',
  height: '1em'
}

function Icon({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...baseProps} {...props}>
      {children}
    </svg>
  )
}

// === LOGO ===
export function LogoIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p} viewBox="0 0 24 24">
      <circle cx="10" cy="10" r="6" />
      <line x1="14.5" y1="14.5" x2="20" y2="20" />
      <line x1="7" y1="10" x2="13" y2="10" />
      <line x1="10" y1="7" x2="10" y2="13" />
    </Icon>
  )
}

// === CASE TYPES ===
export function MurderIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <path d="M6 2l2 12h8l2-12" />
      <line x1="8" y1="5" x2="16" y2="5" />
      <circle cx="12" cy="18" r="2" />
      <line x1="12" y1="16" x2="12" y2="20" />
      <line x1="10" y1="21" x2="14" y2="21" />
    </Icon>
  )
}

export function MissingIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M4 21c0-3 2.5-5.5 5-5.5s5 2.5 5 5.5" />
      <circle cx="17" cy="17" r="4" />
      <line x1="17" y1="15" x2="17" y2="19" />
      <line x1="15" y1="17" x2="19" y2="17" />
    </Icon>
  )
}

export function TheftIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M3 10c0-1 1-2 2-2h2l2-4h6l2 4h2c1 0 2 1 2 2" />
      <circle cx="12" cy="14" r="2" />
      <line x1="12" y1="12.5" x2="12" y2="15.5" />
    </Icon>
  )
}

export function KidnapIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <circle cx="10" cy="6" r="3" />
      <path d="M5 15c0-3 2.5-5 5-5s5 2 5 5" />
      <path d="M16 14l1-3 3 7-2 1-1-2h-2l-1 2-2-1 3-7z" />
      <circle cx="18" cy="11" r="1" />
    </Icon>
  )
}

// === SCENE TYPES ===
export function CrimeSceneIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <line x1="8" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="16" y2="21" />
      <line x1="3" y1="8" x2="21" y2="8" />
      <line x1="3" y1="16" x2="21" y2="16" />
      <circle cx="6" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="18" cy="18" r="0.8" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function InteriorIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <path d="M3 10l9-8 9 8" />
      <path d="M5 9v11h14V9" />
      <rect x="8" y="14" width="8" height="6" />
      <rect x="10" y="10" width="4" height="4" />
      <line x1="12" y1="11" x2="12" y2="13" />
    </Icon>
  )
}

export function StreetIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <line x1="4" y1="20" x2="20" y2="20" />
      <line x1="6" y1="8" x2="6" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="18" y1="10" x2="18" y2="20" />
      <circle cx="6" cy="7" r="2" />
      <circle cx="12" cy="3" r="1.5" />
      <circle cx="18" cy="9" r="1.5" />
      <path d="M3 20l4-3 5 2 5-4 4 3" />
    </Icon>
  )
}

export function OfficeIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <rect x="2" y="6" width="20" height="16" rx="1" />
      <line x1="2" y1="6" x2="12" y2="2" />
      <line x1="22" y1="6" x2="12" y2="2" />
      <rect x="7" y="11" width="3" height="2" rx="0.5" />
      <rect x="14" y="11" width="3" height="2" rx="0.5" />
      <rect x="7" y="16" width="3" height="3" rx="0.5" />
      <rect x="14" y="16" width="3" height="3" rx="0.5" />
    </Icon>
  )
}

export function MorgueIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <path d="M8 8l2 2-2 2" />
    </Icon>
  )
}

export function StationIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <path d="M12 2l8 5v2H4V7l8-5z" />
      <rect x="5" y="9" width="14" height="12" rx="1" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="12" y1="9" x2="12" y2="12" />
      <circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    </Icon>
  )
}

// === CLUE TYPES ===
export function PhysicalClueIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <circle cx="10" cy="10" r="5" />
      <line x1="13.5" y1="13.5" x2="20" y2="20" />
      <line x1="10" y1="8" x2="10" y2="12" />
      <line x1="8" y1="10" x2="12" y2="10" />
    </Icon>
  )
}

export function TestimonyIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <path d="M20 2H4c-1 0-2 1-2 2v18l5-4h13c1 0 2-1 2-2V4c0-1-1-2-2-2z" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="13" x2="14" y2="13" />
    </Icon>
  )
}

export function ContradictionIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <path d="M12 2L2 20h20L12 2z" />
      <line x1="12" y1="9" x2="12" y2="14" />
      <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
    </Icon>
  )
}

// === UI CONTROLS ===
export function ArrowLeftIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="9,6 3,12 9,18" />
    </Icon>
  )
}

export function ArrowRightIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="15,6 21,12 15,18" />
    </Icon>
  )
}

export function CheckIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <polyline points="4,13 9,18 20,6" />
    </Icon>
  )
}

export function CloseIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </Icon>
  )
}

export function FileIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <path d="M13 2H6c-1 0-2 1-2 2v16c0 1 1 2 2 2h12c1 0 2-1 2-2V9l-7-7z" />
      <polyline points="13,2 13,9 20,9" />
      <line x1="8" y1="14" x2="16" y2="14" />
      <line x1="8" y1="17" x2="14" y2="17" />
    </Icon>
  )
}

export function NotesIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <rect x="4" y="3" width="16" height="18" rx="1" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="16" y2="11" />
      <line x1="8" y1="15" x2="12" y2="15" />
    </Icon>
  )
}

export function PersonIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    </Icon>
  )
}

export function ScrollIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <path d="M6 2h12c1 0 2 1 2 2v16c0 1-1 2-2 2H6c-1 0-2-1-2-2V4c0-1 1-2 2-2z" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="12" y2="14" />
      <path d="M4 20c0-1 1-2 2-2" />
      <path d="M20 4c0 1-1 2-2 2" />
    </Icon>
  )
}

export function WarningIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="7" x2="12" y2="13" />
      <circle cx="12" cy="16.5" r="0.8" fill="currentColor" stroke="none" />
    </Icon>
  )
}

export function StarIcon(p: SVGProps<SVGSVGElement>) {
  return (
    <Icon {...p}>
      <polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9" />
    </Icon>
  )
}

// === Composite icons (icon + label for compact display) ===
export const Icons = {
  murder: MurderIcon,
  missing: MissingIcon,
  theft: TheftIcon,
  kidnapping: KidnapIcon,
  crime_scene: CrimeSceneIcon,
  interior: InteriorIcon,
  street: StreetIcon,
  office: OfficeIcon,
  morgue: MorgueIcon,
  station: StationIcon,
  physical: PhysicalClueIcon,
  testimony: TestimonyIcon,
  contradiction: ContradictionIcon,
} as const
