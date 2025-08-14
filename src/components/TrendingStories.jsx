import HorizontalScroller from './HorizontalScroller'
import StoryCard from './StoryCard'

export default function TrendingStories({ items = [] }) {
  if (!items?.length) return null
  return (
    <HorizontalScroller title="Trending">
      {items.map(it => <StoryCard key={it.id || it.slug} item={it} />)}
    </HorizontalScroller>
  )
}

