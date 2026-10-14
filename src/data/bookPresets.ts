import type { BookPreset } from '../types/card';

export const BOOK_PRESETS: BookPreset[] = [
  {
    id: 'cognitive-awakening',
    bookTitle: '《认知觉醒》',
    author: '周岭',
    category: '个人成长 / 思维重塑',
    quote: '人与人之间的根本差异，在于认知能力与深度思考能力。',
    stampText: '必读经典',
    keyPoints: [
      {
        num: '1',
        title: '避开理智脑陷阱',
        desc: '克服本能脑与情绪脑的短视，用清晰的理智开启深度专注。',
      },
      {
        num: '2',
        title: '拉伸区学习法',
        desc: '离开舒适区，但在恐慌区前停下，保持微难精进的节奏。',
      },
      {
        num: '3',
        title: '知行合一闭环',
        desc: '只有能触动行为改变的知识，才是真正的个人有效认知。',
      },
    ],
    actionTip: '每天选择一件稍有难度的事情，集中注意力连续专注25分钟。',
  },
  {
    id: 'naval-manman',
    bookTitle: '《纳瓦尔宝典》',
    author: 'Eric Jorgenson',
    category: '财富自由 / 智慧人生',
    quote: '用头脑赚钱，而不是用时间赚钱。寻求杠杆，建立专属复利。',
    stampText: '干货爆棚',
    keyPoints: [
      {
        num: '1',
        title: '打造专有知识',
        desc: '做自己发自内心热爱且无法被AI或他人轻易复制的事。',
      },
      {
        num: '2',
        title: '利用四大杠杆',
        desc: '劳动力、资本、代码与媒体（零边际成本复制）。',
      },
      {
        num: '3',
        title: '获得长期心智',
        desc: '把健康、心态与幸福放在第一位，学会主动选择平静。',
      },
    ],
    actionTip: '通过社交媒体或文字/代码持续输出你的独特见解，建立个人品牌杠杆。',
  },
  {
    id: 'atomic-habits',
    bookTitle: '《原子习惯》',
    author: 'James Clear',
    category: '高效习惯 / 行为设计',
    quote: '每天进步1%，一年后你将提升37倍。微小的改变带来巨大飞跃。',
    stampText: '高效赋能',
    keyPoints: [
      {
        num: '1',
        title: '两分钟定律',
        desc: '将任何新习惯简化为2分钟内能完成的小动作，降低启动门槛。',
      },
      {
        num: '2',
        title: '改变身份认同',
        desc: '不要聚焦于想要达到的目标，而是聚焦于你想成为怎样的人。',
      },
      {
        num: '3',
        title: '设计环境诱因',
        desc: '让好习惯的提示显而易见，让坏习惯的阻力变得无比巨大。',
      },
    ],
    actionTip: '今晚把明早要读的书直接放在枕头旁，用环境提醒启动习惯。',
  },
  {
    id: 'poor-charlie',
    bookTitle: '《穷查理宝典》',
    author: '查理·芒格',
    category: '多元思维 / 投资哲学',
    quote: '反过来想，总是反过来想。想得到一样东西，最可靠的方法是让自己配得上它。',
    stampText: '智慧精髓',
    keyPoints: [
      {
        num: '1',
        title: '多元思维模型',
        desc: '掌握重要学科（心理学、物理学、生物学）的核心大模型。',
      },
      {
        num: '2',
        title: '逆向思维法',
        desc: '研究如何陷入失败与痛苦，然后坚决避开那些坑。',
      },
      {
        num: '3',
        title: '能力圈原则',
        desc: '清楚知道自己懂什么与不懂什么，在能力圈内做决策。',
      },
    ],
    actionTip: '做重大决定前，列出至少3个可能导致最糟糕结局的逆向因素。',
  },
  {
    id: 'courage-to-be-disliked',
    bookTitle: '《被讨厌的勇气》',
    author: '岸见一郎 / 古贺史健',
    category: '阿德勒心理学 / 心灵成长',
    quote: '决定我们人生的不是过去的经历，而是我们赋予过去的意义。',
    stampText: '心灵治愈',
    keyPoints: [
      {
        num: '1',
        title: '课题分离',
        desc: '分清这是谁的课题。不干涉他人的课题，也不让别人干涉自己。',
      },
      {
        num: '2',
        title: '目的论思维',
        desc: '不要把现状归咎于过去，当下的选择拥有重塑未来的绝对自由。',
      },
      {
        num: '3',
        title: '共同体感觉',
        desc: '从对自己的执着转向对 integrated 他人的关心与贡献。',
      },
    ],
    actionTip: '当感到焦虑时，问问自己：“这是我的课题，还是别人的课题？”',
  },
];

// Helper to intelligently parse unstructured free text or training quotes into CardData
export function parseUnstructuredTextToCard(rawText: string): {
  bookTitle: string;
  author: string;
  quote: string;
  keyPoints: { num: string; title: string; desc: string }[];
  actionTip: string;
} {
  const lines = rawText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return {
      bookTitle: '随笔感悟',
      author: '佚名',
      quote: '输入一段有启发的话，自动转化成手绘极简干货卡片。',
      keyPoints: [
        { num: '1', title: '核心观点', desc: '文字提炼与美化，一键呈现宣传感。' },
      ],
      actionTip: '点击左侧编辑框，随时修改你的内容！',
    };
  }

  let bookTitle = '随笔感悟';
  let author = '';
  let quote = '';
  const keyPoints: { num: string; title: string; desc: string }[] = [];
  let actionTip = '';

  // 1. Try to match book title e.g. 《xxx》
  const bookMatch = rawText.match(/《([^》]+)》/);
  if (bookMatch) {
    bookTitle = `《${bookMatch[1]}》`;
  } else if (lines[0].length < 20) {
    bookTitle = lines[0];
  }

  // 2. Try to match author
  const authorMatch = rawText.match(/(?:作者|文|by)[:：\s]*([^\n,，;；]+)/i);
  if (authorMatch) {
    author = authorMatch[1].trim();
  }

  // 3. Collect core quote & bullet lines
  const pointLines: string[] = [];

  for (const line of lines) {
    if (bookMatch && line.includes(bookMatch[0]) && line.length < 25) continue;

    const isBullet = /^(?:\d+[\.、\s]|-|•| Key|\*)/.test(line);

    if (isBullet) {
      pointLines.push(line.replace(/^(?:\d+[\.、\s]|-|•|\*)\s*/, ''));
    } else if (!quote && line.length >= 10 && line.length <= 100) {
      quote = line;
    } else if (!actionTip && (line.includes('建议') || line.includes('行动') || line.includes('总结') || line.includes('Tips'))) {
      actionTip = line.replace(/^(?:建议|行动|总结|Tips)[:：\s]*/i, '');
    } else if (pointLines.length < 4 && line.length > 5) {
      pointLines.push(line);
    }
  }

  if (!quote) {
    quote = lines[0].slice(0, 80);
  }

  pointLines.forEach((pText, i) => {
    if (i >= 4) return;
    const parts = pText.split(/[:：]/);
    if (parts.length > 1) {
      keyPoints.push({
        num: String(i + 1),
        title: parts[0].trim(),
        desc: parts.slice(1).join('：').trim(),
      });
    } else {
      keyPoints.push({
        num: String(i + 1),
        title: `要点 ${i + 1}`,
        desc: pText,
      });
    }
  });

  if (keyPoints.length === 0) {
    keyPoints.push({
      num: '1',
      title: '精选思考',
      desc: rawText.slice(0, 100) + (rawText.length > 100 ? '...' : ''),
    });
  }

  return {
    bookTitle,
    author,
    quote,
    keyPoints,
    actionTip: actionTip || '保持思考，持续在实操中提炼真知。',
  };
}
