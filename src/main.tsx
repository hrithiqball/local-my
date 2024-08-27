import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'

import '@/index.css'
import AppRoutes from '@/routes/AppRoutes.tsx'
import { Providers } from './provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors />
    <Providers>
      <AppRoutes />
    </Providers>
  </StrictMode>
)
