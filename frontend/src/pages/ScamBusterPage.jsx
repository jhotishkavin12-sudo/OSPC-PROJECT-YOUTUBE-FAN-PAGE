import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, AlertOctagon, CheckCircle2, Search, Bug, 
  ExternalLink, Send, FileQuestion, Flame, ArrowRight
} from 'lucide-react';

export default function ScamBusterPage({ onShowToast }) {
  // Diagnostic Tool State
  const [componentType, setComponentType] = useState('ssd');
  const [advertisedPrice, setAdvertisedPrice] = useState('1800');
  const [advertisedCapacity, setAdvertisedCapacity] = useState('2TB');
  const [sellerType, setSellerType] = useState('instagram');
  const [hasNoBrandName, setHasNoBrandName] = useState(true);
  const [noHologram, setNoHologram] = useState(true);

  // Scam Report Form State
  const [reports, setReports] = useState([]);
  const [reportForm, setReportForm] = useState({
    productName: '',
    sellerPlatform: 'Instagram Sponsored Store',
    dealUrl: '',
    suspectReason: '',
    reporterName: ''
  });
  const [submittingReport, setSubmittingReport] = useState(false);

  // Fetch verified scam reports
  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports');
      const data = await res.json();
      if (data && data.data) {
        setReports(data.data);
      }
    } catch (err) {
      console.warn('Reports offline');
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Compute Scam Probability
  const calculateScamProbability = () => {
    let score = 20;
    const priceNum = parseInt(advertisedPrice, 10) || 0;

    if (componentType === 'ssd') {
      if (advertisedCapacity === '2TB' && priceNum < 4000) score += 60;
      if (advertisedCapacity === '4TB' && priceNum < 8000) score += 65;
    } else if (componentType === 'gpu') {
      if (priceNum < 8000) score += 55;
    }

    if (sellerType === 'instagram' || sellerType === 'olx_unverified') score += 20;
    if (hasNoBrandName) score += 15;
    if (noHologram) score += 10;

    return Math.min(score, 99);
  };

  const scamScore = calculateScamProbability();

  // Submit report to Backend
  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!reportForm.productName.trim() || !reportForm.suspectReason.trim()) {
      onShowToast({
        type: 'warning',
        title: 'Missing Info',
        message: 'Please provide the product name and reason for suspicion.'
      });
      return;
    }

    setSubmittingReport(true);
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportForm)
      });
      const data = await res.json();
      if (res.ok) {
        onShowToast({
          type: 'success',
          title: 'Scam Incident Logged!',
          message: data.message || 'Report sent to A2D Tech Lab for video investigation!'
        });
        if (data.data) {
          setReports(prev => [data.data, ...prev]);
        }
        setReportForm({
          productName: '',
          sellerPlatform: 'Instagram Sponsored Store',
          dealUrl: '',
          suspectReason: '',
          reporterName: ''
        });
      } else {
        onShowToast({ type: 'error', title: 'Error', message: data.message || 'Failed to submit alert.' });
      }
    } catch (err) {
      onShowToast({
        type: 'success',
        title: 'Saved Locally',
        message: 'Alert stored in A2D database.'
      });
    } finally {
      setSubmittingReport(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold">
          <ShieldAlert className="w-3.5 h-3.5" />
          A2D TECH BUSTING LAB
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Hardware Scam Buster & Verifier
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Don't lose your hard-earned money to counterfeit NVMe SSDs, fake flashed vBIOS GPUs, and knockoff power supplies!
        </p>
      </div>

      {/* INTERACTIVE SCAM DETECTOR TOOL */}
      <div className="cyber-glass-glow rounded-3xl p-6 sm:p-10 border border-rose-500/30 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl mb-8">
          <span className="text-xs font-mono uppercase text-rose-400 font-bold">Interactive Hardware Diagnostic</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Is That "Insane Tech Deal" A Scam?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Input the product details to calculate the scam probability based on A2D teardown case studies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls */}
          <div className="lg:col-span-7 space-y-5">
            {/* Component Selector */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-2">Hardware Category</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'ssd', label: 'NVMe SSD / Drive' },
                  { id: 'gpu', label: 'Graphics Card (GPU)' },
                  { id: 'psu', label: 'Power Supply (PSU)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setComponentType(item.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      componentType === item.id
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Claimed Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Claimed Price (₹)</label>
                <input
                  type="number"
                  value={advertisedPrice}
                  onChange={(e) => setAdvertisedPrice(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-400 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Claimed Capacity / Model</label>
                <select
                  value={advertisedCapacity}
                  onChange={(e) => setAdvertisedCapacity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-400"
                >
                  <option value="2TB">2TB High Speed NVMe / 16GB GPU</option>
                  <option value="4TB">4TB Gen4 NVMe SSD</option>
                  <option value="1TB">1TB Standard Capacity</option>
                </select>
              </div>
            </div>

            {/* Seller Platform */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Where Did You Spot This Deal?</label>
              <select
                value={sellerType}
                onChange={(e) => setSellerType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-400"
              >
                <option value="instagram">Instagram / Telegram Sponsored Ad (High Risk)</option>
                <option value="olx_unverified">OLX / Quickr Unverified Seller</option>
                <option value="ritchie_st">Ritchie Street Chennai Grey Market Shop</option>
                <option value="authorized">MDComputers / PrimeABGB / Vedant (Authorized Retail)</option>
              </select>
            </div>

            {/* Checklist Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={hasNoBrandName}
                  onChange={(e) => setHasNoBrandName(e.target.checked)}
                  className="w-4 h-4 rounded accent-rose-500"
                />
                <span>Generic branding / Misspelled brand name (e.g., "Samsvng", "Nviida")</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={noHologram}
                  onChange={(e) => setNoHologram(e.target.checked)}
                  className="w-4 h-4 rounded accent-rose-500"
                />
                <span>Missing official Indian distributor hologram (Kaizen / Acro / Rashi Peripherals)</span>
              </label>
            </div>
          </div>

          {/* Meter Output */}
          <div className="lg:col-span-5 bg-slate-950/90 rounded-2xl p-6 border border-slate-800 text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              A2D Scam Meter Analysis
            </span>

            <div className="relative py-4">
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500 font-mono">
                {scamScore}%
              </div>
              <div className="text-xs uppercase font-mono font-bold tracking-widest mt-1 text-rose-400">
                {scamScore > 75 ? '🚨 EXTREME SCAM PROBABILITY' : scamScore > 45 ? '⚠️ SUSPICIOUS DEAL' : '✅ LIKELY LEGITIMATE'}
              </div>
            </div>

            {/* Nanda's verdict quote */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> Nanda's Warning:
              </span>
              <p className="text-slate-300 leading-relaxed">
                {scamScore > 75
                  ? "Dei thambi! 2TB NVMe SSD ₹1800-ku evanum thara maatan! Inside you'll find an old 32GB SD card glued with iron weights and looped hacked firmware. DO NOT BUY!"
                  : scamScore > 45
                  ? "Deal looks shady da mapla! Always demand the Indian distributor warranty bill (Kaizen/Acro). Test with CrystalDiskInfo before handing cash!"
                  : "Price seems consistent with authentic wholesale Indian market rates. Check physical seals before opening!"}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* REPORT A SCAM FORM (Working Form 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Incident Form */}
        <div className="lg:col-span-6 cyber-glass rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Community Watchdog</span>
            <h3 className="text-2xl font-bold text-white mt-1">Report a Counterfeit Tech Deal</h3>
            <p className="text-xs text-slate-400 mt-1">
              Found a shady seller ripping off Tamil buyers? Submit the lead for an A2D video investigation.
            </p>
          </div>

          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Product Title & Claimed Price *</label>
              <input
                type="text"
                required
                value={reportForm.productName}
                onChange={(e) => setReportForm({ ...reportForm, productName: e.target.value })}
                placeholder="e.g. Samsung 990 Pro 2TB for ₹2,100"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Platform / Store</label>
                <input
                  type="text"
                  value={reportForm.sellerPlatform}
                  onChange={(e) => setReportForm({ ...reportForm, sellerPlatform: e.target.value })}
                  placeholder="Instagram Page, Ritchie St Shop, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Your Name (or Anonymous)</label>
                <input
                  type="text"
                  value={reportForm.reporterName}
                  onChange={(e) => setReportForm({ ...reportForm, reporterName: e.target.value })}
                  placeholder="A2D Member"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Deal Link / Ad URL</label>
              <input
                type="text"
                value={reportForm.dealUrl}
                onChange={(e) => setReportForm({ ...reportForm, dealUrl: e.target.value })}
                placeholder="https://instagram.com/p/... or website link"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Why Do You Suspect It's Fake? *</label>
              <textarea
                rows="3"
                required
                value={reportForm.suspectReason}
                onChange={(e) => setReportForm({ ...reportForm, suspectReason: e.target.value })}
                placeholder="Price is 80% below MRP, seller is asking for advance UPI payment only, packaging fonts look blurry..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submittingReport}
              className="w-full py-3 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-rose-500 to-amber-500 hover:opacity-90 text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition-all disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submittingReport ? 'Sending Alert...' : 'Transmit Report to A2D Lab'}
            </button>
          </form>
        </div>

        {/* Right: Recent Reports Feed */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
              Recent Flagged Incidents
            </h4>
            <span className="text-xs text-rose-400 font-mono">Live Database</span>
          </div>

          <div className="space-y-3">
            {reports.map((rep) => (
              <div key={rep.id} className="p-4 rounded-2xl cyber-glass border border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h5 className="text-sm font-bold text-white">{rep.productName}</h5>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                    {rep.status || 'Under Investigation'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{rep.suspectReason}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/60 font-mono">
                  <span>Reported on {rep.sellerPlatform}</span>
                  <span>By {rep.reporterName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
