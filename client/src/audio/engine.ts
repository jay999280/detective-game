// Procedural audio engine - no external files needed
type Mood = 'menu' | 'investigation' | 'confrontation' | 'verdict'

let ctx: AudioContext | null = null
let masterGain: GainNode | null = null
let currentMood: Mood = 'menu'
let activeNodes: AudioNode[] = []
let moodTimeout: ReturnType<typeof setTimeout> | null = null
let enabled = false

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  if (!masterGain) {
    masterGain = ctx.createGain()
    masterGain.gain.value = 0.12
    masterGain.connect(ctx.destination)
  }
  return ctx
}

function stopAll() {
  activeNodes.forEach(n => { try { n.disconnect() } catch {} })
  activeNodes = []
}

// === SOUND EFFECTS ===

export function playClick() {
  if (!enabled) return
  const c = getCtx()
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = 'sine'; osc.frequency.value = 800
  g.gain.setValueAtTime(0.06, c.currentTime)
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.08)
  osc.connect(g); g.connect(c.destination)
  osc.start(); osc.stop(c.currentTime + 0.08)
}

export function playClueFound() {
  if (!enabled) return
  const c = getCtx()
  const now = c.currentTime
  // Rising chime
  ;[523, 659, 784].forEach((freq, i) => {
    const osc = c.createOscillator(); const g = c.createGain()
    osc.type = 'sine'; osc.frequency.value = freq
    g.gain.setValueAtTime(0, now + i * 0.1)
    g.gain.linearRampToValueAtTime(0.08, now + i * 0.1 + 0.05)
    g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.3)
    osc.connect(g); g.connect(c.destination)
    osc.start(now + i * 0.1); osc.stop(now + i * 0.1 + 0.3)
  })
}

export function playShock() {
  if (!enabled) return
  const c = getCtx()
  const now = c.currentTime
  // Low rumble
  const osc = c.createOscillator(); const g = c.createGain()
  osc.type = 'sawtooth'; osc.frequency.value = 45
  g.gain.setValueAtTime(0.1, now)
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.5)
  osc.connect(g); g.connect(c.destination)
  osc.start(); osc.stop(now + 0.5)
  // Noise burst
  const bufferSize = c.sampleRate * 0.3
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 3)
  const noise = c.createBufferSource(); noise.buffer = buffer
  const ng = c.createGain(); ng.gain.setValueAtTime(0.04, now); ng.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
  const filter = c.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 200
  noise.connect(filter); filter.connect(ng); ng.connect(c.destination)
  noise.start(); noise.stop(now + 0.3)
}

export function playTypewriter() {
  if (!enabled) return
  const c = getCtx()
  const now = c.currentTime
  const osc = c.createOscillator(); const g = c.createGain()
  osc.type = 'square'; osc.frequency.value = 200 + Math.random() * 100
  g.gain.setValueAtTime(0.015, now)
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.02)
  osc.connect(g); g.connect(c.destination)
  osc.start(); osc.stop(now + 0.02)
}

// === BGM ===

function drone(freq: number, modRate: number, gainVal: number, dest: AudioNode) {
  const c = getCtx()
  const osc = c.createOscillator(); const g = c.createGain()
  const lfo = c.createOscillator(); const lfoG = c.createGain()
  osc.type = 'sine'; osc.frequency.value = freq
  lfo.type = 'sine'; lfo.frequency.value = modRate
  lfoG.gain.value = 3 // slight pitch wobble
  lfo.connect(lfoG); lfoG.connect(osc.frequency)
  g.gain.value = gainVal
  osc.connect(g); g.connect(dest)
  osc.start(); lfo.start()
  activeNodes.push(osc, g, lfo, lfoG)
}

function pad(freq: number, gainVal: number, dest: AudioNode) {
  const c = getCtx()
  const osc = c.createOscillator(); const g = c.createGain()
  osc.type = 'triangle'; osc.frequency.value = freq
  g.gain.value = gainVal
  osc.connect(g); g.connect(dest)
  osc.start()
  activeNodes.push(osc, g)
}

function bassLine(notes: number[], dest: AudioNode) {
  const c = getCtx()
  const osc = c.createOscillator(); const g = c.createGain()
  osc.type = 'triangle'
  g.gain.value = 0.06
  osc.connect(g); g.connect(dest)
  osc.start()
  activeNodes.push(osc, g)

  let step = 0
  const interval = setInterval(() => {
    if (!enabled || currentMood === 'menu') return
    osc.frequency.setTargetAtTime(notes[step % notes.length], c.currentTime, 0.3)
    step++
  }, 3000)
  activeNodes.push({ disconnect: () => clearInterval(interval) } as any)
}

export function setMood(mood: Mood) {
  currentMood = mood
  if (!enabled) return
  stopAll()
  const c = getCtx()
  if (!masterGain) { masterGain = c.createGain(); masterGain.connect(c.destination) }
  masterGain.gain.setTargetAtTime(0.12, c.currentTime, 0.5)

  const bus = c.createGain(); bus.gain.value = 0.5; bus.connect(masterGain!)
  const verb = c.createConvolver()
  // Simple reverb via short noise buffer
  const revLen = c.sampleRate * 1.5
  const revBuf = c.createBuffer(1, revLen, c.sampleRate)
  const revData = revBuf.getChannelData(0)
  for (let i = 0; i < revLen; i++) revData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.4))
  verb.buffer = revBuf
  const wetG = c.createGain(); wetG.gain.value = 0.3
  bus.connect(verb); verb.connect(wetG); wetG.connect(masterGain!)
  bus.connect(masterGain!) // dry

  switch (mood) {
    case 'menu':
      // Slow, mysterious drone
      drone(55, 0.1, 0.05, bus)
      pad(110, 0.02, bus)
      pad(165, 0.015, bus)
      break

    case 'investigation':
      // Tension-building, subtle
      drone(41, 0.15, 0.06, bus)
      drone(82, 0.12, 0.03, bus)
      pad(123, 0.02, bus)
      pad(196, 0.015, bus)
      // Occasional high string
      const hi = getCtx().createOscillator(); const hiG = getCtx().createGain()
      hi.type = 'sine'; hi.frequency.value = 440
      hiG.gain.value = 0
      hi.connect(hiG); hiG.connect(bus)
      hi.start()
      activeNodes.push(hi, hiG)
      // Fade high note in and out slowly
      let hiOn = false
      const hiTimer = setInterval(() => {
        if (currentMood !== 'investigation') { clearInterval(hiTimer); return }
        hiOn = !hiOn
        hiG.gain.setTargetAtTime(hiOn ? 0.015 : 0, getCtx().currentTime, 2)
      }, 8000)
      activeNodes.push({ disconnect: () => clearInterval(hiTimer) } as any)
      break

    case 'confrontation':
      // Intense, pulsing
      drone(33, 0.2, 0.08, bus)
      drone(66, 0.15, 0.04, bus)
      bassLine([33, 37, 33, 41], bus)
      // Pulse
      const pulse = getCtx().createOscillator(); const pG = getCtx().createGain()
      pulse.type = 'square'; pulse.frequency.value = 55
      pG.gain.value = 0.02
      const pLFO = getCtx().createOscillator(); const pLg = getCtx().createGain()
      pLFO.type = 'sine'; pLFO.frequency.value = 2
      pLg.gain.value = 20
      pLFO.connect(pLg); pLg.connect(pG.gain)
      pulse.connect(pG); pG.connect(bus)
      pulse.start(); pLFO.start()
      activeNodes.push(pulse, pG, pLFO, pLg)
      break

    case 'verdict':
      // Resolution, warm
      drone(55, 0.08, 0.04, bus)
      pad(110, 0.025, bus)
      pad(165, 0.02, bus)
      pad(220, 0.015, bus)
      break
  }

  activeNodes.push(bus, verb, wetG)
}

export function startAudio() {
  if (enabled) return
  enabled = true
  getCtx()
  setMood(currentMood)
}

export function stopAudio() {
  enabled = false
  stopAll()
  if (moodTimeout) clearTimeout(moodTimeout)
}
