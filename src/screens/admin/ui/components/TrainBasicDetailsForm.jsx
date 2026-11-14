import React from 'react';
import { Typography, Grid, TextField, Box, Chip } from '@mui/material';

export const TrainBasicDetailsForm = ({ trainData, updateTrainData }) => {
  const days = [
    { label: 'Sun', value: 0 },
    { label: 'Mon', value: 1 },
    { label: 'Tue', value: 2 },
    { label: 'Wed', value: 3 },
    { label: 'Thu', value: 4 },
    { label: 'Fri', value: 5 },
    { label: 'Sat', value: 6 }
  ];

  const handleDayToggle = (dayValue) => {
    const currentDays = trainData.runningDays;
    const newDays = currentDays.includes(dayValue)
      ? currentDays.filter(d => d !== dayValue)
      : [...currentDays, dayValue].sort();
    
    updateTrainData('runningDays', newDays);
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" color="primary.main" mb={3}>
        Basic Identity
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <TextField 
            fullWidth 
            label="Train Number" 
            placeholder="e.g. 12951" 
            value={trainData.trainNumber}
            onChange={(e) => updateTrainData('trainNumber', e.target.value)}
            required 
            autoFocus
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField 
            fullWidth 
            label="Train Name" 
            placeholder="e.g. Mumbai Rajdhani Express" 
            value={trainData.trainName}
            onChange={(e) => updateTrainData('trainName', e.target.value)}
            required 
          />
        </Grid>
        
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Operational Days (Select days the train departs from origin)
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1.5} mt={1}>
            {days.map(day => {
              const isSelected = trainData.runningDays.includes(day.value);
              return (
                <Chip 
                  key={day.value}
                  label={day.label}
                  onClick={() => handleDayToggle(day.value)}
                  color={isSelected ? "primary" : "default"}
                  variant={isSelected ? "filled" : "outlined"}
                  sx={{ width: 60, fontWeight: isSelected ? 'bold' : 'normal', cursor: 'pointer' }}
                />
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};