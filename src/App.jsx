import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, TrendingUp, Clock, ExternalLink, Search,
  Filter, Menu, X, ChevronRight, Newspaper, Shield,
  AlertTriangle, Database, Zap, Eye, Share2
} from 'lucide-react';
import { fetchAllNews, formatTimeAgo } from './utils/newsService';
import './index.css';

// Category Icons
const categoryIcons = {
  'Threats & Attacks': AlertTriangle,
  'Malware': Shield,
  'Privacy & Compliance': Database,
  'Security Updates': Zap,
  'AI & Technology': Eye,
  'Cyber Intelligence': Globe
};

// Category Colors
const categoryColors = {
  'Threats & Attacks': 'text-red-500',
  'Malware': 'text-orange-500',
  'Privacy & Compliance': 'text-blue-500',
  'Security Updates': 'text-green-500',
  'AI & Technology': 'text-purple-500',
  'Cyber Intelligence': 'text-cyan-500'
};

function App() {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('cyan'); // Default for testing

  const themes = [
    { id: 'cyan', name: 'Intelligence Cyan', color: '#00f2ff' },
    { id: 'amber', name: 'Amber Terminal', color: '#ffb700' },
    { id: 'violet', name: 'Electric Violet', color: '#bd00ff' },
    { id: 'stealth', name: 'Stealth Minimal', color: '#ffffff' },
    { id: 'ruby', name: 'Ruby Red', color: '#ff003c' },
    { id: 'emerald', name: 'Emerald Green', color: '#00ff88' },
    { id: 'gold', name: 'Gold Rush', color: '#ffd700' },
    { id: 'cobalt', name: 'Cobalt Blue', color: '#2e5bff' },
    { id: 'pink', name: 'Neon Pink', color: '#ff00d4' },
    { id: 'matrix', name: 'Matrix Green', color: '#00ff41' },
    { id: 'lava', name: 'Lava Orange', color: '#ff4d00' },
    { id: 'purple', name: 'Deep Purple', color: '#7b00ff' }
  ];

  useEffect(() => {
    loadNews();
  }, []);

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

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.snippet.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNews(filtered);
  };

  const categories = ['All', ...new Set(news.map(item => item.category))];

  return (
    <div className={`min-h-screen bg-background text-text-main theme-${activeTheme}`}>
      {/* Theme Switcher - Temporary for Approval */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-[280px]">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-orbitron font-bold text-white/40 uppercase tracking-widest text-center">
            Test New Highlight Themes
          </p>
          <p className="text-[8px] font-rajdhani text-white/20 text-center uppercase tracking-widest">
            Select high-impact highlights
          </p>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => setActiveTheme(theme.id)}
              style={{ backgroundColor: theme.color }}
              className={`w-10 h-10 rounded-full border-2 transition-all ${activeTheme === theme.id ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
              title={theme.name}
            />
          ))}
        </div>
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
                  NYTVNT<span className="text-[var(--accent-primary)]">.INTEL</span>
                </h1>
                <p className="text-[9px] font-rajdhani font-bold text-white/40 uppercase tracking-[0.3em]">
                  Secure Data Stream
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-orbitron font-bold uppercase tracking-widest text-text-secondary">
              <a href="#" className="hover:text-[var(--accent-primary)] transition-colors relative group">
                Live Feed
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent-primary)] transition-all group-hover:w-full" />
              </a>
              <a href="#" className="hover:text-[var(--accent-primary)] transition-colors relative group">
                Trending
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent-primary)] transition-all group-hover:w-full" />
              </a>
              <a href="#" className="hover:text-[var(--accent-primary)] transition-colors relative group">
                Archives
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent-primary)] transition-all group-hover:w-full" />
              </a>
              <a href="#network-access" className="hover:text-[var(--accent-primary)] transition-colors relative group">
                Access
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--accent-primary)] transition-all group-hover:w-full" />
              </a>
              <div className="h-4 w-[1px] bg-white/10 mx-2" />
              <button className="px-5 py-2 bg-[var(--accent-primary)] text-black text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(var(--accent-primary),0.3)]">
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
                <a href="#" className="text-xs font-orbitron font-bold uppercase tracking-widest p-2 hover:text-[var(--accent-primary)] transition-colors">
                  Live Feed
                </a>
                <a href="#" className="text-xs font-orbitron font-bold uppercase tracking-widest p-2 hover:text-[var(--accent-primary)] transition-colors">
                  Trending
                </a>
                <a href="#" className="text-xs font-orbitron font-bold uppercase tracking-widest p-2 hover:text-[var(--accent-primary)] transition-colors">
                  Archives
                </a>
                <a href="#network-access" className="text-xs font-orbitron font-bold uppercase tracking-widest p-2 hover:text-[var(--accent-primary)] transition-colors">
                  Access
                </a>
                <button className="w-full mt-2 px-5 py-3 bg-[var(--accent-primary)] text-black text-[10px] font-bold uppercase tracking-widest">
                  Access Terminal
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero / Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex-1 w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="text"
              placeholder="SEARCH DATA STREAM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface/50 border border-white/5 rounded-xl px-12 py-3 text-sm focus:outline-none focus:border-[var(--accent-primary)] transition-all font-rajdhani tracking-widest"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-[10px] font-orbitron font-black uppercase tracking-widest border transition-all ${selectedCategory === category
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

                <p className="text-xs text-text-secondary line-clamp-2 mb-4">
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
                © 2026 Times of NYTVNT. All rights reserved.
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
