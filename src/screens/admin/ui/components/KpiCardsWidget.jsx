import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Skeleton } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import TrainIcon from '@mui/icons-material/Train';
import { adminService } from '../../api/adminService';

export const KpiCardsWidget = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatCurrency = (amount) => {
    if (amount >= 100000) return `₹ ${(amount / 100000).toFixed(2)} L`;
    return `₹ ${amount.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <Grid container spacing={3} mb={4}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} sm={4} key={item}>
            <Skeleton variant="rounded" height={140} />
          </Grid>
        ))}
      </Grid>
    );
  }

  const kpis = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats?.revenue || 0),
      icon: <CurrencyRupeeIcon fontSize="small" />,
      color: "success"
    },
    {
      title: "Tickets Booked",
      value: (stats?.ticketsBooked || 0).toLocaleString('en-IN'),
      icon: <ConfirmationNumberIcon fontSize="small" />,
      color: "primary"
    },
    {
      title: "Active Trains",
      value: (stats?.activeTrains || 0).toLocaleString('en-IN'),
      icon: <TrainIcon fontSize="small" />,
      color: "warning"
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 2 }}>
      {kpis.map((kpi, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card elevation={1} sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx = {{
                display : 'flex',
                flexDirection : 'row'
              }}>
                {
                  kpi.icon
                }
                <Typography variant="body2" color="text.secondary" fontWeight="medium" gutterBottom
                sx = {{
                  ml : 1
                }}>
                  {kpi.title}
                </Typography>
              </Box>
              
              <Typography variant="h4" fontWeight="bold" mb={2}>
                {kpi.value}
              </Typography>
              
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};