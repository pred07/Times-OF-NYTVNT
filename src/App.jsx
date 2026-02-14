import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, TrendingUp, Clock, ExternalLink, Search,
  Filter, Menu, X, ChevronRight, Newspaper, Shield,
  AlertTriangle, Database, Zap, Eye, Share2,
  Settings, Moon, Sun, Palette
} from 'lucide-react';
import { fetchAllNews, formatTimeAgo } from './utils/newsService';
import './index.css';

// Color Groups with Intensities
const colorGroups = [
  {
    name: 'Cyan',
    base: '#00f2ff',
    variants: [
      { id: 'cyan-1', color: '#00f2ff', name: 'Ultra' },
      { id: 'cyan-2', color: '#00d8e6', name: 'High' },
      { id: 'cyan-3', color: '#00bccc', name: 'Medium' },
      { id: 'cyan-4', color: '#008b99', name: 'Low' },
    ]
  },
  {
    name: 'Blue',
    base: '#0055ff',
    variants: [
      { id: 'blue-1', color: '#0055ff', name: 'Royal' },
      { id: 'blue-2', color: '#00b4ff', name: 'Sky' },
      { id: 'blue-3', color: '#2e5bff', name: 'Cobalt' },
      { id: 'blue-4', color: '#4b0082', name: 'Indigo' },
    ]
  },
  {
    name: 'Red',
    base: '#ff003c',
    variants: [
      { id: 'red-1', color: '#ff003c', name: 'Ruby' },
      { id: 'red-2', color: '#ff4d00', name: 'Lava' },
      { id: 'red-3', color: '#e11d48', name: 'Rose' },
    ]
  },
  {
    name: 'Green',
    base: '#00ff41',
    variants: [
      { id: 'green-1', color: '#00ff41', name: 'Matrix' },
      { id: 'green-2', color: '#00ff88', name: 'Emerald' },
      { id: 'green-3', color: '#22c55e', name: 'Forest' },
    ]
  },
  {
    name: 'Amber',
    base: '#ffb700',
    variants: [
      { id: 'amber-1', color: '#ffb700', name: 'Terminal' },
      { id: 'amber-2', color: '#ffd700', name: 'Gold' },
      { id: 'amber-3', color: '#f59e0b', name: 'Amber' },
    ]
  },
  {
    name: 'Violet',
    base: '#bd00ff',
    variants: [
      { id: 'violet-1', color: '#bd00ff', name: 'Electric' },
      { id: 'violet-2', color: '#7b00ff', name: 'Deep' },
      { id: 'violet-3', color: '#8b5cf6', name: 'Soft' },
    ]
  },
  {
    name: 'Monochrome',
    base: '#ffffff',
    variants: [
      { id: 'stealth', color: '#ffffff', name: 'Stealth' },
      { id: 'silver', color: '#94a3b8', name: 'Silver' },
      { id: 'slate', color: '#475569', name: 'Slate' },
    ]
  }
];

function App() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [activeTheme, setActiveTheme] = useState('cyan-1');
  const [selectedGroup, setSelectedGroup] = useState(colorGroups[0]);

  useEffect(() => {
    loadNews();
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      // setIsLightMode(true); // Optional: default to system
    }
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  useEffect(() => {
    document.body.className = isLightMode ? 'light-mode' : '';
  }, [isLightMode]);

  useEffect(() => {
    filterNews();
  }, [news, selectedCategory, searchQuery]);

  const loadNews = async () => {
    setLoading(true);
    const newsData = await fetchAllNews();
    setNews(newsData);
    setLoading(false);
  };

  const filterNews = () => {
    let filtered = news;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.snippet.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredNews(filtered);
  };

  const categories = ['All', ...new Set(news.map(item => item.category))];

  // Dynamically set accent color based on active theme
  const getActiveColor = () => {
    const allVariants = colorGroups.flatMap(g => g.variants);
    return allVariants.find(v => v.id === activeTheme)?.color || '#00f2ff';
  };

  return (
    <div className={`min-h-screen bg-background text-text-main theme-custom transition-all duration-500 ${isLightMode ? 'light-mode' : ''}`} style={{ '--accent-primary': getActiveColor() }}>
      {/* Premium Theme Customizer Widget */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
        <AnimatePresence>
          {isCustomizerOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-4 p-6 bg-surface/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-[320px] overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Palette className="text-[var(--accent-primary)]" size={20} />
                  <h3 className="text-xs font-orbitron font-black uppercase tracking-[0.2em]">Interface Kit</h3>
                </div>
                <button
                  onClick={() => setIsLightMode(!isLightMode)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                  title={isLightMode ? "Switch to Dark" : "Switch to Light"}
                >
                  {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              </div>

              {/* Main Color Groups */}
              <div className="space-y-6">
                <div>
                  <label className="text-[9px] font-rajdhani font-bold text-white/40 uppercase tracking-widest block mb-3">Primary Hue</label>
                  <div className="grid grid-cols-7 gap-2">
                    {colorGroups.map(group => (
                      <button
                        key={group.name}
                        onClick={() => setSelectedGroup(group)}
                        className={`w-8 h-8 rounded-lg border-2 transition-all flex items-center justify-center ${selectedGroup.name === group.name ? 'border-white scale-110' : 'border-transparent opacity-40 hover:opacity-100 scale-90'}`}
                        style={{ backgroundColor: group.base }}
                      >
                        {selectedGroup.name === group.name && <div className="w-1 h-1 bg-white rounded-full" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intensity Selection */}
                <motion.div
                  key={selectedGroup.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="pt-4 border-t border-white/5"
                >
                  <label className="text-[9px] font-rajdhani font-bold text-white/40 uppercase tracking-widest block mb-4">Intensity Spectrum</label>
                  <div className="flex gap-2">
                    {selectedGroup.variants.map(variant => (
                      <button
                        key={variant.id}
                        onClick={() => setActiveTheme(variant.id)}
                        className={`group relative flex-1 h-12 rounded-xl transition-all overflow-hidden ${activeTheme === variant.id ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-105 z-10' : 'opacity-60 hover:opacity-100 hover:scale-105'}`}
                        style={{ backgroundColor: variant.color }}
                        title={variant.name}
                      >
                        <div className="absolute inset-x-0 bottom-0 p-1 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-[7px] font-orbitron font-bold text-white text-center truncate">{variant.name}</p>
                        </div>
                        {activeTheme === variant.id && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isCustomizerOpen ? 'bg-white text-black rotate-90' : 'bg-[var(--accent-primary)] text-black hover:scale-110 shadow-[0_0_20px_rgba(var(--accent-primary),0.3)]'}`}
        >
          {isCustomizerOpen ? <X size={24} /> : <Settings size={24} className="animate-spin-slow" />}
        </button>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative">
                <div className="w-10 h-10 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 rounded flex items-center justify-center group-hover:border-[var(--accent-primary)] transition-all duration-500">
                  <Shield size={20} className="text-[var(--accent-primary)]" />
                </div>
                <div className="absolute -inset-1 bg-[var(--accent-primary)]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <h1 className="text-xl font-orbitron font-black tracking-tighter leading-none">
                  NYTVNT <span className="text-[var(--accent-primary)]">INTEL</span>
                </h1>
                <p className="text-[9px] font-rajdhani font-bold text-white/40 uppercase tracking-[0.3em]">
                  Secure Data Stream
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-orbitron font-bold uppercase tracking-widest text-text-secondary">
              <a href="#" className="hover:text-[var(--accent-primary)] transition-colors relative group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Live Feed
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent-primary)] transition-all group-hover:w-full" />
              </a>
              <a href="#network-access" className="hover:text-[var(--accent-primary)] transition-colors relative group" onClick={(e) => { e.preventDefault(); document.getElementById('network-access')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Access
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent-primary)] transition-all group-hover:w-full" />
              </a>
              <div className="h-4 w-[1px] bg-white/10 mx-2" />
              <button
                onClick={() => window.open('https://www.amylucia.com/', '_blank')}
                className="px-5 py-2 bg-[var(--accent-primary)] text-black text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(var(--accent-primary),0.3)]"
              >
                Access Terminal
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/5 rounded-lg transition-colors border border-white/10"
            >
              {mobileMenuOpen ? <X size={20} className="text-[var(--accent-primary)]" /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-white/5 bg-background overflow-hidden"
            >
              <nav className="px-4 py-6 flex flex-col gap-4">
                <a href="#" className="text-xs font-orbitron font-bold uppercase tracking-widest p-2 hover:text-[var(--accent-primary)] transition-colors" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }}>
                  Live Feed
                </a>
                <a href="#network-access" className="text-xs font-orbitron font-bold uppercase tracking-widest p-2 hover:text-[var(--accent-primary)] transition-colors" onClick={(e) => { e.preventDefault(); document.getElementById('network-access')?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); }}>
                  Access
                </a>
                <button
                  onClick={() => { window.open('https://www.amylucia.com/', '_blank'); setMobileMenuOpen(false); }}
                  className="w-full mt-2 px-5 py-3 bg-[var(--accent-primary)] text-black text-[10px] font-bold uppercase tracking-widest"
                >
                  Access Terminal
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero / Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Expandable Search Icon */}
          <motion.div
            animate={{ width: isSearchExpanded ? '280px' : '48px' }}
            className={`relative flex items-center h-12 glass-effect rounded-2xl overflow-hidden border border-white/10 group ${isSearchExpanded ? 'bg-surface/90' : 'bg-surface/30 cursor-pointer hover:border-[var(--accent-primary)]/50'}`}
            onClick={() => !isSearchExpanded && setIsSearchExpanded(true)}
          >
            <div className="flex items-center justify-center w-12 h-12 flex-shrink-0">
              <Search
                size={18}
                className={`transition-colors duration-300 ${isSearchExpanded ? 'text-[var(--accent-primary)]' : 'text-text-muted group-hover:text-[var(--accent-primary)]'}`}
              />
            </div>

            <AnimatePresence>
              {isSearchExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex-1 flex items-center pr-4"
                >
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search intelligence..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onBlur={() => !searchQuery && setIsSearchExpanded(false)}
                    className="w-full bg-transparent border-none outline-none text-sm font-rajdhani text-text-main placeholder:text-text-muted/50"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery('');
                      setIsSearchExpanded(false);
                    }}
                    className="p-1 hover:bg-white/5 rounded-md transition-colors"
                  >
                    <X size={14} className="text-white/40" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Categories */}
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 items-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-none px-4 py-2 rounded-lg text-[10px] font-orbitron font-black uppercase tracking-widest border transition-all ${selectedCategory === category
                  ? 'bg-[var(--accent-primary)] text-black border-[var(--accent-primary)]'
                  : 'bg-surface/50 border-white/5 text-text-secondary hover:border-[var(--accent-primary)]/50'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="feed-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        {/* The previous search and filter section was replaced by the new Hero/Filter Section above */}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 relative">
              <motion.div
                className="absolute inset-0 border-4 border-primary/30 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
            </div>
            <p className="mt-4 text-sm font-mono text-muted animate-pulse">
              LOADING INTELLIGENCE FEED...
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-primary)]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-surface/50 border border-white/5 rounded-xl p-5 hover:bg-surface transition-all cursor-pointer"
                onClick={() => window.open(item.link, '_blank')}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-orbitron font-bold border border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[var(--accent-primary)]/10">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-text-muted">
                    <Clock size={12} />
                    {formatTimeAgo(item.date)}
                  </div>
                </div>

                <h3 className="text-sm font-rajdhani font-bold leading-tight mb-3 group-hover:text-[var(--accent-primary)] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-text-secondary line-clamp-5 mb-4 leading-relaxed">
                  {item.snippet}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] font-bold text-text-muted">{item.source}</span>
                  <ExternalLink size={14} className="text-text-muted group-hover:text-[var(--accent-primary)] transition-colors" />
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredNews.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-xl font-bold mb-2">No Intelligence Found</h3>
            <p className="text-muted text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
        {/* Network Access Section */}
        <section id="network-access" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/5">
          <div className="relative">
            <div className="absolute -top-12 left-0 text-[120px] font-orbitron font-black text-white/[0.02] select-none uppercase tracking-tighter">
              Access
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-orbitron font-black uppercase tracking-tighter mb-4">
                NETWORK <span className="text-[var(--accent-primary)]">ACCESS</span>
              </h2>
              <div className="w-20 h-1 bg-[var(--accent-primary)] mb-12" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LinkedIn / Follow Ops */}
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden bg-surface/30 border border-white/10 rounded-2xl p-8 hover:border-[var(--accent-primary)]/50 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Share2 size={80} className="text-[var(--accent-primary)]" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[var(--accent-primary)]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <TrendingUp className="text-[var(--accent-primary)]" size={24} />
                    </div>
                    <h3 className="text-2xl font-orbitron font-black uppercase tracking-tight mb-2">
                      FOLLOW <span className="text-[var(--accent-primary)]">OPS</span>
                    </h3>
                    <p className="text-text-secondary font-rajdhani font-bold text-sm tracking-widest uppercase mb-6 opacity-60">
                      Sovereign Intel Stream // LinkedIn Ops
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-orbitron font-bold text-[var(--accent-primary)] uppercase tracking-widest">
                      <span>Initiate Connection</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </motion.a>

                {/* Discord / Discord Comms */}
                <motion.a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden bg-surface/30 border border-white/10 rounded-2xl p-8 hover:border-[var(--accent-primary)]/50 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Globe size={80} className="text-[var(--accent-primary)]" />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[var(--accent-primary)]/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Globe className="text-[var(--accent-primary)]" size={24} />
                    </div>
                    <h3 className="text-2xl font-orbitron font-black uppercase tracking-tight mb-2">
                      DISCORD <span className="text-[var(--accent-primary)]">COMMS</span>
                    </h3>
                    <p className="text-text-secondary font-rajdhani font-bold text-sm tracking-widest uppercase mb-6 opacity-60">
                      Encrypted Network // Global Intelligence
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-orbitron font-bold text-[var(--accent-primary)] uppercase tracking-widest">
                      <span>Join Command Center</span>
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <span className="text-sm font-mono text-muted">
                © 2026 Project NYTVNT Intel. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
