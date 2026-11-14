import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Divider, Chip } from '@mui/material';

export const PnrDetailsCard = ({ pnrData }) => {
  if (!pnrData) return null;

  const { pnr, train, sourceStation, destinationStation, journeyDate, coachClass, passengers, bookingStatus } = pnrData;

  const formattedDate = new Date(journeyDate).toLocaleDateString('en-IN', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });

  // Extract station names from populated route
  const sourceName = train.route?.find(r => r.stationCode === sourceStation)?.stationName || sourceStation;
  const destName = train.route?.find(r => r.stationCode === destinationStation)?.stationName || destinationStation;

  // Derive top badge state
  const isCancelled = bookingStatus === 'CANCELLED';
  const hasConfirmed = passengers.some(p => p.status === 'CONFIRMED');

  let badgeColor = 'warning.main';
  let badgeText = 'WAITLISTED';
  if (isCancelled) {
    badgeColor = 'error.main';
    badgeText = 'CANCELLED';
  } else if (hasConfirmed) {
    badgeColor = 'success.main';
    badgeText = 'CONFIRMED';
  }

  return (
    <Card elevation={2} sx={{ borderRadius: 2, maxWidth: 800, mx: 'auto' }}>
      {/* Header Banner */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">PNR: {pnr}</Typography>
        <Chip 
          label={badgeText} 
          size="small" 
          sx={{ bgcolor: badgeColor, color: 'white', fontWeight: 'bold' }} 
        />
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Train & Journey Details */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Train</Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              {train.trainName} ({train.trainNumber})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Journey Date</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{formattedDate}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">From</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{sourceName} ({sourceStation})</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">To</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{destName} ({destinationStation})</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Class / Quota</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{coachClass} / General</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Passenger Status Table */}
        <Typography variant="h6" fontWeight="bold" mb={2}>Passenger Status</Typography>
        
        <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, display: 'flex', fontWeight: 'bold', mb: 1 }}>
          <Box flex={2}>Passenger</Box>
          <Box flex={1}>Current Status</Box>
        </Box>

        {passengers.map((p, idx) => (
          <Box key={idx} sx={{ p: 2, display: 'flex', borderBottom: '1px solid', borderColor: 'divider', alignItems: 'center' }}>
            <Box flex={2}>
              <Typography variant="body2" fontWeight="medium">{p.name}</Typography>
              <Typography variant="caption" color="text.secondary">{p.age} Yrs | {p.gender}</Typography>
            </Box>
            <Box flex={1}>
              <Typography 
                variant="body2" 
                fontWeight="bold" 
                color={
                  p.status === 'CONFIRMED' ? 'success.main' : 
                  p.status === 'CANCELLED' ? 'error.main' : 'warning.main'
                }
              >
                {p.status === 'CONFIRMED' ? `CNF / ${p.seatNumber}` : `${p.status} / ${p.seatNumber}`}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};