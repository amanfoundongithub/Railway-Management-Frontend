import React from 'react';
import { TextField, MenuItem, Grid } from '@mui/material';

const classes = ['All Classes', '1A (First AC)', '2A (Second AC)', '3A (Third AC)', 'SL (Sleeper)'];
const quotas = ['General', 'Tatkal', 'Premium Tatkal', 'Ladies', 'Senior Citizen'];

const DateClassFilters = () => {
  return (
    <Grid container spacing={3} sx={{ mt: 1 }}>
      
      {/* Date Picker (Using standard native date input for simplicity right now) */}
      <Grid item xs={12} md={4}>
        <TextField
          fullWidth
          label="Journey Date"
          type="date"
          defaultValue="2026-11-10" // Using a future date based on context
          InputLabelProps={{ shrink: true }}
        />
      </Grid>

      {/* Class Dropdown */}
      <Grid item xs={12} md={4}>
        <TextField select fullWidth label="Class" defaultValue="All Classes">
          {classes.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      {/* Quota Dropdown */}
      <Grid item xs={12} md={4}>
        <TextField select fullWidth label="Quota" defaultValue="General">
          {quotas.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

    </Grid>
  );
};

export default DateClassFilters;