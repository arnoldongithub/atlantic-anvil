// src/lib/news-api.js
// Conservative News RSS Feeds and API Service

export const RSS_FEEDS = {
  TRUMP: [
    {
      name: 'Fox News - Politics',
      url: 'https://feeds.foxnews.com/foxnews/politics',
      bias: 'right'
    },
    {
      name: 'Daily Wire',
      url: 'https://www.dailywire.com/feeds/rss.xml',
      bias: 'right'
    },
    {
      name: 'New York Post - Politics',
      url: 'https://nypost.com/politics/feed/',
      bias: 'right'
    },
    {
      name: 'Breitbart News',
      url: 'https://feeds.feedburner.com/breitbart',
      bias: 'right'
    },
    {
      name: 'The Federalist',
      url: 'https://thefederalist.com/feed/',
      bias: 'right'
    }
  ],
  'REPUBLICAN PARTY': [
    {
      name: 'GOP.com',
      url: 'https://www.gop.com/feed/',
      bias: 'right'
    },
    {
      name: 'RedState',
      url: 'https://redstate.com/feed',
      bias: 'right'
    },
    {
      name: 'American Conservative',
      url: 'https://www.theamericanconservative.com/feed/',
      bias: 'right'
    },
    {
      name: 'National Review',
      url: 'https://www.nationalreview.com/feed/',
      bias: 'right'
    },
    {
      name: 'Conservative Review',
      url: 'https://www.conservativereview.com/feed/',
      bias: 'right'
    }
  ],
  EUROPE: [
    {
      name: 'Daily Mail - News',
      url: 'https://www.dailymail.co.uk/news/index.rss',
      bias: 'right'
    },
    {
      name: 'The Telegraph',
      url: 'https://www.telegraph.co.uk/rss.xml',
      bias: 'right'
    },
    {
      name: 'Spiked Online',
      url: 'https://www.spiked-online.com/feed/',
      bias: 'right'
    },
    {
      name: 'The Spectator',
      url: 'https://www.spectator.co.uk/feed/',
      bias: 'right'
    },
    {
      name: 'UnHerd',
      url: 'https://unherd.com/feed/',
      bias: 'center-right'
    }
  ],
  'ELON MUSK': [
    {
      name: 'Fox Business',
      url: 'https://feeds.foxnews.com/foxnews/business',
      bias: 'right'
    },
    {
      name: 'Wall Street Journal - Tech',
      url: 'https://feeds.a.dj.com/rss/RSSWSJD.xml',
      bias: 'center-right'
    },
    {
      name: 'TechCrunch',
      url: 'https://techcrunch.com/feed/',
      bias: 'center'
    },
    {
      name: 'The Verge',
      url: 'https://www.theverge.com/rss/index.xml',
      bias: 'center'
    }
  ],
  'STEVE BANNON': [
    {
      name: 'Breitbart News',
      url: 'https://feeds.feedburner.com/breitbart',
      bias: 'right'
    },
    {
      name: 'Gateway Pundit',
      url: 'https://www.thegatewaypundit.com/feed/',
      bias: 'right'
    },
    {
      name: 'American Greatness',
      url: 'https://amgreatness.com/feed/',
      bias: 'right'
    },
    {
      name: 'The National Pulse',
      url: 'https://thenationalpulse.com/feed/',
      bias: 'right'
    }
  ]
};

// CORS proxy services for RSS feeds
const CORS_PROXIES = [
  'https://api.allorigins.win/get?url=',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.codetabs.com/v1/proxy?quest='
];

// Mock data for development/fallback
export const MOCK_NEWS_DATA = {
  /* ... your existing mock data ... */
};

// (and all helper functions: parseRSSFeed, getTimeAgo, fetchRSSFeed, fetchNews, removeDuplicates)

