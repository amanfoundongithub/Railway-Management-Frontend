import React from 'react';
import { Card, CardContent, Typography, Box, Button, Divider, Grid } from '@mui/material';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../app/providers/BookingProvider'; 

// Helper function for Days formatting
const mapRunningDays = (daysArray) => {
  const dayMap = { 0: 'S', 1: 'M', 2: 'T', 3: 'W', 4: 'T', 5: 'F', 6: 'S' };
  return [0, 1, 2, 3, 4, 5, 6].map(day => (
    <Typography 
      key={day} 
      variant="caption" 
      sx={{ 
        fontWeight: daysArray.includes(day) ? 'bold' : 'normal',
        color: daysArray.includes(day) ? 'primary.main' : 'text.disabled',
        mx: 0.2
      }}
    >
      {dayMap[day]}
    </Typography>
  ));
};

// Helper function to calculate time duration
const calculateDuration = (depTime, arrTime, startDay, endDay) => {
  if (!depTime || !arrTime) return 'N/A';
  
  const [depH, depM] = depTime.split(':').map(Number);
  const [arrH, arrM] = arrTime.split(':').map(Number);
  
  let durationMins = (arrH * 60 + arrM) - (depH * 60 + depM);
  
  if (endDay > startDay) {
    durationMins += (endDay - startDay) * 24 * 60;
  }
  
  const h = Math.floor(durationMins / 60);
  const m = durationMins % 60;
  return `${h}h ${m}m`;
};

export const TrainCard = ({ train }) => {
  const navigate = useNavigate();
  const { setSelectedTrain, setSelectedClass } = useBooking(); 

  // Extract accurate source and destination data from the route array
  const sourceStop = train.route.find(stop => stop.stationCode === train.source);
  const destStop = train.route.find(stop => stop.stationCode === train.destination);

  const departureTime = sourceStop?.departureTime || 'N/A';
  const arrivalTime = destStop?.arrivalTime || 'N/A';
  const duration = calculateDuration(
    departureTime, 
    arrivalTime, 
    sourceStop?.dayCounter || 1, 
    destStop?.dayCounter || 1
  );

  const handleBook = (coachClass) => {
    // Save the selected data to global memory using your context
    setSelectedTrain(train);
    setSelectedClass(coachClass);
    
    // Move to the booking page
    navigate('/book');
  };

  return (
    <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent>
        {/* Top Row: Train Info */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <DirectionsRailwayIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              {train.trainName} ({train.trainNumber})
            </Typography>
          </Box>
          <Box display="flex">
            {mapRunningDays(train.runningDays)}
          </Box>
        </Box>

        {/* Middle Row: Timings & Route */}
        <Grid container alignItems="center" spacing={2} sx={{ mb: 3 }}>
          {/* Source */}
          <Grid item xs={4}>
            <Typography variant="h5" fontWeight="bold">{departureTime}</Typography>
            <Typography variant="body2" color="text.secondary">
              {sourceStop?.stationName || train.source}
            </Typography>
          </Grid>

          {/* Duration */}
          <Grid item xs={4} textAlign="center">
            <Box display="flex" alignItems="center" justifyContent="center" color="text.secondary">
              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="caption">{duration}</Typography>
            </Box>
            <Divider sx={{ my: 1 }}>
              <Typography variant="caption" color="text.secondary">
                {destStop?.distanceFromSource - (sourceStop?.distanceFromSource || 0)} km
              </Typography>
            </Divider>
          </Grid>

          {/* Destination */}
          <Grid item xs={4} textAlign="right">
            <Typography variant="h5" fontWeight="bold">{arrivalTime}</Typography>
            <Typography variant="body2" color="text.secondary">
              {destStop?.stationName || train.destination}
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Row: Availability / Classes (Scrollable horizontally) */}
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
          {train.coachClasses.map((coachClass, index) => {
            // Mocking status since the current API only gives totalSeats
            const isAvailable = coachClass.totalSeats > 0;
            
            return (
              <Card key={index} variant="outlined" sx={{ minWidth: 160 }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {coachClass.classType}
                    </Typography>
                    <Typography variant="subtitle2" color="primary.main" fontWeight="bold">
                      ₹{coachClass.baseFare}
                    </Typography>
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    fontWeight="bold" 
                    color={isAvailable ? 'success.main' : 'error.main'}
                    sx={{ mb: 2 }}
                  >
                    {isAvailable ? `AVL ${coachClass.totalSeats}` : 'WAITLIST'}
                  </Typography>
                  
                  <Button 
                    fullWidth 
                    variant="contained" 
                    size="small"
                    color={isAvailable ? 'success' : 'error'}
                    disabled={!isAvailable}
                    onClick={() => handleBook(coachClass)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </Box>

      </CardContent>
    </Card>
  );
};