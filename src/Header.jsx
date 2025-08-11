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
    window.open('https://www.givesendgo.com', '_blank');
  };

  const handleShop = () => {
    window.open('#shop', '_blank');
  };

  const handleSubscribe = () => {
    if (onSubscribe) onSubscribe();
  };

  return (
    <header className="aa-header">
      {/* Main Header Bar */}
      <div className="aa-header-inner">
        {/* Logo Section */}
        <div className="aa-logo">
          <a href="/" className="flex items-center gap-3">
            <img 
              src="/atlantic-anvil-logo.png" 
              alt="Atlantic Anvil" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-white font-bold text-xl hidden sm:block">
              Atlantic Anvil
            </span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="aa-cta-row">
          <button
            onClick={handleSubscribe}
            className="aa-btn aa-btn-subscribe"
            title="Subscribe to Premium Features"
          >
            Subscribe
          </button>
          
          <button
            onClick={handleDonate}
            className="aa-btn aa-btn-donate"
            title="Support Conservative Causes"
          >
            Donate
          </button>
          
          <button
            onClick={handleShop}
            className="aa-btn aa-btn-shop"
            title="Shop Atlantic Anvil Merchandise"
          >
            Shop
          </button>

          {/* Mobile menu button */}
          <button
            className="aa-btn aa-btn-shop md:hidden ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-5 h-5"
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

      {/* Unit Space */}
      <div className="aa-unit-space"></div>

      {/* Categories Section */}
      <div className="aa-cats-wrap">
        <div className="aa-cats-scroll">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`aa-cat-pill ${
                activeCategory === category ? 'is-active' : ''
              }`}
              aria-pressed={activeCategory === category}
            >
              {category.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="bg-slate-800 w-64 h-full shadow-lg">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-semibold">Navigation</h3>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-md transition-colors ${
                      activeCategory === category
                        ? 'bg-red-600 text-white'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    {category.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-600 space-y-3">
                <button
                  onClick={() => {
                    handleSubscribe();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-yellow-400 hover:bg-white/10 rounded-md transition-colors"
                >
                  Subscribe
                </button>
                <button
                  onClick={() => {
                    handleDonate();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-red-400 hover:bg-white/10 rounded-md transition-colors"
                >
                  Donate
                </button>
                <button
                  onClick={() => {
                    handleShop();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-md transition-colors"
                >
                  Shop
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
