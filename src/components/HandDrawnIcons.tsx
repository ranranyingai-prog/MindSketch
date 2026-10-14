import React from 'react';

// Hand-drawn Paper Tape SVG Component
export const TapeSticker: React.FC<{ color?: string; className?: string }> = ({
  color = '#e2d3b7',
  className = '',
}) => (
  <svg
    viewBox="0 0 120 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-28 h-8 opacity-85 filter drop-shadow-sm ${className}`}
  >
    <path
      d="M3 8 C 15 4, 35 10, 60 6 C 85 2, 105 8, 117 5 L 115 27 C 98 29, 78 24, 55 28 C 32 32, 15 25, 4 28 Z"
      fill={color}
      stroke="rgba(0,0,0,0.15)"
      strokeWidth="1"
    />
    {/* Tape stripes texture */}
    <path d="M15 8 L10 24 M35 7 L30 25 M60 8 L55 26 M85 7 L80 25 M105 8 L100 25" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="2 2" />
  </svg>
);

// Hand-drawn Stamp / Badge SVG Component
export const HandDrawnStamp: React.FC<{ text: string; color?: string; className?: string }> = ({
  text,
  color = '#ef4444',
  className = '',
}) => (
  <div
    className={`relative inline-flex items-center justify-center p-2 rounded-full border-2 border-dashed transform -rotate-12 select-none ${className}`}
    style={{ borderColor: color, color }}
  >
    <div className="absolute inset-0 rounded-full border border-solid opacity-40" style={{ borderColor: color }} />
    <span className="font-kuaile text-xs font-bold px-1 tracking-widest text-center uppercase whitespace-nowrap">
      {text || '精选必读'}
    </span>
  </div>
);

// Hand-drawn Arrow SVG Component
export const HandDrawnArrow: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = 'currentColor',
}) => (
  <svg
    viewBox="0 0 60 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-12 h-6 ${className}`}
  >
    <path
      d="M5 15 C 20 8, 35 22, 52 14"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M42 8 L 53 14 L 44 22"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

// Hand-drawn Sparkle / Star SVG Component
export const HandDrawnSparkle: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#f59e0b',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 ${className}`}
  >
    <path
      d="M12 2 C12 7 7 12 2 12 C7 12 12 17 12 22 C12 17 17 12 22 12 C17 12 12 7 12 2 Z"
      fill={color}
      stroke={color}
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

// Hand-drawn Lightbulb SVG Icon for Tips
export const HandDrawnBulb: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-7 h-7 ${className}`}
  >
    <path
      d="M16 4 C10 4 6 8.5 6 14 C6 18 9 20.5 10.5 22.5 L12 25 H20 L21.5 22.5 C23 20.5 26 18 26 14 C26 8.5 22 4 16 4 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#fef08a"
    />
    <path d="M12 28 H20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M13.5 14 C13.5 12 15 10.5 17 10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Hand-drawn Book Cover Tag Component
export const BookBadge: React.FC<{ title: string; author: string }> = ({ title, author }) => (
  <div className="flex items-center gap-2 bg-amber-100/90 text-slate-800 px-3 py-1.5 rounded-lg border-2 border-slate-800 sketch-shadow-sm font-kuaile">
    <span className="text-base">📖</span>
    <div>
      <div className="text-sm font-bold leading-tight">{title}</div>
      {author && <div className="text-xs text-slate-600 leading-tight">作者：{author}</div>}
    </div>
  </div>
);
