
import React, { useState } from 'react';

interface SettingsModalProps {
  onClose: () => void;
  t: (key: string, options?: { [key: string]: string | number }) => string;
  isFullscreen: boolean;
  onToggleFullscreen: (isMobile: boolean) => void;
  onRedeemCode: (code: string) => { success: boolean; message: string };
}

const isMobileDevice = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const SettingsModal: React.FC<SettingsModalProps> = ({
  onClose,
  t,
  isFullscreen,
  onToggleFullscreen,
  onRedeemCode
}) => {
  const isMobile = isMobileDevice();
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  const handleRedeem = () => {
      if (!code.trim()) return;
      const result = onRedeemCode(code.trim().toUpperCase());
      setMessage({ text: result.message, type: result.success ? 'success' : 'error' });
      setCode('');
      setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 z-50 backdrop-blur-sm">
      <div className="bg-[#fffbf0] p-6 rounded-xl shadow-2xl border-4 border-slate-600 w-full max-w-md relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-slate-600"></div>
        
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6 font-mono border-b-2 border-slate-200 pb-4">{t('SETTING')}</h2>
        
        <div className="space-y-4">
            <div className="p-4 border-2 border-slate-200 rounded-xl bg-white hover:border-blue-300 transition-colors">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">{t('DISPLAY')}</h3>
                {isMobile ? (
                  <button
                    onClick={() => onToggleFullscreen(true)}
                    className="w-full py-3 text-sm text-white font-bold bg-blue-500 hover:bg-blue-600 border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 rounded-lg transition-all"
                  >
                    {isFullscreen ? t('EXIT_FULLSCREEN') : t('ENTER_MOBILE_FULLSCREEN')}
                  </button>
                ) : (
                  <button
                    onClick={() => onToggleFullscreen(false)}
                    className="w-full py-3 text-sm text-white font-bold bg-blue-500 hover:bg-blue-600 border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 rounded-lg transition-all"
                  >
                    {isFullscreen ? t('EXIT_FULLSCREEN') : t('ENTER_FULLSCREEN')}
                  </button>
                )}
                 <p className="text-xs text-center text-slate-400 mt-2 font-mono">
                    {isMobile ? t('MOBILE_FULLSCREEN_HINT') : t('FULLSCREEN_SHORTCUT_HINT')}
                 </p>
            </div>

            {/* Redeem Code Section */}
            <div className="p-4 border-2 border-slate-200 rounded-xl bg-white hover:border-green-300 transition-colors">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Redeem Code</h3>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter Code"
                        className="flex-grow bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono uppercase focus:outline-none focus:border-green-500"
                    />
                    <button 
                        onClick={handleRedeem}
                        className="bg-green-600 text-white font-bold px-4 py-2 rounded-lg text-sm border-b-4 border-green-800 active:border-b-0 active:translate-y-1"
                    >
                        CLAIM
                    </button>
                </div>
                {message && (
                    <p className={`text-xs mt-2 font-bold ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                        {message.text}
                    </p>
                )}
            </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full py-3 bg-slate-700 text-white font-bold rounded-lg shadow-md hover:bg-slate-600 active:translate-y-1 active:shadow-none border-b-4 border-slate-900 transition-all uppercase tracking-widest text-sm"
        >
          {t('BACK')}
        </button>
      </div>
    </div>
  );
};
