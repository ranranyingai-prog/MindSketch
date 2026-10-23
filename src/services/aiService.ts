import type { CardData } from '../types/card';
import { parseUnstructuredTextToCard } from '../data/bookPresets';

export interface AiConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
}

const DEFAULT_AI_CONFIG: AiConfig = {
  apiKey: (import.meta as any).env?.VITE_ARK_API_KEY || '',
  baseUrl: (import.meta as any).env?.VITE_ARK_BASE_URL || 'https://ark.cn-beijing.volces.com/api/v3',
  model: (import.meta as any).env?.VITE_ARK_MODEL || '',
};

const STORAGE_KEY = 'handdrawn_card_ai_config';

export function getAiConfig(): AiConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_AI_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Failed to load AI config:', e);
  }
  return DEFAULT_AI_CONFIG;
}

export function saveAiConfig(config: AiConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save AI config:', e);
  }
}

export async function generateCardFromAi(
  inputText: string,
  mode: 'book' | 'text',
  config: AiConfig = getAiConfig()
): Promise<Partial<CardData>> {
  const trimmed = inputText.trim();
  if (!trimmed) {
    throw new Error('请输入书名或文字内容');
  }

  // If user provided an API Key, call LLM endpoint
  if (config.apiKey && config.apiKey.trim()) {
    try {
      const systemPrompt = `你是一个专业的知识卡片与手绘图文提炼专家。
请根据用户的输入（${mode === 'book' ? '书名或主题' : '长文或笔记'}），提取并生成一份精简、高质量的手绘知识图文卡片内容。
必须严格输出纯 JSON 格式，包含以下字段，不要添加任何 Markdown 格式化标记如 \`\`\`json：
{
  "bookTitle": "主标题或书名(不含书名号)",
  "author": "作者或出处(若未知可填领域专家或提炼人)",
  "category": "主题分类标签(如: 个人成长/高效赋能/商业思维/心理学，4字以内)",
  "quote": "最核心、最具启发性的一句话金句(20-40字)",
  "keyPoints": [
    {"num": "1", "title": "干货要点1标题(10字内)", "desc": "要点详细解释(25-45字)"},
    {"num": "2", "title": "干货要点2标题(10字内)", "desc": "要点详细解释(25-45字)"},
    {"num": "3", "title": "干货要点3标题(10字内)", "desc": "要点详细解释(25-45字)"}
  ],
  "actionTip": "落地行动指南/可立刻执行的一小步(20-40字)",
  "counterIntuitiveInsight": "反直觉洞察/避坑指南(25-40字)",
  "targetAudienceTag": "适合人群标签(如: 适合：职场迷茫期 / 团队管理者)",
  "stampText": "手绘印章短词(4字内，如: 精选必读/高效赋能/深度思考)"
}`;

      const userPrompt = mode === 'book'
        ? `请为书名/主题《${trimmed}》生成精美的手绘知识卡片内容。`
        : `请提炼以下文字内容为手绘知识卡片：\n\n${trimmed}`;

      const cleanBaseUrl = config.baseUrl.replace(/\/+$/, '');
      const requestUrl = cleanBaseUrl.endsWith('/chat/completions')
        ? cleanBaseUrl
        : `${cleanBaseUrl}/chat/completions`;

      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.apiKey.trim()}`,
        },
        body: JSON.stringify({
          model: config.model || 'doubao-1-5-pro-32k-250115',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API 请求失败 (${response.status}): ${errorText}`);
      }

      const resData = await response.json();
      const rawContent = resData.choices?.[0]?.message?.content || '';

      // Clean JSON delimiters if model outputs markdown blocks
      const jsonString = rawContent
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      const parsed = JSON.parse(jsonString);
      return {
        bookTitle: parsed.bookTitle ? `《${parsed.bookTitle.replace(/[《》]/g, '')}》` : `《${trimmed}》`,
        author: parsed.author || '精选读书',
        category: parsed.category || '知识赋能',
        quote: parsed.quote || '知行合一，持续进化。',
        keyPoints: Array.isArray(parsed.keyPoints) && parsed.keyPoints.length > 0
          ? parsed.keyPoints.map((item: any, idx: number) => ({
              num: String(item.num || idx + 1),
              title: item.title || `核心要点 ${idx + 1}`,
              desc: item.desc || '在此输入具体洞察说明...',
            }))
          : [
              { num: '1', title: '核心认知', desc: '打破旧有思维框架，建立系统认知模型。' },
              { num: '2', title: '方法落地', desc: '将复杂问题拆解为每日可执行的小微动作。' },
              { num: '3', title: '持续复盘', desc: '定期回顾执行结果，动态调整改进策略。' },
            ],
        actionTip: parsed.actionTip || '今天就选定一个最小动作开始付诸实践。',
        counterIntuitiveInsight: parsed.counterIntuitiveInsight || '反直觉：知而不行等同于未知，小步快跑胜过完美规划。',
        targetAudienceTag: parsed.targetAudienceTag || '适合：追求高效进化的终身学习者',
        stampText: parsed.stampText || '精选必读',
        footerTag: '手绘读书笔记',
      };
    } catch (err: any) {
      console.warn('AI API call encountered error, falling back gracefully to local synthesizer:', err);
      return fallbackLocalSynthesis(trimmed, mode);
    }
  }

  // Local fallback synthesizer when no API key provided
  return fallbackLocalSynthesis(trimmed, mode);
}

function fallbackLocalSynthesis(inputText: string, mode: 'book' | 'text'): Partial<CardData> {
  if (mode === 'text') {
    return parseUnstructuredTextToCard(inputText);
  }

  // Book title mode local intelligent fallback generator
  const cleanTitle = inputText.replace(/[《》]/g, '').trim();

  return {
    bookTitle: `《${cleanTitle}》`,
    author: '名家精选',
    category: '思维跃迁',
    quote: `掌握《${cleanTitle}》底层逻辑，实现个人能力爆发式增长。`,
    keyPoints: [
      {
        num: '1',
        title: '核心原理透视',
        desc: `深入剖析《${cleanTitle}》的核心立意，帮助你看清事物本质规律。`,
      },
      {
        num: '2',
        title: '高效破局策略',
        desc: '拒绝低效努力，用结构化思维和科学工具重塑行动路径。',
      },
      {
        num: '3',
        title: '正向反馈闭环',
        desc: '建立可持续的激励机制，让每一次改变都能看见真实成效。',
      },
    ],
    actionTip: `立刻整理关于《${cleanTitle}》的3条核心笔记并分享给朋友。`,
    counterIntuitiveInsight: '反直觉：认知破局的前提是彻底卸下既有经验的包袱。',
    targetAudienceTag: '适合：面临成长瓶颈的终身学习者',
    stampText: '高效赋能',
    footerTag: '手绘读书笔记',
  };
}
