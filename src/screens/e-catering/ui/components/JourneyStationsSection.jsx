import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Grid,
  Paper,
  Typography,
  } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';

export const JourneyStationsSection = ({ pnr, journeyStations, selectedStation, handleSelectStation, loading }) => {
  return (
    <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 4, border: '1px solid #e0e4e8' }}>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Box sx={{ p: 1.5, bgcolor: '#f0f4f8', borderRadius: 2, display: 'flex' }}>
          <TrainIcon sx={{ color: '#1a365d' }} />
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={800} color="#1a365d">Journey Status</Typography>
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            PNR {pnr} · Select an upcoming station for delivery
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {journeyStations.map((station) => {
          const isSelected = selectedStation?.code === station.code;
          const stationLabel = isSelected
            ? 'Selected'
            : station.status === 'DEPARTED'
              ? 'Departed'
              : station.status === 'NEXT'
                ? 'Next stop'
                : 'Upcoming';

          return (
            <Grid item xs={12} sm={4} key={station.code}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  borderColor: isSelected ? '#1a365d' : '#e0e4e8',
                  borderWidth: isSelected ? 2 : 1,
                  borderStyle: 'solid',
                  bgcolor: isSelected ? '#f8faff' : 'background.paper',
                  transition: 'all 0.2s ease',
                  '&:hover': station.canOrder
                    ? { borderColor: '#1a365d', boxShadow: '0 8px 24px rgba(26,54,93,0.08)', transform: 'translateY(-2px)' }
                    : undefined,
                }}
              >
                <CardActionArea disabled={!station.canOrder || loading} onClick={() => handleSelectStation(station)} sx={{ height: '100%', p: 2.5 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" fontWeight={700} sx={{ color: isSelected ? '#1a365d' : 'text.primary' }}>
                      {station.name}
                    </Typography>
                    <Chip
                      size="small"
                      label={stationLabel}
                      sx={{
                        fontWeight: 700,
                        bgcolor: isSelected ? '#1a365d' : station.status === 'NEXT' ? '#e3f2fd' : 'transparent',
                        color: isSelected ? 'white' : station.status === 'NEXT' ? '#1976d2' : 'text.secondary',
                        border: station.status === 'NEXT' || isSelected ? 'none' : '1px solid',
                        borderColor: 'divider',
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary" fontWeight={500}>
                    Delivery at {station.time}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};
