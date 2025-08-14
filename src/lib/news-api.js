/**
 * Atlantic Anvil – news-api (complete, client-side Supabase)
 * - Mirrors the ItsActuallyGoodNews UX needs
 * - Keeps Atlantic Anvil theme/fields
 * - Exposes "Source" (no positivity bar)
 * - Adds related stories, trending/latest, category & search helpers
 *
 * NOTE: This is a browser-safe client. Keep Row Level Security ON and write
 * policies to allow read access for the anon key.
 */

import { createClient } from '@supabase/supabase-js'

/* ------------------------------------------------------------------ */
/* Supabase client                                                     */
/* ------------------------------------------------------------------ */
const SUPA_URL = import.meta.env.VITE_SUPABASE_URL
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!SUPA_URL || !SUPA_KEY) {
  // Do not throw at module scope to avoid SSR/build issues; log instead.
  console.error(
    '[news-api] Missing Supabase env. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
  )
}

export const supabase = createClient(SUPA_URL ?? '', SUPA_KEY ?? '')

/* ------------------------------------------------------------------ */
/* Schema config – tweak names if your DB differs                      */
/* ------------------------------------------------------------------ */
const TABLE_STORIES = 'stories'

/** Columns we select from the DB. Add/remove if your table differs. */
const COLS = `
  id,
  slug,
  title,
  excerpt,
  content,
  image,
  thumbnail,
  author,
  source,
  category,
  category_slug,
  tags,
  published_at
`

/** Default page size */
const DEFAULT_LIMIT = 12

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/**
 * Ensure a consistent client-side shape for story objects.
 * This keeps the UI stable even if some columns are null/missing.
 */
function normalizeStory(row) {
  if (!row) return null
  const id = row.id ?? row.slug
  const slug = row.slug ?? String(row.id ?? '')
  return {
    id,
    slug,
    title: row.title ?? '',
    excerpt: row.excerpt ?? '',
    content: row.content ?? '',
    image: row.image ?? row.thumbnail ?? null,
    thumbnail: row.thumbnail ?? null,
    author: row.author ?? null,
    source: row.source ?? null,                 // <— USED BY SourceBadge
    category: row.category ?? row.category_slug ?? null,
    category_slug: row.category_slug ?? row.category ?? null,
    tags: Array.isArray(row.tags) ? row.tags : (row.tags ? String(row.tags).split(',').map(s=>s.trim()).filter(Boolean) : []),
    published_at: row.published_at ?? null
  }
}

/** Simple guard to avoid crashing UI on Supabase errors. */
function resultOrThrow({ data, error }) {
  if (error) throw error
  return data ?? []
}

/** Basic cursor helper using published_at then id (stable ordering). */
function applyCursor(q, { after, before } = {}) {
  if (after?.published_at && after?.id) {
    // fetch items strictly older than the cursor (for infinite scroll down)
    q = q.lt('published_at', after.published_at).order('published_at', { ascending: false }).order('id', { ascending: false })
  } else if (before?.published_at && before?.id) {
    // fetch items newer than the cursor (rarely used in UI, but available)
    q = q.gt('published_at', before.published_at).order('published_at', { ascending: true }).order('id', { ascending: true })
  } else {
    // default order
    q = q.order('published_at', { ascending: false }).order('id', { ascending: false })
  }
  return q
}

/* ------------------------------------------------------------------ */
/* Single story                                                        */
/* ------------------------------------------------------------------ */

/**
 * Fetch a single story by ID (uuid) or slug (string).
 * @param {string} idOrSlug
 * @returns {Promise<object>}
 */
export async function fetchStoryById(idOrSlug) {
  if (!idOrSlug) throw new Error('Missing story id/slug')

  // crude uuid check; adjust if you use different id format
  const looksLikeUuid = /^[0-9a-f-]{10,}$/i.test(idOrSlug)

  let query = supabase.from(TABLE_STORIES).select(COLS).limit(1)
  query = looksLikeUuid ? query.eq('id', idOrSlug) : query.eq('slug', idOrSlug)

  const { data, error } = await query
  if (error) throw error
  if (!data || !data.length) throw new Error('Story not found')

  return normalizeStory(data[0])
}

/* ------------------------------------------------------------------ */
/* Related stories                                                     */
/* ------------------------------------------------------------------ */

/**
 * Fetch related stories by category/category_slug, excluding the current story.
 * @param {string} categorySlugOrName
 * @param {string} currentIdOrSlug
 * @param {{limit?:number}} options
 * @returns {Promise<object[]>}
 */
export async function fetchRelatedStories(categorySlugOrName, currentIdOrSlug, { limit = 8 } = {}) {
  if (!categorySlugOrName) return []

  // We filter on either category_slug or category to be flexible with data.
  let q = supabase
    .from(TABLE_STORIES)
    .select(COLS)
    .or(`category_slug.eq.${categorySlugOrName},category.eq.${categorySlugOrName}`)
    .limit(limit + 1) // +1 so we can safely exclude current after normalize
  q = q.order('published_at', { ascending: false }).order('id', { ascending: false })

  const { data, error } = await q
  if (error) {
    console.warn('[news-api] related error:', error)
    return []
  }

  const list = (data || []).map(normalizeStory)
  // exclude current by id or slug
  const filtered = list.filter(
    s => s.id !== currentIdOrSlug && s.slug !== currentIdOrSlug
  )
  return filtered.slice(0, limit)
}

/* ------------------------------------------------------------------ */
/* Lists: trending, latest, by category, search                        */
/* ------------------------------------------------------------------ */

/**
 * Trending – here we just use most recent. If you track score/views,
 * replace the ordering below with your own (e.g., .order('score',{...}))
 */
export async function fetchTrending({ limit = DEFAULT_LIMIT, cursor } = {}) {
  let q = supabase.from(TABLE_STORIES).select(COLS).limit(limit)
  q = applyCursor(q, cursor)
  const res = await q
  return resultOrThrow(res).map(normalizeStory)
}

/** Latest – same as trending by time unless you differentiate */
export async function fetchLatest({ limit = DEFAULT_LIMIT, cursor } = {}) {
  return fetchTrending({ limit, cursor })
}

/**
 * By category
 * @param {string} categorySlugOrName
 * @param {{limit?:number,cursor?:object}} options
 */
export async function fetchByCategory(categorySlugOrName, { limit = DEFAULT_LIMIT, cursor } = {}) {
  if (!categorySlugOrName) return []
  let q = supabase.from(TABLE_STORIES).select(COLS).limit(limit)
  q = q.or(`category_slug.eq.${categorySlugOrName},category.eq.${categorySlugOrName}`)
  q = applyCursor(q, cursor)
  const res = await q
  return resultOrThrow(res).map(normalizeStory)
}

/**
 * Search by title/excerpt/content (simple ilike OR).
 * Consider adding a server-side function or pg_trgm index for scale.
 */
export async function searchStories(queryText, { limit = DEFAULT_LIMIT } = {}) {
  if (!queryText) return []
  const like = `%${queryText}%`
  const { data, error } = await supabase
    .from(TABLE_STORIES)
    .select(COLS)
    .or(
      [
        `title.ilike.${like}`,
        `excerpt.ilike.${like}`,
        `content.ilike.${like}`
      ].join(',')
    )
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data || []).map(normalizeStory)
}

/* ------------------------------------------------------------------ */
/* Home sections convenience                                           */
/* ------------------------------------------------------------------ */

/**
 * Fetch blocks needed by the homepage (optional convenience).
 */
export async function fetchHomeSections({
  trendingLimit = 10,
  latestLimit = 10,
  categoryLimits = {} // e.g., { world:6, science:6 }
} = {}) {
  const [trending, latest, categories] = await Promise.all([
    fetchTrending({ limit: trendingLimit }),
    fetchLatest({ limit: latestLimit }),
    Promise.all(
      Object.entries(categoryLimits).map(async ([slug, lim]) => {
        const items = await fetchByCategory(slug, { limit: lim ?? 6 })
        return [slug, items]
      })
    )
  ])

  const byCategory = Object.fromEntries(categories)
  return { trending, latest, byCategory }
}

/* ------------------------------------------------------------------ */
/* MAIN fetchNews function for App.jsx compatibility                   */
/* ------------------------------------------------------------------ */

/**
 * Primary fetchNews function that App.jsx expects
 * Maps your Atlantic Anvil categories to database queries
 * @param {string} category - Category name (TRUMP, REPUBLICAN PARTY, etc.)
 * @param {object} options - Additional options like limit, cursor
 * @returns {Promise<object[]>}
 */
export async function fetchNews(category = 'TRUMP', options = {}) {
  const { limit = DEFAULT_LIMIT, cursor } = options;
  
  try {
    console.log(`[fetchNews] Loading news for category: ${category}`);
    
    // Handle your specific Atlantic Anvil categories
    let queryCategory = category;
    
    // Map your frontend categories to database categories if needed
    const categoryMapping = {
      'TRUMP': 'TRUMP',
      'REPUBLICAN PARTY': 'REPUBLICAN PARTY', 
      'EUROPE': 'EUROPE',
      'ELON MUSK': 'ELON MUSK',
      'STEVE BANNON': 'STEVE BANNON'
    };
    
    // Use mapped category or fallback to original
    const dbCategory = categoryMapping[category] || category;
    
    // If it's a specific category, fetch by category
    if (dbCategory && dbCategory !== 'ALL') {
      const stories = await fetchByCategory(dbCategory, { limit, cursor });
      console.log(`[fetchNews] Found ${stories.length} stories for ${dbCategory}`);
      return stories;
    }
    
    // If category is 'ALL' or undefined, fetch latest
    const stories = await fetchLatest({ limit, cursor });
    console.log(`[fetchNews] Found ${stories.length} latest stories`);
    return stories;
    
  } catch (error) {
    console.error(`[fetchNews] Error fetching news for category ${category}:`, error);
    
    // Return empty array instead of throwing to prevent UI crashes
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Enhanced category search (for better matching)                     */
/* ------------------------------------------------------------------ */

/**
 * Enhanced category search that handles partial matches and variations
 * @param {string} categoryTerm - Category to search for
 * @param {object} options - Search options
 * @returns {Promise<object[]>}
 */
export async function fetchNewsByTerm(categoryTerm, options = {}) {
  const { limit = DEFAULT_LIMIT } = options;
  
  if (!categoryTerm) {
    return await fetchLatest({ limit });
  }
  
  try {
    // First try exact category match
    const exactMatch = await fetchByCategory(categoryTerm, { limit });
    if (exactMatch.length > 0) {
      return exactMatch;
    }
    
    // If no exact match, try search in title/content
    const searchResults = await searchStories(categoryTerm, { limit });
    return searchResults;
    
  } catch (error) {
    console.error(`[fetchNewsByTerm] Error:`, error);
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Performance optimization hooks (for React integration)             */
/* ------------------------------------------------------------------ */

/**
 * Cache for frequently accessed data
 */
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Cached version of fetchNews for better performance
 * @param {string} category 
 * @param {object} options 
 * @returns {Promise<object[]>}
 */
export async function fetchNewsCached(category, options = {}) {
  const cacheKey = `${category}-${JSON.stringify(options)}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`[fetchNewsCached] Using cached data for ${category}`);
    return cached.data;
  }
  
  const data = await fetchNews(category, options);
  cache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
  
  return data;
}

/**
 * Clear the cache (useful for force refresh)
 */
export function clearNewsCache() {
  cache.clear();
  console.log('[clearNewsCache] Cache cleared');
}

/* ------------------------------------------------------------------ */
/* Back-compat aliases (if older code imports these)                   */
/* ------------------------------------------------------------------ */
export const fetchArticleById = fetchStoryById
export const fetchRelatedArticles = fetchRelatedStories

/* ------------------------------------------------------------------ */
/* React hooks for easier integration                                  */
/* ------------------------------------------------------------------ */

/**
 * Simple hook factory for React components
 * Usage: const { data, loading, error } = useNews('TRUMP')
 */
export function createUseNews() {
  return function useNews(category, options = {}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      let mounted = true;
      
      async function loadData() {
        try {
          setLoading(true);
          setError(null);
          const result = await fetchNews(category, options);
          if (mounted) {
            setData(result);
          }
        } catch (err) {
          if (mounted) {
            setError(err.message);
            console.error('[useNews] Error:', err);
          }
        } finally {
          if (mounted) {
            setLoading(false);
          }
        }
      }
      
      loadData();
      
      return () => {
        mounted = false;
      };
    }, [category, JSON.stringify(options)]);
    
    return { data, loading, error };
  };
}

/* ------------------------------------------------------------------ */
/* Export configuration for debugging                                  */
/* ------------------------------------------------------------------ */

export const config = {
  TABLE_STORIES,
  COLS,
  DEFAULT_LIMIT,
  supabaseUrl: SUPA_URL,
  hasSupabaseKey: !!SUPA_KEY
};

console.log('[news-api] Loaded with config:', {
  table: TABLE_STORIES,
  hasCredentials: !!(SUPA_URL && SUPA_KEY),
  defaultLimit: DEFAULT_LIMIT
});
