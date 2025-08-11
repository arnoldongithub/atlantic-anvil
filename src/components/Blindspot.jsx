import React, { useEffect, useState } from 'react';
import StoryCard from './StoryCard.jsx';
import { fetchNewsByCategorySlug } from '../lib/news-api.js';

export default function Blindspot({ slug = 'trump' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [slug]);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchNewsByCategorySlug(slug, { limit: 60 });
      const blind = data.filter(a => a.blindspot_left).slice(0, 10);
      setItems(blind);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-20 bg-white border border-slate-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!items.length) {
    return <div className="text-sm text-slate-500">No blindspot stories right now.</div>;
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <StoryCard key={item.id} item={item} dense currentCatSlug={slug} />
      ))}
    </div>
  );
}
