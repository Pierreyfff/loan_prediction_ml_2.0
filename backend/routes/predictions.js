const express = require('express')
const router = express.Router()
const PredictionModel = require('../models/Prediction')
const { getDatabaseStats } = require('../config/database')

// Middleware para capturar IP y User-Agent
const captureMetadata = (req, res, next) => {
  req.metadata = {
    ipAddress: req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'],
    userAgent: req.headers['user-agent'],
    userLogin: req.headers['x-user-login'] || 'Pierreyfff' // Usuario por defecto
  }
  next()
}

// POST /api/predictions/individual - Guardar predicción individual
router.post('/individual', captureMetadata, async (req, res) => {
  try {
    const { formData, result } = req.body
    
    // Validar datos requeridos
    if (!formData || !result) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos requeridos: formData y result'
      })
    }
    
    const predictionData = {
      formData,
      result,
      userLogin: req.metadata.userLogin,
      ipAddress: req.metadata.ipAddress,
      userAgent: req.metadata.userAgent
    }
    
    const savedPrediction = await PredictionModel.saveIndividualPrediction(predictionData)
    
    res.status(201).json({
      success: true,
      message: 'Predicción individual guardada exitosamente en PostgreSQL (Neon)',
      data: {
        predictionId: savedPrediction.prediction_id,
        id: savedPrediction.id,
        timestamp: savedPrediction.created_at,
        user: req.metadata.userLogin
      }
    })
    
  } catch (error) {
    console.error('Error en /individual:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// POST /api/predictions/batch - Guardar predicción por lotes
router.post('/batch', captureMetadata, async (req, res) => {
  try {
    const { filename, fileSize, results, items } = req.body
    
    if (!filename || !results) {
      return res.status(400).json({
        success: false,
        message: 'Faltan datos requeridos: filename y results'
      })
    }
    
    const batchData = {
      filename,
      fileSize: fileSize || 0,
      results,
      items: items || [],
      userLogin: req.metadata.userLogin,
      ipAddress: req.metadata.ipAddress,
      userAgent: req.metadata.userAgent
    }
    
    const savedBatch = await PredictionModel.saveBatchPrediction(batchData)
    
    res.status(201).json({
      success: true,
      message: 'Predicción por lotes guardada exitosamente en PostgreSQL (Neon)',
      data: {
        batchId: savedBatch.batch_id,
        id: savedBatch.id,
        timestamp: savedBatch.created_at,
        user: req.metadata.userLogin
      }
    })
    
  } catch (error) {
    console.error('Error en /batch:', error)
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// GET /api/predictions/stats - Obtener estadísticas
router.get('/stats', async (req, res) => {
  try {
    const stats = await PredictionModel.getStats()
    const dbStats = await getDatabaseStats()
    
    res.json({
      success: true,
      data: {
        database: dbStats,
        predictions: stats,
        user: 'Pierreyfff',
        timestamp: new Date().toISOString()
      }
    })
    
  } catch (error) {
    console.error('Error en /stats:', error)
    res.status(500).json({
      success: false,
      message: 'Error obteniendo estadísticas',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// GET /api/predictions/health - Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'LoanPredict Pro API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    user: 'Pierreyfff',
    database: 'PostgreSQL (Neon)',
    version: '1.0.0'
  })
})

module.exports = router