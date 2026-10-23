import React from 'react';
import type { CardData, CardConfig } from '../types/card';
import { ZHIKA_CARD_STYLES } from '../data/styles';

interface HandDrawnCardProps {
  cardData: CardData;
  config: CardConfig;
  activeStyleId?: string;
  aiGeneratedImageUrl?: string;
}

export const HandDrawnCard: React.FC<HandDrawnCardProps> = ({
  cardData,
  config,
  activeStyleId = '淡彩手绘风',
  aiGeneratedImageUrl
}) => {
  const currentStyle = ZHIKA_CARD_STYLES.find(s => s.id === activeStyleId) || ZHIKA_CARD_STYLES[0];
  const domTheme = currentStyle.domTheme;

  // Aspect ratio class mapping - use min-height with auto layout to prevent content truncation
  const ratioClasses: Record<string, string> = {
    '3:4': 'min-h-[620px] h-auto',
    '1:1': 'min-h-[480px] h-auto',
    '9:16': 'min-h-[720px] h-auto',
    'auto': 'min-h-[500px] h-auto'
  };

  // Font class mapping
  const fontClasses: Record<string, string> = {
    kuaile: 'font-kuaile',
    mashan: 'font-mashan',
    longcang: 'font-longcang',
    patrick: 'font-patrick'
  };

  // Highlighter color mapping
  const markerBgMap: Record<string, string> = {
    yellow: 'bg-amber-200/80 text-amber-950',
    green: 'bg-emerald-200/80 text-emerald-950',
    pink: 'bg-pink-200/80 text-pink-950',
    cyan: 'bg-cyan-200/80 text-cyan-950'
  };

  // If AI generated image URL is present, display full image mode
  if (aiGeneratedImageUrl) {
    return (
      <div
        id="hand-drawn-card-target"
        className={`relative w-full max-w-[480px] mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all ${ratioClasses[config.ratio]}`}
      >
        <img
          src={aiGeneratedImageUrl}
          alt={cardData.bookTitle || 'AI Infographic Card'}
          className="w-full h-full object-cover rounded-3xl"
        />
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full font-sans tracking-wide">
          ✨ AI 高清生成卡片
        </div>
      </div>
    );
  }

  // Layout mode rendering for key points
  const layoutMode = config.layoutMode || 'list';

  return (
    <div
      id="hand-drawn-card-target"
      className={`relative w-full max-w-[480px] mx-auto p-5 sm:p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-visible select-none ${domTheme.containerBg} ${domTheme.containerBorder} ${domTheme.containerShadow} ${fontClasses[config.font]} ${ratioClasses[config.ratio]}`}
      style={{
        backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.04) 1.2px, transparent 1.2px)',
        backgroundSize: '16px 16px'
      }}
    >
      {/* Tape Decoration Header */}
      {config.showTape && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-100/70 backdrop-blur-xs border border-amber-300/60 shadow-xs rotate-[-1.5deg] z-20 flex items-center justify-center">
          <div className="w-full h-[1px] border-t border-dashed border-amber-400/40"></div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-col gap-3.5">
        {/* Creator IP Personal Branding Bar */}
        {config.showCreatorIP && (
          <div className="flex items-center justify-between pb-2.5 border-b-2 border-dashed border-stone-800/20 gap-2">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <div className="relative shrink-0">
                <img
                  src={cardData.avatarUrl || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2523f59e0b'/%3E%3Ctext x='50' y='60' font-size='40' font-weight='bold' text-anchor='middle' fill='%2523020617'%3E智%3C/text%3E%3C/svg%3E"}
                  crossOrigin="anonymous"
                  alt="Creator Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-xs"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2523f59e0b'/%3E%3Ctext x='50' y='60' font-size='40' font-weight='bold' text-anchor='middle' fill='%2523020617'%3E智%3C/text%3E%3C/svg%3E";
                  }}
                />
                {cardData.showBlueV !== false && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-sky-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold border border-white shadow-xs">
                    V
                  </div>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className={`font-bold text-sm tracking-tight leading-snug whitespace-nowrap overflow-hidden text-ellipsis ${domTheme.titleColor}`}>
                    {cardData.creatorName || "智卡知识精选"}
                  </span>
                </div>
                <span className={`text-[11px] font-medium mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis ${domTheme.subtextColor}`}>
                  {cardData.creatorTitle || "知识炼金博主 · 50万+阅读"}
                </span>
              </div>
            </div>

            {/* Topic Badge */}
            {cardData.category && (
              <span className={`px-2.5 py-1 shrink-0 whitespace-nowrap ${domTheme.accentBadge} ${domTheme.headerBadgeText} font-bold text-xs rounded-full border border-stone-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                {cardData.category}
              </span>
            )}
          </div>
        )}

        {/* Card Header: Main Title, Subtitle/Author & Audience Tag */}
        <div className="relative pt-0.5">
          <div className="flex items-center justify-between gap-2">
            <h1
              className={`font-extrabold tracking-tight leading-tight ${domTheme.titleColor}`}
              style={{ fontSize: `${config.titleFontSize || 22}px` }}
            >
              {cardData.bookTitle.startsWith('《') || cardData.bookTitle.includes('：') || cardData.bookTitle.includes('？') || cardData.bookTitle.includes('?')
                ? cardData.bookTitle
                : `《${cardData.bookTitle}》`}
            </h1>

            {/* Stamp Seal */}
            {config.showStamp && cardData.stampText && (
              <div className="rotate-[12deg] border-2 border-red-500 text-red-500 text-[11px] font-black px-2 py-0.5 rounded-md tracking-widest uppercase shadow-xs opacity-90 border-dashed shrink-0">
                {cardData.stampText}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-1.5 gap-2">
            {cardData.author && (
              <p className={`text-xs font-semibold ${domTheme.subtextColor}`}>
                ✍️ {cardData.author}
              </p>
            )}
            {cardData.targetAudienceTag && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-800 border border-stone-400 shrink-0">
                {cardData.targetAudienceTag}
              </span>
            )}
          </div>
        </div>

        {/* Golden Core Quote Box */}
        {cardData.quote && (
          <div className={`relative my-0.5 p-3 rounded-2xl ${domTheme.quoteBg} ${domTheme.quoteBorder} shadow-[3px_3px_0px_0px_rgba(41,37,36,1)]`}>
            <div className={`absolute -top-3 left-3 whitespace-nowrap z-10 ${domTheme.headerBadgeBg} ${domTheme.headerBadgeText} text-[10px] font-black px-2 py-0.5 rounded-md border border-stone-900 shadow-xs`}>
              💡 核心金句
            </div>
            <p
              className={`font-bold italic leading-relaxed pt-1 ${domTheme.bodyColor} ${markerBgMap[config.markerColor]}`}
              style={{ fontSize: `${config.bodyFontSize || 14}px` }}
            >
              “{cardData.quote}”
            </p>
          </div>
        )}

        {/* Extended Field: Counter Intuitive Insight / Pitfall Warning */}
        {cardData.counterIntuitiveInsight && (
          <div className="p-2.5 rounded-xl bg-amber-100/90 border-2 border-amber-600 text-amber-950 text-xs font-bold shadow-xs">
            ⚡ {cardData.counterIntuitiveInsight}
          </div>
        )}

        {/* Key Points - Multi Layout Modes */}
        <div className="flex flex-col gap-2 my-0.5">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black tracking-wider flex items-center gap-1 ${domTheme.titleColor}`}>
              <span className="text-amber-500">✦</span> 核心干货要点 ({layoutMode.toUpperCase()})
            </span>
            <span className={`text-[10px] font-sans ${domTheme.subtextColor}`}>HIGH-DENSITY NOTES</span>
          </div>

          {/* Mode 1: Standard List Mode */}
          {layoutMode === 'list' && (
            <div className="grid grid-cols-1 gap-2">
              {cardData.keyPoints && cardData.keyPoints.map((point, index) => (
                <div
                  key={index}
                  className={`p-2.5 rounded-xl ${domTheme.itemBg} ${domTheme.itemBorder} shadow-[2px_2px_0px_0px_rgba(41,37,36,1)] flex items-start gap-2.5`}
                >
                  <div className={`flex-shrink-0 w-5 h-5 rounded-md ${domTheme.itemNumBg} ${domTheme.itemNumText} font-black text-xs flex items-center justify-center`}>
                    0{index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-extrabold text-xs ${domTheme.titleColor}`}>{point.title}</h3>
                    <p className={`text-[11px] mt-0.5 leading-snug ${domTheme.bodyColor}`}>{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mode 2: 2x2 Grid Matrix Mode */}
          {layoutMode === 'grid2x2' && (
            <div className="grid grid-cols-2 gap-2">
              {cardData.keyPoints && cardData.keyPoints.map((point, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-xl ${domTheme.itemBg} ${domTheme.itemBorder} shadow-[2px_2px_0px_0px_rgba(41,37,36,1)] flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`w-4 h-4 rounded-md ${domTheme.itemNumBg} ${domTheme.itemNumText} font-black text-[10px] flex items-center justify-center`}>
                      0{index + 1}
                    </span>
                    <span className="text-[9px] font-bold text-stone-400">POINT</span>
                  </div>
                  <h3 className={`font-extrabold text-xs ${domTheme.titleColor} line-clamp-1`}>{point.title}</h3>
                  <p className={`text-[10px] mt-0.5 leading-tight ${domTheme.bodyColor} line-clamp-3`}>{point.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Mode 3: Steps / Process Chain Mode */}
          {layoutMode === 'steps' && (
            <div className="flex flex-col gap-1.5 relative">
              {cardData.keyPoints && cardData.keyPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full ${domTheme.itemNumBg} ${domTheme.itemNumText} font-black text-xs flex items-center justify-center border border-stone-900 shadow-xs`}>
                    {index + 1}
                  </div>
                  <div className={`flex-1 p-2 rounded-xl ${domTheme.itemBg} ${domTheme.itemBorder} shadow-xs`}>
                    <span className={`font-black text-xs ${domTheme.titleColor}`}>{point.title}：</span>
                    <span className={`text-[11px] ${domTheme.bodyColor}`}>{point.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mode 4: Mind Map Branch Node Mode */}
          {layoutMode === 'mindmap' && (
            <div className="p-2.5 rounded-2xl border-2 border-dashed border-stone-800 bg-white/60 flex flex-col gap-2">
              <div className="text-center font-black text-xs bg-amber-300 text-stone-900 py-1 rounded-lg border border-stone-800">
                🌱 核心逻辑演化树
              </div>
              <div className="grid grid-cols-1 gap-1.5 pl-3 border-l-2 border-amber-400">
                {cardData.keyPoints && cardData.keyPoints.map((point, index) => (
                  <div key={index} className="text-xs">
                    <span className="font-bold text-amber-600">├─ 0{index + 1}. {point.title}：</span>
                    <span className={`text-[11px] ${domTheme.bodyColor}`}>{point.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Tip / Empowerment Box */}
        {cardData.actionTip && (
          <div className={`relative p-2.5 rounded-xl ${domTheme.actionBg} ${domTheme.actionBorder} shadow-[2px_2px_0px_0px_rgba(41,37,36,1)] flex items-center gap-2.5`}>
            <div className="w-6 h-6 rounded-full bg-amber-300 border border-stone-900 flex items-center justify-center text-xs flex-shrink-0">
              💡
            </div>
            <div>
              <span className="text-[10px] font-black text-amber-900 uppercase tracking-wider block">
                落地赋能指南
              </span>
              <p className={`text-xs font-bold ${domTheme.titleColor} leading-tight`}>
                {cardData.actionTip}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding Bar */}
      <div className="relative z-10 pt-2.5 mt-2.5 border-t-2 border-dashed border-stone-800/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-amber-400 border border-stone-900 flex items-center justify-center text-[10px] font-black">
            智
          </div>
          <span className={`text-xs font-extrabold ${domTheme.titleColor}`}>
            {cardData.footerTag || "智卡 · 手绘读书笔记"}
          </span>
        </div>

        {/* QR Code / Secondary Branding */}
        {config.showQrCode && cardData.qrCodeUrl && (
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-stone-800 shadow-xs">
            <img
              src={cardData.qrCodeUrl}
              alt="QR Code"
              className="w-7 h-7 rounded-sm object-cover"
            />
            <span className="text-[9px] font-bold text-stone-600 pr-1 leading-none">
              扫码关注
            </span>
          </div>
        )}

        {!config.showQrCode && (
          <span className={`text-[10px] font-black tracking-widest uppercase ${domTheme.subtextColor}`}>
            HAND-DRAWN CARD
          </span>
        )}
      </div>
    </div>
  );
};
