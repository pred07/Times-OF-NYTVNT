import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, TrendingUp, Clock, ExternalLink, Search,
  Filter, Menu, X, ChevronRight, Newspaper, Shield,
  AlertTriangle, Database, Zap, Eye
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
  const [featuredNews, setFeaturedNews] = useState(null);

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
    setFeaturedNews(newsData[0]);
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
    <div className="min-h-screen bg-background text-text-main">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-background" />
              </div>
              <div>
                <h1 className="text-xl font-orbitron font-bold gradient-text">
                  TIMES OF NYTVNT
                </h1>
                <p className="text-[10px] text-muted uppercase tracking-widest">
                  Cyber Intelligence Network
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Latest
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Trending
              </a>
              <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
                Analysis
              </a>
              <button className="px-4 py-2 bg-primary text-background rounded-lg font-bold text-sm hover:bg-primary/90 transition-all">
                Subscribe
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              className="md:hidden border-t border-white/10 overflow-hidden"
            >
              <nav className="px-4 py-4 space-y-2">
                <a href="#" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                  Latest
                </a>
                <a href="#" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                  Trending
                </a>
                <a href="#" className="block py-2 text-sm font-medium hover:text-primary transition-colors">
                  Analysis
                </a>
                <button className="w-full mt-2 px-4 py-2 bg-primary text-background rounded-lg font-bold text-sm">
                  Subscribe
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
            <input
              type="text"
              placeholder="Search cyber intelligence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-4 py-3 text-text-main placeholder-muted focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${selectedCategory === category
                    ? 'bg-primary text-background'
                    : 'bg-surface border border-white/10 text-text-secondary hover:border-primary/50'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

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

        {/* News Grid */}
        {!loading && filteredNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, index) => {
              const Icon = categoryIcons[item.category] || Globe;
              const colorClass = categoryColors[item.category] || 'text-primary';

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-surface border border-white/10 rounded-xl p-6 hover:border-primary/50 hover-glow transition-all cursor-pointer"
                  onClick={() => window.open(item.link, '_blank')}
                >
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`flex items-center gap-2 text-xs font-mono ${colorClass}`}>
                      <Icon size={14} />
                      <span>{item.category}</span>
                    </div>
                    <span className="text-xs text-muted">{formatTimeAgo(item.date)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold font-rajdhani mb-3 line-clamp-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  {/* Snippet */}
                  <p className="text-sm text-text-secondary line-clamp-3 mb-4">
                    {item.snippet}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs font-mono text-muted">{item.source}</span>
                    <ExternalLink size={14} className="text-muted group-hover:text-primary transition-colors" />
                  </div>
                </motion.article>
              );
            })}
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
