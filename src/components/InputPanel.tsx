import React, { useState } from 'react';
import type { CardData } from '../types/card';
import { ZHIKA_CARD_STYLES } from '../data/styles';

interface InputPanelProps {
  cardData: CardData;
  onUpdateCardData: (updated: Partial<CardData>) => void;
  onAIGenerate: (prompt: string) => Promise<void>;
  onGenerateAIImage: (styleId: string) => Promise<void>;
  isGeneratingAI: boolean;
  isGeneratingImage: boolean;
  selectedStyleId: string;
  onSelectStyleId: (styleId: string) => void;
}

export const InputPanel: React.FC<InputPanelProps> = ({
  cardData,
  onUpdateCardData,
  onAIGenerate,
  onGenerateAIImage,
  isGeneratingAI,
  isGeneratingImage,
  selectedStyleId,
  onSelectStyleId
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'styles' | 'ip' | 'apikeys'>('content');
  const [aiInputText, setAiInputText] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('IMAGE_GEN_API_KEY') || '');

  const handleSaveApiKey = () => {
    localStorage.setItem('IMAGE_GEN_API_KEY', apiKeyInput.trim());
    alert('API Key 已保存至本地缓存！');
  };

  return (
    <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 shadow-2xl text-slate-100 flex flex-col gap-5">
      {/* Tab Switcher Header */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-2xl border border-slate-800/80">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'content'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>✍️ 内容编辑</span>
        </button>

        <button
          onClick={() => setActiveTab('styles')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'styles'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>🎨 24+ AI风格</span>
        </button>

        <button
          onClick={() => setActiveTab('ip')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'ip'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>👤 个人IP</span>
        </button>

        <button
          onClick={() => setActiveTab('apikeys')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'apikeys'
              ? 'bg-amber-400 text-slate-950 shadow-md font-black'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>⚙️ 云端API</span>
        </button>
      </div>

      {/* Tab 1: Content Generation & Custom Extra Fields */}
      {activeTab === 'content' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
            <label className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
              <span>🪄 AI 智能提炼（输入书名/主题或粘贴长文）</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                placeholder="例如：《原则》、《被讨厌的勇气》或输入的学习总结..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
              <button
                disabled={isGeneratingAI || !aiInputText.trim()}
                onClick={() => onAIGenerate(aiInputText)}
                className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md disabled:opacity-50 transition-all flex items-center gap-1 flex-shrink-0"
              >
                {isGeneratingAI ? '提炼中...' : '一键提炼'}
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 block">书名 / 标题</label>
              <input
                type="text"
                value={cardData.bookTitle}
                onChange={(e) => onUpdateCardData({ bookTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 block">作者 / 出处</label>
              <input
                type="text"
                value={cardData.author}
                onChange={(e) => onUpdateCardData({ author: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 block">分类标签</label>
              <input
                type="text"
                value={cardData.category}
                onChange={(e) => onUpdateCardData({ category: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 block">适合人群/场景标签</label>
              <input
                type="text"
                value={cardData.targetAudienceTag || ''}
                onChange={(e) => onUpdateCardData({ targetAudienceTag: e.target.value })}
                placeholder="适合：职场迷茫期 / 团队管理者"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 mb-1 block">核心金句</label>
            <textarea
              rows={2}
              value={cardData.quote}
              onChange={(e) => onUpdateCardData({ quote: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-amber-400 outline-none resize-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 mb-1 block">反直觉洞察 / 避坑指南</label>
            <input
              type="text"
              value={cardData.counterIntuitiveInsight || ''}
              onChange={(e) => onUpdateCardData({ counterIntuitiveInsight: e.target.value })}
              placeholder="例如：反直觉：知而不行等同于未知，小步快跑胜过完美规划。"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 mb-1 block">落地赋能指南</label>
            <input
              type="text"
              value={cardData.actionTip}
              onChange={(e) => onUpdateCardData({ actionTip: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-amber-400 outline-none"
            />
          </div>
        </div>
      )}

      {/* Tab 2: 24+ AI Styles Selector */}
      {activeTab === 'styles' && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400">选择 Zhika 精选手绘风格（共 24 种）</span>
            <button
              disabled={isGeneratingImage}
              onClick={() => onGenerateAIImage(selectedStyleId)}
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all flex items-center gap-1"
            >
              {isGeneratingImage ? '✨ AI 渲染中...' : '✨ 生成 AI 图文'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[320px] overflow-y-auto pr-1">
            {ZHIKA_CARD_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => onSelectStyleId(style.id)}
                className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedStyleId === style.id
                    ? 'border-amber-400 bg-slate-800/90 shadow-md ring-2 ring-amber-400/30'
                    : 'border-slate-800 bg-slate-950/60 hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <span className="text-xs font-black text-slate-100 block">{style.name}</span>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-1 leading-tight">
                    {style.description}
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-800 text-amber-300 font-bold">
                    {style.category}
                  </span>
                  {selectedStyleId === style.id && (
                    <span className="text-amber-400 text-xs font-bold">✓ 已选</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: IP Personal Branding */}
      {activeTab === 'ip' && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 block">博主/IP名称</label>
              <input
                type="text"
                value={cardData.creatorName || ''}
                onChange={(e) => onUpdateCardData({ creatorName: e.target.value })}
                placeholder="智卡知识精选"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 mb-1 block">IP 称号/描述</label>
              <input
                type="text"
                value={cardData.creatorTitle || ''}
                onChange={(e) => onUpdateCardData({ creatorTitle: e.target.value })}
                placeholder="知识炼金博主 · 50万+阅读"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 mb-1 block">头像 URL</label>
            <input
              type="text"
              value={cardData.avatarUrl || ''}
              onChange={(e) => onUpdateCardData({ avatarUrl: e.target.value })}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 mb-1 block">公众号/微信二维码 URL</label>
            <input
              type="text"
              value={cardData.qrCodeUrl || ''}
              onChange={(e) => onUpdateCardData({ qrCodeUrl: e.target.value })}
              placeholder="https://..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:border-amber-400 outline-none"
            />
          </div>
        </div>
      )}

      {/* Tab 4: Cloud API Config */}
      {activeTab === 'apikeys' && (
        <div className="flex flex-col gap-3">
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
            <label className="text-xs font-bold text-amber-400 block mb-1">
              🔑 SiliconFlow / OpenAI API Key（用于 AI 图像绘制）
            </label>
            <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
              输入 API Key 后即可体验云端 Flux.1 / DALL-E 3 高清绘制。未填 Key 时系统自动使用矢量 DOM 渲染引擎。
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk-..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={handleSaveApiKey}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all"
              >
                保存 Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
