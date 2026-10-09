import React from 'react';
import { 
  Play, Users, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, 
  Smartphone, Laptop, Cpu, ExternalLink, Flame, Zap, Award, AlertTriangle, Hammer, Wrench, ChevronDown
} from 'lucide-react';
import { CREATOR_STATS } from '../data/sampleVideos';
import { PC_BUILDING_VIDEOS } from '../data/pcBuildingVideos';
import { TEARDOWN_VIDEOS } from '../data/teardownVideos';
import { GENERAL_VIDEOS } from '../data/generalVideos';

export default function HomePage({ setActiveTab, onOpenVideo }) {
  // Featured Real Videos from each section
  const featuredPCVideos = PC_BUILDING_VIDEOS.slice(0, 3);
  const featuredTeardowns = TEARDOWN_VIDEOS.slice(0, 3);

  const navCards = [
    {
      id: 'videos',
      title: 'Explore Videos',
      subtitle: '130+ Tech Videos',
      description: 'Smartphones, laptops, local AI models, and unfiltered tech comparisons.',
      icon: Play,
      color: 'from-cyan-500 to-blue-600',
      border: 'border-cyan-500/30 hover:border-cyan-400',
      badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      actionText: 'Browse Video Vault'
    },
    {
      id: 'pc-builder',
      title: 'PC Building Lab',
      subtitle: '8-Factor Customizer',
      description: 'Explore 47 verified builds, configure budget tiers & compute wattage.',
      icon: Cpu,
      color: 'from-amber-400 to-orange-500',
      border: 'border-amber-500/30 hover:border-amber-400',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      actionText: 'Configure Custom PC'
    },
    {
      id: 'teardown',
      title: 'PC Teardowns Lab',
      subtitle: 'Hardware Disassembly',
      description: '42 post-mortems, fake SSD investigations, and scam risk calculator.',
      icon: AlertTriangle,
      color: 'from-red-500 to-rose-600',
      border: 'border-red-500/30 hover:border-red-400',
      badgeColor: 'bg-red-500/10 text-red-400 border-red-500/30',
      actionText: 'Enter Teardown Lab'
    },
    {
      id: 'community',
      title: 'A2D Community',
      subtitle: 'Soldiers Live Wall',
      description: 'Submit your tech queries, connect with Tamil builders, and share setups.',
      icon: Users,
      color: 'from-purple-500 to-indigo-600',
      border: 'border-purple-500/30 hover:border-purple-400',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      actionText: 'Join the Community'
    }
  ];

  return (
    <div className="space-y-28 pb-24">
      
      {/* CINEMATIC HERO SECTION WITH "வணக்கம் டா மாப்ள!" */}
      <section className="relative pt-20 sm:pt-28 pb-20 overflow-hidden text-center">
        {/* Moving ambient lighting gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-red-600/15 via-amber-500/15 to-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-glow-pulse"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-2xl pointer-events-none animate-float"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          
          {/* Subtle Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider shadow-lg shadow-amber-500/10 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>A2D ARMY SOLDIERS HEADQUARTERS • TAMIL TECH HUB</span>
          </div>

          {/* ICONIC TAMIL GREETING IN BIG BOLD SCRIPT */}
          <div className="space-y-3">
            <div className="text-4xl sm:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 tracking-wide font-tamil animate-float leading-tight">
              வணக்கம் டா மாப்ள!
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.05]">
              TECHNOLOGY. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400">
                SIMPLIFIED.
              </span>
            </h1>
            <p className="text-xl sm:text-3xl font-extrabold text-slate-200 tracking-wide pt-1">
              The A2D Community Hub
            </p>
          </div>

          {/* Short Intro */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The unofficial technology home for <strong className="text-white">A2D Channel</strong> and the 2.5M+ strong A2D Army. 
            Exploring Nanda's fearless hardware teardowns, custom PC factory builds, smartphone battles, and high-energy Tamil tech culture.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setActiveTab('pc-builder');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-slate-950 font-black text-base bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Cpu className="w-5 h-5 text-slate-950" />
              Custom PC Builder (Factory)
            </button>

            <button
              onClick={() => {
                setActiveTab('teardown');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-white font-bold text-base bg-red-950/60 hover:bg-red-900/60 border border-red-500/40 hover:border-red-400 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Hardware Teardown Lab
            </button>

            <button
              onClick={() => {
                setActiveTab('videos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-white font-bold text-base bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400 ml-0.5" />
              Explore Videos
            </button>
          </div>

          {/* Creator Stats Strip */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {CREATOR_STATS.map((stat, idx) => (
              <div key={idx} className="p-5 rounded-2xl cyber-glass border border-slate-800/80 text-center space-y-1 hover:border-amber-500/40 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-bold text-amber-400 uppercase font-mono tracking-wider">{stat.label}</div>
                <div className="text-[11px] text-slate-400">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Animated Scroll Indicator */}
          <div className="pt-8 flex flex-col items-center justify-center text-slate-500 text-xs font-mono">
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4 animate-bounce mt-1 text-amber-400" />
          </div>

        </div>
      </section>

      {/* PART 6: FOUR VISUALLY DISTINCT NAVIGATION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest">
            EXPLORE THE ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Dedicated Tech Portals</h2>
          <p className="text-slate-400 text-sm">
            Four specialized hubs for videos, PC configurations, post-mortem teardowns, and community discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => {
                  setActiveTab(card.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`p-6 rounded-3xl cyber-glass border ${card.border} hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-6`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-slate-950 font-black shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-slate-950" />
                    </div>
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border font-bold ${card.badgeColor}`}>
                      {card.subtitle}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-white">
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PC BUILDING SECTION (REAL A2D VIDEOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-amber-400 font-bold tracking-widest">
              A2D PC FACTORY SHOWCASE
            </span>
            <h2 className="text-3xl font-black text-white mt-1">Featured Custom PC Builds</h2>
            <p className="text-slate-400 text-sm mt-1">
              From liquid-cooled RTX 4090 dream builds to ₹30,000 budget gaming rigs.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('pc-builder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 uppercase font-mono tracking-wider transition-colors cursor-pointer"
          >
            Explore All 47 PC Builds <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPCVideos.map((video) => (
            <div
              key={video.id}
              className="cyber-glass rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group shadow-xl"
            >
              <div 
                onClick={() => onOpenVideo(video)}
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-2.5 left-2.5 bg-slate-950/90 border border-slate-800 text-amber-300 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  {video.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-slate-950/40">
                <h3
                  onClick={() => onOpenVideo(video)}
                  className="text-sm font-bold text-white line-clamp-2 cursor-pointer group-hover:text-amber-300 transition-colors leading-snug"
                >
                  {video.title}
                </h3>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onOpenVideo(video)}
                    className="text-slate-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-amber-400" /> Watch Build
                  </button>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                  >
                    YouTube <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED HARDWARE TEARDOWN SECTION (REAL A2D VIDEOS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase text-red-400 font-bold tracking-widest">
              HARDWARE POST-MORTEM LAB
            </span>
            <h2 className="text-3xl font-black text-white mt-1">Featured Teardowns & Scam Busts</h2>
            <p className="text-slate-400 text-sm mt-1">
              Internal hardware examinations, thermal tests, and counterfeit product teardowns.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('teardown');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 uppercase font-mono tracking-wider transition-colors cursor-pointer"
          >
            Explore All 42 Teardowns <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTeardowns.map((video) => (
            <div
              key={video.id}
              className="cyber-glass rounded-2xl overflow-hidden border border-slate-800 hover:border-red-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group shadow-xl"
            >
              <div 
                onClick={() => onOpenVideo(video)}
                className="relative aspect-video bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-2.5 left-2.5 bg-slate-950/90 border border-slate-800 text-red-400 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  {video.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4 bg-slate-950/40">
                <h3
                  onClick={() => onOpenVideo(video)}
                  className="text-sm font-bold text-white line-clamp-2 cursor-pointer group-hover:text-red-300 transition-colors leading-snug"
                >
                  {video.title}
                </h3>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <button
                    onClick={() => onOpenVideo(video)}
                    className="text-slate-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-red-400" /> Watch Teardown
                  </button>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-red-300 font-bold flex items-center gap-1"
                  >
                    YouTube <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMMUNITY CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cyber-glass-glow rounded-3xl p-8 sm:p-14 border border-amber-500/30 text-center space-y-6 relative overflow-hidden bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-950/30">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
            <Users className="w-7 h-7" />
          </div>
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Join 100,000+ A2D Army Soldiers
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Connect with fellow tech enthusiasts, get real-time setup feedback, discuss local AI models, and share your battle-station.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('community');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-black text-base bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            Enter Community Wall <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
}
