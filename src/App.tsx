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
    footerTag: '智卡·手绘知识图文',
    stampText: BOOK_PRESETS[0].stampText,
    counterIntuitiveInsight: BOOK_PRESETS[0].counterIntuitiveInsight,
    targetAudienceTag: BOOK_PRESETS[0].targetAudienceTag,
    creatorName: '智卡IP进化营',
    creatorTitle: '知识IP孵化导师 · 累计赋能10W+',
    avatarUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2523f59e0b'/%3E%3Ctext x='50' y='60' font-size='40' font-weight='bold' text-anchor='middle' fill='%2523020617'%3E智%3C/text%3E%3C/svg%3E",
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
      const generated = await generateCardFromAi(prompt, 'text');
      setCardData(prev => ({
        ...prev,
        bookTitle: generated.bookTitle || prev.bookTitle,
        author: generated.author || prev.author,
        category: generated.category || prev.category,
        quote: generated.quote || prev.quote,
        keyPoints: generated.keyPoints && generated.keyPoints.length > 0 ? generated.keyPoints : prev.keyPoints,
        actionTip: generated.actionTip || prev.actionTip,
        counterIntuitiveInsight: generated.counterIntuitiveInsight || prev.counterIntuitiveInsight,
        targetAudienceTag: generated.targetAudienceTag || prev.targetAudienceTag,
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
      const width = targetElem.offsetWidth;
      const height = targetElem.offsetHeight;

      // Reliable toPng export with font rendering support and fallback
      let dataUrl = '';
      try {
        dataUrl = await toPng(targetElem, {
          width,
          height,
          pixelRatio: 2,
          cacheBust: true,
        });
      } catch (firstErr) {
        console.warn('Initial toPng with font embedding failed, retrying fallback:', firstErr);
        dataUrl = await toPng(targetElem, {
          width,
          height,
          pixelRatio: 1.5,
          skipFonts: true,
        });
      }

      if (!dataUrl) {
        throw new Error('生成的图片数据为空');
      }

      setPreviewImageUrl(dataUrl);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      try {
        const link = document.createElement('a');
        const cleanTitle = (cardData.bookTitle || '智卡图文').replace(/[《》\?:：\/]/g, '');
        link.download = `${cleanTitle}_手绘卡片.png`;
        link.href = dataUrl;
        link.click();
      } catch (e) {
        console.log('Mobile browser fallback to preview modal', e);
      }
    } catch (err: any) {
      console.error('Failed to generate card image:', err);
      alert(`卡片生成提示：${err?.message || '生成失败，请刷新后重试'}`);
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

      {/* Fixed Mobile Bottom Action Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-3 flex items-center justify-between gap-3 shadow-2xl">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-amber-400 font-kuaile">智卡手绘图文</span>
          <span className="text-[10px] text-slate-400">点击生成并导出高清图片</span>
        </div>
        <button
          onClick={handleExportImage}
          disabled={isExporting}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
        >
          {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          <span>{isExporting ? '生成中...' : '生成/导出卡片'}</span>
        </button>
      </div>

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
