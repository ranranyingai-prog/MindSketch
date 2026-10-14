import React, { useState, useEffect } from 'react';
import type { CardData, KeyPoint } from '../types/card';
import { BOOK_PRESETS } from '../data/bookPresets';
import { getAiConfig, saveAiConfig, generateCardFromAi, type AiConfig } from '../services/aiService';
import {
  Sparkles,
  BookOpen,
  Edit3,
  Plus,
  Trash2,
  Wand2,
  Settings,
  X,
  Loader2,
  CheckCircle2,
  BookMarked,
  FileText,
} from 'lucide-react';

interface InputPanelProps {
  cardData: CardData;
  onChange: (data: CardData) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({ cardData, onChange }) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'preset' | 'custom'>('ai');
  const [aiMode, setAiMode] = useState<'book' | 'text'>('book');
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  // AI Config modal state
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [aiConfig, setAiConfig] = useState<AiConfig>({
    apiKey: '',
    baseUrl: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
  });

  useEffect(() => {
    setAiConfig(getAiConfig());
  }, []);

  const handleSaveConfig = () => {
    saveAiConfig(aiConfig);
    setShowConfigModal(false);
    setStatusMsg({ type: 'success', text: '大模型配置已保存！' });
    setTimeout(() => setStatusMsg(null), 3000);
  };

  // Handle AI Card Generation
  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setStatusMsg({ type: 'error', text: aiMode === 'book' ? '请输入书名或主题' : '请输入要提炼的文字内容' });
      return;
    }

    setIsGenerating(true);
    setStatusMsg(null);

    try {
      const result = await generateCardFromAi(inputText, aiMode, aiConfig);
      onChange({
        ...cardData,
        ...result,
      });
      setStatusMsg({ type: 'success', text: '手绘卡片生成成功！' });
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: any) {
      console.error(err);
      setStatusMsg({ type: 'error', text: err.message || '生成卡片失败，请重试' });
    } finally {
      setIsGenerating(false);
    }
  };

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
    const renumbered = updated.map((item, i) => ({ ...item, num: String(i + 1) }));
    onChange({ ...cardData, keyPoints: renumbered });
  };

  return (
    <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl text-slate-100 backdrop-blur-md relative">
      {/* Top Header with AI Settings Icon */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-amber-400" />
          <h2 className="font-bold text-sm sm:text-base text-slate-100 font-kuaile tracking-wide">
            卡片内容生成与编辑
          </h2>
        </div>
        <button
          onClick={() => setShowConfigModal(true)}
          className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-slate-900/80 px-2.5 py-1.5 rounded-lg border border-slate-700 hover:border-amber-500/50 transition-all"
          title="配置大模型 API Key"
        >
          <Settings className="w-3.5 h-3.5" />
          <span>大模型设置</span>
          {aiConfig.apiKey && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block ml-0.5" />
          )}
        </button>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex bg-slate-900/80 p-1 rounded-xl mb-4 border border-slate-700/60 font-medium text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'ai'
              ? 'bg-amber-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI一键生成</span>
        </button>

        <button
          onClick={() => setActiveTab('preset')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'preset'
              ? 'bg-amber-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>爆款书单Preset</span>
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
          <span>自由修改</span>
        </button>
      </div>

      {/* Status Alert Banner */}
      {statusMsg && (
        <div
          className={`mb-3 p-2.5 rounded-xl text-xs flex items-center gap-2 ${
            statusMsg.type === 'error'
              ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
              : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
          }`}
        >
          {statusMsg.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span className="flex-1">{statusMsg.text}</span>
        </div>
      )}

      {/* Tab 1: AI Generation (Book Title OR Raw Text) */}
      {activeTab === 'ai' && (
        <div className="space-y-3.5">
          {/* Sub-mode selector: Book Title vs Long Text */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                setAiMode('book');
                setInputText('');
              }}
              className={`flex-1 p-2 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition-all ${
                aiMode === 'book'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:bg-slate-900'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>输入任意书名/主题</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAiMode('text');
                setInputText('');
              }}
              className={`flex-1 p-2 rounded-lg border text-xs flex items-center justify-center gap-1.5 transition-all ${
                aiMode === 'text'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:bg-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>粘贴长文/读书笔记提炼</span>
            </button>
          </div>

          {/* Input Box based on aiMode */}
          {aiMode === 'book' ? (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                输入想生成的书名或培训主题：
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="如: 《原则》、《非暴力沟通》、《金字塔原理》或 目标管理"
                  className="flex-1 p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-amber-500 text-slate-100 placeholder:text-slate-500"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                粘贴读书笔记、课程大纲或宣传文案：
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                placeholder="在此粘贴任意文章、会议记录、培训大纲或金句笔记..."
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-amber-500 text-slate-100 placeholder:text-slate-500 resize-y"
              />
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !inputText.trim()}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>智能提炼中...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>一键生成手绘风格图文</span>
              </>
            )}
          </button>

          {!aiConfig.apiKey && (
            <p className="text-[11px] text-slate-400 text-center italic">
              💡 提示：当前未绑定 API Key，将使用内置智能提炼；可点击右上角“大模型设置”连接 DeepSeek/OpenAI。
            </p>
          )}
        </div>
      )}

      {/* Tab 2: Bestseller Book Presets */}
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

      {/* Content Form Editor (Always accessible or on Custom Tab) */}
      <div className="mt-4 pt-4 border-t border-slate-700/60 space-y-3">
        <div className="font-bold text-xs text-amber-400 tracking-wider uppercase font-kuaile flex items-center justify-between">
          <span>📝 卡片各个字段细节调整</span>
          <span className="text-[10px] text-slate-400">实时修改即时同步预览</span>
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
          <label className="block text-[11px] text-slate-400 mb-1">核心金句 (带荧光笔高亮)</label>
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
            <label className="text-[11px] text-slate-400 font-medium">知识干货清单要点</label>
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
                    placeholder="要点标题"
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
                  placeholder="要点说明..."
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

      {/* Modal Dialog: LLM Config */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-slate-100 text-base font-kuaile">
                  大模型 API 接口配置
                </h3>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-slate-400 hover:text-slate-200 p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              配置你的 DeepSeek / OpenAI 或兼容格式大模型密钥，开启高清全自动知识图文卡片提炼。
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">API Key 密钥</label>
                <input
                  type="password"
                  value={aiConfig.apiKey}
                  onChange={(e) => setAiConfig({ ...aiConfig, apiKey: e.target.value })}
                  placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-amber-500 text-slate-100 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Base URL 接口地址</label>
                <input
                  type="text"
                  value={aiConfig.baseUrl}
                  onChange={(e) => setAiConfig({ ...aiConfig, baseUrl: e.target.value })}
                  placeholder="https://api.deepseek.com/v1"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-amber-500 text-slate-100 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Model 模型名称</label>
                <input
                  type="text"
                  value={aiConfig.model}
                  onChange={(e) => setAiConfig({ ...aiConfig, model: e.target.value })}
                  placeholder="deepseek-chat 或 gpt-4o-mini"
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl focus:outline-none focus:border-amber-500 text-slate-100 font-mono text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium"
              >
                取消
              </button>
              <button
                onClick={handleSaveConfig}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold"
              >
                保存设置
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
