import { useState, useEffect } from 'react';

const SubscriptionModal = ({ onClose }) => {
  const [selectedTier, setSelectedTier] = useState('premium');
  const [isProcessing, setIsProcessing] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const subscriptionTiers = [
    {
      id: 'basic',
      name: 'Patriot',
      price: '$9.99',
      period: '/month',
      description: 'Essential conservative news',
      features: [
        'Ad-free browsing experience',
        'Daily newsletter with top stories',
        'Basic article summaries',
        'Mobile app access',
        'Community discussion access'
      ],
      buttonText: 'Start Free Trial',
      popular: false
    },
    {
      id: 'premium',
      name: 'Defender',
      price: '$19.99',
      period: '/month',
      description: 'Complete conservative coverage',
      features: [
        'Everything in Patriot',
        'AI-powered article summaries',
        'Exclusive investigative reports',
        'Bias analysis for all sources',
        'Breaking news alerts',
        'Archive access (5+ years)',
        'Premium podcast episodes'
      ],
      buttonText: 'Subscribe Now',
      popular: true
    },
    {
      id: 'elite',
      name: 'Guardian',
      price: '$39.99',
      period: '/month',
      description: 'Ultimate conservative insight',
      features: [
        'Everything in Defender',
        'Direct access to journalists',
        'Exclusive events & webinars',
        'Early article access (24h)',
        'Custom news categories',
        'Personal news briefings',
        'VIP community forum',
        'Monthly strategy calls'
      ],
      buttonText: 'Go Elite',
      popular: false
    }
  ];

  const handleSubscribe = async (tier) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would integrate with Stripe, PayPal, etc.
      console.log(`Subscribing to ${tier.name} plan`);
      
      // Show success message
      alert(`Successfully subscribed to ${tier.name} plan! Welcome to the conservative community.`);
      onClose();
    } catch (error) {
      console.error('Subscription error:', error);
      alert('There was an error processing your subscription. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="subscription-modal"
      onClick={handleOverlayClick}
    >
      <div className="subscription-content">
        {/* Header */}
        <div className="subscription-header">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-muted/50"
            disabled={isProcessing}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-4xl mb-4">🇺🇸</div>
          <h2 className="subscription-title">
            Join the Conservative Movement
          </h2>
          <p className="subscription-subtitle">
            Get premium access to unbiased conservative news, in-depth analysis, and exclusive content
          </p>
        </div>

        {/* Subscription Tiers */}
        <div className="subscription-tiers">
          {subscriptionTiers.map((tier) => (
            <div
              key={tier.id}
              className={`subscription-tier ${tier.popular ? 'recommended' : ''} ${
                selectedTier === tier.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedTier(tier.id)}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="tier-name">{tier.name}</div>
              <div className="tier-price">
                {tier.price}
                <span className="tier-period">{tier.period}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{tier.description}</p>

              <ul className="tier-features">
                {tier.features.map((feature, index) => (
                  <li key={index} className="tier-feature flex items-start gap-2">
                    <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`tier-button ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleSubscribe(tier)}
                disabled={isProcessing}
              >
                {isProcessing && selectedTier === tier.id ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  tier.buttonText
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-8 p-6 bg-muted/30 rounded-lg">
          <h3 className="text-lg font-semibold text-center mb-4">Why Subscribe?</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-primary">📰</span>
              <div>
                <strong>Unbiased Reporting:</strong> Get news from multiple conservative sources with bias analysis
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">🤖</span>
              <div>
                <strong>AI Summaries:</strong> Save time with intelligent article summaries and key points
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">🚨</span>
              <div>
                <strong>Breaking Alerts:</strong> Be first to know about important conservative news
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-primary">🎯</span>
              <div>
                <strong>Blindspot Reports:</strong> Discover stories mainstream media won't cover
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2 mb-2">
            <span className="text-primary">🛡️</span>
            30-day money-back guarantee
          </p>
          <p>Cancel anytime. No questions asked.</p>
        </div>

        {/* Social Proof */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-2">
            <span className="flex items-center gap-1">
              ⭐⭐⭐⭐⭐ 4.9/5
            </span>
            <span>•</span>
            <span>10,000+ satisfied patriots</span>
            <span>•</span>
            <span>Trusted since 2024</span>
          </div>
          <p className="text-xs text-muted-foreground">
            "Finally, a news source that shares my values!" - Sarah M., Texas
          </p>
        </div>

        {/* Payment Security */}
        <div className="mt-6 pt-6 border-t border-border text-center">
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              🔒 SSL Secure
            </span>
            <span className="flex items-center gap-1">
              💳 All Cards Accepted
            </span>
            <span className="flex items-center gap-1">
              🇺🇸 American Company
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
