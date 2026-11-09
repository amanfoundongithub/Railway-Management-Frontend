import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Button, Chip } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

export const TicketHistoryCard = ({ ticket }) => {
  const navigate = useNavigate();
  const isUpcoming = ticket.status === 'UPCOMING';
  const isCancelled = ticket.status === 'CANCELLED';

  const statusColor = isUpcoming ? 'success' : isCancelled ? 'error' : 'default';

  return (
    <Card elevation={2} sx={{ mb: 3, borderRadius: 2, borderLeft: '4px solid', borderLeftColor: `${statusColor}.main` }}>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          
          {/* Left: Journey Info */}
          <Grid item xs={12} md={7}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Typography variant="h6" fontWeight="bold">
                {ticket.source}
              </Typography>
              <ArrowForwardIcon color="action" fontSize="small" />
              <Typography variant="h6" fontWeight="bold">
                {ticket.destination}
              </Typography>
              <Chip label={ticket.status} color={statusColor} size="small" sx={{ ml: 2, fontWeight: 'bold' }} />
            </Box>
            
            <Box display="flex" alignItems="center" gap={1} color="text.secondary">
              <TrainIcon fontSize="small" />
              <Typography variant="body2">
                {ticket.trainName} ({ticket.trainNumber}) | {ticket.date}
              </Typography>
            </Box>
          </Grid>

          {/* Middle: PNR & Passenger Count */}
          <Grid item xs={12} md={3}>
            <Typography variant="body2" color="text.secondary">PNR Number</Typography>
            <Typography variant="subtitle1" fontWeight="bold">{ticket.pnr}</Typography>
            <Typography variant="body2" color="text.secondary">
              {ticket.passengers} Passenger(s)
            </Typography>
          </Grid>

          {/* Right: Actions */}
          <Grid item xs={12} md={2} textAlign={{ md: 'right' }}>
            <Button 
              variant="outlined" 
              color="primary" 
              size="small" 
              fullWidth
              onClick={() => navigate('/ticket/confirmation')} // Mock navigating to details
              sx={{ mb: 1 }}
            >
              View Details
            </Button>
            {isUpcoming && (
              <Button variant="text" color="error" size="small" fullWidth>
                Cancel
              </Button>
            )}
          </Grid>
          
        </Grid>
      </CardContent>
    </Card>
  );
};