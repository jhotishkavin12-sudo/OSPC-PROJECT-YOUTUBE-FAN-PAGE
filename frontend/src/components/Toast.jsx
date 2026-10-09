import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/40 shadow-emerald-500/10',
    error: 'border-rose-500/40 shadow-rose-500/10',
    warning: 'border-amber-500/40 shadow-amber-500/10',
    info: 'border-cyan-500/40 shadow-cyan-500/10'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className={`cyber-glass rounded-xl p-4 border shadow-2xl flex items-start gap-3 ${borders[toast.type || 'info']}`}>
        {icons[toast.type || 'info']}
        <div className="flex-1">
          <h4 className="text-sm font-bold text-white tracking-wide">{toast.title || 'Notification'}</h4>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
