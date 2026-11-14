import React, { useState } from 'react';
import { Card, CardContent, Tabs, Tab, Box, Button, Typography, CircularProgress } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { CreditCardForm } from './methods/CreditCardForm';
import { UpiPaymentForm } from './methods/UpiPaymentForm';

export const PaymentMethodsWindow = ({ amount = 0, onPay, loading = false }) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Card elevation={3} sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 0 }}>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
          <Tabs 
            value={tabIndex} 
            onChange={(e, v) => setTabIndex(v)} 
            variant="fullWidth"
          >
            <Tab icon={<QrCodeScannerIcon />} label="UPI" disabled={loading} />
            <Tab icon={<CreditCardIcon />} label="Card" disabled={loading} />
            <Tab icon={<AccountBalanceIcon />} label="Net Banking" disabled={loading} />
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
            disabled={loading}
            onClick={onPay}
            sx={{ mt: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            {loading ? (
              <Box display="flex" alignItems="center" gap={1.5}>
                <CircularProgress size={24} color="inherit" />
                <span>Processing Payment...</span>
              </Box>
            ) : (
              `Pay ₹ ${amount}`
            )}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};