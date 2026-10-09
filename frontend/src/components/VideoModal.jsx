import React, { useState } from 'react';
import { X, ExternalLink, Play, Sparkles, AlertCircle } from 'lucide-react';

export default function VideoModal({ video, onClose }) {
  const [embedError, setEmbedError] = useState(false);

  if (!video) return null;

  const directYouTubeUrl = video.youtubeId 
    ? `https://www.youtube.com/watch?v=${video.youtubeId}`
    : (video.url || 'https://www.youtube.com/@A2DChannel');

  const embedUrl = video.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl cyber-glass-glow rounded-2xl overflow-hidden border border-red-500/30 shadow-2xl bg-slate-950"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-red-600/20 text-red-400 border border-red-500/30 truncate">
              {video.category || 'A2D Video'}
            </span>
            <span className="hidden sm:inline text-xs text-slate-400 font-mono">
              Official A2D Channel
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 16:9 Video Embed Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {embedUrl && !embedError ? (
            <iframe
              src={embedUrl}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => setEmbedError(true)}
            />
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 blur-xs"
              />
              <div className="relative z-10 space-y-3 max-w-md">
                <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                <p className="text-sm text-slate-200 font-medium">
                  Embedding restrictions may apply for this video on certain networks.
                </p>
                <a
                  href={directYouTubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition-all hover:scale-105"
                >
                  Watch on Official YouTube <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5 sm:p-6 bg-slate-950 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug line-clamp-2">
              {video.title}
            </h3>
            <a
              href={directYouTubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-red-400 hover:text-red-300 font-bold text-xs shrink-0 transition-colors"
            >
              Open on YouTube <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          
          {video.description && (
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
              {video.description}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs text-slate-500 font-mono">
            <span>Creator: <strong className="text-slate-300">A2D Channel (Nanda)</strong></span>
            <span>Tamil Tech Community</span>
          </div>
        </div>
      </div>
    </div>
  );
}
