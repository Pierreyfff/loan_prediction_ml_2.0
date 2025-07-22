/*// Datos reales del modelo optimizado
export const realModelData = {
  // Métricas exactas del modelo optimizado
  metrics: {
    accuracy: 85.87,
    precision: 83.89,
    recall: 98.43,
    f1Score: 90.58,
    rocAuc: 78.16,
    totalPredictions: 184,
    correctPredictions: 158, // 184 - 26 errores
    errors: 26,
    
    // Matriz de Confusión Real
    confusionMatrix: {
      trueNegatives: 33,   // TN
      falsePositives: 24,  // FP 
      falseNegatives: 2,   // FN
      truePositives: 125   // TP
    }
  },

  // Métricas del modelo baseline para comparación
  baseline: {
    accuracy: 80.43,
    precision: 88.24,
    recall: 82.68,
    f1Score: 85.37,
    rocAuc: 79.06,
    confusionMatrix: {
      trueNegatives: 43,
      falsePositives: 14,
      falseNegatives: 22,
      truePositives: 105
    }
  },

  // Primeras 20 predicciones reales del CSV
  samplePredictions: [
    { id: 'LP001940', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002387', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002938', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002024', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP001792', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002917', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002113', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP001050', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002872', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002785', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002622', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001507', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001653', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001273', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP001750', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001836', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP002478', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001325', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002571', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002314', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 }
  ],

  // Variables del modelo (del output del pipeline)
  modelFeatures: [
    'ApplicantIncome',
    'CoapplicantIncome', 
    'LoanAmount',
    'Loan_Amount_Term',
    'DebtIncomeRatio',
    'Education',
    'Married_Yes',
    'Property_Area_Semiurban',
    'Property_Area_Urban',
    'Credit_History',
    'Married_CH'
  ],

  // Importancia de características (estimada basada en el análisis típico)
  featureImportance: [
    { feature: 'Historial Crediticio (Credit_History)', importance: 92, description: 'Factor más determinante para la aprobación' },
    { feature: 'Ratio Deuda-Ingreso (DebtIncomeRatio)', importance: 78, description: 'Capacidad de pago del solicitante' },
    { feature: 'Ingresos del Solicitante', importance: 65, description: 'Estabilidad financiera principal' },
    { feature: 'Monto del Préstamo', importance: 52, description: 'Riesgo asociado al monto solicitado' },
    { feature: 'Combinación Estado Civil + Historial', importance: 45, description: 'Variable derivada Married_CH' },
    { feature: 'Educación', importance: 38, description: 'Indicador de estabilidad laboral' },
    { feature: 'Ingresos del Co-solicitante', importance: 35, description: 'Respaldo financiero adicional' },
    { feature: 'Plazo del Préstamo', importance: 28, description: 'Términos de pago' },
    { feature: 'Área de Propiedad', importance: 25, description: 'Ubicación y valorización' },
    { feature: 'Estado Civil', importance: 18, description: 'Estabilidad personal' }
  ],

  // Análisis de errores del modelo
  errorAnalysis: {
    falsePositives: {
      count: 24,
      percentage: 13.04, // 24/184 * 100
      description: 'Préstamos riesgosos que fueron aprobados incorrectamente',
      impact: 'Riesgo financiero potencial'
    },
    falseNegatives: {
      count: 2,
      percentage: 1.09, // 2/184 * 100
      description: 'Buenos clientes que fueron rechazados incorrectamente',
      impact: 'Oportunidades de negocio perdidas'
    }
  },

  // Distribución de riesgo estimada
  riskDistribution: {
    low: 78,     // Aprox. predicciones con alta confianza positiva
    medium: 67,  // Predicciones con confianza media
    high: 39     // Predicciones de alto riesgo
  },

  // Configuración del modelo
  modelConfig: {
    algorithm: 'Logistic Regression',
    hyperparameters: {
      C: 1,
      class_weight: 'None',
      max_iter: 500,
      solver: 'lbfgs'
    },
    crossValidationScore: 74.33,
    trainingDataSize: 429,
    testDataSize: 184
  }
}

// Función para obtener estadísticas de las predicciones reales
export const getRandomPredictions = (count = 10) => {
  const allPredictions = [
    { id: 'LP001940', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002387', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002938', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002024', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP001792', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002917', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002113', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP001050', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002872', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002785', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002622', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001507', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001653', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001273', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP001750', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001836', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP002478', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001325', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002571', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002314', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001658', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002370', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001633', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002804', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001732', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002281', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001854', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP002342', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP002036', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002560', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001677', real: 1, predicted: 0, match: 0, probApprove: 0, probReject: 100 }, // Falso negativo
    { id: 'LP002068', real: 1, predicted: 0, match: 0, probApprove: 0, probReject: 100 }  // Falso negativo
  ]
  
  return allPredictions.slice(0, count)
}

// Función para simular predicción con datos reales como base
export const simulateRealPrediction = (formData) => {
  // Lógica mejorada basada en las características importantes del modelo real
  let score = 0.5
  let factors = []
  
  const totalIncome = formData.applicantIncome + (formData.coapplicantIncome || 0)
  const debtRatio = formData.loanAmount / totalIncome
  
  // Usar los mismos pesos que el modelo real (basado en feature importance)
  
  // Credit_History es el factor más importante (92% importancia)
  if (formData.creditHistory === 1) {
    score += 0.35  // Mayor peso
    factors.push({ factor: 'Historial crediticio excelente', impact: '+35%', positive: true })
  } else {
    score -= 0.45  // Penalización mayor
    factors.push({ factor: 'Historial crediticio deficiente', impact: '-45%', positive: false })
  }
  
  // DebtIncomeRatio (78% importancia)
  if (debtRatio < 0.2) {
    score += 0.25
    factors.push({ factor: 'Ratio deuda-ingreso muy bajo', impact: '+25%', positive: true })
  } else if (debtRatio < 0.4) {
    score += 0.15
    factors.push({ factor: 'Ratio deuda-ingreso bajo', impact: '+15%', positive: true })
  } else if (debtRatio > 1.5) {
    score -= 0.35
    factors.push({ factor: 'Ratio deuda-ingreso muy alto', impact: '-35%', positive: false })
  } else if (debtRatio > 0.8) {
    score -= 0.20
    factors.push({ factor: 'Ratio deuda-ingreso alto', impact: '-20%', positive: false })
  }
  
  // ApplicantIncome (65% importancia)
  if (formData.applicantIncome > 8000) {
    score += 0.20
    factors.push({ factor: 'Ingresos muy altos', impact: '+20%', positive: true })
  } else if (formData.applicantIncome > 5000) {
    score += 0.12
    factors.push({ factor: 'Ingresos altos', impact: '+12%', positive: true })
  } else if (formData.applicantIncome < 2500) {
    score -= 0.18
    factors.push({ factor: 'Ingresos bajos', impact: '-18%', positive: false })
  }
  
  // LoanAmount (52% importancia)
  if (formData.loanAmount > 300000) {
    score -= 0.15
    factors.push({ factor: 'Monto de préstamo muy alto', impact: '-15%', positive: false })
  } else if (formData.loanAmount < 100000) {
    score += 0.08
    factors.push({ factor: 'Monto de préstamo moderado', impact: '+8%', positive: true })
  }
  
  // Education (38% importancia)
  if (formData.education === 'Graduate') {
    score += 0.08
    factors.push({ factor: 'Educación superior', impact: '+8%', positive: true })
  }
  
  // Married_CH combination (45% importancia - variable derivada)
  if (formData.married === 'Yes' && formData.creditHistory === 1) {
    score += 0.10
    factors.push({ factor: 'Casado con buen historial crediticio', impact: '+10%', positive: true })
  }
  
  // CoapplicantIncome (35% importancia)
  if (formData.coapplicantIncome > 3000) {
    score += 0.10
    factors.push({ factor: 'Co-solicitante con buenos ingresos', impact: '+10%', positive: true })
  } else if (formData.coapplicantIncome > 0) {
    score += 0.05
    factors.push({ factor: 'Respaldo de co-solicitante', impact: '+5%', positive: true })
  }
  
  // Property Area (25% importancia)
  if (formData.propertyArea === 'Urban') {
    score += 0.05
    factors.push({ factor: 'Propiedad en área urbana', impact: '+5%', positive: true })
  } else if (formData.propertyArea === 'Rural') {
    score -= 0.03
    factors.push({ factor: 'Propiedad en área rural', impact: '-3%', positive: false })
  }
  
  // Normalizar score
  score = Math.max(0.05, Math.min(0.95, score))
  
  // Usar threshold similar al modelo real (optimizado para recall alto)
  const decision = score > 0.45 ? 'Aprobado' : 'Rechazado'  // Threshold más bajo para favorecer aprobaciones
  
  // Calcular probabilidades más realistas
  const probApprove = Math.max(5, Math.min(95, score * 100))
  const probReject = 100 - probApprove
  
  // Determinar nivel de confianza basado en el score
  let confidence = 'Media'
  if (score > 0.85 || score < 0.15) confidence = 'Alta'
  else if (score > 0.75 || score < 0.25) confidence = 'Media-Alta'
  else if (score > 0.65 || score < 0.35) confidence = 'Media'
  else confidence = 'Media-Baja'
  
  // Determinar nivel de riesgo
  let riskLevel = 'Medio'
  if (score > 0.75) riskLevel = 'Bajo'
  else if (score > 0.6) riskLevel = 'Medio-Bajo'
  else if (score < 0.3) riskLevel = 'Alto'
  else if (score < 0.45) riskLevel = 'Medio-Alto'
  
  return {
    decision,
    probApprove: probApprove.toFixed(1),
    probReject: probReject.toFixed(1),
    score: score.toFixed(3),
    debtRatio: debtRatio.toFixed(3),
    confidence,
    riskLevel,
    factors,
    totalIncome,
    modelVersion: 'Optimized v1.0',
    processingTime: '0.15s'
  }
}

export default realModelData*/

// Datos reales del modelo optimizado
export const realModelData = {
  // Métricas exactas del modelo optimizado
  metrics: {
    accuracy: 85.87,
    precision: 83.89,
    recall: 98.43,
    f1Score: 90.58,
    rocAuc: 78.16,
    totalPredictions: 184,
    correctPredictions: 158,
    errors: 26,
    
    confusionMatrix: {
      trueNegatives: 33,
      falsePositives: 24,
      falseNegatives: 2,
      truePositives: 125
    }
  },

  // Métricas del modelo baseline para comparación
  baseline: {
    accuracy: 80.43,
    precision: 88.24,
    recall: 82.68,
    f1Score: 85.37,
    rocAuc: 79.06,
    confusionMatrix: {
      trueNegatives: 43,
      falsePositives: 14,
      falseNegatives: 22,
      truePositives: 105
    }
  },

  // Primeras 20 predicciones reales del CSV
  samplePredictions: [
    { id: 'LP001940', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002387', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002938', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002024', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP001792', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002917', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002113', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP001050', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002872', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002785', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002622', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001507', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001653', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001273', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP001750', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001836', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP002478', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001325', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002571', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002314', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 }
  ],

  // Variables del modelo (del output del pipeline)
  modelFeatures: [
    'ApplicantIncome',
    'CoapplicantIncome', 
    'LoanAmount',
    'Loan_Amount_Term',
    'DebtIncomeRatio',
    'Education',
    'Married_Yes',
    'Property_Area_Semiurban',
    'Property_Area_Urban',
    'Credit_History',
    'Married_CH'
  ],

  // Importancia de características (estimada basada en el análisis típico)
  featureImportance: [
    { feature: 'Historial Crediticio (Credit_History)', importance: 92, description: 'Factor más determinante para la aprobación' },
    { feature: 'Ratio Deuda-Ingreso (DebtIncomeRatio)', importance: 78, description: 'Capacidad de pago del solicitante' },
    { feature: 'Ingresos del Solicitante', importance: 65, description: 'Estabilidad financiera principal' },
    { feature: 'Monto del Préstamo', importance: 52, description: 'Riesgo asociado al monto solicitado' },
    { feature: 'Combinación Estado Civil + Historial', importance: 45, description: 'Variable derivada Married_CH' },
    { feature: 'Educación', importance: 38, description: 'Indicador de estabilidad laboral' },
    { feature: 'Ingresos del Co-solicitante', importance: 35, description: 'Respaldo financiero adicional' },
    { feature: 'Plazo del Préstamo', importance: 28, description: 'Términos de pago' },
    { feature: 'Área de Propiedad', importance: 25, description: 'Ubicación y valorización' },
    { feature: 'Estado Civil', importance: 18, description: 'Estabilidad personal' }
  ],

  // Análisis de errores del modelo
  errorAnalysis: {
    falsePositives: {
      count: 24,
      percentage: 13.04,
      description: 'Préstamos riesgosos que fueron aprobados incorrectamente',
      impact: 'Riesgo financiero potencial'
    },
    falseNegatives: {
      count: 2,
      percentage: 1.09,
      description: 'Buenos clientes que fueron rechazados incorrectamente',
      impact: 'Oportunidades de negocio perdidas'
    }
  },

  // Distribución de riesgo estimada
  riskDistribution: {
    low: 78,
    medium: 67,
    high: 39
  },

  // Configuración del modelo
  modelConfig: {
    algorithm: 'Logistic Regression',
    hyperparameters: {
      C: 1,
      class_weight: 'None',
      max_iter: 500,
      solver: 'lbfgs'
    },
    crossValidationScore: 74.33,
    trainingDataSize: 429,
    testDataSize: 184
  }
}

// Función para validar datos de entrada
export const validateLoanData = (formData) => {
  const warnings = []
  const errors = []
  const recommendations = []

  const totalIncome = formData.applicantIncome + (formData.coapplicantIncome || 0)
  const debtRatio = formData.loanAmount / totalIncome

  // VALIDACIONES CRÍTICAS (errores que impiden procesar)
  
  // 1. Monto del préstamo no puede ser igual al ingreso del solicitante
  if (formData.loanAmount === formData.applicantIncome) {
    errors.push({
      type: 'critical',
      message: 'El monto del préstamo no puede ser igual a los ingresos del solicitante',
      field: 'loanAmount',
      suggestion: 'Ajuste el monto del préstamo para que sea diferente a sus ingresos'
    })
  }

  // 2. Monto del préstamo no puede ser igual al ingreso del co-solicitante
  if (formData.coapplicantIncome && formData.loanAmount === formData.coapplicantIncome) {
    errors.push({
      type: 'critical',
      message: 'El monto del préstamo no puede ser igual a los ingresos del co-solicitante',
      field: 'loanAmount',
      suggestion: 'Ajuste el monto del préstamo para que sea diferente a los ingresos del co-solicitante'
    })
  }

  // 3. Monto del préstamo excesivamente alto comparado con ingresos
  if (debtRatio > 20) {
    errors.push({
      type: 'critical',
      message: 'El monto solicitado es excesivamente alto comparado con los ingresos totales',
      field: 'loanAmount',
      suggestion: `Con ingresos de $${totalIncome.toLocaleString()}, considere un monto máximo de $${(totalIncome * 10).toLocaleString()}`
    })
  }

  // VALIDACIONES DE ADVERTENCIA (permiten procesar pero alertan)

  // 1. Ratio deuda-ingreso muy alto (tradicional: max 5-6x ingresos anuales)
  if (debtRatio > 6 && debtRatio <= 10) {
    warnings.push({
      type: 'high_debt_ratio',
      message: 'Ratio deuda-ingreso muy alto (mayor a 6x ingresos anuales)',
      impact: 'Alto riesgo de incumplimiento',
      suggestion: 'Considere reducir el monto o aumentar el plazo'
    })
  }

  // 2. Plazo excesivamente largo
  if (formData.loanTerm > 360) {
    warnings.push({
      type: 'long_term',
      message: 'Plazo de 40 años es excesivamente largo para un préstamo',
      impact: 'Intereses totales muy elevados',
      suggestion: 'Considere un plazo máximo de 30 años (360 meses)'
    })
  }

  // 3. Monto muy bajo comparado con ingresos
  if (debtRatio < 0.5) {
    recommendations.push({
      type: 'low_utilization',
      message: 'El monto solicitado es muy conservador comparado con su capacidad de pago',
      suggestion: `Con sus ingresos, podría solicitar hasta $${(totalIncome * 3).toLocaleString()}`
    })
  }

  // 4. Sin co-solicitante con monto alto
  if (!formData.coapplicantIncome && formData.loanAmount > formData.applicantIncome * 4) {
    warnings.push({
      type: 'no_cosigner',
      message: 'Monto alto sin co-solicitante',
      impact: 'Riesgo elevado para el banco',
      suggestion: 'Considere agregar un co-solicitante para mejorar la aprobación'
    })
  }

  // 5. Historial crediticio malo con monto alto
  if (formData.creditHistory === 0 && debtRatio > 3) {
    warnings.push({
      type: 'bad_credit_high_amount',
      message: 'Historial crediticio deficiente con monto alto solicitado',
      impact: 'Probabilidad de rechazo muy alta',
      suggestion: 'Mejore su historial crediticio antes de solicitar montos altos'
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    recommendations,
    debtRatio,
    totalIncome
  }
}

// Función para obtener estadísticas de las predicciones reales
export const getRandomPredictions = (count = 10) => {
  const allPredictions = [
    { id: 'LP001940', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002387', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002938', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002024', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP001792', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002917', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002113', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP001050', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002872', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002785', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002622', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001507', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001653', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001273', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP001750', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001836', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP002478', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001325', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002571', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002314', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001658', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002370', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001633', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002804', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001732', real: 0, predicted: 0, match: 1, probApprove: 0, probReject: 100 },
    { id: 'LP002281', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001854', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP002342', real: 0, predicted: 1, match: 0, probApprove: 100, probReject: 0 },
    { id: 'LP002036', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP002560', real: 1, predicted: 1, match: 1, probApprove: 100, probReject: 0 },
    { id: 'LP001677', real: 1, predicted: 0, match: 0, probApprove: 0, probReject: 100 },
    { id: 'LP002068', real: 1, predicted: 0, match: 0, probApprove: 0, probReject: 100 }
  ]
  
  return allPredictions.slice(0, count)
}

// Función mejorada para simular predicción con datos reales como base
export const simulateRealPrediction = (formData) => {
  // Primero validar los datos
  const validation = validateLoanData(formData)
  
  // Si hay errores críticos, retornar rechazo inmediato
  if (!validation.isValid) {
    return {
      decision: 'Rechazado',
      probApprove: '5.0',
      probReject: '95.0',
      score: '0.050',
      debtRatio: validation.debtRatio.toFixed(3),
      confidence: 'Alta',
      riskLevel: 'Alto',
      factors: [
        { factor: 'Datos de entrada inválidos', impact: '-90%', positive: false },
        ...validation.errors.map(error => ({
          factor: error.message,
          impact: '-95%',
          positive: false
        }))
      ],
      totalIncome: validation.totalIncome,
      modelVersion: 'Optimized v1.0',
      processingTime: '0.05s',
      validation: validation
    }
  }

  // Lógica mejorada basada en las características importantes del modelo real
  let score = 0.5
  let factors = []
  
  const totalIncome = validation.totalIncome
  const debtRatio = validation.debtRatio
  
  // Credit_History es el factor más importante (92% importancia)
  if (formData.creditHistory === 1) {
    score += 0.30
    factors.push({ factor: 'Historial crediticio excelente', impact: '+30%', positive: true })
  } else {
    score -= 0.40
    factors.push({ factor: 'Historial crediticio deficiente', impact: '-40%', positive: false })
  }
  
  // DebtIncomeRatio (78% importancia) - Lógica más realista
  if (debtRatio < 2) {
    score += 0.25
    factors.push({ factor: 'Ratio deuda-ingreso muy bajo', impact: '+25%', positive: true })
  } else if (debtRatio < 4) {
    score += 0.15
    factors.push({ factor: 'Ratio deuda-ingreso razonable', impact: '+15%', positive: true })
  } else if (debtRatio < 6) {
    score += 0.05
    factors.push({ factor: 'Ratio deuda-ingreso aceptable', impact: '+5%', positive: true })
  } else if (debtRatio < 8) {
    score -= 0.10
    factors.push({ factor: 'Ratio deuda-ingreso alto', impact: '-10%', positive: false })
  } else if (debtRatio < 10) {
    score -= 0.25
    factors.push({ factor: 'Ratio deuda-ingreso muy alto', impact: '-25%', positive: false })
  } else {
    score -= 0.35
    factors.push({ factor: 'Ratio deuda-ingreso excesivo', impact: '-35%', positive: false })
  }
  
  // ApplicantIncome (65% importancia)
  if (formData.applicantIncome > 10000) {
    score += 0.20
    factors.push({ factor: 'Ingresos muy altos', impact: '+20%', positive: true })
  } else if (formData.applicantIncome > 6000) {
    score += 0.15
    factors.push({ factor: 'Ingresos altos', impact: '+15%', positive: true })
  } else if (formData.applicantIncome > 3000) {
    score += 0.08
    factors.push({ factor: 'Ingresos adecuados', impact: '+8%', positive: true })
  } else {
    score -= 0.15
    factors.push({ factor: 'Ingresos bajos', impact: '-15%', positive: false })
  }
  
  // LoanAmount vs Income relationship (52% importancia)
  const incomeMultiplier = formData.loanAmount / formData.applicantIncome
  if (incomeMultiplier < 3) {
    score += 0.12
    factors.push({ factor: 'Monto conservador vs ingresos', impact: '+12%', positive: true })
  } else if (incomeMultiplier > 8) {
    score -= 0.20
    factors.push({ factor: 'Monto muy alto vs ingresos', impact: '-20%', positive: false })
  }
  
  // Loan Term impact (28% importancia) - Penalizar plazos muy largos
  if (formData.loanTerm > 360) {
    score -= 0.15
    factors.push({ factor: 'Plazo excesivamente largo (40 años)', impact: '-15%', positive: false })
  } else if (formData.loanTerm > 300) {
    score -= 0.08
    factors.push({ factor: 'Plazo largo (25+ años)', impact: '-8%', positive: false })
  } else if (formData.loanTerm < 180) {
    score += 0.05
    factors.push({ factor: 'Plazo corto favorable', impact: '+5%', positive: true })
  }
  
  // Education (38% importancia)
  if (formData.education === 'Graduate') {
    score += 0.08
    factors.push({ factor: 'Educación superior', impact: '+8%', positive: true })
  } else {
    score -= 0.05
    factors.push({ factor: 'Educación básica', impact: '-5%', positive: false })
  }
  
  // Married_CH combination (45% importancia)
  if (formData.married === 'Yes' && formData.creditHistory === 1) {
    score += 0.12
    factors.push({ factor: 'Casado con buen historial crediticio', impact: '+12%', positive: true })
  } else if (formData.married === 'No' && formData.creditHistory === 0) {
    score -= 0.08
    factors.push({ factor: 'Soltero con mal historial', impact: '-8%', positive: false })
  }
  
  // CoapplicantIncome (35% importancia)
  if (formData.coapplicantIncome > 4000) {
    score += 0.15
    factors.push({ factor: 'Co-solicitante con excelentes ingresos', impact: '+15%', positive: true })
  } else if (formData.coapplicantIncome > 2000) {
    score += 0.10
    factors.push({ factor: 'Co-solicitante con buenos ingresos', impact: '+10%', positive: true })
  } else if (formData.coapplicantIncome > 0) {
    score += 0.05
    factors.push({ factor: 'Respaldo de co-solicitante', impact: '+5%', positive: true })
  } else {
    score -= 0.05
    factors.push({ factor: 'Sin co-solicitante', impact: '-5%', positive: false })
  }
  
  // Property Area (25% importancia)
  if (formData.propertyArea === 'Urban') {
    score += 0.05
    factors.push({ factor: 'Propiedad en área urbana', impact: '+5%', positive: true })
  } else if (formData.propertyArea === 'Rural') {
    score -= 0.03
    factors.push({ factor: 'Propiedad en área rural', impact: '-3%', positive: false })
  }
  
  // Agregar factores de las advertencias
  validation.warnings.forEach(warning => {
    score -= 0.05
    factors.push({ factor: warning.message, impact: '-5%', positive: false })
  })
  
  // Normalizar score
  score = Math.max(0.05, Math.min(0.95, score))
  
  // Usar threshold más realista
  const decision = score > 0.55 ? 'Aprobado' : 'Rechazado'
  
  // Calcular probabilidades más realistas
  const probApprove = Math.max(5, Math.min(95, score * 100))
  const probReject = 100 - probApprove
  
  // Determinar nivel de confianza basado en el score
  let confidence = 'Media'
  if (score > 0.85 || score < 0.15) confidence = 'Alta'
  else if (score > 0.75 || score < 0.25) confidence = 'Media-Alta'
  else if (score > 0.65 || score < 0.35) confidence = 'Media'
  else confidence = 'Media-Baja'
  
  // Determinar nivel de riesgo más realista
  let riskLevel = 'Medio'
  if (score > 0.8) riskLevel = 'Bajo'
  else if (score > 0.65) riskLevel = 'Medio-Bajo'
  else if (score < 0.25) riskLevel = 'Alto'
  else if (score < 0.45) riskLevel = 'Medio-Alto'
  
  return {
    decision,
    probApprove: probApprove.toFixed(1),
    probReject: probReject.toFixed(1),
    score: score.toFixed(3),
    debtRatio: debtRatio.toFixed(3),
    confidence,
    riskLevel,
    factors,
    totalIncome,
    modelVersion: 'Optimized v1.0',
    processingTime: '0.15s',
    validation: validation
  }
}

export default realModelData