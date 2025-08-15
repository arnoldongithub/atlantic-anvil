// src/components/NewsCard.jsx - Enhanced with Images & Atlantic Anvil Styling
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewsCard = ({ article, variant = 'default', className = '' }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (!article) return null;

  const {
    id,
    title,
    excerpt,
    image,
    thumbnail,
    author,
    source,
    category,
    published_at,
    is_viral,
    viral_score,
    shares,
    engagement
  } = article;

  // Smart image selection with fallbacks
  const getImageSrc = () => {
    const sources = [image, thumbnail].filter(src => 
      src && typeof src === 'string' && src.startsWith('http')
    );
    return sources[0] || null;
  };

  const imageSrc = getImageSrc();

  const handleClick = (e) => {
    e.preventDefault();
    if (id) {
      navigate(`/article/${id}`);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Format time ago
  const getTimeAgo = (dateString) => {
    if (!dateString) return '';
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  // Clean text to prevent display issues
  const cleanText = (text) => {
    if (!text) return '';
    return String(text).replace(/[^\w\s\-.,!?'"]/g, '').trim();
  };

  const safeTitle = cleanText(title) || 'Untitled Story';
  const safeExcerpt = cleanText(excerpt) || '';
  const safeSource = cleanText(source) || 'Atlantic Anvil';
  const timeAgo = getTimeAgo(published_at);

  // Render different variants
  if (variant === 'featured') {
    return (
      <article className={`atlantic-newscard atlantic-newscard-featured ${className}`} onClick={handleClick}>
        <div className="atlantic-newscard-image-container">
          {imageSrc && !imageError ? (
            <>
              <img
                src={imageSrc}
                alt={safeTitle}
                className="atlantic-newscard-image"
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
              {imageLoading && (
                <div className="atlantic-image-loading">
                  <div className="atlantic-skeleton atlantic-skeleton-card"></div>
                </div>
              )}
            </>
          ) : (
            <div className="atlantic-image-placeholder">
              <div className="atlantic-placeholder-content">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="atlantic-text-sm atlantic-text-muted">Atlantic Anvil News</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="atlantic-newscard-content">
          {is_viral && (
            <div className="atlantic-viral-badge">
              🔥 VIRAL
              {viral_score && <span className="ml-1">({viral_score}%)</span>}
            </div>
          )}
          
          <h2 className="atlantic-newscard-title atlantic-text-xl atlantic-font-bold">
            {safeTitle}
          </h2>
          
          {safeExcerpt && (
            <p className="atlantic-newscard-excerpt">
              {safeExcerpt}
            </p>
          )}
          
          <div className="atlantic-newscard-meta">
            <div className="atlantic-source-info">
              <span className="atlantic-font-semibold">{safeSource}</span>
              {timeAgo && <span className="atlantic-text-muted"> • {timeAgo}</span>}
            </div>
            
            {is_viral && shares && (
              <div className="atlantic-viral-stats">
                <span className="atlantic-text-xs atlantic-text-muted">
                  📊 {shares.toLocaleString()} shares
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    );
  }

  // Default card variant
  return (
    <article className={`atlantic-newscard ${className}`} onClick={handleClick}>
      {imageSrc && !imageError ? (
        <div className="atlantic-newscard-image-container">
          <img
            src={imageSrc}
            alt={safeTitle}
            className="atlantic-newscard-image"
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
          {imageLoading && (
            <div className="atlantic-image-loading">
              <div className="atlantic-skeleton atlantic-skeleton-card"></div>
            </div>
          )}
        </div>
      ) : (
        <div className="atlantic-image-placeholder">
          <div className="atlantic-placeholder-content">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
        </div>
      )}
      
      <div className="atlantic-newscard-content">
        {is_viral && (
          <div className="atlantic-viral-badge">
            🔥 VIRAL
          </div>
        )}
        
        <h3 className="atlantic-newscard-title">
          {safeTitle}
        </h3>
        
        {safeExcerpt && (
          <p className="atlantic-newscard-excerpt">
            {safeExcerpt}
          </p>
        )}
        
        <div className="atlantic-newscard-meta">
          <div className="atlantic-source-info">
            <span className="atlantic-font-medium">{safeSource}</span>
            {timeAgo && <span className="atlantic-text-muted"> • {timeAgo}</span>}
          </div>
          
          {category && (
            <div className="atlantic-category-tag">
              <span className="atlantic-text-xs">{cleanText(category)}</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
