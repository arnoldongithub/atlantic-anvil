import { useEffect, useState } from 'react';
import CategoryCarousel from '../components/CategoryCarousel.jsx';
import StoryCard from '../components/StoryCard.jsx';
import Blindspot from '../components/Blindspot.jsx';
import { fetchNews, CATEGORY_SLUGS } from '../lib/news-api.js';

const PRETTY_TO_SLUG = CATEGORY_SLUGS;

export default function Home() {
  const [prettyCat, setPrettyCat] = useState(() => localStorage.getItem('lastCatPretty') || 'Trump');
  const [slug, setSlug] = useState(() => PRETTY_TO_SLUG[prettyCat] || 'trump');

  const [trending, setTrending] = useState([]);
  const [dailyReads, setDailyReads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = PRETTY_TO_SLUG[prettyCat] || 'trump';
    setSlug(s);
    localStorage.setItem('lastCatPretty', prettyCat);
    localStorage.setItem('lastCatSlug', s);
  }, [prettyCat]);

  useEffect(() => { load(slug); }, [slug]);

  async function load(catSlug) {
    setLoading(true);
    try {
      const data = await fetchNews(catSlug, { limit: 40 });
      setTrending(data.slice(0, 12));
      setDailyReads(data.slice(12, 20));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <CategoryCarousel active={prettyCat} onChange={setPrettyCat} />

      <div className="mt-4 grid grid-cols-12 gap-5">
        {/* left gutter */}
        <div className="hidden lg:block col-span-1" />

        {/* Blindspot (1/6) */}
        <section className="col-span-12 lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold">Blindspot</h2>
          <Blindspot slug={slug} />
        </section>

        {/* Trending (2/3) */}
        <section className="col-span-12 lg:col-span-6 space-y-4">
          <h2 className="text-lg font-semibold">Trending</h2>
          {loading ? skeletonGrid(6) : (
            <div className="grid md:grid-cols-2 gap-4">
              {trending.map(item => <StoryCard key={item.id} item={item} currentCatSlug={slug} />)}
            </div>
          )}
        </section>

        {/* Daily Reads (1/6) */}
        <section className="col-span-12 lg:col-span-2 space-y-3">
          <h2 className="text-lg font-semibold">Daily Reads</h2>
          {loading ? skeletonList(6) : dailyReads.map(item => (
            <StoryCard key={item.id} item={item} dense currentCatSlug={slug} />
          ))}
        </section>

        {/* right gutter */}
        <div className="hidden lg:block col-span-1" />
      </div>
    </div>
  );
}

function skeletonList(n) {
  return Array.from({length:n}).map((_,i)=>(
    <div key={i} className="h-20 bg-white border border-slate-200 rounded-lg animate-pulse" />
  ));
}
function skeletonGrid(n) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {Array.from({length:n}).map((_,i)=>(
        <div key={i} className="h-56 bg-white border border-slate-200 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

