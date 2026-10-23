export type CardTheme = 'kraft' | 'chalkboard' | 'cute' | 'grid' | 'minimal';

export type CardFont = 'kuaile' | 'mashan' | 'longcang' | 'patrick';

export type CardRatio = '3:4' | '1:1' | '9:16' | 'auto';

export type MarkerColor = 'yellow' | 'green' | 'pink' | 'cyan';

export type LayoutMode = 'list' | 'grid2x2' | 'steps' | 'mindmap';

export interface KeyPoint {
  num?: string;
  title: string;
  desc: string;
}

export interface CardData {
  bookTitle: string;                // 主标题（主题/问题/书名）
  author: string;                   // 副标题/提炼者/作者
  category: string;                 // 分类标签 (e.g., 认知破局, 职场SOP)
  quote: string;                    // 核心金句 / 核心论点
  keyPoints: KeyPoint[];            // 干货要点列表
  actionTip: string;                // 落地赋能 / 行动指南
  footerTag: string;                // 底部标语
  stampText: string;                // 印章文案
  // Extended richness fields
  counterIntuitiveInsight?: string; // 反直觉洞察 / 避坑指南
  targetAudienceTag?: string;       // 适合人群 / 场景标签
  // Creator IP Branding fields
  creatorName?: string;
  creatorTitle?: string;
  avatarUrl?: string;
  showBlueV?: boolean;
  qrCodeUrl?: string;
  qrCodeLabel?: string;
}

export interface CardConfig {
  theme: CardTheme;
  font: CardFont;
  ratio: CardRatio;
  layoutMode: LayoutMode; // Multi-layout mode
  markerColor: MarkerColor;
  showTape: boolean;
  showStamp: boolean;
  showDoodleArrows: boolean;
  showCreatorIP: boolean;
  showQrCode: boolean;
  borderThickness: 'thin' | 'medium' | 'thick';
  titleFontSize: number; // 18 to 32
  bodyFontSize: number;  // 14 to 20
}

export interface BookPreset {
  id: string;
  bookTitle: string;
  author: string;
  category: string;
  quote: string;
  keyPoints: KeyPoint[];
  actionTip: string;
  stampText: string;
  counterIntuitiveInsight?: string;
  targetAudienceTag?: string;
  creatorName?: string;
  creatorTitle?: string;
}
