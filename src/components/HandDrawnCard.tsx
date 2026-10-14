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
      cardBg: 'bg-[#faf3e0]/90',
      border: 'border-amber-900',
      shadow: 'sketch-shadow',
      accentBg: 'bg-amber-200/80',
      badgeBg: 'bg-amber-800 text-amber-50',
      subtext: 'text-amber-800',
      divider: 'border-amber-900/30',
    },
    chalkboard: {
      bg: 'bg-paper-chalkboard text-emerald-100',
      cardBg: 'bg-slate-800/80',
      border: 'border-emerald-200/60',
      shadow: 'sketch-shadow-chalk',
      accentBg: 'bg-emerald-950/60',
      badgeBg: 'bg-emerald-600 text-emerald-950',
      subtext: 'text-emerald-300',
      divider: 'border-emerald-200/20',
    },
    cute: {
      bg: 'bg-paper-cute text-slate-800',
      cardBg: 'bg-white/90',
      border: 'border-slate-800',
      shadow: 'sketch-shadow',
      accentBg: 'bg-amber-100',
      badgeBg: 'bg-rose-400 text-white',
      subtext: 'text-slate-600',
      divider: 'border-slate-800/20',
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
    '3:4': 'w-full max-w-[420px] aspect-[3/4]',
    '1:1': 'w-full max-w-[420px] aspect-square',
    '9:16': 'w-full max-w-[380px] aspect-[9/16]',
    'auto': 'w-full max-w-[440px] h-auto',
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
      className={`relative p-5 sm:p-6 overflow-hidden flex flex-col justify-between transition-all duration-300 ${themeStyles.bg} ${ratioClasses} ${fontClass}`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Tape Sticker Accent */}
      {config.showTape && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
          <TapeSticker />
        </div>
      )}

      {/* Hand-drawn Outer Border Container */}
      <div
        className={`relative z-10 flex-1 flex flex-col justify-between p-5 rounded-2xl ${themeStyles.cardBg} ${themeStyles.border} ${borderThicknessClass} ${themeStyles.shadow} sketch-border`}
      >
        {/* Card Header Section */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex flex-col gap-1">
              {data.category && (
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
              <div className="shrink-0 pt-1">
                <HandDrawnStamp text={data.stampText || '精选必读'} />
              </div>
            )}
          </div>

          {/* Author info & Divider */}
          {data.author && (
            <div className={`text-xs font-medium ${themeStyles.subtext} mb-3 flex items-center gap-1.5`}>
              <span>✍️ 作者: {data.author}</span>
            </div>
          )}

          <div className={`border-b-2 border-dashed ${themeStyles.divider} my-3`} />

          {/* Golden Quote Section */}
          {data.quote && (
            <div className={`p-3.5 rounded-xl ${themeStyles.accentBg} relative my-3 border border-dashed ${themeStyles.border} sketch-border`}>
              <div className="absolute -top-2.5 left-3 px-1.5 bg-amber-400 text-slate-900 font-bold text-[11px] rounded sketch-border">
                💡 核心金句
              </div>
              <p
                className="font-bold leading-relaxed pt-1"
                style={{ fontSize: `${config.bodyFontSize}px` }}
              >
                “<span className={markerClass}>{data.quote}</span>”
              </p>
            </div>
          )}

          {/* Key Points / Takeaways Section */}
          {data.keyPoints && data.keyPoints.length > 0 && (
            <div className="space-y-3 my-4">
              <div className="flex items-center gap-2">
                <HandDrawnSparkle />
                <h3 className="font-bold text-sm tracking-wide font-kuaile uppercase">
                  核心干货要点
                </h3>
                {config.showDoodleArrows && <HandDrawnArrow className="ml-auto opacity-70" />}
              </div>

              <div className="space-y-2.5">
                {data.keyPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 bg-black/5 dark:bg-white/5 p-2.5 rounded-lg border border-slate-700/10"
                  >
                    <span className="shrink-0 w-6 h-6 rounded-full bg-amber-400 text-slate-900 font-bold font-kuaile text-xs flex items-center justify-center sketch-border">
                      {point.num || idx + 1}
                    </span>
                    <div className="flex-1">
                      {point.title && (
                        <div className="font-bold text-sm leading-tight mb-0.5">
                          {point.title}
                        </div>
                      )}
                      <div
                        className="leading-relaxed opacity-95"
                        style={{ fontSize: `${config.bodyFontSize - 1}px` }}
                      >
                        {point.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actionable Tip Section */}
          {data.actionTip && (
            <div className="mt-4 p-3 bg-amber-300/30 border-2 border-slate-800 rounded-xl flex items-start gap-2.5 sketch-border">
              <HandDrawnBulb className="shrink-0 text-amber-600 mt-0.5" />
              <div>
                <div className="font-bold text-xs text-amber-900 font-kuaile">落地赋能指南</div>
                <div
                  className="leading-relaxed font-medium"
                  style={{ fontSize: `${config.bodyFontSize - 2}px` }}
                >
                  {data.actionTip}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Brand / Author Tag */}
        <div className={`mt-5 pt-3 border-t border-dashed ${themeStyles.divider} flex items-center justify-between text-xs`}>
          <div className="flex items-center gap-1.5 font-kuaile opacity-80">
            <span>🎨</span>
            <span>{data.footerTag || '手绘知识卡片'}</span>
          </div>

          <div className="text-[10px] opacity-60 font-mono tracking-widest uppercase">
            Hand-Drawn Card
          </div>
        </div>
      </div>
    </div>
  );
};
