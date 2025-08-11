// src/App.jsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsCard from './components/NewsCard';
import SkeletonCard from './components/SkeletonCard';
import InlineAd from './components/InlineAd';
import SubscriptionModal from './components/SubscriptionModal';
// ─── FIXED IMPORT ───────────────────────────────────────
import { fetchNews } from './lib/news-api.js';
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
      setMostRead(newsData.slice(0, 5));
      setBlindspots(newsData.slice(5, 10));
    } catch (err) {
      setError('Failed to load news. Please try again later.');
      console.error('News loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => setActiveCategory(category);
  const handleSubscribe = () => setShowSubscriptionModal(true);
  const handleDonate = () => window.open('https://www.heritage.org/donate', '_blank');
  const handleMerch = () => window.open('#', '_blank');

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
        {/* … your sidebars and news feed … */}
      </main>

      <Footer />

      {showSubscriptionModal && (
        <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} />
      )}
    </div>
  );
}

export default App;

