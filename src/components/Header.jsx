import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Calculator, 
  BarChart3, 
  TrendingUp, 
  Menu, 
  X,
  Building2
} from 'lucide-react'

const Header = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/predict', label: 'Predicción Individual', icon: Calculator },
    { path: '/batch', label: 'Predicción por Lotes', icon: BarChart3 },
    { path: '/analysis', label: 'Análisis del Modelo', icon: TrendingUp },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header style={{
      backgroundColor: 'var(--white)',
      boxShadow: 'var(--shadow)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container">
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
          position: 'relative'
        }}>
          {/* Logo */}
          <Link 
            to="/" 
            onClick={closeMobileMenu}
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'var(--primary)',
              fontSize: '24px',
              fontWeight: '800',
              gap: '12px'
            }}
          >
            <Building2 size={32} />
            <span className="hidden-mobile">LoanPredict Pro</span>
            <span className="hidden-desktop">LPP</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ 
            display: 'flex', 
            gap: '0',
            alignItems: 'center'
          }} className="hidden-mobile">
            {menuItems.map((item) => {
              const IconComponent = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 20px',
                    textDecoration: 'none',
                    color: isActive ? 'var(--primary)' : 'var(--gray)',
                    borderBottom: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                    transition: 'var(--transition)',
                    fontWeight: isActive ? '600' : '500',
                    fontSize: '14px'
                  }}
                >
                  <IconComponent size={18} />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="hidden-desktop"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--gray)',
              cursor: 'pointer',
              borderRadius: 'var(--border-radius)'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation Overlay */}
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                style={{
                  position: 'fixed',
                  top: '70px',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 998
                }}
                onClick={closeMobileMenu}
              />
              
              {/* Mobile Menu */}
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  backgroundColor: 'var(--white)',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--border)',
                  borderTop: 'none',
                  zIndex: 999
                }}
              >
                {menuItems.map((item) => {
                  const IconComponent = item.icon
                  const isActive = location.pathname === item.path
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={closeMobileMenu}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px 20px',
                        textDecoration: 'none',
                        color: isActive ? 'var(--primary)' : 'var(--dark)',
                        backgroundColor: isActive ? '#f0f9ff' : 'transparent',
                        borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent',
                        fontWeight: isActive ? '600' : '500',
                        fontSize: '16px',
                        borderBottom: '1px solid var(--border)'
                      }}
                    >
                      <IconComponent size={20} />
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header