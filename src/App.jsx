// src/App.jsx - FIXED Three-Column Layout with Viral Priority
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsCard from './components/NewsCard';
import DailyReads from './components/DailyReads';
import TrendingStories from './components/TrendingStories';
import Blindspot from './components/Blindspot';
import SkeletonCard from './components/SkeletonCard';
import SubscriptionModal from './components/SubscriptionModal';
import './index.css';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('TRUMP');
  const [error, setError] = useState(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  
  // Separate data for each section
  const [viralStories, setViralStories] = useState([]);
  const [dailyReads, setDailyReads] = useState([]);
  const [blindspots, setBlindspots] = useState([]);

  const categories = ['TRUMP', 'REPUBLICAN PARTY', 'EUROPE', 'ELON MUSK', 'STEVE BANNON'];

  useEffect(() => {
    loadNews(activeCategory);
  }, [activeCategory]);

  const loadNews = async (category) => {
    try {
      setLoading(true);
      setError(null);
      
      // Enhanced mock data with viral flags
      const mockNewsData = [
        // VIRAL STORIES (priority) - first 3
        {
          id: 1,
          slug: 'viral-trump-announcement',
          title: `🔥 VIRAL: ${category} Major Policy Announcement Breaks Internet`,
          excerpt: `This ${category} announcement has gone completely viral across all social media platforms. Breaking records for engagement and shares.`,
          content: 'Full viral content...',
          image: 'https://picsum.photos/800/600?random=viral1',
          thumbnail: 'https://picsum.photos/400/300?random=viral1',
          author: 'Breaking News Team',
          source: 'Atlantic Anvil VIRAL',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['viral', 'breaking'],
          published_at: new Date().toISOString(),
          is_viral: true,
          viral_score: 95,
          shares: 45000,
          engagement: 120000
        },
        {
          id: 2,
          slug: 'viral-explosive-interview',
          title: `🚀 EXPLOSIVE: ${category} Interview Everyone's Talking About`,
          excerpt: `This explosive ${category} interview has taken social media by storm. The quotes are already becoming memes.`,
          content: 'Full viral content...',
          image: 'https://picsum.photos/800/600?random=viral2',
          thumbnail: 'https://picsum.photos/400/300?random=viral2',
          author: 'Viral News Desk',
          source: 'Atlantic Anvil VIRAL',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['viral', 'interview'],
          published_at: new Date(Date.now() - 1800000).toISOString(),
          is_viral: true,
          viral_score: 89,
          shares: 32000,
          engagement: 95000
        },
        {
          id: 3,
          slug: 'viral-social-media-storm',
          title: `📱 TRENDING: ${category} Tweet Sparks Massive Response`,
          excerpt: `Social media erupts as this ${category} post generates thousands of responses and heated debate across platforms.`,
          content: 'Full viral content...',
          image: 'https://picsum.photos/800/600?random=viral3',
          thumbnail: 'https://picsum.photos/400/300?random=viral3',
          author: 'Social Media Desk',
          source: 'Atlantic Anvil VIRAL',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['viral', 'social-media'],
          published_at: new Date(Date.now() - 3600000).toISOString(),
          is_viral: true,
          viral_score: 82,
          shares: 28000,
          engagement: 78000
        },

        // REGULAR TRENDING STORIES - next 6
        {
          id: 4,
          slug: 'analysis-piece-2024',
          title: `${category} Analysis: What This Means for 2024`,
          excerpt: `In-depth analysis of recent ${category} developments and their potential impact on the upcoming election cycle.`,
          content: 'Full article content...',
          image: 'https://picsum.photos/800/600?random=4',
          thumbnail: 'https://picsum.photos/400/300?random=4',
          author: 'Sarah Analyst',
          source: 'Atlantic Anvil Analysis',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['analysis', '2024-election'],
          published_at: new Date(Date.now() - 7200000).toISOString(),
          is_viral: false
        },
        {
          id: 5,
          slug: 'breaking-statement',
          title: `Breaking: ${category} Official Statement Released`,
          excerpt: `Official statement released regarding recent events. Key points include policy changes and strategic directions.`,
          content: 'Full article content...',
          image: 'https://picsum.photos/800/600?random=5',
          thumbnail: 'https://picsum.photos/400/300?random=5',
          author: 'Political Desk',
          source: 'Atlantic Anvil Breaking',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['breaking', 'statement'],
          published_at: new Date(Date.now() - 10800000).toISOString(),
          is_viral: false
        },
        {
          id: 6,
          slug: 'policy-impact',
          title: `Policy Impact: How ${category} Changes Affect You`,
          excerpt: `Direct analysis of how recent ${category} policy changes will impact everyday Americans and businesses.`,
          content: 'Full article content...',
          image: 'https://picsum.photos/800/600?random=6',
          thumbnail: 'https://picsum.photos/400/300?random=6',
          author: 'Policy Team',
          source: 'Atlantic Anvil Policy',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['policy', 'impact'],
          published_at: new Date(Date.now() - 14400000).toISOString(),
          is_viral: false
        },

        // DAILY READS - next 5 for sidebar
        {
          id: 7,
          slug: 'daily-conservative-win',
          title: `Daily Win: ${category} Scores Victory on Key Issue`,
          excerpt: `Conservative victory as ${category} successfully advances important legislation through key committees.`,
          content: 'Full daily content...',
          image: 'https://picsum.photos/400/300?random=7',
          thumbnail: 'https://picsum.photos/300/200?random=7',
          author: 'Daily Reads Editor',
          source: 'Atlantic Anvil Daily',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['daily', 'victory'],
          published_at: new Date(Date.now() - 18000000).toISOString(),
          is_daily: true
        },
        {
          id: 8,
          slug: 'daily-patriot-news',
          title: `Patriot Update: ${category} Stands Firm on Values`,
          excerpt: `Unwavering commitment to conservative principles as ${category} takes strong stance on traditional values.`,
          content: 'Full daily content...',
          image: 'https://picsum.photos/400/300?random=8',
          thumbnail: 'https://picsum.photos/300/200?random=8',
          author: 'Patriot Desk',
          source: 'Atlantic Anvil Patriots',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['daily', 'patriot'],
          published_at: new Date(Date.now() - 21600000).toISOString(),
          is_daily: true
        },

        // BLINDSPOT STORIES - next 5 for right sidebar
        {
          id: 9,
          slug: 'blindspot-media-bias',
          title: `Media Blindspot: What They Won't Tell You About ${category}`,
          excerpt: `Mainstream media ignores this crucial ${category} development. Here's what they don't want you to know.`,
          content: 'Full blindspot content...',
          image: 'https://picsum.photos/400/300?random=9',
          thumbnail: 'https://picsum.photos/300/200?random=9',
          author: 'Blindspot Investigator',
          source: 'Atlantic Anvil Blindspot',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['blindspot', 'media-bias'],
          published_at: new Date(Date.now() - 25200000).toISOString(),
          is_blindspot: true
        },
        {
          id: 10,
          slug: 'blindspot-hidden-truth',
          title: `Hidden Truth: ${category} Story MSM Buried`,
          excerpt: `The story mainstream media doesn't want you to see about ${category}. Exclusive investigation reveals all.`,
          content: 'Full blindspot content...',
          image: 'https://picsum.photos/400/300?random=10',
          thumbnail: 'https://picsum.photos/300/200?random=10',
          author: 'Truth Seeker',
          source: 'Atlantic Anvil Truth',
          category: category,
          category_slug: category.toLowerCase().replace(/\s+/g, '-'),
          tags: ['blindspot', 'hidden'],
          published_at: new Date(Date.now() - 28800000).toISOString(),
          is_blindspot: true
        }
      ];
      
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Separate stories by type for different sections
      const viral = mockNewsData.filter(story => story.is_viral);
      const regular = mockNewsData.filter(story => !story.is_viral && !story.is_daily && !story.is_blindspot);
      const daily = mockNewsData.filter(story => story.is_daily);
      const blindspot = mockNewsData.filter(story => story.is_blindspot);
      
      // Combine viral + regular for main trending area (viral gets priority)
      const trendingCombined = [...viral, ...regular];
      
      setNews(mockNewsData);
      setViralStories(trendingCombined);
      setDailyReads(daily);
      setBlindspots(blindspot);
      
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
    <div className="min-h-screen bg-white">
      <Header 
        onSubscribe={handleSubscribe}
        onDonate={handleDonate}
        onMerch={handleMerch}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      {/* THREE-COLUMN LAYOUT like itsactuallygoodnews */}
      <div className="atlantic-layout">
        {/* LEFT SIDEBAR - Daily Reads */}
        <aside className="atlantic-daily-sidebar">
          <DailyReads 
            stories={loading ? [] : dailyReads} 
            loading={loading}
          />
        </aside>

        {/* CENTER MAIN AREA - Viral Stories (Priority) + Trending */}
        <main className="atlantic-main-content">
          <div className="atlantic-trending-header">
            <h2 className="atlantic-section-title">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Trending Stories
            </h2>
            <div className="atlantic-category-indicator">
              {activeCategory}
            </div>
          </div>
          
          <TrendingStories 
            stories={loading ? [] : viralStories}
            loading={loading}
          />
        </main>

        {/* RIGHT SIDEBAR - Blindspot */}
        <aside className="atlantic-blindspot-sidebar">
          <Blindspot 
            stories={loading ? [] : blindspots}
            loading={loading}
          />
        </aside>
      </div>
      
      <Footer />
      
      {showSubscriptionModal && (
        <SubscriptionModal onClose={() => setShowSubscriptionModal(false)} />
      )}
    </div>
  );
}

export default App;