import type { CaseGenerateParams } from '../services/types.js'

export function buildDialoguesPrompt(
  params: CaseGenerateParams,
  skeleton: string,
  characters: string
): string {
  return `你是一位对话写作大师，专精推理游戏剧本。

请基于以下诡计骨架和人物资料，生成完整的游戏对话和线索系统。

诡计骨架：
${skeleton}

人物资料：
${characters}

============

请生成以下内容：

## 1. 场景（3-6个调查场景）
每个场景包含：名称、丰富的文字描述（营造氛围）、氛围类型（crime_scene/interior/street/office/morgue/station）、可调查的热点（2-4个）

## 2. 人物对话
为每个人物编写3轮对话（initial/deep/confrontation），每轮2-4句。
- 首轮：角色自我介绍，给出表面证词
- 深入轮：追问后暴露矛盾或透露更多信息
- 摊牌轮（某些角色）：被逼到墙角时的最后话语

分支选项：在关键对话节点设计2-3个选项，不同选项可能：
- 解锁不同线索
- 影响角色信任度（-10到+10）
- 引导到不同后续对话

## 3. 线索
设计所有线索，分为三类：
- physical（物证）
- testimony（证言，来自对话）
- contradiction（矛盾点，证词间冲突）

标注哪些是关键证据（isKeyEvidence），哪些属于手法相关证据（用于最终提交选择）。

## 4. 真相
完整真相：真凶ID、动机、手法、完整时间线、反转点、完整故事叙述

输出JSON格式，所有内容整合为一个完整的CaseData对象。`
}
