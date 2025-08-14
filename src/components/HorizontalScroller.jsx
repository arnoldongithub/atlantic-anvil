import { useRef } from 'react'

export default function HorizontalScroller({ title, children }) {
  const ref = useRef(null)
  const nudge = dir => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(480, el.clientWidth * 0.9), behavior:'smooth' })
  }
  return (
    <section className="my-6">
      {title && <h2 className="text-lg font-semibold text-[var(--aa-ink)] mb-2">{title}</h2>}
      <div className="relative">
        <div ref={ref} className="no-scrollbar overflow-x-auto">
          <div className="flex gap-4 py-2 pr-2">{children}</div>
        </div>
        <button
          aria-label="Scroll left"
          onClick={()=>nudge(-1)}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-[var(--aa-surface)] p-2 border border-[var(--aa-border)]"
        >‹</button>
        <button
          aria-label="Scroll right"
          onClick={()=>nudge(1)}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-[var(--aa-surface)] p-2 border border-[var(--aa-border)]"
        >›</button>
      </div>
    </section>
  )
}

