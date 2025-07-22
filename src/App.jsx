import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import PredictLoan from './pages/PredictLoan'
import BatchPredict from './pages/BatchPredict'
import ModelAnalysis from './pages/ModelAnalysis'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/predict" element={<PredictLoan />} />
          <Route path="/batch" element={<BatchPredict />} />
          <Route path="/analysis" element={<ModelAnalysis />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App