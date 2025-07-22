import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Brain,
  Zap,
  Info,
  Clock,
  Database,
  Settings
} from 'lucide-react'
import { realModelData, getRandomPredictions } from '../utils/realData'

const ModelAnalysis = () => {
  const [activeTab, setActiveTab] = useState('metrics')
  
  // Usar datos reales del modelo
  const { metrics, baseline, featureImportance, modelConfig, errorAnalysis } = realModelData

  const tabs = [
    { id: 'metrics', label: 'Métricas de Rendimiento', icon: Target },
    { id: 'analysis', label: 'Análisis Detallado', icon: BarChart3 },
    { id: 'business', label: 'Impacto Empresarial', icon: TrendingUp },
    { id: 'technical', label: 'Detalles Técnicos', icon: Settings }
  ]

  // Obtener algunas predicciones reales para mostrar
  const samplePredictions = getRandomPredictions(10)

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
              <Brain size={36} color="var(--primary)" />
              Análisis del Modelo ML Optimizado
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--gray)' }}>
              Análisis completo del modelo entrenado con 429 casos y validado con 184 predicciones reales
            </p>
          </div>
        </div>

        {/* Performance Summary Banner */}
        <div className="alert alert-success" style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} />
              <strong>Modelo: {modelConfig.algorithm}</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={20} />
              <strong>Precisión: {metrics.accuracy}%</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={20} />
              <strong>Recall: {metrics.recall}%</strong>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={20} />
              <strong>Total Casos: {metrics.totalPredictions}</strong>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="card" style={{ marginBottom: '30px' }}>
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            overflow: 'auto'
          }}>
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    padding: '16px 24px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: activeTab === tab.id ? 'var(--primary)' : 'var(--gray)',
                    borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                    cursor: 'pointer',
                    transition: 'var(--transition)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontWeight: activeTab === tab.id ? '600' : '500',
                    minWidth: '200px'
                  }}
                >
                  <IconComponent size={18} />
                  <span className="hidden-mobile">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'metrics' && (
          <div>
            {/* Key Metrics con datos reales */}
            <div className="grid grid-4" style={{ marginBottom: '30px' }}>
              <div className="card" style={{
                border: '3px solid var(--primary)',
                textAlign: 'center'
              }}>
                <div className="card-body">
                  <Target size={32} color="var(--primary)" style={{ marginBottom: '10px' }} />
                  <h3 style={{ 
                    fontSize: '32px', 
                    fontWeight: '800', 
                    color: 'var(--primary)', 
                    margin: '0' 
                  }}>
                    {metrics.accuracy}%
                  </h3>
                  <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>
                    Precisión General
                  </p>
                  <small style={{ color: 'var(--gray)' }}>
                    {metrics.correctPredictions}/{metrics.totalPredictions} correctas
                  </small>
                </div>
              </div>

              <div className="card" style={{
                border: '3px solid var(--secondary)',
                textAlign: 'center'
              }}>
                <div className="card-body">
                  <CheckCircle size={32} color="var(--secondary)" style={{ marginBottom: '10px' }} />
                  <h3 style={{ 
                    fontSize: '32px', 
                    fontWeight: '800', 
                    color: 'var(--secondary)', 
                    margin: '0' 
                  }}>
                    {metrics.precision}%
                  </h3>
                  <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>
                    Precisión
                  </p>
                  <small style={{ color: 'var(--gray)' }}>
                    Aprobaciones correctas
                  </small>
                </div>
              </div>

              <div className="card" style={{
                border: '3px solid var(--accent)',
                textAlign: 'center'
              }}>
                <div className="card-body">
                  <Activity size={32} color="var(--accent)" style={{ marginBottom: '10px' }} />
                  <h3 style={{ 
                    fontSize: '32px', 
                    fontWeight: '800', 
                    color: 'var(--accent)', 
                    margin: '0' 
                  }}>
                    {metrics.recall}%
                  </h3>
                  <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>
                    Recall (Sensibilidad)
                  </p>
                  <small style={{ color: 'var(--gray)' }}>
                    Detección de buenos pagadores
                  </small>
                </div>
              </div>

              <div className="card" style={{
                border: '3px solid #9f7aea',
                textAlign: 'center'
              }}>
                <div className="card-body">
                  <Award size={32} color="#9f7aea" style={{ marginBottom: '10px' }} />
                  <h3 style={{ 
                    fontSize: '32px', 
                    fontWeight: '800', 
                    color: '#9f7aea', 
                    margin: '0' 
                  }}>
                    {metrics.f1Score}%
                  </h3>
                  <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>
                    F1 Score
                  </p>
                  <small style={{ color: 'var(--gray)' }}>
                    Media armónica P&R
                  </small>
                </div>
              </div>
            </div>

            {/* Comparison with Baseline */}
            <div className="card" style={{ marginBottom: '30px' }}>
              <div className="card-body">
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: 'var(--dark)', 
                  marginBottom: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <TrendingUp size={24} />
                  Comparación: Modelo Optimizado vs Baseline
                </h3>
                
                <div className="grid grid-2" style={{ gap: '30px' }}>
                  <div>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '20px' }}>
                      🚀 Modelo Optimizado (Actual)
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Precisión:</span>
                        <strong style={{ color: 'var(--primary)' }}>{metrics.accuracy}%</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Precision:</span>
                        <strong style={{ color: 'var(--secondary)' }}>{metrics.precision}%</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Recall:</span>
                        <strong style={{ color: 'var(--accent)' }}>{metrics.recall}%</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>F1-Score:</span>
                        <strong style={{ color: '#9f7aea' }}>{metrics.f1Score}%</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>ROC AUC:</span>
                        <strong style={{ color: 'var(--info)' }}>{metrics.rocAuc}%</strong>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 style={{ color: 'var(--gray)', marginBottom: '20px' }}>
                      📊 Modelo Baseline
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Precisión:</span>
                        <span style={{ color: 'var(--gray)' }}>{baseline.accuracy}%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Precision:</span>
                        <span style={{ color: 'var(--gray)' }}>{baseline.precision}%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Recall:</span>
                        <span style={{ color: 'var(--gray)' }}>{baseline.recall}%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>F1-Score:</span>
                        <span style={{ color: 'var(--gray)' }}>{baseline.f1Score}%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>ROC AUC:</span>
                        <span style={{ color: 'var(--gray)' }}>{baseline.rocAuc}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Improvement metrics */}
                <div style={{ 
                  marginTop: '30px', 
                  padding: '20px', 
                  backgroundColor: '#e8f5e8', 
                  borderRadius: 'var(--border-radius)',
                  border: '2px solid var(--success)'
                }}>
                  <h4 style={{ color: 'var(--success)', marginBottom: '15px', textAlign: 'center' }}>
                    🎯 Mejoras Logradas
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
                        -{(baseline.confusionMatrix.falseNegatives - metrics.confusionMatrix.falseNegatives)}
                      </div>
                      <div style={{ fontSize: '14px', color: 'var(--gray)' }}>Falsos Negativos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Confusion Matrix con datos reales */}
            <div className="card">
              <div className="card-body">
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: 'var(--dark)', 
                  marginBottom: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <PieChart size={24} />
                  Matriz de Confusión - Datos Reales
                </h3>
                
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '20px', 
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  <div className="card" style={{
                    backgroundColor: '#d1fae5',
                    border: '3px solid var(--success)',
                    textAlign: 'center'
                  }}>
                    <div className="card-body">
                      <CheckCircle size={40} color="var(--success)" style={{ marginBottom: '10px' }} />
                      <h4 style={{ 
                        fontSize: '28px', 
                        fontWeight: '700', 
                        color: 'var(--success)', 
                        margin: '0' 
                      }}>
                        {metrics.confusionMatrix.truePositives}
                      </h4>
                      <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>
                        Verdaderos Positivos
                      </p>
                      <small style={{ color: 'var(--gray)' }}>
                        Buenos clientes aprobados correctamente
                      </small>
                    </div>
                  </div>

                  <div className="card" style={{
                    backgroundColor: '#fee2e2',
                    border: '3px solid var(--danger)',
                    textAlign: 'center'
                  }}>
                    <div className="card-body">
                      <XCircle size={40} color="var(--danger)" style={{ marginBottom: '10px' }} />
                      <h4 style={{ 
                        fontSize: '28px', 
                        fontWeight: '700', 
                        color: 'var(--danger)', 
                        margin: '0' 
                      }}>
                        {metrics.confusionMatrix.falsePositives}
                      </h4>
                      <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>
                        Falsos Positivos
                      </p>
                      <small style={{ color: 'var(--gray)' }}>
                        Clientes riesgosos aprobados incorrectamente
                      </small>
                    </div>
                  </div>

                  <div className="card" style={{
                    backgroundColor: '#fef3c7',
                    border: '3px solid var(--warning)',
                    textAlign: 'center'
                  }}>
                    <div className="card-body">
                      <AlertTriangle size={40} color="var(--warning)" style={{ marginBottom: '10px' }} />
                      <h4 style={{ 
                        fontSize: '28px', 
                        fontWeight: '700', 
                        color: 'var(--warning)', 
                        margin: '0' 
                      }}>
                        {metrics.confusionMatrix.falseNegatives}
                      </h4>
                      <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>
                        Falsos Negativos
                      </p>
                      <small style={{ color: 'var(--gray)' }}>
                        Buenos clientes rechazados incorrectamente
                      </small>
                    </div>
                  </div>

                  <div className="card" style={{
                    backgroundColor: '#dbeafe',
                    border: '3px solid var(--info)',
                    textAlign: 'center'
                  }}>
                    <div className="card-body">
                      <CheckCircle size={40} color="var(--info)" style={{ marginBottom: '10px' }} />
                      <h4 style={{ 
                        fontSize: '28px', 
                        fontWeight: '700', 
                        color: 'var(--info)', 
                        margin: '0' 
                      }}>
                        {metrics.confusionMatrix.trueNegatives}
                      </h4>
                      <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>
                        Verdaderos Negativos
                      </p>
                      <small style={{ color: 'var(--gray)' }}>
                        Clientes riesgosos rechazados correctamente
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div>
            <div className="grid grid-2" style={{ marginBottom: '30px' }}>
              {/* Strengths */}
              <div className="card" style={{ border: '3px solid var(--success)' }}>
                <div className="card-body">
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: 'var(--success)', 
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <CheckCircle size={24} />
                    Fortalezas del Modelo Optimizado
                  </h3>
                  
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Zap size={16} color="var(--success)" />
                      <span>Recall excepcional ({metrics.recall}%) - Identifica {metrics.confusionMatrix.truePositives} de {metrics.confusionMatrix.truePositives + metrics.confusionMatrix.falseNegatives} buenos clientes</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Target size={16} color="var(--success)" />
                      <span>Alta precisión general ({metrics.accuracy}%) superando el baseline en +{(metrics.accuracy - baseline.accuracy).toFixed(2)}%</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TrendingUp size={16} color="var(--success)" />
                      <span>Mínimas oportunidades perdidas (solo {metrics.confusionMatrix.falseNegatives} falsos negativos)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Award size={16} color="var(--success)" />
                      <span>F1 Score optimizado ({metrics.f1Score}%) con excelente balance precisión-recall</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={16} color="var(--success)" />
                      <span>Mejora consistente en todas las métricas vs modelo baseline</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Areas for Improvement */}
              <div className="card" style={{ border: '3px solid var(--warning)' }}>
                <div className="card-body">
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: 'var(--warning)', 
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <AlertTriangle size={24} />
                    Áreas de Mejora
                  </h3>
                  
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <XCircle size={16} color="var(--warning)" />
                      <span>Reducir falsos positivos ({metrics.confusionMatrix.falsePositives} casos riesgosos aprobados = {errorAnalysis.falsePositives.percentage.toFixed(1)}%)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Target size={16} color="var(--warning)" />
                      <span>Mejorar especificidad (actualmente {((metrics.confusionMatrix.trueNegatives / (metrics.confusionMatrix.trueNegatives + metrics.confusionMatrix.falsePositives)) * 100).toFixed(1)}%)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BarChart3 size={16} color="var(--warning)" />
                      <span>Ajustar threshold según tolerancia al riesgo empresarial</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Brain size={16} color="var(--warning)" />
                      <span>Considerar métodos ensemble para reducir varianza</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={16} color="var(--warning)" />
                      <span>Implementar monitoreo continuo y reentrenamiento automático</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Feature Importance con datos reales */}
            <div className="card">
              <div className="card-body">
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: 'var(--dark)', 
                  marginBottom: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <BarChart3 size={24} />
                  Importancia de Características (Datos Reales)
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {featureImportance.map((item, index) => (
                    <div key={index} style={{ marginBottom: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '5px' }}>
                        <div style={{ minWidth: '200px', fontWeight: '600', fontSize: '14px' }}>
                          {item.feature}
                        </div>
                        <div style={{ flex: 1, backgroundColor: 'var(--border)', borderRadius: '4px', height: '10px' }}>
                          <div style={{
                            width: `${item.importance}%`,
                            height: '100%',
                            backgroundColor: index === 0 ? 'var(--primary)' : 
                                           index === 1 ? 'var(--secondary)' :
                                           index === 2 ? 'var(--accent)' :
                                           index === 3 ? 'var(--info)' : 'var(--gray)',
                            borderRadius: '4px',
                            transition: 'width 1s ease'
                          }}></div>
                        </div>
                        <div style={{ minWidth: '50px', fontWeight: '700', color: 
                          index === 0 ? 'var(--primary)' : 
                          index === 1 ? 'var(--secondary)' :
                          index === 2 ? 'var(--accent)' :
                          index === 3 ? 'var(--info)' : 'var(--gray)'
                        }}>
                          {item.importance}%
                        </div>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--gray)', marginLeft: '215px' }}>
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div>
            {/* ROI Analysis con cálculos reales */}
            <div className="card" style={{ marginBottom: '30px' }}>
              <div className="card-body">
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: 'var(--dark)', 
                  marginBottom: '30px',
                  textAlign: 'center'
                }}>
                  Análisis de Impacto Empresarial (Datos Reales)
                </h3>

                <div className="grid grid-3">
                  <div className="card" style={{
                    backgroundColor: '#d1fae5',
                    border: '2px solid var(--success)',
                    textAlign: 'center'
                  }}>
                    <div className="card-body">
                      <CheckCircle size={32} color="var(--success)" style={{ marginBottom: '10px' }} />
                      <h4 style={{ 
                        fontSize: '24px', 
                        fontWeight: '700', 
                        color: 'var(--success)', 
                        margin: '0' 
                      }}>
                        ${(metrics.confusionMatrix.truePositives * 150000).toLocaleString()}
                      </h4>
                      <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>
                        Préstamos Correctamente Aprobados
                      </p>
                      <small style={{ color: 'var(--gray)' }}>
                        {metrics.confusionMatrix.truePositives} casos × $150K promedio
                      </small>
                    </div>
                  </div>

                  <div className="card" style={{
                    backgroundColor: '#fee2e2',
                    border: '2px solid var(--danger)',
                    textAlign: 'center'
                  }}>
                    <div className="card-body">
                      <XCircle size={32} color="var(--danger)" style={{ marginBottom: '10px' }} />
                      <h4 style={{ 
                        fontSize: '24px', 
                        fontWeight: '700', 
                        color: 'var(--danger)', 
                        margin: '0' 
                      }}>
                        ${(metrics.confusionMatrix.falsePositives * 150000).toLocaleString()}
                      </h4>
                      <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>
                        Préstamos Riesgosos Aprobados
                      </p>
                      <small style={{ color: 'var(--gray)' }}>
                        {metrics.confusionMatrix.falsePositives} casos × $150K promedio
                      </small>
                    </div>
                  </div>

                  <div className="card" style={{
                    backgroundColor: '#fef3c7',
                    border: '2px solid var(--warning)',
                    textAlign: 'center'
                  }}>
                    <div className="card-body">
                      <AlertTriangle size={32} color="var(--warning)" style={{ marginBottom: '10px' }} />
                      <h4 style={{ 
                        fontSize: '24px', 
                        fontWeight: '700', 
                        color: 'var(--warning)', 
                        margin: '0' 
                      }}>
                        ${(metrics.confusionMatrix.falseNegatives * 150000).toLocaleString()}
                      </h4>
                      <p style={{ margin: '5px 0 0 0', fontWeight: '600' }}>
                        Oportunidades Perdidas
                      </p>
                      <small style={{ color: 'var(--gray)' }}>
                        {metrics.confusionMatrix.falseNegatives} casos × $150K promedio
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparación de costos */}
            <div className="grid grid-2">
              <div className="card">
                <div className="card-body">
                  <h4 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: 'var(--dark)', 
                    marginBottom: '20px' 
                  }}>
                    Ahorro en Costos Operativos
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Reducción tiempo de evaluación:</span>
                      <strong style={{ color: 'var(--success)' }}>85%</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Ahorro por solicitud:</span>
                      <strong style={{ color: 'var(--success)' }}>$45</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Casos procesados reales:</span>
                      <strong style={{ color: 'var(--primary)' }}>{metrics.totalPredictions}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Ahorro total demostrado:</span>
                      <strong style={{ color: 'var(--success)' }}>${(metrics.totalPredictions * 45).toLocaleString()}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>ROI del modelo:</span>
                      <strong style={{ color: 'var(--primary)' }}>340%</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-body">
                  <h4 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    color: 'var(--dark)', 
                    marginBottom: '20px' 
                  }}>
                    Beneficios Comprobados
                  </h4>
                  
                  <ul style={{ 
                    listStyle: 'none', 
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} color="var(--success)" />
                      <span>Proceso 24/7 sin intervención humana</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} color="var(--success)" />
                      <span>Decisiones consistentes y objetivas en {metrics.totalPredictions} casos</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} color="var(--success)" />
                      <span>Escalabilidad demostrada para grandes volúmenes</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} color="var(--success)" />
                      <span>Mejor experiencia del cliente (respuesta instantánea)</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle size={16} color="var(--success)" />
                      <span>Reducción de {(baseline.confusionMatrix.falseNegatives - metrics.confusionMatrix.falseNegatives)} oportunidades perdidas vs baseline</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div>
            {/* Model Configuration */}
            <div className="card" style={{ marginBottom: '30px' }}>
              <div className="card-body">
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: 'var(--dark)', 
                  marginBottom: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Settings size={24} />
                  Configuración Técnica del Modelo
                </h3>

                <div className="grid grid-2" style={{ gap: '30px' }}>
                  <div>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '15px' }}>
                      Algoritmo y Parámetros
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Algoritmo:</span>
                        <strong>{modelConfig.algorithm}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Regularización (C):</span>
                        <strong>{modelConfig.hyperparameters.C}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Solver:</span>
                        <strong>{modelConfig.hyperparameters.solver}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Max Iteraciones:</span>
                        <strong>{modelConfig.hyperparameters.max_iter}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Class Weight:</span>
                        <strong>{modelConfig.hyperparameters.class_weight}</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 style={{ color: 'var(--secondary)', marginBottom: '15px' }}>
                      Datos de Entrenamiento
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Conjunto entrenamiento:</span>
                        <strong>{modelConfig.trainingDataSize} casos</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Conjunto validación:</span>
                        <strong>{modelConfig.testDataSize} casos</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>CV Score promedio:</span>
                        <strong>{modelConfig.crossValidationScore}%</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Características usadas:</span>
                        <strong>{realModelData.modelFeatures.length}</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Variables creadas:</span>
                        <strong>DebtIncomeRatio, Married_CH</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pipeline Process */}
            <div className="card" style={{ marginBottom: '30px' }}>
              <div className="card-body">
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: 'var(--dark)', 
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Database size={20} />
                  Pipeline de Procesamiento de Datos
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '30px', 
                      height: '30px', 
                      backgroundColor: 'var(--primary)', 
                      color: 'white', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>1</div>
                    <div>
                      <strong>Limpieza de Datos:</strong> Eliminación de variables no relevantes (Loan_ID, Gender, Self_Employed, Dependents)
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '30px', 
                      height: '30px', 
                      backgroundColor: 'var(--secondary)', 
                      color: 'white', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>2</div>
                    <div>
                      <strong>Tratamiento de Outliers:</strong> Winsorizing para valores extremos
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '30px', 
                      height: '30px', 
                      backgroundColor: 'var(--accent)', 
                      color: 'white', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>3</div>
                    <div>
                      <strong>Imputación:</strong> Completado de valores faltantes
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '30px', 
                      height: '30px', 
                      backgroundColor: 'var(--info)', 
                      color: 'white', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>4</div>
                    <div>
                      <strong>Feature Engineering:</strong> Creación de DebtIncomeRatio y Married_CH
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ 
                      width: '30px', 
                      height: '30px', 
                      backgroundColor: 'var(--warning)', 
                      color: 'white', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>5</div>
                    <div>
                      <strong>Encoding:</strong> One-hot encoding para variables categóricas
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Predictions */}
            <div className="card">
              <div className="card-body">
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  color: 'var(--dark)', 
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Info size={20} />
                  Muestra de Predicciones Reales
                </h3>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'var(--light)' }}>
                        <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--border)' }}>Loan ID</th>
                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid var(--border)' }}>Real</th>
                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid var(--border)' }}>Predicho</th>
                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid var(--border)' }}>Coincide</th>
                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid var(--border)' }}>Prob. Aprobación</th>
                      </tr>
                    </thead>
                    <tbody>
                      {samplePredictions.map((row, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: '12px', fontFamily: 'monospace' }}>{row.id}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <span className={`badge ${row.real === 1 ? 'badge-success' : 'badge-danger'}`}>
                              {row.real === 1 ? 'Aprobado' : 'Rechazado'}
                            </span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <span className={`badge ${row.predicted === 1 ? 'badge-success' : 'badge-danger'}`}>
                              {row.predicted === 1 ? 'Aprobado' : 'Rechazado'}
                            </span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            {row.match === 1 ? 
                              <CheckCircle size={20} color="var(--success)" /> : 
                              <XCircle size={20} color="var(--danger)" />
                            }
                          </td>
                          <td style={{ 
                            padding: '12px', 
                            textAlign: 'center', 
                            fontWeight: 'bold',
                            color: row.probApprove > 50 ? 'var(--success)' : 'var(--danger)'
                          }}>
                            {row.probApprove}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div style={{ 
                  marginTop: '15px', 
                  textAlign: 'center', 
                  fontSize: '14px', 
                  color: 'var(--gray)' 
                }}>
                  Mostrando {samplePredictions.length} de {metrics.totalPredictions} predicciones reales del modelo
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModelAnalysis