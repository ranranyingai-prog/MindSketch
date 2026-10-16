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
    name: '牛皮复古读书卡',
    desc: '经典复古牛皮纸质感，适合干货书籍与深度阅读笔记。',
    coverBg: 'from-amber-800 to-amber-950',
    badge: '爆款推荐',
    config: {
      theme: 'kraft',
      font: 'kuaile',
      ratio: '3:4',
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
    id: 'cute-notebook',
    name: '萌趣马卡龙便签',
    desc: '活泼粉嫩萌系边框，适合心理学、女性成长与生活金句。',
    coverBg: 'from-rose-400 to-pink-600',
    badge: '高颜值',
    config: {
      theme: 'cute',
      font: 'longcang',
      ratio: '1:1',
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
    id: 'chalkboard-knowledge',
    name: '黑板板书金句',
    desc: '极具仪式感的黑板粉笔手绘感，适合硬核知识与法则大纲。',
    coverBg: 'from-emerald-800 to-slate-900',
    badge: '黑板板书',
    config: {
      theme: 'chalkboard',
      font: 'mashan',
      ratio: '3:4',
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
    id: 'atomic-action',
    name: '柠檬黄极简小红书',
    desc: '明亮醒目的黄色高亮，小红书高赞爆款排版。',
    coverBg: 'from-yellow-400 to-amber-600',
    badge: '小红书风',
    config: {
      theme: 'cute',
      font: 'kuaile',
      ratio: '3:4',
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
    id: 'minimal-grid',
    name: '极简方格手帐',
    desc: '干净干练的网格底纹，适合商业思维与理性管理课件。',
    coverBg: 'from-sky-500 to-indigo-700',
    badge: '职场干货',
    config: {
      theme: 'grid',
      font: 'patrick',
      ratio: '9:16',
      markerColor: 'cyan',
      showTape: false,
      showStamp: false,
      showDoodleArrows: true,
      showCreatorIP: true,
      showQrCode: false,
      borderThickness: 'thin',
      titleFontSize: 22,
      bodyFontSize: 13,
    },
  },
  {
    id: 'munger-wisdom',
    name: '智慧长图连载',
    desc: '适合芒格宝典、长文思维模型与连载推文。',
    coverBg: 'from-amber-600 to-stone-800',
    badge: '思维模型',
    config: {
      theme: 'kraft',
      font: 'kuaile',
      ratio: '3:4',
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
];

// Smart template matching logic based on card category or keywords
export function matchBestTemplate(cardData: CardData): CardTemplate {
  const text = `${cardData.bookTitle} ${cardData.category} ${cardData.author}`.toLowerCase();

  if (text.includes('财富') || text.includes('思维') || text.includes('芒格') || text.includes('原则')) {
    return CARD_TEMPLATES[5] || CARD_TEMPLATES[0];
  }
  if (text.includes('心理') || text.includes('治愈') || text.includes('勇气') || text.includes('情感')) {
    return CARD_TEMPLATES[1];
  }
  if (text.includes('法则') || text.includes('管理') || text.includes('黑板') || text.includes('硬核')) {
    return CARD_TEMPLATES[2];
  }
  if (text.includes('习惯') || text.includes('小红书') || text.includes('成长')) {
    return CARD_TEMPLATES[3];
  }

  return CARD_TEMPLATES[0];
}
