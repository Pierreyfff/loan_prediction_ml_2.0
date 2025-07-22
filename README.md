# 🚀 LoanPredict Pro ML 2.0

Sistema inteligente de predicción de préstamos con Machine Learning, plazos adaptativos y validación en tiempo real.

## ✨ Características Principales

- 🧠 **Modelo ML Optimizado**: 85.87% de precisión con Logistic Regression
- 🎯 **Plazos Inteligentes**: Adaptativos según el monto del préstamo
- ⚡ **Validación en Tiempo Real**: Errores y advertencias instantáneas
- 💰 **Cuotas Automáticas**: Cálculo de pagos mensuales
- 📊 **Dashboard Completo**: Análisis individual y por lotes
- 🗄️ **Base de Datos**: PostgreSQL (Neon) para almacenamiento

## 🏗️ Arquitectura

- **Frontend**: React + Vite + Lucide Icons
- **Backend**: Node.js + Express + PostgreSQL
- **ML Model**: Logistic Regression (entrenado con 429 casos)
- **Database**: Neon PostgreSQL (serverless)
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 🚀 Despliegue

### Frontend (Vercel)
- **URL**: [https://loan-prediction-ml-2-0.vercel.app](https://loan-prediction-ml-2-0.vercel.app)

### Backend (Render)
- **API**: [https://loan-prediction-ml-backend.onrender.com](https://loan-prediction-ml-backend.onrender.com)

## 📊 Métricas del Modelo

- **Precisión**: 85.87%
- **Recall**: 98.43%
- **F1-Score**: 90.58%
- **ROC AUC**: 78.16%
- **Total Casos**: 613 (429 entrenamiento + 184 validación)

## 🎯 Categorías de Préstamos

### 📱 Préstamos Personales ($5K - $25K)
- Plazo: 1-5 años
- Uso: Gastos personales, consolidación

### 🏠 Préstamos Medianos ($25K - $100K)
- Plazo: 3-15 años  
- Uso: Renovaciones, vehículos

### 🏢 Préstamos Grandes ($100K - $300K)
- Plazo: 5-25 años
- Uso: Inversiones, negocios

### 🏘️ Préstamos Hipotecarios ($300K+)
- Plazo: 10-30 años
- Uso: Propiedades, bienes raíces

## 🛠️ Instalación Local

```bash
# Clonar repositorio
git clone https://github.com/Pierreyfff/loan_prediction_ml_2.0.git
cd loan_prediction_ml_2.0

# Instalar dependencias
npm run install:all

# Configurar variables de entorno
cp .env.example .env
cp backend/.env.example backend/.env

# Ejecutar en desarrollo
npm run dev                # Frontend (puerto 5173)
npm run backend:dev        # Backend (puerto 5000)