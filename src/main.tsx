

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CVDataProvider } from './context/useCVData.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <CVDataProvider>
      <App />
    </CVDataProvider>
  </StrictMode>,
)
