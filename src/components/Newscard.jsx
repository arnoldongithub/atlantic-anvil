import React from 'react';
import { Link } from 'react-router-dom';

// Drop-in compatible NewsCard (uses the same data shape as StoryCard)
export default function Newscard({ article, currentCatSlug = 'trump' }) {
  const id = encodeURIComponent(article.id);
  
  return (
    <article className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-4 news-card group">
      {article.image_url && (
        <Link to={`/article/${id}`} state={{ cat: currentCatSlug }}>
          <div className="aspect-[16/9] w-full overflow-hidden rounded-md mb-4 bg-slate-100">
            <img 
              src={article.image_url} 
              alt="" 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
              loading="lazy" 
            />
          </div>
        </Link>
      )}
      
      <Link to={`/article/${id}`} state={{ cat: currentCatSlug }}>
        <h3 className="headline-text font-bold text-gray-900 leading-tight mb-3 hover:text-red-600 transition-colors duration-200">
          {article.title}
        </h3>
      </Link>
      
      {article.blindspot_left && (
        <div className="mt-2 mb-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-rose-400 text-rose-600 text-[11px] font-medium">
          Left Blindspot
        </div>
      )}
      
      <p className="content-text text-slate-600 text-sm leading-relaxed mb-3">
        {article.excerpt || article.summary}
      </p>
      
      <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 font-medium">
        <span className="truncate font-semibold text-blue-600">
          {article.source}
        </span>
        <span>•</span>
        <span>{article.timeAgo || article.readTime || ''}</span>
      </div>
      
      {(article.left_hits + article.center_hits + article.right_hits) > 0 && (
        <div className="mt-4 h-1.5 w-full bg-slate-100 rounded overflow-hidden">
          <div 
            className="h-full bg-indigo-500 inline-block align-top" 
            style={{ width: pct(article.left_hits, article) }} 
          />
          <div 
            className="h-full bg-slate-500 inline-block align-top" 
            style={{ width: pct(article.center_hits, article) }} 
          />
          <div 
            className="h-full bg-rose-500 inline-block align-top" 
            style={{ width: pct(article.right_hits, article) }} 
          />
        </div>
      )}
    </article>
  );
}

function pct(n, item) {
  const total = (item.left_hits || 0) + (item.center_hits || 0) + (item.right_hits || 0);
  if (!total) return '0%';
  return `${Math.round((n / total) * 100)}%`;
}
