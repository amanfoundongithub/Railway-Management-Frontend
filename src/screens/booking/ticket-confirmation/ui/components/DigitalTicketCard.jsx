import React from 'react';
import { Card, Typography, Box, Grid, Divider, Chip } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import QrCode2Icon from '@mui/icons-material/QrCode2'; 

export const DigitalTicketCard = ({ booking }) => {
  if (!booking) return null;

  const { pnr, train, sourceStation, destinationStation, journeyDate, passengers, coachClass } = booking;

  // Extract precise timings and names from the populated route array
  const sourceDetails = train.route?.find(r => r.stationCode === sourceStation) || {};
  const destDetails = train.route?.find(r => r.stationCode === destinationStation) || {};

  const formattedDate = new Date(journeyDate).toLocaleDateString('en-IN', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });

  // Determine overall status based on whether any passenger is confirmed
  const isConfirmed = passengers.some(p => p.status === 'CONFIRMED');

  return (
    <Card elevation={6} sx={{ borderRadius: 3, position: 'relative', overflow: 'hidden' }}>
      {/* Top Banner */}
      <Box sx={{ bgcolor: isConfirmed ? 'success.main' : 'warning.main', color: 'white', p: 1.5, textAlign: 'center' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {isConfirmed ? 'Booking Confirmed' : 'Waitlisted'}
        </Typography>
      </Box>

      <Grid container>
        {/* Left Side: Journey & Passenger Details */}
        <Grid item xs={12} md={8} sx={{ borderRight: { md: '2px dashed #ccc' }, p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
            <Box>
              <Typography variant="h5" fontWeight="bold" color="primary.main" gutterBottom>
                {train.trainName} ({train.trainNumber})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formattedDate} | Class: {coachClass} | Quota: General
              </Typography>
            </Box>
            <Chip 
              label={isConfirmed ? 'CONFIRMED' : 'WAITLISTED'} 
              color={isConfirmed ? 'success' : 'warning'} 
              size="small" 
              sx={{ fontWeight: 'bold' }} 
            />
          </Box>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={5}>
              <Typography variant="h6">{sourceDetails.stationName || sourceStation}</Typography>
              <Typography variant="body2">{sourceDetails.departureTime || 'N/A'}</Typography>
            </Grid>
            <Grid item xs={2} display="flex" justifyContent="center" alignItems="center">
              <TrainIcon color="action" />
            </Grid>
            <Grid item xs={5} textAlign="right">
              <Typography variant="h6">{destDetails.stationName || destinationStation}</Typography>
              <Typography variant="body2">{destDetails.arrivalTime || 'N/A'}</Typography>
            </Grid>
          </Grid>

          <Divider sx={{ mb: 2 }} />
          
          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
            Passenger Details
          </Typography>
          
          {passengers.map((p, index) => (
            <Box key={index} display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="body2">{p.name} ({p.age} {p.gender})</Typography>
              <Typography 
                variant="body2" 
                fontWeight="bold"
                color={p.status === 'CONFIRMED' ? 'success.main' : 'warning.main'}
              >
                {p.seatNumber} ({p.status})
              </Typography>
            </Box>
          ))}
        </Grid>

        {/* Right Side: PNR & QR Code */}
        <Grid item xs={12} md={4} sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50' }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            PNR Number
          </Typography>
          <Typography variant="h4" fontWeight="bold" letterSpacing={2} mb={3}>
            {pnr}
          </Typography>
          
          <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 2, border: '1px solid #eee' }}>
            <QrCode2Icon sx={{ fontSize: 120, color: 'text.primary' }} />
          </Box>
          
          <Typography variant="caption" color="text.secondary" mt={2} textAlign="center">
            Scan this code at the station or show to the TTE.
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};