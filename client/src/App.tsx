import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { GeneratePage } from './pages/GeneratePage'
import { OpeningPage } from './pages/OpeningPage'
import { InvestigatePage } from './pages/InvestigatePage'
import { ReasoningPage } from './pages/ReasoningPage'
import { VerdictPage } from './pages/VerdictPage'
import { useAudioManager } from './audio/useAudio'
import { ScreenShake, ClueFlash } from './components/FXOverlay'

function AudioBridge() { useAudioManager(); return null }

export default function App() {
  return (
    <BrowserRouter>
      <AudioBridge />
      <div className="min-h-screen bg-bg-main text-text-primary">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generate" element={<GeneratePage />} />
          <Route path="/opening" element={<OpeningPage />} />
          <Route path="/investigate" element={<InvestigatePage />} />
          <Route path="/reasoning" element={<ReasoningPage />} />
          <Route path="/verdict" element={<VerdictPage />} />
        </Routes>
      </div>
      <ScreenShake />
      <ClueFlash />
    </BrowserRouter>
  )
}
