import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Avatar, CircularProgress } from '@mui/material';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { TicketListWidget } from './components/TicketListWidget';
import { authService } from "../../../screens/auth/api/authService";

export const MyTicketsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await authService.getMe();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
        <Navbar />
        <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>
      </Box>
    );
  }

  // Format the MongoDB createdAt timestamp to 'Jan 2026' format
  const joinDate = user?.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) 
    : 'Recently';

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
                {user?.fullName?.charAt(0) || 'U'}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">{user?.fullName}</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {user?.phoneNumber}
              </Typography>
              <Typography variant="caption" display="block" mt={2} color="primary">
                Member since {joinDate}
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