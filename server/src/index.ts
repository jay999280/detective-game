import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { generateRouter } from './routes/generate.js'
import { casesRouter } from './routes/cases.js'
import { verifyRouter } from './routes/verify.js'

const app = express()
const PORT = process.env.PORT || 3001
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(cors())
app.use(express.json())

// API routes
app.use('/api', generateRouter)
app.use('/api', casesRouter)
app.use('/api', verifyRouter)

// Serve built frontend in production
const clientDist = path.join(__dirname, '../../client/dist')
app.use(express.static(clientDist))

// SPA fallback - all non-API routes serve index.html
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return
  res.sendFile(path.join(clientDist, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Serving frontend from: ${clientDist}`)
})
