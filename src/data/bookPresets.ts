import type { BookPreset, CardData } from '../types/card';

export const BOOK_PRESETS: BookPreset[] = [
  {
    id: 'renzhijuexing',
    bookTitle: '认知觉醒',
    author: '周岭',
    category: '个人成长',
    quote: '人与人之间的根本差异，在于认知能力与深度思考能力。',
    keyPoints: [
      { num: '1', title: '避开理智脑陷阱', desc: '克服本能脑与情绪脑的短视，用清晰理智开启深度专注。' },
      { num: '2', title: '拉伸区学习法', desc: '离开舒适区，但要在恐慌区前停下，保持微精进节奏。' },
      { num: '3', title: '知行合一闭环', desc: '只有能触动行为改变的知识，才是真正的个人有效认知。' }
    ],
    actionTip: '每天选择一件稍有难度的事情，集中注意力连续专注25分钟。',
    stampText: '必读经典',
    counterIntuitiveInsight: '反直觉：盲目多读书不如彻底吃透一本书，知识不等于认知。',
    targetAudienceTag: '适合：迷茫期职场人 / 学习停滞者',
    creatorName: '智卡知识精选',
    creatorTitle: '知识炼金博主 · 50万+阅读'
  },
  {
    id: 'yuanze',
    bookTitle: '原则',
    author: '瑞·达利欧',
    category: '商业思维',
    quote: '痛苦 + 反思 = 进步。极度开放，极度透明。',
    keyPoints: [
      { num: '1', title: '拥抱现实与苦难', desc: '不要逃避现实问题，把每一次挫败当成进化算法输入。' },
      { num: '2', title: '五步流程法', desc: '目标->问题->诊断->设计->执行，严密循环破局。' },
      { num: '3', title: '头脑极度开放', desc: '战胜自我盲点，主动寻找最聪明的反对意见。' }
    ],
    actionTip: '建立个人决策日志，记录每次重大决定及其后续真实反馈。',
    stampText: '高效赋能',
    counterIntuitiveInsight: '反直觉：决策质量取决于你排除噪音的能力，而非收集更多信息的数量。',
    targetAudienceTag: '适合：团队管理者 / 创业决策者',
    creatorName: '智卡商业洞察',
    creatorTitle: '商业架构顾问'
  },
  {
    id: 'taoyan',
    bookTitle: '被讨厌的勇气',
    author: '岸见一郎',
    category: '心理哲学',
    quote: '决定人生的不是过去的经历，而是我们赋予过去的意义。',
    keyPoints: [
      { num: '1', title: '课题分离', desc: '区分什么是自己的课题，什么是他人的课题，斩断内耗。' },
      { num: '2', title: '目的论代替原因论', desc: '不再寻找受害者借口，当下这一刻即可选择改变。' },
      { num: '3', title: '共同体感觉', desc: '从执着于“我”转变为贡献于“我们”，获得终极幸福。' }
    ],
    actionTip: '拒绝一次违背自身原则的讨好行为，体验课题分离的轻松。',
    stampText: '治愈心灵',
    counterIntuitiveInsight: '反直觉：渴望所有人认可恰恰是极其不自由的表现，幸福需要被讨厌的勇气。',
    targetAudienceTag: '适合：社交焦虑者 / 情绪内耗人群',
    creatorName: '智卡心理学堂',
    creatorTitle: '心理咨询与成长教练'
  }
];

export function parseUnstructuredTextToCard(inputText: string): Partial<CardData> {
  const lines = inputText.split('\n').map(l => l.trim()).filter(Boolean);

  return {
    bookTitle: lines[0] || '知识精炼笔记',
    author: '精选思考',
    category: '知识提炼',
    quote: lines[1] || lines[0] || '知行合一，持续进化。',
    keyPoints: [
      { num: '1', title: '关键要点 01', desc: lines[2] || '第一条核心干货洞察解析...' },
      { num: '2', title: '关键要点 02', desc: lines[3] || '第二条核心干货洞察解析...' },
      { num: '3', title: '关键要点 03', desc: lines[4] || '第三条核心干货洞察解析...' }
    ],
    actionTip: '将以上洞察整理为行动计划并立即执行。',
    stampText: '深度思考',
    footerTag: '智卡·手绘读书笔记'
  };
}
