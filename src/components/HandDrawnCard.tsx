import React from 'react';
import type { CardData, CardConfig } from '../types/card';
import {
  TapeSticker,
  HandDrawnStamp,
  HandDrawnArrow,
  HandDrawnSparkle,
  HandDrawnBulb,
} from './HandDrawnIcons';

interface HandDrawnCardProps {
  cardRef?: React.RefObject<HTMLDivElement | null>;
  data: CardData;
  config: CardConfig;
}

export const HandDrawnCard: React.FC<HandDrawnCardProps> = ({ cardRef, data, config }) => {
  // Theme Background and Text Colors
  const themeStyles = {
    kraft: {
      bg: 'bg-paper-kraft text-amber-950',
      cardBg: 'bg-[#faf3e0]/95',
      border: 'border-amber-900',
      shadow: 'sketch-shadow',
      accentBg: 'bg-amber-200/80',
      badgeBg: 'bg-amber-800 text-amber-50',
      subtext: 'text-amber-800',
      divider: 'border-amber-900/30',
      pointNumBg: 'bg-amber-500 text-slate-950',
      pointCardBg: 'bg-amber-100/60 border-amber-900/20',
    },
    chalkboard: {
      bg: 'bg-paper-chalkboard text-emerald-100',
      cardBg: 'bg-slate-800/90',
      border: 'border-emerald-200/60',
      shadow: 'sketch-shadow-chalk',
      accentBg: 'bg-emerald-950/60',
      badgeBg: 'bg-emerald-500 text-emerald-950',
      subtext: 'text-emerald-300',
      divider: 'border-emerald-200/20',
      pointNumBg: 'bg-emerald-400 text-slate-950',
      pointCardBg: 'bg-slate-900/60 border-emerald-500/20',
    },
    cute: {
      bg: 'bg-paper-cute text-slate-800',
      cardBg: 'bg-white/95',
      border: 'border-slate-800',
      shadow: 'sketch-shadow',
      accentBg: 'bg-amber-100',
      badgeBg: 'bg-rose-400 text-white',
      subtext: 'text-slate-600',
      divider: 'border-slate-800/20',
      pointNumBg: 'bg-rose-400 text-white',
      pointCardBg: 'bg-rose-50/50 border-rose-200',
    },
    grid: {
      bg: 'bg-paper-grid text-slate-900',
      cardBg: 'bg-white/95',
      border: 'border-slate-900',
      shadow: 'sketch-shadow',
      accentBg: 'bg-sky-100',
      badgeBg: 'bg-indigo-600 text-white',
      subtext: 'text-slate-600',
      divider: 'border-slate-300',
      pointNumBg: 'bg-indigo-600 text-white',
      pointCardBg: 'bg-indigo-50/50 border-indigo-200',
    },
    minimal: {
      bg: 'bg-stone-100 text-stone-900',
      cardBg: 'bg-white',
      border: 'border-stone-800',
      shadow: 'sketch-shadow',
      accentBg: 'bg-stone-200',
      badgeBg: 'bg-stone-800 text-stone-100',
      subtext: 'text-stone-600',
      divider: 'border-stone-300',
      pointNumBg: 'bg-stone-800 text-stone-100',
      pointCardBg: 'bg-stone-50 border-stone-200',
    },
  }[config.theme];

  // Font family mapping
  const fontClass = {
    kuaile: 'font-kuaile',
    mashan: 'font-mashan',
    longcang: 'font-longcang',
    patrick: 'font-patrick',
  }[config.font];

  // Aspect Ratio Styles
  const ratioClasses = {
    '3:4': 'w-full max-w-[480px] min-h-[640px] h-auto',
    '1:1': 'w-full max-w-[480px] min-h-[480px] h-auto',
    '9:16': 'w-full max-w-[440px] min-h-[780px] h-auto',
    'auto': 'w-full max-w-[480px] h-auto',
  }[config.ratio];

  // Marker Color mapping
  const markerClass = {
    yellow: 'marker-yellow',
    green: 'marker-green',
    pink: 'marker-pink',
    cyan: 'marker-cyan',
  }[config.markerColor];

  // Border thickness
  const borderThicknessClass = {
    thin: 'border-2',
    medium: 'border-[3px]',
    thick: 'border-[4px]',
  }[config.borderThickness];

  return (
    <div
      ref={cardRef}
      className={`relative p-3.5 sm:p-5 flex flex-col justify-between transition-all duration-300 shrink-0 ${themeStyles.bg} ${ratioClasses} ${fontClass}`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Tape Sticker Accent */}
      {config.showTape && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <TapeSticker />
        </div>
      )}

      {/* Hand-drawn Outer Border Container */}
      <div
        className={`relative z-10 flex-1 flex flex-col justify-between p-4 sm:p-5 rounded-2xl ${themeStyles.cardBg} ${themeStyles.border} ${borderThicknessClass} ${themeStyles.shadow} sketch-border`}
      >
        <div>
          {/* IP Creator Profile Header (Zhika style) */}
          {config.showCreatorIP && (data.creatorName || data.avatarUrl) && (
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-dashed border-slate-700/20">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-amber-500/80 shadow-sm shrink-0 bg-amber-100 flex items-center justify-center font-bold text-amber-900 text-xs">
                  {data.avatarUrl ? (
                    <img src={data.avatarUrl} alt={data.creatorName} className="w-full h-full object-cover" />
                  ) : (
                    <span>{(data.creatorName || '智')[0]}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 font-bold text-xs tracking-tight">
                    <span>{data.creatorName || '智卡创作者'}</span>
                    {data.showBlueV !== false && (
                      <span className="w-3.5 h-3.5 rounded-full bg-sky-500 text-white text-[9px] font-black flex items-center justify-center shrink-0">
                        V
                      </span>
                    )}
                  </div>
                  {data.creatorTitle && (
                    <span className="text-[10px] opacity-70 leading-none mt-0.5">{data.creatorTitle}</span>
                  )}
                </div>
              </div>

              {/* Top Pill Category Tag */}
              {data.category && (
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${themeStyles.badgeBg} font-kuaile whitespace-nowrap`}>
                  {data.category}
                </span>
              )}
            </div>
          )}

          {/* Main Title & Stamp Row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex flex-col gap-1 flex-1">
              {!config.showCreatorIP && data.category && (
                <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full w-max ${themeStyles.badgeBg} font-kuaile`}>
                  {data.category}
                </span>
              )}
              <h1
                className="font-black tracking-tight leading-snug mt-1"
                style={{ fontSize: `${config.titleFontSize}px` }}
              >
                {data.bookTitle || '未命名主题'}
              </h1>
            </div>

            {/* Stamp Badge */}
            {config.showStamp && (
              <div className="shrink-0 pt-0.5">
                <HandDrawnStamp text={data.stampText || '必读经典'} />
              </div>
            )}
          </div>

          {/* Author info */}
          {data.author && (
            <div className={`text-xs font-medium ${themeStyles.subtext} mb-3 flex items-center gap-1.5`}>
              <span>✍️ 作者: {data.author}</span>
            </div>
          )}

          <div className={`border-b-2 border-dashed ${themeStyles.divider} my-2.5`} />

          {/* Golden Quote Section with Zhika Golden Box */}
          {data.quote && (
            <div className={`p-3.5 rounded-xl ${themeStyles.accentBg} relative my-3 border border-dashed ${themeStyles.border} sketch-border`}>
              <div className="absolute -top-2.5 left-3 px-2 bg-amber-400 text-slate-950 font-bold text-[11px] rounded sketch-border flex items-center gap-1">
                <span className="text-xs">💡</span>
                <span>核心金句</span>
              </div>
              <p
                className="font-bold leading-relaxed pt-1"
                style={{ fontSize: `${config.bodyFontSize}px` }}
              >
                “<span className={markerClass}>{data.quote}</span>”
              </p>
            </div>
          )}

          {/* Key Points / Bullet Takeaways Section */}
          {data.keyPoints && data.keyPoints.length > 0 && (
            <div className="space-y-2.5 my-3">
              <div className="flex items-center gap-2">
                <HandDrawnSparkle />
                <h3 className="font-bold text-sm tracking-wide font-kuaile uppercase">
                  核心干货要点
                </h3>
                {config.showDoodleArrows && <HandDrawnArrow className="ml-auto opacity-70" />}
              </div>

              <div className="space-y-2">
                {data.keyPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border ${themeStyles.pointCardBg} shadow-sm`}
                  >
                    <span className={`shrink-0 w-6 h-6 rounded-lg ${themeStyles.pointNumBg} font-black font-kuaile text-xs flex items-center justify-center sketch-border mt-0.5 shadow-sm`}>
                      {point.num || (idx + 1 < 10 ? `0${idx + 1}` : idx + 1)}
                    </span>
                    <div
                      className="flex-1 leading-relaxed text-left"
                      style={{ fontSize: `${Math.max(12, config.bodyFontSize - 1)}px` }}
                    >
                      {point.title && (
                        <span className="font-extrabold mr-1.5 font-kuaile tracking-wide text-amber-950 dark:text-amber-200 inline-block">
                          {point.title.replace(/[:：\s]+$/, '')}：
                        </span>
                      )}
                      <span className="opacity-95 font-medium break-words leading-relaxed">{point.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actionable Tip Section */}
          {data.actionTip && (
            <div className="mt-3 p-2.5 bg-amber-300/35 border-2 border-slate-800/80 rounded-xl flex items-start gap-2 sketch-border">
              <HandDrawnBulb className="shrink-0 text-amber-600 mt-0.5" />
              <div>
                <div className="font-bold text-xs text-amber-950 font-kuaile">落地赋能指南</div>
                <div
                  className="leading-relaxed font-medium"
                  style={{ fontSize: `${Math.max(11, config.bodyFontSize - 2)}px` }}
                >
                  {data.actionTip}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Brand & QR Code Section */}
        <div className={`mt-4 pt-2.5 border-t border-dashed ${themeStyles.divider} flex items-center justify-between text-xs`}>
          <div className="flex items-center gap-2">
            {config.showQrCode && data.qrCodeUrl && (
              <div className="w-9 h-9 p-0.5 bg-white border border-slate-800/40 rounded-lg shadow-sm shrink-0">
                <img src={data.qrCodeUrl} alt="QR Code" className="w-full h-full object-contain" />
              </div>
            )}
            <div className="flex flex-col">
              <div className="flex items-center gap-1 font-kuaile opacity-90 font-bold text-xs">
                <span>🎨</span>
                <span>{data.footerTag || '手绘知识卡片'}</span>
              </div>
              {data.qrCodeLabel && config.showQrCode && (
                <span className="text-[9px] opacity-60 scale-95 origin-left">{data.qrCodeLabel}</span>
              )}
            </div>
          </div>

          <div className="text-[10px] opacity-50 font-mono tracking-widest uppercase">
            HAND-DRAWN CARD
          </div>
        </div>
      </div>
    </div>
  );
};
