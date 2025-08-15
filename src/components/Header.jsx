// src/components/Header.jsx - Enhanced with Atlantic Anvil Categories
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header({ 
  onSubscribe, 
  onDonate, 
  onMerch, 
  categories = ['TRUMP', 'REPUBLICAN PARTY', 'EUROPE', 'ELON MUSK', 'STEVE BANNON'],
  activeCategory = 'TRUMP',
  onCategoryChange 
}) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const linkClass = ({ isActive }) =>
    `aa-link px-3 py-2 rounded transition-all duration-200 ${isActive ? 'text-white underline underline-offset-4 bg-white/10' : 'hover:bg-white/5'}`;

  const categoryClass = (category) =>
    `aa-category-btn px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
      activeCategory === category 
        ? 'bg-aa-gold text-aa-navy font-semibold' 
        : 'text-slate-200 hover:text-white hover:bg-white/10'
    }`;

  const handleCategoryClick = (category) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
    setOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="aa-header sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-aa-gold transition-colors"
              aria-label="Toggle navigation"
              onClick={() => setOpen(v => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18"/>
              </svg>
            </button>
            
            <Link to="/" className="flex items-center gap-2 group" aria-label="Atlantic Anvil home">
              <span 
                className="inline-flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 group-hover:scale-105"
                style={{background:'var(--aa-gold)', color:'#1a1a1a', fontWeight:800}}
              >
                AA
              </span>
              <span className="text-slate-100 font-bold text-lg tracking-tight">
                Atlantic Anvil
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/latest" className={linkClass}>Latest</NavLink>
            <NavLink to="/trending" className={linkClass}>Trending</NavLink>
            <NavLink to="/categories" className={linkClass}>Categories</NavLink>
          </nav>

          {/* Search & Actions */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="search"
                inputMode="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="aa-search h-9 w-64 rounded-md px-3 pr-10 text-sm placeholder:italic focus:ring-2 focus:ring-aa-gold focus:border-transparent"
                placeholder="Search conservative news..."
                aria-label="Search"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                aria-label="Submit search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>

            <button 
              onClick={onSubscribe}
              className="aa-btn h-9 inline-flex items-center rounded-md px-4 text-sm font-medium"
            >
              Subscribe
            </button>

            <button 
              onClick={onDonate}
              className="hidden xl:inline-flex items-center h-9 px-3 rounded-md text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              💝 Donate
            </button>
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="hidden md:flex items-center justify-center py-3 border-t border-white/10">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={categoryClass(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-white/10 pb-4">
            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-1 pt-3 mb-4" aria-label="Mobile">
              <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
                Home
              </NavLink>
              <NavLink to="/latest" className={linkClass} onClick={() => setOpen(false)}>
                Latest
              </NavLink>
              <NavLink to="/trending" className={linkClass} onClick={() => setOpen(false)}>
                Trending
              </NavLink>
              <NavLink to="/categories" className={linkClass} onClick={() => setOpen(false)}>
                Categories
              </NavLink>
            </nav>

            {/* Mobile Categories */}
            <div className="mb-4">
              <h3 className="text-slate-300 text-sm font-medium mb-2 px-3">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`${categoryClass(category)} text-xs`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Search & Actions */}
            <div className="space-y-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="aa-search h-10 w-full rounded-md px-3 pr-10 text-sm"
                  placeholder="Search news..."
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>

              <div className="flex gap-2">
                <button 
                  onClick={onSubscribe}
                  className="aa-btn flex-1 h-10 inline-flex items-center justify-center rounded-md text-sm font-medium"
                >
                  Subscribe
                </button>
                <button 
                  onClick={onDonate}
                  className="flex-1 h-10 inline-flex items-center justify-center rounded-md text-sm font-medium text-slate-200 border border-white/20 hover:bg-white/10 transition-all duration-200"
                >
                  💝 Donate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
