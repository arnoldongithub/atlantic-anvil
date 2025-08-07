import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsCard from './components/NewsCard';
import SkeletonCard from './components/SkeletonCard';
import InlineAd from './components/InlineAd';
import SubscriptionModal from './components/SubscriptionModal';
import { fetchNews, RSS_FEEDS } from './services/news-api';
import './index.css';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('TRUMP');
  const [error, setError] = useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [mostRead, setMostRead] = useState([]);
  const [blindspots, setBlindspots] = useState([]);

  const categories = ['TRUMP', 'REPUBLICAN PARTY', 'EUROPE', 'ELON MUSK', 'STEVE BANNON'];

  useEffect(() => {
    loadNews(activeCategory);
  }, [activeCategory]);

  const loadNews = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const newsData = await fetchNews(category);
      setNews(newsData);
      
      // Simulate most read and blindspot articles
      setMostRead(newsData.slice(0, 5));
      setBlindspots(newsData.slice(5, 10));
    } catch (err) {
      setError('Failed to load news. Please try again later.');
      console.error('News loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSubscribe = () => {
    setShowSubscriptionModal(true);
  };

  const handleDonate = () => {
    // Redirect to donation page - using organizations that accept international donations
    window.open('https://www.heritage.org/donate', '_blank');
  };

  const handleMerch = () => {
    // Redirect to merchandise store
    window.open('#', '_blank');
  };

  return (
    <div className="app-container">
      <Header 
        onSubscribe={handleSubscribe}
        onDonate={handleDonate}
        onMerch={handleMerch}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <main className="main-content">
        <div className="content-grid">
          {/* Left Sidebar */}
          <aside className="sidebar-section">
            <div className="sidebar-card">
              <h2 className="sidebar-title">
                🔥 Most Read
              </h2>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <div key={i} className="sidebar-item">
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text short" />
                  </div>
                ))
              ) : (
                mostRead.map((article, index) => (
                  <a
                    key={article.id || index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-item"
                  >
                    <div className="sidebar-item-title">{article.title}</div>
                    <div className="sidebar-item-meta">
                      {article.source} • {article.timeAgo}
                    </div>
                  </a>
                ))
              )}
            </div>

            <div className="sidebar-card">
              <h2 className="sidebar-title">
                👁️ Blindspot Reports
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Stories underreported by mainstream media
              </p>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="sidebar-item">
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text short" />
                  </div>
                ))
              ) : (
                blindspots.map((article, index) => (
                  <a
                    key={article.id || index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sidebar-item"
                  >
                    <div className="sidebar-item-title">{article.title}</div>
                    <div className="sidebar-item-meta">
                      {article.source} • {article.timeAgo}
                    </div>
                  </a>
                ))
              )}
            </div>
          </aside>

          {/* Main News Feed */}
          <section className="news-feed-section">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-foreground">
                Latest News: {activeCategory.replace('_', ' ')}
              </h1>
              <button
                onClick={() => loadNews(activeCategory)}
                className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                disabled={loading}
              >
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {loading ? (
                [...Array(10)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))
              ) : (
                news.map((article, index) => (
                  <div key={article.id || index}>
                    <NewsCard article={article} />
                    {/* Insert inline ads every 4 articles */}
                    {(index + 1) % 4 === 0 && <InlineAd />}
                  </div>
                ))
              )}
            </div>

            {!loading && news.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No articles found for {activeCategory.replace('_', ' ')}.
                </p>
                <button
                  onClick={() => loadNews(activeCategory)}
                  className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </section>

          {/* Right Sidebar */}
          <aside className="sidebar-section">
            <div className="sidebar-card">
              <h2 className="sidebar-title">
                📊 Trending Topics
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-medium">Election 2024</span>
                  <span className="text-sm text-destructive font-semibold">Hot</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-medium">Border Security</span>
                  <span className="text-sm text-primary font-semibold">Rising</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-medium">Economic Policy</span>
                  <span className="text-sm text-accent-gold font-semibold">Stable</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Foreign Policy</span>
                  <span className="text-sm text-muted-foreground">Moderate</span>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <h2 className="sidebar-title">
                🎯 Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-destructive text-destructive-foreground py-2 px-4 rounded-md hover:bg-destructive/90 transition-colors font-medium"
                >
                  Subscribe Now
                </button>
                <button
                  onClick={handleDonate}
                  className="w-full bg-accent-gold text-white py-2 px-4 rounded-md hover:bg-amber-700 transition-colors font-medium"
                >
                  Support Conservative Causes
                </button>
                <button
                  onClick={handleMerch}
                  className="w-full border border-border py-2 px-4 rounded-md hover:bg-muted transition-colors font-medium"
                >
                  Shop Merchandise
                </button>
              </div>
            </div>

            <div className="sidebar-card">
              <h2 className="sidebar-title">
                📧 Newsletter
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Get daily conservative news updates delivered to your inbox.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      {showSubscriptionModal && (
        <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} />
      )}
    </div>
  );
}

export default App;
