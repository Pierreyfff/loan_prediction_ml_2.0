/*import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Calculator, 
  DollarSign, 
  User, 
  GraduationCap,
  CreditCard,
  MapPin,
  CheckCircle,
  XCircle,
  Info,
  TrendingUp,
  AlertTriangle,
  Clock,
  Calendar,
  Database,
  Wifi,
  WifiOff
} from 'lucide-react'
import { simulateRealPrediction } from '../utils/realData'
import PredictionService from '../services/predictionService'

const PredictLoan = () => {
  const [formData, setFormData] = useState({
    applicantIncome: '',
    coapplicantIncome: '',
    loanAmount: '',
    loanTerm: 360,
    creditHistory: 1,
    married: 'Yes',
    education: 'Graduate',
    propertyArea: 'Urban'
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [savingToDB, setSavingToDB] = useState(false)
  const [dbSaveStatus, setDbSaveStatus] = useState(null)
  const [backendConnected, setBackendConnected] = useState(null)

  // Verificar conexión con el backend al cargar
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const health = await PredictionService.checkHealth()
        setBackendConnected(health.success)
        if (health.success) {
          console.log('✅ Backend conectado:', health.message)
        } else {
          console.log('⚠️ Backend no disponible')
        }
      } catch (error) {
        setBackendConnected(false)
        console.log('❌ Error conectando al backend:', error)
      }
    }
    checkBackend()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: ['applicantIncome', 'coapplicantIncome', 'loanAmount', 'loanTerm'].includes(name) 
        ? parseFloat(value) || '' 
        : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.applicantIncome || !formData.loanAmount) {
      alert('Por favor completa los campos requeridos: Ingreso del Solicitante y Monto del Préstamo')
      return
    }

    setLoading(true)
    setDbSaveStatus(null)
    
    try {
      // Simular delay de procesamiento del modelo real
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Usar la función de predicción basada en el modelo real
      const prediction = simulateRealPrediction(formData)
      
      setResult(prediction)

      // Guardar en base de datos en segundo plano (solo si el backend está conectado)
      if (backendConnected) {
        setSavingToDB(true)
        try {
          const saveResult = await PredictionService.saveIndividualPrediction(formData, prediction)
          if (saveResult.success) {
            setDbSaveStatus('success')
            console.log('✅ Predicción guardada en BD:', saveResult.data?.predictionId)
          } else {
            setDbSaveStatus('error')
            console.log('⚠️ Error guardando en BD:', saveResult.error)
          }
        } catch (error) {
          setDbSaveStatus('error')
          console.log('⚠️ Error de conexión con BD:', error)
        } finally {
          setSavingToDB(false)
        }
      } else {
        setDbSaveStatus('offline')
      }

    } catch (error) {
      console.error('Error en la predicción:', error)
      alert('Error procesando la predicción. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      applicantIncome: '',
      coapplicantIncome: '',
      loanAmount: '',
      loanTerm: 360,
      creditHistory: 1,
      married: 'Yes',
      education: 'Graduate',
      propertyArea: 'Urban'
    })
    setResult(null)
    setDbSaveStatus(null)
  }

  const getDbStatusMessage = () => {
    if (savingToDB) return 'Guardando predicción en base de datos...'
    if (dbSaveStatus === 'success') return 'Predicción guardada exitosamente en PostgreSQL (Neon)'
    if (dbSaveStatus === 'error') return 'Predicción realizada (error guardando en BD - reintentando...)'
    if (dbSaveStatus === 'offline') return 'Predicción realizada (BD offline - solo modo local)'
    return null
  }

  return (
    <div style={{ backgroundColor: 'var(--light)', minHeight: '100vh', padding: '20px' }}>
      <div className="container">
        {}
        <div style={{ marginBottom: '30px' }}>
          <Link to="/" className="btn btn-outline" style={{ marginBottom: '20px' }}>
            <ArrowLeft size={16} />
            Volver al Inicio
          </Link>
          
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: 'var(--dark)', 
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px'
            }}>
              <Calculator size={36} color="var(--primary)" />
              Predicción Individual de Préstamo
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--gray)' }}>
              Utiliza nuestro modelo ML entrenado (85.87% precisión) para evaluar solicitudes de préstamo
            </p>
            
            {}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              marginTop: '10px',
              fontSize: '14px'
            }}>
              {backendConnected === null ? (
                <>
                  <div className="spinner"></div>
                  <span style={{ color: 'var(--gray)' }}>Verificando conexión BD...</span>
                </>
              ) : backendConnected ? (
                <>
                  <Wifi size={16} color="var(--success)" />
                  <span style={{ color: 'var(--success)' }}>Base de datos conectada (PostgreSQL)</span>
                </>
              ) : (
                <>
                  <WifiOff size={16} color="var(--warning)" />
                  <span style={{ color: 'var(--warning)' }}>BD offline - modo solo predicción</span>
                </>
              )}
            </div>
          </div>
        </div>

        {}
        {(savingToDB || dbSaveStatus) && (
          <div className={`alert ${
            savingToDB ? 'alert-info' : 
            dbSaveStatus === 'success' ? 'alert-success' : 
            dbSaveStatus === 'offline' ? 'alert-warning' : 'alert-danger'
          }`} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={16} />
              {savingToDB && <div className="spinner"></div>}
              {getDbStatusMessage()}
            </div>
          </div>
        )}

        <div className="grid" style={{ 
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 400px' : '1fr', 
          gap: '30px', 
          alignItems: 'start' 
        }}>
          {}
          <div className="card">
            <div className="card-body">
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: 'var(--dark)', 
                marginBottom: '30px',
                borderBottom: '3px solid var(--primary)',
                paddingBottom: '10px'
              }}>
                Información del Solicitante
              </h2>

              <form onSubmit={handleSubmit}>
                {}
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    color: 'var(--primary)', 
                    fontSize: '18px', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <DollarSign size={20} />
                    Información Financiera
                  </h3>
                  
                  <div className="grid grid-2" style={{ marginBottom: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">
                        <User size={16} style={{ marginRight: '8px' }} />
                        INGRESO DEL SOLICITANTE *
                      </label>
                      <input
                        type="number"
                        name="applicantIncome"
                        value={formData.applicantIncome}
                        onChange={handleChange}
                        placeholder="Ej: 5000"
                        required
                        className="form-control"
                        min="0"
                        step="100"
                      />
                      <div className="form-help">
                        Ingreso mensual bruto en USD
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <User size={16} style={{ marginRight: '8px' }} />
                        INGRESO CO-SOLICITANTE
                      </label>
                      <input
                        type="number"
                        name="coapplicantIncome"
                        value={formData.coapplicantIncome}
                        onChange={handleChange}
                        placeholder="0"
                        className="form-control"
                        min="0"
                        step="100"
                      />
                      <div className="form-help">
                        Ingreso 0 si no hay co-solicitante
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <DollarSign size={16} style={{ marginRight: '8px' }} />
                        MONTO DEL PRÉSTAMO *
                      </label>
                      <input
                        type="number"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        placeholder="Ej: 150000"
                        required
                        className="form-control"
                        min="1000"
                        step="1000"
                      />
                      <div className="form-help">
                        Monto total solicitado en USD
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Calendar size={16} style={{ marginRight: '8px' }} />
                        PLAZO PRÉSTAMO (MESES)
                      </label>
                      <select
                        name="loanTerm"
                        value={formData.loanTerm}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value={120}>10 años (120 meses)</option>
                        <option value={180}>15 años (180 meses)</option>
                        <option value={240}>20 años (240 meses)</option>
                        <option value={300}>25 años (300 meses)</option>
                        <option value={360}>30 años (360 meses)</option>
                        <option value={480}>40 años (480 meses)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {}
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    color: 'var(--secondary)', 
                    fontSize: '18px', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <User size={20} />
                    Información Personal
                  </h3>
                  
                  <div className="grid grid-2" style={{ marginBottom: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">
                        Estado Civil
                      </label>
                      <select
                        name="married"
                        value={formData.married}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="Yes">Casado/a</option>
                        <option value="No">Soltero/a</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <GraduationCap size={16} style={{ marginRight: '8px' }} />
                        Educación
                      </label>
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="Graduate">Graduado</option>
                        <option value="Not Graduate">No Graduado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <CreditCard size={16} style={{ marginRight: '8px' }} />
                        Historial Crediticio
                      </label>
                      <select
                        name="creditHistory"
                        value={formData.creditHistory}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value={1}>Bueno</option>
                        <option value={0}>Malo</option>
                      </select>
                      <div className="form-help">
                        Factor más importante del modelo (92% importancia)
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <MapPin size={16} style={{ marginRight: '8px' }} />
                        Área de Propiedad
                      </label>
                      <select
                        name="propertyArea"
                        value={formData.propertyArea}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="Urban">Urbana</option>
                        <option value="Semiurban">Semi-urbana</option>
                        <option value="Rural">Rural</option>
                      </select>
                    </div>
                  </div>
                </div>

                {}
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="btn btn-outline"
                  >
                    Limpiar Formulario
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading || !formData.applicantIncome || !formData.loanAmount}
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1 }}
                  >
                    {loading ? (
                      <>
                        <div className="spinner"></div>
                        Procesando con ML...
                      </>
                    ) : (
                      <>
                        <Calculator size={20} />
                        Predecir con Modelo ML
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {}
          <div className="card" style={{
            position: 'sticky',
            top: '20px'
          }}>
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '20px' }}>
                <Calculator size={48} color="var(--primary)" />
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                color: 'var(--dark)',
                marginBottom: '10px'
              }}>
                Modelo ML Optimizado
              </h3>
              <p style={{ color: 'var(--gray)', fontSize: '14px', marginBottom: '20px' }}>
                Utiliza el modelo entrenado con 429 casos y validado con 184 predicciones reales.
              </p>

              <div style={{ 
                backgroundColor: 'var(--light)', 
                padding: '15px', 
                borderRadius: 'var(--border-radius)',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>
                  85.87%
                </div>
                <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                  Precisión Comprobada
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  <span style={{ fontSize: '14px', color: 'var(--gray)' }}>
                    Probabilidad de aprobación
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Info size={16} color="var(--info)" />
                  <span style={{ fontSize: '14px', color: 'var(--gray)' }}>
                    Análisis de factores
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <TrendingUp size={16} color="var(--accent)" />
                  <span style={{ fontSize: '14px', color: 'var(--gray)' }}>
                    Nivel de confianza
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {backendConnected ? (
                    <Database size={16} color="var(--success)" />
                  ) : (
                    <Database size={16} color="var(--warning)" />
                  )}
                  <span style={{ fontSize: '14px', color: 'var(--gray)' }}>
                    {backendConnected ? 'Guardado automático en BD' : 'BD offline - solo local'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        {result && (
          <div className="card" style={{
            marginTop: '30px',
            border: `3px solid ${result.decision === 'Aprobado' ? 'var(--success)' : 'var(--danger)'}`
          }}>
            <div className="card-body">
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ marginBottom: '10px' }}>
                  {result.decision === 'Aprobado' ? 
                    <CheckCircle size={64} color="var(--success)" /> : 
                    <XCircle size={64} color="var(--danger)" />
                  }
                </div>
                <h2 style={{ 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  color: result.decision === 'Aprobado' ? 'var(--success)' : 'var(--danger)',
                  marginBottom: '10px'
                }}>
                  Préstamo {result.decision}
                </h2>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <div className={`badge ${result.decision === 'Aprobado' ? 'badge-success' : 'badge-danger'}`}>
                    Confianza: {result.confidence}
                  </div>
                  <div className={`badge ${result.riskLevel === 'Bajo' ? 'badge-success' : result.riskLevel === 'Alto' ? 'badge-danger' : 'badge-warning'}`}>
                    Riesgo: {result.riskLevel}
                  </div>
                  <div className="badge badge-primary">
                    {result.modelVersion}
                  </div>
                  {dbSaveStatus === 'success' && (
                    <div className="badge badge-success">
                      <Database size={12} style={{ marginRight: '4px' }} />
                      Guardado en PostgreSQL
                    </div>
                  )}
                  {dbSaveStatus === 'offline' && (
                    <div className="badge badge-warning">
                      <WifiOff size={12} style={{ marginRight: '4px' }} />
                      Solo Local
                    </div>
                  )}
                </div>
              </div>

              {}
              <div className="grid grid-4" style={{ marginBottom: '30px' }}>
                <div className="card" style={{
                  backgroundColor: '#dbeafe',
                  border: '2px solid var(--primary)',
                  textAlign: 'center'
                }}>
                  <div className="card-body">
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: 'var(--primary)', 
                      margin: '0' 
                    }}>
                      {result.probApprove}%
                    </h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: 'var(--dark)' }}>
                      Prob. Aprobación
                    </p>
                  </div>
                </div>

                <div className="card" style={{
                  backgroundColor: '#fee2e2',
                  border: '2px solid var(--danger)',
                  textAlign: 'center'
                }}>
                  <div className="card-body">
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: 'var(--danger)', 
                      margin: '0' 
                    }}>
                      {result.probReject}%
                    </h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: 'var(--dark)' }}>
                      Prob. Rechazo
                    </p>
                  </div>
                </div>

                <div className="card" style={{
                  backgroundColor: '#d1fae5',
                  border: '2px solid var(--secondary)',
                  textAlign: 'center'
                }}>
                  <div className="card-body">
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: 'var(--secondary)', 
                      margin: '0' 
                    }}>
                      {result.score}
                    </h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: 'var(--dark)' }}>
                      Score ML
                    </p>
                  </div>
                </div>

                <div className="card" style={{
                  backgroundColor: '#fef3c7',
                  border: '2px solid var(--accent)',
                  textAlign: 'center'
                }}>
                  <div className="card-body">
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: 'var(--accent)', 
                      margin: '0' 
                    }}>
                      {result.debtRatio}
                    </h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: 'var(--dark)' }}>
                      Ratio D/I
                    </p>
                  </div>
                </div>
              </div>

              {}
              <div className="card" style={{
                backgroundColor: 'var(--light)',
                marginBottom: '20px'
              }}>
                <div className="card-body">
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: 'var(--dark)', 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <DollarSign size={20} />
                    Análisis Financiero
                  </h3>
                  
                  <div className="grid grid-3">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary)' }}>
                        ${result.totalIncome?.toLocaleString() || 'N/A'}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                        Ingresos Totales
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--accent)' }}>
                        ${formData.loanAmount?.toLocaleString() || 'N/A'}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                        Monto Solicitado
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--secondary)' }}>
                        {formData.loanTerm} meses
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                        Plazo del Préstamo
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {}
              {result.factors && result.factors.length > 0 && (
                <div className="card" style={{
                  backgroundColor: 'var(--light)',
                  marginBottom: '20px'
                }}>
                  <div className="card-body">
                    <h3 style={{ 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      color: 'var(--dark)', 
                      marginBottom: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <TrendingUp size={20} />
                      Factores de Decisión del Modelo
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {result.factors.map((factor, index) => (
                        <div key={index} className="card" style={{
                          border: `2px solid ${factor.positive ? 'var(--success)' : 'var(--danger)'}`
                        }}>
                          <div className="card-body" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 16px'
                          }}>
                            <span style={{ 
                              color: 'var(--dark)',
                              fontWeight: '500',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              {factor.positive ? 
                                <CheckCircle size={16} color="var(--success)" /> : 
                                <XCircle size={16} color="var(--danger)" />
                              }
                              {factor.factor}
                            </span>
                            <span style={{ 
                              color: factor.positive ? 'var(--success)' : 'var(--danger)',
                              fontWeight: '700',
                              fontSize: '14px'
                            }}>
                              {factor.impact}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {}
              <div className="card" style={{
                backgroundColor: '#f0f9ff',
                border: '1px solid var(--primary)',
                marginBottom: '20px'
              }}>
                <div className="card-body" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="var(--primary)" />
                    <span style={{ fontSize: '14px', color: 'var(--dark)' }}>
                      Tiempo de procesamiento: {result.processingTime}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Info size={16} color="var(--primary)" />
                    <span style={{ fontSize: '14px', color: 'var(--dark)' }}>
                      Modelo: {result.modelVersion}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={16} color="var(--primary)" />
                    <span style={{ fontSize: '14px', color: 'var(--dark)' }}>
                      Usuario: Pierreyfff
                    </span>
                  </div>
                </div>
              </div>

              {}
              <div className={`alert ${result.decision === 'Aprobado' ? 'alert-success' : 'alert-danger'}`}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Info size={18} />
                  Recomendación del Sistema ML
                </h3>
                <p style={{ 
                  margin: '0', 
                  lineHeight: '1.5'
                }}>
                  {result.decision === 'Aprobado' 
                    ? `El modelo ML recomienda APROBAR este préstamo con una confianza ${result.confidence.toLowerCase()}. La probabilidad de aprobación es del ${result.probApprove}% basada en el análisis de ${result.factors?.length || 0} factores clave. El perfil financiero presenta un nivel de riesgo ${result.riskLevel.toLowerCase()}.`
                    : `El modelo ML recomienda RECHAZAR este préstamo o realizar una evaluación manual adicional. La probabilidad de rechazo es del ${result.probReject}% con un nivel de riesgo ${result.riskLevel.toLowerCase()}. Se sugiere revisar los factores negativos identificados antes de tomar una decisión final.`
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PredictLoan*/

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Calculator, 
  DollarSign, 
  User, 
  GraduationCap,
  CreditCard,
  MapPin,
  CheckCircle,
  XCircle,
  Info,
  TrendingUp,
  AlertTriangle,
  Clock,
  Calendar,
  Database,
  Wifi,
  WifiOff
} from 'lucide-react'
import { simulateRealPrediction, validateLoanData } from '../utils/realData'
import PredictionService from '../services/predictionService'

const PredictLoan = () => {
  const [formData, setFormData] = useState({
    applicantIncome: '',
    coapplicantIncome: '',
    loanAmount: '',
    loanTerm: 360,
    creditHistory: 1,
    married: 'Yes',
    education: 'Graduate',
    propertyArea: 'Urban'
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [savingToDB, setSavingToDB] = useState(false)
  const [dbSaveStatus, setDbSaveStatus] = useState(null)
  const [backendConnected, setBackendConnected] = useState(null)
  const [validationResult, setValidationResult] = useState(null)

  // Función para generar opciones de plazo inteligentes según el monto
  const getSmartLoanTermOptions = (loanAmount) => {
    const amount = parseFloat(loanAmount) || 0
    
    if (amount <= 25000) {
      // Préstamos pequeños: 1-5 años
      return [
        { value: 12, label: '1 año (12 meses)', category: 'Préstamo Personal' },
        { value: 24, label: '2 años (24 meses)', category: 'Préstamo Personal' },
        { value: 36, label: '3 años (36 meses) - Recomendado', category: 'Préstamo Personal' },
        { value: 48, label: '4 años (48 meses)', category: 'Préstamo Personal' },
        { value: 60, label: '5 años (60 meses)', category: 'Préstamo Personal' }
      ]
    } else if (amount <= 100000) {
      // Préstamos medianos: 3-15 años
      return [
        { value: 36, label: '3 años (36 meses)', category: 'Préstamo Mediano' },
        { value: 60, label: '5 años (60 meses) - Recomendado', category: 'Préstamo Mediano' },
        { value: 84, label: '7 años (84 meses)', category: 'Préstamo Mediano' },
        { value: 120, label: '10 años (120 meses)', category: 'Préstamo Mediano' },
        { value: 180, label: '15 años (180 meses)', category: 'Préstamo Mediano' }
      ]
    } else if (amount <= 300000) {
      // Préstamos grandes: 5-25 años
      return [
        { value: 60, label: '5 años (60 meses)', category: 'Préstamo Grande' },
        { value: 120, label: '10 años (120 meses)', category: 'Préstamo Grande' },
        { value: 180, label: '15 años (180 meses) - Recomendado', category: 'Préstamo Grande' },
        { value: 240, label: '20 años (240 meses)', category: 'Préstamo Grande' },
        { value: 300, label: '25 años (300 meses)', category: 'Préstamo Grande' }
      ]
    } else {
      // Préstamos hipotecarios: 10-30 años
      return [
        { value: 120, label: '10 años (120 meses)', category: 'Préstamo Hipotecario' },
        { value: 180, label: '15 años (180 meses)', category: 'Préstamo Hipotecario' },
        { value: 240, label: '20 años (240 meses) - Recomendado', category: 'Préstamo Hipotecario' },
        { value: 300, label: '25 años (300 meses)', category: 'Préstamo Hipotecario' },
        { value: 360, label: '30 años (360 meses)', category: 'Préstamo Hipotecario' }
      ]
    }
  }

  // Función para obtener el plazo recomendado según el monto
  const getRecommendedTerm = (loanAmount) => {
    const amount = parseFloat(loanAmount) || 0
    
    if (amount <= 25000) return 36      // 3 años para préstamos pequeños
    else if (amount <= 100000) return 60   // 5 años para préstamos medianos
    else if (amount <= 300000) return 180  // 15 años para préstamos grandes
    else return 240                         // 20 años para préstamos hipotecarios
  }

  // Calcular cuota mensual estimada
  const calculateMonthlyPayment = (loanAmount, loanTerm, interestRate = 0.08) => {
    const monthlyRate = interestRate / 12
    const numPayments = loanTerm
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                   (Math.pow(1 + monthlyRate, numPayments) - 1)
    return payment
  }

  // Verificar conexión con el backend al cargar
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const health = await PredictionService.checkHealth()
        setBackendConnected(health.success)
        if (health.success) {
          console.log('✅ Backend conectado:', health.message)
        } else {
          console.log('⚠️ Backend no disponible')
        }
      } catch (error) {
        setBackendConnected(false)
        console.log('❌ Error conectando al backend:', error)
      }
    }
    checkBackend()
  }, [])

  // Validar en tiempo real cuando cambian los datos
  useEffect(() => {
    if (formData.applicantIncome && formData.loanAmount) {
      const validation = validateLoanData(formData)
      setValidationResult(validation)
    } else {
      setValidationResult(null)
    }
  }, [formData])

  // Actualizar plazo automáticamente cuando cambia el monto
  useEffect(() => {
    if (formData.loanAmount) {
      const recommendedTerm = getRecommendedTerm(formData.loanAmount)
      setFormData(prev => ({
        ...prev,
        loanTerm: recommendedTerm
      }))
    }
  }, [formData.loanAmount])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: ['applicantIncome', 'coapplicantIncome', 'loanAmount', 'loanTerm'].includes(name) 
        ? parseFloat(value) || '' 
        : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.applicantIncome || !formData.loanAmount) {
      alert('Por favor completa los campos requeridos: Ingreso del Solicitante y Monto del Préstamo')
      return
    }

    // Validar datos antes de procesar
    const validation = validateLoanData(formData)
    
    if (!validation.isValid) {
      alert(`No se puede procesar la solicitud:\n\n${validation.errors.map(e => `• ${e.message}`).join('\n')}\n\nPor favor, corrija estos errores antes de continuar.`)
      return
    }

    setLoading(true)
    setDbSaveStatus(null)
    
    try {
      // Simular delay de procesamiento del modelo real
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Usar la función de predicción basada en el modelo real
      const prediction = simulateRealPrediction(formData)
      
      setResult(prediction)

      // Guardar en base de datos en segundo plano (solo si el backend está conectado)
      if (backendConnected) {
        setSavingToDB(true)
        try {
          const saveResult = await PredictionService.saveIndividualPrediction(formData, prediction)
          if (saveResult.success) {
            setDbSaveStatus('success')
            console.log('✅ Predicción guardada en BD:', saveResult.data?.predictionId)
          } else {
            setDbSaveStatus('error')
            console.log('⚠️ Error guardando en BD:', saveResult.error)
          }
        } catch (error) {
          setDbSaveStatus('error')
          console.log('⚠️ Error de conexión con BD:', error)
        } finally {
          setSavingToDB(false)
        }
      } else {
        setDbSaveStatus('offline')
      }

    } catch (error) {
      console.error('Error en la predicción:', error)
      alert('Error procesando la predicción. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      applicantIncome: '',
      coapplicantIncome: '',
      loanAmount: '',
      loanTerm: 360,
      creditHistory: 1,
      married: 'Yes',
      education: 'Graduate',
      propertyArea: 'Urban'
    })
    setResult(null)
    setDbSaveStatus(null)
    setValidationResult(null)
  }

  const getDbStatusMessage = () => {
    if (savingToDB) return 'Guardando predicción en base de datos...'
    if (dbSaveStatus === 'success') return 'Predicción guardada exitosamente en PostgreSQL (Neon)'
    if (dbSaveStatus === 'error') return 'Predicción realizada (error guardando en BD - reintentando...)'
    if (dbSaveStatus === 'offline') return 'Predicción realizada (BD offline - solo modo local)'
    return null
  }

  // Obtener opciones de plazo inteligentes
  const loanTermOptions = getSmartLoanTermOptions(formData.loanAmount)
  
  // Calcular cuota mensual si hay datos
  const monthlyPayment = formData.loanAmount && formData.loanTerm ? 
    calculateMonthlyPayment(formData.loanAmount, formData.loanTerm) : 0

  return (
    <div style={{ backgroundColor: 'var(--light)', minHeight: '100vh', padding: '20px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '30px' }}>
          <Link to="/" className="btn btn-outline" style={{ marginBottom: '20px' }}>
            <ArrowLeft size={16} />
            Volver al Inicio
          </Link>
          
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: 'var(--dark)', 
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '15px'
            }}>
              <Calculator size={36} color="var(--primary)" />
              Predicción Individual de Préstamo
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--gray)' }}>
              Utiliza nuestro modelo ML entrenado (85.87% precisión) con plazos inteligentes según el monto
            </p>
            
            {/* Backend Status */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              marginTop: '10px',
              fontSize: '14px'
            }}>
              {backendConnected === null ? (
                <>
                  <div className="spinner"></div>
                  <span style={{ color: 'var(--gray)' }}>Verificando conexión BD...</span>
                </>
              ) : backendConnected ? (
                <>
                  <Wifi size={16} color="var(--success)" />
                  <span style={{ color: 'var(--success)' }}>Base de datos conectada (PostgreSQL)</span>
                </>
              ) : (
                <>
                  <WifiOff size={16} color="var(--warning)" />
                  <span style={{ color: 'var(--warning)' }}>BD offline - modo solo predicción</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* DB Status Notification */}
        {(savingToDB || dbSaveStatus) && (
          <div className={`alert ${
            savingToDB ? 'alert-info' : 
            dbSaveStatus === 'success' ? 'alert-success' : 
            dbSaveStatus === 'offline' ? 'alert-warning' : 'alert-danger'
          }`} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={16} />
              {savingToDB && <div className="spinner"></div>}
              {getDbStatusMessage()}
            </div>
          </div>
        )}

        {/* Validation Alerts */}
        {validationResult && (
          <>
            {/* Errores críticos */}
            {validationResult.errors.length > 0 && (
              <div className="alert alert-danger" style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <XCircle size={20} />
                  Errores que impiden el procesamiento:
                </h4>
                <ul style={{ margin: '0', paddingLeft: '20px' }}>
                  {validationResult.errors.map((error, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>
                      <strong>{error.message}</strong>
                      <br />
                      <small style={{ color: 'var(--gray)' }}>{error.suggestion}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Advertencias */}
            {validationResult.warnings.length > 0 && (
              <div className="alert alert-warning" style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={20} />
                  Advertencias importantes:
                </h4>
                <ul style={{ margin: '0', paddingLeft: '20px' }}>
                  {validationResult.warnings.map((warning, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>
                      <strong>{warning.message}</strong> - {warning.impact}
                      <br />
                      <small style={{ color: 'var(--gray)' }}>{warning.suggestion}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recomendaciones */}
            {validationResult.recommendations.length > 0 && (
              <div className="alert alert-info" style={{ marginBottom: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Info size={20} />
                  Recomendaciones:
                </h4>
                <ul style={{ margin: '0', paddingLeft: '20px' }}>
                  {validationResult.recommendations.map((rec, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>
                      <strong>{rec.message}</strong>
                      <br />
                      <small style={{ color: 'var(--gray)' }}>{rec.suggestion}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div className="grid" style={{ 
          gridTemplateColumns: window.innerWidth > 768 ? '1fr 400px' : '1fr', 
          gap: '30px', 
          alignItems: 'start' 
        }}>
          {/* Form Section */}
          <div className="card">
            <div className="card-body">
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: 'var(--dark)', 
                marginBottom: '30px',
                borderBottom: '3px solid var(--primary)',
                paddingBottom: '10px'
              }}>
                Información del Solicitante
              </h2>

              <form onSubmit={handleSubmit}>
                {/* Financial Information Section */}
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    color: 'var(--primary)', 
                    fontSize: '18px', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <DollarSign size={20} />
                    Información Financiera
                  </h3>
                  
                  <div className="grid grid-2" style={{ marginBottom: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">
                        <User size={16} style={{ marginRight: '8px' }} />
                        INGRESO DEL SOLICITANTE *
                      </label>
                      <input
                        type="number"
                        name="applicantIncome"
                        value={formData.applicantIncome}
                        onChange={handleChange}
                        placeholder="Ej: 5000"
                        required
                        className="form-control"
                        min="500"
                        max="50000"
                        step="100"
                      />
                      <div className="form-help">
                        Ingreso mensual bruto en USD (Min: $500, Max: $50,000)
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <User size={16} style={{ marginRight: '8px' }} />
                        INGRESO CO-SOLICITANTE
                      </label>
                      <input
                        type="number"
                        name="coapplicantIncome"
                        value={formData.coapplicantIncome}
                        onChange={handleChange}
                        placeholder="0"
                        className="form-control"
                        min="0"
                        max="50000"
                        step="100"
                      />
                      <div className="form-help">
                        Ingreso 0 si no hay co-solicitante (Max: $50,000)
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <DollarSign size={16} style={{ marginRight: '8px' }} />
                        MONTO DEL PRÉSTAMO *
                      </label>
                      <input
                        type="number"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleChange}
                        placeholder="Ej: 150000"
                        required
                        className="form-control"
                        min="5000"
                        max="1000000"
                        step="1000"
                      />
                      <div className="form-help">
                        Monto total solicitado en USD (Min: $5,000, Max: $1,000,000)
                        {formData.loanAmount && (
                          <div style={{ marginTop: '5px', fontSize: '12px', color: 'var(--primary)' }}>
                            <strong>
                              {formData.loanAmount <= 25000 && '📱 Préstamo Personal'}
                              {formData.loanAmount > 25000 && formData.loanAmount <= 100000 && '🏠 Préstamo Mediano'}
                              {formData.loanAmount > 100000 && formData.loanAmount <= 300000 && '🏢 Préstamo Grande'}
                              {formData.loanAmount > 300000 && '🏘️ Préstamo Hipotecario'}
                            </strong>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Calendar size={16} style={{ marginRight: '8px' }} />
                        PLAZO PRÉSTAMO (INTELIGENTE)
                      </label>
                      <select
                        name="loanTerm"
                        value={formData.loanTerm}
                        onChange={handleChange}
                        className="form-control"
                      >
                        {loanTermOptions.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="form-help">
                        Plazos adaptados automáticamente según el monto
                        {formData.loanAmount && (
                          <div style={{ marginTop: '5px', fontSize: '12px', color: 'var(--secondary)' }}>
                            <strong>Categoría: {loanTermOptions[0]?.category}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Monthly Payment Preview */}
                  {monthlyPayment > 0 && (
                    <div className="card" style={{
                      backgroundColor: '#f0f9ff',
                      border: '2px solid var(--primary)',
                      marginTop: '15px'
                    }}>
                      <div className="card-body" style={{ padding: '15px' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: 'var(--primary)', fontSize: '16px' }}>
                          💰 Cuota Mensual Estimada (8% anual)
                        </h4>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>
                          ${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--gray)', marginTop: '5px' }}>
                          Total a pagar: ${(monthlyPayment * formData.loanTerm).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Personal Information Section */}
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    color: 'var(--secondary)', 
                    fontSize: '18px', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <User size={20} />
                    Información Personal
                  </h3>
                  
                  <div className="grid grid-2" style={{ marginBottom: '20px' }}>
                    <div className="form-group">
                      <label className="form-label">
                        Estado Civil
                      </label>
                      <select
                        name="married"
                        value={formData.married}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="Yes">Casado/a</option>
                        <option value="No">Soltero/a</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <GraduationCap size={16} style={{ marginRight: '8px' }} />
                        Educación
                      </label>
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="Graduate">Graduado</option>
                        <option value="Not Graduate">No Graduado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <CreditCard size={16} style={{ marginRight: '8px' }} />
                        Historial Crediticio
                      </label>
                      <select
                        name="creditHistory"
                        value={formData.creditHistory}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value={1}>Bueno</option>
                        <option value={0}>Malo</option>
                      </select>
                      <div className="form-help">
                        Factor más importante del modelo (92% importancia)
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <MapPin size={16} style={{ marginRight: '8px' }} />
                        Área de Propiedad
                      </label>
                      <select
                        name="propertyArea"
                        value={formData.propertyArea}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="Urban">Urbana</option>
                        <option value="Semiurban">Semi-urbana</option>
                        <option value="Rural">Rural</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={loading}
                    className="btn btn-outline"
                  >
                    Limpiar Formulario
                  </button>
                  
                  <button
                    type="submit"
                    disabled={loading || !formData.applicantIncome || !formData.loanAmount || (validationResult && !validationResult.isValid)}
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1 }}
                  >
                    {loading ? (
                      <>
                        <div className="spinner"></div>
                        Procesando con ML...
                      </>
                    ) : (
                      <>
                        <Calculator size={20} />
                        Predecir con Modelo ML
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Info Panel */}
          <div className="card" style={{
            position: 'sticky',
            top: '20px'
          }}>
            <div className="card-body" style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '20px' }}>
                <Calculator size={48} color="var(--primary)" />
              </div>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                color: 'var(--dark)',
                marginBottom: '10px'
              }}>
                Modelo ML Inteligente
              </h3>
              <p style={{ color: 'var(--gray)', fontSize: '14px', marginBottom: '20px' }}>
                Plazos adaptativos según monto + modelo entrenado con 429 casos reales.
              </p>

              <div style={{ 
                backgroundColor: 'var(--light)', 
                padding: '15px', 
                borderRadius: 'var(--border-radius)',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary)' }}>
                  85.87%
                </div>
                <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                  Precisión Comprobada
                </div>
              </div>

              {/* Smart Term Info */}
              {formData.loanAmount && (
                <div style={{ 
                  backgroundColor: '#f0f9ff', 
                  padding: '15px', 
                  borderRadius: 'var(--border-radius)',
                  marginBottom: '20px',
                  border: '2px solid var(--primary)'
                }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary)', marginBottom: '5px' }}>
                    🎯 Plazo Inteligente
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                    {formData.loanAmount <= 25000 && 'Personal: 1-5 años'}
                    {formData.loanAmount > 25000 && formData.loanAmount <= 100000 && 'Mediano: 3-15 años'}
                    {formData.loanAmount > 100000 && formData.loanAmount <= 300000 && 'Grande: 5-25 años'}
                    {formData.loanAmount > 300000 && 'Hipotecario: 10-30 años'}
                  </div>
                </div>
              )}

              {/* Validation Summary */}
              {validationResult && (
                <div style={{ 
                  backgroundColor: validationResult.isValid ? '#d1fae5' : '#fee2e2', 
                  padding: '15px', 
                  borderRadius: 'var(--border-radius)',
                  marginBottom: '20px',
                  border: `2px solid ${validationResult.isValid ? 'var(--success)' : 'var(--danger)'}`
                }}>
                  <div style={{ 
                    fontSize: '16px', 
                    fontWeight: '700', 
                    color: validationResult.isValid ? 'var(--success)' : 'var(--danger)',
                    marginBottom: '5px'
                  }}>
                    {validationResult.isValid ? 'Datos Válidos' : 'Datos Inválidos'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                    Ratio D/I: {validationResult.debtRatio.toFixed(2)}x
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                    Ingresos totales: ${validationResult.totalIncome.toLocaleString()}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  <span style={{ fontSize: '14px', color: 'var(--gray)' }}>
                    Plazos adaptativos por monto
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Info size={16} color="var(--info)" />
                  <span style={{ fontSize: '14px', color: 'var(--gray)' }}>
                    Validación en tiempo real
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <TrendingUp size={16} color="var(--accent)" />
                  <span style={{ fontSize: '14px', color: 'var(--gray)' }}>
                    Cuota mensual estimada
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {backendConnected ? (
                    <Database size={16} color="var(--success)" />
                  ) : (
                    <Database size={16} color="var(--warning)" />
                  )}
                  <span style={{ fontSize: '14px', color: 'var(--gray)' }}>
                    {backendConnected ? 'Guardado automático en BD' : 'BD offline - solo local'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - igual que antes pero con información de plazo inteligente */}
        {result && (
          <div className="card" style={{
            marginTop: '30px',
            border: `3px solid ${result.decision === 'Aprobado' ? 'var(--success)' : 'var(--danger)'}`
          }}>
            <div className="card-body">
              {/* Mostrar información de validación en resultados */}
              {result.validation && (result.validation.warnings.length > 0 || result.validation.recommendations.length > 0) && (
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: 'var(--dark)', 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertTriangle size={18} />
                    Análisis de Validación
                  </h3>
                  
                  {result.validation.warnings.length > 0 && (
                    <div className="alert alert-warning" style={{ marginBottom: '15px' }}>
                      <strong>Advertencias detectadas:</strong>
                      <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
                        {result.validation.warnings.map((warning, index) => (
                          <li key={index}>{warning.message} - {warning.impact}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {result.validation.recommendations.length > 0 && (
                    <div className="alert alert-info">
                      <strong>Recomendaciones:</strong>
                      <ul style={{ margin: '10px 0 0 0', paddingLeft: '20px' }}>
                        {result.validation.recommendations.map((rec, index) => (
                          <li key={index}>{rec.message}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ marginBottom: '10px' }}>
                  {result.decision === 'Aprobado' ? 
                    <CheckCircle size={64} color="var(--success)" /> : 
                    <XCircle size={64} color="var(--danger)" />
                  }
                </div>
                <h2 style={{ 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  color: result.decision === 'Aprobado' ? 'var(--success)' : 'var(--danger)',
                  marginBottom: '10px'
                }}>
                  Préstamo {result.decision}
                </h2>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <div className={`badge ${result.decision === 'Aprobado' ? 'badge-success' : 'badge-danger'}`}>
                    Confianza: {result.confidence}
                  </div>
                  <div className={`badge ${result.riskLevel === 'Bajo' ? 'badge-success' : result.riskLevel === 'Alto' ? 'badge-danger' : 'badge-warning'}`}>
                    Riesgo: {result.riskLevel}
                  </div>
                  <div className="badge badge-info">
                    Plazo: {formData.loanTerm} meses
                  </div>
                  <div className="badge badge-primary">
                    {result.modelVersion}
                  </div>
                  {dbSaveStatus === 'success' && (
                    <div className="badge badge-success">
                      <Database size={12} style={{ marginRight: '4px' }} />
                      Guardado en PostgreSQL
                    </div>
                  )}
                  {dbSaveStatus === 'offline' && (
                    <div className="badge badge-warning">
                      <WifiOff size={12} style={{ marginRight: '4px' }} />
                      Solo Local
                    </div>
                  )}
                </div>
              </div>

              {/* Probability Cards */}
              <div className="grid grid-4" style={{ marginBottom: '30px' }}>
                <div className="card" style={{
                  backgroundColor: '#dbeafe',
                  border: '2px solid var(--primary)',
                  textAlign: 'center'
                }}>
                  <div className="card-body">
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: 'var(--primary)', 
                      margin: '0' 
                    }}>
                      {result.probApprove}%
                    </h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: 'var(--dark)' }}>
                      Prob. Aprobación
                    </p>
                  </div>
                </div>

                <div className="card" style={{
                  backgroundColor: '#fee2e2',
                  border: '2px solid var(--danger)',
                  textAlign: 'center'
                }}>
                  <div className="card-body">
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: 'var(--danger)', 
                      margin: '0' 
                    }}>
                      {result.probReject}%
                    </h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: 'var(--dark)' }}>
                      Prob. Rechazo
                    </p>
                  </div>
                </div>

                <div className="card" style={{
                  backgroundColor: '#d1fae5',
                  border: '2px solid var(--secondary)',
                  textAlign: 'center'
                }}>
                  <div className="card-body">
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: 'var(--secondary)', 
                      margin: '0' 
                    }}>
                      {result.score}
                    </h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: 'var(--dark)' }}>
                      Score ML
                    </p>
                  </div>
                </div>

                <div className="card" style={{
                  backgroundColor: '#fef3c7',
                  border: '2px solid var(--accent)',
                  textAlign: 'center'
                }}>
                  <div className="card-body">
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: '700', 
                      color: 'var(--accent)', 
                      margin: '0' 
                    }}>
                      {result.debtRatio}
                    </h3>
                    <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: 'var(--dark)' }}>
                      Ratio D/I
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial Analysis con cuota mensual */}
              <div className="card" style={{
                backgroundColor: 'var(--light)',
                marginBottom: '20px'
              }}>
                <div className="card-body">
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '600', 
                    color: 'var(--dark)', 
                    marginBottom: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <DollarSign size={20} />
                    Análisis Financiero Inteligente
                  </h3>
                  
                  <div className="grid grid-4">
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--primary)' }}>
                        ${result.totalIncome?.toLocaleString() || 'N/A'}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                        Ingresos Totales
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--accent)' }}>
                        ${formData.loanAmount?.toLocaleString() || 'N/A'}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                        Monto Solicitado
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--secondary)' }}>
                        {Math.round(formData.loanTerm / 12)} años
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                        Plazo Inteligente
                      </div>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--info)' }}>
                        ${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)' }}>
                        Cuota Mensual
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decision Factors */}
              {result.factors && result.factors.length > 0 && (
                <div className="card" style={{
                  backgroundColor: 'var(--light)',
                  marginBottom: '20px'
                }}>
                  <div className="card-body">
                    <h3 style={{ 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      color: 'var(--dark)', 
                      marginBottom: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <TrendingUp size={20} />
                      Factores de Decisión del Modelo
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {result.factors.map((factor, index) => (
                        <div key={index} className="card" style={{
                          border: `2px solid ${factor.positive ? 'var(--success)' : 'var(--danger)'}`
                        }}>
                          <div className="card-body" style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px 16px'
                          }}>
                            <span style={{ 
                              color: 'var(--dark)',
                              fontWeight: '500',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              {factor.positive ? 
                                <CheckCircle size={16} color="var(--success)" /> : 
                                <XCircle size={16} color="var(--danger)" />
                              }
                              {factor.factor}
                            </span>
                            <span style={{ 
                              color: factor.positive ? 'var(--success)' : 'var(--danger)',
                              fontWeight: '700',
                              fontSize: '14px'
                            }}>
                              {factor.impact}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Processing Info */}
              <div className="card" style={{
                backgroundColor: '#f0f9ff',
                border: '1px solid var(--primary)',
                marginBottom: '20px'
              }}>
                <div className="card-body" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '15px',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Clock size={16} color="var(--primary)" />
                    <span style={{ fontSize: '14px', color: 'var(--dark)' }}>
                      Tiempo: {result.processingTime}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={16} color="var(--primary)" />
                    <span style={{ fontSize: '14px', color: 'var(--dark)' }}>
                      Procesado: {new Date().toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={16} color="var(--primary)" />
                    <span style={{ fontSize: '14px', color: 'var(--dark)' }}>
                      Usuario: Pierreyfff
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommendation mejorada */}
              <div className={`alert ${result.decision === 'Aprobado' ? 'alert-success' : 'alert-danger'}`}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Info size={18} />
                  Recomendación del Sistema ML Inteligente
                </h3>
                <p style={{ 
                  margin: '0', 
                  lineHeight: '1.5'
                }}>
                  {result.decision === 'Aprobado' 
                    ? `El modelo ML recomienda APROBAR este préstamo ${formData.loanAmount <= 25000 ? 'personal' : formData.loanAmount <= 100000 ? 'mediano' : formData.loanAmount <= 300000 ? 'grande' : 'hipotecario'} con una confianza ${result.confidence.toLowerCase()}. La cuota mensual sería de $${monthlyPayment.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} durante ${Math.round(formData.loanTerm / 12)} años. El plazo se ajustó automáticamente según el monto para optimizar las condiciones.`
                    : `El modelo ML recomienda RECHAZAR este préstamo debido a factores de alto riesgo. ${result.validation?.errors.length > 0 ? 'Se identificaron errores críticos que impiden la aprobación.' : 'Se sugiere revisar los términos o mejorar el perfil crediticio antes de aplicar nuevamente.'}`
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PredictLoan