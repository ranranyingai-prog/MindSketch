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

  // Aspect ratio class mapping
  const ratioClasses: Record<string, string> = {
    '3:4': 'aspect-[3/4]',
    '1:1': 'aspect-square',
    '9:16': 'aspect-[9/16]',
    'auto': 'min-h-[640px] h-auto'
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

  // Theme styling overrides based on selected style or fallback theme
  const isDarkChalk = config.theme === 'chalkboard' || activeStyleId === '黑板粉笔风' || activeStyleId === '黑板报风' || activeStyleId === '黑金高端风';

  const cardContainerBg = isDarkChalk
    ? 'bg-[#1E2922] text-emerald-50'
    : currentStyle.previewBg || 'bg-[#FCFBF8] text-stone-900';

  const cardBorderClass = isDarkChalk
    ? 'border-4 border-emerald-100/40 shadow-[6px_6px_0px_0px_rgba(34,197,94,0.3)]'
    : 'border-3 border-stone-800 shadow-[6px_6px_0px_0px_rgba(41,37,36,1)]';

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

  // High Density Vector DOM Layout
  return (
    <div
      id="hand-drawn-card-target"
      className={`relative w-full max-w-[480px] mx-auto p-5 sm:p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between overflow-hidden select-none ${cardContainerBg} ${cardBorderClass} ${fontClasses[config.font]} ${ratioClasses[config.ratio]}`}
      style={{
        backgroundImage: isDarkChalk
          ? 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)'
          : 'radial-gradient(rgba(0, 0, 0, 0.04) 1.2px, transparent 1.2px)',
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
      <div className="relative z-10 flex flex-col gap-4">
        {/* Creator IP Personal Branding Bar */}
        {config.showCreatorIP && (
          <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-stone-800/20">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src={cardData.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                  alt="Creator Avatar"
                  className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-xs"
                />
                {cardData.showBlueV !== false && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-sky-500 text-white rounded-full flex items-center justify-center text-[9px] font-bold border border-white shadow-xs">
                    V
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className={`font-bold text-sm tracking-tight leading-none ${isDarkChalk ? 'text-amber-100' : 'text-stone-900'}`}>
                    {cardData.creatorName || "智卡知识精选"}
                  </span>
                </div>
                <span className={`text-[11px] font-medium mt-0.5 ${isDarkChalk ? 'text-emerald-200/70' : 'text-stone-500'}`}>
                  {cardData.creatorTitle || "知识炼金博主 · 50万+阅读"}
                </span>
              </div>
            </div>

            {/* Topic Badge */}
            {cardData.category && (
              <span className="px-2.5 py-1 bg-amber-400 text-stone-950 font-bold text-xs rounded-full border border-stone-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {cardData.category}
              </span>
            )}
          </div>
        )}

        {/* Card Header: Book Title & Author */}
        <div className="relative pt-1">
          <div className="flex items-center justify-between">
            <h1
              className={`font-extrabold tracking-tight leading-tight ${isDarkChalk ? 'text-emerald-50' : 'text-stone-900'}`}
              style={{ fontSize: `${config.titleFontSize || 24}px` }}
            >
              《{cardData.bookTitle || '认知觉醒'}》
            </h1>

            {/* Stamp Seal */}
            {config.showStamp && cardData.stampText && (
              <div className="rotate-[12deg] border-2 border-red-500 text-red-500 text-[11px] font-black px-2 py-0.5 rounded-md tracking-widest uppercase shadow-xs opacity-90 border-dashed">
                {cardData.stampText}
              </div>
            )}
          </div>

          {cardData.author && (
            <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${isDarkChalk ? 'text-emerald-200/80' : 'text-stone-500'}`}>
              <span>✍️ 作者：{cardData.author}</span>
            </p>
          )}
        </div>

        {/* Golden Core Quote Box */}
        {cardData.quote && (
          <div className="relative my-0.5 p-3.5 rounded-2xl bg-amber-50/90 border-2 border-stone-800 shadow-[3px_3px_0px_0px_rgba(41,37,36,1)]">
            <div className="absolute -top-3 left-3 bg-amber-400 text-stone-950 text-[11px] font-black px-2 py-0.5 rounded-md border border-stone-900 flex items-center gap-1 shadow-xs">
              <span>💡 核心金句</span>
            </div>
            <p
              className={`font-bold italic text-stone-800 leading-relaxed pt-1.5 ${markerBgMap[config.markerColor]}`}
              style={{ fontSize: `${config.bodyFontSize || 15}px` }}
            >
              “ {cardData.quote} ”
            </p>
          </div>
        )}

        {/* Dense Key Points Grid / List */}
        <div className="flex flex-col gap-2.5 my-1">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black tracking-wider flex items-center gap-1 ${isDarkChalk ? 'text-emerald-200' : 'text-stone-700'}`}>
              <span className="text-amber-400">✦</span> 核心干货要点
            </span>
            <span className={`text-[11px] font-sans ${isDarkChalk ? 'text-emerald-300/50' : 'text-stone-400'}`}>HIGH-DENSITY NOTES</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {cardData.keyPoints && cardData.keyPoints.map((point, index) => (
              <div
                key={index}
                className={`group relative p-3 rounded-xl border-2 shadow-[2.5px_2.5px_0px_0px_rgba(41,37,36,1)] transition-transform hover:-translate-y-0.5 ${
                  isDarkChalk
                    ? 'bg-[#2A382E] border-emerald-100/40 text-emerald-50'
                    : 'bg-white border-stone-800 text-stone-900'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {/* Number Badge */}
                  <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-amber-400 border border-stone-900 text-stone-950 font-black text-xs flex items-center justify-center shadow-xs">
                    0{index + 1}
                  </div>

                  <div className="flex-1">
                    <h3 className={`font-extrabold text-sm leading-snug ${isDarkChalk ? 'text-amber-200' : 'text-stone-900'}`}>
                      {point.title}
                    </h3>
                    <p className={`text-xs mt-1 leading-relaxed font-normal ${isDarkChalk ? 'text-emerald-100/90' : 'text-stone-600'}`}>
                      {point.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Tip / Empowerment Box */}
        {cardData.actionTip && (
          <div className="relative p-3 rounded-xl bg-amber-100/80 border-2 border-stone-800 shadow-[2px_2px_0px_0px_rgba(41,37,36,1)] flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-amber-300 border border-stone-900 flex items-center justify-center text-sm flex-shrink-0">
              💡
            </div>
            <div>
              <span className="text-[11px] font-black text-amber-900 uppercase tracking-wider block">
                落地赋能指南
              </span>
              <p className="text-xs font-bold text-stone-800 leading-tight">
                {cardData.actionTip}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding Bar */}
      <div className="relative z-10 pt-3 mt-3 border-t-2 border-dashed border-stone-800/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-amber-400 border border-stone-900 flex items-center justify-center text-[10px] font-black">
            智
          </div>
          <span className={`text-xs font-extrabold ${isDarkChalk ? 'text-emerald-100' : 'text-stone-800'}`}>
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
          <span className={`text-[10px] font-black tracking-widest uppercase ${isDarkChalk ? 'text-emerald-300/40' : 'text-stone-400'}`}>
            HAND-DRAWN CARD
          </span>
        )}
      </div>
    </div>
  );
};
