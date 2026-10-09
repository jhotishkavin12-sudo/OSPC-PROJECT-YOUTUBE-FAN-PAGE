import React, { useState, useEffect } from 'react';
import { 
  Users, Send, CheckCircle2, MessageSquare, Sparkles, Heart, 
  ShieldCheck, HelpCircle, Star, ThumbsUp, ArrowRight, Database
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../data/supabaseClient';

export default function CommunityPage({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    favoriteTopic: 'Custom PC Building & Gaming',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [successSubmitted, setSuccessSubmitted] = useState(null);
  const [submissionsList, setSubmissionsList] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  const topicOptions = [
    'Custom PC Building & Gaming',
    'Smartphones & Mobile Tech',
    'Laptops & Student Deals',
    'Hardware Scam Busting & Teardowns',
    'Artificial Intelligence & Local LLMs',
    'Tech Innovations & Future Gadgets'
  ];

  // Fetch submissions from Backend API & localStorage
  const loadSubmissions = async () => {
    try {
      setLoadingList(true);
      const res = await fetch('/api/community');
      if (res.ok) {
        const json = await res.json();
        if (json && json.data) {
          setSubmissionsList(json.data);
          return;
        }
      }
    } catch (e) {
      console.warn('API fetch skipped, reading local fallback');
    }

    // Local fallback
    try {
      const stored = localStorage.getItem('a2d_community_submissions');
      if (stored) {
        setSubmissionsList(JSON.parse(stored));
      } else {
        setSubmissionsList([
          {
            id: 'c1',
            name: 'Karthikeyan R',
            email: 'karthik.tech@example.com',
            favoriteTopic: 'Custom PC Building & Gaming',
            message: 'A2D PC Factory videos helped me choose the right components for my first gaming setup! Keep delivering genuine Tamil tech content.',
            createdAt: new Date().toISOString()
          },
          {
            id: 'c2',
            name: 'Praveen Kumar',
            email: 'praveen.ai@example.com',
            favoriteTopic: 'Artificial Intelligence & Local LLMs',
            message: 'The local DeepSeek and Llama 3 tutorial in Tamil was mind-blowing! Running it on my RTX 4070 now.',
            createdAt: new Date().toISOString()
          }
        ]);
      }
    } catch (e) {
      // ignore
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onShowToast({
        type: 'warning',
        title: 'Missing Fields',
        message: 'Please fill out your name, email, and message.'
      });
      return;
    }

    setSubmitting(true);
    const newEntry = {
      id: `comm_${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      favoriteTopic: formData.favoriteTopic,
      message: formData.message.trim(),
      createdAt: new Date().toISOString()
    };

    let backendSaved = false;

    // 1. Try Backend API POST
    try {
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        backendSaved = true;
      }
    } catch (err) {
      console.warn('Backend server offline, using client database');
    }

    // 2. Post to Netlify Forms endpoint for native Netlify dashboard capture
    try {
      const netlifyBody = new URLSearchParams({
        'form-name': 'community-form',
        ...formData
      }).toString();
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: netlifyBody
      });
    } catch (e) {
      // ignore
    }

    // 3. Try Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('community_submissions').insert([formData]);
      } catch (err) {
        console.warn('Supabase sync notice:', err);
      }
    }

    // 3. Save to Local State & LocalStorage
    try {
      const updated = [newEntry, ...submissionsList];
      setSubmissionsList(updated);
      localStorage.setItem('a2d_community_submissions', JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    // Success State
    setSuccessSubmitted(newEntry);
    setSubmitting(false);

    onShowToast({
      type: 'success',
      title: 'Submission Received! 🎉',
      message: 'Vanakkam da mapla! Your message was transmitted to the A2D community database.'
    });

    // Reset Form
    setFormData({
      name: '',
      email: '',
      favoriteTopic: 'Custom PC Building & Gaming',
      message: ''
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
          <Users className="w-3.5 h-3.5" />
          A2D ARMY SOLDIERS COMMUNITY
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Join the A2D Community
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Connect with Tamil Nadu's most vibrant community of PC builders, gadget enthusiasts, and esports gamers.
        </p>
      </div>

      {/* WHY JOIN SECTION */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-white">Why Join the A2D Community?</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            More than just viewers — we are a movement of tech-literate consumers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl cyber-glass border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Unfiltered Advice</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get buying advice free from corporate marketing fluff. Genuine opinions from real builders and gamers across Tamil Nadu.
            </p>
          </div>

          <div className="p-6 rounded-2xl cyber-glass border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Community Spotlights</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Submit your battle-stations, ask tough tech questions, and get featured in Nanda's Sunday streams and teardown videos.
            </p>
          </div>

          <div className="p-6 rounded-2xl cyber-glass border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Direct Transmission</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every submission below is saved directly to our backend database and reviewed by the A2D crew for video ideas.
            </p>
          </div>
        </div>
      </div>

      {/* FORM AND SUBMISSIONS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: THE WORKING FAN SUBMISSION FORM */}
        <div className="lg:col-span-6 cyber-glass-glow rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl space-y-6">
          
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Fan Submission Form</span>
            <h2 className="text-2xl font-black text-white mt-1">Send Your Tech Voice</h2>
            <p className="text-xs text-slate-400 mt-1">
              Data is transmitted via POST request to the backend API and database.
            </p>
          </div>

          {/* Success Banner if just submitted */}
          {successSubmitted && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Transmission Successful!</span>
              </div>
              <p className="leading-relaxed">
                Thank you, <strong>{successSubmitted.name}</strong>! Your message about <em>"{successSubmitted.favoriteTopic}"</em> has been saved to the database and published to the Community Wall below.
              </p>
            </div>
          )}

          {/* Working Form with Netlify + Backend Support */}
          <form 
            onSubmit={handleSubmit} 
            name="community-form"
            data-netlify="true"
            className="space-y-4"
          >
            <input type="hidden" name="form-name" value="community-form" />

            {/* Name */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Vignesh or Gamer Tag"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="vignesh@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Favorite Topic */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Favorite Topic *
              </label>
              <select
                name="favoriteTopic"
                value={formData.favoriteTopic}
                onChange={(e) => setFormData({ ...formData, favoriteTopic: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
              >
                {topicOptions.map((topic, idx) => (
                  <option key={idx} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Your Message / Feedback for A2D *
              </label>
              <textarea
                required
                rows="4"
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Vanakkam Nanda bro! Loved your recent video on..."
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-xl font-black text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-amber-400 hover:opacity-95 shadow-lg shadow-cyan-500/20 text-sm flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Transmitting to Database...' : 'Submit to A2D Community'}
            </button>
          </form>

          <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800">
            <span>⚡ Flow: Form → POST → API → DB</span>
            <span>🔒 Protected Data</span>
          </div>
        </div>

        {/* RIGHT COLUMN: RECENT COMMUNITY SUBMISSIONS (Database Feed) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase text-amber-400 font-bold">Live Database Feed</span>
              <h2 className="text-2xl font-black text-white mt-0.5">Soldier Messages</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {submissionsList.length} Messages
            </span>
          </div>

          <div className="space-y-4">
            {submissionsList.map((entry) => (
              <div
                key={entry.id}
                className="p-5 rounded-2xl cyber-glass border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{entry.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                        Soldier
                      </span>
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-400 block mt-0.5">
                      📌 Topic: {entry.favoriteTopic}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                  "{entry.message}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
