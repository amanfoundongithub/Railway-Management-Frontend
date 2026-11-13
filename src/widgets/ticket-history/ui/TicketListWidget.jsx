import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, CircularProgress, Alert } from '@mui/material';
import { TicketHistoryCard } from '../../../features/ticket-management/ui/TicketHistoryCard';
import { bookingService } from '../../../pages/booking/api/bookingService';
export const TicketListWidget = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const data = await bookingService.getUserBookings();
        setTickets(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load tickets.');
      } finally {
        setLoading(false);
      }
    };
    fetchMyTickets();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // Filter based on your live backend status strings
  const filteredTickets = tickets.filter(ticket => 
    tabIndex === 0 
      ? (ticket.bookingStatus === 'PENDING' || ticket.bookingStatus === 'SUCCESS') 
      : (ticket.bookingStatus === 'CANCELLED' || ticket.bookingStatus === 'FAILED' || new Date(ticket.journeyDate) < new Date())
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="Upcoming Journeys" />
          <Tab label="Past / Cancelled" />
        </Tabs>
      </Box>

      {filteredTickets.length === 0 ? (
        <Box textAlign="center" py={5} bgcolor="white" borderRadius={2} border="1px dashed #ccc">
          <Typography variant="body1" color="text.secondary">
            No tickets found in this category.
          </Typography>
        </Box>
      ) : (
        filteredTickets.map(ticket => (
          <TicketHistoryCard key={ticket._id} ticket={ticket} />
        ))
      )}
    </Box>
  );
};