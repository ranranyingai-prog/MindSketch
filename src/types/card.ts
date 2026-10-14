export type CardTheme = 'kraft' | 'chalkboard' | 'cute' | 'grid' | 'minimal';

export type CardFont = 'kuaile' | 'mashan' | 'longcang' | 'patrick';

export type CardRatio = '3:4' | '1:1' | '9:16' | 'auto';

export type MarkerColor = 'yellow' | 'green' | 'pink' | 'cyan';

export interface KeyPoint {
  num?: string;
  title: string;
  desc: string;
}

export interface CardData {
  bookTitle: string;
  author: string;
  category: string;
  quote: string;
  keyPoints: KeyPoint[];
  actionTip: string;
  footerTag: string;
  stampText: string;
}

export interface CardConfig {
  theme: CardTheme;
  font: CardFont;
  ratio: CardRatio;
  markerColor: MarkerColor;
  showTape: boolean;
  showStamp: boolean;
  showDoodleArrows: boolean;
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
}
