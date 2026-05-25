const fs = require('fs')
const path = require('path')

// Load preset cases - these are served from the git repo
const presetIds = ['preset-01', 'preset-02']

function loadPreset(id) {
  const filePath = path.join(__dirname, '..', 'server', 'data', `${id}.json`)
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  }
  return null
}

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const url = new URL(req.url, 'http://localhost')
  const segments = url.pathname.replace('/api/cases', '').split('/').filter(Boolean)
  const caseId = segments[0]

  if (caseId) {
    const caseData = loadPreset(caseId)
    if (!caseData) return res.status(404).json({ error: 'Case not found' })
    return res.status(200).json(caseData)
  }

  // List all cases
  const cases = presetIds.map(id => {
    const d = loadPreset(id)
    if (!d) return null
    return {
      id: d.id,
      title: d.meta.title,
      style: d.meta.style,
      difficulty: d.meta.difficulty,
      completed: false,
      isPreset: true,
      createdAt: ''
    }
  }).filter(Boolean)

  return res.status(200).json(cases)
}
