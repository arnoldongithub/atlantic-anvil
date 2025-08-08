// src/lib/placeholder-data.js
// Placeholder data for Atlantic Anvil News development and testing

// Sample categories
export const placeholderCategories = [
  { id: '1', name: 'Trump', slug: 'trump', color: '#c53030', icon: '🦅' },
  { id: '2', name: 'Republican Party', slug: 'republican-party', color: '#1a365d', icon: '🐘' },
  { id: '3', name: 'Europe', slug: 'europe', color: '#2b6cb0', icon: '🌍' },
  { id: '4', name: 'Elon Musk', slug: 'elon-musk', color: '#d69e2e', icon: '🚀' },
  { id: '5', name: 'Steve Bannon', slug: 'steve-bannon', color: '#c53030', icon: '📻' },
  { id: '6', name: 'Breaking News', slug: 'breaking', color: '#dc2626', icon: '🚨' }
];

// Sample news sources
export const placeholderSources = [
  { 
    id: '1', 
    name: 'fox-news', 
    display_name: 'Fox News',
    logo_url: 'https://via.placeholder.com/100x100/1a365d/ffffff?text=FOX'
  },
  { 
    id: '2', 
    name: 'daily-wire', 
    display_name: 'Daily Wire',
    logo_url: 'https://via.placeholder.com/100x100/c53030/ffffff?text=DW'
  },
  { 
    id: '3', 
    name: 'breitbart', 
    display_name: 'Breitbart',
    logo_url: 'https://via.placeholder.com/100x100/ff6600/ffffff?text=BB'
  },
  { 
    id: '4', 
    name: 'epoch-times', 
    display_name: 'Epoch Times',
    logo_url: 'https://via.placeholder.com/100x100/d69e2e/ffffff?text=ET'
  },
  { 
    id: '5', 
    name: 'oann', 
    display_name: 'OAN',
    logo_url: 'https://via.placeholder.com/100x100/dc2626/ffffff?text=OAN'
  }
];

// Sample articles
export const placeholderArticles = [
  {
    id: '1',
    title: 'Trump Surges in Early Primary Polls, Leads by Double Digits',
    slug: 'trump-surges-early-primary-polls',
    excerpt: 'Former President Donald Trump has extended his lead in early primary polling, now commanding a double-digit advantage over his nearest rivals according to multiple national surveys released this week.',
    content: 'Former President Donald Trump has extended his lead in early primary polling, now commanding a double-digit advantage over his nearest rivals. The latest polls show Trump at 55% support among likely Republican primary voters, with his nearest competitor at 42%. This represents a significant increase from last month\'s polling...',
    image_url: 'https://via.placeholder.com/800x450/c53030/ffffff?text=Trump+Rally',
    thumbnail_url: 'https://via.placeholder.com/400x225/c53030/ffffff?text=Trump',
    source: placeholderSources[0],
    source_id: '1',
    category: placeholderCategories[0],
    category_id: '1',
    author: 'John Patterson',
    published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    views_count: 15420,
    likes_count: 3211,
    shares_count: 892,
    comments_count: 234,
    reading_time: 5,
    positivity_score: 8,
    virality_score: 9,
    trending_score: 10,
    is_featured: true,
    is_breaking: true,
    is_premium: false,
    status: 'published'
  },
  {
    id: '2',
    title: 'GOP House Passes Major Border Security Bill Despite Democrat Opposition',
    slug: 'gop-house-passes-border-security-bill',
    excerpt: 'House Republicans successfully passed comprehensive border security legislation today, fulfilling a key campaign promise despite unified Democrat opposition.',
    content: 'In a significant legislative victory, House Republicans passed H.R. 2024, a comprehensive border security package that includes funding for border wall construction and enhanced enforcement measures...',
    image_url: 'https://via.placeholder.com/800x450/1a365d/ffffff?text=Border+Security',
    thumbnail_url: 'https://via.placeholder.com/400x225/1a365d/ffffff?text=Congress',
    source: placeholderSources[1],
    source_id: '2',
    category: placeholderCategories[1],
    category_id: '2',
    author: 'Sarah Mitchell',
    published_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    views_count: 8932,
    likes_count: 2100,
    shares_count: 445,
    comments_count: 123,
    reading_time: 4,
    positivity_score: 7,
    virality_score: 6,
    trending_score: 8,
    is_featured: false,
    is_breaking: false,
    is_premium: false,
    status: 'published'
  },
  {
    id: '3',
    title: 'Elon Musk Announces Major Free Speech Initiative for X Platform',
    slug: 'elon-musk-free-speech-initiative-x',
    excerpt: 'Tech billionaire Elon Musk unveiled sweeping changes to X\'s content moderation policies, emphasizing a return to free speech principles.',
    content: 'Elon Musk announced today a comprehensive overhaul of X\'s content moderation systems, introducing what he calls the "Free Speech Protocol" that will dramatically reduce censorship on the platform...',
    image_url: 'https://via.placeholder.com/800x450/d69e2e/ffffff?text=Elon+Musk',
    thumbnail_url: 'https://via.placeholder.com/400x225/d69e2e/ffffff?text=X',
    source: placeholderSources[2],
    source_id: '3',
    category: placeholderCategories[3],
    category_id: '4',
    author: 'Tech Desk',
    published_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    views_count: 12543,
    likes_count: 4521,
    shares_count: 1232,
    comments_count: 445,
    reading_time: 3,
    positivity_score: 9,
    virality_score: 8,
    trending_score: 7,
    is_featured: true,
    is_breaking: false,
    is_premium: false,
    status: 'published'
  },
  {
    id: '4',
    title: 'BREAKING: Supreme Court Rules 6-3 in Landmark Second Amendment Case',
    slug: 'supreme-court-second-amendment-ruling',
    excerpt: 'The Supreme Court delivered a major victory for gun rights advocates today, striking down restrictive state laws in a 6-3 decision.',
    content: 'In a landmark decision that will reshape Second Amendment jurisprudence, the Supreme Court ruled 6-3 to strike down several state-level gun restrictions as unconstitutional...',
    image_url: 'https://via.placeholder.com/800x450/dc2626/ffffff?text=Breaking+News',
    thumbnail_url: 'https://via.placeholder.com/400x225/dc2626/ffffff?text=SCOTUS',
    source: placeholderSources[0],
    source_id: '1',
    category: placeholderCategories[5],
    category_id: '6',
    author: 'Legal Affairs Team',
    published_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    views_count: 28934,
    likes_count: 8234,
    shares_count: 3421,
    comments_count: 892,
    reading_time: 6,
    positivity_score: 10,
    virality_score: 10,
    trending_score: 10,
    is_featured: true,
    is_breaking: true,
    is_premium: false,
    status: 'published'
  },
  {
    id: '5',
    title: 'European Conservative Parties Gain Ground in Latest Elections',
    slug: 'european-conservative-parties-gain',
    excerpt: 'Right-wing parties across Europe celebrated significant electoral victories this weekend, marking a continued shift in European politics.',
    content: 'Conservative and right-wing parties made substantial gains in elections across three European nations this weekend, continuing a trend that has reshaped the continent\'s political landscape...',
    image_url: 'https://via.placeholder.com/800x450/2b6cb0/ffffff?text=Europe+Elections',
    thumbnail_url: 'https://via.placeholder.com/400x225/2b6cb0/ffffff?text=EU',
    source: placeholderSources[3],
    source_id: '4',
    category: placeholderCategories[2],
    category_id: '3',
    author: 'International Desk',
    published_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    views_count: 6234,
    likes_count: 1823,
    shares_count: 412,
    comments_count: 98,
    reading_time: 4,
    positivity_score: 8,
    virality_score: 5,
    trending_score: 6,
    is_featured: false,
    is_breaking: false,
    is_premium: true,
    status: 'published'
  },
  {
    id: '6',
    title: 'Steve Bannon: "The Establishment is in Full Panic Mode"',
    slug: 'steve-bannon-establishment-panic',
    excerpt: 'In an exclusive War Room interview, Steve Bannon discusses the establishment\'s reaction to growing populist movements worldwide.',
    content: 'Steve Bannon, speaking on his War Room podcast, declared that "the establishment is in full panic mode" as populist movements continue to gain momentum across the United States and Europe...',
    image_url: 'https://via.placeholder.com/800x450/c53030/ffffff?text=Bannon+WarRoom',
    thumbnail_url: 'https://via.placeholder.com/400x225/c53030/ffffff?text=Bannon',
    source: placeholderSources[4],
    source_id: '5',
    category: placeholderCategories[4],
    category_id: '5',
    author: 'War Room Staff',
    published_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    views_count: 9823,
    likes_count: 3421,
    shares_count: 823,
    comments_count: 234,
    reading_time: 5,
    positivity_score: 7,
    virality_score: 7,
    trending_score: 5,
    is_featured: false,
    is_breaking: false,
    is_premium: false,
    status: 'published'
  }
];

// Generate more articles
export function generatePlaceholderArticles(count = 20) {
  const articles = [...placeholderArticles];
  const templates = [
    { 
      title: 'Republicans Score Major Victory in [STATE] Special Election',
      category: 1,
      source: 0
    },
    { 
      title: 'Poll: Trump Leads Biden by [NUMBER] Points in Swing States',
      category: 0,
      source: 1
    },
    { 
      title: 'Musk Exposes [AGENCY] Censorship Efforts on X Platform',
      category: 3,
      source: 2
    },
    { 
      title: 'Breaking: Federal Judge Rules Against [POLICY] Mandate',
      category: 5,
      source: 0
    },
    { 
      title: 'European Nation [COUNTRY] Elects Conservative Government',
      category: 2,
      source: 3
    }
  ];
  
  const states = ['Texas', 'Florida', 'Ohio', 'Arizona', 'Georgia'];
  const numbers = [5, 7, 10, 12, 15];
  const agencies = ['FBI', 'CIA', 'DOJ', 'DHS', 'State Dept'];
  const policies = ['Vaccine', 'Climate', 'Gender', 'Immigration', 'Gun Control'];
  const countries = ['Italy', 'Poland', 'Hungary', 'Netherlands', 'Sweden'];
  
  for (let i = articles.length; i < count; i++) {
    const template = templates[i % templates.length];
    const title = template.title
      .replace('[STATE]', states[Math.floor(Math.random() * states.length)])
      .replace('[NUMBER]', numbers[Math.floor(Math.random() * numbers.length)])
      .replace('[AGENCY]', agencies[Math.floor(Math.random() * agencies.length)])
      .replace('[POLICY]', policies[Math.floor(Math.random() * policies.length)])
      .replace('[COUNTRY]', countries[Math.floor(Math.random() * countries.length)]);
    
    articles.push({
      id: `${i + 1}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: `${title}. This story is developing and will be updated as more information becomes available.`,
      content: `Full content for: ${title}...`,
      image_url: `https://via.placeholder.com/800x450/${placeholderCategories[template.category].color.replace('#', '')}/ffffff?text=${encodeURIComponent(title.substring(0, 20))}`,
      thumbnail_url: `https://via.placeholder.com/400x225/${placeholderCategories[template.category].color.replace('#', '')}/ffffff?text=News`,
      source: placeholderSources[template.source],
      source_id: placeholderSources[template.source].id,
      category: placeholderCategories[template.category],
      category_id: placeholderCategories[template.category].id,
      author: 'Atlantic Anvil Staff',
      published_at: new Date(Date.now() - (i * 2 * 60 * 60 * 1000)).toISOString(),
      views_count: Math.floor(Math.random() * 10000),
      likes_count: Math.floor(Math.random() * 2000),
      shares_count: Math.floor(Math.random() * 500),
      comments_count: Math.floor(Math.random() * 200),
      reading_time: Math.floor(Math.random() * 6) + 2,
      positivity_score: Math.floor(Math.random() * 5) + 5,
      virality_score: Math.floor(Math.random() * 5) + 3,
      trending_score: Math.max(1, 10 - Math.floor(i / 2)),
      is_featured: i < 3,
      is_breaking: Math.random() > 0.8,
      is_premium: Math.random() > 0.9,
      status: 'published'
    });
  }
  
  return articles;
}

// Sample comments
export const placeholderComments = [
  {
    id: '1',
    article_id: '1',
    user: { name: 'PatriotEagle1776', avatar: '🦅' },
    content: 'Finally, some real leadership! America First!',
    likes_count: 45,
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    article_id: '1',
    user: { name: 'ConservativeMom', avatar: '🇺🇸' },
    content: 'The polls speak for themselves. The people want Trump back!',
    likes_count: 32,
    created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    article_id: '2',
    user: { name: 'BorderPatriot', avatar: '🛡️' },
    content: 'About time Congress did something about the border crisis!',
    likes_count: 28,
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  }
];

// Sample user profiles
export const placeholderProfiles = [
  {
    id: '1',
    email: 'john.patriot@example.com',
    full_name: 'John Patriot',
    username: 'PatriotEagle1776',
    avatar_url: 'https://via.placeholder.com/150x150/1a365d/ffffff?text=JP',
    bio: 'Conservative, Christian, Constitutionalist. America First! 🇺🇸',
    location: 'Texas, USA',
    role: 'subscriber',
    subscription_tier: 'patriot',
    subscription_active: true,
    created_at: new Date('2024-01-01').toISOString()
  },
  {
    id: '2',
    email: 'sarah.freedom@example.com',
    full_name: 'Sarah Freedom',
    username: 'ConservativeMom',
    avatar_url: 'https://via.placeholder.com/150x150/c53030/ffffff?text=SF',
    bio: 'Mother of 3, Fighter for Freedom, Trump Supporter',
    location: 'Florida, USA',
    role: 'subscriber',
    subscription_tier: 'defender',
    subscription_active: true,
    created_at: new Date('2024-02-01').toISOString()
  },
  {
    id: '3',
    email: 'mike.liberty@example.com',
    full_name: 'Mike Liberty',
    username: 'LibertyMike',
    avatar_url: 'https://via.placeholder.com/150x150/d69e2e/ffffff?text=ML',
    bio: 'Veteran, 2A Advocate, Limited Government',
    location: 'Arizona, USA',
    role: 'reader',
    subscription_tier: null,
    subscription_active: false,
    created_at: new Date('2024-03-01').toISOString()
  }
];

// Sample trending topics
export const placeholderTrendingTopics = [
  { name: '#Trump2024', count: '1.2M', trend: 'up' },
  { name: '#BorderCrisis', count: '892K', trend: 'up' },
  { name: '#ElonMusk', count: '654K', trend: 'stable' },
  { name: '#MAGA', count: '543K', trend: 'up' },
  { name: '#BidenImpeachment', count: '421K', trend: 'up' },
  { name: '#2ndAmendment', count: '387K', trend: 'stable' },
  { name: '#ParentalRights', count: '298K', trend: 'up' },
  { name: '#EnergyIndependence', count: '234K', trend: 'up' }
];

// Sample ads/sponsored content
export const placeholderAds = [
  {
    id: 'ad1',
    type: 'banner',
    title: 'Support Atlantic Anvil',
    content: 'Keep conservative news free and independent',
    cta: 'Donate Now',
    url: 'https://givesendgo.com/atlanticanvil',
    image: 'https://via.placeholder.com/728x90/1a365d/ffffff?text=Support+Independent+Media'
  },
  {
    id: 'ad2',
    type: 'square',
    title: 'Patriot Mobile',
    content: 'Americas only Christian conservative wireless provider',
    cta: 'Switch Today',
    url: '#',
    image: 'https://via.placeholder.com/300x250/c53030/ffffff?text=Patriot+Mobile'
  },
  {
    id: 'ad3',
    type: 'native',
    title: 'MyPillow Special Offer',
    content: 'Use promo code ATLANTIC for 50% off',
    cta: 'Shop Now',
    url: '#',
    image: 'https://via.placeholder.com/300x200/2b6cb0/ffffff?text=MyPillow'
  }
];

// Sample subscription tiers
export const placeholderSubscriptionTiers = [
  {
    id: 'patriot',
    name: 'Patriot',
    price: 9.99,
    features: [
      'Ad-free reading',
      'Early access to breaking news',
      'Monthly newsletter',
      'Patriot badge'
    ],
    color: '#c53030',
    popular: false
  },
  {
    id: 'defender',
    name: 'Defender', 
    price: 14.99,
    features: [
      'Everything in Patriot',
      'Exclusive articles',
      'Comment priority',
      'Weekly insider reports',
      'Defender badge'
    ],
    color: '#d69e2e',
    popular: true
  },
  {
    id: 'guardian',
    name: 'Guardian',
    price: 39.99,
    features: [
      'Everything in Defender',
      'Direct message access',
      'Monthly video calls',
      'Influence content direction',
      'Guardian badge',
      'Founding member status'
    ],
    color: '#1a365d',
    popular: false
  }
];

// Sample navigation menu items
export const placeholderNavigation = {
  main: [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Politics', href: '/category/politics', icon: '🏛️' },
    { name: 'Trump', href: '/category/trump', icon: '🦅' },
    { name: 'Elections', href: '/category/elections', icon: '🗳️' },
    { name: 'Culture', href: '/category/culture', icon: '⛪' },
    { name: 'Opinion', href: '/category/opinion', icon: '💭' }
  ],
  categories: [
    { name: 'Breaking News', href: '/category/breaking', hot: true },
    { name: 'Trump 2024', href: '/category/trump' },
    { name: 'Republican Party', href: '/category/republican-party' },
    { name: 'Border Crisis', href: '/category/border' },
    { name: 'Second Amendment', href: '/category/2a' },
    { name: 'Big Tech', href: '/category/tech' },
    { name: 'Deep State', href: '/category/deep-state' },
    { name: 'Election Integrity', href: '/category/elections' }
  ],
  footer: {
    about: [
      { name: 'About Us', href: '/about' },
      { name: 'Mission', href: '/mission' },
      { name: 'Team', href: '/team' },
      { name: 'Contact', href: '/contact' }
    ],
    support: [
      { name: 'Donate', href: '/donate' },
      { name: 'Subscribe', href: '/subscribe' },
      { name: 'Merchandise', href: '/shop' },
      { name: 'Advertise', href: '/advertise' }
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Disclaimers', href: '/disclaimers' }
    ],
    social: [
      { name: 'Twitter/X', href: 'https://twitter.com/atlanticanvil', icon: '𝕏' },
      { name: 'Truth Social', href: 'https://truthsocial.com/@atlanticanvil', icon: 'T' },
      { name: 'Telegram', href: 'https://t.me/atlanticanvil', icon: '✈️' },
      { name: 'Rumble', href: 'https://rumble.com/atlanticanvil', icon: 'R' },
      { name: 'Gab', href: 'https://gab.com/atlanticanvil', icon: 'G' }
    ]
  }
};

// Mock API response functions
export const mockAPI = {
  // Get latest articles
  async getLatestArticles(limit = 20) {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    return {
      success: true,
      data: generatePlaceholderArticles(limit),
      total: 100,
      page: 1,
      per_page: limit
    };
  },

  // Get article by slug
  async getArticleBySlug(slug) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const article = placeholderArticles.find(a => a.slug === slug);
    return {
      success: !!article,
      data: article || null
    };
  },

  // Get trending articles
  async getTrendingArticles(limit = 10) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const trending = [...placeholderArticles]
      .sort((a, b) => b.trending_score - a.trending_score)
      .slice(0, limit);
    return {
      success: true,
      data: trending
    };
  },

  // Get articles by category
  async getArticlesByCategory(categorySlug, limit = 20) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const category = placeholderCategories.find(c => c.slug === categorySlug);
    if (!category) {
      return { success: false, error: 'Category not found' };
    }
    
    const articles = generatePlaceholderArticles(50)
      .filter(a => a.category_id === category.id)
      .slice(0, limit);
    
    return {
      success: true,
      data: articles,
      category
    };
  },

  // Get featured articles
  async getFeaturedArticles(limit = 5) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const featured = placeholderArticles
      .filter(a => a.is_featured)
      .slice(0, limit);
    return {
      success: true,
      data: featured
    };
  },

  // Search articles
  async searchArticles(query, limit = 20) {
    await new Promise(resolve => setTimeout(resolve, 600));
    const results = generatePlaceholderArticles(50)
      .filter(a => 
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit);
    
    return {
      success: true,
      data: results,
      query,
      total: results.length
    };
  },

  // Get user profile
  async getUserProfile(userId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const profile = placeholderProfiles.find(p => p.id === userId);
    return {
      success: !!profile,
      data: profile || null
    };
  },

  // Simulate user login
  async login(email, password) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock successful login for demo
    if (email === 'demo@atlanticanvil.com' && password === 'password') {
      return {
        success: true,
        data: {
          user: placeholderProfiles[0],
          token: 'mock-jwt-token-' + Date.now(),
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      };
    }
    
    return {
      success: false,
      error: 'Invalid credentials'
    };
  },

  // Simulate article interaction
  async recordInteraction(articleId, interactionType) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      success: true,
      data: {
        article_id: articleId,
        interaction_type: interactionType,
        timestamp: new Date().toISOString()
      }
    };
  }
};

// Export everything
export default {
  categories: placeholderCategories,
  sources: placeholderSources,
  articles: placeholderArticles,
  comments: placeholderComments,
  profiles: placeholderProfiles,
  trendingTopics: placeholderTrendingTopics,
  ads: placeholderAds,
  subscriptionTiers: placeholderSubscriptionTiers,
  navigation: placeholderNavigation,
  generateArticles: generatePlaceholderArticles,
  api: mockAPI
};
