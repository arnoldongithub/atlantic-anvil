import React, { useState } from 'react';

// Atlantic Anvil Themed Viral News Card Component
const ViralNewsCard = ({ article }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (!article) return null;

  // SAFE: Create fallback SVG for viral stories
  const createViralFallbackSVG = () => {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
      <svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="viralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1a365d;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#c53030;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#d69e2e;stop-opacity:0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="400" height="300" fill="url(#viralGrad)"/>
        <g filter="url(#glow)">
          <path d="M200 80 L220 120 L260 120 L230 150 L240 190 L200 170 L160 190 L170 150 L140 120 L180 120 Z" 
                fill="white" opacity="0.9"/>
        </g>
        <circle cx="200" cy="200" r="30" fill="white" opacity="0.3"/>
        <circle cx="200" cy="200" r="20" fill="white" opacity="0.4"/>
        <circle cx="200" cy="200" r="10" fill="white" opacity="0.5"/>
        <text x="200" y="250" text-anchor="middle" fill="white" font-family="Arial, sans-serif" 
              font-size="20" font-weight="700" opacity="0.9">🔥 VIRAL</text>
      </svg>
    `)}`;
  };

  // Multiple fallback sources for viral content
  const getFallbackSources = () => {
    const safeTitle = String(article.title || 'Viral News').replace(/[^\w\s]/g, '');
    const safeId = String(article.id || 1).replace(/[^\w]/g, '');
    
    return [
      article.image_url,
      article.thumbnail_url,
      `https://source.unsplash.com/800x600/?breaking,news,viral`,
      `https://source.unsplash.com/800x600/?trending,story,popular`,
      `https://picsum.photos/800/600?random=${Math.abs(safeId.split('').reduce((a, b) => a + b.charCodeAt(0), 0)) + 999}`,
      `https://via.placeholder.com/800x600/1a365d/white?text=${encodeURIComponent('VIRAL NEWS')}`,
      createViralFallbackSVG()
    ].filter(src => src && src.trim());
  };

  const handleImageError = () => {
    const fallbacks = getFallbackSources();
    const currentIndex = fallbacks.indexOf(document.querySelector(`[data-article-id="${article.id}"] img`)?.src);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < fallbacks.length) {
      const img = document.querySelector(`[data-article-id="${article.id}"] img`);
      if (img) {
        img.src = fallbacks[nextIndex];
      }
    } else {
      setImageError(true);
      setImageLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Clean and sanitize article data
  const safeTitle = String(article.title || 'Breaking News').replace(/[^\w\s\-.,!?'"]/g, '');
  const safeUrl = article.url || '#';
  const safeImageUrl = getFallbackSources()[0];

  // Determine viral badge style based on virality score
  const getViralBadgeStyle = () => {
    const viralScore = article.virality_score || article.viral_score || 8;
    
    if (viralScore >= 9) {
      return {
        className: 'viral-badge-ultra',
        text: '🔥 ULTRA VIRAL',
        bgColor: 'linear-gradient(135deg, #c53030 0%, #d69e2e 100%)'
      };
    } else if (viralScore >= 8) {
      return {
        className: 'viral-badge-high',
        text: '⚡ VIRAL',
        bgColor: 'linear-gradient(135deg, #1a365d 0%, #c53030 100%)'
      };
    } else {
      return {
        className: 'viral-badge-trending',
        text: '📈 TRENDING',
        bgColor: 'linear-gradient(135deg, #d69e2e 0%, #1a365d 100%)'
      };
    }
  };

  const viralBadge = getViralBadgeStyle();

  return (
    <a
      href={safeUrl}
      data-article-id={article.id}
      className="atlantic-viral-card group block relative w-full h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl"
      onClick={(e) => {
        if (safeUrl === '#') {
          e.preventDefault();
        }
      }}
    >
      {/* Atlantic Anvil Themed Image Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-atlantic-navy to-anvil-red">
        {!imageError && safeImageUrl && (
          <img
            src={safeImageUrl}
            alt={safeTitle}
            className={`object-cover w-full h-full transition-all duration-700 group-hover:scale-110 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        )}
        
        {/* Loading state with Atlantic Anvil theme */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-atlantic-navy to-lightning-blue">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-8 h-8 border-3 border-torch-gold border-t-anvil-red rounded-full animate-spin"></div>
              <div className="text-white text-sm font-semibold tracking-wide opacity-80">
                Loading Viral Story...
              </div>
            </div>
          </div>
        )}

        {/* Atlantic Anvil gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-atlantic-navy/95 via-atlantic-navy/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Eagle-inspired pattern overlay */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
             style={{
               backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
                 <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                   <g fill="none" stroke="#d69e2e" stroke-width="1" opacity="0.3">
                     <circle cx="30" cy="30" r="20"/>
                     <circle cx="30" cy="30" r="10"/>
                   </g>
                 </svg>
               `)}")`,
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>

      {/* Atlantic Anvil Viral Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div 
          className={`${viralBadge.className} px-3 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-wider shadow-lg border border-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
          style={{ background: viralBadge.bgColor }}
        >
          <div className="flex items-center space-x-1">
            <span>{viralBadge.text}</span>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Patriotic accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-anvil-red via-white to-lightning-blue opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Title Overlay with Atlantic Anvil Typography */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <div className="relative z-10">
          {/* Source badge */}
          {article.source_name && (
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-torch-gold/20 text-torch-gold border border-torch-gold/30 rounded-full text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
                {String(article.source_name).replace(/[^\w\s.-]/g, '')}
              </span>
            </div>
          )}

          {/* Main title with Atlantic Anvil styling */}
          <h3 className="text-white text-base md:text-lg lg:text-xl font-bold leading-tight mb-2 line-clamp-3 group-hover:text-torch-gold transition-colors duration-300">
            {safeTitle}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-torch-gold to-anvil-red group-hover:w-full transition-all duration-500"></div>
          </h3>

          {/* Article metadata */}
          <div className="flex items-center space-x-4 text-white/80 text-xs">
            {article.published_at && (
              <span className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{new Date(article.published_at).toLocaleDateString()}</span>
              </span>
            )}
            
            {article.positivity_score && (
              <span className="flex items-center space-x-1">
                <span className="text-torch-gold">⭐</span>
                <span>{article.positivity_score}/10</span>
              </span>
            )}
          </div>
        </div>

        {/* Atlantic Anvil decorative element */}
        <div className="absolute bottom-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32 8L40 24H56L44 34L48 50L32 42L16 50L20 34L8 24H24L32 8Z" fill="currentColor" className="text-torch-gold"/>
          </svg>
        </div>
      </div>

      {/* Hover effect - Lightning bolt */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg className="w-12 h-12 text-torch-gold animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-atlantic-navy to-anvil-red">
          <div className="text-center text-white p-4">
            <div className="text-4xl mb-2">🦅</div>
            <div className="text-lg font-bold mb-1">VIRAL STORY</div>
            <div className="text-sm opacity-80">Loading...</div>
          </div>
        </div>
      )}
    </a>
  );
};

export default ViralNewsCard;
