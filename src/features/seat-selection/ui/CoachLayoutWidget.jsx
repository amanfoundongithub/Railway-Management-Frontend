import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { SeatNode } from './SeatNode';

// A helper function to generate mock coach data
const generateMockCoach = () => {
  const seats = [];
  for (let i = 1; i <= 72; i++) {
    let type = 'Lower';
    if (i % 8 === 2 || i % 8 === 5) type = 'Middle';
    else if (i % 8 === 3 || i % 8 === 6) type = 'Upper';
    else if (i % 8 === 7) type = 'Side Lower';
    else if (i % 8 === 0) type = 'Side Upper';

    seats.push({
      number: i,
      berthType: type,
      status: Math.random() > 0.7 ? 'BOOKED' : 'AVAILABLE', // 30% chance booked
    });
  }
  return seats;
};

const mockSeats = generateMockCoach();

export const CoachLayoutWidget = ({ selectedSeats, maxSelectable, onSeatToggle }) => {
  
  // Group seats into cabins of 8 for layout purposes
  const cabins = [];
  for (let i = 0; i < mockSeats.length; i += 8) {
    cabins.push(mockSeats.slice(i, i + 8));
  }

  const handleToggle = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      onSeatToggle(selectedSeats.filter(s => s !== seatNumber));
    } else {
      if (selectedSeats.length < maxSelectable) {
        onSeatToggle([...selectedSeats, seatNumber]);
      } else {
        alert(`You can only select ${maxSelectable} seats based on passenger count.`);
      }
    }
  };

  return (
    <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Select Your Seats (Coach B1)
        </Typography>
        
        {/* Legend */}
        <Box display="flex" gap={3} mb={3}>
          <Box display="flex" alignItems="center" gap={1}><Box width={16} height={16} bgcolor="success.light" border="1px solid" borderColor="success.main" /> <Typography variant="caption">Available</Typography></Box>
          <Box display="flex" alignItems="center" gap={1}><Box width={16} height={16} bgcolor="secondary.main" /> <Typography variant="caption">Selected</Typography></Box>
          <Box display="flex" alignItems="center" gap={1}><Box width={16} height={16} bgcolor="grey.300" /> <Typography variant="caption">Booked</Typography></Box>
        </Box>

        {/* The Train Car Container */}
        <Box 
          sx={{ 
            display: 'flex', 
            overflowX: 'auto', 
            p: 2, 
            bgcolor: 'grey.100', 
            borderRadius: 2,
            border: '2px solid',
            borderColor: 'grey.300'
          }}
        >
          {cabins.map((cabin, index) => (
            <Box key={index} sx={{ display: 'flex', minWidth: 200, borderRight: '2px dashed #ccc', pr: 2, mr: 2 }}>
              
              {/* Main Berths (Left Side of Corridor) */}
              <Grid container spacing={1} sx={{ width: 120 }}>
                {cabin.slice(0, 6).map(seat => (
                  <Grid item xs={6} key={seat.number}>
                    <SeatNode 
                      seatNumber={seat.number}
                      berthType={seat.berthType}
                      status={seat.status}
                      isSelected={selectedSeats.includes(seat.number)}
                      onToggle={handleToggle}
                    />
                  </Grid>
                ))}
              </Grid>

              {/* Corridor (Walking Space) */}
              <Box sx={{ width: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="caption" color="text.secondary" sx={{ writingMode: 'vertical-rl' }}>
                  Aisle
                </Typography>
              </Box>

              {/* Side Berths (Right Side of Corridor) */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'space-between' }}>
                {cabin.slice(6, 8).map(seat => (
                  <SeatNode 
                    key={seat.number}
                    seatNumber={seat.number}
                    berthType={seat.berthType}
                    status={seat.status}
                    isSelected={selectedSeats.includes(seat.number)}
                    onToggle={handleToggle}
                  />
                ))}
              </Box>

            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};