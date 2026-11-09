import React from 'react';
import { Box, Container, Typography, AppBar, Toolbar, Avatar } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import { KpiCardsWidget } from '../../../widgets/admin-kpis/ui/KpiCardsWidget';
import { TrainInventoryTable } from '../../../features/inventory-management/ui/TrainInventoryTable';

export const AdminDashboardPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      
      {/* Custom Admin Header */}
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <TrainIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1, letterSpacing: 1 }}>
            NXT_RAIL | ADMIN COMMAND
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body2">Station Master (NDLS)</Typography>
            <Avatar sx={{ bgcolor: 'secondary.main', width: 32, height: 32 }}>SM</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        
        <Box mb={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            System Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage rolling stock, monitor revenue, and update operational statuses.
          </Typography>
        </Box>

        {/* 1. High-Level Metrics */}
        <KpiCardsWidget />

        {/* 2. Deep Dive Data Table */}
        <TrainInventoryTable />

      </Container>
    </Box>
  );
};