import React from 'react'
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  Shield,
  Award,
  Users
} from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      backgroundColor: 'var(--dark)',
      color: 'var(--white)',
      marginTop: 'auto'
    }}>
      {/* Main Footer Content */}
      <div style={{ padding: '60px 0 40px 0' }}>
        <div className="container">
          <div className="grid grid-4" style={{ gap: '40px' }}>
            {/* Company Info */}
            <div style={{ gridColumn: 'span 2' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <Building2 size={32} color="var(--primary)" />
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '800',
                  color: 'var(--white)'
                }}>
                  LoanPredict Pro
                </h3>
              </div>
              
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#9ca3af',
                marginBottom: '24px',
                maxWidth: '400px'
              }}>
                Plataforma que contribuye en la predicción de préstamos con Machine Learning. 
                Elaborado por parte del grupo con la finalidad de ayudar a usuarios 
                y entidades financieras en la evaluación crediticia.
              </p>

              {/* Stats */}
              <div style={{
                display: 'flex',
                gap: '32px',
                flexWrap: 'wrap'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'var(--primary)',
                    marginBottom: '4px'
                  }}>
                    85.9%
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    Precisión
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'var(--secondary)',
                    marginBottom: '4px'
                  }}>
                    600+
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    Predicciones
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: 'var(--accent)',
                    marginBottom: '4px'
                  }}>
                    24/7
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    Disponibilidad
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--white)',
                marginBottom: '20px'
              }}>
                Enlaces Rápidos
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a href="/" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'var(--transition)'
                }}>
                  Inicio
                </a>
                <a href="/predict" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'var(--transition)'
                }}>
                  Predicción Individual
                </a>
                <a href="/batch" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'var(--transition)'
                }}>
                  Predicción por Lotes
                </a>
                <a href="/analysis" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'var(--transition)'
                }}>
                  Análisis del Modelo
                </a>
              </div>
            </div>

            {/* Contact & Features */}
            <div>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--white)',
                marginBottom: '20px'
              }}>
                Características
              </h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Shield size={16} color="var(--success)" />
                  <span style={{ color: '#9ca3af', fontSize: '14px' }}>
                    Seguridad Avanzada
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Award size={16} color="var(--accent)" />
                  <span style={{ color: '#9ca3af', fontSize: '14px' }}>
                    Alta Precisión (85.9%)
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Users size={16} color="var(--info)" />
                  <span style={{ color: '#9ca3af', fontSize: '14px' }}>
                    Soporte 24/7
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ marginTop: '32px' }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--white)',
                  marginBottom: '16px'
                }}>
                  Contacto
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={14} color="var(--primary)" />
                    <span style={{ color: '#9ca3af', fontSize: '13px' }}>
                      pierreborjas7@gmail.com
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={14} color="var(--primary)" />
                    <span style={{ color: '#9ca3af', fontSize: '13px' }}>
                      +51 935897232
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={14} color="var(--primary)" />
                    <span style={{ color: '#9ca3af', fontSize: '13px' }}>
                      Universidad Nacional de Cañete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div style={{
        borderTop: '1px solid #374151',
        padding: '20px 0'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              <p style={{ 
                color: '#9ca3af', 
                fontSize: '14px',
                margin: 0
              }}>
                © {currentYear} LoanPredict Pro. Todos los derechos reservados.
              </p>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <a href="#" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '12px',
                  transition: 'var(--transition)'
                }}>
                  Privacidad
                </a>
                <a href="#" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '12px',
                  transition: 'var(--transition)'
                }}>
                  Términos
                </a>
                <a href="#" style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '12px',
                  transition: 'var(--transition)'
                }}>
                  Cookies
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <a href="#" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                backgroundColor: '#374151',
                borderRadius: '50%',
                color: '#9ca3af',
                transition: 'var(--transition)',
                textDecoration: 'none'
              }}>
                <Github size={16} />
              </a>
              <a href="#" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                backgroundColor: '#374151',
                borderRadius: '50%',
                color: '#9ca3af',
                transition: 'var(--transition)',
                textDecoration: 'none'
              }}>
                <Linkedin size={16} />
              </a>
              <a href="#" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                backgroundColor: '#374151',
                borderRadius: '50%',
                color: '#9ca3af',
                transition: 'var(--transition)',
                textDecoration: 'none'
              }}>
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        footer a:hover {
          color: var(--primary) !important;
        }
        
        footer a[style*="width: 36px"]:hover {
          background-color: var(--primary) !important;
          color: var(--white) !important;
        }
        
        @media (max-width: 768px) {
          .grid-4 {
            grid-template-columns: 1fr !important;
          }
          
          .grid-4 > div:first-child {
            grid-column: span 1 !important;
          }
          
          footer [style*="justify-content: space-between"] {
            flex-direction: column !important;
            align-items: flex-start !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer