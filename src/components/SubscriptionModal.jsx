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
      popular: false
    }
  ];

  const handleSubscribe = (tier) => {
    console.log(`Subscribing to ${tier.name}`);
    onClose();
  };

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: '0', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        backdropFilter: 'blur(4px)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '1rem', 
        zIndex: '50' 
      }}
    >
      <div 
        style={{ 
          backgroundColor: 'white', 
          borderRadius: '1rem', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
          maxWidth: '112rem', 
          width: '100%', 
          maxHeight: '90vh', 
          overflow: 'auto' 
        }}
      >
        {/* Header */}
        <div 
          style={{ 
            position: 'relative', 
            color: 'white', 
            padding: '2rem', 
            borderTopLeftRadius: '1rem', 
            borderTopRightRadius: '1rem',
            background: 'linear-gradient(135deg, var(--aa-navy), var(--aa-ink))'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>
                Choose Your Plan
              </h2>
              <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)' }}>
                Select the perfect level of conservative intelligence for you
              </p>
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
              <svg style={{ width: '1.5rem', height: '1.5rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Subscription Tiers */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {subscriptionTiers.map((tier, index) => (
              <div
                key={tier.name}
                style={{
                  position: 'relative',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  transition: 'all 0.3s ease',
                  border: '2px solid',
                  borderColor: tier.popular ? 'var(--aa-gold)' : 'var(--border-default)',
                  background: tier.popular 
                    ? 'linear-gradient(135deg, rgba(214,158,46,0.05), rgba(214,158,46,0.1))' 
                    : tier.current
                    ? 'var(--bg-subtle)'
                    : 'var(--bg-surface)',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {tier.popular && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '-1rem', 
                    left: '50%', 
                    transform: 'translateX(-50%)'
                  }}>
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
                  <div style={{ 
                    position: 'absolute', 
                    top: '-1rem', 
                    left: '50%', 
                    transform: 'translateX(-50%)'
                  }}>
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

                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {tier.name}
                  </h3>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                      {tier.price}
                    </span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                      {tier.period}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {tier.description}
                  </p>
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  {tier.features.slice(0, 8).map((feature, featureIndex) => (
                    <div key={featureIndex} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <div style={{ flexShrink: '0', marginTop: '0.125rem' }}>
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
                            <svg style={{ width: '0.75rem', height: '0.75rem', color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            <svg style={{ width: '0.75rem', height: '0.75rem', color: 'var(--text-muted)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        +{tier.features.length - 8} more features
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleSubscribe(tier)}
                  disabled={tier.current}
                  style={{
                    width: '100%',
                    padding: '1rem 1.5rem',
                    borderRadius: '0.75rem',
                    fontWeight: '600',
                    fontSize: '1rem',
                    border: 'none',
                    cursor: tier.current ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
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
                      : 'white'
                  }}
                  onMouseOver={(e) => {
                    if (!tier.current) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!tier.current) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {tier.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Trust indicators */}
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
              🇺🇸 Trusted by over 50,000 patriots nationwide 🇺🇸
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cancel Anytime</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Payment</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>30-Day Guarantee</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', color: '#22c55e' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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