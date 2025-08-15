import React from 'react';

const SubscriptionModal = ({ onClose }) => {
  const subscriptionTiers = [
    {
      name: 'The Forge Feed',
      price: 'FREE',
      period: '',
      description: 'Daily Conservative News Aggregator',
      features: [
        { name: 'Daily Conservative News Aggregator', included: true },
        { name: '1x Patriot PDF/month', included: true },
        { name: 'Leaderboard Teaser (Top 3 only)', included: true },
        { name: "Trump's Daily Briefing", included: false },
        { name: 'Full Woke Watchlist', included: false },
        { name: 'Full Anvil Leaderboard (Top 10)', included: false },
        { name: 'Extra PDFs (2/month)', included: false },
        { name: 'Media Blindspot Tracker (MSNBC/CNN/BBC)', included: false },
        { name: 'The Black Vault Briefing', included: false },
        { name: 'Private Email Drop', included: false },
        { name: 'Exclusive PDF Vault Access', included: false },
        { name: 'Direct Q&A Inbox', included: false },
        { name: 'Monthly Strategy Call / AMA', included: false },
        { name: 'Exclusive Merch Discounts + Early Access', included: false },
        { name: 'Name in Supporter Wall (Anvil Ledger)', included: false }
      ],
      buttonText: 'Current Plan',
      buttonStyle: 'bg-gray-100 text-gray-600 cursor-not-allowed',
      popular: false,
      current: true
    },
    {
      name: 'Patriot Tier',
      price: '$5',
      period: '/mo',
      description: 'Essential Conservative Intelligence',
      features: [
        { name: 'Daily Conservative News Aggregator', included: true },
        { name: '1x Patriot PDF/month', included: true },
        { name: 'Leaderboard Teaser (Top 3 only)', included: true },
        { name: "Trump's Daily Briefing", included: true },
        { name: 'Full Woke Watchlist', included: true },
        { name: 'Full Anvil Leaderboard (Top 10)', included: true },
        { name: 'Extra PDFs (2/month)', included: true },
        { name: 'Media Blindspot Tracker (MSNBC/CNN/BBC)', included: false },
        { name: 'The Black Vault Briefing', included: false },
        { name: 'Private Email Drop', included: false },
        { name: 'Exclusive PDF Vault Access', included: false },
        { name: 'Direct Q&A Inbox', included: false },
        { name: 'Monthly Strategy Call / AMA', included: false },
        { name: 'Exclusive Merch Discounts + Early Access', included: false },
        { name: 'Name in Supporter Wall (Anvil Ledger)', included: false }
      ],
      buttonText: 'Choose Patriot',
      buttonStyle: 'bg-blue-600 hover:bg-blue-700 text-white',
      popular: false
    },
    {
      name: 'The Forge Tier',
      price: '$12',
      period: '/mo',
      description: 'Advanced Conservative Strategy',
      features: [
        { name: 'Daily Conservative News Aggregator', included: true },
        { name: '1x Patriot PDF/month', included: true },
        { name: 'Leaderboard Teaser (Top 3 only)', included: true },
        { name: "Trump's Daily Briefing", included: true },
        { name: 'Full Woke Watchlist', included: true },
        { name: 'Full Anvil Leaderboard (Top 10)', included: true },
        { name: 'Extra PDFs (2/month)', included: true },
        { name: 'Media Blindspot Tracker (MSNBC/CNN/BBC)', included: true },
        { name: 'The Black Vault Briefing', included: true },
        { name: 'Private Email Drop', included: true },
        { name: 'Exclusive PDF Vault Access', included: true },
        { name: 'Direct Q&A Inbox', included: false },
        { name: 'Monthly Strategy Call / AMA', included: false },
        { name: 'Exclusive Merch Discounts + Early Access', included: false },
        { name: 'Name in Supporter Wall (Anvil Ledger)', included: false }
      ],
      buttonText: 'Choose Forge',
      buttonStyle: 'bg-orange-600 hover:bg-orange-700 text-white',
      popular: true
    },
    {
      name: 'Anvil Elite',
      price: '$25',
      period: '/mo',
      description: 'Premium Conservative Leadership',
      features: [
        { name: 'Daily Conservative News Aggregator', included: true },
        { name: '1x Patriot PDF/month', included: true },
        { name: 'Leaderboard Teaser (Top 3 only)', included: true },
        { name: "Trump's Daily Briefing", included: true },
        { name: 'Full Woke Watchlist', included: true },
        { name: 'Full Anvil Leaderboard (Top 10)', included: true },
        { name: 'Extra PDFs (2/month)', included: true },
        { name: 'Media Blindspot Tracker (MSNBC/CNN/BBC)', included: true },
        { name: 'The Black Vault Briefing', included: true },
        { name: 'Private Email Drop', included: true },
        { name: 'Exclusive PDF Vault Access', included: true },
        { name: 'Direct Q&A Inbox', included: true },
        { name: 'Monthly Strategy Call / AMA', included: true },
        { name: 'Exclusive Merch Discounts + Early Access', included: true },
        { name: 'Name in Supporter Wall (Anvil Ledger)', included: true }
      ],
      buttonText: 'Choose Elite',
      buttonStyle: 'bg-red-600 hover:bg-red-700 text-white',
      popular: false
    }
  ];

  const handleSubscribe = (tier) => {
    console.log(`Subscribing to ${tier.name}`);
    // Here you would integrate with your payment processor
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative text-white p-8 rounded-t-2xl" style={{ background: 'linear-gradient(135deg, var(--aa-navy), var(--aa-ink))' }}>
          <div className="flex justify-between items-center">
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>Choose Your Plan</h2>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)' }}>Select the perfect level of conservative intelligence for you</p>
            </div>
            <button
              onClick={onClose}
              style={{ 
                padding: '0.5rem', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '50%', 
                border: 'none', 
                color: 'white', 
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.2)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-32 translate-x-32" style={{ background: 'radial-gradient(circle, rgba(214,158,46,0.1), transparent)' }}></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full translate-y-24 -translate-x-24" style={{ background: 'radial-gradient(circle, rgba(197,48,48,0.1), transparent)' }}></div>
        </div>

        {/* Subscription Tiers */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionTiers.map((tier, index) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-6 transition-all duration-300 hover:scale-105 ${
                  tier.popular 
                    ? 'border-2 shadow-lg' 
                    : tier.current
                    ? 'border-2'
                    : 'border-2 hover:shadow-lg'
                }`}
                style={{
                  background: tier.popular 
                    ? 'linear-gradient(135deg, rgba(214,158,46,0.05), rgba(214,158,46,0.1))' 
                    : tier.current
                    ? 'var(--bg-subtle)'
                    : 'var(--bg-surface)',
                  borderColor: tier.popular 
                    ? 'var(--aa-gold)' 
                    : tier.current
                    ? 'var(--border-default)'
                    : 'var(--border-default)'
                }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span style={{ 
                      background: 'var(--aa-gold)', 
                      color: 'var(--aa-navy)', 
                      padding: '0.5rem 1rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.875rem', 
                      fontWeight: '700', 
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
                    }}>
                      🔥 Most Popular
                    </span>
                  </div>
                )}

                {tier.current && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span style={{ 
                      background: 'var(--text-secondary)', 
                      color: 'white', 
                      padding: '0.5rem 1rem', 
                      borderRadius: '9999px', 
                      fontSize: '0.875rem', 
                      fontWeight: '500' 
                    }}>
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="atlantic-text-center atlantic-mb-6">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{tier.name}</h3>
                  <div className="atlantic-mb-4">
                    <span style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>{tier.price}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>{tier.period}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{tier.description}</p>
                </div>-medium">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="mb-3">
                    <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                    <span className="text-gray-600 text-lg">{tier.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{tier.description}</p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  {tier.features.slice(0, 8).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3 atlantic-mb-2">
                      <div className="flex-shrink-0 mt-0.5">
                        {feature.included ? (
                          <div style={{ 
                            width: '1.25rem', 
                            height: '1.25rem', 
                            background: 'rgba(34, 197, 94, 0.1)', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <svg className="w-3 h-3" style={{ color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : (
                          <div style={{ 
                            width: '1.25rem', 
                            height: '1.25rem', 
                            background: 'var(--bg-subtle)', 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center' 
                          }}>
                            <svg className="w-3 h-3" style={{ color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <span style={{ 
                        fontSize: '0.875rem', 
                        lineHeight: '1.5', 
                        color: feature.included ? 'var(--text-primary)' : 'var(--text-muted)' 
                      }}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                  
                  {tier.features.length > 8 && (
                    <div className="atlantic-text-center" style={{ paddingTop: '0.5rem' }}>
                      <span className="atlantic-text-xs" style={{ color: 'var(--text-muted)' }}>
                        +{tier.features.length - 8} more features
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleSubscribe(tier)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${tier.buttonStyle}`}
                  disabled={tier.current}
                  style={{
                    background: tier.current 
                      ? 'var(--bg-subtle)' 
                      : tier.name === 'Patriot Tier' 
                      ? 'var(--aa-navy)' 
                      : tier.name === 'The Forge Tier' 
                      ? 'var(--aa-gold)' 
                      : tier.name === 'Anvil Elite' 
                      ? 'var(--aa-crimson)' 
                      : 'var(--bg-subtle)',
                    color: tier.current 
                      ? 'var(--text-muted)' 
                      : tier.name === 'The Forge Tier' 
                      ? 'var(--aa-navy)' 
                      : 'white',
                    border: 'none',
                    cursor: tier.current ? 'not-allowed' : 'pointer'
                  }}
                >
                  {tier.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6 text-lg">
              🇺🇸 Trusted by over 50,000 patriots nationwide 🇺🇸
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-gray-500 flex-wrap">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;