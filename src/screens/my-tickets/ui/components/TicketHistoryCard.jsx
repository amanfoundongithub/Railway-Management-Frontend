import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Button, Chip } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

export const TicketHistoryCard = ({ ticket }) => {
  const navigate = useNavigate();
  
  // Aligning with your live backend schema ('SUCCESS', 'PENDING', 'CANCELLED')
  const isUpcoming = ticket.bookingStatus === 'SUCCESS' && new Date(ticket.journeyDate) >= new Date();
  const isCancelled = ticket.bookingStatus === 'CANCELLED' || ticket.bookingStatus === 'FAILED';

  const statusColor = isUpcoming ? 'success' : isCancelled ? 'error' : 'default';
  
  // Format the date for display
  const formattedDate = new Date(ticket.journeyDate).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  // Handle passenger count whether it's an array (live) or number (mock fallback)
  const passengerCount = Array.isArray(ticket.passengers) ? ticket.passengers.length : ticket.passengers;

  return (
    <Card elevation={2} sx={{ mb: 3, borderRadius: 2, borderLeft: '4px solid', borderLeftColor: `${statusColor}.main` }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          
          {/* Left: Journey Info */}
          <Grid item xs={12} md={7}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography variant="h6" fontWeight="bold">
                {ticket.sourceStation || ticket.source}
              </Typography>
              <ArrowForwardIcon color="action" fontSize="small" />
              <Typography variant="h6" fontWeight="bold">
                {ticket.destinationStation || ticket.destination}
              </Typography>
              <Chip 
                label={ticket.bookingStatus || ticket.status} 
                color={statusColor} 
                size="small" 
                sx={{ ml: 2, fontWeight: 'bold' }} 
              />
            </Box>
            
            <Box display="flex" alignItems="center" gap={1} color="text.secondary">
              <TrainIcon fontSize="small" />
              <Typography variant="body2">
                {ticket.train?.trainName || ticket.trainName} ({ticket.train?.trainNumber || ticket.trainNumber}) | {formattedDate}
              </Typography>
            </Box>
          </Grid>

          {/* Middle: PNR & Passenger Count */}
          <Grid item xs={12} md={3}>
            <Typography variant="body2" color="text.secondary">PNR Number</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{ticket.pnr}</Typography>
            <Typography variant="body2" color="text.secondary">
              {passengerCount} Passenger(s)
            </Typography>
          </Grid>

          {/* Right: Actions */}
          <Grid item xs={12} md={2} textAlign={{ md: 'right' }}>
            <Button 
              variant="outlined" 
              color="primary" 
              size="small" 
              fullWidth
              // Added PNR to the URL so the Confirmation page knows which ticket to fetch
              onClick={() => navigate(`/ticket/confirmation?pnr=${ticket.pnr}`)} 
              sx={{ mb: 1 }}
            >
              View Details
            </Button>
            {isUpcoming && (
              <Button 
                variant="text" 
                color="error" 
                size="small" 
                fullWidth
                // Added PNR to the URL so the Cancel page knows which ticket to fetch
                onClick={() => navigate(`/cancel?pnr=${ticket.pnr}`)}
              >
                Cancel
              </Button>
            )}
          </Grid>
          
        </Grid>
      </CardContent>
    </Card>
  );
};