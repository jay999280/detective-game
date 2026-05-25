import type { CaseGenerateParams } from '../services/types.js'

export function buildCharactersPrompt(params: CaseGenerateParams, skeleton: string): string {
  return `你是一位擅长塑造人物的推理小说作家。

基于以下诡计骨架，设计${params.characterCount}个嫌疑人：
${skeleton}

每个嫌疑人必须包含：
1. 姓名、年龄、职业
2. emoji头像（1个字符，代表该角色气质）
3. 与被害人的关系
4. 表面动机（容易被发现的）
5. 隐藏秘密（需要深挖才能暴露的）
6. 不在场证明（可能是假的）
7. 一句标志性谎言（会在对话中说出的）

人物关系网要求：
- 至少一对秘密关系（不为外人所知）
- 至少一个角色在保护另一个人
- 至少一个角色知道的比说出来的多
- 至少2处互相矛盾的证词

输出JSON数组：
[{
  "name": "姓名",
  "age": 年龄,
  "occupation": "职业",
  "avatar": "🎭",
  "relationToVictim": "与被害人关系",
  "surfaceMotive": "表面动机",
  "hiddenSecret": "隐藏秘密",
  "alibi": "不在场证明",
  "telltaleLie": "标志性谎言",
  "isCulprit": false
}]`
}
