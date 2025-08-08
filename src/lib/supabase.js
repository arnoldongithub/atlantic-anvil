// src/lib/supabase.js
// Supabase client configuration for Atlantic Anvil News

import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'Atlantic Anvil News'
    }
  }
});

// Database table names
export const TABLES = {
  PROFILES: 'profiles',
  NEWS_SOURCES: 'news_sources',
  CATEGORIES: 'categories',
  ARTICLES: 'articles',
  ARTICLE_TAGS: 'article_tags',
  USER_INTERACTIONS: 'user_article_interactions',
  COMMENTS: 'comments',
  SUBSCRIPTIONS: 'subscriptions',
  ANALYTICS: 'analytics_events',
  SUMMARIZATION_QUEUE: 'summarization_queue',
  RSS_CACHE: 'rss_cache'
};

// Article status enum
export const ARTICLE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  DELETED: 'deleted'
};

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  PATRIOT: 'patriot',
  DEFENDER: 'defender',
  GUARDIAN: 'guardian'
};

// User roles
export const USER_ROLES = {
  READER: 'reader',
  SUBSCRIBER: 'subscriber',
  MODERATOR: 'moderator',
  ADMIN: 'admin'
};

// Database helper functions
export const db = {
  // Articles
  async getArticles(limit = 20, offset = 0, filters = {}) {
    try {
      let query = supabase
        .from(TABLES.ARTICLES)
        .select(`
          *,
          source:news_sources(name, display_name, logo_url),
          category:categories(name, slug, color)
        `)
        .eq('status', ARTICLE_STATUS.PUBLISHED)
        .order('published_at', { ascending: false })
        .range(offset, offset + limit - 1);

      // Apply filters
      if (filters.categoryId) {
        query = query.eq('category_id', filters.categoryId);
      }
      if (filters.sourceId) {
        query = query.eq('source_id', filters.sourceId);
      }
      if (filters.isFeatured) {
        query = query.eq('is_featured', true);
      }
      if (filters.isBreaking) {
        query = query.eq('is_breaking', true);
      }
      if (filters.search) {
        query = query.textSearch('search_vector', filters.search);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  },

  async getArticleBySlug(slug) {
    try {
      const { data, error } = await supabase
        .from(TABLES.ARTICLES)
        .select(`
          *,
          source:news_sources(name, display_name, logo_url),
          category:categories(name, slug, color),
          tags:article_tags(tag_name)
        `)
        .eq('slug', slug)
        .eq('status', ARTICLE_STATUS.PUBLISHED)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching article:', error);
      return null;
    }
  },

  async getTrendingArticles(limit = 10) {
    try {
      const { data, error } = await supabase
        .from(TABLES.ARTICLES)
        .select(`
          *,
          source:news_sources(name, display_name, logo_url),
          category:categories(name, slug, color)
        `)
        .eq('status', ARTICLE_STATUS.PUBLISHED)
        .order('trending_score', { ascending: false })
        .order('virality_score', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching trending articles:', error);
      return [];
    }
  },

  async getFeaturedArticles(limit = 5) {
    try {
      const { data, error } = await supabase
        .from(TABLES.ARTICLES)
        .select(`
          *,
          source:news_sources(name, display_name, logo_url),
          category:categories(name, slug, color)
        `)
        .eq('status', ARTICLE_STATUS.PUBLISHED)
        .eq('is_featured', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      return [];
    }
  },

  async insertArticle(article) {
    try {
      const { data, error } = await supabase
        .from(TABLES.ARTICLES)
        .insert(article)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error inserting article:', error);
      return null;
    }
  },

  async updateArticle(id, updates) {
    try {
      const { data, error } = await supabase
        .from(TABLES.ARTICLES)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating article:', error);
      return null;
    }
  },

  // Categories
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from(TABLES.CATEGORIES)
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // News Sources
  async getNewsSources() {
    try {
      const { data, error } = await supabase
        .from(TABLES.NEWS_SOURCES)
        .select('*')
        .eq('is_active', true)
        .order('display_name');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching news sources:', error);
      return [];
    }
  },

  // User Interactions
  async recordInteraction(userId, articleId, interactionType) {
    try {
      const { error } = await supabase
        .from(TABLES.USER_INTERACTIONS)
        .insert({
          user_id: userId,
          article_id: articleId,
          interaction_type: interactionType
        });

      if (error && error.code !== '23505') { // Ignore unique constraint violations
        throw error;
      }
      return true;
    } catch (error) {
      console.error('Error recording interaction:', error);
      return false;
    }
  },

  // Analytics
  async trackEvent(eventType, properties = {}) {
    try {
      const { error } = await supabase
        .from(TABLES.ANALYTICS)
        .insert({
          event_type: eventType,
          properties,
          page_url: window.location.href,
          referrer: document.referrer,
          user_agent: navigator.userAgent
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error tracking event:', error);
      return false;
    }
  },

  // RSS Cache
  async getCachedFeed(sourceId) {
    try {
      const { data, error } = await supabase
        .from(TABLES.RSS_CACHE)
        .select('*')
        .eq('source_id', sourceId)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching cached feed:', error);
      return null;
    }
  },

  async cacheFeed(sourceId, feedUrl, content, expiresIn = 3600000) {
    try {
      const { error } = await supabase
        .from(TABLES.RSS_CACHE)
        .upsert({
          source_id: sourceId,
          feed_url: feedUrl,
          content: JSON.stringify(content),
          cached_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + expiresIn).toISOString()
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error caching feed:', error);
      return false;
    }
  },

  // Summarization Queue
  async addToSummarizationQueue(articleId) {
    try {
      const { error } = await supabase
        .from(TABLES.SUMMARIZATION_QUEUE)
        .insert({
          article_id: articleId,
          status: 'pending'
        });

      if (error && error.code !== '23505') { // Ignore if already in queue
        throw error;
      }
      return true;
    } catch (error) {
      console.error('Error adding to summarization queue:', error);
      return false;
    }
  },

  async getNextSummarizationJob() {
    try {
      const { data, error } = await supabase
        .from(TABLES.SUMMARIZATION_QUEUE)
        .select('*, article:articles(*)')
        .eq('status', 'pending')
        .lt('attempts', 3)
        .order('created_at')
        .limit(1)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching summarization job:', error);
      return null;
    }
  }
};

// Auth helper functions
export const auth = {
  async signUp(email, password, metadata = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (error) throw error;
      return { user: data.user, session: data.session };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error: error.message };
    }
  },

  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return { user: data.user, session: data.session };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error: error.message };
    }
  },

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error signing out:', error);
      return false;
    }
  },

  async getUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Error getting user:', error);
      return null;
    }
  },

  async getSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (error) {
      console.error('Error getting session:', error);
      return null;
    }
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

// Real-time subscriptions
export const realtime = {
  subscribeToArticles(callback) {
    return supabase
      .channel('articles')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: TABLES.ARTICLES },
        callback
      )
      .subscribe();
  },

  subscribeToComments(articleId, callback) {
    return supabase
      .channel(`comments:${articleId}`)
      .on('postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: TABLES.COMMENTS,
          filter: `article_id=eq.${articleId}`
        },
        callback
      )
      .subscribe();
  },

  unsubscribe(channel) {
    return supabase.removeChannel(channel);
  }
};

export default supabase;
