import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Calculator, 
  BarChart3, 
  TrendingUp, 
  Database,
  CheckCircle,
  AlertTriangle,
  Target,
  Users,
  Building2,
  Shield,
  Award,
  Clock,
  ArrowRight,
  Brain
} from 'lucide-react'
import { realModelData } from '../utils/realData'

const Dashboard = () => {
  // Usar métricas reales del modelo
  const { metrics, baseline, errorAnalysis } = realModelData

  return (
    <div style={{ backgroundColor: 'var(--light)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)',
        borderRadius: 'var(--border-radius-lg)',
        margin: '20px',
        padding: '80px 40px',
        textAlign: 'center',
        color: 'var(--white)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat',
          opacity: 0.1
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '20px' 
          }}>
            <Brain size={64} />
          </div>
          <h1 style={{
            fontSize: '48px',
            fontWeight: '800',
            margin: '0 0 20px 0',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            LoanPredict Pro
          </h1>
          <p style={{
            fontSize: '24px',
            margin: '0 auto 40px auto',
            opacity: 0.9,
            maxWidth: '800px',
            fontWeight: '400'
          }}>
            Sistema inteligente de predicción de préstamos con Machine Learning
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <Link to="/predict" className="btn btn-lg" style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              color: 'var(--white)',
              border: '2px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(10px)'
            }}>
              <Calculator size={20} />
              Predecir Préstamo
            </Link>
            
            <Link to="/analysis" className="btn btn-lg btn-outline" style={{
              backgroundColor: 'transparent',
              color: 'var(--white)',
              border: '2px solid rgba(255,255,255,0.5)'
            }}>
              <TrendingUp size={20} />
              Ver Análisis
            </Link>
          </div>
        </div>
      </section>

      {/* Real Model Performance Banner */}
      <section className="container" style={{ padding: '20px' }}>
        <div className="alert alert-success" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h3 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Award size={24} />
            Modelo ML Entrenado y Validado
          </h3>
          <p style={{ margin: '0', fontSize: '16px' }}>
            <strong>Precisión: {metrics.accuracy}%</strong> • 
            <strong> Recall: {metrics.recall}%</strong> • 
            <strong> F1-Score: {metrics.f1Score}%</strong> • 
            Entrenado con {realModelData.modelConfig.trainingDataSize} casos reales
          </p>
        </div>
      </section>

      {/* Contribution Section */}
      <section className="container" style={{ padding: '60px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: 'var(--dark)', 
            marginBottom: '20px' 
          }}>
            Nuestra Contribución al Sector Financiero
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--gray)', 
            maxWidth: '800px', 
            margin: '0 auto' 
          }}>
            Democratizamos el acceso a tecnología de Machine Learning avanzada para la evaluación crediticia, 
            beneficiando tanto a usuarios individuales como a instituciones financieras.
          </p>
        </div>

        <div className="grid grid-2" style={{ gap: '30px', marginBottom: '60px' }}>
          {/* Para Usuarios */}
          <div className="card" style={{
            border: '3px solid #dbeafe',
            textAlign: 'center'
          }}>
            <div className="card-body">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '20px' 
              }}>
                <Users size={48} color="var(--primary)" />
              </div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: 'var(--dark)', 
                marginBottom: '20px' 
              }}>
                Para Usuarios
              </h3>
              <ul style={{ 
                textAlign: 'left', 
                color: 'var(--gray)', 
                lineHeight: '1.8',
                listStyle: 'none',
                padding: 0
              }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  Evaluación crediticia instantánea y gratuita
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  Transparencia total en el proceso de decisión
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  Análisis detallado de factores de riesgo
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  Recomendaciones para mejorar el perfil crediticio
                </li>
              </ul>
            </div>
          </div>

          {/* Para Entidades */}
          <div className="card" style={{
            border: '3px solid #d1fae5',
            textAlign: 'center'
          }}>
            <div className="card-body">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginBottom: '20px' 
              }}>
                <Building2 size={48} color="var(--secondary)" />
              </div>
              <h3 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: 'var(--dark)', 
                marginBottom: '20px' 
              }}>
                Para Entidades Financieras
              </h3>
              <ul style={{ 
                textAlign: 'left', 
                color: 'var(--gray)', 
                lineHeight: '1.8',
                listStyle: 'none',
                padding: 0
              }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  Automatización del proceso de aprobación
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  Reducción de riesgo crediticio ({metrics.accuracy}% precisión comprobada)
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  Procesamiento masivo de solicitudes
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={16} color="var(--success)" />
                  Identificación precisa de buenos pagadores ({metrics.recall}% recall)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Impact Metrics - DATOS REALES DEL MODELO */}
        <div className="card" style={{ textAlign: 'center' }}>
          <div className="card-body">
            <h3 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: 'var(--dark)', 
              marginBottom: '40px' 
            }}>
              Rendimiento Comprobado del Modelo ML
            </h3>
            
            <div className="grid grid-4">
              <div style={{ padding: '20px' }}>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: '800', 
                  color: 'var(--primary)', 
                  marginBottom: '10px' 
                }}>
                  {metrics.accuracy}%
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'var(--dark)' 
                }}>
                  Precisión General
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>
                  {metrics.correctPredictions} de {metrics.totalPredictions} correctas
                </div>
              </div>
              
              <div style={{ padding: '20px' }}>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: '800', 
                  color: 'var(--secondary)', 
                  marginBottom: '10px' 
                }}>
                  {metrics.recall}%
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'var(--dark)' 
                }}>
                  Recall (Sensibilidad)
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>
                  Detecta {metrics.recall}% de buenos pagadores
                </div>
              </div>
              
              <div style={{ padding: '20px' }}>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: '800', 
                  color: 'var(--accent)', 
                  marginBottom: '10px' 
                }}>
                  {metrics.confusionMatrix.falseNegatives}
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'var(--dark)' 
                }}>
                  Falsos Negativos
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>
                  Solo {errorAnalysis.falseNegatives.percentage.toFixed(1)}% oportunidades perdidas
                </div>
              </div>
              
              <div style={{ padding: '20px' }}>
                <div style={{ 
                  fontSize: '48px', 
                  fontWeight: '800', 
                  color: '#9f7aea', 
                  marginBottom: '10px' 
                }}>
                  {metrics.f1Score}%
                </div>
                <div style={{ 
                  fontSize: '18px', 
                  fontWeight: '600', 
                  color: 'var(--dark)' 
                }}>
                  F1-Score
                </div>
                <div style={{ fontSize: '14px', color: 'var(--gray)' }}>
                  Balance precisión-recall optimizado
                </div>
              </div>
            </div>

            {/* Model Comparison */}
            <div style={{ marginTop: '40px', padding: '20px', backgroundColor: 'var(--light)', borderRadius: 'var(--border-radius)' }}>
              <h4 style={{ marginBottom: '20px', color: 'var(--dark)' }}>
                Mejora vs. Modelo Baseline
              </h4>
              <div className="grid grid-4">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--success)' }}>
                    +{(metrics.accuracy - baseline.accuracy).toFixed(2)}%
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Precisión</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--success)' }}>
                    +{(metrics.recall - baseline.recall).toFixed(2)}%
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Recall</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--success)' }}>
                    +{(metrics.f1Score - baseline.f1Score).toFixed(2)}%
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--gray)' }}>F1-Score</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--info)' }}>
                    {metrics.errors}
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Errores Totales</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid con datos reales */}
      <section style={{ backgroundColor: '#f7fafc', padding: '60px 20px' }}>
        <div className="container">
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            textAlign: 'center', 
            color: 'var(--dark)', 
            marginBottom: '50px' 
          }}>
            Funcionalidades Principales
          </h2>
          
          <div className="grid grid-4">
            {/* Feature 1 - Datos reales */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="card-body">
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--primary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto'
                }}>
                  <Database size={36} color="var(--white)" />
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: 'var(--dark)', 
                  marginBottom: '15px' 
                }}>
                  Modelo Entrenado
                </h3>
                <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>
                  Entrenado con {realModelData.modelConfig.trainingDataSize} casos reales y validado 
                  con {realModelData.modelConfig.testDataSize} predicciones verificadas.
                </p>
              </div>
            </div>

            {/* Feature 2 - Precisión real */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="card-body">
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--secondary)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto'
                }}>
                  <Target size={36} color="var(--white)" />
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: 'var(--dark)', 
                  marginBottom: '15px' 
                }}>
                  Alta Precisión Comprobada
                </h3>
                <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>
                  {metrics.accuracy}% de precisión general con {metrics.recall}% de recall 
                  para identificar correctamente buenos pagadores.
                </p>
              </div>
            </div>

            {/* Feature 3 - Riesgo mínimo real */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="card-body">
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'var(--danger)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto'
                }}>
                  <AlertTriangle size={36} color="var(--white)" />
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: 'var(--dark)', 
                  marginBottom: '15px' 
                }}>
                  Riesgo Controlado
                </h3>
                <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>
                  Solo {errorAnalysis.falsePositives.count} falsos positivos de {metrics.totalPredictions} casos, 
                  minimizando el riesgo financiero.
                </p>
              </div>
            </div>

            {/* Feature 4 - Algoritmo específico */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div className="card-body">
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#38b2ac',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px auto'
                }}>
                  <Shield size={36} color="var(--white)" />
                </div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '700', 
                  color: 'var(--dark)', 
                  marginBottom: '15px' 
                }}>
                  Algoritmo Optimizado
                </h3>
                <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>
                  {realModelData.modelConfig.algorithm} optimizado con hiperparámetros 
                  ajustados para máximo rendimiento financiero.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            color: 'var(--dark)', 
            marginBottom: '20px' 
          }}>
            ¿Listo para probar el modelo real?
          </h2>
          <p style={{ 
            fontSize: '18px', 
            color: 'var(--gray)', 
            marginBottom: '40px' 
          }}>
            Experimenta con nuestro modelo ML entrenado y validado. 
            Cada predicción se basa en {realModelData.modelFeatures.length} características 
            analizadas por el algoritmo optimizado.
          </p>
          
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            <Link to="/predict" className="btn btn-primary btn-lg">
              <Calculator size={20} />
              Predicción Individual
            </Link>
            
            <Link to="/batch" className="btn btn-secondary btn-lg">
              <BarChart3 size={20} />
              Predicción por Lotes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard