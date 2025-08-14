const svgPlaceholder = (w=640, h=360, label='Atlantic Anvil') =>
  `data:image/svg+xml;utf8,` +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>
      <rect width='100%' height='100%' fill='#1a365d'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
        font-family='system-ui,Segoe UI,Roboto' font-size='18' fill='#ffffff' opacity='0.85'>${label}</text>
    </svg>`
  )

export const getPlaceholderImage = (w, h, text='Atlantic Anvil') => svgPlaceholder(w,h,text)

export function resolveImage(urls=[], { w=640, h=360, text='Atlantic Anvil' }={}) {
  const list = (Array.isArray(urls) ? urls : [urls]).filter(Boolean)
  return list.length ? list[0] : svgPlaceholder(w,h,text)
}

