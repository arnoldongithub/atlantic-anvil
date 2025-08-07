// news-rss-importer/index.js
// Backend RSS Importer for Atlantic Anvil News
// This runs server-side to import conservative news feeds into Supabase

import { createClient } from '@supabase/supabase-js';
import Parser from 'rss-parser';
import dotenv from 'dotenv';
import cron from 'node-cron';
import pLimit from 'p-limit';

// Load environment variables
dotenv.config();

// Initialize Supabase client with service key (for backend operations)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY, // Service key for admin operations
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

// RSS Parser configuration
const parser = new Parser({
  timeout: 10000,
  maxRedirects: 5,
  headers: {
    'User-Agent': 'Atlantic Anvil News Aggregator/1.0'
  },
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
      ['content:encoded', 'contentEncoded'],
      ['dc:creator', 'creator']
    ]
  }
});

// Conservative News RSS Feeds
const RSS_FEEDS = {
  // Major Conservative Networks
  'fox-news': {
    name: 'Fox News',
    display_name: 'Fox News',
    feeds: [
      { url: 'https://moxie.foxnews.com/google-publisher/politics.xml', category: 'politics' },
      { url: 'https://moxie.foxnews.com/google-publisher/latest.xml', category: 'latest' },
      { url: 'https://feeds.foxnews.com/foxnews/opinion', category: 'opinion' },
      { url: 'https://feeds.foxnews.com/foxnews/national', category: 'national' }
    ]
  },
  'fox-business': {
    name: 'Fox Business',
    display_name: 'Fox Business',
    feeds: [
      { url: 'https://feeds.foxbusiness.com/foxbusiness/latest', category: 'business' },
      { url: 'https://feeds.foxbusiness.com/foxbusiness/politics', category: 'politics' },
      { url: 'https://feeds.foxbusiness.com/foxbusiness/markets', category: 'markets' }
    ]
  },
  'oan': {
    name: 'One America News',
    display_name: 'OAN',
    feeds: [
      { url: 'https://www.oann.com/feed/', category: 'general' }
    ]
  },
  'newsmax': {
    name: 'Newsmax',
    display_name: 'Newsmax',
    feeds: [
      { url: 'https://www.newsmax.com/rss/Newsfront/1/', category: 'newsfront' },
      { url: 'https://www.newsmax.com/rss/Politics/1/', category: 'politics' },
      { url: 'https://www.newsmax.com/rss/Finance/1/', category: 'finance' }
    ]
  },
  
  // Conservative Digital Media
  'daily-wire': {
    name: 'The Daily Wire',
    display_name: 'Daily Wire',
    feeds: [
      { url: 'https://www.dailywire.com/feeds/rss.xml', category: 'general' }
    ]
  },
  'breitbart': {
    name: 'Breitbart',
    display_name: 'Breitbart News',
    feeds: [
      { url: 'https://feeds.feedburner.com/breitbart', category: 'general' }
    ]
  },
  'daily-caller': {
    name: 'The Daily Caller',
    display_name: 'Daily Caller',
    feeds: [
      { url: 'https://dailycaller.com/feed/', category: 'general' },
      { url: 'https://dailycaller.com/section/politics/feed/', category: 'politics' }
    ]
  },
  'the-blaze': {
    name: 'The Blaze',
    display_name: 'The Blaze',
    feeds: [
      { url: 'https://www.theblaze.com/feeds/feed.rss', category: 'general' }
    ]
  },
  
  // Traditional Conservative Publications
  'national-review': {
    name: 'National Review',
    display_name: 'National Review',
    feeds: [
      { url: 'https://www.nationalreview.com/feed/', category: 'general' },
      { url: 'https://www.nationalreview.com/corner/feed/', category: 'corner' }
    ]
  },
  'american-conservative': {
    name: 'The American Conservative',
    display_name: 'The American Conservative',
    feeds: [
      { url: 'https://www.theamericanconservative.com/feed/', category: 'general' }
    ]
  },
  'wall-street-journal': {
    name: 'Wall Street Journal',
    display_name: 'WSJ Opinion',
    feeds: [
      { url: 'https://feeds.a.dj.com/rss/RSSOpinion.xml', category: 'opinion' }
    ]
  },
  'ny-post': {
    name: 'New York Post',
    display_name: 'NY Post',
    feeds: [
      { url: 'https://nypost.com/feed/', category: 'general' },
      { url: 'https://nypost.com/politics/feed/', category: 'politics' }
    ]
  },
  
  // Commentary & Opinion
  'townhall': {
    name: 'Townhall',
    display_name: 'Townhall',
    feeds: [
      { url: 'https://townhall.com/feed/', category: 'general' },
      { url: 'https://townhall.com/columnists/feed/', category: 'columnists' }
    ]
  },
  'redstate': {
    name: 'RedState',
    display_name: 'RedState',
    feeds: [
      { url: 'https://redstate.com/feed/', category: 'general' }
    ]
  },
  'federalist': {
    name: 'The Federalist',
    display_name: 'The Federalist',
    feeds: [
      { url: 'https://thefederalist.com/feed/', category: 'general' }
    ]
  },
  'american-thinker': {
    name: 'American Thinker',
    display_name: 'American Thinker',
    feeds: [
      { url: 'https://www.americanthinker.com/rss.xml', category: 'general' }
    ]
  },
  'pj-media': {
    name: 'PJ Media',
    display_name: 'PJ Media',
    feeds: [
      { url: 'https://pjmedia.com/feed/', category: 'general' }
    ]
  },
  
  // Regional Conservative
  'washington-examiner': {
    name: 'Washington Examiner',
    display_name: 'Washington Examiner',
    feeds: [
      { url: 'https://www.washingtonexaminer.com/feed', category: 'general' }
    ]
  },
  'washington-times': {
    name: 'Washington Times',
    display_name: 'Washington Times',
    feeds: [
      { url: 'https://www.washingtontimes.com/rss/headlines/', category: 'headlines' }
    ]
  },
  'washington-free-beacon': {
    name: 'Washington Free Beacon',
    display_name: 'Free Beacon',
    feeds: [
      { url: 'https://freebeacon.com/feed/', category: 'general' }
    ]
  },
  
  // International Conservative
  'epoch-times': {
    name: 'The Epoch Times',
    display_name: 'Epoch Times',
    feeds: [
      { url: 'https://www.theepochtimes.com/c-us-politics/feed', category: 'politics' }
    ]
  },
  
  // Think Tanks
  'daily-signal': {
    name: 'The Daily Signal',
    display_name: 'Daily Signal',
    feeds: [
      { url: 'https://www.dailysignal.com/feed/', category: 'general' }
    ]
  },
  'heritage': {
    name: 'Heritage Foundation',
    display_name: 'Heritage',
    feeds: [
      { url: 'https://www.heritage.org/rss.xml', category: 'research' }
    ]
  }
};

// Category mapping for articles
const CATEGORY_KEYWORDS = {
  'trump': ['trump', 'donald', 'maga', 'president trump', '45th', '47th'],
  'republican-party': ['gop', 'republican', 'congress', 'senate', 'house', 'mccarthy', 'mcconnell'],
  'europe': ['europe', 'eu', 'brexit', 'france', 'germany', 'uk', 'britain', 'italy'],
  'elon-musk': ['elon', 'musk', 'tesla', 'spacex', 'twitter', 'x.com', 'x platform'],
  'steve-bannon': ['bannon', 'war room', 'populist', 'bannons'],
  'breaking': ['breaking', 'urgent', 'alert', 'just in', 'developing', 'update']
};

class RSSImporter {
  constructor() {
    this.limit = pLimit(5); // Limit concurrent requests
    this.stats = {
      imported: 0,
      duplicates: 0,
      errors: 0,
      sources: {}
    };
  }

  // Main import function
  async importAllFeeds() {
    console.log('🦅 Atlantic Anvil RSS Import Starting...');
    console.log(`📰 Processing ${Object.keys(RSS_FEEDS).length} news sources`);
    
    const startTime = Date.now();
    
    // Ensure sources exist in database
    await this.ensureSourcesInDatabase();
    
    // Process all feeds
    const promises = [];
    
    for (const [sourceKey, source] of Object.entries(RSS_FEEDS)) {
      for (const feed of source.feeds) {
        promises.push(
          this.limit(() => this.processFeed(sourceKey, source, feed))
        );
      }
    }
    
    await Promise.all(promises);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    // Log final stats
    console.log('\n📊 Import Complete!');
    console.log(`⏱️  Duration: ${duration}s`);
    console.log(`✅ Imported: ${this.stats.imported} articles`);
    console.log(`🔄 Duplicates: ${this.stats.duplicates}`);
    console.log(`❌ Errors: ${this.stats.errors}`);
    
    // Log source breakdown
    console.log('\n📈 Articles by Source:');
    Object.entries(this.stats.sources)
      .sort((a, b) => b[1] - a[1])
      .forEach(([source, count]) => {
        if (count > 0) console.log(`   ${source}: ${count}`);
      });
    
    return this.stats;
  }

  // Ensure all sources exist in database
  async ensureSourcesInDatabase() {
    for (const [sourceKey, source] of Object.entries(RSS_FEEDS)) {
      try {
        // Check if source exists
        const { data: existing } = await supabase
          .from('news_sources')
          .select('id')
          .eq('name', sourceKey)
          .single();
        
        if (!existing) {
          // Insert new source
          const { error } = await supabase
            .from('news_sources')
            .insert({
              name: sourceKey,
              display_name: source.display_name,
              url: `https://${sourceKey.replace('-', '')}.com`,
              rss_url: source.feeds[0]?.url,
              description: `${source.display_name} - Conservative News Source`,
              is_active: true,
              country_code: 'US',
              language_code: 'en',
              category: 'conservative'
            });
          
          if (error) {
            console.error(`Error inserting source ${sourceKey}:`, error);
          } else {
            console.log(`✅ Added new source: ${source.display_name}`);
          }
        }
      } catch (error) {
        console.error(`Error checking source ${sourceKey}:`, error);
      }
    }
  }

  // Process individual feed
  async processFeed(sourceKey, source, feedInfo) {
    try {
      console.log(`📡 Fetching: ${source.display_name} (${feedInfo.category})`);
      
      const feed = await parser.parseURL(feedInfo.url);
      const articles = feed.items || [];
      
      if (!this.stats.sources[source.display_name]) {
        this.stats.sources[source.display_name] = 0;
      }
      
      // Process articles in batches
      for (const item of articles.slice(0, 15)) { // Limit to 15 articles per feed
        await this.processArticle(item, sourceKey, source, feedInfo.category);
      }
      
    } catch (error) {
      console.error(`❌ Error processing ${source.display_name}:`, error.message);
      this.stats.errors++;
    }
  }

  // Process individual article
  async processArticle(item, sourceKey, source, feedCategory) {
    try {
      // Check if article already exists
      const { data: existing } = await supabase
        .from('articles')
        .select('id')
        .eq('original_url', item.link)
        .single();
      
      if (existing) {
        this.stats.duplicates++;
        return;
      }
      
      // Get source ID
      const { data: sourceData } = await supabase
        .from('news_sources')
        .select('id')
        .eq('name', sourceKey)
        .single();
      
      if (!sourceData) {
        console.error(`Source not found: ${sourceKey}`);
        return;
      }
      
      // Determine category
      const categoryId = await this.determineCategory(item);
      
      // Prepare article data
      const article = {
        title: this.cleanText(item.title),
        slug: this.generateSlug(item.title),
        content: this.extractContent(item),
        excerpt: this.cleanText(item.contentSnippet || item.summary || ''),
        original_url: item.link,
        image_url: this.extractImage(item),
        thumbnail_url: this.extractImage(item),
        source_id: sourceData.id,
        category_id: categoryId,
        author: item.creator || item.author || source.display_name,
        published_at: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
        word_count: this.countWords(item.content || item.summary || ''),
        reading_time: Math.ceil(this.countWords(item.content || item.summary || '') / 200),
        positivity_score: this.calculatePositivityScore(item),
        virality_score: this.calculateViralityScore(item),
        trending_score: this.calculateTrendingScore(item),
        status: 'published',
        meta_keywords: item.categories || []
      };
      
      // Insert article
      const { error } = await supabase
        .from('articles')
        .insert(article);
      
      if (error) {
        if (error.code === '23505') { // Duplicate key
          this.stats.duplicates++;
        } else {
          console.error(`Error inserting article:`, error);
          this.stats.errors++;
        }
      } else {
        this.stats.imported++;
        this.stats.sources[source.display_name]++;
        
        // Add to summarization queue
        if (process.env.ENABLE_SUMMARIZATION === 'true') {
          await this.addToSummarizationQueue(article.slug);
        }
      }
      
    } catch (error) {
      console.error(`Error processing article:`, error);
      this.stats.errors++;
    }
  }

  // Determine article category
  async determineCategory(item) {
    const text = `${item.title} ${item.contentSnippet || ''} ${(item.categories || []).join(' ')}`.toLowerCase();
    
    // Check for category keywords
    for (const [slug, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        const { data } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', slug)
          .single();
        
        if (data) return data.id;
      }
    }
    
    // Default to breaking news
    const { data } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', 'breaking')
      .single();
    
    return data?.id || null;
  }

  // Extract content from item
  extractContent(item) {
    return this.cleanText(
      item.contentEncoded || 
      item['content:encoded'] || 
      item.content || 
      item.summary || 
      item.contentSnippet || 
      ''
    );
  }

  // Extract image URL
  extractImage(item) {
    // Try various image sources
    if (item.enclosure?.url && item.enclosure.type?.startsWith('image/')) {
      return item.enclosure.url;
    }
    
    if (item.mediaThumbnail) {
      return item.mediaThumbnail.$.url || item.mediaThumbnail;
    }
    
    if (item.mediaContent?.$.url) {
      return item.mediaContent.$.url;
    }
    
    // Extract from content
    const imgMatch = (item.content || item.summary || '').match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) {
      return imgMatch[1];
    }
    
    return null;
  }

  // Clean text content
  cleanText(text) {
    if (!text) return '';
    
    // Remove HTML tags
    let cleaned = text.replace(/<[^>]*>/g, '');
    
    // Decode HTML entities
    cleaned = cleaned
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&nbsp;/g, ' ');
    
    // Remove extra whitespace
    cleaned = cleaned.replace(/\s+/g, ' ').trim();
    
    return cleaned;
  }

  // Generate URL slug
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 100);
  }

  // Count words
  countWords(text) {
    const cleaned = this.cleanText(text);
    return cleaned.split(/\s+/).filter(word => word.length > 0).length;
  }

  // Calculate positivity score (0-10)
  calculatePositivityScore(item) {
    const text = `${item.title} ${item.contentSnippet || ''}`.toLowerCase();
    
    const positiveWords = ['win', 'victory', 'success', 'great', 'best', 'strong', 'freedom', 'patriot', 'america', 'hero'];
    const negativeWords = ['fail', 'loss', 'crisis', 'threat', 'danger', 'weak', 'corrupt', 'scandal'];
    
    let score = 5;
    
    positiveWords.forEach(word => {
      if (text.includes(word)) score++;
    });
    
    negativeWords.forEach(word => {
      if (text.includes(word)) score--;
    });
    
    return Math.max(0, Math.min(10, score));
  }

  // Calculate virality score (0-10)
  calculateViralityScore(item) {
    const text = `${item.title} ${item.contentSnippet || ''}`.toLowerCase();
    
    const viralWords = ['breaking', 'exclusive', 'shock', 'urgent', 'boom', 'huge', 'destroys', 'slams', 'explosive', 'bombshell'];
    
    let score = 5;
    
    viralWords.forEach(word => {
      if (text.includes(word)) score++;
    });
    
    return Math.min(10, score);
  }

  // Calculate trending score (0-10)
  calculateTrendingScore(item) {
    if (!item.pubDate) return 5;
    
    const hoursSincePublished = (Date.now() - new Date(item.pubDate)) / (1000 * 60 * 60);
    
    if (hoursSincePublished < 1) return 10;
    if (hoursSincePublished < 3) return 9;
    if (hoursSincePublished < 6) return 8;
    if (hoursSincePublished < 12) return 7;
    if (hoursSincePublished < 24) return 6;
    if (hoursSincePublished < 48) return 5;
    
    return Math.max(1, 5 - Math.floor(hoursSincePublished / 24));
  }

  // Add to summarization queue
  async addToSummarizationQueue(articleSlug) {
    try {
      const { data: article } = await supabase
        .from('articles')
        .select('id')
        .eq('slug', articleSlug)
        .single();
      
      if (article) {
        await supabase
          .from('summarization_queue')
          .insert({
            article_id: article.id,
            status: 'pending'
          });
      }
    } catch (error) {
      // Ignore duplicate key errors
      if (error.code !== '23505') {
        console.error('Error adding to summarization queue:', error);
      }
    }
  }
}

// Run importer
async function runImport() {
  const importer = new RSSImporter();
  return await importer.importAllFeeds();
}

// Schedule imports with cron
function scheduleImports() {
  // Run every 30 minutes
  cron.schedule('*/30 * * * *', async () => {
    console.log('\n⏰ Scheduled import starting...');
    await runImport();
  });
  
  console.log('📅 RSS Importer scheduled (runs every 30 minutes)');
  
  // Run initial import
  console.log('🚀 Running initial import...');
  runImport();
}

// Export for use as module or CLI
export { RSSImporter, runImport, scheduleImports };

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  if (process.argv.includes('--schedule')) {
    scheduleImports();
  } else {
    runImport().then(() => process.exit(0));
  }
}
