import React from 'react';
import { useNavigate } from 'react-router-dom';
import InlineAd from './InlineAd';
import SourcePositivityBar from './SourcePositivityBar';

// Atlantic Anvil Themed Blindspot SVG
const createAtlanticBlindspotSVG = () => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg width="400" height="600" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="atlanticBlindspotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
          <stop offset="30%" style="stop-color:#c53030;stop-opacity:0.9" />
          <stop offset="70%" style="stop-color:#d69e2e;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#2b6cb0;stop-opacity:0.9" />
        </linearGradient>
        <filter id="eagleGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <pattern id="stars" patternUnits="userSpaceOnUse" width="50" height="50">
          <circle cx="25" cy="25" r="1" fill="white" opacity="0.3"/>
        </pattern>
      </defs>
      
      <!-- Background with eagle pattern -->
      <rect width="400" height="600" fill="url(#atlanticBlindspotGrad)"/>
      <rect width="400" height="600" fill="url(#stars)"/>
      
      <!-- Eagle silhouette -->
      <g filter="url(#eagleGlow)" transform="translate(200, 200)">
        <path d="M0 -40 L-30 -20 L-50 0 L-30 20 L-15 15 L0 25 L15 15 L30 20 L50 0 L30 -20 L0 -40 Z" 
              fill="white" opacity="0.9"/>
        <circle cx="0" cy="-10" r="3" fill="#1a365d"/>
      </g>
      
      <!-- Torch flame -->
      <g transform="translate(320, 120)">
        <ellipse cx="0" cy="0" rx="8" ry="15" fill="#d69e2e" opacity="0.8"/>
        <ellipse cx="0" cy="0" rx="5" ry="10" fill="white" opacity="0.6"/>
      </g>
      
      <!-- Lightning bolt -->
      <g transform="translate(80, 120)">
        <path d="M0 0 L8 0 L3 12 L6 12 L-2 20 L2 8 L-2 8 L0 0 Z" fill="#2b6cb0" opacity="0.8"/>
      </g>
      
      <!-- Magnifying glass for blindspot -->
      <g transform="translate(200, 350)">
        <circle cx="0" cy="0" r="25" fill="none" stroke="white" stroke-width="4" opacity="0.9"/>
        <circle cx="0" cy="0" r="15" fill="none" stroke="white" stroke-width="2" opacity="0.7"/>
        <line x1="18" y1="18" x2="30" y2="30" stroke="white" stroke-width="4" opacity="0.9"/>
      </g>
      
      <!-- Text -->
      <text x="200" y="450" text-anchor="middle" fill="white" font-family="Arial, sans-serif" 
            font-size="32" font-weight="800" opacity="0.95">BLINDSPOT</text>
      <text x="200" y="480" text-anchor="middle" fill="#d69e2e" font-family="Arial, sans-serif" 
            font-size="16" font-weight="600" opacity="0.9">Hidden Stories Revealed</text>
      <text x="200" y="510" text-anchor="middle" fill="white" font-family="Arial, sans-serif" 
            font-size="14" opacity="0.8">Underreported Conservative News</text>
    </svg>
  `)}`;
};

// Atlantic Anvil Bulletproof Image Component for Blindspot
const AtlanticBlindspotImage = ({ story, className }) => {
  const [currentSrc, setCurrentSrc] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorCount, setErrorCount] = React.useState(0);

  const getFallbackSources = () => {
    const safeTitle = String(story.title || 'Blindspot').replace(/[^\w\s]/g, '');
    const safeId = String(story.id || 7).replace(/[^\w]/g, '');
    
    return [
      story.image_url && typeof story.image_url === 'string' && story.image_url.startsWith('http') 
        ? story.image_url 
        : null,
      story.thumbnail_url && typeof story.thumbnail_url === 'string' && story.thumbnail_url.startsWith('http') 
        ? story.thumbnail_url 
        : null,
      
      // Conservative/patriotic themed fallbacks
      `https://source.unsplash.com/400x600/?conservative,news,america`,
      `https://source.unsplash.com/400x600/?patriotic,story,hidden`,
      `https://source.unsplash.com/400x600/?investigation,truth,journalism`,
      `https://picsum.photos/400/600?random=${Math.abs(safeId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) + 777}`,
      `https://via.placeholder.com/400x600/1a365d/white?text=${encodeURIComponent('BLINDSPOT')}`,
      
      createAtlanticBlindspotSVG()
    ].filter(src => src && src.trim() && src !== '#');
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
      console.log(`🔍 Atlantic Blindspot image error, trying fallback ${nextIndex + 1}/${sources.length}`);
      setCurrentSrc(sources[nextIndex]);
      setErrorCount(nextIndex);
      setIsLoading(true);
    } else {
      console.log('✅ All Atlantic Blindspot fallbacks exhausted, using final SVG');
      setIsLoading(false);
    }
  };

  const safeClassName = typeof className === 'string' 
    ? className.replace(/[^\w\s\-_]/g, '') 
    : '';

  const safeAlt = String(story.title || 'Blindspot Story').replace(/[^\w\s\-.,!?]/g, '');

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-atlantic-navy to-anvil-red">
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
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-atlantic-navy to-lightning-blue">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-8 h-8 border-3 border-torch-gold border-t-anvil-red rounded-full animate-spin"></div>
            <div className="text-white text-sm font-bold tracking-wide opacity-90 flex items-center space-x-2">
              <span>🔍</span>
              <span>Revealing Hidden Story...</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Preview badge for fallback stories with Atlantic theme */}
      {story.url === '#' && !isLoading && (
        <div className="absolute top-2 left-2 bg-gradient-to-r from-anvil-red to-torch-gold text-white text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide opacity-95 border border-white/20">
          🦅 Preview
        </div>
      )}

      {/* Atlantic Anvil patriotic accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-anvil-red via-white to-lightning-blue opacity-80"></div>
    </div>
  );
};

const AtlanticBlindspot = ({ stories }) => {
  const navigate = useNavigate();

  console.log('🔍 Atlantic Blindspot component rendered with:', stories?.length || 0, 'stories');
  
  const featured = stories?.slice(0, 2) || [];
  const headlines = stories?.slice(2, 12) || [];
  
  // Enhanced Atlantic Anvil themed fallback content
  const atlanticFallbackStories = [
    {
      id: 'atlantic-blindspot-1',
      title: 'Conservative Voices Rising: Untold Stories of American Resilience',
      summary: 'Discover the hidden narratives of patriotic Americans making a difference in their communities - stories the mainstream media won\'t tell.',
      image_url: null,
      url: '#',
      category: 'Blindspot',
      published_at: new Date().toISOString(),
      source_name: 'Atlantic Anvil News',
      positivity_score: 9
    },
    {
      id: 'atlantic-blindspot-2', 
      title: 'Small Town Heroes: Traditional Values Creating Big Impact',
      summary: 'From Main Street to rural America, conservative principles are driving positive change in communities across the nation.',
      image_url: null,
      url: '#',
      category: 'Blindspot',
      published_at: new Date().toISOString(),
      source_name: 'Patriot Tribune',
      positivity_score: 8
    }
  ];

  const displayStories = stories?.length > 0 ? stories : atlanticFallbackStories;
  const displayFeatured = displayStories.slice(0, 2);
  const displayHeadlines = displayStories.slice(2, 12);

  return (
    <div className="atlantic-sidebar-section blindspot-sidebar" style={{ padding: '0 0.5rem' }}>
      {/* Atlantic Anvil themed header */}
      <div className="atlantic-sidebar-header">
        <h2 className="atlantic-sidebar-title">
          <div className="atlantic-title-icon">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="atlantic-title-text">BLINDSPOT</span>
          <div className="atlantic-title-eagle">🦅</div>
          {stories?.length === 0 && (
            <span className="atlantic-preview-badge">Preview</span>
          )}
        </h2>
        <div className="atlantic-title-underline"></div>
      </div>
      
      {/* Featured Stories with Atlantic Anvil styling */}
      {displayFeatured.length > 0 && (
        <div className="atlantic-featured-cards">
          {displayFeatured.map((story) => (
            <button
              key={story.id}
              onClick={() => story.url === '#' ? null : navigate(`/article/${story.id}`)}
              className="atlantic-newscard group"
              disabled={story.url === '#'}
              style={{
                cursor: story.url === '#' ? 'default' : 'pointer',
                opacity: story.url === '#' ? 0.9 : 1
              }}
            >
              <AtlanticBlindspotImage
                story={story}
                className="atlantic-newscard-image group-hover:scale-105 transition-transform duration-500"
              />
              
              <div className="atlantic-newscard-overlay">
                <h3 className="atlantic-title-full">
                  {String(story.title || '').replace(/[^\w\s\-.,!?'"]/g, '')}
                </h3>
                {story.url === '#' && (
                  <p className="atlantic-preview-text">
                    <span className="inline-flex items-center space-x-1">
                      <span>⚡</span>
                      <span>Coming soon from Atlantic Anvil...</span>
                    </span>
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Headlines Section with Atlantic Anvil styling */}
      {displayHeadlines.length > 0 && (
        <div className="atlantic-headlines">
          {displayHeadlines.map((story, index) => (
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
                  onClick={() => story.url === '#' ? null : navigate(`/article/${story.id}`)}
                  className="atlantic-headline-button"
                  disabled={story.url === '#'}
                  style={{
                    cursor: story.url === '#' ? 'default' : 'pointer',
                    opacity: story.url === '#' ? 0.8 : 1
                  }}
                >
                  <h3 className="atlantic-headline-title">
                    {String(story.title || '').replace(/[^\w\s\-.,!?'"]/g, '')}
                    {story.url === '#' && (
                      <span className="atlantic-preview-inline">
                        🦅 Preview
                      </span>
                    )}
                  </h3>
                </button>
              </div>

              {/* Insert Atlantic themed inline ad every 4th headline */}
              {(index + 1) % 4 === 0 && index < displayHeadlines.length - 1 && (
                <InlineAd key={`atlantic-blindspot-ad-${index}`} />
              )}
              
              {/* Atlantic Anvil themed separator */}
              {index < displayHeadlines.length - 1 && (
                <div className="atlantic-separator">
                  <div className="atlantic-separator-line"></div>
                  <div className="atlantic-separator-star">⭐</div>
                  <div className="atlantic-separator-line"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Enhanced empty state with Atlantic Anvil theme */}
      {displayStories.length === 0 && (
        <div className="atlantic-empty-state">
          <div className="atlantic-empty-icon">
            <div className="atlantic-eagle-circle">
              <span className="text-4xl">🦅</span>
            </div>
          </div>
          <div className="atlantic-empty-content">
            <h3 className="atlantic-empty-title">Eagle Eyes Searching</h3>
            <p className="atlantic-empty-subtitle">
              Our patriotic journalists are uncovering hidden conservative stories
            </p>
            <p className="atlantic-empty-description">
              Check back soon for underreported news that matters to America
            </p>
          </div>
        </div>
      )}

      {/* Atlantic Anvil themed debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="atlantic-debug-info">
          <div className="atlantic-debug-header">
            <span className="text-torch-gold font-bold">🔧 Atlantic Anvil Debug:</span>
          </div>
          <div className="atlantic-debug-content">
            <p>Stories: {stories?.length || 0} | Featured: {displayFeatured.length} | Headlines: {displayHeadlines.length}</p>
            <p className="text-xs mt-1">
              Mode: {stories?.length > 0 ? '🦅 Live Feed' : '⚡ Preview Content'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AtlanticBlindspot;
