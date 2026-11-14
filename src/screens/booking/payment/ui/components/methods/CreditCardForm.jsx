import React from 'react';
import { Box, TextField, Grid } from '@mui/material';

export const CreditCardForm = () => {
  return (
    <Box sx={{ mt: 2 }}>
      <TextField 
        fullWidth 
        label="Card Number" 
        placeholder="0000 0000 0000 0000" 
        variant="outlined" 
        margin="normal"
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField 
            fullWidth 
            label="Expiry Date" 
            placeholder="MM/YY" 
            variant="outlined" 
            margin="normal" 
          />
        </Grid>
        <Grid item xs={6}>
          <TextField 
            fullWidth 
            label="CVV" 
            type="password" 
            placeholder="***" 
            variant="outlined" 
            margin="normal" 
          />
        </Grid>
      </Grid>
      <TextField 
        fullWidth 
        label="Name on Card" 
        variant="outlined" 
        margin="normal"
      />
    </Box>
  );
};