import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Configuración para mejorar rendimiento
console.log('🚀 LoanPredict Pro inicializando...')
console.log('📊 Modelo ML: Logistic Regression (85.87% precisión)')
console.log('🎯 Recall: 98.43% | F1-Score: 90.58%')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)