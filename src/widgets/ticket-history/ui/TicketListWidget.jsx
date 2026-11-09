import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { TicketHistoryCard } from '../../../features/ticket-management/ui/TicketHistoryCard';

const mockTickets = [
  {
    id: 1, pnr: '847362910', trainName: 'Mumbai Rajdhani Exp', trainNumber: '12951',
    source: 'BCT', destination: 'NDLS', date: '15 Nov 2026', passengers: 2, status: 'UPCOMING'
  },
  {
    id: 2, pnr: '239485710', trainName: 'Shatabdi Express', trainNumber: '12009',
    source: 'NDLS', destination: 'BCT', date: '01 Oct 2026', passengers: 1, status: 'COMPLETED'
  },
  {
    id: 3, pnr: '994827361', trainName: 'Dehradun Express', trainNumber: '19019',
    source: 'BCT', destination: 'DDN', date: '12 Aug 2026', passengers: 3, status: 'CANCELLED'
  }
];

export const TicketListWidget = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const filteredTickets = mockTickets.filter(ticket => 
    tabIndex === 0 ? ticket.status === 'UPCOMING' : ticket.status !== 'UPCOMING'
  );

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabIndex} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
          <Tab label="Upcoming Journeys" />
          <Tab label="Past Journeys" />
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
          <TicketHistoryCard key={ticket.id} ticket={ticket} />
        ))
      )}
    </Box>
  );
};