import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import VideoModal from './components/VideoModal';

import HomePage from './pages/HomePage';
import VideosPage from './pages/VideosPage';
import CommunityPage from './pages/CommunityPage';
import PCBuilderPage from './pages/PCBuilderPage';
import TeardownPage from './pages/TeardownPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [toast, setToast] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Sync with window.location.hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'pc-building') {
        setActiveTab('pc-builder');
      } else if (hash === 'teardowns') {
        setActiveTab('teardown');
      } else if (['home', 'videos', 'community', 'pc-builder', 'teardown'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    window.location.hash = tabId;
  };

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950 tech-grid-pattern">
      {/* Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Pages */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            setActiveTab={handleTabChange}
            onOpenVideo={(v) => setSelectedVideo(v)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'videos' && (
          <VideosPage
            onOpenVideo={(v) => setSelectedVideo(v)}
          />
        )}

        {(activeTab === 'pc-builder' || activeTab === 'pc-building') && (
          <PCBuilderPage
            onOpenVideo={(v) => setSelectedVideo(v)}
            onShowToast={showToast}
          />
        )}

        {(activeTab === 'teardown' || activeTab === 'teardowns') && (
          <TeardownPage
            onOpenVideo={(v) => setSelectedVideo(v)}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'community' && (
          <CommunityPage
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        setActiveTab={handleTabChange}
        onSubscribe={(email) => {
          showToast({
            type: 'success',
            title: 'Subscribed!',
            message: `Welcome ${email} to the A2D Army notification list!`
          });
        }}
      />

      {/* 16:9 Video Player Modal */}
      {selectedVideo && (
        <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}

      {/* Toast Notifications */}
      {toast && (
        <Toast toast={toast} onClose={closeToast} />
      )}
    </div>
  );
}
