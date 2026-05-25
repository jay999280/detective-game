const fs = require('fs')
const path = require('path')

function loadPreset(id) {
  const fp = path.join(__dirname, '..', 'server', 'data', `${id}.json`)
  if (fs.existsSync(fp)) return JSON.parse(fs.readFileSync(fp, 'utf-8'))
  return null
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  let body = ''
  req.on('data', chunk => body += chunk)
  req.on('end', () => {
    try {
      const { caseId, submission } = JSON.parse(body)
      const caseData = loadPreset(caseId)
      if (!caseData) return res.status(404).json({ error: 'Case not found' })

      const truth = caseData.truth
      const allClues = caseData.clues || []
      const collected = submission.collectedCount || 0

      const culpritCorrect = submission.culpritId === truth.culpritId
      const motiveCorrect = submission.motiveClueId === truth.motiveClueId
      const methodCorrect =
        truth.methodClueIds.length > 0 &&
        truth.methodClueIds.every(id => submission.methodClueIds.includes(id)) &&
        submission.methodClueIds.every(id => truth.methodClueIds.includes(id))

      let score
      if (culpritCorrect && motiveCorrect && methodCorrect) score = 'S'
      else if (culpritCorrect && (motiveCorrect || methodCorrect)) score = 'A'
      else if (culpritCorrect) score = 'B'
      else score = 'C'

      const allIds = [...submission.methodClueIds, submission.motiveClueId].filter(Boolean)
      const missedKeyClues = truth.keyEvidenceIds.filter(id => !allIds.includes(id))
      const searchCompleteness = allClues.length > 0 ? Math.round((collected / allClues.length) * 100) : 0
      const accuracy = score === 'S' ? 100 : score === 'A' ? 75 : score === 'B' ? 50 : 20

      const keyFindings = []
      if (culpritCorrect) keyFindings.push('正确指认真凶')
      if (motiveCorrect) keyFindings.push('准确识别动机')
      if (methodCorrect) keyFindings.push('完整还原作案手法')
      if (searchCompleteness >= 80) keyFindings.push('全面收集证据')
      else if (searchCompleteness >= 50) keyFindings.push('证据收集较为充分')
      else keyFindings.push('仍有大量证据未发现')

      const culpritName = caseData.characters.find(c => c.id === truth.culpritId)?.name || '未知'
      const summaries = {
        S: `完美的推理。成功指认了${culpritName}，还原了全部真相。`,
        A: `找到了真凶${culpritName}，推理方向基本正确。`,
        B: `锁定了${culpritName}，但推理链条还不够坚实。`,
        C: `未能找到真正的凶手。每一个优秀的侦探都有过失败，重要的是从真相中学习。`
      }

      return res.status(200).json({
        score, culpritCorrect, motiveCorrect, methodCorrect,
        missedKeyClues, truth,
        searchCompleteness, accuracy,
        keyFindings, reportSummary: summaries[score] || summaries.C
      })
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
  })
}
