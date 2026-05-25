import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { generateCase } from '../api/client'

export function GeneratePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const loadCase = useGameStore(s => s.loadCase)
  const [progress, setProgress] = useState('')
  const [error, setError] = useState('')

  const params = location.state as any

  useEffect(() => {
    if (!params) {
      navigate('/')
      return
    }

    generateCase(params, (label) => {
      setProgress(label)
    }).then(caseData => {
      loadCase(caseData)
      navigate('/opening')
    }).catch(err => {
      setError(err.message)
    })
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div>
            <p className="text-warning mb-4">{error}</p>
            <button onClick={() => navigate('/')} className="px-4 py-2 rounded-lg border border-border text-text-secondary hover:text-text-primary cursor-pointer">
              返回首页
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-6xl animate-bounce">🔍</div>
            <h2 className="font-serif text-xl text-accent">正在生成案件</h2>
            <div className="w-64 h-1 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-accent animate-pulse rounded-full transition-all duration-500"
                style={{ width: progress ? '75%' : '25%' }} />
            </div>
            <p className="text-sm text-text-secondary">{progress || '正在初始化...'}</p>
          </div>
        )}
      </div>
    </div>
  )
}
