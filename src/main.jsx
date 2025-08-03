import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Piece from './Piece.jsx'
import Board from './Board.jsx'
import { ThemeProvider } from './context/ThemeProvider'
import React from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ThemeProvider>
    <Board />
    </ThemeProvider>
  </StrictMode>,
)

