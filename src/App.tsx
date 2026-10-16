import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import type { CardData, CardConfig } from './types/card';
import { BOOK_PRESETS } from './data/bookPresets';
import { matchBestTemplate } from './data/templates';
import { HandDrawnCard } from './components/HandDrawnCard';
import { InputPanel } from './components/InputPanel';
import { CustomizerPanel } from './components/CustomizerPanel';
import { Sparkles, RefreshCw, Eye, Share2, Layers, CheckCircle, Download, Smartphone } from 'lucide-react';

export const App: React.FC = () => {
  // Default Initial Card Data
  const [cardData, setCardData] = useState<CardData>({
    bookTitle: BOOK_PRESETS[0].bookTitle,
    author: BOOK_PRESETS[0].author,
    category: BOOK_PRESETS[0].category,
    quote: BOOK_PRESETS[0].quote,
    keyPoints: BOOK_PRESETS[0].keyPoints,
    actionTip: BOOK_PRESETS[0].actionTip,
    footerTag: '手绘读书笔记',
    stampText: BOOK_PRESETS[0].stampText,
  });

  // Default Initial Card Styling Configuration
  const [cardConfig, setCardConfig] = useState<CardConfig>({
    theme: 'kraft',
    font: 'kuaile',
    ratio: '3:4',
    markerColor: 'yellow',
    showTape: true,
    showStamp: true,
    showDoodleArrows: true,
    borderThickness: 'medium',
    titleFontSize: 22,
    bodyFontSize: 14,
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');

  // Handle Card Data Change with smart template auto-matching option
  const handleCardDataChange = (newData: CardData, autoMatchTemplate = false) => {
    setCardData(newData);

    if (autoMatchTemplate) {
      const bestMatch = matchBestTemplate(newData);
      if (bestMatch) {
        setCardConfig((prev) => ({
          ...prev,
          ...bestMatch.config,
        }));
      }
    }
  };

  // Trigger high-resolution PNG export using html-to-image
  const handleExportImage = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      // Ensure web fonts are completely loaded before rasterizing DOM into canvas PNG
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      await new Promise((resolve) => setTimeout(resolve, 300));

      const elem = cardRef.current;
      const width = elem.offsetWidth;
      const height = elem.offsetHeight;

      const dataUrl = await toPng(elem, {
        width,
        height,
        pixelRatio: 3, // High DPI HD output
        cacheBust: true,
        style: {
          transform: 'none',
          margin: '0',
        },
      });

      setPreviewImageUrl(dataUrl);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Try automatic download
      try {
        const link = document.createElement('a');
        link.download = `${cardData.bookTitle.replace(/[《》]/g, '') || '手绘卡片'}_知识卡片.png`;
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log('Mobile browser fallback to long-press preview', e);
      }
    } catch (err) {
      console.error('Failed to generate card image:', err);
      alert('卡片生成过程中遇到微小异常，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  // Mobile Web Share API
  const handleMobileShare = async () => {
    if (!previewImageUrl) return;

    if (navigator.share) {
      try {
        const blob = await (await fetch(previewImageUrl)).blob();
        const file = new File([blob], 'handdrawn-card.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: cardData.bookTitle || '手绘卡片',
            text: cardData.quote || '分享一张精美手绘知识卡片',
            files: [file],
          });
          return;
        }
      } catch (e) {
        console.log('Native share error or canceled', e);
      }
    }

    alert('提示：在手机上长按下方图片，即可保存到相册或发送给微信朋友！');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-20 sm:pb-6">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-bold font-kuaile flex items-center justify-center text-lg sketch-border">
              卡
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg font-kuaile tracking-wide text-amber-300">
                手绘风图文生成器
              </h1>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                手机H5专属 · 智能匹配内置模板 · 社交推广 · 手机长按保存
              </p>
            </div>
          </div>

          <button
            onClick={handleExportImage}
            disabled={isExporting}
            className="hidden sm:flex px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all items-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            {isExporting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>生成精美卡片</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Real-time Live Hand-Drawn Card Preview Canvas */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-900/60 p-2 sm:p-6 rounded-3xl border border-slate-800/80 shadow-2xl relative min-h-[420px] overflow-x-hidden">
          <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400 px-2">
            <span className="flex items-center gap-1 font-kuaile text-amber-400">
              <Eye className="w-3.5 h-3.5" />
              <span>手机实时预览 ({cardConfig.ratio})</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700 flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-amber-400" />
              <span>全屏响应式</span>
            </span>
          </div>

          {/* Render Hand-Drawn Card Wrapper */}
          <div className="w-full flex justify-center py-2 px-1">
            <HandDrawnCard cardRef={cardRef} data={cardData} config={cardConfig} />
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 text-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>适配微信朋友圈、小红书、社群推文及培训课件</span>
          </div>
        </div>

        {/* Right Side: Interactive Editor & Customizer Tabs */}
        <div className="lg:col-span-6 space-y-4">
          {/* Mobile View Tab Switcher (Content vs Style) */}
          <div className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'content'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>1. 内容与智能提取</span>
            </button>
            <button
              onClick={() => setActiveTab('style')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
                activeTab === 'style'
                  ? 'bg-amber-400 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>2. 切换模板与风格</span>
            </button>
          </div>

          {/* Tab Panels */}
          {activeTab === 'content' ? (
            <InputPanel
              cardData={cardData}
              onChange={(data, autoMatch) => handleCardDataChange(data, autoMatch)}
            />
          ) : (
            <CustomizerPanel
              cardData={cardData}
              config={cardConfig}
              onChange={setCardConfig}
              onExport={handleExportImage}
              isExporting={isExporting}
            />
          )}
        </div>
      </main>

      {/* Sticky Bottom Bar for Mobile H5 Devices */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 flex items-center justify-between gap-3 shadow-2xl">
        <div className="text-xs text-slate-300 font-medium">
          <div className="font-bold text-amber-300 font-kuaile">{cardData.bookTitle || '手绘卡片'}</div>
          <div className="text-[10px] text-slate-400">点击右侧按钮合成图片</div>
        </div>

        <button
          onClick={handleExportImage}
          disabled={isExporting}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-lg active:scale-95 disabled:opacity-50"
        >
          {isExporting ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>{isExporting ? '合成中...' : '生成手绘图文'}</span>
        </button>
      </div>

      {/* Preview & Save Image Modal Dialog */}
      {previewImageUrl && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-4 sm:p-5 max-w-md w-full flex flex-col items-center gap-3 shadow-2xl relative">
            <div className="flex items-center justify-between w-full">
              <div className="font-bold text-base text-amber-300 font-kuaile flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>手绘卡片生成成功！</span>
              </div>
              <button
                onClick={() => setPreviewImageUrl(null)}
                className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Mobile gesture banner */}
            <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl p-2 text-center text-xs text-amber-300 flex items-center justify-center gap-1.5 font-medium">
              <Smartphone className="w-4 h-4 shrink-0 text-amber-400" />
              <span>📱 华为/手机长按下方完整图片可保存到相册</span>
            </div>

            <div className="max-h-[60vh] w-full overflow-y-auto rounded-xl border border-slate-800 p-2 bg-slate-950 flex justify-center">
              <img
                src={previewImageUrl}
                alt="全尺寸手绘图文卡片 (长按保存)"
                className="w-full max-w-full h-auto rounded-lg shadow-lg block select-none"
              />
            </div>

            <div className="w-full flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  onClick={handleMobileShare}
                  className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl text-center shadow-lg transition-all text-xs flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>手机一键分享</span>
                </button>
                <a
                  href={previewImageUrl}
                  download={`${cardData.bookTitle.replace(/[《》]/g, '') || '手绘卡片'}_知识卡片.png`}
                  className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold rounded-xl text-center shadow transition-all text-xs flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>下载图片文件</span>
                </a>
              </div>

              <button
                onClick={() => setPreviewImageUrl(null)}
                className="w-full py-2 bg-slate-800/60 hover:bg-slate-800 text-slate-400 rounded-xl text-xs font-medium"
              >
                关闭并继续编辑
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        手绘风图文生成器 · 手机移动端高颜值社交宣传卡片
      </footer>
    </div>
  );
};

export default App;
