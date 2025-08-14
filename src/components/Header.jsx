import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [open, setOpen] = useState(false)
  const linkClass = ({isActive}) =>
    `aa-link px-3 py-2 rounded ${isActive ? 'text-white underline underline-offset-4' : ''}`

  return (
    <header className="aa-header sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--aa-gold)]"
              aria-label="Toggle navigation"
              onClick={() => setOpen(v => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18"/>
              </svg>
            </button>

            <Link to="/" className="flex items-center gap-2" aria-label="Atlantic Anvil home">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-sm"
                    style={{background:'var(--aa-gold)', color:'#1a1a1a', fontWeight:700}}>AA</span>
              <span className="text-slate-100 font-semibold">Atlantic Anvil</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/latest" className={linkClass}>Latest</NavLink>
            <NavLink to="/trending" className={linkClass}>Trending</NavLink>
            <NavLink to="/categories" className={linkClass}>Categories</NavLink>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <input
              type="search"
              inputMode="search"
              className="aa-search h-9 w-52 rounded px-3 text-sm placeholder:italic"
              placeholder="Search good news…"
              aria-label="Search"
            />
            <Link to="/subscribe" className="aa-btn h-9 inline-flex items-center rounded px-3 text-sm font-medium">
              Subscribe
            </Link>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-3">
            <nav className="flex flex-col gap-1 pt-2" aria-label="Mobile">
              <NavLink to="/" className={linkClass} onClick={()=>setOpen(false)}>Home</NavLink>
              <NavLink to="/latest" className={linkClass} onClick={()=>setOpen(false)}>Latest</NavLink>
              <NavLink to="/trending" className={linkClass} onClick={()=>setOpen(false)}>Trending</NavLink>
              <NavLink to="/categories" className={linkClass} onClick={()=>setOpen(false)}>Categories</NavLink>
              <div className="mt-2 flex items-center gap-2">
                <input type="search" className="aa-search h-9 flex-1 rounded px-3 text-sm" placeholder="Search…" />
                <Link to="/subscribe" className="aa-btn h-9 inline-flex items-center rounded px-3 text-sm font-medium">
                  Subscribe
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

