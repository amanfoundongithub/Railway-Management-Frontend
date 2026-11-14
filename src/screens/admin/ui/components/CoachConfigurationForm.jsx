import React from 'react';
import { Typography, Grid, TextField, Button, Box, IconButton, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TrainIcon from '@mui/icons-material/Train';

export const CoachConfigurationForm = ({ trainData, updateTrainData }) => {
  const coaches = trainData.coachClasses;

  const validClasses = [
    { value: '1A', label: '1A - AC First Class' },
    { value: '2A', label: '2A - AC 2 Tier' },
    { value: '3A', label: '3A - AC 3 Tier' },
    { value: 'SL', label: 'SL - Sleeper' },
    { value: 'CC', label: 'CC - AC Chair Car' },
    { value: '2S', label: '2S - Second Sitting' },
    { value: 'UR', label: 'UR - Unreserved' }
  ];

  const handleCoachChange = (index, field, value) => {
    const updatedCoaches = [...coaches];
    updatedCoaches[index][field] = value;
    updateTrainData('coachClasses', updatedCoaches);
  };

  const addCoach = () => {
    updateTrainData('coachClasses', [...coaches, { classType: '3A', totalSeats: 72, baseFare: 1000 }]);
  };

  const removeCoach = (index) => {
    const updatedCoaches = coaches.filter((_, i) => i !== index);
    updateTrainData('coachClasses', updatedCoaches);
  };

  const totalSeats = coaches.reduce((sum, coach) => sum + (Number(coach.totalSeats) || 0), 0);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx = {{mb : 3}}>
        <Box>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            Coach Configuration & Pricing
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total Capacity: {totalSeats} Seats
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          size="small" 
          startIcon={<TrainIcon />} 
          onClick={addCoach}
          color="secondary"
        >
          Add Coach Class
        </Button>
      </Box>

      {coaches.length === 0 && (
        <Box textAlign="center" py={4} bgcolor="grey.50" borderRadius={2} border="1px dashed #ccc">
          <Typography color="text.secondary">No coach classes added yet. Click above to add capacity.</Typography>
        </Box>
      )}

      {coaches.map((coach, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', border: '1px solid #e0e0e0', borderRadius: 1 }}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="subtitle2" fontWeight="bold">
              Class Definition {index + 1}
            </Typography>
            <IconButton color="error" size="small" onClick={() => removeCoach(index)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField 
                select 
                fullWidth 
                size="small" 
                label="Coach Class" 
                value={coach.classType}
                onChange={(e) => handleCoachChange(index, 'classType', e.target.value)}
                required
              >
                {validClasses.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField 
                fullWidth 
                size="small" 
                label="Total Seats" 
                type="number"
                value={coach.totalSeats}
                onChange={(e) => handleCoachChange(index, 'totalSeats', Number(e.target.value))}
                inputProps={{ min: 1 }}
                required 
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField 
                fullWidth 
                size="small" 
                label="Base Fare (₹)" 
                type="number"
                value={coach.baseFare}
                onChange={(e) => handleCoachChange(index, 'baseFare', Number(e.target.value))}
                inputProps={{ min: 0 }}
                required 
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
};