import React from 'react';
import type { CardData, CardConfig } from '../types/card';
import { CARD_TEMPLATES, matchBestTemplate, type CardTemplate } from '../data/templates';
import { Sparkles, Check, LayoutTemplate, Wand2 } from 'lucide-react';

interface TemplateSelectorProps {
  cardData: CardData;
  activeConfig: CardConfig;
  onSelectTemplate: (template: CardTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  cardData,
  activeConfig,
  onSelectTemplate,
}) => {
  const matchedBest = matchBestTemplate(cardData);

  const isSelected = (template: CardTemplate) => {
    return (
      activeConfig.theme === template.config.theme &&
      activeConfig.font === template.config.font &&
      activeConfig.ratio === template.config.ratio
    );
  };

  return (
    <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl text-slate-100 backdrop-blur-md space-y-3.5">
      <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
        <div className="flex items-center gap-2">
          <LayoutTemplate className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-sm sm:text-base text-slate-100 font-kuaile">
            内置高颜值卡片模板库
          </h3>
        </div>

        <button
          onClick={() => onSelectTemplate(matchedBest)}
          className="text-xs bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl shadow flex items-center gap-1 transition-all active:scale-95"
          title="根据当前卡片内容自动智能配对最佳版式"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>AI智能一键配对</span>
        </button>
      </div>

      <p className="text-xs text-slate-400">
        已为你匹配最适合当前文字排版的模板，点击下方卡片可直接切换整体风格与尺寸：
      </p>

      {/* Grid of Templates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
        {CARD_TEMPLATES.map((tmpl) => {
          const active = isSelected(tmpl);
          const isAiMatch = matchedBest.id === tmpl.id;

          return (
            <button
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl)}
              className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                active
                  ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/60 shadow-lg'
                  : 'bg-slate-900/60 border-slate-700/80 hover:border-slate-500 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-1.5 absolute top-2.5 right-2.5">
                {isAiMatch && (
                  <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow">
                    <Sparkles className="w-3 h-3" />
                    <span>AI最推荐</span>
                  </span>
                )}
                <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded-full font-medium">
                  {tmpl.badge}
                </span>
              </div>

              <div>
                <div className="font-bold text-sm text-amber-300 font-kuaile flex items-center gap-1.5 pr-20">
                  {active && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                  <span>{tmpl.name}</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 leading-snug line-clamp-2">
                  {tmpl.desc}
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                  比例: {tmpl.config.ratio}
                </span>
                <span className="bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                  主题: {tmpl.config.theme}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
