import React from 'react';
import { Card, CardContent, Typography, Grid, TextField, MenuItem, Checkbox, FormControlLabel, Box } from '@mui/material';

export const TrainBasicDetailsForm = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          1. Basic Details
        </Typography>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Train Number" placeholder="e.g. 12951" required />
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField fullWidth label="Train Name" placeholder="e.g. Mumbai Rajdhani Express" required />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField select fullWidth label="Train Type" defaultValue="Rajdhani">
              {['Rajdhani', 'Shatabdi', 'Duronto', 'Superfast', 'Passenger', 'Vande Bharat'].map(t => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>Runs On Days</Typography>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {days.map(day => (
                <FormControlLabel key={day} control={<Checkbox defaultChecked />} label={day} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};