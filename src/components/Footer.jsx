import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', marginTop: '5rem' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div style={{ padding: '4rem 0' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 atlantic-mb-6">
                <div style={{ 
                  width: '2.5rem', 
                  height: '2.5rem', 
                  background: 'linear-gradient(135deg, var(--aa-navy), var(--aa-crimson))', 
                  borderRadius: '0.75rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '1.125rem' }}>AA</span>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>Atlantic Anvil</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Conservative Intelligence Daily</p>
                </div>
              </div>
              <p style={{ 
                color: 'var(--text-secondary)', 
                lineHeight: '1.6', 
                marginBottom: '1.5rem', 
                maxWidth: '28rem' 
              }}>
                Delivering the most important conservative news and intelligence to patriots who value truth, 
                freedom, and American excellence. Stay informed with curated content that matters.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                {[
                  { 
                    label: 'Twitter', 
                    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' 
                  },
                  { 
                    label: 'Facebook', 
                    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' 
                  },
                  { 
                    label: 'YouTube', 
                    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' 
                  },
                  { 
                    label: 'Telegram', 
                    path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' 
                  }
                ].map((social) => (
                  <a 
                    key={social.label}
                    href="#" 
                    style={{ 
                      width: '2.5rem', 
                      height: '2.5rem', 
                      background: 'var(--bg-subtle)', 
                      borderRadius: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: 'var(--text-secondary)',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'var(--aa-navy)';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'var(--bg-subtle)';
                      e.target.style.color = 'var(--text-secondary)';
                    }}
                    aria-label={social.label}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path}/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Explore</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/latest" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                    Latest News
                  </Link>
                </li>
                <li>
                  <Link to="/trending" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                    Trending Stories
                  </Link>
                </li>
                <li>
                  <Link to="/daily-reads" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                    Daily Reads
                  </Link>
                </li>
                <li>
                  <Link to="/blindspot" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                    Media Blindspot
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources & Company */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Resources</h4>
              <ul className="space-y-4">
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/subscription" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                    Subscription Plans
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                    Contact Support
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-100 py-8">
          <div className="max-w-2xl">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Stay Informed</h4>
            <p className="text-gray-600 mb-4">
              Get the latest conservative intelligence delivered straight to your inbox. No spam, just the news that matters.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-100 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>© {new Date().getFullYear()} Atlantic Anvil. All rights reserved.</span>
              <span className="hidden md:inline">🇺🇸</span>
              <span className="hidden md:inline">Made in America</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-gray-900 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-gray-900 transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-gray-500 hover:text-gray-900 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
