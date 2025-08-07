-- Atlantic Anvil News - Supabase Database Schema
-- Conservative News Aggregator Database Structure

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;
ALTER DEFAULT PRIVILEGES IN SCHEMA PUBLIC REVOKE ALL ON TABLES FROM PUBLIC;

-- Create custom types
CREATE TYPE article_status AS ENUM ('draft', 'published', 'archived', 'deleted');
CREATE TYPE subscription_tier AS ENUM ('patriot', 'defender', 'guardian');
CREATE TYPE user_role AS ENUM ('reader', 'subscriber', 'moderator', 'admin');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    website TEXT,
    twitter_handle TEXT,
    role user_role DEFAULT 'reader',
    subscription_tier subscription_tier,
    subscription_active BOOLEAN DEFAULT FALSE,
    subscription_expires_at TIMESTAMPTZ,
    email_verified BOOLEAN DEFAULT FALSE,
    email_notifications BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News sources table
CREATE TABLE public.news_sources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    display_name TEXT NOT NULL,
    url TEXT NOT NULL,
    rss_url TEXT,
    logo_url TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    country_code TEXT DEFAULT 'US',
    language_code TEXT DEFAULT 'en',
    category TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    color TEXT DEFAULT '#1a365d',
    icon TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles table
CREATE TABLE public.articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    content TEXT,
    excerpt TEXT,
    summary TEXT, -- AI-generated summary
    original_url TEXT NOT NULL,
    image_url TEXT,
    thumbnail_url TEXT,
    
    -- Metadata
    source_id UUID REFERENCES news_sources(id),
    category_id UUID REFERENCES categories(id),
    author TEXT,
    published_at TIMESTAMPTZ,
    fetched_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Content analysis
    word_count INTEGER,
    reading_time INTEGER, -- in minutes
    language_code TEXT DEFAULT 'en',
    
    -- Conservative news specific fields (no bias/credibility ratings)
    positivity_score INTEGER CHECK (positivity_score >= 0 AND positivity_score <= 10),
    virality_score INTEGER CHECK (virality_score >= 0 AND virality_score <= 10),
    trending_score INTEGER CHECK (trending_score >= 0 AND trending_score <= 10),
    
    -- Engagement metrics
    views_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    
    -- Status and moderation
    status article_status DEFAULT 'published',
    is_featured BOOLEAN DEFAULT FALSE,
    is_breaking BOOLEAN DEFAULT FALSE,
    is_premium BOOLEAN DEFAULT FALSE,
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT[],
    
    -- Reserved space for future paywall features
    premium_content JSONB, -- For future premium features
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Search
    search_vector tsvector GENERATED ALWAYS AS (
        setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
        setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
        setweight(to_tsvector('english', coalesce(content, '')), 'C')
    ) STORED
);

-- Article tags (many-to-many)
CREATE TABLE public.article_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    tag_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(article_id, tag_name)
);

-- User interactions
CREATE TABLE public.user_article_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    interaction_type TEXT NOT NULL, -- 'view', 'like', 'share', 'bookmark', 'comment'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, article_id, interaction_type)
);

-- Comments system
CREATE TABLE public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id), -- for nested comments
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    is_flagged BOOLEAN DEFAULT FALSE,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions and payments
CREATE TABLE public.subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tier subscription_tier NOT NULL,
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'expired', 'past_due'
    
    -- Payment details
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    
    -- Pricing
    amount_cents INTEGER NOT NULL,
    currency TEXT DEFAULT 'USD',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics and metrics
CREATE TABLE public.analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    user_id UUID REFERENCES profiles(id),
    session_id TEXT,
    article_id UUID REFERENCES articles(id),
    
    -- Event data
    properties JSONB,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    country_code TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Summarization queue (for AI processing)
CREATE TABLE public.summarization_queue (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    model_name TEXT DEFAULT 'sshleifer/distilbart-cnn-12-6',
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    error_message TEXT,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(article_id)
);

-- RSS feed cache
CREATE TABLE public.rss_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source_id UUID REFERENCES news_sources(id) ON DELETE CASCADE,
    feed_url TEXT NOT NULL,
    content TEXT,
    etag TEXT,
    last_modified TEXT,
    cached_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    UNIQUE(source_id, feed_url)
);

-- Create indexes for performance
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_source_id ON articles(source_id);
CREATE INDEX idx_articles_category_id ON articles(category_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_is_featured ON articles(is_featured);
CREATE INDEX idx_articles_is_breaking ON articles(is_breaking);
CREATE INDEX idx_articles_trending_score ON articles(trending_score DESC);
CREATE INDEX idx_articles_virality_score ON articles(virality_score DESC);
CREATE INDEX idx_articles_search_vector ON articles USING GIN(search_vector);

CREATE INDEX idx_user_interactions_user_id ON user_article_interactions(user_id);
CREATE INDEX idx_user_interactions_article_id ON user_article_interactions(article_id);
CREATE INDEX idx_user_interactions_type ON user_article_interactions(interaction_type);

CREATE INDEX idx_comments_article_id ON comments(article_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);

CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX idx_analytics_events_article_id ON analytics_events(article_id);

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_article_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Articles policies
CREATE POLICY "Published articles are viewable by everyone" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Premium articles require subscription" ON articles FOR SELECT USING (
    NOT is_premium OR 
    auth.uid() IN (
        SELECT user_id FROM subscriptions 
        WHERE status = 'active' AND current_period_end > NOW()
    )
);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);

-- User interactions policies
CREATE POLICY "Users can manage own interactions" ON user_article_interactions 
    FOR ALL USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON subscriptions 
    FOR SELECT USING (auth.uid() = user_id);

-- Insert default data
INSERT INTO categories (name, slug, description, color, sort_order) VALUES
    ('Trump', 'trump', 'News and analysis about Donald Trump', '#c53030', 1),
    ('Republican Party', 'republican-party', 'GOP news and politics', '#1a365d', 2),
    ('Europe', 'europe', 'European conservative politics', '#2b6cb0', 3),
    ('Elon Musk', 'elon-musk', 'News about Elon Musk and his companies', '#d69e2e', 4),
    ('Steve Bannon', 'steve-bannon', 'Steve Bannon and populist movements', '#c53030', 5),
    ('Breaking News', 'breaking', 'Latest breaking conservative news', '#dc2626', 0);

INSERT INTO news_sources (name, display_name, url, rss_url) VALUES
    ('fox-news', 'Fox News', 'https://foxnews.com', 'https://feeds.foxnews.com/foxnews/politics'),
    ('daily-wire', 'The Daily Wire', 'https://dailywire.com', 'https://www.dailywire.com/feeds/rss.xml'),
    ('breitbart', 'Breitbart News', 'https://breitbart.com', 'https://feeds.feedburner.com/breitbart'),
    ('national-review', 'National Review', 'https://nationalreview.com', 'https://www.nationalreview.com/feed/'),
    ('new-york-post', 'New York Post', 'https://nypost.com', 'https://nypost.com/politics/feed/'),
    ('federalist', 'The Federalist', 'https://thefederalist.com', 'https://thefederalist.com/feed/'),
    ('epoch-times', 'The Epoch Times', 'https://theepochtimes.com', 'https://www.theepochtimes.com/c-us-politics/feed');

-- Create functions for common operations
CREATE OR REPLACE FUNCTION update_article_engagement()
RETURNS TRIGGER AS $
BEGIN
    IF TG_OP = 'INSERT' THEN
        CASE NEW.interaction_type
            WHEN 'view' THEN
                UPDATE articles SET views_count = views_count + 1 WHERE id = NEW.article_id;
            WHEN 'like' THEN
                UPDATE articles SET likes_count = likes_count + 1 WHERE id = NEW.article_id;
            WHEN 'share' THEN
                UPDATE articles SET shares_count = shares_count + 1 WHERE id = NEW.article_id;
        END CASE;
    END IF;
    RETURN NEW;
END;
$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_article_engagement
    AFTER INSERT ON user_article_interactions
    FOR EACH ROW EXECUTE FUNCTION update_article_engagement();

-- Function to generate article slug
CREATE OR REPLACE FUNCTION generate_article_slug(title TEXT)
RETURNS TEXT AS $
BEGIN
    RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'));
END;
$ LANGUAGE plpgsql;

-- Article tags (many-to-many)
CREATE TABLE public.article_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    tag_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(article_id, tag_name)
);

-- User interactions
CREATE TABLE public.user_article_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    interaction_type TEXT NOT NULL, -- 'view', 'like', 'share', 'bookmark', 'comment'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, article_id, interaction_type)
);

-- Comments system
CREATE TABLE public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES comments(id), -- for nested comments
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    is_flagged BOOLEAN DEFAULT FALSE,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions and payments
CREATE TABLE public.subscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tier subscription_tier NOT NULL,
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'cancelled', 'expired', 'past_due'
    
    -- Payment details
    stripe_subscription_id TEXT UNIQUE,
    stripe_customer_id TEXT,
    current_period_start TIMESTAMPTZ,
    current_period_end TIMESTAMPTZ,
    
    -- Pricing
    amount_cents INTEGER NOT NULL,
    currency TEXT DEFAULT 'USD',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics and metrics
CREATE TABLE public.analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    user_id UUID REFERENCES profiles(id),
    session_id TEXT,
    article_id UUID REFERENCES articles(id),
    
    -- Event data
    properties JSONB,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    country_code TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Summarization queue (for AI processing)
CREATE TABLE public.summarization_queue (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    model_name TEXT DEFAULT 'sshleifer/distilbart-cnn-12-6',
    attempts INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 3,
    error_message TEXT,
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(article_id)
);

-- RSS feed cache
CREATE TABLE public.rss_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    source_id UUID REFERENCES news_sources(id) ON DELETE CASCADE,
    feed_url TEXT NOT NULL,
    content TEXT,
    etag TEXT,
    last_modified TEXT,
    cached_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    UNIQUE(source_id, feed_url)
);

-- Create indexes for performance
CREATE INDEX idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX idx_articles_source_id ON articles(source_id);
CREATE INDEX idx_articles_category_id ON articles(category_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_is_featured ON articles(is_featured);
CREATE INDEX idx_articles_is_breaking ON articles(is_breaking);
CREATE INDEX idx_articles_bias ON articles(bias);
CREATE INDEX idx_articles_trending_score ON articles(trending_score DESC);
CREATE INDEX idx_articles_virality_score ON articles(virality_score DESC);
CREATE INDEX idx_articles_search_vector ON articles USING GIN(search_vector);

CREATE INDEX idx_user_interactions_user_id ON user_article_interactions(user_id);
CREATE INDEX idx_user_interactions_article_id ON user_article_interactions(article_id);
CREATE INDEX idx_user_interactions_type ON user_article_interactions(interaction_type);

CREATE INDEX idx_comments_article_id ON comments(article_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);

CREATE INDEX idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at);
CREATE INDEX idx_analytics_events_article_id ON analytics_events(article_id);

-- Row Level Security Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_article_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Articles policies
CREATE POLICY "Published articles are viewable by everyone" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Premium articles require subscription" ON articles FOR SELECT USING (
    NOT is_premium OR 
    auth.uid() IN (
        SELECT user_id FROM subscriptions 
        WHERE status = 'active' AND current_period_end > NOW()
    )
);

-- Comments policies
CREATE POLICY "Comments are viewable by everyone" ON comments FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can create comments" ON comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (auth.uid() = user_id);

-- User interactions policies
CREATE POLICY "Users can manage own interactions" ON user_article_interactions 
    FOR ALL USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON subscriptions 
    FOR SELECT USING (auth.uid() = user_id);

-- Insert default data
INSERT INTO categories (name, slug, description, color, sort_order) VALUES
    ('Trump', 'trump', 'News and analysis about Donald Trump', '#c53030', 1),
    ('Republican Party', 'republican-party', 'GOP news and politics', '#1a365d', 2),
    ('Europe', 'europe', 'European conservative politics', '#2b6cb0', 3),
    ('Elon Musk', 'elon-musk', 'News about Elon Musk and his companies', '#d69e2e', 4),
    ('Steve Bannon', 'steve-bannon', 'Steve Bannon and populist movements', '#c53030', 5),
    ('Breaking News', 'breaking', 'Latest breaking conservative news', '#dc2626', 0);

INSERT INTO news_sources (name, display_name, url, rss_url, bias, credibility_score, is_conservative) VALUES
    ('fox-news', 'Fox News', 'https://foxnews.com', 'https://feeds.foxnews.com/foxnews/politics', 'right', 4, true),
    ('daily-wire', 'The Daily Wire', 'https://dailywire.com', 'https://www.dailywire.com/feeds/rss.xml', 'right', 4, true),
    ('breitbart', 'Breitbart News', 'https://breitbart.com', 'https://feeds.feedburner.com/breitbart', 'right', 3, true),
    ('national-review', 'National Review', 'https://nationalreview.com', 'https://www.nationalreview.com/feed/', 'right', 5, true),
    ('new-york-post', 'New York Post', 'https://nypost.com', 'https://nypost.com/politics/feed/', 'center-right', 4, true);

-- Create functions for common operations
CREATE OR REPLACE FUNCTION update_article_engagement()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        CASE NEW.interaction_type
            WHEN 'view' THEN
                UPDATE articles SET views_count = views_count + 1 WHERE id = NEW.article_id;
            WHEN 'like' THEN
                UPDATE articles SET likes_count = likes_count + 1 WHERE id = NEW.article_id;
            WHEN 'share' THEN
                UPDATE articles SET shares_count = shares_count + 1 WHERE id = NEW.article_id;
        END CASE;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_article_engagement
    AFTER INSERT ON user_article_interactions
    FOR EACH ROW EXECUTE FUNCTION update_article_engagement();

-- Function to generate article slug
CREATE OR REPLACE FUNCTION generate_article_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;
