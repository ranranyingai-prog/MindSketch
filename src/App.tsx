import React, { useState } from 'react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import type { CardData, CardConfig } from './types/card';
import { BOOK_PRESETS } from './data/bookPresets';
import { HandDrawnCard } from './components/HandDrawnCard';
import { InputPanel } from './components/InputPanel';
import { CustomizerPanel } from './components/CustomizerPanel';
import { generateAIInfographicImage } from './services/imageGenService';
import { generateCardFromAi } from './services/aiService';
import { Eye, Download, Smartphone, Sparkles, RefreshCw } from 'lucide-react';

export const App: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    bookTitle: BOOK_PRESETS[0].bookTitle,
    author: BOOK_PRESETS[0].author,
    category: BOOK_PRESETS[0].category,
    quote: BOOK_PRESETS[0].quote,
    keyPoints: BOOK_PRESETS[0].keyPoints,
    actionTip: BOOK_PRESETS[0].actionTip,
    footerTag: '智卡·手绘读书笔记',
    stampText: BOOK_PRESETS[0].stampText,
    creatorName: '智卡知识精选',
    creatorTitle: '知识提炼博主 · 50万+阅读',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    showBlueV: true,
  });

  const [cardConfig, setCardConfig] = useState<CardConfig>({
    theme: 'kraft',
    font: 'kuaile',
    ratio: '3:4',
    layoutMode: 'list',
    markerColor: 'yellow',
    showTape: true,
    showStamp: true,
    showDoodleArrows: true,
    showCreatorIP: true,
    showQrCode: false,
    borderThickness: 'medium',
    titleFontSize: 22,
    bodyFontSize: 14,
  });

  const [selectedStyleId, setSelectedStyleId] = useState<string>('淡彩手绘风');
  const [aiGeneratedImageUrl, setAiGeneratedImageUrl] = useState<string | undefined>(undefined);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const handleUpdateCardData = (updated: Partial<CardData>) => {
    setCardData(prev => ({ ...prev, ...updated }));
  };

  const handleAIGenerateText = async (prompt: string) => {
    setIsGeneratingAI(true);
    try {
      const generated = await generateCardFromAi(prompt, 'book');
      setCardData(prev => ({
        ...prev,
        bookTitle: generated.bookTitle || prev.bookTitle,
        author: generated.author || prev.author,
        category: generated.category || prev.category,
        quote: generated.quote || prev.quote,
        keyPoints: generated.keyPoints && generated.keyPoints.length > 0 ? generated.keyPoints : prev.keyPoints,
        actionTip: generated.actionTip || prev.actionTip,
        stampText: generated.stampText || prev.stampText
      }));
      setAiGeneratedImageUrl(undefined);
    } catch (e) {
      console.error(e);
      alert('AI 生成文字时遇到小异常，请重试');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleGenerateAIImage = async (styleId: string) => {
    setIsGeneratingImage(true);
    try {
      const apiKey = localStorage.getItem('IMAGE_GEN_API_KEY') || '';
      if (!apiKey) {
        alert('尚未配置云端 API Key！系统将以高密度 DOM 矢量渲染展示，如需生成像素级 AI 扩散模型图文，请在“⚙️ 云端API”中填入 Key。');
        setAiGeneratedImageUrl(undefined);
        return;
      }
      const imgUrl = await generateAIInfographicImage(cardData, styleId, { provider: 'siliconflow', apiKey });
      setAiGeneratedImageUrl(imgUrl);
    } catch (e: any) {
      console.error(e);
      alert(`AI 生图提示：${e.message || '绘制失败，已使用矢量 DOM 渲染'}`);
      setAiGeneratedImageUrl(undefined);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleExportImage = async () => {
    const targetElem = document.getElementById('hand-drawn-card-target');
    if (!targetElem) return;
    setIsExporting(true);

    try {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      await new Promise(resolve => setTimeout(resolve, 300));

      const width = targetElem.offsetWidth;
      const height = targetElem.offsetHeight;

      const dataUrl = await toPng(targetElem, {
        width,
        height,
        pixelRatio: 3,
        cacheBust: true,
      });

      setPreviewImageUrl(dataUrl);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      try {
        const link = document.createElement('a');
        link.download = `${cardData.bookTitle.replace(/[《》]/g, '') || '手绘卡片'}_智卡图文.png`;
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-20 sm:pb-6">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 font-bold font-kuaile flex items-center justify-center text-lg sketch-border">
              智
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg font-kuaile tracking-wide text-amber-300">
                智卡 · 手绘风知识图文生成器
              </h1>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                手机H5专属 · 24+手绘风格 · 个人IP打造 · 社交矩阵宣传 · 高清导出
              </p>
            </div>
          </div>

          <button
            onClick={handleExportImage}
            disabled={isExporting}
            className="hidden sm:flex px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all items-center gap-1.5 active:scale-95 disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
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
              <span>智卡手机实时预览 ({cardConfig.ratio})</span>
            </span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full border border-slate-700 flex items-center gap-1">
              <Smartphone className="w-3 h-3 text-amber-400" />
              <span>全屏响应式</span>
            </span>
          </div>

          {/* Render Hand-Drawn Card Wrapper */}
          <div className="w-full flex justify-center py-2 px-1">
            <HandDrawnCard
              cardData={cardData}
              config={cardConfig}
              activeStyleId={selectedStyleId}
              aiGeneratedImageUrl={aiGeneratedImageUrl}
            />
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-400 text-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>适配微信朋友圈、小红书、社群推文及培训课件</span>
          </div>
        </div>

        {/* Right Side: Interactive Editor & Customizer Tabs */}
        <div className="lg:col-span-6 space-y-4">
          <InputPanel
            cardData={cardData}
            onUpdateCardData={handleUpdateCardData}
            onAIGenerate={handleAIGenerateText}
            onGenerateAIImage={handleGenerateAIImage}
            isGeneratingAI={isGeneratingAI}
            isGeneratingImage={isGeneratingImage}
            selectedStyleId={selectedStyleId}
            onSelectStyleId={setSelectedStyleId}
          />

          <CustomizerPanel
            cardData={cardData}
            config={cardConfig}
            onChange={setCardConfig}
            onExport={handleExportImage}
            isExporting={isExporting}
          />
        </div>
      </main>

      {/* Preview Modal */}
      {previewImageUrl && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-4 max-w-md w-full flex flex-col items-center gap-3 shadow-2xl relative">
            <div className="flex items-center justify-between w-full">
              <div className="font-bold text-base text-amber-300 font-kuaile flex items-center gap-1.5">
                <span>智卡生成成功！</span>
              </div>
              <button
                onClick={() => setPreviewImageUrl(null)}
                className="text-slate-400 hover:text-white text-sm font-bold bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[60vh] w-full overflow-y-auto rounded-xl border border-slate-800 p-2 bg-slate-950 flex justify-center">
              <img
                src={previewImageUrl}
                alt="全尺寸手绘图文卡片"
                className="w-full max-w-full h-auto rounded-lg shadow-lg block select-none"
              />
            </div>

            <div className="w-full flex gap-2">
              <a
                href={previewImageUrl}
                download={`${cardData.bookTitle.replace(/[《》]/g, '') || '智卡'}_图文卡片.png`}
                className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-center shadow transition-all text-xs flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>下载高清图片文件</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
