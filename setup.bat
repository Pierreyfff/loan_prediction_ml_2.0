@echo off
echo 🚀 Setting up Loan Prediction App...

REM Create project
call npm create vite@latest loan-prediction-app -- --template react
cd loan-prediction-app

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
call npm install @mui/material @emotion/react @emotion/styled
call npm install @mui/icons-material
call npm install recharts
call npm install axios
call npm install react-router-dom
call npm install @mui/x-data-grid
call npm install papaparse
call npm install @types/papaparse
call npm install -D @types/react @types/react-dom

REM Create folder structure
echo 📁 Creating folder structure...
mkdir src\components
mkdir src\pages
mkdir src\utils
mkdir src\data
mkdir src\hooks
mkdir public\data

echo ✅ Setup complete!
echo 📋 Next steps:
echo 1. Copy your CSV files to public/data/
echo 2. Replace the generated files with the provided code
echo 3. Run 'npm run dev' to start the development server

pause