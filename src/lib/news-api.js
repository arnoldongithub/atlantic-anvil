// src/lib/news-api.js
// Supabase-backed news API. Reads from article_with_blindspot view.
// Exposes blindspot flags and coverage counts. Persists category slugs.

import { supabase } from './supabase';

export const CATEGORY_SLUGS = {
  'Trump': 'trump',
  'Republican Party': 'republican-party',
  'Culture': 'culture',
  'Europe': 'europe',
  'Elon Musk': 'elon-musk',
  'Steve Bannon': 'steve-bannon',
};

async function getCategoryIdBySlug(slug) {
  const { data, error } = await supabase
    .from('categories')
    .select('id, slug')
    .eq('slug', slug)
    .maybeSingle();
  if (error) {
    console.warn('getCategoryIdBySlug error:', error);
    return null;
  }
  return data?.id ?? null;
}

/**
 * Fetch latest published articles by category slug.
 * Falls back to a keyword text search if the category doesn't exist (e.g., Culture before seeded).
 */
export async function fetchNewsByCategorySlug(slug, { limit = 30 } = {}) {
  const categoryId = await getCategoryIdBySlug(slug);

  const base = supabase
    .from('article_with_blindspot')
    .select(`
      id,
      title,
      excerpt,
      summary,
      original_url,
      image_url,
      thumbnail_url,
      published_at,
      reading_time,
      is_breaking,
      is_featured,
      trending_score,
      category_id,
      source_display,
      left_hits,
      center_hits,
      right_hits,
      blindspot_left,
      cluster_key
    `)
    .order('published_at', { ascending: false })
    .limit(limit);

  let res;
  if (categoryId) {
    res = await base.eq('category_id', categoryId);
  } else {
    // fallback: keyword search against tsvector (your table defines search_vector on articles)
    res = await base.textSearch('search_vector', slugToKeyword(slug), { type: 'plain' });
  }

  const { data, error } = res;
  if (error) {
    console.error('fetchNewsByCategorySlug error:', error);
    return [];
  }
  return normalizeArticles(data);
}

export async function fetchArticleById(id) {
  const { data, error } = await supabase
    .from('article_with_blindspot')
    .select(`
      id,
      title,
      excerpt,
      summary,
      original_url,
      image_url,
      thumbnail_url,
      published_at,
      reading_time,
      is_breaking,
      is_featured,
      trending_score,
      category_id,
      source_display,
      left_hits,
      center_hits,
      right_hits,
      blindspot_left,
      cluster_key
    `)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('fetchArticleById error:', error);
    return null;
  }
  if (!data) return null;
  return normalizeArticle(data);
}

export async function fetchRelatedArticles(categorySlug, excludeId, { limit = 6 } = {}) {
  const categoryId = await getCategoryIdBySlug(categorySlug);
  if (!categoryId) return [];

  const { data, error } = await supabase
    .from('article_with_blindspot')
    .select(`
      id,
      title,
      excerpt,
      summary,
      original_url,
      image_url,
      thumbnail_url,
      published_at,
      reading_time,
      is_breaking,
      is_featured,
      trending_score,
      category_id,
      source_display,
      left_hits,
      center_hits,
      right_hits,
      blindspot_left,
      cluster_key
    `)
    .eq('category_id', categoryId)
    .neq('id', excludeId)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('fetchRelatedArticles error:', error);
    return [];
  }
  return normalizeArticles(data);
}

/** Backwards-compatible helper. Accepts pretty labels or slugs. */
export async function fetchNews(categoryOrSlug = 'Trump', opts) {
  const slug = CATEGORY_SLUGS[categoryOrSlug] ?? categoryOrSlug;
  return fetchNewsByCategorySlug(slug, opts);
}

/* ---------------- helpers ---------------- */

function slugToKeyword(slug) {
  switch (slug) {
    case 'culture': return 'culture';
    case 'trump': return 'trump';
    case 'republican-party': return 'republican | gop';
    case 'europe': return 'europe | eu | uk | britain | italy | germany | france';
    case 'elon-musk': return 'elon | musk | tesla | spacex | x.com';
    case 'steve-bannon': return 'bannon | war room';
    default: return slug;
  }
}

function normalizeArticles(rows) {
  return (rows || []).map(normalizeArticle);
}

function normalizeArticle(row) {
  const timeAgo = row?.published_at ? smartTimeAgo(new Date(row.published_at)) : null;
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    summary: row.summary,
    url: row.original_url,
    image_url: row.image_url || row.thumbnail_url || null,
    timeAgo,
    readTime: row.reading_time ? `${row.reading_time} min` : null,
    source: row.source_display || 'Source',
    blindspot_left: !!row.blindspot_left,
    left_hits: row.left_hits ?? 0,
    center_hits: row.center_hits ?? 0,
    right_hits: row.right_hits ?? 0,
    cluster_key: row.cluster_key,
    category_id: row.category_id,
  };
}

function smartTimeAgo(date) {
  const now = new Date();
  const mins = Math.floor((now - date) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

