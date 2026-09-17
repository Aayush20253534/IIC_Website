import { useEffect } from 'react'
import '../../RENAISSANCE-ECELL-2026/client/src/index.css'
import RenaissanceApp from '../../RENAISSANCE-ECELL-2026/client/src/App.jsx'

const RENAISSANCE_BODY_CLASSES = [
  'bg-[#050B14]',
  'text-[#F4EBD9]',
  'antialiased',
  'overflow-x-hidden',
  'selection:bg-[#D4AF37]/30',
  'selection:text-[#F4EBD9]',
]

export default function RenaissanceEntry() {
  useEffect(() => {
    const previousTitle = document.title
    const existingIcon = document.querySelector('link[rel~="icon"]')
    const previousIconHref = existingIcon?.getAttribute('href') ?? null
    const previousIconType = existingIcon?.getAttribute('type') ?? null
    let createdIcon = null

    document.title = "Renaissance'26 | 10th Edition • E-Cell MNNIT Allahabad"
    document.documentElement.classList.add('scroll-smooth')
    document.body.classList.add(...RENAISSANCE_BODY_CLASSES)

    if (existingIcon) {
      existingIcon.setAttribute('href', '/renaissance-logo.png')
      existingIcon.setAttribute('type', 'image/png')
    } else {
      createdIcon = document.createElement('link')
      createdIcon.rel = 'icon'
      createdIcon.type = 'image/png'
      createdIcon.href = '/renaissance-logo.png'
      document.head.appendChild(createdIcon)
    }

    return () => {
      document.title = previousTitle
      document.documentElement.classList.remove('scroll-smooth')
      document.body.classList.remove(...RENAISSANCE_BODY_CLASSES)

      if (createdIcon) {
        createdIcon.remove()
      } else if (existingIcon) {
        if (previousIconHref === null) {
          existingIcon.removeAttribute('href')
        } else {
          existingIcon.setAttribute('href', previousIconHref)
        }

        if (previousIconType === null) {
          existingIcon.removeAttribute('type')
        } else {
          existingIcon.setAttribute('type', previousIconType)
        }
      }
    }
  }, [])

  return <RenaissanceApp />
}
