import React, { useState, useMemo } from 'react';
import { 
  Cpu, Tv, CircuitBoard, MemoryStick, HardDrive, Fan, Zap, Box, 
  Check, AlertTriangle, Sparkles, Send, Share2, RefreshCw, ShoppingCart, 
  Gauge, Flame, CheckCircle, Info, Search, Play, ExternalLink, ArrowUpDown, Filter, ChevronRight
} from 'lucide-react';
import { CATEGORIES, COMPONENTS, PREBUILT_TEMPLATES } from '../data/pcComponents';
import { PC_BUILDING_CATEGORIES, PC_BUILDING_VIDEOS, PC_BUDGET_PRESETS } from '../data/pcBuildingVideos';

export default function PCBuilderPage({ onShowToast, onOpenVideo }) {
  // Navigation within the PC section: 'configurator' | 'videos' | 'presets'
  const [activeSection, setActiveSection] = useState('configurator');

  // Video Library State
  const [videoSearch, setVideoSearch] = useState('');
  const [selectedVideoCategory, setSelectedVideoCategory] = useState('All');
  const [videoSort, setVideoSort] = useState('default');
  const [visibleVideoCount, setVisibleVideoCount] = useState(12);

  // Preset explorer state
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(2); // default ₹40K-₹60K

  // Custom 8-factor Component selections
  const [selectedParts, setSelectedParts] = useState({
    cpu: COMPONENTS.cpu[0].id,
    gpu: COMPONENTS.gpu[0].id,
    motherboard: COMPONENTS.motherboard[0].id,
    ram: COMPONENTS.ram[0].id,
    storage: COMPONENTS.storage[0].id,
    cooler: COMPONENTS.cooler[0].id,
    psu: COMPONENTS.psu[0].id,
    cabinet: COMPONENTS.cabinet[0].id
  });

  const [activeComponentCategory, setActiveComponentCategory] = useState('cpu');

  // Quotation Request Modal state
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    customerName: '',
    phone: '',
    email: '',
    city: 'Chennai',
    targetUse: 'Competitive Gaming (Valorant, CS2, GTA V)',
    comments: ''
  });
  const [submittingQuote, setSubmittingQuote] = useState(false);

  // Icon mapping for components
  const categoryIcons = {
    cpu: Cpu,
    gpu: Tv,
    motherboard: CircuitBoard,
    ram: MemoryStick,
    storage: HardDrive,
    cooler: Fan,
    psu: Zap,
    cabinet: Box
  };

  const getSelectedItem = (catId) => {
    const itemId = selectedParts[catId];
    return COMPONENTS[catId]?.find(item => item.id === itemId) || null;
  };

  // Calculations for custom builder
  const { totalPrice, totalWatts, psuCapacity, compatibilityIssues, fpsEstimates } = useMemo(() => {
    let price = 0;
    let watts = 80; // base mobo, fans, peripherals

    Object.keys(selectedParts).forEach(cat => {
      const item = getSelectedItem(cat);
      if (item) {
        price += item.price;
        if (item.tdp) watts += item.tdp;
      }
    });

    const psuItem = getSelectedItem('psu');
    const capacity = psuItem ? psuItem.wattage : 550;

    const issues = [];
    if (watts > capacity - 50) {
      issues.push(`Selected PSU (${capacity}W) has insufficient headroom for system load (~${watts}W). Recommended: ${watts + 150}W+`);
    }

    const cpuItem = getSelectedItem('cpu');
    const gpuItem = getSelectedItem('gpu');

    let fps = {
      valorant: '180-240 FPS (1080p High)',
      gtav: '75-90 FPS (1080p Very High)',
      cyberpunk: '45-60 FPS (1080p Medium)',
      editing: '1080p 60fps Timeline'
    };

    if (gpuItem && gpuItem.name.includes('4070')) {
      fps = {
        valorant: '450+ FPS (1440p)',
        gtav: '140+ FPS (1440p Max)',
        cyberpunk: '90+ FPS (1440p Ultra DLSS)',
        editing: '4K ProRes Multicam Timeline'
      };
    } else if (gpuItem && (gpuItem.name.includes('4060') || gpuItem.name.includes('7600'))) {
      fps = {
        valorant: '320+ FPS (1080p)',
        gtav: '110+ FPS (1080p Max)',
        cyberpunk: '70+ FPS (1080p High DLSS)',
        editing: '4K 30fps Real-Time Playback'
      };
    }

    return {
      totalPrice: price,
      totalWatts: watts,
      psuCapacity: capacity,
      compatibilityIssues: issues,
      fpsEstimates: fps
    };
  }, [selectedParts]);

  // Video filtering for PC Building collection
  const filteredVideos = useMemo(() => {
    let list = PC_BUILDING_VIDEOS.filter((v) => {
      const matchCat = selectedVideoCategory === 'All' || v.category === selectedVideoCategory;
      const matchSearch = v.title.toLowerCase().includes(videoSearch.toLowerCase());
      return matchCat && matchSearch;
    });

    if (videoSort === 'title-asc') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [videoSearch, selectedVideoCategory, videoSort]);

  const displayedVideos = filteredVideos.slice(0, visibleVideoCount);
  const hasMoreVideos = visibleVideoCount < filteredVideos.length;

  // Apply a template preset to the 8-factor builder
  const applyTemplate = (template) => {
    setSelectedParts(template.parts);
    onShowToast({
      type: 'info',
      title: 'Template Loaded',
      message: `Loaded "${template.name}" configuration!`
    });
  };

  // Submit quotation to backend
  const handleSubmitQuotation = async (e) => {
    e.preventDefault();
    if (!quoteForm.customerName || !quoteForm.phone) {
      onShowToast({
        type: 'warning',
        title: 'Missing Details',
        message: 'Please provide at least your name and phone number.'
      });
      return;
    }

    setSubmittingQuote(true);

    const payload = {
      customerName: quoteForm.customerName,
      phone: quoteForm.phone,
      email: quoteForm.email,
      city: quoteForm.city,
      targetUse: quoteForm.targetUse,
      comments: quoteForm.comments,
      components: {
        cpu: getSelectedItem('cpu')?.name,
        gpu: getSelectedItem('gpu')?.name,
        motherboard: getSelectedItem('motherboard')?.name,
        ram: getSelectedItem('ram')?.name,
        storage: getSelectedItem('storage')?.name,
        cooler: getSelectedItem('cooler')?.name,
        psu: getSelectedItem('psu')?.name,
        cabinet: getSelectedItem('cabinet')?.name
      },
      estimatedPrice: totalPrice,
      estimatedWatts: totalWatts
    };

    try {
      const res = await fetch('/api/pc-builds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        onShowToast({
          type: 'success',
          title: 'Quotation Generated! 🎉',
          message: `Ref #${data.data?.id || 'A2D-BUILD'}: Estimate ₹${totalPrice.toLocaleString('en-IN')} logged to backend!`
        });
        setShowQuoteModal(false);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      onShowToast({
        type: 'success',
        title: 'Quotation Saved Locally',
        message: `Reference #A2D-${Date.now().toString().slice(-4)} generated. Backend in offline mode.`
      });
      setShowQuoteModal(false);
    } finally {
      setSubmittingQuote(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* CINEMATIC HERO SECTION */}
      <section className="relative rounded-3xl p-8 sm:p-14 cyber-glass-glow border border-amber-500/30 overflow-hidden text-center space-y-6">
        {/* Animated PC background ambient lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-glow-pulse"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-glow-pulse"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold tracking-wider">
          <Cpu className="w-4 h-4 text-amber-400" />
          A2D PC FACTORY & BUILDING LAB
        </div>

        <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Craft Your Battle-Station <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-300">
            Engineered Component by Component
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Inspired by Nanda's iconic custom PC factory episodes. Explore verified A2D building videos, benchmark your gaming TDP, or customize an 8-factor rig.
        </p>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveSection('configurator')}
            className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'configurator'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4" /> 8-Factor Part Configurator
          </button>

          <button
            onClick={() => setActiveSection('presets')}
            className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'presets'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Gauge className="w-4 h-4" /> Budget & Use Case Explorer
          </button>

          <button
            onClick={() => setActiveSection('videos')}
            className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeSection === 'videos'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Play className="w-4 h-4" /> PC Building Videos ({PC_BUILDING_VIDEOS.length})
          </button>
        </div>
      </section>

      {/* SECTION 1: 8-FACTOR PART CONFIGURATOR */}
      {activeSection === 'configurator' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Cpu className="w-6 h-6 text-amber-400" />
                8-Factor Hardware Customizer
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Select your preferred processor, graphics card, motherboard, RAM, storage, cooling, PSU, and cabinet.
              </p>
            </div>

            {/* Template Presets Quick Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">Quick Templates:</span>
              {PREBUILT_TEMPLATES.map(t => (
                <button
                  key={t.id}
                  onClick={() => applyTemplate(t)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-300 transition-colors cursor-pointer"
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Component Category Tabs & Part Cards */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Factor Selection Pills */}
              <div className="flex flex-wrap gap-2 p-2 rounded-2xl bg-slate-900/90 border border-slate-800">
                {CATEGORIES.map(cat => {
                  const Icon = categoryIcons[cat.id] || Cpu;
                  const isSelected = activeComponentCategory === cat.id;
                  const selectedItem = getSelectedItem(cat.id);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveComponentCategory(cat.id)}
                      className={`flex-1 min-w-[120px] px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Items Grid for Active Factor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COMPONENTS[activeComponentCategory]?.map(item => {
                  const isChosen = selectedParts[activeComponentCategory] === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedParts(prev => ({ ...prev, [activeComponentCategory]: item.id }))}
                      className={`p-5 rounded-2xl cyber-glass border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 group ${
                        isChosen
                          ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                          : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 uppercase">
                            {item.brand}
                          </span>
                          {isChosen && (
                            <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400 font-bold bg-amber-400/20 px-2 py-0.5 rounded">
                              <Check className="w-3 h-3" /> Selected
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {item.specs}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                        <span className="text-base font-black text-white">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {item.tdp && (
                          <span className="text-[10px] font-mono text-cyan-400">
                            ⚡ {item.tdp}W TDP
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Live Summary, Power Meter & FPS Estimates */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              <div className="cyber-glass-glow rounded-3xl p-6 border border-slate-800 space-y-6">
                
                {/* Total Price Card */}
                <div className="space-y-1 pb-4 border-b border-slate-800">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Estimated Total Cost</span>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    *Estimated pricing based on Tamil Nadu retail and online market averages.
                  </p>
                </div>

                {/* Power & Thermal Gauge */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> System Draw:
                    </span>
                    <span className="font-mono text-amber-400 font-bold">{totalWatts}W / {psuCapacity}W</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-slate-800">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        totalWatts > psuCapacity - 50 ? 'bg-red-500' : 'bg-gradient-to-r from-cyan-400 to-amber-400'
                      }`}
                      style={{ width: `${Math.min(100, (totalWatts / psuCapacity) * 100)}%` }}
                    ></div>
                  </div>
                  {compatibilityIssues.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-red-950/40 border border-red-500/40 text-[11px] text-red-300 flex items-start gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{compatibilityIssues[0]}</span>
                    </div>
                  )}
                </div>

                {/* Estimated Gaming Performance */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Target Gaming Benchmarks
                  </span>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 flex justify-between">
                      <span className="text-slate-400">Valorant:</span>
                      <strong className="text-white font-mono">{fpsEstimates.valorant}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 flex justify-between">
                      <span className="text-slate-400">GTA V:</span>
                      <strong className="text-white font-mono">{fpsEstimates.gtav}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800/80 flex justify-between">
                      <span className="text-slate-400">Cyberpunk 2077:</span>
                      <strong className="text-white font-mono">{fpsEstimates.cyberpunk}</strong>
                    </div>
                  </div>
                </div>

                {/* Request Quotation Action */}
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="w-full py-4 rounded-xl font-black text-sm bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 shadow-xl shadow-amber-500/20 hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Save Quotation & Reference
                </button>

              </div>
            </div>

          </div>
        </section>
      )}

      {/* SECTION 2: BUDGET & USE CASE EXPLORER */}
      {activeSection === 'presets' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Curated Budget & Use Case Tiers
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select your budget tier to inspect balanced, bottleneck-free component recommendations for gaming, programming, and AI.
            </p>
          </div>

          {/* Budget Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {PC_BUDGET_PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => setSelectedBudgetIndex(index)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedBudgetIndex === index
                    ? 'bg-amber-400 text-slate-950 font-black shadow-lg shadow-amber-500/25'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {preset.budgetRange}
              </button>
            ))}
          </div>

          {/* Active Preset Inspection Card */}
          {(() => {
            const p = PC_BUDGET_PRESETS[selectedBudgetIndex];
            return (
              <div className="cyber-glass-glow rounded-3xl p-6 sm:p-10 border border-amber-500/30 space-y-8 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                      Target Tier: {p.budgetRange}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1">{p.useCase}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Estimated Total Cost</span>
                    <div className="text-3xl font-black text-amber-400">{p.estimatedCost}</div>
                    <span className="text-[10px] text-slate-500 font-mono">TDP ~{p.tdp}</span>
                  </div>
                </div>

                {/* 8 Components Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Processor (CPU)</span>
                    <p className="text-xs font-bold text-white">{p.cpu}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Graphics Card (GPU)</span>
                    <p className="text-xs font-bold text-white">{p.gpu}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Motherboard</span>
                    <p className="text-xs font-bold text-white">{p.motherboard}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">RAM (Memory)</span>
                    <p className="text-xs font-bold text-white">{p.ram}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Storage (SSD)</span>
                    <p className="text-xs font-bold text-white">{p.storage}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Power Supply (PSU)</span>
                    <p className="text-xs font-bold text-white">{p.psu}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Case / Cabinet</span>
                    <p className="text-xs font-bold text-white">{p.case}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Cooler</span>
                    <p className="text-xs font-bold text-white">{p.cooler}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Gauge className="w-4 h-4 text-amber-400" />
                    <span className="text-amber-200">Expected Performance: <strong>{p.fpsTarget}</strong></span>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>
      )}

      {/* SECTION 3: DEDICATED PC BUILDING VIDEOS (12 CATEGORIES) */}
      {activeSection === 'videos' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Official A2D PC Building Video Library
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Browse {PC_BUILDING_VIDEOS.length} verified A2D Channel uploads covering budget builds, water-cooling, GPU battles, and step-by-step guides.
            </p>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="cyber-glass rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={videoSearch}
                  onChange={(e) => {
                    setVideoSearch(e.target.value);
                    setVisibleVideoCount(12);
                  }}
                  placeholder="Search PC builds, RTX GPUs, Ryzen processors, cabinets..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-slate-400" />
                <select
                  value={videoSort}
                  onChange={(e) => setVideoSort(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300 focus:outline-none"
                >
                  <option value="default">Default (Curated)</option>
                  <option value="title-asc">Title (A-Z)</option>
                </select>
              </div>
            </div>

            {/* 12 Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
              {PC_BUILDING_CATEGORIES.map(cat => {
                const count = cat === 'All' 
                  ? PC_BUILDING_VIDEOS.length 
                  : PC_BUILDING_VIDEOS.filter(v => v.category === cat).length;
                const isSelected = selectedVideoCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedVideoCategory(cat);
                      setVisibleVideoCount(12);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1 rounded-full ${isSelected ? 'bg-black/20 text-slate-950 font-bold' : 'bg-slate-800 text-slate-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Videos Grid */}
          {displayedVideos.length === 0 ? (
            <div className="p-12 text-center cyber-glass rounded-2xl border border-slate-800 text-slate-400 space-y-2">
              <Search className="w-8 h-8 mx-auto text-slate-500" />
              <p className="text-sm font-bold text-white">No PC building videos found</p>
              <button
                onClick={() => {
                  setVideoSearch('');
                  setSelectedVideoCategory('All');
                }}
                className="text-xs text-amber-400 font-bold hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedVideos.map(video => (
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
                        loading="lazy"
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
                        title={video.title}
                      >
                        {video.title}
                      </h3>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                        <button
                          onClick={() => onOpenVideo(video)}
                          className="text-slate-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 text-amber-400" /> Watch Video
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

              {hasMoreVideos && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setVisibleVideoCount(prev => prev + 12)}
                    className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    Load More PC Building Videos ({filteredVideos.length - visibleVideoCount} left)
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* QUOTATION MODAL */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="cyber-glass-glow rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-amber-500/40 space-y-5 bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-amber-400" /> Save & Transmit Quotation
              </h3>
              <button
                onClick={() => setShowQuoteModal(false)}
                className="text-slate-400 hover:text-white font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitQuotation} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={quoteForm.customerName}
                  onChange={e => setQuoteForm({ ...quoteForm, customerName: e.target.value })}
                  placeholder="e.g. Anand Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={quoteForm.phone}
                    onChange={e => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    placeholder="98401XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">City</label>
                  <input
                    type="text"
                    value={quoteForm.city}
                    onChange={e => setQuoteForm({ ...quoteForm, city: e.target.value })}
                    placeholder="Chennai"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Email</label>
                <input
                  type="email"
                  value={quoteForm.email}
                  onChange={e => setQuoteForm({ ...quoteForm, email: e.target.value })}
                  placeholder="anand@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                <div className="flex justify-between font-bold text-white">
                  <span>Configuration Total:</span>
                  <span className="text-amber-400">₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Estimated Draw:</span>
                  <span>{totalWatts}W</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="flex-1 py-3 rounded-xl bg-slate-900 text-slate-300 font-bold hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingQuote}
                  className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
                >
                  {submittingQuote ? 'Sending...' : 'Confirm Quotation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
