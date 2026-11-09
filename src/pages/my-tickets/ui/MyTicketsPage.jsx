import React from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar } from '@mui/material';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { TicketListWidget } from '../../../widgets/ticket-history/ui/TicketListWidget';

export const MyTicketsPage = () => {
  // Mock User Data
  const user = { name: 'Aman Raj', email: 'aman@example.com', joinDate: 'Jan 2026' };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          
          {/* Left Sidebar: User Profile Summary */}
          <Grid item xs={12} md={3}>
            <Paper elevation={1} sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
              <Avatar 
                sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'secondary.main', fontSize: '2rem' }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>{user.email}</Typography>
              <Typography variant="caption" display="block" mt={2}>
                Member since {user.joinDate}
              </Typography>
            </Paper>
          </Grid>

          {/* Right Main Content: Ticket History */}
          <Grid item xs={12} md={9}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              My Tickets
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              View and manage your current and past railway bookings.
            </Typography>

            <TicketListWidget />
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};