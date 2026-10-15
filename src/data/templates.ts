import type { CardConfig, CardData } from '../types/card';

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  category: 'bestseller' | 'quote' | 'training' | 'community' | 'minimal';
  badge: string;
  config: CardConfig;
  matchScore: (data: CardData) => number;
}

export const CARD_TEMPLATES: CardTemplate[] = [
  {
    id: 'kraft-classic',
    name: '牛皮典藏干货风',
    description: '经典的复古牛皮纸感，最适合读书笔记、深度思考与爆款书单',
    category: 'bestseller',
    badge: '推荐首选',
    config: {
      theme: 'kraft',
      font: 'kuaile',
      ratio: '3:4',
      markerColor: 'yellow',
      showTape: true,
      showStamp: true,
      showDoodleArrows: true,
      borderThickness: 'medium',
      titleFontSize: 22,
      bodyFontSize: 14,
    },
    matchScore: (data: CardData) => {
      // High score if key points exist and has author/book title
      let score = 50;
      if (data.keyPoints && data.keyPoints.length >= 3) score += 30;
      if (data.author) score += 20;
      return score;
    },
  },
  {
    id: 'golden-quote',
    name: '震撼高亮金句风',
    description: '鲜艳粉色高亮划线与大字号金句，适合社交媒体金句传播与金句卡',
    category: 'quote',
    badge: '金句利器',
    config: {
      theme: 'cute',
      font: 'longcang',
      ratio: '1:1',
      markerColor: 'pink',
      showTape: true,
      showStamp: true,
      showDoodleArrows: true,
      borderThickness: 'thick',
      titleFontSize: 24,
      bodyFontSize: 15,
    },
    matchScore: (data: CardData) => {
      let score = 40;
      if (data.quote && data.quote.length > 20) score += 40;
      if (!data.keyPoints || data.keyPoints.length <= 2) score += 20;
      return score;
    },
  },
  {
    id: 'hardcore-chalk',
    name: '硬核黑板讲堂风',
    description: '浓厚的课堂板书感，沉浸感十足，适合培训授课、干货大纲与职场进阶',
    category: 'training',
    badge: '培训赋能',
    config: {
      theme: 'chalkboard',
      font: 'mashan',
      ratio: '3:4',
      markerColor: 'green',
      showTape: false,
      showStamp: true,
      showDoodleArrows: true,
      borderThickness: 'thick',
      titleFontSize: 24,
      bodyFontSize: 14,
    },
    matchScore: (data: CardData) => {
      let score = 30;
      if (data.category && (data.category.includes('培训') || data.category.includes('职场') || data.category.includes('管理'))) score += 40;
      if (data.actionTip) score += 20;
      return score;
    },
  },
  {
    id: 'cute-community',
    name: '可爱社群便签风',
    description: '轻松俏皮的卡通便签，小红书与微信朋友圈社群互动分享利器',
    category: 'community',
    badge: '社群热捧',
    config: {
      theme: 'cute',
      font: 'kuaile',
      ratio: '3:4',
      markerColor: 'yellow',
      showTape: true,
      showStamp: true,
      showDoodleArrows: true,
      borderThickness: 'medium',
      titleFontSize: 22,
      bodyFontSize: 14,
    },
    matchScore: (data: CardData) => {
      let score = 35;
      if (data.category && (data.category.includes('成长') || data.category.includes('生活') || data.category.includes('心理'))) score += 35;
      return score;
    },
  },
  {
    id: 'minimal-grid',
    name: '极简极客方格风',
    description: '高雅整洁的网格方格纸，逻辑清晰，适合商业思考、产品思维与大纲整理',
    category: 'minimal',
    badge: '极简理智',
    config: {
      theme: 'grid',
      font: 'patrick',
      ratio: '9:16',
      markerColor: 'cyan',
      showTape: false,
      showStamp: false,
      showDoodleArrows: true,
      borderThickness: 'thin',
      titleFontSize: 20,
      bodyFontSize: 13,
    },
    matchScore: (data: CardData) => {
      let score = 30;
      if (data.keyPoints && data.keyPoints.length >= 4) score += 40;
      return score;
    },
  },
  {
    id: 'action-guide',
    name: '落地行动指南风',
    description: '高亮显示“落地赋能指南”，适合培训实操、习惯养成与每日行动清单',
    category: 'training',
    badge: '强执行力',
    config: {
      theme: 'kraft',
      font: 'kuaile',
      ratio: '3:4',
      markerColor: 'green',
      showTape: true,
      showStamp: true,
      showDoodleArrows: true,
      borderThickness: 'thick',
      titleFontSize: 22,
      bodyFontSize: 14,
    },
    matchScore: (data: CardData) => {
      let score = 30;
      if (data.actionTip && data.actionTip.length > 15) score += 50;
      return score;
    },
  },
];

/**
 * Automatically calculates the best template match for given card content
 */
export function matchBestTemplate(data: CardData): CardTemplate {
  let bestTemplate = CARD_TEMPLATES[0];
  let maxScore = -1;

  for (const template of CARD_TEMPLATES) {
    const score = template.matchScore(data);
    if (score > maxScore) {
      maxScore = score;
      bestTemplate = template;
    }
  }

  return bestTemplate;
}
