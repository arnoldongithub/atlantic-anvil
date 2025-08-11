const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Atlantic Anvil */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">About Atlantic Anvil</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="/team" className="text-gray-300 hover:text-white transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="/methodology" className="text-gray-300 hover:text-white transition-colors">
                  Methodology
                </a>
              </li>
              <li>
                <a href="/careers" className="text-gray-300 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.heritage.org/donate" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Donate to Heritage Foundation
                </a>
              </li>
              <li>
                <a 
                  href="https://www.judicialwatch.org/donate/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Support Judicial Watch
                </a>
              </li>
              <li>
                <a 
                  href="https://www.freedomworks.org/donate" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Donate to FreedomWorks
                </a>
              </li>
              <li>
                <a href="/subscription" className="text-gray-300 hover:text-white transition-colors">
                  Premium Subscription
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/bias-chart" className="text-gray-300 hover:text-white transition-colors">
                  Media Bias Chart
                </a>
              </li>
              <li>
                <a href="/fact-check" className="text-gray-300 hover:text-white transition-colors">
                  Fact Checking
                </a>
              </li>
              <li>
                <a href="/blindspots" className="text-gray-300 hover:text-white transition-colors">
                  Media Blindspots
                </a>
              </li>
              <li>
                <a href="/api" className="text-gray-300 hover:text-white transition-colors">
                  API Access
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookie-policy" className="text-gray-300 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Newsletter */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  title="Follow us on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </a>
                
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  title="Follow us on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>

                <a
                  href="https://t.me/atlanticanvil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  title="Join our Telegram channel"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>

                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                  title="Subscribe to our YouTube channel"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  YouTube
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">Stay Informed</h4>
              <p className="text-gray-300 text-sm mb-4">
                Get breaking conservative news delivered to your inbox daily
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              <span>© {currentYear} Atlantic Anvil. All rights reserved.</span>
              <span>•</span>
              <span>Defending Conservative Values Since 2024</span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-2">
                🇺🇸 Proudly American
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                ⚡ Powered by Truth
              </span>
            </div>
          </div>
          
          <div className="text-center text-xs text-gray-400">
            <p>
              This website aggregates news from various conservative sources. 
              We are committed to providing balanced reporting while maintaining our conservative perspective. 
              All external links are provided for informational purposes and do not constitute endorsement.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
