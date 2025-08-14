import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-[var(--aa-navy)] text-slate-200 mt-16 border-t border-[var(--aa-border)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm"
                    style={{background:'var(--aa-gold)', color:'#1a1a1a', fontWeight:700}}>AA</span>
              <span className="font-semibold">Atlantic Anvil</span>
            </div>
            <p className="text-sm text-slate-300/80">
              Good news that actually matters. Curated. Calm. Consistent.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/latest" className="aa-link">Latest</Link></li>
              <li><Link to="/trending" className="aa-link">Trending</Link></li>
              <li><Link to="/categories" className="aa-link">Categories</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="aa-link">About</Link></li>
              <li><Link to="/contact" className="aa-link">Contact</Link></li>
              <li><Link to="/privacy" className="aa-link">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-[var(--aa-border)] text-xs text-slate-400">
          © {new Date().getFullYear()} Atlantic Anvil. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

