import React from 'react'
import {
  Paper,
  Typography,
  Box,
  Chip,
  LinearProgress,
  Alert,
  Grid,
  Card,
  CardContent
} from '@mui/material'
import {
  CheckCircle,
  Cancel,
  Warning,
  Info,
  TrendingUp,
  TrendingDown
} from '@mui/icons-material'

const PredictionResults = ({ result, recommendation }) => {
  if (!result) return null

  const getDecisionColor = (decision) => {
    return decision === 'Approved' ? 'success' : 'error'
  }

  const getDecisionIcon = (decision) => {
    return decision === 'Approved' ? <CheckCircle /> : <Cancel />
  }

  const getConfidenceColor = (confidence) => {
    const colors = {
      'High': 'success',
      'Medium-High': 'info',
      'Medium': 'warning',
      'Medium-Low': 'warning',
      'Low': 'error'
    }
    return colors[confidence] || 'default'
  }

  const getRecommendationIcon = (type) => {
    const icons = {
      'success': <CheckCircle />,
      'error': <Cancel />,
      'warning': <Warning />,
      'info': <Info />
    }
    return icons[type] || <Info />
  }

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Prediction Results
      </Typography>

      <Grid container spacing={3}>
        {/* Main Decision */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                {getDecisionIcon(result.decision)}
                <Typography variant="h6">
                  Decision: {result.decision}
                </Typography>
              </Box>
              
              <Chip
                label={`${result.confidence} Confidence`}
                color={getConfidenceColor(result.confidence)}
                sx={{ mb: 2 }}
              />

              <Typography variant="body2" color="text.secondary" gutterBottom>
                Approval Probability
              </Typography>
              <Box sx={{ mb: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={parseFloat(result.probApprove)}
                  color={getDecisionColor(result.decision)}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Typography variant="h4" color={getDecisionColor(result.decision)}>
                {result.probApprove}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Probability Breakdown */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Probability Breakdown
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Approval</Typography>
                  <Typography variant="body2" color="success.main">
                    <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                    {result.probApprove}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={parseFloat(result.probApprove)}
                  color="success"
                  sx={{ height: 6, borderRadius: 3, mb: 2 }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Rejection</Typography>
                  <Typography variant="body2" color="error.main">
                    <TrendingDown sx={{ fontSize: 16, mr: 0.5 }} />
                    {result.probReject}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={parseFloat(result.probReject)}
                  color="error"
                  sx={{ height: 6, borderRadius: 3 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recommendation */}
        {recommendation && (
          <Grid item xs={12}>
            <Alert
              severity={recommendation.type}
              icon={getRecommendationIcon(recommendation.type)}
              sx={{ fontSize: '1rem' }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {recommendation.title}
              </Typography>
              <Typography variant="body2">
                {recommendation.message}
              </Typography>
            </Alert>
          </Grid>
        )}

        {/* Technical Details */}
        <Grid item xs={12}>
          <Card elevation={1} sx={{ backgroundColor: 'grey.50' }}>
            <CardContent>
              <Typography variant="subtitle2" gutterBottom>
                Technical Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">
                    Model Score
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {result.score}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">
                    Debt-Income Ratio
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {result.factors.debtIncomeRatio}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">
                    Total Income
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    ${result.factors.totalIncome.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography variant="caption" color="text.secondary">
                    Married-Credit Factor
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {result.factors.marriedCH}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default PredictionResults