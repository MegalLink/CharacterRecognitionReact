import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { GamePage } from './pages/GamePage'
import CssBaseline from '@mui/material/CssBaseline'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path={'game/vocals'} element={<GamePage />} />
        <Route path={'game/numbers'} element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
