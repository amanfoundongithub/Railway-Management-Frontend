import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Divider, Chip } from '@mui/material';

export const PnrDetailsCard = ({ pnrData }) => {
  if (!pnrData) return null;

  return (
    <Card elevation={2} sx={{ borderRadius: 2, maxWidth: 800, mx: 'auto' }}>
      {/* Header Banner */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">PNR: {pnrData.pnrNumber}</Typography>
        <Chip 
          label="CHART PREPARED" 
          size="small" 
          sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} 
        />
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Train & Journey Details */}
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Train</Typography>
            <Typography variant="subtitle1" fontWeight="bold">
              {pnrData.trainName} ({pnrData.trainNumber})
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Journey Date</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{pnrData.date}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">From</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{pnrData.source}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">To</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{pnrData.destination}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">Class / Quota</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{pnrData.class} / {pnrData.quota}</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 3 }} />

        {/* Passenger Status Table */}
        <Typography variant="h6" fontWeight="bold" mb={2}>Passenger Status</Typography>
        
        <Box sx={{ bgcolor: 'grey.100', p: 2, borderRadius: 1, display: 'flex', fontWeight: 'bold', mb: 1 }}>
          <Box flex={1}>Passenger</Box>
          <Box flex={1}>Booking Status</Box>
          <Box flex={1}>Current Status</Box>
        </Box>

        {pnrData.passengers.map((p, idx) => (
          <Box key={idx} sx={{ p: 2, display: 'flex', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box flex={1}>
              <Typography variant="body2">Passenger {idx + 1}</Typography>
            </Box>
            <Box flex={1}>
              <Typography variant="body2" color="text.secondary">{p.bookingStatus}</Typography>
            </Box>
            <Box flex={1}>
              <Typography 
                variant="body2" 
                fontWeight="bold" 
                color={p.currentStatus.includes('CNF') ? 'success.main' : 'warning.main'}
              >
                {p.currentStatus}
              </Typography>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};