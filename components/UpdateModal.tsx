
import React from 'react';
import { updateLog } from '../updates';

interface UpdateModalProps {
  onClose: () => void;
  t: (key: string) => string;
}

export const UpdateModal: React.FC<UpdateModalProps> = ({ onClose, t }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4 z-50 backdrop-blur-sm">
      <div className="bg-[#fffbf0] rounded-xl shadow-2xl border-4 border-red-500 w-full max-w-xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="bg-red-500 p-4 shadow-md">
            <h2 className="text-3xl font-bold text-center text-white font-mono tracking-widest uppercase">{t('WHATS_NEW')}</h2>
        </div>
        
        <div className="space-y-4 p-4 overflow-y-auto custom-scrollbar flex-grow bg-[#fffbf0]">
          {updateLog.map((update, index) => (
            <div key={update.version} className="bg-white rounded-lg border-2 border-red-100 shadow-sm overflow-hidden">
              <div className="bg-red-50 p-3 border-b border-red-100 flex justify-between items-center">
                  <span className="font-bold text-red-800">{t('VERSION')} {update.version}</span>
                  {index === 0 && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">LATEST</span>}
              </div>
              
              <div className="p-4 space-y-4">
                  {update.additions && update.additions.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <span className="bg-green-100 p-1 rounded">➕</span> {t('ADDITIONS')}
                      </h3>
                      <ul className="space-y-2">
                        {update.additions.map((item, idx) => (
                          <li key={`add-${update.version}-${idx}`} className="text-sm text-gray-700 pl-2 border-l-2 border-green-200">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {update.changes && update.changes.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <span className="bg-orange-100 p-1 rounded">🔧</span> {t('CHANGES')}
                      </h3>
                      <ul className="space-y-2">
                        {update.changes.map((item, idx) => (
                          <li key={`change-${update.version}-${idx}`} className="text-sm text-gray-700 pl-2 border-l-2 border-orange-200">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-red-100">
            <button
            onClick={onClose}
            className="w-full py-3 bg-slate-700 text-white font-bold rounded-lg shadow-md hover:bg-slate-600 active:translate-y-1 active:shadow-none border-b-4 border-slate-900 transition-all uppercase tracking-widest text-sm"
            >
            {t('BACK')}
            </button>
        </div>
      </div>
    </div>
  );
};
