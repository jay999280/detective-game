import { Router } from 'express'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '../../data')

export const verifyRouter = Router()

verifyRouter.post('/verify', (req, res) => {
  const { caseId, submission } = req.body as {
    caseId: string
    submission: { culpritId: string; motiveClueId: string; methodClueIds: string[]; collectedCount?: number; totalClues?: number }
  }

  const filePath = path.join(dataDir, `${caseId}.json`)
  if (!fs.existsSync(filePath)) { res.status(404).json({ error: 'Case not found' }); return }

  const caseData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  const truth = caseData.truth
  const total = (caseData.clues as any[]).length
  const collected = submission.collectedCount || 0

  const culpritCorrect = submission.culpritId === truth.culpritId
  const motiveCorrect = submission.motiveClueId === truth.motiveClueId
  const methodCorrect =
    truth.methodClueIds.length > 0 &&
    truth.methodClueIds.every((id: string) => submission.methodClueIds.includes(id)) &&
    submission.methodClueIds.every((id: string) => truth.methodClueIds.includes(id))

  let score: 'S' | 'A' | 'B' | 'C'
  if (culpritCorrect && motiveCorrect && methodCorrect) score = 'S'
  else if (culpritCorrect && (motiveCorrect || methodCorrect)) score = 'A'
  else if (culpritCorrect) score = 'B'
  else score = 'C'

  const allIds = [...submission.methodClueIds]
  if (submission.motiveClueId) allIds.push(submission.motiveClueId)
  const missedKeyClues = truth.keyEvidenceIds.filter((id: string) => !allIds.includes(id))

  const searchCompleteness = total > 0 ? Math.round((collected / total) * 100) : 0
  const accuracy = score === 'S' ? 100 : score === 'A' ? 75 : score === 'B' ? 50 : 20

  const keyFindings: string[] = []
  if (culpritCorrect) keyFindings.push('正确指认真凶')
  if (motiveCorrect) keyFindings.push('准确识别动机')
  if (methodCorrect) keyFindings.push('完整还原作案手法')
  if (searchCompleteness >= 80) keyFindings.push('全面收集证据')
  else if (searchCompleteness >= 50) keyFindings.push('证据收集较为充分')
  else keyFindings.push('仍有大量证据未发现')

  const reportSummary = score === 'S'
    ? `这是一次完美的推理。你成功指认了${caseData.characters.find((c: any) => c.id === truth.culpritId)?.name || '真凶'}，准确还原了动机与作案手法，展现了出色的侦探素养。`
    : score === 'A'
    ? `你找到了真凶，推理方向基本正确。案件中仍有一些细节等待你去补完——那或许会让整个画面更加清晰。`
    : score === 'B'
    ? `你锁定了正确的人，但推理链条还不够坚实。回看那些遗漏的线索，也许会发现新的突破口。`
    : `你未能找到真正的凶手。不要气馁——每一个优秀的侦探都有过失败，重要的是从真相中学习。`

  res.json({
    score, culpritCorrect, motiveCorrect, methodCorrect,
    missedKeyClues, truth,
    searchCompleteness, accuracy,
    keyFindings, reportSummary
  })
})
