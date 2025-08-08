// CORS Proxies for fetching RSS feeds
const CORS_PROXIES = [
  'https://api.allorigins.win/get?url=',
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/'
];

// RSS Feed URLs by category
export const RSS_FEEDS = {
  TRUMP: [
    { name: 'Fox News Politics', url: 'https://feeds.foxnews.com/foxnews/politics', bias: 'right' },
    { name: 'Breitbart', url: 'https://feeds.feedburner.com/breitbart', bias: 'right' },
    { name: 'Daily Wire', url: 'https://feeds.dailywire.com/news', bias: 'right' },
    { name: 'CNN Politics', url: 'http://rss.cnn.com/rss/cnn_allpolitics.rss', bias: 'left' },
    { name: 'Reuters Politics', url: 'https://feeds.reuters.com/reuters/politicsNews', bias: 'center' }
  ],
  'REPUBLICAN PARTY': [
    { name: 'Fox News Politics', url: 'https://feeds.foxnews.com/foxnews/politics', bias: 'right' },
    { name: 'National Review', url: 'https://www.nationalreview.com/rss.xml', bias: 'right' },
    { name: 'The Hill', url: 'https://thehill.com/news/feed/', bias: 'center' }
  ],
  'EUROPE': [
    { name: 'BBC Europe', url: 'http://feeds.bbci.co.uk/news/world/europe/rss.xml', bias: 'center' },
    { name: 'Reuters Europe', url: 'https://feeds.reuters.com/reuters/UKdomesticNews', bias: 'center' },
    { name: 'Euronews', url: 'https://feeds.feedburner.com/euronews/en/home', bias: 'center' }
  ],
  'ELON MUSK': [
    { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', bias: 'center' },
    { name: 'Ars Technica', url: 'http://feeds.arstechnica.com/arstechnica/index', bias: 'center' },
    { name: 'Reuters Technology', url: 'https://feeds.reuters.com/reuters/technologyNews', bias: 'center' }
  ],
  'STEVE BANNON': [
    { name: 'Breitbart', url: 'https://feeds.feedburner.com/breitbart', bias: 'right' },
    { name: 'Daily Wire', url: 'https://feeds.dailywire.com/news', bias: 'right' },
    { name: 'Politico', url: 'https://www.politico.com/rss/politicopicks.xml', bias: 'center' }
  ]
};

// Mock data for development/fallback
const MOCK_NEWS_DATA = {
  TRUMP: [
    {
      id: '1',
      title: 'Trump Announces New Policy Initiative for Economic Growth',
      excerpt: 'Former President outlines comprehensive plan to boost American manufacturing.',
      url: 'https://example.com/article1',
      source: 'Fox News',
      imageUrl: 'https://picsum.photos/400/240?random=1',
      image_url: 'https://picsum.photos/400/240?random=1',
      thumbnail_url: 'https://picsum.photos/400/240?random=1',
      timeAgo: '2h ago',
      readTime: '4 min read',
      reading_time: 4,
      is_breaking: false,
      is_featured: true,
      trending_score: 8
    },
    {
      id: '2',
      title: 'Political Rally Draws Thousands in Key Swing State',
      excerpt: 'Large crowds gather for major political event in battleground state.',
      url: 'https://example.com/article2',
      source: 'CNN',
      imageUrl: 'https://picsum.photos/400/240?random=2',
      image_url: 'https://picsum.photos/400/240?random=2',
      thumbnail_url: 'https://picsum.photos/400/240?random=2',
      timeAgo: '4h ago',
      readTime: '3 min read',
      reading_time: 3,
      is_breaking: true,
      is_featured: false,
      trending_score: 6
    }
  ],
  'REPUBLICAN PARTY': [
    {
      id: '3',
      title: 'GOP Leaders Meet to Discuss Legislative Priorities',
      excerpt: 'Republican leadership convenes to outline key policy objectives for upcoming session.',
      url: 'https://example.com/article3',
      source: 'Reuters',
      imageUrl: 'https://picsum.photos/400/240?random=3',
      image_url: 'https://picsum.photos/400/240?random=3',
      thumbnail_url: 'https://picsum.photos/400/240?random=3',
      timeAgo: '1h ago',
      readTime: '5 min read',
      reading_time: 5,
      is_breaking: false,
      is_featured: true,
      trending_score: 7
    }
  ],
  'EUROPE': [
    {
      id: '4',
      title: 'European Union Announces New Trade Agreement',
      excerpt: 'Major economic partnership signed with significant implications for international commerce.',
      url: 'https://example.com/article4',
      source: 'BBC',
      imageUrl: 'https://picsum.photos/400/240?random=4',
      image_url: 'https://picsum.photos/400/240?random=4',
      thumbnail_url: 'https://picsum.photos/400/240?random=4',
      timeAgo: '3h ago',
      readTime: '6 min read',
      reading_time: 6,
      is_breaking: false,
      is_featured: false,
      trending_score: 5
    }
  ],
  'ELON MUSK': [
    {
      id: '5',
      title: 'SpaceX Successfully Launches Next-Generation Satellite',
      excerpt: 'Latest mission marks significant milestone in commercial space exploration.',
      url: 'https://example.com/article5',
      source: 'TechCrunch',
      imageUrl: 'https://picsum.photos/400/240?random=5',
      image_url: 'https://picsum.photos/400/240?random=5',
      thumbnail_url: 'https://picsum.photos/400/240?random=5',
      timeAgo: '5h ago',
      readTime: '4 min read',
      reading_time: 4,
      is_breaking: true,
      is_featured: true,
      trending_score: 9
    }
  ],
  'STEVE BANNON': [
    {
      id: '6',
      title: 'Political Strategist Comments on Current Events',
      excerpt: 'Analysis and commentary on recent political developments and their implications.',
      url: 'https://example.com/article6',
      source: 'Politico',
      imageUrl: 'https://picsum.photos/400/240?random=6',
      image_url: 'https://picsum.photos/400/240?random=6',
      thumbnail_url: 'https://picsum.photos/400/240?random=6',
      timeAgo: '6h ago',
      readTime: '7 min read',
      reading_time: 7,
      is_breaking: false,
      is_featured: false,
      trending_score: 4
    }
  ]
};

// RSS parser using DOMParser
const parseRSSFeed = (xmlString) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    
    const items = xmlDoc.querySelectorAll('item');
    const articles = [];
    
    items.forEach((item, index) => {
      if (index >= 10) return;
      
      const title = item.querySelector('title')?.textContent || '';
      const description = item.querySelector('description')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';
      const category = item.querySelector('category')?.textContent || '';
      
      const imageMatch = description.match(/<img[^>]+src="([^">]+)"/);
      const imageUrl = imageMatch ? imageMatch[1] : `https://picsum.photos/400/240?random=${index}`;
      
      const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
      const timeAgo = getTimeAgo(new Date(pubDate));
      
      articles.push({
        id: `rss-${Date.now()}-${index}`,
        title: title.substring(0, 150),
        excerpt: cleanDescription,
        url: link,
        source: 'RSS Feed',
        imageUrl,
        image_url: imageUrl,
        thumbnail_url: imageUrl,
        timeAgo,
        readTime: `${Math.ceil(cleanDescription.split(' ').length / 200)} min read`,
        reading_time: Math.ceil(cleanDescription.split(' ').length / 200),
        is_breaking: false,
        is_featured: index === 0,
        trending_score: Math.floor(Math.random() * 10)
      });
    });
    
    return articles;
  } catch (error) {
    console.error('RSS parsing error:', error);
    return [];
  }
};

// Calculate time ago
const getTimeAgo = (date) => {
  const now = new Date();
  const diffInMilliseconds = now - date;
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    return `${diffInDays}d ago`;
  }
};

// Fetch RSS feed through CORS proxy
const fetchRSSFeed = async (feedUrl, proxyIndex = 0) => {
  if (proxyIndex >= CORS_PROXIES.length) {
    throw new Error('All CORS proxies failed');
  }
  
  try {
    const proxyUrl = CORS_PROXIES[proxyIndex] + encodeURIComponent(feedUrl);
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    let xmlString;
    
    if (proxyUrl.includes('allorigins.win')) {
      const data = await response.json();
      xmlString = data.contents;
    } else {
      xmlString = await response.text();
    }
    
    return parseRSSFeed(xmlString);
  } catch (error) {
    console.warn(`CORS proxy ${proxyIndex} failed:`, error);
    return fetchRSSFeed(feedUrl, proxyIndex + 1);
  }
};

// Remove duplicate articles
const removeDuplicates = (articles) => {
  const seen = new Set();
  return articles.filter(article => {
    const simplifiedTitle = article.title.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 50);
    
    if (seen.has(simplifiedTitle)) {
      return false;
    }
    seen.add(simplifiedTitle);
    return true;
  });
};

// Main function to fetch news by category - THIS IS WHAT YOUR APP.JSX NEEDS!
export const fetchNews = async (category = 'TRUMP') => {
  try {
    const feeds = RSS_FEEDS[category] || RSS_FEEDS.TRUMP;
    const allArticles = [];
    
    // Try to fetch from RSS feeds
    const feedPromises = feeds.map(async (feed) => {
      try {
        const articles = await fetchRSSFeed(feed.url);
        return articles.map(article => ({
          ...article,
          source: feed.name,
          bias: feed.bias
        }));
      } catch (error) {
        console.warn(`Failed to fetch from ${feed.name}:`, error);
        return [];
      }
    });
    
    const results = await Promise.allSettled(feedPromises);
    
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        allArticles.push(...result.value);
      }
    });
    
    // If we got some articles from RSS feeds, return them
    if (allArticles.length > 0) {
      const uniqueArticles = removeDuplicates(allArticles);
      return uniqueArticles.slice(0, 20);
    }
    
    // Fallback to mock data if RSS feeds fail
    console.warn('RSS feeds failed, using mock data');
    return MOCK_NEWS_DATA[category] || MOCK_NEWS_DATA.TRUMP || [];
    
  } catch (error) {
    console.error('Error fetching news:', error);
    return MOCK_NEWS_DATA[category] || MOCK_NEWS_DATA.TRUMP || [];
  }
};

// Export at the end of the file
export { MOCK_NEWS_DATA };
