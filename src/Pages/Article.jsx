import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchStoryById, fetchRelatedStories } from '../lib/news-api'
import HorizontalScroller from '../components/HorizontalScroller'
import StoryCard from '../components/StoryCard'
import SourceBadge from '../components/SourceBadge'
import { getPlaceholderImage, resolveImage } from '../lib/imageUtils'

export default function Article() {
  const { id } = useParams()
  const [story, setStory] = useState(null)
  const [related, setRelated] = useState([])
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    const run = async () => {
      try {
        setLoading(true)
        const s = await fetchStoryById(decodeURIComponent(id))
        if (!alive) return
        setStory(s)
        if (s?.category || s?.category_slug) {
          const rel = await fetchRelatedStories(s.category_slug || s.category, s.id || s.slug, { limit: 8 })
          if (!alive) return
          setRelated(rel || [])
        }
      } catch (e) {
        setErr(e?.message || 'Failed to load article')
      } finally {
        if (alive) setLoading(false)
      }
    }
    run()
    return () => { alive = false }
  }, [id])

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="h-6 w-2/3 bg-slate-200 rounded mb-4 animate-pulse"></div>
      <div className="h-4 w-1/2 bg-slate-200 rounded mb-8 animate-pulse"></div>
      <div className="aspect-[16/9] w-full bg-slate-200 rounded animate-pulse"></div>
    </div>
  }

  if (err) return <div className="mx-auto max-w-3xl px-4 py-10 text-red-600">{err}</div>
  if (!story) return null

  const hero = resolveImage([story.image, story.hero], { w: 1280, h: 720 })
  const onErr = e => { e.currentTarget.src = getPlaceholderImage(1280,720) }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-[var(--aa-ink)]">{story.title}</h1>
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <SourceBadge source={story.source} />
        {story.author && <span>• {story.author}</span>}
        {story.published_at && <span>• {new Date(story.published_at).toLocaleDateString()}</span>}
      </div>

      <img
        src={hero}
        alt={story.title}
        className="w-full rounded-md border border-slate-200"
        loading="eager"
        onError={onErr}
      />

      {story.content && (
        <article className="prose prose-slate max-w-none">
          <div dangerouslySetInnerHTML={{__html: story.content}} />
        </article>
      )}

      {!!related?.length && (
        <section>
          <HorizontalScroller title="Related stories">
            {related.map(it => <StoryCard key={it.id || it.slug} item={it} />)}
          </HorizontalScroller>
        </section>
      )}
    </main>
  )
}

