import Anthropic from '@anthropic-ai/sdk'
import { buildSkeletonPrompt } from '../prompts/skeleton.js'
import { buildCharactersPrompt } from '../prompts/characters.js'
import { buildDialoguesPrompt } from '../prompts/dialogues.js'
import type { CaseGenerateParams, CaseData } from './types.js'

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set')
  return new Anthropic({ apiKey })
}

async function chat(system: string, user: string): Promise<string> {
  const client = getClient()
  const msg = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system,
    messages: [{ role: 'user', content: user }]
  })
  const block = msg.content.find(c => c.type === 'text')
  return (block as any)?.text ?? ''
}

export async function generateCase(
  params: CaseGenerateParams,
  onProgress: (phase: string) => void
): Promise<CaseData> {
  onProgress('skeleton')
  const skeleton = await chat(
    buildSkeletonPrompt(params),
    `生成一个${params.style}风格的${params.type}案件诡计骨架。直接输出JSON，不要markdown包裹。`
  )

  onProgress('characters')
  const characters = await chat(
    buildCharactersPrompt(params, skeleton),
    `基于以上诡计骨架，生成${params.characterCount}个嫌疑人的人物数据。直接输出JSON。`
  )

  onProgress('dialogues')
  const dialogues = await chat(
    buildDialoguesPrompt(params, skeleton, characters),
    '基于以上诡计和人物，生成完整对话脚本和线索分布。直接输出JSON。'
  )

  onProgress('final')
  const result = await chat(
    `你是一个严格的推理游戏编辑。请审查以下案件数据，确保逻辑闭环、没有漏洞、反转精彩。将数据整合为标准的CaseData JSON输出。`,
    `诡计骨架：${skeleton}\n\n人物数据：${characters}\n\n对话与线索：${dialogues}`
  )

  const jsonStr = result.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
  const caseData = JSON.parse(jsonStr) as CaseData
  return { ...caseData, id: `gen-${Date.now()}` }
}
