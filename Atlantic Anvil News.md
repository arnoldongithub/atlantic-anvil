# 🦅 Atlantic Anvil News

**Conservative News Aggregator with AI-Powered Summarization**

Atlantic Anvil delivers trusted conservative news from multiple sources with Ground News-inspired layout, featuring AI summarization, premium subscriptions, and patriotic design.

[![Deployed on Cloudflare Pages](https://img.shields.io/badge/Deployed-Cloudflare%20Pages-orange)](https://atlanticanvil.com)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-38B2AC)](https://tailwindcss.com/)
[![Python FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)](https://fastapi.tiangolo.com/)

## 🎯 Features

### 📰 **News Aggregation**
- **Multi-source RSS feeds** from trusted conservative outlets
- **Ground News-style layout** with featured stories
- **Category-based organization** (Trump, Republican Party, Europe, Elon Musk, Steve Bannon)
- **Real-time updates** with cached RSS processing

### 🤖 **AI-Powered Content**
- **Article summarization** using `sshleifer/distilbart-cnn-12-6` model
- **Batch processing** for efficient AI operations
- **Conservative context enhancement** for better summarization
- **Fallback extractive summaries** for reliability

### 💰 **Monetization**
- **Three-tier subscriptions**: Patriot ($9.99), Defender ($19.99), Guardian ($39.99)
- **Premium content** access control
- **Donation integration** with GiveSendGo and worldwide platforms
- **Merchandise store** integration

### 🎨 **Atlantic Anvil Design**
- **Patriotic theme** with navy blue, red, and gold colors
- **Eagle symbolism** throughout the interface
- **Responsive design** for all devices
- **Dark mode** support based on system preferences

## 🏗️ Architecture

```
Frontend (Cloudflare Pages)
├── React + Vite
├── Tailwind CSS
├── Atlantic Anvil Theme
└── Ground News Layout

Backend (EC2)
├── Python FastAPI (Subscriptions + AI)
├── Node.js RSS Service (Feed Processing)
├── PM2 Process Management
└── Supabase Database

External Services
├── Supabase (PostgreSQL Database)
├── Stripe (Payment Processing)
├── HuggingFace (AI Summarization)
└── Namecheap/Hostinger (Domain/DNS)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm 9+
- Python 3.9+ (for backend)
- Supabase account
- HuggingFace API token

### Frontend Setup

```bash
# Clone repository
git clone https://github.com/your-username/atlantic-anvil-news.git
cd atlantic-anvil-news

# Install dependencies
npm install

# Copy environment variables
cp .env .env.local

# Edit .env.local with your API keys
nano .env.local

# Start development server
npm run dev
```

### Environment Variables

Create `.env.local` with:

```bash
# App Configuration
VITE_APP_NAME=Atlantic Anvil News
VITE_APP_VERSION=1.0.0

# API Endpoints
VITE_NEWS_API_URL=https://api.atlanticanvil.com
VITE_RSS_PROXY_URL=https://api.allorigins.win/get?url=

# External APIs
VITE_NEWS_API_KEY=your_news_api_key_here
HUGGINGFACE_API_TOKEN=your_huggingface_token_here

# Monetization
VITE_GIVESENDGO_URL=https://www.givesendgo.com/your-campaign
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key_here

# Subscription Pricing
VITE_PATRIOT_PRICE=9.99
VITE_DEFENDER_PRICE=19.99
VITE_GUARDIAN_PRICE=39.99
```

### Database Setup

```bash
# 1. Create Supabase project
# 2. Run the schema
psql -h your-supabase-host -U postgres -d postgres -f sql/supabase_schema.sql

# 3. Set up Row Level Security policies
# (Already included in schema file)
```

## 📁 Project Structure

```
atlantic-anvil/
├── public/                 # Static assets
│   ├── favicon.svg        # Atlantic Anvil favicon
│   ├── robots.txt         # SEO configuration
│   └── sitemap.xml        # Site structure
├── src/
│   ├── components/        # React components
│   │   ├── Header.jsx     # Navigation with action buttons
│   │   ├── Homepage.jsx   # Ground News layout
│   │   ├── NewsCard.jsx   # Article display
│   │   └── ...           # Other components
│   ├── services/         # API services
│   │   ├── news-api.js   # Main news fetching
│   │   ├── rss-feeds.js  # RSS configuration
│   │   └── rss-service.js # RSS processing
│   └── index.css         # Atlantic Anvil theme
├── sql/
│   └── supabase_schema.sql # Database schema
├── summarize.py           # AI summarization service
├── batch_summarize.py     # Batch processing
└── package.json          # Dependencies
```

## 🎨 Atlantic Anvil Theme

### Color Palette
- **Atlantic Navy**: `#1a365d` - Deep navy blue (primary)
- **Anvil Red**: `#c53030` - Conservative red (secondary)  
- **Torch Gold**: `#d69e2e` - Heritage gold (accent)
- **Lightning Blue**: `#2b6cb0` - Bright blue (highlights)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, uppercase with letter spacing
- **Body**: Clean, readable with proper line height

## 📊 RSS Sources

### Conservative News Feeds
- **Fox News Politics**: `https://feeds.foxnews.com/foxnews/politics`
- **The Daily Wire**: `https://www.dailywire.com/feeds/rss.xml`
- **Breitbart News**: `https://feeds.feedburner.com/breitbart`
- **National Review**: `https://www.nationalreview.com/feed/`
- **New York Post**: `https://nypost.com/politics/feed/`
- **The Federalist**: `https://thefederalist.com/feed/`
- **The Epoch Times**: `https://www.theepochtimes.com/c-us-politics/feed`

## 🤖 AI Summarization

### sshleifer Model Integration
```python
# Conservative context enhancement
def enhance_conservative_context(text):
    conservative_keywords = [
        'conservative', 'republican', 'trump', 'gop', 
        'patriot', 'constitution', 'freedom', 'liberty'
    ]
    # Add context for better summarization
    return enhanced_text

# Batch processing with rate limiting
def process_batch(articles, batch_size=10):
    # Concurrent processing with retry logic
    return summarized_articles
```

## 💳 Subscription Tiers

### Patriot - $9.99/month
- Ad-free browsing
- Daily newsletter  
- Basic article summaries
- Mobile app access

### Defender - $19.99/month ⭐ **Most Popular**
- Everything in Patriot
- AI-powered summaries
- Exclusive investigative reports
- Breaking news alerts
- Archive access (5+ years)

### Guardian - $39.99/month
- Everything in Defender
- Direct journalist access
- Exclusive events & webinars
- Early article access (24h)
- VIP community forum

## 🚀 Deployment

### Cloudflare Pages (Frontend)
```bash
# Build command
npm run build

# Output directory
dist

# Environment variables
# Add all VITE_* variables in Cloudflare dashboard
```

### EC2 Backend (Python + Node.js)
```bash
# Will be covered in separate EC2 setup guide
# Python FastAPI + Node.js RSS service
# PM2 process management
# Systemd auto-restart
```

### DNS Configuration (Hostinger)
```
atlanticanvil.com       → CNAME → cloudflare-pages-url
api.atlanticanvil.com   → A     → EC2-IP-ADDRESS  
rss.atlanticanvil.com   → A     → EC2-IP-ADDRESS
```

## 🧪 Development

### Available Scripts
```bash
npm run dev         # Start development server
npm run build       # Build for production  
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

### Testing RSS Feeds
```bash
# Test RSS parsing locally
node -e "
const { fetchNews } = require('./src/services/news-api.js');
fetchNews('TRUMP').then(console.log);
"
```

### AI Summarization Testing
```bash
# Test Python summarization
python summarize.py

# Test batch processing
python batch_summarize.py
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Development Guidelines
- Follow Atlantic Anvil design system
- Maintain conservative news focus
- Ensure mobile responsiveness
- Add proper TypeScript types (future)
- Write tests for new features (future)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🦅 About Atlantic Anvil

Atlantic Anvil represents the strength of the American eagle, the durability of the anvil, the illumination of the torch of liberty, and the power of the lightning bolt of truth. We forge conservative news with the precision of a blacksmith and the vision of a soaring eagle.

### Our Mission
To provide trusted conservative news aggregation with AI-enhanced summaries, fostering informed discourse while upholding traditional American values and constitutional principles.

---

**Made with 🦅 by the Atlantic Anvil Team**

*"Forging Truth, Delivering Freedom"*

## 📞 Support

- **Website**: [atlanticanvil.com](https://atlanticanvil.com)
- **Email**: support@atlanticanvil.com
- **Twitter**: [@atlanticanvil](https://twitter.com/atlanticanvil)
- **Issues**: [GitHub Issues](https://github.com/your-username/atlantic-anvil-news/issues)

---

**⭐ Star this repository if Atlantic Anvil helps keep you informed!**
