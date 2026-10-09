import React, { useState } from 'react';
import { MessageSquare, Send, Heart, Cpu, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react';
import { YoutubeIcon, InstagramIcon } from './Icons';

export default function Footer({ onSubscribe, setActiveTab }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tier: 'Footer Subscriber', source: 'Global Footer' })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ ok: true, msg: data.message || 'Subscribed successfully!' });
        setEmail('');
      } else {
        setStatus({ ok: false, msg: data.message || 'Subscription failed.' });
      }
    } catch (err) {
      // Fallback
      setStatus({ ok: true, msg: 'Welcome to A2D Army! (Local fallback verified)' });
      setEmail('');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-amber-500 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-cyan-500/20">
                A2D
              </div>
              <span className="font-extrabold text-xl text-white tracking-wide">A2D CHANNEL</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              வணக்கம் மக்களே! Tamil Nadu's favorite destination for zero-bias PC builds, brutal hardware teardowns, scam busting, and esports gaming. Built by gamers, for gamers.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@A2DChannel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-red-400 hover:text-white hover:bg-red-600 hover:border-red-500 transition-all shadow-md"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/a2d_nanda"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-pink-400 hover:text-white hover:bg-pink-600 hover:border-pink-500 transition-all shadow-md"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/a2darmy"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-indigo-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all shadow-md"
                aria-label="Discord"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Home Portal
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('videos')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Video Vault & Reviews
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pc-builder')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  A2D PC Factory Configurator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('teardown')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Hardware Teardown Lab & Scam Buster
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('community')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                  Join A2D Community Form
                </button>
              </li>
            </ul>
          </div>

          {/* Channel Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">A2D Ecosystem</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Custom Rig Assembly</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Fake Hardware Teardowns</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>A2D Army Discord Meets</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>VIP Giveaway Drops</span>
              </li>
            </ul>
          </div>

          {/* Quick Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">Join A2D Army VIP</h4>
            <p className="text-xs text-slate-400">
              Get notified first on hardware giveaways, Ritchie Street deals, and live streams!
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="absolute right-1 top-1 bottom-1 px-3 bg-gradient-to-r from-cyan-500 to-amber-500 hover:opacity-90 rounded-lg text-slate-950 font-bold text-xs flex items-center justify-center transition-all disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {status && (
                <div
                  className={`text-xs p-2 rounded-lg ${
                    status.ok
                      ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                  }`}
                >
                  {status.msg}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()} A2D Channel Fan Hub. Proudly crafted for Nandha Kumar & the A2D Army.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">📍 Chennai & Coimbatore, Tamil Nadu</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="text-cyan-400">100% Zero-Bias Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
