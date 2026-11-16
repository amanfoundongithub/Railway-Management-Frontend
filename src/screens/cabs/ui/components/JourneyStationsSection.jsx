import React from 'react';
import { Box, Card, Chip, Grid, Paper, Typography } from '@mui/material';

export const JourneyStationsSection = ({ journeyStations, onSelectStation }) => (
  <Paper sx={{ p: 4, borderRadius: 3 }}>
    <Typography variant="h6" fontWeight={800} color="#1a365d" gutterBottom>
      Journey Stops & Cab Availability
    </Typography>
    <Typography variant="body2" color="text.secondary" mb={3}>
      Click an upcoming station to open cab booking options:
    </Typography>

    <Grid container spacing={3}>
      {journeyStations.map((station) => (
        <Grid item xs={12} sm={4} key={station.code}>
          <Card
            onClick={() => onSelectStation(station)}
            sx={{
              p: 2.5,
              cursor: station.canBookCab ? 'pointer' : 'not-allowed',
              borderRadius: 3,
              opacity: station.canBookCab ? 1 : 0.6,
              border: '1px solid #e0e4e8',
              transition: '0.2s',
              '&:hover': station.canBookCab
                ? { borderColor: '#1a365d', transform: 'translateY(-2px)' }
                : {},
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontWeight={700}>{station.name} ({station.code})</Typography>
              <Chip
                size="small"
                label={station.status}
                color={station.status === 'NEXT' ? 'primary' : 'default'}
              />
            </Box>
            <Typography variant="caption" color="text.secondary">
              {station.cabs.length} cab fleets available
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Paper>
);
