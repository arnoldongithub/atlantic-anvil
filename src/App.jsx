// src/App.jsx - WITH TEMPORARY MOCK DATA
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsCard from './components/NewsCard';
import SkeletonCard from './components/SkeletonCard';
import InlineAd from './components/InlineAd';
import SubscriptionModal from './components/SubscriptionModal';
// ─── TEMPORARILY COMMENTED OUT ───────────────────────────────────────
// import { fetchNews } from './lib/news-api.js';
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

  // ─── TEMPORARY MOCK DATA FUNCTION ───────────────────────────────────────
  const loadNews = async (category) => {
    try {
      setLoading(true);
      setError(null);
      
      // TEMPORARY: Mock data to see your UI
      const mockNewsData = [
        {
          id: 1,
          slug: 'trump-policy-update-1',
          title: `${category}: Major Policy Announcement Expected This Week`,
          excerpt: `Latest developments in ${category} coverage show significant movement on key issues. Sources close to the matter indicate major announcements expected in the coming days.`,
          content: 'Full article content would go here...',
          image: 'https://picsum.photos/800/600?random=1',
          thumbnail: 'https://picsum.photos/400/300?random=1',
          author: 'John Reporter',
          source: 'Atlantic Anvil News',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['politics', 'breaking-news'],
          published_at: new Date().toISOString()
        },
        {
          id: 2,
          slug: 'analysis-piece-2',
          title: `${category} Analysis: What This Means for 2024`,
          excerpt: `In-depth analysis of recent ${category} developments and their potential impact on the upcoming election cycle. Expert opinions and insider insights included.`,
          content: 'Full article content would go here...',
          image: 'https://picsum.photos/800/600?random=2',
          thumbnail: 'https://picsum.photos/400/300?random=2',
          author: 'Sarah Analyst',
          source: 'Political Insider',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['analysis', '2024-election'],
          published_at: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        },
        {
          id: 3,
          slug: 'breaking-update-3',
          title: `Breaking: ${category} Statement on Current Events`,
          excerpt: `Official statement released regarding recent events. This developing story continues to evolve as more information becomes available.`,
          content: 'Full article content would go here...',
          image: 'https://picsum.photos/800/600?random=3',
          thumbnail: 'https://picsum.photos/400/300?random=3',
          author: 'Mike Breaking',
          source: 'News Wire Service',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['breaking', 'statement'],
          published_at: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
        },
        {
          id: 4,
          slug: 'opinion-editorial-4',
          title: `Opinion: The Future of ${category} Politics`,
          excerpt: `Editorial perspective on the current state of ${category} politics and what we can expect moving forward. A thoughtful analysis of recent trends.`,
          content: 'Full article content would go here...',
          image: 'https://picsum.photos/800/600?random=4',
          thumbnail: 'https://picsum.photos/400/300?random=4',
          author: 'Editorial Board',
          source: 'Atlantic Anvil Editorial',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['opinion', 'editorial'],
          published_at: new Date(Date.now() - 10800000).toISOString() // 3 hours ago
        },
        {
          id: 5,
          slug: 'exclusive-interview-5',
          title: `Exclusive: Key Figure Discusses ${category} Strategy`,
          excerpt: `Exclusive interview with a key political figure discussing strategy and upcoming initiatives related to ${category}. Rare insights into behind-the-scenes planning.`,
          content: 'Full article content would go here...',
          image: 'https://picsum.photos/800/600?random=5',
          thumbnail: 'https://picsum.photos/400/300?random=5',
          author: 'Interview Team',
          source: 'Atlantic Anvil Exclusive',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['exclusive', 'interview'],
          published_at: new Date(Date.now() - 14400000).toISOString() // 4 hours ago
        },
        {
          id: 6,
          slug: 'investigation-report-6',
          title: `Investigation: Deep Dive into ${category} Connections`,
          excerpt: `Investigative report examining the connections and relationships within ${category} circles. Months of research reveal surprising findings.`,
          content: 'Full article content would go here...',
          image: 'https://picsum.photos/800/600?random=6',
          thumbnail: 'https://picsum.photos/400/300?random=6',
          author: 'Investigation Team',
          source: 'Atlantic Anvil Investigations',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['investigation', 'deep-dive'],
          published_at: new Date(Date.now() - 18000000).toISOString() // 5 hours ago
        },
        {
          id: 7,
          slug: 'market-impact-7',
          title: `Market Watch: How ${category} News Affects Wall Street`,
          excerpt: `Financial analysis of how ${category} developments impact market trends and investor confidence. Expert commentary on economic implications.`,
          content: 'Full article content would go here...',
          image: 'https://picsum.photos/800/600?random=7',
          thumbnail: 'https://picsum.photos/400/300?random=7',
          author: 'Financial Desk',
          source: 'Market Analytics',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['markets', 'finance'],
          published_at: new Date(Date.now() - 21600000).toISOString() // 6 hours ago
        },
        {
          id: 8,
          slug: 'international-perspective-8',
          title: `International View: Global Response to ${category}`,
          excerpt: `How international leaders and media are responding to recent ${category} developments. A global perspective on domestic politics.`,
          content: 'Full article content would go here...',
          image: 'https://picsum.photos/800/600?random=8',
          thumbnail: 'https://picsum.photos/400/300?random=8',
          author: 'International Desk',
          source: 'Global News Network',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['international', 'global-response'],
          published_at: new Date(Date.now() - 25200000).toISOString() // 7 hours ago
        },
        {
          id: 9,
          slug: 'social-media-buzz-9',
          title: `Social Media Buzz: ${category} Trending Topics`,
          excerpt: `Analysis of social media trends and conversations surrounding ${category}. What people are saying online and why it matters.`,
          content: 'Full article content would go here...',
          image: 'https://picsum.photos/800/600?random=9',
          thumbnail: 'https://picsum.photos/400/300?random=9',
          author: 'Social Media Team',
          source: 'Digital Trends',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['social-media', 'trending'],
          published_at: new Date(Date.now() - 28800000).toISOString() // 8 hours ago
        },
        {
          id: 10,
          slug: 'historical-context-10',
          title: `Historical Context: ${category} Through the Years`,
          excerpt: `A look back at how ${category} has evolved over time, providing important historical context for current events and future predictions.`,
          content: 'Full article content would go here...',
          image: 'https://picsum.photos/800/600?random=10',
          thumbnail: 'https://picsum.photos/400/300?random=10',
          author: 'History Desk',
          source: 'Atlantic Anvil Archives',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['history', 'context'],
          published_at: new Date(Date.now() - 32400000).toISOString() // 9 hours ago
        }
      ];
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setNews(mockNewsData);
      setMostRead(mockNewsData.slice(0, 5));
      setBlindspots(mockNewsData.slice(5, 10));
      
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
        {loading && (
          <div className="loading-container">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}
        
        {error && (
          <div className="error-container">
            <p className="error-message">{error}</p>
            <button onClick={() => loadNews(activeCategory)}>Try Again</button>
          </div>
        )}
        
        {!loading && !error && news.length > 0 && (
          <div className="news-grid">
            {news.map((article, index) => (
              <div key={article.id}>
                <NewsCard article={article} />
                {(index + 1) % 3 === 0 && <InlineAd />}
              </div>
            ))}
          </div>
        )}
        
        {!loading && !error && news.length === 0 && (
          <div className="no-news">
            <p>No news articles found for {activeCategory}</p>
          </div>
        )}
      </main>
      
      <Footer />
      
      {showSubscriptionModal && (
        <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} />
      )}
    </div>
  );
}

export default App;