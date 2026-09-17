import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const isRenaissanceRoute = (pathname) =>
  pathname === '/renaissance' || pathname.startsWith('/renaissance/')

async function bootstrap() {
  const renaissance = isRenaissanceRoute(window.location.pathname)

  if (!renaissance) {
    await import('./index.css')
  }

  const { default: App } = renaissance
    ? await import('./RenaissanceEntry.jsx')
    : await import('./App.jsx')

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

bootstrap().catch((error) => {
  console.error('Failed to bootstrap IIC frontend', error)
})
