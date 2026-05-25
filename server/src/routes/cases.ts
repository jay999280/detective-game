import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '../../data')

export const casesRouter = Router()

casesRouter.get('/cases', (_req, res) => {
  if (!fs.existsSync(dataDir)) {
    res.json([])
    return
  }
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'))
  const cases = files.map(f => {
    const raw = JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf-8'))
    return {
      id: raw.id,
      title: raw.meta?.title || '未知案件',
      style: raw.meta?.style || 'honkaku',
      difficulty: raw.meta?.difficulty || 'medium',
      completed: false,
      isPreset: raw.id.startsWith('preset-'),
      createdAt: raw.id.startsWith('gen-')
        ? new Date(parseInt(raw.id.replace('gen-', ''))).toISOString()
        : ''
    }
  })
  res.json(cases)
})

casesRouter.get('/cases/:id', (req, res) => {
  const filePath = path.join(dataDir, `${req.params.id}.json`)
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: 'Case not found' })
    return
  }
  res.json(JSON.parse(fs.readFileSync(filePath, 'utf-8')))
})
