import type { CardConfig, CardData } from '../types/card';

export interface CardTemplate {
  id: string;
  name: string;
  desc: string;
  coverBg: string;
  badge: string;
  config: Partial<CardConfig>;
}

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: 'kraft-classic',
    name: '复古牛皮卡片 (列表型)',
    desc: '经典复古纸张质感，适合深度思考、方法论提炼与复盘干货。',
    coverBg: 'from-amber-800 to-amber-950',
    badge: '爆款经典',
    config: {
      theme: 'kraft',
      font: 'kuaile',
      ratio: '3:4',
      layoutMode: 'list',
      markerColor: 'yellow',
      showTape: true,
      showStamp: true,
      showDoodleArrows: true,
      showCreatorIP: true,
      showQrCode: false,
      borderThickness: 'medium',
      titleFontSize: 22,
      bodyFontSize: 14,
    },
  },
  {
    id: 'mindmap-tree',
    name: '思维导图分支 (树状型)',
    desc: '清晰的树状分支拉线排版，适合知识体系、逻辑演化与结构化思考。',
    coverBg: 'from-amber-500 to-amber-700',
    badge: '结构导图',
    config: {
      theme: 'kraft',
      font: 'kuaile',
      ratio: '3:4',
      layoutMode: 'mindmap',
      markerColor: 'green',
      showTape: true,
      showStamp: true,
      showDoodleArrows: true,
      showCreatorIP: true,
      showQrCode: false,
      borderThickness: 'thick',
      titleFontSize: 22,
      bodyFontSize: 14,
    },
  },
  {
    id: 'grid-matrix',
    name: '2x2 矩阵对比 (四象限)',
    desc: '卡片网格并排展示，适合四象限对比、SWOT分析与多维度拆解。',
    coverBg: 'from-sky-500 to-indigo-700',
    badge: '矩阵对比',
    config: {
      theme: 'grid',
      font: 'patrick',
      ratio: '3:4',
      layoutMode: 'grid2x2',
      markerColor: 'cyan',
      showTape: false,
      showStamp: true,
      showDoodleArrows: true,
      showCreatorIP: true,
      showQrCode: false,
      borderThickness: 'medium',
      titleFontSize: 22,
      bodyFontSize: 13,
    },
  },
  {
    id: 'steps-sop',
    name: 'SOP 流程节点 (步骤链)',
    desc: '带有步骤箭头的连贯链路，适合操作指南、SOP规程与破局路径。',
    coverBg: 'from-emerald-700 to-teal-900',
    badge: '步骤流程',
    config: {
      theme: 'chalkboard',
      font: 'mashan',
      ratio: '3:4',
      layoutMode: 'steps',
      markerColor: 'green',
      showTape: false,
      showStamp: true,
      showDoodleArrows: true,
      showCreatorIP: true,
      showQrCode: false,
      borderThickness: 'thick',
      titleFontSize: 24,
      bodyFontSize: 14,
    },
  },
  {
    id: 'cute-notebook',
    name: '萌趣马卡龙 (金句卡)',
    desc: '活泼粉嫩边框，适合心理学、社交金句与个人感悟。',
    coverBg: 'from-rose-400 to-pink-600',
    badge: '高颜值',
    config: {
      theme: 'cute',
      font: 'longcang',
      ratio: '1:1',
      layoutMode: 'list',
      markerColor: 'pink',
      showTape: true,
      showStamp: true,
      showDoodleArrows: true,
      showCreatorIP: true,
      showQrCode: false,
      borderThickness: 'thick',
      titleFontSize: 24,
      bodyFontSize: 15,
    },
  },
  {
    id: 'atomic-action',
    name: '柠檬黄爆款 (小红书风)',
    desc: '高明度荧光黄色强调，社交媒体传播转化力极强。',
    coverBg: 'from-yellow-400 to-amber-600',
    badge: '小红书风',
    config: {
      theme: 'cute',
      font: 'kuaile',
      ratio: '3:4',
      layoutMode: 'list',
      markerColor: 'yellow',
      showTape: true,
      showStamp: true,
      showDoodleArrows: true,
      showCreatorIP: true,
      showQrCode: false,
      borderThickness: 'medium',
      titleFontSize: 22,
      bodyFontSize: 14,
    },
  },
];

// Smart template matching logic based on topic content or keywords
export function matchBestTemplate(cardData: CardData): CardTemplate {
  const text = `${cardData.bookTitle} ${cardData.category} ${cardData.quote}`.toLowerCase();

  if (text.includes('导图') || text.includes('体系') || text.includes('树') || text.includes('结构')) {
    return CARD_TEMPLATES[1]; // Mindmap
  }
  if (text.includes('矩阵') || text.includes('对比') || text.includes('维') || text.includes('商业')) {
    return CARD_TEMPLATES[2]; // Grid Matrix
  }
  if (text.includes('步骤') || text.includes('sop') || text.includes('流程') || text.includes('路径') || text.includes('指南')) {
    return CARD_TEMPLATES[3]; // SOP Steps
  }
  if (text.includes('心理') || text.includes('感悟') || text.includes('情感') || text.includes('勇气')) {
    return CARD_TEMPLATES[4]; // Cute Notebook
  }
  if (text.includes('小红书') || text.includes('打造') || text.includes('ip') || text.includes('爆款')) {
    return CARD_TEMPLATES[5]; // Atomic Action Yellow
  }

  return CARD_TEMPLATES[0];
}
