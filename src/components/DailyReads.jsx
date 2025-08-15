import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cleanTitle, cleanSummary } from '../lib/utils';

const DailyReads = ({ stories = [] }) => {
  const navigate = useNavigate();
  const [imageErrors, setImageErrors] = useState(new Set());

  const handleImageError = (storyId) => {
    setImageErrors(prev => new Set(prev).add(storyId));
  };

  const handleStoryClick = (story) => {
    if (story?.id) {
      navigate(`/article/${story.id}`);
    }
  };

  if (!stories || stories.length === 0) {
    return (
      <div className="atlantic-daily-sidebar">
        {/* Header */}
        <div className="atlantic-sidebar-header">
          <h2 className="atlantic-sidebar-title">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Daily Reads
          </h2>
        </div>

        {/* Empty State */}
        <div className="atlantic-text-center" style={{ padding: '3rem 0' }}>
          <div style={{ 
            width: '4rem', 
            height: '4rem', 
            background: 'var(--bg-subtle)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1rem' 
          }}>
            <svg className="w-8 h-8" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="atlantic-text-sm atlantic-font-medium" style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>No stories yet</h3>
          <p className="atlantic-text-xs" style={{ color: 'var(--text-muted)' }}>Check back soon for curated daily reads</p>
        </div>
      </div>
    );
  }

  const featuredStories = stories.slice(0, 2);
  const listStories = stories.slice(2, 12);

  return (
    <div className="atlantic-daily-sidebar">
      {/* Header */}
      <div className="atlantic-sidebar-header">
        <h2 className="atlantic-sidebar-title">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Daily Reads
        </h2>
      </div>

      {/* Featured Stories */}
      {featuredStories.length > 0 && (
        <div className="atlantic-mb-6">
          {featuredStories.map((story, index) => (
            <div
              key={story.id || index}
              className="atlantic-newscard group atlantic-mb-4"
              onClick={() => handleStoryClick(story)}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                {story?.image_url && !imageErrors.has(story.id) ? (
                  <img
                    src={story.image_url}
                    alt={cleanTitle(story.title)}
                    className="atlantic-newscard-image transition-transform duration-500 group-hover:scale-105"
                    style={{ height: '160px' }}
                    onError={() => handleImageError(story.id)}
                  />
                ) : (
                  <div style={{ 
                    width: '100%', 
                    height: '160px', 
                    background: 'linear-gradient(135deg, var(--aa-navy), var(--aa-gold))', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <svg className="w-12 h-12 text-white opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                )}

                {/* Editor's Choice Badge */}
                <div className="absolute top-3 left-3">
                  <span style={{ 
                    background: 'var(--aa-crimson)', 
                    color: 'white', 
                    fontSize: '0.75rem', 
                    padding: '0.25rem 0.5rem', 
                    borderRadius: '20px', 
                    fontWeight: '600' 
                  }}>
                    Editor's Choice
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="atlantic-newscard-content">
                <h3 className="atlantic-newscard-title group-hover:text-blue-600 transition-colors">
                  {cleanTitle(story?.title)}
                </h3>
                
                <p className="atlantic-newscard-excerpt atlantic-mb-2">
                  {cleanSummary(story?.summary || story?.excerpt)}
                </p>

                {/* Meta */}
                <div className="atlantic-newscard-meta">
                  {story?.source_name && (
                    <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{story.source_name}</span>
                  )}
                  {story?.reading_time && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {story.reading_time} min
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Story List */}
      {listStories.length > 0 && (
        <div>
          {listStories.map((story, index) => (
            <div key={story.id || index} className="atlantic-sidebar-item">
              <button
                onClick={() => handleStoryClick(story)}
                style={{ 
                  width: '100%', 
                  textAlign: 'left', 
                  background: 'none', 
                  border: 'none', 
                  padding: '0', 
                  cursor: 'pointer'
                }}
              >
                <h4 className="atlantic-sidebar-item-title">
                  {cleanTitle(story?.title)}
                </h4>
                
                {story?.reading_time && (
                  <div className="atlantic-sidebar-item-meta">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{story.reading_time} min read</span>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* View All Link */}
      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
        <button 
          onClick={() => navigate('/daily-reads')}
          style={{ 
            width: '100%', 
            textAlign: 'center', 
            color: 'var(--aa-crimson)', 
            fontSize: '0.875rem', 
            fontWeight: '500', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.color = '#b91c1c'}
          onMouseOut={(e) => e.target.style.color = 'var(--aa-crimson)'}
        >
          View all daily reads →
        </button>
      </div>
    </div>
  );
};

export default DailyReads;
