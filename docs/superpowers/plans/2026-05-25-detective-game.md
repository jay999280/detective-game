# 推理游戏实施计划

> **Goal:** 构建 AI 驱动 + 预设案件的网页悬疑推理游戏
> **Architecture:** React SPA (Vite) + Express 后端，SSE 流式生成，Zustand 状态管理
> **Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v4, Zustand, Framer Motion, Express, Anthropic SDK

---

### Task 1: 项目脚手架 — Root + Server + Client

**Files:**
- Create: `C:/Users/jay/Desktop/推理游戏/package.json`
- Create: `C:/Users/jay/Desktop/推理游戏/server/package.json`
- Create: `C:/Users/jay/Desktop/推理游戏/server/tsconfig.json`
- Create: `C:/Users/jay/Desktop/推理游戏/server/.env.example`
- Create: `C:/Users/jay/Desktop/推理游戏/client/` (Vite scaffold)

### Task 2: 类型定义

**Files:**
- Create: `client/src/types/case.ts`

### Task 3: 后端 — Express 入口 + SSE + Prompt 模板 + API 路由 + 预设案件

**Files:**
- Create: `server/src/index.ts`
- Create: `server/src/services/ai.ts`
- Create: `server/src/prompts/skeleton.ts`
- Create: `server/src/prompts/characters.ts`
- Create: `server/src/prompts/dialogues.ts`
- Create: `server/src/routes/generate.ts`
- Create: `server/src/routes/cases.ts`
- Create: `server/src/routes/verify.ts`
- Create: `server/data/preset-01.json`
- Create: `server/data/preset-02.json`

### Task 4: 前端 — Store + API Client + Router + 6 页面 + 7 组件 + 样式

**Files:**
- Create: `client/src/store/gameStore.ts`
- Create: `client/src/api/client.ts`
- Create: `client/src/App.tsx`
- Create: `client/src/main.tsx`
- Create: `client/src/index.css`
- Create: `client/src/pages/HomePage.tsx`
- Create: `client/src/pages/GeneratePage.tsx`
- Create: `client/src/pages/OpeningPage.tsx`
- Create: `client/src/pages/InvestigatePage.tsx`
- Create: `client/src/pages/ReasoningPage.tsx`
- Create: `client/src/pages/VerdictPage.tsx`
- Create: `client/src/components/DialogueBox.tsx`
- Create: `client/src/components/SceneView.tsx`
- Create: `client/src/components/ClueBar.tsx`
- Create: `client/src/components/ClueCard.tsx`
- Create: `client/src/components/CharacterCard.tsx`
- Create: `client/src/components/ReasoningBoard.tsx`
- Create: `client/src/components/TypingText.tsx`

### Task 5: 集成 — 预设案件客户端加载 + 验证
