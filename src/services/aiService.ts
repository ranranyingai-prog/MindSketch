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
      const systemPrompt = `你是一位顶级的知识卡片架构师与爆款图文主编。
请深度理解用户的输入（可以是书名、问题、方向性思考、行业痛点或一段草稿），提炼出富有见解、逻辑清晰、极具社交传播价值的手绘知识图文卡片。
如果用户输入的是书名，可保留书名或提炼为该书的核心主题；如果输入的是问题或思考方向，请提炼出一个引人入胜的卡片主标题。

必须严格输出纯 JSON 格式，不要添加任何 Markdown 格式化标记如 \`\`\`json：
{
  "bookTitle": "卡片主标题(如:《认知觉醒》或 避坑指南：职场沟通3个反直觉法则)",
  "author": "副标题/出处/提炼者(如: 团队管理SOP / 商业思维复盘 / 个人品牌)",
  "category": "领域标签(4字以内，如: 认知破局/职场SOP/商业思考/避坑指南)",
  "quote": "核心观点或启发性金句(18-35字)",
  "keyPoints": [
    {"num": "01", "title": "要点1精炼标题(10字内)", "desc": "要点深度剖析与建议(25-45字)"},
    {"num": "02", "title": "要点2精炼标题(10字内)", "desc": "要点深度剖析与建议(25-45字)"},
    {"num": "03", "title": "要点3精炼标题(10字内)", "desc": "要点深度剖析与建议(25-45字)"}
  ],
  "actionTip": "落地赋能指南/即刻行动方案(20-40字)",
  "counterIntuitiveInsight": "反直觉洞察/避坑警示(25-40字)",
  "targetAudienceTag": "适合人群标签(如: 适合：自媒体博主 / 初级管理者 / 职场新人)",
  "stampText": "手绘印章词(4字内，如: 爆款打造/高效赋能/深度思考/避坑神器)"
}`;

      const userPrompt = `用户输入的卡片提炼需求如下：\n\n${trimmed}\n\n请深度解析其意图，生成美观、详实、有洞察力的图文卡片内容。`;

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
        bookTitle: parsed.bookTitle || trimmed,
        author: parsed.author || '智卡精炼思考',
        category: parsed.category || '知识赋能',
        quote: parsed.quote || '知行合一，持续进化。',
        keyPoints: Array.isArray(parsed.keyPoints) && parsed.keyPoints.length > 0
          ? parsed.keyPoints.map((item: any, idx: number) => ({
              num: String(item.num || `0${idx + 1}`),
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
        stampText: parsed.stampText || '深度思考',
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
