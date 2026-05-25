import type { CaseData, CaseListItem, CaseGenerateParams, VerdictSubmission, VerdictResult } from '../types/case'

const BASE = (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_URL) || '/api'

export async function fetchCases(): Promise<CaseListItem[]> {
  const res = await fetch(`${BASE}/cases`)
  return res.json()
}

export async function fetchCase(id: string): Promise<CaseData> {
  const res = await fetch(`${BASE}/cases/${id}`)
  return res.json()
}

export function generateCase(
  params: CaseGenerateParams,
  onProgress: (label: string) => void
): Promise<CaseData> {
  return new Promise((resolve, reject) => {
    fetch(`${BASE}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    }).then(async (response) => {
      if (!response.ok) {
        const err = await response.json()
        reject(new Error(err.error || '生成失败'))
        return
      }

      const reader = response.body?.getReader()
      if (!reader) { reject(new Error('No stream')); return }

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.slice(6))
            if (data.phase === 'done') {
              resolve(data.caseData)
            } else if (data.phase === 'error') {
              reject(new Error(data.message))
            } else {
              onProgress(data.label)
            }
          }
        }
      }
    }).catch(reject)
  })
}

export async function verifyCase(
  caseId: string,
  submission: VerdictSubmission
): Promise<VerdictResult> {
  const res = await fetch(`${BASE}/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ caseId, submission })
  })
  return res.json()
}
