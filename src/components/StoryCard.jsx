import { Link } from 'react-router-dom';

export default function StoryCard({ item, dense=false, currentCatSlug='trump' }) {
  const id = encodeURIComponent(item.id);

  return (
    <article className={`bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow transition ${dense ? 'p-3' : 'p-4'}`}>
      {!dense && item.image_url && (
        <Link to={`/article/${id}`} state={{ cat: currentCatSlug }}>
          <div className="aspect-[16/9] w-full overflow-hidden rounded-md mb-3 bg-slate-100">
            <img src={item.image_url} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </Link>
      )}

      <Link to={`/article/${id}`} state={{ cat: currentCatSlug }}>
        <h3 className={`font-semibold leading-snug ${dense ? 'text-sm' : 'text-base'}`}>{item.title}</h3>
      </Link>

      {/* Left Blindspot chip */}
      {item.blindspot_left && (
        <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-rose-400 text-rose-600 text-[11px] font-medium">
          Left Blindspot
        </div>
      )}

      <p className={`mt-2 text-slate-600 ${dense ? 'text-xs line-clamp-2' : 'text-sm line-clamp-3'}`}>
        {item.excerpt || item.summary}
      </p>

      <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
        <span className="truncate">{item.source}</span>
        <span>•</span>
        <span>{item.timeAgo || item.readTime || ''}</span>
      </div>

      {/* Optional: coverage bar */}
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

