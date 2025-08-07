import { useState } from 'react';

const NewsCard = ({ article }) => {
  const [imageError, setImageError] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Determine bias indicator color based on source
  const getBiasIndicator = (source) => {
    const conservativeSources = ['Fox News', 'Daily Wire', 'Breitbart', 'NY Post'];
    const liberalSources = ['CNN', 'MSNBC', 'Washington Post', 'NY Times'];
    
    if (conservativeSources.some(s => source.toLowerCase().includes(s.toLowerCase()))) {
      return 'right';
    } else if (liberalSources.some(s => source.toLowerCase().includes(s.toLowerCase()))) {
      return 'left';
    }
    return 'center';
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    setBookmarked(!bookmarked);
  };

  const handleShare = (e) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: article.url,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(article.url);
      // You could show a toast notification here
    }
  };

  return (
    <article className="news-card">
      <div className="news-card-header">
        <div className="news-card-source">
          {article.source}
        </div>
        <div className={`bias-indicator ${getBiasIndicator(article.source)}`} />
      </div>

      {/* Article Image */}
      {article.imageUrl && !imageError && (
        <div className="mb-4">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-48 sm:h-56 object-cover rounded-md"
            onError={handleImageError}
            loading="lazy"
          />
        </div>
      )}

      {/* Article Title */}
      <h2 className="news-card-title">
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-primary transition-colors"
        >
          {article.title}
        </a>
      </h2>

      {/* Article Excerpt */}
      {article.excerpt && (
        <p className="news-card-excerpt">
          {article.excerpt}
        </p>
      )}

      {/* Article Summary (if available) */}
      {article.summary && (
        <div className="mb-4 p-3 bg-muted/30 rounded-md border-l-4 border-primary">
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            🤖 AI Summary
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {article.summary}
          </p>
        </div>
      )}

      {/* Article Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Article Footer */}
      <div className="news-card-footer">
        <div className="news-card-time">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>{article.timeAgo || '2h ago'}</span>
        </div>

        <div className="news-card-engagement">
          <button
            onClick={handleLike}
            className={`engagement-item ${liked ? 'text-destructive' : ''}`}
            title="Like article"
          >
            <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>{article.likes || 0}</span>
          </button>

          <button
            onClick={handleBookmark}
            className={`engagement-item ${bookmarked ? 'text-accent-gold' : ''}`}
            title="Bookmark article"
          >
            <svg className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>

          <button
            onClick={handleShare}
            className="engagement-item"
            title="Share article"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          </button>

          {/* Read time estimate */}
          <span className="text-xs text-muted-foreground">
            {article.readTime || '3 min read'}
          </span>
        </div>
      </div>

      {/* Credibility Score (Ground News inspired feature) */}
      {article.credibilityScore && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Source Credibility:</span>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${
                      i < article.credibilityScore 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-muted-foreground">
                ({article.credibilityScore}/5)
              </span>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default NewsCard;
