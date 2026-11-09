import React from 'react';
import { Card, CardContent, Typography, Box, Button, Grid, Divider } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';

export const TrainCard = ({ train }) => {
  return (
    <Card elevation={2} sx={{ mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
      <CardContent>
        {/* Top Row: Train Info & Timing */}
        <Grid container alignItems="center" spacing={2}>
          
          {/* Train Name & Number */}
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="center" gap={1}>
              <TrainIcon color="primary" />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {train.trainName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  #{train.trainNumber} | {train.runsOn.join(', ')}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Schedule */}
          <Grid item xs={12} md={5}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box textAlign="center">
                <Typography variant="h6">{train.departureTime}</Typography>
                <Typography variant="body2">{train.source}</Typography>
              </Box>
              
              <Box textAlign="center" flexGrow={1} px={2}>
                <Typography variant="caption" color="text.secondary">
                  {train.duration}
                </Typography>
                <Divider sx={{ my: 0.5 }} />
                <Typography variant="caption" color="success.main">
                  On Time
                </Typography>
              </Box>

              <Box textAlign="center">
                <Typography variant="h6">{train.arrivalTime}</Typography>
                <Typography variant="body2">{train.destination}</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Row: Availability Buckets */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3, overflowX: 'auto', pb: 1 }}>
          {train.availability.map((cls, index) => (
            <Card 
              key={index}
              variant="outlined" 
              sx={{ 
                minWidth: 150, 
                bgcolor: cls.status === 'AVAILABLE' ? 'success.50' : 'error.50',
                borderColor: cls.status === 'AVAILABLE' ? 'success.light' : 'error.light',
                cursor: 'pointer',
                '&:hover': { boxShadow: 2 }
              }}
            >
              <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="subtitle2" fontWeight="bold">{cls.className}</Typography>
                  <Typography variant="subtitle2">₹{cls.price}</Typography>
                </Box>
                
                <Typography 
                  variant="body2" 
                  fontWeight="bold"
                  color={cls.status === 'AVAILABLE' ? 'success.dark' : 'error.dark'}
                >
                  {cls.seatsLabel}
                </Typography>

                <Button 
                  fullWidth 
                  variant="contained" 
                  size="small"
                  color={cls.status === 'AVAILABLE' ? 'success' : 'error'}
                  sx={{ mt: 1, textTransform: 'none' }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};