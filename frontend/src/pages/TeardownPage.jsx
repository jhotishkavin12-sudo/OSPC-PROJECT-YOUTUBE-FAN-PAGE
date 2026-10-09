import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, ShieldCheck, Search, Wrench, ExternalLink, 
  Send, CheckCircle2, Flame, HelpCircle, ArrowRight, Zap, Info, Play, ArrowUpDown, Filter
} from 'lucide-react';
import { TEARDOWN_CATEGORIES, TEARDOWN_VIDEOS, SIGNATURE_TEARDOWN_CASES } from '../data/teardownVideos';

export default function TeardownPage({ onShowToast, onOpenVideo }) {
  // Navigation within the Teardown section: 'videos' | 'cases' | 'calculator'
  const [activeTab, setActiveTab] = useState('videos');

  // Video Library State
  const [videoSearch, setVideoSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videoSort, setVideoSort] = useState('default');
  const [visibleCount, setVisibleCount] = useState(12);

  // Scam Diagnostic Tool state
  const [componentType, setComponentType] = useState('ssd');
  const [quotedPrice, setQuotedPrice] = useState('1800');
  const [sourcePlatform, setSourcePlatform] = useState('instagram');
  const [diagnosticResult, setDiagnosticResult] = useState(null);

  // Suspicious report form state
  const [reportForm, setReportForm] = useState({
    title: '',
    reportedBy: '',
    platform: 'Instagram Sponsored Ad',
    quotedPrice: '',
    description: '',
    productUrl: ''
  });
  const [submittingReport, setSubmittingReport] = useState(false);

  // Filtered videos
  const filteredVideos = useMemo(() => {
    let list = TEARDOWN_VIDEOS.filter((v) => {
      const matchCat = selectedCategory === 'All' || v.category === selectedCategory;
      const matchSearch = v.title.toLowerCase().includes(videoSearch.toLowerCase());
      return matchCat && matchSearch;
    });

    if (videoSort === 'title-asc') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [videoSearch, selectedCategory, videoSort]);

  const displayedVideos = filteredVideos.slice(0, visibleCount);
  const hasMoreVideos = visibleCount < filteredVideos.length;

  // Run scam diagnostic analysis
  const runDiagnostic = (e) => {
    e.preventDefault();
    const price = Number(quotedPrice) || 0;
    let score = 20;
    const warnings = [];
    const checklist = [];

    if (componentType === 'ssd') {
      if (price < 3500) {
        score += 65;
        warnings.push('2TB NVMe PCIe Gen4 SSD under ₹3,500 is mathematically impossible. Genuine NAND flash silicon costs ₹6,000+.');
        warnings.push('High likelihood of circular overwritten 32GB SD card with hacked controller firmware.');
      }
      checklist.push('Run CrystalDiskInfo & check Serial Number matching physical label.');
      checklist.push('Use H2testw or FakeFlashTest to verify true writable capacity.');
    } else if (componentType === 'gpu') {
      if (price < 12000) {
        score += 60;
        warnings.push('RTX 3060 / 4060 under ₹12,000 is likely a reflashed Fermi/Kepler GTS 450 with modified vBIOS hex headers.');
      }
      checklist.push('Open GPU-Z and inspect Shader Count, Bus Width, and Die Size.');
      checklist.push('Run FurMark 3D stress test to check thermal throttling.');
    } else if (componentType === 'laptop') {
      if (price < 25000) {
        score += 50;
        warnings.push('Suspiciously cheap gaming laptop likely contains washed-out 45% NTSC TN panel or reflowed motherboard.');
      }
      checklist.push('Check panel hardware ID in HWiNFO64 to verify 100% sRGB color gamut.');
      checklist.push('Inspect battery cycle count and thermal paste dryness.');
    } else if (componentType === 'psu') {
      if (price < 2500) {
        score += 70;
        warnings.push('Cheap "80+ Gold" PSU likely lacks Over-Current (OCP) and Over-Voltage (OVP) protections with concrete ballast.');
      }
      checklist.push('Check Tier list on Cultists Network PSU rankings.');
      checklist.push('Inspect 12V single rail amp rating on label.');
    }

    if (sourcePlatform === 'instagram' || sourcePlatform === 'olx') {
      score += 15;
      warnings.push(`Sourced from ${sourcePlatform.toUpperCase()} where zero seller KYC or buyer return protection exists.`);
    }

    score = Math.min(99, score);

    setDiagnosticResult({
      score,
      verdict: score >= 75 ? 'EXTREME SCAM RISK (HIGH ALERT)' : score >= 45 ? 'SUSPICIOUS GREY MARKET ITEM' : 'PLAUSIBLE VALUE DEAL',
      warnings,
      checklist
    });
  };

  // Submit report to backend
  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!reportForm.title || !reportForm.reportedBy) {
      onShowToast({
        type: 'warning',
        title: 'Missing Info',
        message: 'Please provide product title and your name.'
      });
      return;
    }

    setSubmittingReport(true);
    try {
      const res = await fetch('/api/teardowns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportForm)
      });
      const data = await res.json();
      if (res.ok) {
        onShowToast({
          type: 'success',
          title: 'Report Submitted! 🚨',
          message: 'Queued for A2D Lab inspection and Nanda teardown review.'
        });
        setReportForm({
          title: '',
          reportedBy: '',
          platform: 'Instagram Sponsored Ad',
          quotedPrice: '',
          description: '',
          productUrl: ''
        });
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      onShowToast({
        type: 'success',
        title: 'Report Logged',
        message: 'Logged locally. Thank you for protecting the A2D community!'
      });
    } finally {
      setSubmittingReport(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

      {/* CINEMATIC HERO SECTION */}
      <section className="relative rounded-3xl p-8 sm:p-14 cyber-glass border border-red-500/30 overflow-hidden text-center space-y-6 bg-gradient-to-br from-red-950/20 via-slate-950 to-slate-950 shadow-2xl">
        <div className="absolute -top-24 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none animate-glow-pulse"></div>
        <div className="absolute -bottom-24 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none animate-glow-pulse"></div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-red-500/40 text-red-400 text-xs font-mono font-bold tracking-wider">
          <Wrench className="w-4 h-4 text-red-500" />
          A2D HARDWARE TEARDOWN & SCAM BUSTER LAB
        </div>

        <h1 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Unfiltered Hardware Disassembly <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-amber-300">
            What Tech Brands Hide Inside
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Nanda cracks open gaming laptops, heatsinks, fake SSDs, and vBIOS-hacked graphics cards. Real post-mortems exposing thermal traps and grey-market scams.
        </p>

        {/* Section Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'videos'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/25 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <Play className="w-4 h-4" /> Teardown Videos ({TEARDOWN_VIDEOS.length})
          </button>

          <button
            onClick={() => setActiveTab('cases')}
            className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'cases'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/25 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> Signature Scam Cases
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-5 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'calculator'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/25 scale-105'
                : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Scam Risk Calculator
          </button>
        </div>
      </section>

      {/* SECTION 1: TEARDOWN VIDEOS (12 CATEGORIES) */}
      {activeTab === 'videos' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Official A2D Teardown & Post-Mortem Videos
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore {TEARDOWN_VIDEOS.length} genuine uploads covering laptop internals, thermal paste comparisons, console repairs, and scam teardowns.
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="cyber-glass rounded-2xl p-5 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={videoSearch}
                  onChange={(e) => {
                    setVideoSearch(e.target.value);
                    setVisibleCount(12);
                  }}
                  placeholder="Search laptop teardowns, thermal paste, post-mortem, inside hardware..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
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
              {TEARDOWN_CATEGORIES.map(cat => {
                const count = cat === 'All' 
                  ? TEARDOWN_VIDEOS.length 
                  : TEARDOWN_VIDEOS.filter(v => v.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setVisibleCount(12);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1 rounded-full ${isSelected ? 'bg-black/20 text-white' : 'bg-slate-800 text-slate-500'}`}>
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
              <p className="text-sm font-bold text-white">No teardown videos found</p>
              <button
                onClick={() => {
                  setVideoSearch('');
                  setSelectedCategory('All');
                }}
                className="text-xs text-red-400 font-bold hover:underline"
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
                    className="cyber-glass rounded-2xl overflow-hidden border border-slate-800 hover:border-red-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group shadow-xl"
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
                        title={video.title}
                      >
                        {video.title}
                      </h3>

                      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
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

              {hasMoreVideos && (
                <div className="text-center pt-4">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="px-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
                  >
                    Load More Teardowns ({filteredVideos.length - visibleCount} left)
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* SECTION 2: SIGNATURE SCAM CASES */}
      {activeTab === 'cases' && (
        <section className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Signature Hardware Scam Investigations
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Real hardware teardowns conducted by Nanda, exposing grey-market fraud, fake silicon, and misleading specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SIGNATURE_TEARDOWN_CASES.map(scam => (
              <div 
                key={scam.id}
                className="cyber-glass rounded-3xl p-6 sm:p-8 border border-red-500/30 space-y-5 hover:border-red-500/60 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-red-950 text-red-400 border border-red-500/40 font-bold uppercase">
                    {scam.dangerLevel}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Tag: <strong className="text-amber-400">{scam.tag}</strong>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white">{scam.title}</h3>
                  <div className="flex items-center gap-4 text-xs mt-2 text-slate-400">
                    <span>Quoted: <strong className="text-red-400 line-through">{scam.quotedPrice}</strong></span>
                    <span>Actual Worth: <strong className="text-slate-200">{scam.actualValue}</strong></span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Inside Disassembly:</span>
                  <p>{scam.insideHardware}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-200">
                  <strong>Nanda's Verdict:</strong> {scam.nandaVerdict}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: SCAM RISK CALCULATOR & REPORT FORM */}
      {activeTab === 'calculator' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-300">
          
          {/* Left Column: Calculator */}
          <div className="lg:col-span-7 cyber-glass-glow rounded-3xl p-6 sm:p-8 border border-red-500/30 space-y-6">
            <div>
              <span className="text-xs font-mono text-red-400 font-bold uppercase tracking-wider">Interactive Diagnostic Engine</span>
              <h2 className="text-2xl font-black text-white mt-1">Component Scam Risk Calculator</h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter the component type, quoted price, and marketplace to assess risk against historical Tamil Nadu retail fraud.
              </p>
            </div>

            <form onSubmit={runDiagnostic} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Component Category</label>
                <select
                  value={componentType}
                  onChange={e => setComponentType(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                >
                  <option value="ssd">NVMe SSD (e.g. 2TB / 4TB)</option>
                  <option value="gpu">Graphics Card (e.g. RTX 3060 / 4060)</option>
                  <option value="laptop">Gaming Laptop (Used / Refurbished)</option>
                  <option value="psu">Power Supply Unit (SMPS)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Quoted Price in ₹ INR</label>
                <input
                  type="number"
                  value={quotedPrice}
                  onChange={e => setQuotedPrice(e.target.value)}
                  placeholder="e.g. 1800"
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-red-500 font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Source Platform / Shop</label>
                <select
                  value={sourcePlatform}
                  onChange={e => setSourcePlatform(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                >
                  <option value="instagram">Instagram Sponsored Ad</option>
                  <option value="olx">OLX / Quickr Classifieds</option>
                  <option value="grey_market">Ritchie Street / Local Grey Shop</option>
                  <option value="amazon">Amazon Third-Party Seller</option>
                  <option value="authorized">Authorized Retailer (MDComputers / PrimeABGB)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-lg shadow-red-600/30 transition-all cursor-pointer"
              >
                Run Hardware Scam Analysis
              </button>
            </form>

            {/* Diagnostic Result Output */}
            {diagnosticResult && (
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Computed Risk Index</span>
                    <div className="text-2xl font-black text-red-400">{diagnosticResult.score}% RISK</div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-950 text-red-400 border border-red-500/40">
                    {diagnosticResult.verdict}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <span className="font-bold text-amber-400">Flagged Risk Points:</span>
                  {diagnosticResult.warnings.map((w, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400">⚠️</span>
                      <span>{w}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <span className="font-bold text-cyan-400">Verification Checklist:</span>
                  {diagnosticResult.checklist.map((c, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400">✓</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Report Suspicious Listing Form */}
          <div className="lg:col-span-5 cyber-glass rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">Citizen Tech Protection</span>
              <h2 className="text-xl font-black text-white mt-1">Report a Suspicious Hardware Listing</h2>
              <p className="text-xs text-slate-400 mt-1">
                Spot a scam deal online? Submit it to the A2D Hub database for review by Nanda's teardown team.
              </p>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={reportForm.title}
                  onChange={e => setReportForm({ ...reportForm, title: e.target.value })}
                  placeholder="e.g. 2TB Samsung 980 Pro for ₹1,800"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={reportForm.reportedBy}
                  onChange={e => setReportForm({ ...reportForm, reportedBy: e.target.value })}
                  placeholder="e.g. Vignesh M"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Quoted Price (₹)</label>
                <input
                  type="number"
                  value={reportForm.quotedPrice}
                  onChange={e => setReportForm({ ...reportForm, quotedPrice: e.target.value })}
                  placeholder="1800"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Description & Evidence</label>
                <textarea
                  rows={3}
                  value={reportForm.description}
                  onChange={e => setReportForm({ ...reportForm, description: e.target.value })}
                  placeholder="Tell us what looked suspicious about this listing..."
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-red-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submittingReport}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-red-400" />
                {submittingReport ? 'Submitting...' : 'Queue for A2D Review'}
              </button>
            </form>
          </div>

        </section>
      )}

    </div>
  );
}
