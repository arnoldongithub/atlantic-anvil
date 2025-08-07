import { useState } from 'react';

const Header = ({ 
  onSubscribe, 
  onDonate, 
  onMerch, 
  categories, 
  activeCategory, 
  onCategoryChange 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDonate = () => {
    // GiveSendGo and worldwide donation platforms
    window.open('https://www.givesendgo.com', '_blank');
  };

  const handleShop = () => {
    // Placeholder for merchandise store
    window.open('#shop', '_blank');
  };

  const handleSubscribe = () => {
    if (onSubscribe) onSubscribe();
  };

  return (
    <header className="header-section">
      <div className="header-content">
        {/* Logo */}
        <div className="logo-container">
          <a href="/" className="logo-text">
            🦅 Atlantic Anvil
          </a>
        </div>

        {/* Desktop Action Buttons - Top Right */}
        <div className="header-actions desktop-actions">
          <button
            onClick={handleSubscribe}
            className="subscribe-button-header"
            title="Subscribe to Premium Features"
          >
            ⭐ Subscribe
          </button>
          
          <button
            onClick={handleShop}
            className="shop-button-header"
            title="Shop Atlantic Anvil Merchandise"
          >
            🛍️ Shop
          </button>
          
          <button
            onClick={handleDonate}
            className="donate-button-header"
            title="Support Conservative Causes"
          >
            💝 Donate
          </button>

          {/* Mobile menu button */}
          <button
            className="mobile-menu-toggle md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Action Buttons - Below Logo, Above Categories */}
      <div className="mobile-actions-section md:hidden">
        <div className="mobile-actions-container">
          <button
            onClick={handleSubscribe}
            className="subscribe-button-mobile"
          >
            ⭐ Subscribe
          </button>
          
          <button
            onClick={handleShop}
            className="shop-button-mobile"
          >
            🛍️ Shop
          </button>
          
          <button
            onClick={handleDonate}
            className="donate-button-mobile"
          >
            💝 Donate
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay md:hidden">
          <div className="container py-4 space-y-2">
            <h3 className="text-white font-semibold mb-3">Navigation</h3>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                  activeCategory === category
                    ? 'bg-destructive text-destructive-foreground'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {category.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
