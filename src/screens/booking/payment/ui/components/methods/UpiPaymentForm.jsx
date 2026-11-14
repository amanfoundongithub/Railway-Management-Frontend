import React from 'react';
import { Box, TextField, Typography } from '@mui/material';

export const UpiPaymentForm = () => {
  return (
    <Box sx={{ mt: 2, textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Enter your UPI ID to receive a payment request on your UPI app.
      </Typography>
      <TextField 
        fullWidth 
        label="UPI ID" 
        placeholder="username@bank" 
        variant="outlined" 
      />
      <Box sx={{ mt: 4, p: 3, border: '1px dashed #ccc', borderRadius: 2, bgcolor: 'grey.50' }}>
        <Typography variant="caption" color="text.secondary">
          Or scan QR code (Mock Interface)
        </Typography>
        <Box sx={{ width: 120, height: 120, bgcolor: 'grey.300', mx: 'auto', mt: 1 }} />
      </Box>
    </Box>
  );
};