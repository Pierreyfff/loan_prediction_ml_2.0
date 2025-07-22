const { Pool } = require('pg')
require('dotenv').config()

// Configuración de la conexión a PostgreSQL (Neon)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// Función para crear las tablas si no existen
const initializeDatabase = async () => {
  try {
    console.log('🔗 Conectando a PostgreSQL (Neon)...')
    const client = await pool.connect()
    
    console.log('✅ Conexión a Neon establecida')
    console.log('📋 Creando tablas si no existen...')
    
    // Crear tabla para predicciones individuales
    await client.query(`
      CREATE TABLE IF NOT EXISTS individual_predictions (
        id SERIAL PRIMARY KEY,
        prediction_id VARCHAR(255) UNIQUE NOT NULL,
        user_login VARCHAR(255) DEFAULT 'Pierreyfff',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
        -- Datos de entrada
        applicant_income DECIMAL(12, 2),
        coapplicant_income DECIMAL(12, 2),
        loan_amount DECIMAL(12, 2),
        loan_term INTEGER,
        credit_history INTEGER,
        married VARCHAR(10),
        education VARCHAR(50),
        property_area VARCHAR(50),
        
        -- Resultados de la predicción
        decision VARCHAR(20),
        prob_approve DECIMAL(5, 2),
        prob_reject DECIMAL(5, 2),
        ml_score DECIMAL(8, 5),
        debt_ratio DECIMAL(8, 5),
        confidence_level VARCHAR(20),
        risk_level VARCHAR(20),
        total_income DECIMAL(12, 2),
        processing_time VARCHAR(10),
        model_version VARCHAR(20),
        
        -- Factores de decisión (JSON)
        decision_factors JSONB,
        
        -- Metadatos
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    // Crear tabla para predicciones por lotes
    await client.query(`
      CREATE TABLE IF NOT EXISTS batch_predictions (
        id SERIAL PRIMARY KEY,
        batch_id VARCHAR(255) UNIQUE NOT NULL,
        user_login VARCHAR(255) DEFAULT 'Pierreyfff',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
        -- Información del archivo
        filename VARCHAR(255),
        file_size INTEGER,
        total_records INTEGER,
        
        -- Resultados del procesamiento
        approved_count INTEGER,
        rejected_count INTEGER,
        accuracy DECIMAL(5, 2),
        precision_metric DECIMAL(5, 2),
        recall_metric DECIMAL(5, 2),
        f1_score DECIMAL(5, 2),
        avg_confidence DECIMAL(5, 2),
        processing_time VARCHAR(10),
        model_version VARCHAR(20),
        
        -- Distribución de riesgo
        risk_low INTEGER,
        risk_medium INTEGER,
        risk_high INTEGER,
        
        -- Matriz de confusión
        true_positives INTEGER,
        true_negatives INTEGER,
        false_positives INTEGER,
        false_negatives INTEGER,
        
        -- Metadatos
        ip_address VARCHAR(45),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Crear tabla para items individuales de cada lote
    await client.query(`
      CREATE TABLE IF NOT EXISTS batch_prediction_items (
        id SERIAL PRIMARY KEY,
        batch_id VARCHAR(255) REFERENCES batch_predictions(batch_id),
        item_index INTEGER,
        loan_id VARCHAR(255),
        
        -- Datos de entrada
        applicant_income DECIMAL(12, 2),
        coapplicant_income DECIMAL(12, 2),
        loan_amount DECIMAL(12, 2),
        loan_term INTEGER,
        credit_history INTEGER,
        married VARCHAR(10),
        education VARCHAR(50),
        property_area VARCHAR(50),
        
        -- Resultados
        predicted_status VARCHAR(20),
        prob_approve DECIMAL(5, 2),
        prob_reject DECIMAL(5, 2),
        risk_level VARCHAR(20),
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    
    // Crear índices para mejor rendimiento
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_individual_predictions_timestamp 
      ON individual_predictions(timestamp DESC)
    `)
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_individual_predictions_user 
      ON individual_predictions(user_login, timestamp DESC)
    `)
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_batch_predictions_timestamp 
      ON batch_predictions(timestamp DESC)
    `)
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_batch_items_batch_id 
      ON batch_prediction_items(batch_id)
    `)
    
    client.release()
    console.log('✅ Tablas creadas/verificadas correctamente')
    console.log('✅ Índices creados/verificados correctamente')
    console.log('✅ Base de datos inicializada para usuario: Pierreyfff')
    
  } catch (error) {
    console.error('❌ Error inicializando la base de datos:', error)
    throw error
  }
}

// Función para obtener estadísticas de la base de datos
const getDatabaseStats = async () => {
  try {
    const client = await pool.connect()
    
    const individualCount = await client.query('SELECT COUNT(*) FROM individual_predictions')
    const batchCount = await client.query('SELECT COUNT(*) FROM batch_predictions')
    const batchItemsCount = await client.query('SELECT COUNT(*) FROM batch_prediction_items')
    
    client.release()
    
    return {
      individualPredictions: parseInt(individualCount.rows[0].count),
      batchPredictions: parseInt(batchCount.rows[0].count),
      batchItems: parseInt(batchItemsCount.rows[0].count),
      totalPredictions: parseInt(individualCount.rows[0].count) + parseInt(batchItemsCount.rows[0].count)
    }
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error)
    throw error
  }
}

module.exports = {
  pool,
  initializeDatabase,
  getDatabaseStats
}