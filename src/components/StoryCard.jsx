import { Link } from 'react-router-dom'
import { resolveImage, getPlaceholderImage } from '../lib/imageUtils'
import SourceBadge from './SourceBadge'

export default function StoryCard({ item }) {
  const img = resolveImage([item.image, item.thumbnail], { w: 480, h: 270 })
  const to = `/story/${encodeURIComponent(item.id || item.slug || '')}`
  const onErr = e => { e.currentTarget.src = getPlaceholderImage(480,270) }

  return (
    <article className="min-w-[260px] max-w-[280px] rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
      <Link to={to} aria-label={item.title || 'Story'}>
        <img
          src={img}
          alt={item.title || 'Story image'}
          width="480"
          height="270"
          loading="lazy"
          decoding="async"
          onError={onErr}
          className="aspect-[16/9] w-full object-cover"
        />
      </Link>
      <div className="p-3 space-y-2">
        <SourceBadge source={item.source} />
        <h3 className="text-sm font-semibold text-[var(--aa-ink)] line-clamp-2">
          <Link to={to} className="hover:underline">{item.title}</Link>
        </h3>
        {item.excerpt && (
          <p className="text-xs text-slate-600 line-clamp-2">{item.excerpt}</p>
        )}
      </div>
    </article>
  )
}

