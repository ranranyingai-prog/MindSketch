import React, { useState } from 'react';
import { Key, X, Check, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('IMAGE_GEN_API_KEY') || '');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('IMAGE_GEN_API_KEY', apiKey.trim());
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-5 max-w-md w-full shadow-2xl flex flex-col gap-4 text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 font-kuaile text-amber-300 text-base font-bold">
            <Key className="w-5 h-5 text-amber-400" />
            <span>云端 AI 生图 API 配置</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-full transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          填写你的 <strong className="text-amber-300">SiliconFlow / OpenAI Key</strong> 可解锁云端高画质 AI 扩散模型图像生图。未配置 Key 时，系统默认使用高保真 <strong className="text-amber-300">DOM 矢量渲染</strong>。
        </p>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-400">API Key 凭证</label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>密钥仅保存在你本机的浏览器缓存中</span>
          <a
            href="https://siliconflow.cn"
            target="_blank"
            rel="noreferrer"
            className="text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>获取免费 Key</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs shadow transition-all flex items-center justify-center gap-1.5"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-950" /> : null}
            <span>{isSaved ? '保存成功！' : '保存本地凭证'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
