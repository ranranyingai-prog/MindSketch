import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import type { CardData, CardConfig } from './types/card';
import { BOOK_PRESETS } from './data/bookPresets';
import { HandDrawnCard } from './components/HandDrawnCard';
import { InputPanel } from './components/InputPanel';
import { CustomizerPanel } from './components/CustomizerPanel';
import { Sparkles, RefreshCw, Eye, Share2, Layers, CheckCircle, Download } from 'lucide-react';

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

  // Trigger high-resolution PNG export using html-to-image
  const handleExportImage = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 150));

      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2.5,
        cacheBust: true,
      });

      setPreviewImageUrl(dataUrl);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      const link = document.createElement('a');
      link.download = `${cardData.bookTitle.replace(/[《》]/g, '') || '手绘卡片'}_知识卡片.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate card image:', err);
      alert('卡片生成过程中遇到微小异常，请重试');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
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
                社交媒体宣传 · 培训赋能 · 金句卡片 · 一键高清导出
              </p>
            </div>
          </div>

          <button
            onClick={handleExportImage}
            disabled={isExporting}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
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
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-900/60 p-4 sm:p-6 rounded-3xl border border-slate-800/80 shadow-2xl relative min-h-[480px]">
          <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400">
            <span className="flex items-center gap-1 font-kuaile text-amber-400">
              <Eye className="w-3.5 h-3.5" />
              <span>实时效果预览 ({cardConfig.ratio})</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700">
              拖拽或调整右侧参数
            </span>
          </div>

          {/* Render Hand-Drawn Card */}
          <div className="w-full flex justify-center py-2">
            <HandDrawnCard cardRef={cardRef} data={cardData} config={cardConfig} />
          </div>

          <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>适配小红书、微信朋友圈、培训PPT插入及社群裂变传播</span>
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
              <span>1. 输入/解析内容</span>
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
              <span>2. 调节手绘样式</span>
            </button>
          </div>

          {/* Tab Panels */}
          {activeTab === 'content' ? (
            <InputPanel cardData={cardData} onChange={setCardData} />
          ) : (
            <CustomizerPanel
              config={cardConfig}
              onChange={setCardConfig}
              onExport={handleExportImage}
              isExporting={isExporting}
            />
          )}
        </div>
      </main>

      {/* Preview & Save Image Modal Dialog */}
      {previewImageUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 max-w-md w-full flex flex-col items-center gap-4 shadow-2xl relative">
            <div className="flex items-center justify-between w-full">
              <div className="font-bold text-base text-amber-300 font-kuaile flex items-center gap-1.5">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span>手绘卡片已成功生成！</span>
              </div>
              <button
                onClick={() => setPreviewImageUrl(null)}
                className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 w-7 h-7 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto rounded-xl border border-slate-800 p-2 bg-slate-950">
              <img
                src={previewImageUrl}
                alt="手绘图文预览"
                className="max-w-full rounded-lg shadow-lg"
              />
            </div>

            <div className="w-full flex gap-3">
              <a
                href={previewImageUrl}
                download={`${cardData.bookTitle.replace(/[《》]/g, '') || '手绘卡片'}_知识卡片.png`}
                className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-2xl text-center shadow-lg transition-all text-sm flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>长按或点击下载高清图</span>
              </a>
              <button
                onClick={() => setPreviewImageUrl(null)}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-sm font-bold"
              >
                返回修改
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-500">
        手绘风图文生成器 · 打造高颜值社交宣传 & 培训赋能金句卡片
      </footer>
    </div>
  );
};

export default App;
