import React from 'react';
import { useNavigate } from 'react-router-dom';
import InlineAd from './InlineAd';
import SourcePositivityBar from './SourcePositivityBar';

// Atlantic Anvil Themed Daily Reads SVG
const createAtlanticDailySVG = () => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg width="400" height="600" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="atlanticDailyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2b6cb0;stop-opacity:1" />
          <stop offset="30%" style="stop-color:#1a365d;stop-opacity:0.95" />
          <stop offset="70%" style="stop-color:#d69e2e;stop-opacity:0.9" />
          <stop offset="100%" style="stop-color:#c53030;stop-opacity:0.95" />
        </linearGradient>
        <filter id="torchGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <pattern id="americanStars" patternUnits="userSpaceOnUse" width="40" height="40">
          <polygon points="20,5 23,14 32,14 25,20 28,29 20,23 12,29 15,20 8,14 17,14" 
                   fill="white" opacity="0.15"/>
        </pattern>
      </defs>
      
      <!-- Patriotic background -->
      <rect width="400" height="600" fill="url(#atlanticDailyGrad)"/>
      <rect width="400" height="600" fill="url(#americanStars)"/>
      
      <!-- Anvil silhouette -->
      <g transform="translate(200, 180)" filter="url(#torchGlow)">
        <rect x="-40" y="0" width="80" height="20" rx="5" fill="white" opacity="0.9"/>
        <rect x="-25" y="-30" width="50" height="30" rx="3" fill="white" opacity="0.8"/>
        <rect x="-15" y="-45" width="30" height="15" rx="2" fill="white" opacity="0.7"/>
      </g>
      
      <!-- Torch with flame -->
      <g transform="translate(120, 120)">
        <rect x="-3" y="10" width="6" height="40" fill="white" opacity="0.8"/>
        <ellipse cx="0" cy="0" rx="10" ry="18" fill="#d69e2e" opacity="0.9"/>
        <ellipse cx="0" cy="-2" rx="6" ry="12" fill="white" opacity="0.7"/>
        <ellipse cx="0" cy="-4" rx="3" ry="8" fill="#c53030" opacity="0.6"/>
      </g>
      
      <!-- Lightning bolt -->
      <g transform="translate(280, 120)">
        <path d="M0 0 L12 0 L4 18 L8 18 L-4 32 L4 14 L-4 14 L0 0 Z" fill="#2b6cb0" opacity="0.9"/>
      </g>
      
      <!-- Open book/scroll -->
      <g transform="translate(200, 300)">
        <ellipse cx="0" cy="0" rx="60" ry="40" fill="white" opacity="0.9"/>
        <ellipse cx="0" cy="0" rx="50" ry="32" fill="none" stroke="#1a365d" stroke-width="2" opacity="0.8"/>
        <line x1="-30" y1="-10" x2="30" y2="-10" stroke="#1a365d" stroke-width="1" opacity="0.6"/>
        <line x1="-35" y1="0" x2="35" y2="0" stroke="#1a365d" stroke-width="1" opacity="0.6"/>
        <line x1="-30" y1="10" x2="30" y2="10" stroke="#1a365d" stroke-width="1" opacity="0.6"/>
      </g>
      
      <!-- Title -->
      <text x="200" y="420" text-anchor="middle" fill="white" font-family="Arial, sans-serif" 
            font-size="36" font-weight="800" opacity="0.95">DAILY</text>
      <text x="200" y="460" text-anchor="middle" fill="white" font-family="Arial, sans-serif" 
            font-size="36" font-weight="800" opacity="0.95">READS</text>
      <text x="200" y="490" text-anchor="middle" fill="#d69e2e" font-family="Arial, sans-serif" 
            font-size="16" font-weight="600" opacity="0.9">Conservative Excellence Daily</text>
      <text x="200" y="520" text-anchor="middle" fill="white" font-family="Arial, sans-serif" 
            font-size="14" opacity="0.8">Curated by Patriots, For Patriots</text>
    </svg>
  `)}`;
};

// Atlantic Anvil Bulletproof Image Component for Daily Reads
const AtlanticDailyImage = ({ story, className }) => {
  const [currentSrc, setCurrentSrc] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorCount, setErrorCount] = React.useState(0);

  const getFallbackSources = () => {
    const safeTitle = String(story.title || 'Daily News').replace(/[^\w\s]/g, '');
    const safeId = String(story.id || 1).replace(/[^\w]/g, '');
    
    return [
      story.image_url && typeof story.image_url === 'string' && story.image_url.startsWith('http') 
        ? story.image_url 
        : null,
      story.thumbnail_url && typeof story.thumbnail_url === 'string' && story.thumbnail_url.startsWith('http') 
        ? story.thumbnail_url 
        : null,
      
      // Conservative/patriotic themed fallbacks
      `https://source.unsplash.com/400x600/?conservative,daily,america`,
      `https://source.unsplash.com/400x600/?patriotic,news,freedom`,
      `https://source.unsplash.com/400x600/?american,flag,liberty`,
      `https://picsum.photos/400/600?random=${Math.abs(safeId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) + 555}`,
      `https://via.placeholder.com/400x600/2b6cb0/white?text=${encodeURIComponent('DAILY READS')}`,
      
      createAtlanticDailySVG()
    ].filter(src => src && src.trim());
  };

  React.useEffect(() => {
    const sources = getFallbackSources();
    if (sources.length > 0) {
      setCurrentSrc(sources[0]);
      setErrorCount(0);
      setIsLoading(true);
    }
  }, [story.id]);

  const handleLoad = () => setIsLoading(false);
  
  const handleError = () => {
    const sources = getFallbackSources();
    const nextIndex = errorCount + 1;
    
    if (nextIndex < sources.length) {
      console.log(`📚 Atlantic Daily Reads image error, trying fallback ${nextIndex + 1}/${sources.length}`);
      setCurrentSrc(sources[nextIndex]);
      setErrorCount(nextIndex);
      setIsLoading(true);
    } else {
      console.log('✅ All Atlantic Daily fallbacks exhausted, using final SVG');
      setIsLoading(false);
    }
  };

  const safeClassName = typeof className === 'string' 
    ? className.replace(/[^\w\s\-_]/g, '') 
    : '';

  const safeAlt = String(story.title || 'Daily News').replace(/[^\w\s\-.,!?]/g, '');

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-lightning-blue to-atlantic-navy">
      {currentSrc && (
        <img
          src={currentSrc}
          alt={safeAlt}
          className={`${safeClassName} transition-all duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
      
      {/* Atlantic Anvil themed loading state */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lightning-blue to-atlantic-navy">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-3 border-torch-gold border-t-anvil-red rounded-full animate-spin"></div>
            <div className="text-white text-sm font-bold tracking-wide opacity-90 flex items-center space-x-2">
              <span>📚</span>
              <span>Loading Daily Excellence...</span>
            </div>
          </div>
        </div>
      )}

      {/* Atlantic Anvil patriotic accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-lightning-blue via-white to-anvil-red opacity-80"></div>
    </div>
  );
};

const AtlanticDailyReads = ({ stories }) => {
  const navigate = useNavigate();

  if (!stories || stories.length === 0) {
    return (
      <div className="atlantic-sidebar-section daily-reads-sidebar" style={{ padding: '0 0.5rem' }}>
        {/* Atlantic Anvil themed header */}
        <div className="atlantic-sidebar-header">
          <h2 className="atlantic-sidebar-title">
            <div className="atlantic-title-icon">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="atlantic-title-text">DAILY READS</span>
            <div className="atlantic-title-eagle">📚</div>
          </h2>
          <div className="atlantic-title-underline"></div>
        </div>

        {/* Atlantic Anvil themed empty state */}
        <div className="atlantic-empty-state">
          <div className="atlantic-empty-icon">
            <div className="atlantic-eagle-circle bg-gradient-to-br from-lightning-blue to-atlantic-navy">
              <span className="text-4xl">📚</span>
            </div>
          </div>
          <div className="atlantic-empty-content">
            <h3 className="atlantic-empty-title">Curating Excellence</h3>
            <p className="atlantic-empty-subtitle">
              Our editorial team is selecting today's finest conservative content
            </p>
            <p className="atlantic-empty-description">
              Check back soon for fresh daily reads that inform and inspire!
            </p>
          </div>
        </div>
      </div>
    );
  }

  const featured = stories.slice(0, 2);
  const headlines = stories.slice(2, 12);

  return (
    <div className="atlantic-sidebar-section daily-reads-sidebar" style={{ padding: '0 0.5rem' }}>
      {/* Atlantic Anvil themed header */}
      <div className="atlantic-sidebar-header">
        <h2 className="atlantic-sidebar-title">
          <div className="atlantic-title-icon">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="atlantic-title-text">DAILY READS</span>
          <div className="atlantic-title-eagle">📚</div>
        </h2>
        <div className="atlantic-title-underline"></div>
      </div>
      
      {/* Featured Stories with Atlantic Anvil styling */}
      {featured.length > 0 && (
        <div className="atlantic-featured-cards">
          {featured.map((story) => (
            <button
              key={story.id}
              onClick={() => navigate(`/article/${story.id}`)}
              className="atlantic-newscard group"
            >
              <AtlanticDailyImage
                story={story}
                className="atlantic-newscard-image group-hover:scale-105 transition-transform duration-500"
              />
              
              <div className="atlantic-newscard-overlay">
                <h3 className="atlantic-title-full">
                  {String(story.title || '').replace(/[^\w\s\-.,!?'"]/g, '')}
                </h3>
                
                {/* Quality badge for daily reads */}
                <div className="atlantic-quality-badge">
                  <span className="inline-flex items-center space-x-1">
                    <span>⭐</span>
                    <span className="text-xs font-semibold">Editor's Choice</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Headlines Section with Atlantic Anvil styling */}
      {headlines.length > 0 && (
        <div className="atlantic-headlines">
          {headlines.map((story, index) => (
            <React.Fragment key={story.id}>
              {/* Enhanced Source & Positivity Bar */}
              <SourcePositivityBar 
                source={String(story.source_name || story.source || '').replace(/[^\w\s.-]/g, '')}
                positivityScore={Math.max(0, Math.min(10, Number(story.positivity_score) || 0))}
                isViral={false}
                isFirst={index < 2}
              />
              
              <div className="atlantic-headline">
                <button
                  onClick={() => navigate(`/article/${story.id}`)}
                  className="atlantic-headline-button"
                >
                  <h3 className="atlantic-headline-title">
                    {String(story.title || '').replace(/[^\w\s\-.,!?'"]/g, '')}
                  </h3>
                  
                  {/* Reading time estimate for daily reads */}
                  {story.reading_time && (
                    <div className="atlantic-reading-time">
                      <span className="inline-flex items-center space-x-1 text-xs text-torch-gold">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{story.reading_time} min read</span>
                      </span>
                    </div>
                  )}
                </button>
              </div>

              {/* Insert Atlantic themed inline ad every 4th headline */}
              {(index + 1) % 4 === 0 && index < headlines.length - 1 && (
                <InlineAd key={`atlantic-daily-ad-${index}`} />
              )}
              
              {/* Atlantic Anvil themed separator */}
              {index < headlines.length - 1 && (
                <div className="atlantic-separator">
                  <div className="atlantic-separator-line"></div>
                  <div className="atlantic-separator-star">📚</div>
                  <div className="atlantic-separator-line"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Atlantic Anvil themed debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="atlantic-debug-info">
          <div className="atlantic-debug-header">
            <span className="text-torch-gold font-bold">🔧 Atlantic Daily Debug:</span>
          </div>
          <div className="atlantic-debug-content">
            <p>Stories: {stories?.length || 0} | Featured: {featured.length} | Headlines: {headlines.length}</p>
            <p className="text-xs mt-1">
              Status: 📚 Daily Excellence Curated
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtlanticDailyReads;
