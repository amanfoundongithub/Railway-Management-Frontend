import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, InputAdornment } from '@mui/material';

export const CoachConfigurationForm = () => {
  return (
    <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          3. Inventory & Base Pricing
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Define total seat capacity and base fare for each class. Leave blank if not applicable.
        </Typography>

        <Grid container spacing={3}>
          {['1A (First AC)', '2A (Second AC)', '3A (Third AC)', 'SL (Sleeper)', 'GN (General)'].map((cls) => (
            <React.Fragment key={cls}>
              <Grid item xs={12} md={4} display="flex" alignItems="center">
                <Typography fontWeight="bold">{cls}</Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField fullWidth size="small" label="Total Capacity" type="number" placeholder="e.g. 72" />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField 
                  fullWidth size="small" label="Base Fare" type="number" 
                  InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                />
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};