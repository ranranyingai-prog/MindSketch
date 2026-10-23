import React, { useState } from 'react';
import type { CardData, CardConfig } from '../types/card';
import type { CardTemplate } from '../data/templates';
import { CARD_TEMPLATES, matchBestTemplate } from '../data/templates';
import { ZHIKA_CARD_STYLES } from '../data/styles';
import { Sparkles, Wand2, Palette, Type, Layout, Check, GitFork } from 'lucide-react';

interface UnifiedControlPanelProps {
  cardData: CardData;
  cardConfig: CardConfig;
  selectedStyleId: string;
  isGeneratingAI: boolean;
  isGeneratingImage: boolean;
  onUpdateCardData: (updated: Partial<CardData>) => void;
  onUpdateConfig: (config: CardConfig) => void;
  onSelectStyleId: (styleId: string) => void;
  onAIGenerate: (prompt: string) => Promise<void>;
  onGenerateAIImage: (styleId: string) => Promise<void>;
}

export const InputPanel: React.FC<UnifiedControlPanelProps> = ({
  cardData,
  cardConfig,
  selectedStyleId,
  isGeneratingAI,
  isGeneratingImage,
  onUpdateCardData,
  onUpdateConfig,
  onSelectStyleId,
  onAIGenerate,
  onGenerateAIImage,
}) => {
  const [stepTab, setStepTab] = useState<'step1' | 'step2' | 'step3'>('step1');
  const [aiInputText, setAiInputText] = useState('');

  const inspirationChips = [
    { label: '🚀 如何打造个人IP？', text: '如何从0到1高效打造普通人个人IP？' },
    { label: '👔 刚升PM如何带团队？', text: '新手管理者破局：刚升PM如何快速带团队？' },
    { label: '⚠️ 职场沟通避坑法则', text: '避坑指南：职场高效沟通的3个反直觉法则' },
    { label: '📈 商业模式与用户增长', text: '商业增长：如何提高用户复购与LTV生命周期价值？' },
  ];

  const themeOptions = [
    { id: 'kraft', label: '牛皮复古', bg: 'bg-[#f5e8d0]', border: 'border-amber-800' },
    { id: 'cute', label: '萌趣便签', bg: 'bg-[#fff9eb]', border: 'border-amber-400' },
    { id: 'chalkboard', label: '黑板板书', bg: 'bg-[#242e2b]', border: 'border-emerald-500' },
    { id: 'grid', label: '极简方格', bg: 'bg-[#fbf9f4]', border: 'border-slate-800' },
    { id: 'minimal', label: '素雅质感', bg: 'bg-stone-100', border: 'border-stone-800' },
  ];

  const fontOptions = [
    { id: 'kuaile', label: '快乐手绘体', sampleFont: 'font-kuaile' },
    { id: 'mashan', label: '马山毛笔体', sampleFont: 'font-mashan' },
    { id: 'longcang', label: '龙苍草书体', sampleFont: 'font-longcang' },
    { id: 'patrick', label: 'Patrick 英语体', sampleFont: 'font-patrick' },
  ];

  const ratioOptions = [
    { id: '3:4', label: '3:4', sub: '小红书卡片' },
    { id: '1:1', label: '1:1', sub: '朋友圈/Square' },
    { id: '9:16', label: '9:16', sub: '海报/Stories' },
    { id: 'auto', label: 'Auto', sub: '自适应长图' },
  ];

  const layoutModeOptions = [
    { id: 'list', label: '标准列表', desc: '纵向卡片图文' },
    { id: 'grid2x2', label: '2x2 矩阵', desc: '四象限对比' },
    { id: 'steps', label: '步骤流程', desc: '节点逻辑串联' },
    { id: 'mindmap', label: '思维导图', desc: '树状分支延伸' },
  ];


  const matchedBest = matchBestTemplate(cardData);

  const handleSelectTemplate = (template: CardTemplate) => {
    onUpdateConfig({
      ...cardConfig,
      ...template.config,
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800/90 rounded-3xl p-4 sm:p-5 shadow-2xl text-slate-100 flex flex-col gap-4">
      {/* 3-Step Customer-Centric Flow Navigation Header */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/90 rounded-2xl border border-slate-800/80">
        <button
          onClick={() => setStepTab('step1')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
            stepTab === 'step1'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-sm">💡</span>
          <span>1. 极速生成</span>
        </button>

        <button
          onClick={() => setStepTab('step2')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
            stepTab === 'step2'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-sm">🎨</span>
          <span>2. 模板风格</span>
        </button>

        <button
          onClick={() => setStepTab('step3')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
            stepTab === 'step3'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-sm">✏️</span>
          <span>3. 微调内容</span>
        </button>
      </div>

      {/* STEP 1: Quick AI Generation & Inspiration Prompt */}
      {stepTab === 'step1' && (
        <div className="flex flex-col gap-3.5">
          <div className="bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 p-4 rounded-2xl border border-amber-500/30 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5 font-kuaile text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>告诉 AI 你想创作的主题或想法：</span>
              </label>
            </div>

            <textarea
              rows={3}
              value={aiInputText}
              onChange={(e) => setAiInputText(e.target.value)}
              placeholder="例如：如何给团队新人做培训赋能？/ 规避内耗的3个沟通法则 / 商业模式闭环逻辑..."
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 resize-none shadow-inner"
            />

            {/* Inspiration Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 font-medium">💡 点击快速填入热门主题：</span>
              <div className="flex flex-wrap gap-1.5">
                {inspirationChips.map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAiInputText(chip.text)}
                    className="text-[10px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700/80 hover:border-amber-400/50 px-2.5 py-1 rounded-lg transition-all"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={isGeneratingAI || !aiInputText.trim()}
              onClick={async () => {
                await onAIGenerate(aiInputText);
                setStepTab('step2'); // Automatically take user to style & template selector
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              {isGeneratingAI ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>AI 正在提炼干货并排版...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>一键深度提炼并自动排版</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Presets, Layouts & Visual Templates */}
      {stepTab === 'step2' && (
        <div className="flex flex-col gap-4">
          {/* Smart Template Matcher Banner */}
          <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-slate-200">智能精选手绘模板</span>
            </div>
            <button
              onClick={() => handleSelectTemplate(matchedBest)}
              className="text-[11px] bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-2.5 py-1 rounded-lg shadow flex items-center gap-1 transition-all active:scale-95"
            >
              <Wand2 className="w-3 h-3" />
              <span>AI推荐极佳匹配</span>
            </button>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
            {CARD_TEMPLATES.map((tmpl) => {
              const active =
                cardConfig.theme === tmpl.config.theme &&
                cardConfig.font === tmpl.config.font &&
                cardConfig.ratio === tmpl.config.ratio;
              const isAiMatch = matchedBest.id === tmpl.id;

              return (
                <button
                  key={tmpl.id}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                    active
                      ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/60 shadow-lg'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1 absolute top-2 right-2">
                    {isAiMatch && (
                      <span className="text-[9px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>推荐</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <div className="font-bold text-xs text-amber-300 flex items-center gap-1">
                      {active && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                      <span>{tmpl.name}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                      {tmpl.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2 text-[9px] text-slate-400">
                    <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {tmpl.config.ratio}
                    </span>
                    <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                      {tmpl.config.theme}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* AI Diffusion Style Switcher */}
          <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400">选择 Zhika AI 风格提示词引擎</span>
              <button
                disabled={isGeneratingImage}
                onClick={() => onGenerateAIImage(selectedStyleId)}
                className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-lg shadow transition-all flex items-center gap-1"
              >
                {isGeneratingImage ? '生成中...' : '✨ 云端AI绘图'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
              {ZHIKA_CARD_STYLES.slice(0, 8).map((style) => (
                <button
                  key={style.id}
                  onClick={() => onSelectStyleId(style.id)}
                  className={`p-2 rounded-xl border text-left text-xs transition-all ${
                    selectedStyleId === style.id
                      ? 'border-amber-400 bg-slate-900 ring-1 ring-amber-400/50'
                      : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900'
                  }`}
                >
                  <span className="font-bold text-slate-200 block text-[11px]">{style.name}</span>
                  <span className="text-[9px] text-slate-400">{style.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Content Fine-Tuning & Personal IP Branding */}
      {stepTab === 'step3' && (
        <div className="flex flex-col gap-3.5 max-h-[380px] overflow-y-auto pr-1">
          {/* Layout & Font Controls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                <Layout className="w-3 h-3 text-amber-400" />
                <span>卡片比例</span>
              </label>
              <div className="grid grid-cols-2 gap-1">
                {ratioOptions.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => onUpdateConfig({ ...cardConfig, ratio: r.id as any })}
                    className={`py-1 text-[11px] font-bold rounded-lg border ${
                      cardConfig.ratio === r.id
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                <GitFork className="w-3 h-3 text-amber-400" />
                <span>布局结构</span>
              </label>
              <div className="grid grid-cols-2 gap-1">
                {layoutModeOptions.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => onUpdateConfig({ ...cardConfig, layoutMode: l.id as any })}
                    className={`py-1 text-[10px] font-bold rounded-lg border ${
                      (cardConfig.layoutMode || 'list') === l.id
                        ? 'bg-amber-400 text-slate-950 border-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Theme & Fonts */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                <Palette className="w-3 h-3 text-amber-400" />
                <span>纸张主题</span>
              </label>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {themeOptions.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => onUpdateConfig({ ...cardConfig, theme: t.id as any })}
                    className={`px-2 py-1 text-[10px] rounded-lg border shrink-0 ${
                      cardConfig.theme === t.id
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 flex items-center gap-1">
                <Type className="w-3 h-3 text-amber-400" />
                <span>艺术字体</span>
              </label>
              <div className="flex gap-1 overflow-x-auto pb-1">
                {fontOptions.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onUpdateConfig({ ...cardConfig, font: f.id as any })}
                    className={`px-2 py-1 text-[10px] rounded-lg border shrink-0 ${
                      cardConfig.font === f.id
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-400'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Inputs */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 block">卡片主标题</label>
              <input
                type="text"
                value={cardData.bookTitle}
                onChange={(e) => onUpdateCardData({ bookTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:border-amber-400 outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 block">核心金句</label>
              <textarea
                rows={2}
                value={cardData.quote}
                onChange={(e) => onUpdateCardData({ quote: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 focus:border-amber-400 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-bold text-slate-400 mb-1 block">博主/IP名称</label>
                <input
                  type="text"
                  value={cardData.creatorName || ''}
                  onChange={(e) => onUpdateCardData({ creatorName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-100 focus:border-amber-400 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 mb-1 block">IP头衔/描述</label>
                <input
                  type="text"
                  value={cardData.creatorTitle || ''}
                  onChange={(e) => onUpdateCardData({ creatorTitle: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-100 focus:border-amber-400 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
