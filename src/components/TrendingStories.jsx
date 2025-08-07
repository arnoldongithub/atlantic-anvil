import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InlineAd from './InlineAd';
import SourcePositivityBar from './SourcePositivityBar';

// Utility functions for content cleaning
const cleanTitle = (title) => {
  if (!title) return 'Breaking News';
  return String(title).replace(/[^\w\s\-.,!?'"]/g, '').trim();
};

const cleanSummary = (summary) => {
  if (!summary) return '';
  return String(summary).replace(/[^\w\s\-.,!?'"]/g, '').trim();
};

// Atlantic Anvil Themed Trending SVG
const createAtlanticTrendingSVG = (index = 0) => {
  const colors = [
    { primary: '#1a365d', secondary: '#c53030', accent: '#d69e2e' },
    { primary: '#c53030', secondary: '#2b6cb0', accent: '#d69e2e' },
    { primary: '#d69e2e', secondary: '#1a365d', accent: '#c53030' }
  ];
  
  const colorScheme = colors[index % colors.length];
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="atlanticTrendGrad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colorScheme.primary};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${colorScheme.secondary};stop-opacity:0.9" />
          <stop offset="100%" style="stop-color:${colorScheme.accent};stop-opacity:0.8" />
        </linearGradient>
        <filter id="patriotGlow${index}">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <pattern id="liberty${index}" patternUnits="userSpaceOnUse" width="60" height="60">
          <polygon points="30,10 35,20 45,20 37,27 40,37 30,32 20,37 23,27 15,20 25,20" 
                   fill="white" opacity="0.1"/>
        </pattern>
      </defs>
      
      <!-- Patriotic background with stars -->
      <rect width="800" height="600" fill="url(#atlanticTrendGrad${index})"/>
      <rect width="800" height="600" fill="url(#liberty${index})"/>
      
      <!-- Eagle wings spread -->
      <g transform="translate(400, 200)" filter="url(#patriotGlow${index})">
        <path d="M0 0 L-60 -30 L-100 -20 L-80 0 L-100 20 L-60 30 L0 0 L60 30 L100 20 L80 0 L100 -20 L60 -30 L0 0 Z" 
              fill="white" opacity="0.8"/>
        <circle cx="0" cy="-5" r="8" fill="${colorScheme.primary}"/>
        <path d="M-5 -8 L5 -8 L0 -15 Z" fill="${colorScheme.accent}"/>
      </g>
      
      <!-- Trending arrows -->
      <g transform="translate(200, 350)">
        <path d="M0 20 L0 0 L-10 10 M0 0 L10 10" stroke="white" stroke-width="4" fill="none" opacity="0.9"/>
        <path d="M20 25 L20 5 L10 15 M20 5 L30 15" stroke="white" stroke-width="4" fill="none" opacity="0.7"/>
        <path d="M40 30 L40 10 L30 20 M40 10 L50 20" stroke="white" stroke-width="4" fill="none" opacity="0.5"/>
      </g>
      
      <!-- Liberty torch -->
      <g transform="translate(600, 100)">
        <rect x="-2" y="20" width="4" height="60" fill="white" opacity="0.8"/>
        <ellipse cx="0" cy="0" rx="12" ry="20" fill="${colorScheme.accent}" opacity="0.9"/>
        <ellipse cx="0" cy="-3" rx="8" ry="14" fill="white" opacity="0.7"/>
      </g>
      
      <!-- Title -->
      <text x="400" y="450" text-anchor="middle" fill="white" font-family="Arial, sans-serif" 
            font-size="42" font-weight="800" opacity="0.95">TRENDING</text>
      <text x="400" y="490" text-anchor="middle" fill="${colorScheme.accent}" font-family="Arial, sans-serif" 
            font-size="18" font-weight="600" opacity="0.9">Rising Conservative Voices</text>
      <text x="400" y="520" text-anchor="middle" fill="white" font-family="Arial, sans-serif" 
            font-size="14" opacity="0.8">Stories Gaining Momentum</text>
    </svg>
  `)}`;
};

// Atlantic Anvil Bulletproof Image Component for Trending
const AtlanticTrendingImage = ({ story, className, index = 0 }) => {
  const [currentSrc, setCurrentSrc] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorCount, setErrorCount] = React.useState(0);

  const getFallbackSources = () => {
    const safeTitle = String(story.title || 'Trending').replace(/[^\w\s]/g, '');
    const safeId = String(story.id || 1).replace(/[^\w]/g, '');
    
    return [
      story.image_url && typeof story.image_url === 'string' && story.image_url.startsWith('http') 
        ? story.image_url 
        : null,
      story.thumbnail_url && typeof story.thumbnail_url === 'string' && story.thumbnail_url.startsWith('http') 
        ? story.thumbnail_url 
        : null,
      
      // Conservative trending themed fallbacks
      `https://source.unsplash.com/800x600/?trending,conservative,america`,
      `https://source.unsplash.com/800x600/?breaking,patriotic,news`,
      `https://source.unsplash.com/800x600/?viral,freedom,liberty`,
      `https://picsum.photos/800/600?random=${Math.abs(safeId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) + (index * 111)}`,
      `https://via.placeholder.com/800x600/1a365d/white?text=${encodeURIComponent('TRENDING')}`,
      
      createAtlanticTrendingSVG(index)
    ].filter(src => src && src.trim());
  };

  React.useEffect(() => {
    const sources = getFallbackSources();
    if (sources.length > 0) {
      setCurrentSrc(sources[0]);
      setErrorCount(0);
      setIsLoading(true);
    }
  }, [story.id, index]);

  const handleLoad = () => setIsLoading(false);
  
  const handleError = () => {
    const sources = getFallbackSources();
    const nextIndex = errorCount + 1;
    
    if (nextIndex < sources.length) {
      console.log(`📈 Atlantic Trending image error, trying fallback ${nextIndex + 1}/${sources.length}`);
      setCurrentSrc(sources[nextIndex]);
      setErrorCount(nextIndex);
      setIsLoading(true);
    } else {
      console.log('✅ All Atlantic Trending fallbacks exhausted, using final SVG');
      setIsLoading(false);
    }
  };

  const safeClassName = typeof className === 'string' 
    ? className.replace(/[^\w\s\-_]/g, '') 
    : '';

  const safeAlt = String(story.title || 'Trending Story').replace(/[^\w\s\-.,!?]/g, '');

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-atlantic-navy via-anvil-red to-torch-gold">
      {currentSrc && (
        <img
          src={currentSrc}
          alt={safeAlt}
          className={`${safeClassName} transition-all duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
      
      {/* Atlantic Anvil themed loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-atlantic-navy to-lightning-blue">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-10 h-10 border-3 border-torch-gold border-t-anvil-red rounded-full animate-spin"></div>
            <div className="text-white text-sm font-bold tracking-wide opacity-90 flex items-center space-x-2">
              <span>📈</span>
              <span>Loading Trending Story...</span>
            </div>
          </div>
        </div>
      )}

      {/* Atlantic Anvil patriotic accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-anvil-red via-white to-lightning-blue opacity-90"></div>
    </div>
  );
};

const AtlanticTrendingStories = ({ stories }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  if (!stories || stories.length === 0) {
    return (
      <div className="atlantic-empty-trending">
        <div className="atlantic-empty-icon">
          <div className="atlantic-eagle-circle bg-gradient-to-br from-atlantic-navy to-anvil-red">
            <span className="text-6xl">🦅</span>
          </div>
        </div>
        <div className="atlantic-empty-content">
          <h2 className="atlantic-empty-title text-2xl">Eagle Eyes Scanning</h2>
          <p className="atlantic-empty-subtitle">
            Our patriotic journalists are tracking the latest conservative trends
          </p>
          <p className="atlantic-empty-description">
            Check back soon for the most impactful stories rising in America!
          </p>
        </div>
      </div>
    );
  }

  // Filter stories by category if one is active
  const filteredStories = category
    ? stories.filter((story) => story.category?.toLowerCase() === category.toLowerCase())
    : stories;

  // Split into viral and regular stories with enhanced detection
  const viralStories = filteredStories
    .filter((story) => 
      (story.virality_score && story.virality_score >= 7) || 
      (story.viral_score && story.viral_score >= 8) ||
      (story.positivity_score >= 9) ||
      (story.trending_score && story.trending_score >= 8)
    )
    .slice(0, 3);

  const regularStories = filteredStories
    .filter((story) => !viralStories.includes(story))
    .slice(0, 15); // Increased for more content

  return (
    <div className="atlantic-trending-stories">
      {/* Viral Stories Section with Atlantic Anvil styling */}
      {viralStories.length > 0 && (
        <div className="atlantic-viral-section">
          <div className="atlantic-viral-grid">
            {viralStories.map((story, index) => (
              <button
                key={story.id}
                onClick={() => navigate(`/article/${story.id}`)}
                className="atlantic-viral-card group"
              >
                <AtlanticTrendingImage
                  story={story}
                  index={index}
                  className="atlantic-viral-image group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="atlantic-viral-overlay">
                  {/* Viral badge with Atlantic theme */}
                  <div className="atlantic-viral-badge">
                    {(story.virality_score >= 9 || story.viral_score >= 9) && (
                      <span className="atlantic-ultra-viral">🔥 ULTRA VIRAL</span>
                    )}
                    {(story.virality_score >= 8 || story.viral_score >= 8) && story.virality_score < 9 && (
                      <span className="atlantic-high-viral">⚡ VIRAL</span>
                    )}
                    {story.virality_score < 8 && story.viral_score < 8 && (
                      <span className="atlantic-trending-viral">📈 TRENDING</span>
                    )}
                  </div>
                  
                  <h3 className="atlantic-viral-title">
                    {cleanTitle(story.title)}
                  </h3>
                  
                  {/* Source and engagement info */}
                  <div className="atlantic-viral-meta">
                    <span className="atlantic-viral-source">
                      {story.source_name || story.source || 'Atlantic Anvil'}
                    </span>
                    {story.engagement_score && (
                      <span className="atlantic-viral-engagement">
                        🔥 {story.engagement_score}% engagement
                      </span>
                    )}
                  </div>
                </div>

                {/* Patriotic accent line */}
                <div className="atlantic-patriotic-accent"></div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Regular Headlines Section with Atlantic Anvil styling */}
      {regularStories.length > 0 && (
        <div className="atlantic-headlines-section">
          <div className="atlantic-trending-headlines">
            {regularStories.map((story, index) => (
              <React.Fragment key={story.id}>
                {/* Enhanced Source & Positivity Bar */}
                <SourcePositivityBar 
                  source={story.source_name || story.source}
                  positivityScore={story.positivity_score}
                  isViral={false}
                  isFirst={index < 2}
                />
                
                <div className="atlantic-trending-headline">
                  <button
                    onClick={() => navigate(`/article/${story.id}`)}
                    className="atlantic-trending-button"
                  >
                    <h3 className="atlantic-trending-title">
                      {cleanTitle(story.title)}
                    </h3>
                    
                    {story.summary && (
                      <p className="atlantic-trending-summary">
                        {cleanSummary(story.summary).slice(0, 120)}...
                      </p>
                    )}
                    
                    <div className="atlantic-trending-meta">
                      <div className="atlantic-meta-left">
                        {story.published_at && (
                          <span className="atlantic-date">
                            📅 {new Date(story.published_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="atlantic-meta-right">
                        {story.category && (
                          <span className="atlantic-category-badge">
                            {story.category}
                          </span>
                        )}
                        {story.trending_score && (
                          <span className="atlantic-trending-score">
                            📈 {story.trending_score}/10
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                </div>

                {/* Insert Atlantic themed inline ad every 5th headline */}
                {(index + 1) % 5 === 0 && index < regularStories.length - 1 && (
                  <InlineAd key={`atlantic-trending-ad-${index}`} />
                )}
                
                {/* Atlantic Anvil themed separator */}
                {index < regularStories.length - 1 && (
                  <div className="atlantic-separator">
                    <div className="atlantic-separator-line"></div>
                    <div className="atlantic-separator-star">📈</div>
                    <div className="atlantic-separator-line"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* No stories fallback with Atlantic theme */}
      {viralStories.length === 0 && regularStories.length === 0 && (
        <div className="atlantic-no-trends">
          <div className="atlantic-empty-icon">
            <div className="atlantic-eagle-circle bg-gradient-to-br from-torch-gold to-anvil-red">
              <span className="text-5xl">📈</span>
            </div>
          </div>
          <div className="atlantic-empty-content">
            <h3 className="atlantic-empty-title">Trends Loading</h3>
            <p className="atlantic-empty-subtitle">
              Conservative stories are gaining momentum
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtlanticTrendingStories;
