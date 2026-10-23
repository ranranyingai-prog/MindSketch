import type { BookPreset, CardData } from '../types/card';

export const BOOK_PRESETS: BookPreset[] = [
  {
    id: 'personal-ip',
    bookTitle: '如何从0到1高效打造普通人个人IP？',
    author: '个人品牌复盘',
    category: '个人IP / 社交矩阵',
    quote: '超级个体时代，你的个人品牌就是你最宽的商业护城河。',
    keyPoints: [
      { num: '01', title: '定位垂直切口', desc: '不做大而全，找准细分痛点人群，提供不可替代的确定性价值。' },
      { num: '02', title: '高频干货输出', desc: '用手绘图文/卡片等视觉化载体降低阅读门槛，提升社交复转发率。' },
      { num: '03', title: '私域信任闭环', desc: '公域高颜值吸粉，私域沉淀深度服务与高客单复购。' }
    ],
    actionTip: '今天就用手绘卡片将你擅长的一条经验提炼为“3个步骤”并发布社交平台。',
    stampText: '爆款打造',
    counterIntuitiveInsight: '反直觉：完美的专业感不如真实的成长感，有温度的个性比冰冷干货更吸粉。',
    targetAudienceTag: '适合：自媒体创作者 / 知识博主 / 自由职业者',
    creatorName: '智卡IP进化营',
    creatorTitle: '知识IP孵化导师 · 累计赋能10W+'
  },
  {
    id: 'pm-team-sop',
    bookTitle: '新手管理者破局：刚升PM如何快速带团队？',
    author: '团队管理SOP',
    category: '职场管理 / 领导力',
    quote: '管理者的成就来自于团队的成功，而非个人的英雄主义。',
    keyPoints: [
      { num: '01', title: '明确业务边界与OKR', desc: '不要让团队猜目标，将大战略拆解为周度可交付的具体结果。' },
      { num: '02', title: '建立一打一沟通机制', desc: '每周固定20分钟1v1，倾听成员阻碍与情绪，给予及时资源支持。' },
      { num: '03', title: '抓大放小授权信任', desc: '关键节点设检查点，具体过程充分授权，给新人犯错精进的空间。' }
    ],
    actionTip: '梳理团队当前3个堵点，制定清晰的《团队周度任务对齐表》。',
    stampText: '高效赋能',
    counterIntuitiveInsight: '反直觉：管理者越亲力亲为，团队成长越慢；好的管理是让自己“不忙”。',
    targetAudienceTag: '适合：初级团队 Leader / 项目经理 / 创业主管',
    creatorName: '智卡职场精进',
    creatorTitle: '组织效能专家'
  },
  {
    id: 'communication-pitfalls',
    bookTitle: '避坑指南：职场高效沟通的3个反直觉法则',
    author: '沟通提效笔记',
    category: '沟通艺术 / 避坑法则',
    quote: '高效沟通的本质不是证明自己正确，而是达成共识并促成行动。',
    keyPoints: [
      { num: '01', title: '结论先行（SCQA结构）', desc: '汇报先讲结果与建议方案，再补充原因背景，节省决策者时间。' },
      { num: '02', title: '区分事实与情绪语气', desc: '只针对客观数据与事实讨论，不把个人情绪带入工作争议。' },
      { num: '03', title: '闭环确认（复述确认法）', desc: '沟通结束时让对方复述下一步行动计划（Who/When/What）。' }
    ],
    actionTip: '下次向领导汇报时，用“目前结论是……，我有A/B两个方案……”开头。',
    stampText: '避坑神器',
    counterIntuitiveInsight: '反直觉：越是急于说服对方，越容易引起防御；先认同感受，再引导理性。',
    targetAudienceTag: '适合：职场新人 / 跨部门协作人员 / 沟通内耗者',
    creatorName: '智卡高能沟通',
    creatorTitle: '职场人际沟通教练'
  },
  {
    id: 'business-growth',
    bookTitle: '商业增长：如何提高用户复购与LTV生命周期价值？',
    author: '商业模式拆解',
    category: '商业思考 / 运营增长',
    quote: '增长的下半场是存量留存，获得一个新客的成本是留住老客的5倍。',
    keyPoints: [
      { num: '01', title: '打造Aha Moment超预期时刻', desc: '让用户在首次体验的3分钟内感受到核心价值与爽点。' },
      { num: '02', title: '搭建分层会员权益体系', desc: '给20%的高价值头部用户提供专属尊享感与高粘性服务。' },
      { num: '03', title: '自动化流失预警触发', desc: '根据未登录天数或使用频率骤降自动触发关怀优惠与召回。' }
    ],
    actionTip: '绘制产品的《用户价值流失路径图》，寻找流失率最高的卡点并优化。',
    stampText: '商业思维',
    counterIntuitiveInsight: '反直觉：打折促销不能带来真正留存，持续提供不可替代的产品体验才是王道。',
    targetAudienceTag: '适合：产品经理 / 运营负责人 / 商业分析师',
    creatorName: '智卡商业洞察',
    creatorTitle: '商业增长顾问'
  }
];

export function parseUnstructuredTextToCard(inputText: string): Partial<CardData> {
  const cleanText = inputText.trim();
  const lines = cleanText.split('\n').map(l => l.trim()).filter(Boolean);

  return {
    bookTitle: lines[0] || cleanText || '知识精炼图文',
    author: '智卡AI智能提炼',
    category: '思考破局',
    quote: lines[1] || '把复杂的道理变简单，用图文赋能传播与落地。',
    keyPoints: [
      { num: '01', title: '核心干货 01', desc: lines[2] || '第一条核心洞察要点，深入剖析本质逻辑与关键路径。' },
      { num: '02', title: '核心干货 02', desc: lines[3] || '第二条核心洞察要点，提供可复制的操作方法。' },
      { num: '03', title: '核心干货 03', desc: lines[4] || '第三条核心洞察要点，强调落地执行中的注意事项。' }
    ],
    actionTip: '将以上思考转化为当天的具体行动清单并即刻执行。',
    stampText: '深度思考',
    counterIntuitiveInsight: '反直觉洞察：想法不价值连城，能用高颜值卡片传播并落地执行才算闭环。',
    targetAudienceTag: '适合：知识传播者 / 社群推文 / 培训课件',
    footerTag: '智卡·手绘知识图文'
  };
}
