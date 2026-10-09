import React, { useState, useEffect } from 'react';
import { 
  Flame, Award, Heart, ThumbsUp, Send, Image as ImageIcon, 
  Sparkles, CheckCircle2, MessageSquare, Filter, RefreshCw, Cpu, User
} from 'lucide-react';

export default function FanZonePage({ onShowToast }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('All');
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    city: 'Chennai',
    buildTitle: '',
    cpu: 'AMD Ryzen 5 7600X',
    gpu: 'Nvidia RTX 4060 8GB',
    ram: '16GB DDR5 5600MHz',
    storage: '1TB Gen4 NVMe SSD',
    cabinet: 'Ant Esports ICE-112',
    budget: '₹ 85,000',
    reviewType: "Nanda's Savage Roast Mode",
    cableManagementScore: 7,
    userNote: '',
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'
  });

  const photoPresets = [
    { label: 'Cyber Blue Rig', url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80' },
    { label: 'RGB Glass Battle-Station', url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80' },
    { label: 'Clean White Minimalist', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
    { label: 'Dual Monitor Streamer Desk', url: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=800&q=80' }
  ];

  // Fetch submissions from Backend API
  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/submissions');
      const data = await res.json();
      if (data && data.data) {
        setSubmissions(data.data);
      }
    } catch (err) {
      console.warn('Backend not responding, using offline cached submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Upvote / Like handler
  const handleLike = async (id) => {
    try {
      const res = await fetch(`/api/submissions/${id}/like`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setSubmissions(prev =>
          prev.map(item => item.id === id ? { ...item, likes: data.likes } : item)
        );
        onShowToast({
          type: 'success',
          title: 'Rig Upvoted! 🔥',
          message: 'Your salute was recorded for this A2D Army build!'
        });
      }
    } catch (err) {
      // Local optimistic update
      setSubmissions(prev =>
        prev.map(item => item.id === id ? { ...item, likes: (item.likes || 0) + 1 } : item)
      );
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.buildTitle.trim()) {
      onShowToast({
        type: 'warning',
        title: 'Missing Fields',
        message: 'Please provide your name and build title!'
      });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        handle: formData.handle,
        city: formData.city,
        buildTitle: formData.buildTitle,
        specs: {
          cpu: formData.cpu,
          gpu: formData.gpu,
          ram: formData.ram,
          storage: formData.storage,
          cabinet: formData.cabinet
        },
        budget: formData.budget,
        reviewType: formData.reviewType,
        cableManagementScore: formData.cableManagementScore,
        userNote: formData.userNote,
        imageUrl: formData.imageUrl
      };

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();

      if (res.ok) {
        onShowToast({
          type: 'success',
          title: 'Rig Submitted to A2D!',
          message: result.message || 'Your battle-station is live on the community showcase!'
        });

        // Add newly submitted rig to local state immediately
        if (result.data) {
          setSubmissions(prev => [result.data, ...prev]);
        } else {
          fetchSubmissions();
        }

        // Reset form to defaults
        setFormData({
          name: '',
          handle: '',
          city: 'Chennai',
          buildTitle: '',
          cpu: 'AMD Ryzen 5 7600X',
          gpu: 'Nvidia RTX 4060 8GB',
          ram: '16GB DDR5 5600MHz',
          storage: '1TB Gen4 NVMe SSD',
          cabinet: 'Ant Esports ICE-112',
          budget: '₹ 85,000',
          reviewType: "Nanda's Savage Roast Mode",
          cableManagementScore: 7,
          userNote: '',
          imageUrl: photoPresets[0].url
        });
      } else {
        onShowToast({
          type: 'error',
          title: 'Submission Failed',
          message: result.message || 'Error occurred while saving rig.'
        });
      }
    } catch (err) {
      onShowToast({
        type: 'error',
        title: 'Connection Issue',
        message: 'Could not communicate with the A2D backend server.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredSubmissions = filterType === 'All'
    ? submissions
    : submissions.filter(s => s.reviewType === filterType);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
          <Flame className="w-3.5 h-3.5" />
          A2D ARMY FAN ZONE & SETUP ROAST
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Showcase Your Rig. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-cyan-400">
            Get Praised or Brutally Roasted!
          </span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Submit your battle-station specs and photos. Featured entries get reviewed by Nanda & the A2D crew on stream!
        </p>
      </div>

      {/* TWO COLUMN GRID: Left = Form, Right = Live Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: RIG SUBMISSION FORM (Working Backend Form) */}
        <div className="lg:col-span-5 cyber-glass-glow rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-amber-400 font-bold">Fan Submission Form</span>
            <h2 className="text-xl font-bold text-white mt-1">Submit Your Battle-Station</h2>
            <p className="text-xs text-slate-400 mt-1">
              Data is saved live to the A2D Express API & community database.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Handle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Manikandan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Gamer Handle / IG</label>
                <input
                  type="text"
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  placeholder="@mani_gamer"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* City & Build Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">City / District</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Chennai, Coimbatore, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Rig Nickname *</label>
                <input
                  type="text"
                  required
                  value={formData.buildTitle}
                  onChange={(e) => setFormData({ ...formData, buildTitle: e.target.value })}
                  placeholder="e.g. The Madurai Monster"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Hardware Specs */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold block">Rig Hardware Specs</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Processor (CPU)</label>
                  <input
                    type="text"
                    value={formData.cpu}
                    onChange={(e) => setFormData({ ...formData, cpu: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Graphics Card (GPU)</label>
                  <input
                    type="text"
                    value={formData.gpu}
                    onChange={(e) => setFormData({ ...formData, gpu: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">RAM & Storage</label>
                  <input
                    type="text"
                    value={formData.ram}
                    onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                    placeholder="32GB DDR5 + 1TB Gen4"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Total Budget (₹)</label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="₹ 95,000"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Review Mode Selector */}
            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Choose Nanda's Evaluation Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, reviewType: "Nanda's Savage Roast Mode" })}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    formData.reviewType === "Nanda's Savage Roast Mode"
                      ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-md shadow-rose-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Flame className="w-4 h-4 text-rose-500" />
                    <span>Roast Mode 🔥</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal">Prepare for brutal cable critiques!</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, reviewType: "Praise My Rig" })}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                    formData.reviewType === "Praise My Rig"
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span>Praise My Rig 🏆</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal">Clean wiring & aesthetic appreciation.</span>
                </button>
              </div>
            </div>

            {/* Cable management slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Self-Rated Cable Management:</span>
                <span className="font-mono font-bold text-amber-400">{formData.cableManagementScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={formData.cableManagementScore}
                onChange={(e) => setFormData({ ...formData, cableManagementScore: e.target.value })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Photo Selection Presets */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Setup Photo (Select Preset or Paste URL)
              </label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {photoPresets.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({ ...formData, imageUrl: preset.url })}
                    className={`p-2 rounded-lg text-[11px] text-left border truncate ${
                      formData.imageUrl === preset.url
                        ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://imgur.com/your-setup.jpg"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:border-amber-400"
              />
            </div>

            {/* Message / Tamil Quote */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Message for Nanda & A2D Army
              </label>
              <textarea
                rows="2"
                value={formData.userNote}
                onChange={(e) => setFormData({ ...formData, userNote: e.target.value })}
                placeholder="Vanakkam Nanda bro! Built this following your video..."
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-400"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 hover:opacity-95 shadow-lg shadow-amber-500/20 text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Submitting to A2D Lab...' : 'Submit Rig to A2D Community'}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: COMMUNITY RIG SHOWCASE FEED */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Live Community Feed</span>
              <h2 className="text-2xl font-black text-white">A2D Battle-Stations</h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              {['All', "Nanda's Savage Roast Mode", 'Praise My Rig'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilterType(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    filterType === f
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {f === "Nanda's Savage Roast Mode" ? '🔥 Roasts' : f === 'Praise My Rig' ? '🏆 Praises' : 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* Cards list */}
          <div className="space-y-6">
            {filteredSubmissions.length === 0 ? (
              <div className="cyber-glass rounded-2xl p-8 text-center text-slate-400">
                No submissions in this filter yet. Be the first to submit!
              </div>
            ) : (
              filteredSubmissions.map((sub) => (
                <div
                  key={sub.id}
                  className="cyber-glass rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/30 transition-all duration-300 group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                    {/* Setup Image */}
                    <div className="md:col-span-5 relative bg-black aspect-video md:aspect-auto">
                      <img
                        src={sub.imageUrl}
                        alt={sub.buildTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                          sub.reviewType === "Nanda's Savage Roast Mode"
                            ? 'bg-rose-500/90 text-white'
                            : 'bg-cyan-500/90 text-slate-950'
                        }`}>
                          {sub.reviewType === "Nanda's Savage Roast Mode" ? '🔥 Roasted' : '🏆 Praised'}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 bg-black/80 px-2 py-0.5 rounded text-[11px] font-mono text-amber-400 font-bold">
                        {sub.budget}
                      </div>
                    </div>

                    {/* Setup Details */}
                    <div className="md:col-span-7 p-5 flex flex-col justify-between space-y-3 bg-slate-950/60">
                      <div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                              {sub.buildTitle}
                            </h3>
                            <p className="text-xs text-slate-400">
                              By <strong className="text-slate-200">{sub.name}</strong> ({sub.handle}) • 📍 {sub.city}
                            </p>
                          </div>
                          
                          {/* Upvote button */}
                          <button
                            onClick={() => handleLike(sub.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 text-xs font-bold text-slate-300 hover:text-amber-400 transition-all active:scale-90"
                          >
                            <ThumbsUp className="w-3.5 h-3.5 text-amber-500" />
                            <span>{sub.likes || 0}</span>
                          </button>
                        </div>

                        {/* Specs grid */}
                        <div className="mt-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] space-y-1 font-mono text-slate-300">
                          <div><strong className="text-cyan-400">CPU:</strong> {sub.specs?.cpu}</div>
                          <div><strong className="text-cyan-400">GPU:</strong> {sub.specs?.gpu}</div>
                          {sub.specs?.ram && <div><strong className="text-cyan-400">RAM:</strong> {sub.specs?.ram}</div>}
                        </div>

                        {/* User Note */}
                        {sub.userNote && (
                          <p className="text-xs text-slate-400 italic mt-2.5 line-clamp-2">
                            "{sub.userNote}"
                          </p>
                        )}
                      </div>

                      {/* Nanda's verdict pill */}
                      {sub.nandaVerdict && (
                        <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 text-xs text-amber-200">
                          <span className="font-bold text-amber-400 block mb-0.5">💬 Nanda's Verdict:</span>
                          <p className="text-[11px] text-slate-300 leading-snug">{sub.nandaVerdict}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
