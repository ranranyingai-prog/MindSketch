import React, { useState } from 'react';
import type { CardData, KeyPoint } from '../types/card';
import { BOOK_PRESETS, parseUnstructuredTextToCard } from '../data/bookPresets';
import { Sparkles, BookOpen, Edit3, Plus, Trash2, Wand2 } from 'lucide-react';

interface InputPanelProps {
  cardData: CardData;
  onChange: (data: CardData) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({ cardData, onChange }) => {
  const [activeTab, setActiveTab] = useState<'preset' | 'custom' | 'smart'>('preset');
  const [rawText, setRawText] = useState('');

  // Handle Preset Selection
  const handleSelectPreset = (presetId: string) => {
    const preset = BOOK_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      onChange({
        bookTitle: preset.bookTitle,
        author: preset.author,
        category: preset.category,
        quote: preset.quote,
        keyPoints: preset.keyPoints,
        actionTip: preset.actionTip,
        footerTag: '手绘读书笔记',
        stampText: preset.stampText,
      });
    }
  };

  // Handle Smart Text Synthesis
  const handleSynthesizeText = () => {
    if (!rawText.trim()) return;
    const parsed = parseUnstructuredTextToCard(rawText);
    onChange({
      ...cardData,
      bookTitle: parsed.bookTitle,
      author: parsed.author,
      quote: parsed.quote,
      keyPoints: parsed.keyPoints,
      actionTip: parsed.actionTip,
    });
  };

  // Key Point Handlers
  const handleAddKeyPoint = () => {
    const newPoints = [
      ...cardData.keyPoints,
      {
        num: String(cardData.keyPoints.length + 1),
        title: `干货要点 ${cardData.keyPoints.length + 1}`,
        desc: '在此输入具体的金句或洞察说明...',
      },
    ];
    onChange({ ...cardData, keyPoints: newPoints });
  };

  const handleUpdateKeyPoint = (index: number, field: keyof KeyPoint, value: string) => {
    const updated = [...cardData.keyPoints];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...cardData, keyPoints: updated });
  };

  const handleRemoveKeyPoint = (index: number) => {
    const updated = cardData.keyPoints.filter((_, i) => i !== index);
    // Renumber
    const renumbered = updated.map((item, i) => ({ ...item, num: String(i + 1) }));
    onChange({ ...cardData, keyPoints: renumbered });
  };

  return (
    <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl text-slate-100 backdrop-blur-md">
      {/* Mode Navigation Tabs */}
      <div className="flex bg-slate-900/80 p-1 rounded-xl mb-4 border border-slate-700/60 font-medium text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('preset')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'preset'
              ? 'bg-amber-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>畅销书精选</span>
        </button>

        <button
          onClick={() => setActiveTab('smart')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'smart'
              ? 'bg-amber-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wand2 className="w-4 h-4" />
          <span>智能文本提取</span>
        </button>

        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'custom'
              ? 'bg-amber-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>自由细调</span>
        </button>
      </div>

      {/* Tab 1: Book Presets */}
      {activeTab === 'preset' && (
        <div className="space-y-3">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>点击快速载入大咖爆款书单手绘图文卡片：</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {BOOK_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`p-3 text-left rounded-xl border transition-all flex flex-col justify-between ${
                  cardData.bookTitle === preset.bookTitle
                    ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500'
                    : 'bg-slate-900/50 border-slate-700/60 hover:border-slate-500 hover:bg-slate-900'
                }`}
              >
                <div>
                  <div className="font-bold text-sm text-amber-300 font-kuaile">
                    {preset.bookTitle}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {preset.author} · {preset.category}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mt-2 line-clamp-1 italic">
                  “{preset.quote}”
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Smart Text AI Synthesis */}
      {activeTab === 'smart' && (
        <div className="space-y-3">
          <label className="block text-xs font-medium text-slate-300">
            粘贴一段读书笔记、培训金句或文字大纲：
          </label>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            rows={5}
            placeholder="例如:
《原则》达利欧
极度求真与极度透明。
1. 拥抱现实并妥善应对：现实不因个人喜好改变。
2. 痛苦 + 反思 = 进步：从每一次挫折中吸取教训。
建议: 建立每日反思清单，记录失误并制定针对策略。"
            className="w-[100%] p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-amber-500 text-slate-100 placeholder:text-slate-500 resize-y"
          />
          <button
            onClick={handleSynthesizeText}
            disabled={!rawText.trim()}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            <span>智能解析生成手绘卡片</span>
          </button>
        </div>
      )}

      {/* Tab 3: Detailed Custom Manual Edit */}
      {(activeTab === 'custom' || activeTab === 'preset' || activeTab === 'smart') && (
        <div className="mt-4 pt-4 border-t border-slate-700/60 space-y-3">
          <div className="font-bold text-xs text-amber-400 tracking-wider uppercase font-kuaile flex items-center justify-between">
            <span>📝 内容字段手动微调</span>
            <span className="text-[10px] text-slate-400">可随时修改下方每个板块</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">标题 / 书名</label>
              <input
                type="text"
                value={cardData.bookTitle}
                onChange={(e) => onChange({ ...cardData, bookTitle: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:border-amber-500 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">作者 / 出处</label>
              <input
                type="text"
                value={cardData.author}
                onChange={(e) => onChange({ ...cardData, author: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:border-amber-500 text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">主题分类标签</label>
              <input
                type="text"
                value={cardData.category}
                onChange={(e) => onChange({ ...cardData, category: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:border-amber-500 text-slate-100"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">手绘印章文字</label>
              <input
                type="text"
                value={cardData.stampText}
                onChange={(e) => onChange({ ...cardData, stampText: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:border-amber-500 text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">核心金句 (带荧光笔效果)</label>
            <textarea
              value={cardData.quote}
              onChange={(e) => onChange({ ...cardData, quote: e.target.value })}
              rows={2}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:border-amber-500 text-slate-100 resize-none"
            />
          </div>

          {/* Key Points list editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] text-slate-400 font-medium">知识要点 (干货清单)</label>
              <button
                type="button"
                onClick={handleAddKeyPoint}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold"
              >
                <Plus className="w-3 h-3" />
                <span>添加要点</span>
              </button>
            </div>

            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {cardData.keyPoints.map((point, idx) => (
                <div key={idx} className="p-2 bg-slate-900/80 border border-slate-700/80 rounded-lg space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.5 font-bold rounded">
                      #{idx + 1}
                    </span>
                    <input
                      type="text"
                      value={point.title}
                      placeholder="要点小标题"
                      onChange={(e) => handleUpdateKeyPoint(idx, 'title', e.target.value)}
                      className="flex-1 px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs focus:border-amber-500 text-slate-100"
                    />
                    <button
                      onClick={() => handleRemoveKeyPoint(idx)}
                      className="p-1 text-rose-400 hover:text-rose-300 hover:bg-slate-800 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    value={point.desc}
                    placeholder="要点详细描述..."
                    rows={2}
                    onChange={(e) => handleUpdateKeyPoint(idx, 'desc', e.target.value)}
                    className="w-full p-1.5 bg-slate-950 border border-slate-700 rounded text-xs focus:border-amber-500 text-slate-100 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">落地行动指南 (Action Tip)</label>
            <input
              type="text"
              value={cardData.actionTip}
              onChange={(e) => onChange({ ...cardData, actionTip: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:border-amber-500 text-slate-100"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">底部署名 / 品牌水印</label>
            <input
              type="text"
              value={cardData.footerTag}
              onChange={(e) => onChange({ ...cardData, footerTag: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs focus:border-amber-500 text-slate-100"
            />
          </div>
        </div>
      )}
    </div>
  );
};
