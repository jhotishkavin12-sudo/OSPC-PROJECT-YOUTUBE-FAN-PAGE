import React, { useState, useMemo } from 'react';
import { 
  Play, Search, Filter, ExternalLink, Sparkles, Smartphone, 
  Laptop, Cpu, ShieldCheck, Film, ArrowRight, ArrowUpDown, Check
} from 'lucide-react';
import { GENERAL_VIDEOS, GENERAL_CATEGORIES } from '../data/generalVideos';

export default function VideosPage({ onOpenVideo }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [visibleCount, setVisibleCount] = useState(18);

  const categories = GENERAL_CATEGORIES;

  // Filtered and searched videos
  const filteredVideos = useMemo(() => {
    let result = GENERAL_VIDEOS.filter((video) => {
      const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
      const matchesSearch = 
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'title-asc') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Reset pagination when filter/search changes
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setVisibleCount(18);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setVisibleCount(18);
  };

  const displayedVideos = filteredVideos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVideos.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
          <Film className="w-3.5 h-3.5" />
          A2D CHANNEL VIDEO VAULT
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          130+ Verified Tech Episodes
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Smartphones, laptop buying guides, offline AI tutorials, Windows troubleshooting, and tech news explainers from Nanda & A2D Channel.
        </p>
      </div>

      {/* SEARCH BAR & CATEGORY FILTERS */}
      <div className="cyber-glass rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-5 shadow-2xl">
        {/* Top Controls: Search Input + Sort Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="relative flex-1 w-full">
            <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by smartphone, laptop, AI model, tutorial, or topic..."
              className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 focus:outline-none focus:border-cyan-400 w-full sm:w-auto"
            >
              <option value="default">Default (Curated)</option>
              <option value="title-asc">Title (A to Z)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = cat === 'All' 
                ? GENERAL_VIDEOS.length 
                : GENERAL_VIDEOS.filter(v => v.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-black/20 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Showing <strong className="text-cyan-400">{Math.min(visibleCount, filteredVideos.length)}</strong> of <strong className="text-white">{filteredVideos.length}</strong> videos
          </div>
        </div>
      </div>

      {/* VIDEOS GRID */}
      {filteredVideos.length === 0 ? (
        <div className="cyber-glass rounded-2xl p-12 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 mx-auto">
            <Search className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white">No videos matched your filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try searching for another keyword or select "All" to view the full catalog.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedVideos.map((video) => (
              <div
                key={video.id}
                className="cyber-glass rounded-2xl overflow-hidden border border-slate-800/90 hover:border-cyan-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group shadow-xl hover:shadow-cyan-500/10"
              >
                {/* Thumbnail Container */}
                <div 
                  onClick={() => onOpenVideo(video)}
                  className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-2.5 left-2.5 bg-slate-950/90 border border-slate-700/80 text-cyan-400 text-[10px] font-mono px-2.5 py-0.5 rounded font-bold">
                    {video.category}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-slate-950/40">
                  <h3 
                    onClick={() => onOpenVideo(video)}
                    className="text-base font-bold text-white line-clamp-2 cursor-pointer group-hover:text-cyan-300 transition-colors leading-snug"
                    title={video.title}
                  >
                    {video.title}
                  </h3>

                  <div className="space-y-3 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        onClick={() => onOpenVideo(video)}
                        className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 text-cyan-400" /> Quick Watch
                      </button>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-bold"
                      >
                        YouTube <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleCount((prev) => prev + 18)}
                className="px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-white font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Load More Videos ({filteredVideos.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
