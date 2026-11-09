import React from 'react';
import { Box, Container, Typography, AppBar, Toolbar } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import TrainIcon from '@mui/icons-material/Train';
import { PaymentMethodsWidget } from '../../../widgets/checkout/ui/PaymentMethodsWidget';

export const PaymentPage = () => {
  // In a real app, this amount comes from state management (Context/Redux) or URL params
  const transactionAmount = 4935; 

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100' }}>
      
      {/* Secure Checkout Header */}
      <AppBar position="static" color="inherit" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" color="primary.main">
            <TrainIcon sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="bold" letterSpacing={1}>
              NXT_RAIL
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} color="success.main">
            <LockIcon fontSize="small" />
            <Typography variant="body2" fontWeight="bold">
              Secure Checkout
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Complete Your Payment
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please do not refresh the page or press back while the transaction is processing.
          </Typography>
        </Box>

        <PaymentMethodsWidget amount={transactionAmount} />

      </Container>
    </Box>
  );
};