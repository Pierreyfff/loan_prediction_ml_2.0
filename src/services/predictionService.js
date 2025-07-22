// Configuración del API - compatible con Vite y CRA
const API_BASE_URL = import.meta.env?.VITE_API_URL || process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
const USER_LOGIN = 'Pierreyfff'

console.log('🔗 API configurado en:', API_BASE_URL)

class PredictionService {
  
  // Configuración de headers común
  static getHeaders() {
    return {
      'Content-Type': 'application/json',
      'X-User-Login': USER_LOGIN,
      'X-Request-Source': 'LoanPredict-Frontend',
      'X-Timestamp': new Date().toISOString()
    }
  }

  // Health check mejorado con más información de debug
  static async checkHealth() {
    try {
      console.log('🏥 Verificando health check en:', `${API_BASE_URL}/predictions/health`)
      
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(`${API_BASE_URL}/predictions/health`, {
        headers: this.getHeaders(),
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()

      console.log('🟢 Backend health check exitoso:', {
        status: data.message,
        environment: data.environment,
        timestamp: data.timestamp,
        user: data.user,
        database: data.database
      })

      return { 
        success: true, 
        message: data.message,
        environment: data.environment,
        timestamp: data.timestamp,
        user: data.user,
        database: data.database
      }

    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('⏱️ Health check timeout - backend probablemente offline')
        return { 
          success: false, 
          error: 'Timeout - backend no responde',
          details: { type: 'timeout', url: `${API_BASE_URL}/predictions/health` }
        }
      }

      console.log('🔴 Backend health check falló:', {
        error: error.message,
        apiUrl: `${API_BASE_URL}/predictions/health`,
        timestamp: new Date().toISOString()
      })

      return { 
        success: false, 
        error: error.message,
        details: {
          type: 'connection_error',
          apiUrl: API_BASE_URL,
          timestamp: new Date().toISOString()
        }
      }
    }
  }

  // Resto de métodos igual...
  static async saveIndividualPrediction(formData, result) {
    try {
      console.log('📤 Enviando predicción individual a PostgreSQL (Neon)...')
      
      const requestBody = {
        formData,
        result,
        metadata: {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          source: 'individual_prediction_form',
          version: '1.0.0'
        }
      }

      const response = await fetch(`${API_BASE_URL}/predictions/individual`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(requestBody)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error guardando predicción')
      }

      console.log('✅ Predicción individual guardada:', data.data.predictionId)
      return data

    } catch (error) {
      console.error('❌ Error guardando predicción individual:', error)
      return { success: false, error: error.message }
    }
  }

  static async saveBatchPrediction(filename, fileSize, results, items = []) {
    try {
      console.log('📤 Enviando predicción por lotes a PostgreSQL (Neon)...')
      
      const requestBody = {
        filename,
        fileSize,
        results,
        items: items.slice(0, 100),
        metadata: {
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          source: 'batch_prediction_upload',
          version: '1.0.0',
          itemsCount: items.length,
          itemsSaved: Math.min(items.length, 100)
        }
      }

      const response = await fetch(`${API_BASE_URL}/predictions/batch`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(requestBody)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error guardando predicción por lotes')
      }

      console.log('✅ Predicción por lotes guardada:', data.data.batchId)
      return data

    } catch (error) {
      console.error('❌ Error guardando predicción por lotes:', error)
      return { success: false, error: error.message }
    }
  }

  static async getStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/predictions/stats`, {
        headers: this.getHeaders()
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error obteniendo estadísticas')
      }

      return data

    } catch (error) {
      console.error('❌ Error obteniendo estadísticas:', error)
      return { success: false, error: error.message }
    }
  }
}

export default PredictionService