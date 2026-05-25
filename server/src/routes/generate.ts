import { Router } from 'express'
import { generateCase } from '../services/ai.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import type { CaseGenerateParams } from '../services/types.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '../../data')

export const generateRouter = Router()

generateRouter.post('/generate', async (req, res) => {
  const params = req.body as CaseGenerateParams & { usePreset?: boolean; presetId?: string }

  if (params.usePreset && params.presetId) {
    const filePath = path.join(dataDir, `${params.presetId}.json`)
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
      res.json(data)
      return
    }
    res.status(404).json({ error: 'Preset case not found' })
    return
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(400).json({
      error: 'ANTHROPIC_API_KEY not configured. Use preset cases or set API key.'
    })
    return
  }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  try {
    const caseData = await generateCase(params, (phase) => {
      const labels: Record<string, string> = {
        skeleton: '正在构思核心诡计...',
        characters: '正在设计嫌疑人...',
        dialogues: '正在编织对话与线索...',
        final: '正在校验逻辑...'
      }
      res.write(`data: ${JSON.stringify({ phase, label: labels[phase] || phase })}\n\n`)
    })

    const fileName = `${caseData.id}.json`
    fs.writeFileSync(path.join(dataDir, fileName), JSON.stringify(caseData, null, 2), 'utf-8')

    res.write(`data: ${JSON.stringify({ phase: 'done', caseData })}\n\n`)
  } catch (err: any) {
    res.write(`data: ${JSON.stringify({ phase: 'error', message: err.message })}\n\n`)
  }
  res.end()
})
