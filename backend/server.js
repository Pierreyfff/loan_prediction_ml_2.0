const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { initializeDatabase } = require('./config/database')
const predictionsRoutes = require('./routes/predictions')

const app = express()
const PORT = process.env.PORT || 5000

// Configuración CORS mejorada para múltiples orígenes
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
]

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps, Postman)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('localhost')) {
      callback(null, true)
    } else {
      console.log('❌ CORS bloqueado para origin:', origin)
      callback(new Error('No permitido por CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-User-Login', 'X-Request-Source', 'X-Timestamp']
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Trust proxy para obtener IP real
app.set('trust proxy', true)

// Logging middleware mejorado
app.use((req, res, next) => {
  const timestamp = new Date().toISOString()
  const origin = req.headers.origin || 'no-origin'
  console.log(`${timestamp} - ${req.method} ${req.path} [Origin: ${origin}]`)
  next()
})

// Routes
app.use('/api/predictions', predictionsRoutes)

// Ruta raíz con información detallada
app.get('/', (req, res) => {
  res.json({
    message: 'LoanPredict Pro Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    user: 'Pierreyfff',
    database: 'PostgreSQL (Neon)',
    cors: {
      allowedOrigins,
      currentOrigin: req.headers.origin || 'direct-access'
    },
    endpoints: {
      health: '/api/predictions/health',
      individual: 'POST /api/predictions/individual',
      batch: 'POST /api/predictions/batch',
      stats: 'GET /api/predictions/stats'
    }
  })
})

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error no manejado:', error)
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    availableEndpoints: [
      'GET /',
      'GET /api/predictions/health',
      'POST /api/predictions/individual',
      'POST /api/predictions/batch',
      'GET /api/predictions/stats'
    ]
  })
})

// Inicializar servidor
const startServer = async () => {
  try {
    console.log('🚀 Iniciando LoanPredict Pro Backend...')
    
    // Inicializar base de datos
    await initializeDatabase()
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`
🚀 LoanPredict Pro Backend ACTIVO
==============================
✅ Servidor ejecutándose en puerto ${PORT}
✅ Base de datos PostgreSQL (Neon) conectada
✅ CORS configurado para orígenes:
   ${allowedOrigins.map(origin => `   - ${origin}`).join('\n')}
✅ API endpoints disponibles:
   - GET  http://localhost:${PORT}/
   - POST http://localhost:${PORT}/api/predictions/individual
   - POST http://localhost:${PORT}/api/predictions/batch  
   - GET  http://localhost:${PORT}/api/predictions/stats
   - GET  http://localhost:${PORT}/api/predictions/health
   
👤 Usuario: Pierreyfff
📊 Environment: ${process.env.NODE_ENV || 'development'}
⏰ Started at: ${new Date().toISOString()}
==============================
      `)
    })
    
  } catch (error) {
    console.error('❌ Error iniciando el servidor:', error)
    process.exit(1)
  }
}

// Manejo graceful de cierre
process.on('SIGINT', () => {
  console.log('\n🔄 Cerrando servidor gracefully...')
  process.exit(0)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
})

// Iniciar servidor
startServer()