const { pool } = require('../config/database')
const { v4: uuidv4 } = require('uuid')

class PredictionModel {
  // Guardar predicción individual
  static async saveIndividualPrediction(data) {
    const client = await pool.connect()
    
    try {
      const predictionId = uuidv4()
      
      const query = `
        INSERT INTO individual_predictions (
          prediction_id, user_login, applicant_income, coapplicant_income,
          loan_amount, loan_term, credit_history, married, education,
          property_area, decision, prob_approve, prob_reject, ml_score,
          debt_ratio, confidence_level, risk_level, total_income,
          processing_time, model_version, decision_factors, ip_address, user_agent
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
        ) RETURNING id, prediction_id, created_at
      `
      
      const values = [
        predictionId,
        data.userLogin || 'Pierreyfff',
        data.formData.applicantIncome,
        data.formData.coapplicantIncome || 0,
        data.formData.loanAmount,
        data.formData.loanTerm,
        data.formData.creditHistory,
        data.formData.married,
        data.formData.education,
        data.formData.propertyArea,
        data.result.decision,
        parseFloat(data.result.probApprove),
        parseFloat(data.result.probReject),
        parseFloat(data.result.score),
        parseFloat(data.result.debtRatio),
        data.result.confidence,
        data.result.riskLevel,
        data.result.totalIncome,
        data.result.processingTime || '0.15s',
        data.result.modelVersion || 'Optimized v1.0',
        JSON.stringify(data.result.factors || []),
        data.ipAddress || null,
        data.userAgent || null
      ]
      
      const result = await client.query(query, values)
      
      console.log(`✅ Predicción individual guardada: ${predictionId} para usuario Pierreyfff`)
      return result.rows[0]
      
    } catch (error) {
      console.error('Error guardando predicción individual:', error)
      throw error
    } finally {
      client.release()
    }
  }
  
  // Guardar predicción por lotes
  static async saveBatchPrediction(data) {
    const client = await pool.connect()
    
    try {
      await client.query('BEGIN')
      
      const batchId = uuidv4()
      
      // Insertar información del lote
      const batchQuery = `
        INSERT INTO batch_predictions (
          batch_id, user_login, filename, file_size, total_records,
          approved_count, rejected_count, accuracy, precision_metric, recall_metric,
          f1_score, avg_confidence, processing_time, model_version,
          risk_low, risk_medium, risk_high, true_positives, true_negatives,
          false_positives, false_negatives, ip_address, user_agent
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23
        ) RETURNING id, batch_id, created_at
      `
      
      const batchValues = [
        batchId,
        data.userLogin || 'Pierreyfff',
        data.filename,
        data.fileSize,
        data.results.totalRecords,
        data.results.approved,
        data.results.rejected,
        data.results.accuracy,
        data.results.precision || 0,
        data.results.recall || 0,
        data.results.f1Score || 0,
        data.results.avgConfidence,
        data.results.processingTime,
        data.results.modelVersion || 'Optimized v1.0',
        data.results.riskDistribution.low,
        data.results.riskDistribution.medium,
        data.results.riskDistribution.high,
        data.results.confusionMatrix?.truePositives || 0,
        data.results.confusionMatrix?.trueNegatives || 0,
        data.results.confusionMatrix?.falsePositives || 0,
        data.results.confusionMatrix?.falseNegatives || 0,
        data.ipAddress || null,
        data.userAgent || null
      ]
      
      const batchResult = await client.query(batchQuery, batchValues)
      
      // Insertar items individuales del lote (si se proporcionan)
      if (data.items && data.items.length > 0) {
        const itemQuery = `
          INSERT INTO batch_prediction_items (
            batch_id, item_index, loan_id, applicant_income, coapplicant_income,
            loan_amount, loan_term, credit_history, married, education,
            property_area, predicted_status, prob_approve, prob_reject, risk_level
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
          )
        `
        
        for (let i = 0; i < data.items.length; i++) {
          const item = data.items[i]
          const itemValues = [
            batchId,
            i,
            item.loanId || `BATCH_${batchId}_${i}`,
            item.applicantIncome || 0,
            item.coapplicantIncome || 0,
            item.loanAmount || 0,
            item.loanTerm || 360,
            item.creditHistory || 1,
            item.married || 'Unknown',
            item.education || 'Unknown',
            item.propertyArea || 'Unknown',
            item.predictedStatus || 'Unknown',
            item.probApprove || 0,
            item.probReject || 0,
            item.riskLevel || 'Medium'
          ]
          
          await client.query(itemQuery, itemValues)
        }
      }
      
      await client.query('COMMIT')
      
      console.log(`✅ Predicción por lotes guardada: ${batchId} (${data.results.totalRecords} items) para usuario Pierreyfff`)
      return batchResult.rows[0]
      
    } catch (error) {
      await client.query('ROLLBACK')
      console.error('Error guardando predicción por lotes:', error)
      throw error
    } finally {
      client.release()
    }
  }
  
  // Obtener estadísticas de predicciones
  static async getStats() {
    const client = await pool.connect()
    
    try {
      const statsQuery = `
        SELECT 
          (SELECT COUNT(*) FROM individual_predictions) as individual_count,
          (SELECT COUNT(*) FROM batch_predictions) as batch_count,
          (SELECT COUNT(*) FROM batch_prediction_items) as batch_items_count,
          (SELECT AVG(prob_approve) FROM individual_predictions WHERE decision = 'Aprobado') as avg_approval_prob,
          (SELECT COUNT(*) FROM individual_predictions WHERE decision = 'Aprobado') as total_approved,
          (SELECT COUNT(*) FROM individual_predictions WHERE decision = 'Rechazado') as total_rejected,
          (SELECT COUNT(*) FROM individual_predictions WHERE user_login = 'Pierreyfff') as pierreyfff_predictions
      `
      
      const result = await client.query(statsQuery)
      return result.rows[0]
      
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error)
      throw error
    } finally {
      client.release()
    }
  }
}

module.exports = PredictionModel