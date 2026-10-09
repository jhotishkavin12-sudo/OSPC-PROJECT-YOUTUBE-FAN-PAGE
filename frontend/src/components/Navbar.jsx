import React, { useState } from 'react';
import { Play, Users, MessageSquare, Cpu, Menu, X, Sparkles, ExternalLink, ShieldCheck, AlertTriangle } from 'lucide-react';
import { YoutubeIcon } from './Icons';

export default function Navbar({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'videos', label: 'Videos', icon: Play, badge: '130+' },
    { id: 'pc-builder', label: 'PC Building', icon: Cpu, badge: '47+' },
    { id: 'teardown', label: 'PC Teardowns', icon: AlertTriangle, badge: '42+' },
    { id: 'community', label: 'Community', icon: Users, badge: 'Wall' }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full cyber-glass border-b border-slate-800 backdrop-blur-md">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-950 to-amber-950/80 border-b border-slate-800 text-[11px] py-1.5 px-4 text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              A2D ARMY SOLDIERS HUB
            </span>
            <span className="text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-300">
              வணக்கம் டா மாப்ள! • Fan-Made Digital Destination • Inspired by A2D Channel
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.youtube.com/@A2DChannel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors font-medium"
            >
              <YoutubeIcon className="w-3.5 h-3.5" /> 2.58M+ Soldiers
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-red-500 flex items-center justify-center font-black text-slate-950 text-lg tracking-wider shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-all">
                A2D
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl text-white tracking-wider">A2D HUB</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-mono font-bold border border-amber-500/30">
                  FAN-MADE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                வணக்கம் டா மாப்ள!
              </p>
            </div>
          </button>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id || (item.id === 'pc-builder' && activeTab === 'pc-building') || (item.id === 'teardown' && activeTab === 'teardowns');
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer relative group ${
                    isActive
                      ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-amber-400 transition-colors'}`} />
                  {item.label}
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono uppercase tracking-wider ${
                        isActive
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.youtube.com/@A2DChannel?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/25 transition-all hover:scale-105"
            >
              <YoutubeIcon className="w-3.5 h-3.5" />
              Subscribe
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl md:hidden text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'pc-builder' && activeTab === 'pc-building') || (item.id === 'teardown' && activeTab === 'teardowns');
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                  isActive
                    ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
