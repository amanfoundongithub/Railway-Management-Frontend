import React, { useState } from 'react';
import { Card, CardContent, Tabs, Tab, Box, Button, Typography, CircularProgress } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { useNavigate } from 'react-router-dom';

import { CreditCardForm } from '../../../features/payment-processing/ui/CreditCardForm';
import { UpiPaymentForm } from '../../../features/payment-processing/ui/UpiPaymentForm';

export const PaymentMethodsWidget = ({ amount }) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate a network request to a payment gateway (e.g., Razorpay, Stripe)
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/ticket/confirmation');
    }, 2500);
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 0 }}>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
          <Tabs 
            value={tabIndex} 
            onChange={(e, v) => setTabIndex(v)} 
            variant="fullWidth"
          >
            <Tab icon={<QrCodeScannerIcon />} label="UPI" />
            <Tab icon={<CreditCardIcon />} label="Card" />
            <Tab icon={<AccountBalanceIcon />} label="Net Banking" />
          </Tabs>
        </Box>

        <Box sx={{ p: 4 }}>
          {tabIndex === 0 && <UpiPaymentForm />}
          {tabIndex === 1 && <CreditCardForm />}
          {tabIndex === 2 && (
            <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
              Net Banking portal integration will appear here.
            </Typography>
          )}

          <Button
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            disabled={isProcessing}
            onClick={handlePay}
            sx={{ mt: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            {isProcessing ? <CircularProgress size={24} color="inherit" /> : `Pay ₹ ${amount}`}
          </Button>
        </Box>

      </CardContent>
    </Card>
  );
};