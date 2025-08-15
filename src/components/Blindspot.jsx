import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/card';
import { fetchNewsByCategorySlug } from '../lib/news-api.js';
import { cleanTitle, cleanSummary } from '../lib/utils';

export default function Blindspot({ slug = 'trump' }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());

  useEffect(() => { 
    load(); 
  }, [slug]);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchNewsByCategorySlug(slug, { limit: 60 });
      const blind = data.filter(a => a.blindspot_left).slice(0, 10);
      setItems(blind);
    } catch (error) {
      console.error('Error loading blindspot data:', error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  const handleImageError = (itemId) => {
    setImageErrors(prev => new Set(prev).add(itemId));
  };

  const handleStoryClick = (story) => {
    if (story?.id) {
      navigate(`/article/${story.id}`);
    }
  };

  if (loading) {
    return (
      <div className="w-80 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-orange-400 rounded animate-pulse"></div>
          </div>
          <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>

        {/* Loading Cards */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="w-80 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Blindspot</h2>
        </div>

        {/* Empty State */}
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">No blindspot stories</h3>
          <p className="text-xs text-gray-500">Check back later for coverage gaps</p>
        </div>
      </div>
    );
  }

  const featuredItems = items.slice(0, 2);
  const listItems = items.slice(2);

  return (
    <div className="w-80 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Blindspot</h2>
      </div>

      {/* Featured Blindspot Stories */}
      {featuredItems.length > 0 && (
        <div className="space-y-4">
          {featuredItems.map((item, index) => (
            <Card
              key={item.id || index}
              className="group cursor-pointer transition-all duration-300 hover:shadow-md overflow-hidden border-0 bg-white"
              onClick={() => handleStoryClick(item)}
            >
              {/* Image */}
              <div className="relative h-32 bg-gray-100 overflow-hidden">
                {item?.image_url && !imageErrors.has(item.id) ? (
                  <img
                    src={item.image_url}
                    alt={cleanTitle(item.title)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center">
                    <svg className="w-10 h-10 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                )}

                {/* Blindspot Badge */}
                <div className="absolute top-2 left-2">
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Coverage Gap
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3">
                <h3 className="font-semibold text-gray-900 mb-2 leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors text-sm">
                  {cleanTitle(item?.title)}
                </h3>
                
                <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-2">
                  {cleanSummary(item?.summary || item?.excerpt)}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  {item?.source_name && (
                    <span className="font-medium">{item.source_name}</span>
                  )}
                  {item?.reading_time && (
                    <span>{item.reading_time} min</span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Blindspot List */}
      {listItems.length > 0 && (
        <div className="space-y-1">
          {listItems.map((item, index) => (
            <div key={item.id || index}>
              {/* Source indicator */}
              {item?.source_name && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-orange-600">
                      {item.source_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{item.source_name}</span>
                  
                  {/* Coverage indicator */}
                  <div className="flex-1">
                    <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full w-3/4"></div>
                    </div>
                  </div>
                  
                  <span className="text-xs text-orange-600 font-medium">Gap</span>
                </div>
              )}

              {/* Story */}
              <button
                onClick={() => handleStoryClick(item)}
                className="w-full text-left p-3 rounded-lg hover:bg-orange-50 transition-colors group"
              >
                <h4 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-orange-600 transition-colors mb-1">
                  {cleanTitle(item?.title)}
                </h4>
                
                {item?.reading_time && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{item.reading_time} min read</span>
                  </div>
                )}
              </button>

              {/* Separator */}
              {index < listItems.length - 1 && (
                <div className="my-3 flex items-center">
                  <div className="flex-1 h-px bg-gray-100"></div>
                  <div className="w-1 h-1 bg-orange-200 rounded-full mx-4"></div>
                  <div className="flex-1 h-px bg-gray-100"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* View All Link */}
      <div className="pt-4 border-t border-gray-100">
        <button 
          onClick={() => navigate(`/blindspot/${slug}`)}
          className="w-full text-center text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors"
        >
          View all blindspot coverage →
        </button>
      </div>
    </div>
  );
}
