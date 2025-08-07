import { useState } from 'react';

const InlineAd = ({ position = 'middle' }) => {
  const [dismissed, setDismissed] = useState(false);
  const [adType] = useState(() => {
    // Randomly select ad type
    const types = ['donation', 'subscription', 'merchandise', 'book', 'event'];
    return types[Math.floor(Math.random() * types.length)];
  });

  if (dismissed) return null;

  const adContent = {
    donation: {
      title: "🇺🇸 Support Conservative Values",
      subtitle: "Your donation helps defend our principles",
      description: "Join thousands of patriots supporting organizations that fight for constitutional rights, free markets, and traditional values.",
      cta: "Donate Now",
      link: "https://www.heritage.org/donate",
      bgColor: "bg-gradient-to-r from-red-600 to-red-700",
      textColor: "text-white"
    },
    subscription: {
      title: "⭐ Unlock Premium Features",
      subtitle: "Get exclusive content and analysis",
      description: "Access in-depth reports, early article access, ad-free browsing, and exclusive conservative commentary from trusted voices.",
      cta: "Subscribe Today",
      link: "#subscribe",
      bgColor: "bg-gradient-to-r from-blue-600 to-blue-700",
      textColor: "text-white"
    },
    merchandise: {
      title: "🛍️ Conservative Gear",
      subtitle: "Wear your values with pride",
      description: "High-quality apparel and accessories that showcase your conservative beliefs. Made in America by patriots, for patriots.",
      cta: "Shop Now",
      link: "#merch",
      bgColor: "bg-gradient-to-r from-amber-600 to-orange-600",
      textColor: "text-white"
    },
    book: {
      title: "📚 Conservative Reading",
      subtitle: "Expand your knowledge",
      description: "Discover essential books that shaped conservative thought. From economic principles to historical insights and political philosophy.",
      cta: "Browse Books",
      link: "https://www.amazon.com/books-conservative-politics/s?k=conservative+politics",
      bgColor: "bg-gradient-to-r from-green-600 to-emerald-600",
      textColor: "text-white"
    },
    event: {
      title: "🎪 Conservative Events",
      subtitle: "Connect with fellow patriots",
      description: "Join local and national conservative gatherings, conferences, and rallies. Network with like-minded individuals and leaders.",
      cta: "Find Events",
      link: "#events",
      bgColor: "bg-gradient-to-r from-purple-600 to-indigo-600",
      textColor: "text-white"
    }
  };

  const ad = adContent[adType];

  const handleAdClick = () => {
    if (ad.link.startsWith('http')) {
      window.open(ad.link, '_blank', 'noopener,noreferrer');
    } else {
      // Handle internal links
      console.log('Navigate to:', ad.link);
    }
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setDismissed(true);
  };

  return (
    <div className="inline-ad relative">
      {/* Ad Label */}
      <div className="ad-label">
        Sponsored Content
      </div>

      {/* Dismiss Button */}
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/50"
        title="Dismiss ad"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Ad Content */}
      <div 
        className={`${ad.bgColor} ${ad.textColor} rounded-lg p-6 cursor-pointer transition-transform hover:scale-105 hover:shadow-lg`}
        onClick={handleAdClick}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Ad Icon/Image Placeholder */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
              {adType === 'donation' && '🇺🇸'}
              {adType === 'subscription' && '⭐'}
              {adType === 'merchandise' && '🛍️'}
              {adType === 'book' && '📚'}
              {adType === 'event' && '🎪'}
            </div>
          </div>

          {/* Ad Text Content */}
          <div className="flex-grow text-center sm:text-left">
            <h3 className="text-lg font-bold mb-1">
              {ad.title}
            </h3>
            <p className="text-sm opacity-90 mb-2">
              {ad.subtitle}
            </p>
            <p className="text-sm opacity-80 leading-relaxed">
              {ad.description}
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex-shrink-0">
            <div className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-md font-semibold transition-colors">
              {ad.cta}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-center gap-4 text-xs opacity-75">
          <span className="flex items-center gap-1">
            🔒 Secure
          </span>
          <span className="flex items-center gap-1">
            🇺🇸 American-Owned
          </span>
          <span className="flex items-center gap-1">
            ✓ Trusted by Patriots
          </span>
        </div>
      </div>

      {/* Alternative: Minimal Ad Format */}
      {Math.random() > 0.5 && (
        <div className="mt-4 p-4 bg-muted/30 rounded-md text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Support independent conservative journalism
          </p>
          <div className="flex justify-center gap-2">
            <button 
              onClick={() => window.open('https://www.heritage.org/donate', '_blank')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Donate
            </button>
            <button 
              onClick={() => console.log('Subscribe clicked')}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md text-sm font-medium hover:bg-destructive/90 transition-colors"
            >
              Subscribe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Banner Ad Component for header/footer
export const BannerAd = ({ position = 'top' }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="container flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">
            🚨 Breaking: Conservative Victory in Key Battleground State
          </span>
          <a
            href="#"
            className="text-sm underline hover:no-underline"
          >
            Read More →
          </a>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Sidebar Ad Component
export const SidebarAd = () => {
  return (
    <div className="sidebar-card bg-gradient-to-br from-primary/5 to-destructive/5 border-primary/20">
      <div className="text-center">
        <div className="text-3xl mb-3">🇺🇸</div>
        <h3 className="font-bold text-foreground mb-2">
          Defend Our Constitution
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Support organizations fighting for your rights and freedoms every day.
        </p>
        <button 
          onClick={() => window.open('https://www.heritage.org/donate', '_blank')}
          className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium"
        >
          Make a Difference
        </button>
      </div>
    </div>
  );
};

export default InlineAd;
