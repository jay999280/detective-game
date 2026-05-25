import type { CaseGenerateParams } from '../services/types.js'

export function buildSkeletonPrompt(params: CaseGenerateParams): string {
  return `你是一位资深推理小说作家，擅长构思精妙的犯罪诡计。

请为一个推理游戏设计核心诡计骨架。案件参数：
- 风格：${params.style === 'honkaku' ? '本格推理' : params.style === 'social' ? '社会派推理' : params.style === 'crime' ? '刑侦' : '悬疑'}
- 类型：${params.type === 'murder' ? '谋杀' : params.type === 'missing' ? '失踪' : params.type === 'theft' ? '盗窃' : '绑架'}
- 难度：${params.difficulty === 'easy' ? '简单（3嫌疑人2核心线索）' : params.difficulty === 'medium' ? '中等（5嫌疑人4核心线索）' : '困难（6嫌疑人6核心线索）'}
- 嫌疑人数量：${params.characterCount}

要求：
1. 设计一个核心诡计（不在场证明/身份替换/密室/叙述性诡计/时间诡计），给出具体手法
2. 构建"三层真相"：表面真相 → 调查中暴露的"真相" → 反转后的最终真相
3. 至少1个精心布置的红鲱鱼（误导方向），让至少2个嫌疑人看起来像真凶
4. 至少1个关键反转点
5. 时间线必须自洽，动机必须合理

输出JSON格式：
{
  "trickType": "诡计类型",
  "surfaceTruth": "表面看起来的情况",
  "investigationReveal": "调查中指向的'真相'",
  "finalTruth": "反转后的最终真相",
  "redHerrings": ["误导1", "误导2"],
  "twistMoment": "反转关键点",
  "timeline": [{"time": "时间", "event": "事件"}],
  "culpritProfile": {"motive": "动机", "method": "手法"},
  "victimProfile": {"name": "被害人", "age": 年龄, "occupation": "职业", "causeOfDeath": "死因", "location": "案发地点"}
}`
}
