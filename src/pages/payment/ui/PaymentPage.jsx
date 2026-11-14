import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, AppBar, Toolbar, Alert, Button, Stack } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import TrainIcon from '@mui/icons-material/Train';
import { useNavigate } from 'react-router-dom';
import { PaymentMethodsWidget } from '../../../widgets/checkout/ui/PaymentMethodsWidget';
import { useBooking } from '../../../screens/train-booking/common/BookingProvider';
import { bookingService } from "../../booking/api/bookingService";
import { parseApiError } from '../../../utils/errorHelper';

export const PaymentPage = () => {
  const navigate = useNavigate();
  
  // 1. Pull the live transactionAmount and transactionId created in Step 3
  const { transactionAmount, transactionId, selectedTrain } = useBooking();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  // 2. Security Guard: If someone refreshes or navigates directly to /payment without a locked booking, send them back
  useEffect(() => {
    if (!transactionId || !selectedTrain) {
      navigate('/');
    }
  }, [transactionId, selectedTrain, navigate]);

  // 3. Trigger POST /api/bookings/payment-webhook
  const handleProcessPayment = async (status = 'SUCCESS') => {
    setProcessing(true);
    setError('');

    try {
      const result = await bookingService.verifyPaymentWebhook({
        transactionId,
        paymentStatus: status, // Sends "SUCCESS" or "FAILED"
      });

      console.log(result);

      if (status === 'SUCCESS' && result.pnr) {
        // Redirect to your confirmation or PNR status page with the generated 10-digit PNR
        navigate(`/ticket/confirmation?pnr=${result.pnr}`);
      } else {
        setError('Payment failed. Your reserved seats have been released back to inventory.');
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setProcessing(false);
    }
  };

  if (!transactionId) return null;

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
          <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
            Transaction Reference: <strong>{transactionId}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Please do not refresh the page or press back while the transaction is processing.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* 4. Pass the live amount, the webhook trigger, and loading state into your widget */}
        <PaymentMethodsWidget 
          amount={transactionAmount} 
          onPay={() => handleProcessPayment('SUCCESS')}
          loading={processing}
        />

        {/* Simulator button so you can test the FAILED rollback logic in your backend */}
        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
          <Button
            variant="outlined"
            color="error"
            size="small"
            disabled={processing}
            onClick={() => handleProcessPayment('FAILED')}
          >
            Simulate Payment Failure (Test Seat Rollback)
          </Button>
        </Stack>

      </Container>
    </Box>
  );
};