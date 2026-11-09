import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';

const kpiData = [
  { title: "Today's Revenue", value: '₹ 24.5 L', icon: <CurrencyRupeeIcon />, color: '#10b981' },
  { title: 'Tickets Booked', value: '14,230', icon: <ConfirmationNumberIcon />, color: '#3b82f6' },
  { title: 'Active Trains', value: '1,204', icon: <DirectionsRailwayIcon />, color: '#f59e0b' },
];

export const KpiCardsWidget = () => {
  return (
    <Grid container spacing={3} mb={4}>
      {kpiData.map((kpi, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {kpi.title}
                  </Typography>
                  <Typography variant="h4" fontWeight="bold">
                    {kpi.value}
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    bgcolor: `${kpi.color}20`, // 20% opacity background
                    color: kpi.color, 
                    p: 1.5, 
                    borderRadius: '50%',
                    display: 'flex'
                  }}
                >
                  {kpi.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};