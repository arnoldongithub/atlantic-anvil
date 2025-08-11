import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchArticleById, fetchRelatedArticles } from '../lib/news-api.js';

export default function Article() {
  const { id } = useParams();       // UUID (encoded)
  const location = useLocation();   // { state: { cat: 'trump' } }
  const nav = useNavigate();

  const [article, setArticle] = useState(null);
  const [catSlug, setCatSlug] = useState(() => location.state?.cat || localStorage.getItem('lastCatSlug') || 'trump');
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (location.state?.cat) {
      setCatSlug(location.state.cat);
      localStorage.setItem('lastCatSlug', location.state.cat);
    } else if (!localStorage.getItem('lastCatSlug')) {
      localStorage.setItem('lastCatSlug', catSlug);
    }
  }, [location.state, catSlug]);

  useEffect(() => {
    (async () => {
      const uuid = decodeURIComponent(id);
      const a = await fetchArticleById(uuid);
      setArticle(a);
      if (a) {
        const rel = await fetchRelatedArticles(catSlug, a.id, { limit: 6 });
        setRelated(rel);
      }
    })();
  }, [id, catSlug]);

  if (!article) return <div className="mx-auto max-w-3xl px-4 py-10">Loading…</div>;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => nav(-1)} className="text-sm text-slate-500 hover:underline">← Back</button>

      <h1 className="mt-2 text-3xl font-bold leading-tight">{article.title}</h1>
      <div className="mt-2 text-sm text-slate-500">
        {article.source} • {article.timeAgo || article.readTime || ''}
      </div>

      {article.image_url && (
        <div className="mt-5 aspect-[16/9] w-full overflow-hidden rounded-lg bg-slate-100">
          <img src={article.image_url} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Summary */}
      <div className="prose prose-slate mt-6">
        <p>{article.summary || article.excerpt}</p>
        {article.url && (
          <p>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
              Read original source
            </a>
          </p>
        )}
      </div>

      {/* Related */}
      {related?.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Related Stories</h2>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            {related.map(it => (
              <RelatedCard key={it.id} item={it} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function RelatedCard({ item }) {
  return (
    <article className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
      {item.image_url && (
        <div className="aspect-[16/9] w-full overflow-hidden rounded-md mb-3 bg-slate-100">
          <img src={item.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      <h3 className="font-semibold leading-snug text-base">{item.title}</h3>

      {item.blindspot_left && (
        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-rose-400 text-rose-600 text-[11px] font-medium">
          Left Blindspot
        </div>
      )}

      <p className="mt-2 text-sm text-slate-600 line-clamp-3">{item.excerpt || item.summary}</p>
      <div className="mt-3 text-xs text-slate-500">{item.source} • {item.timeAgo || item.readTime || ''}</div>

      {(item.left_hits + item.center_hits + item.right_hits) > 0 && (
        <div className="mt-3 h-1.5 w-full bg-slate-100 rounded overflow-hidden">
          <div className="h-full bg-indigo-500 inline-block align-top" style={{width: pct(item.left_hits, item)}} />
          <div className="h-full bg-slate-500 inline-block align-top" style={{width: pct(item.center_hits, item)}} />
          <div className="h-full bg-rose-500 inline-block align-top" style={{width: pct(item.right_hits, item)}} />
        </div>
      )}
    </article>
  );
}

function pct(n, item) {
  const total = (item.left_hits||0)+(item.center_hits||0)+(item.right_hits||0);
  if (!total) return '0%';
  return `${Math.round((n/total)*100)}%`;
}

