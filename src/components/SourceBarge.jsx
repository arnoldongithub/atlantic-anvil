export default function SourceBadge({ source }) {
  if (!source) return null
  return (
    <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs"
          style={{background:'rgba(214,158,46,0.15)', color:'var(--aa-ink)', border:'1px solid rgba(214,158,46,0.35)'}}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="10" opacity="0.25"/><circle cx="12" cy="12" r="3"/>
      </svg>
      Source: {source}
    </span>
  )
}

