import React from 'react';
import type { CardConfig, CardData, CardTheme, CardFont, CardRatio, MarkerColor } from '../types/card';
import type { CardTemplate } from '../data/templates';
import { TemplateSelector } from './TemplateSelector';
import { Palette, Type, Layout, Download, Check, Highlighter, Sliders } from 'lucide-react';

interface CustomizerPanelProps {
  cardData: CardData;
  config: CardConfig;
  onChange: (config: CardConfig) => void;
  onExport: () => void;
  isExporting: boolean;
}

export const CustomizerPanel: React.FC<CustomizerPanelProps> = ({
  cardData,
  config,
  onChange,
  onExport,
  isExporting,
}) => {
  const [subTab, setSubTab] = React.useState<'templates' | 'customize'>('templates');

  const themeOptions: { id: CardTheme; label: string; bg: string; border: string }[] = [
    { id: 'kraft', label: '牛皮复古', bg: 'bg-[#f5e8d0]', border: 'border-amber-800' },
    { id: 'cute', label: '萌趣便签', bg: 'bg-[#fff9eb]', border: 'border-amber-400' },
    { id: 'chalkboard', label: '黑板板书', bg: 'bg-[#242e2b]', border: 'border-emerald-500' },
    { id: 'grid', label: '极简方格', bg: 'bg-[#fbf9f4]', border: 'border-slate-800' },
    { id: 'minimal', label: '素雅质感', bg: 'bg-stone-100', border: 'border-stone-800' },
  ];

  const fontOptions: { id: CardFont; label: string; sampleFont: string }[] = [
    { id: 'kuaile', label: '快乐手绘体', sampleFont: 'font-kuaile' },
    { id: 'mashan', label: '马山毛笔体', sampleFont: 'font-mashan' },
    { id: 'longcang', label: '龙苍草书体', sampleFont: 'font-longcang' },
    { id: 'patrick', label: 'Patrick 英语体', sampleFont: 'font-patrick' },
  ];

  const ratioOptions: { id: CardRatio; label: string; sub: string }[] = [
    { id: '3:4', label: '3:4', sub: '小红书卡片' },
    { id: '1:1', label: '1:1', sub: '朋友圈/Square' },
    { id: '9:16', label: '9:16', sub: '海报/Stories' },
    { id: 'auto', label: 'Auto', sub: '自适应长图' },
  ];

  const markerOptions: { id: MarkerColor; label: string; class: string }[] = [
    { id: 'yellow', label: '柠檬黄', class: 'bg-yellow-200 border-yellow-400' },
    { id: 'green', label: '薄荷绿', class: 'bg-emerald-200 border-emerald-400' },
    { id: 'pink', label: '樱花粉', class: 'bg-pink-200 border-pink-400' },
    { id: 'cyan', label: '天空蓝', class: 'bg-cyan-200 border-cyan-400' },
  ];

  const handleSelectTemplate = (template: CardTemplate) => {
    onChange({
      ...config,
      ...template.config,
    });
  };

  return (
    <div className="space-y-4">
      {/* Sub-tab navigation: Template Library vs Micro-adjustments */}
      <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-700/80 font-medium text-xs">
        <button
          type="button"
          onClick={() => setSubTab('templates')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            subTab === 'templates'
              ? 'bg-amber-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>内置模板库 (一键切换)</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('customize')}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            subTab === 'customize'
              ? 'bg-amber-500 text-slate-950 font-bold shadow'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>微调参数 (字号/色彩/贴纸)</span>
        </button>
      </div>

      {subTab === 'templates' ? (
        <TemplateSelector
          cardData={cardData}
          activeConfig={config}
          onSelectTemplate={handleSelectTemplate}
        />
      ) : (
        <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl text-slate-100 backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
            <div className="font-bold text-sm text-amber-400 font-kuaile flex items-center gap-1.5">
              <Sliders className="w-4 h-4" />
              <span>视觉与手绘微调面板</span>
            </div>
            <button
              onClick={onExport}
              disabled={isExporting}
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg transition-all flex items-center gap-1.5 text-xs sm:text-sm active:scale-95 disabled:opacity-50"
            >
              {isExporting ? (
                <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isExporting ? '生成中...' : '高清导出图片'}</span>
            </button>
          </div>

          {/* 1. Card Layout Aspect Ratio */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Layout className="w-3.5 h-3.5 text-amber-400" />
              <span>比例尺寸 (适配社交媒体)</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {ratioOptions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => onChange({ ...config, ratio: r.id })}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    config.ratio === r.id
                      ? 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400 text-amber-300'
                      : 'bg-slate-900/60 border-slate-700 hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs">{r.label}</div>
                  <div className="text-[10px] text-slate-400 scale-90">{r.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Paper & Blackboard Theme */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>纸张材质与配色主题</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {themeOptions.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onChange({ ...config, theme: t.id })}
                  className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                    config.theme === t.id
                      ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105'
                      : 'border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg ${t.bg} border ${t.border} shadow-inner flex items-center justify-center`}>
                    {config.theme === t.id && <Check className="w-3.5 h-3.5 text-slate-900 stroke-[3]" />}
                  </div>
                  <span className="text-[10px] text-slate-300 font-medium">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Hand-drawn Font Style */}
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span>手绘艺术字体</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {fontOptions.map((f) => (
                <button
                  key={f.id}
                  onClick={() => onChange({ ...config, font: f.id })}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    config.font === f.id
                      ? 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400 text-amber-300'
                      : 'bg-slate-900/60 border-slate-700 hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div className={`text-sm font-bold ${f.sampleFont}`}>{f.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Marker Highlighter Color & Decor Toggles */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1 mb-1.5">
                <Highlighter className="w-3.5 h-3.5 text-amber-400" />
                <span>荧光划线强调色</span>
              </label>
              <div className="flex gap-1.5">
                {markerOptions.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onChange({ ...config, markerColor: m.id })}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${m.class} ${
                      config.markerColor === m.id ? 'ring-2 ring-amber-400 scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    title={m.label}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1.5">
                手绘贴纸装饰开关
              </label>
              <div className="flex items-center gap-3 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showTape}
                    onChange={(e) => onChange({ ...config, showTape: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700"
                  />
                  <span>胶带</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showStamp}
                    onChange={(e) => onChange({ ...config, showStamp: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700"
                  />
                  <span>印章</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.showDoodleArrows}
                    onChange={(e) => onChange({ ...config, showDoodleArrows: e.target.checked })}
                    className="rounded text-amber-500 focus:ring-amber-500 bg-slate-900 border-slate-700"
                  />
                  <span>涂鸦</span>
                </label>
              </div>
            </div>
          </div>

          {/* Font Size Sliders */}
          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-700/60">
            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>标题字号</span>
                <span>{config.titleFontSize}px</span>
              </div>
              <input
                type="range"
                min={18}
                max={32}
                value={config.titleFontSize}
                onChange={(e) => onChange({ ...config, titleFontSize: Number(e.target.value) })}
                className="w-full accent-amber-500 bg-slate-900 rounded-lg cursor-pointer h-1.5"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>正文字号</span>
                <span>{config.bodyFontSize}px</span>
              </div>
              <input
                type="range"
                min={12}
                max={20}
                value={config.bodyFontSize}
                onChange={(e) => onChange({ ...config, bodyFontSize: Number(e.target.value) })}
                className="w-full accent-amber-500 bg-slate-900 rounded-lg cursor-pointer h-1.5"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
