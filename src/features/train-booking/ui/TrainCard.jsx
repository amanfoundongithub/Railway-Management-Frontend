import React from 'react';
import { Card, CardContent, Typography, Box, Button, Divider, Grid } from '@mui/material';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../app/providers/BookingProvider'; 

const mapRunningDays = (daysArray = []) => {
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
    setSelectedTrain(train);
    setSelectedClass(coachClass);
    navigate('/book');
  };

  return (
    <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent sx = {{ ml : 1, mt : 2}}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box alignItems="center" sx = {{
            display : "flex",
            flexDirection : "row"
          }}>
            <DirectionsRailwayIcon color="primary" sx = {{ mt : 0.5, mr : 1}}/>
            <Typography variant="h6" fontWeight="bold">
              {train.trainName} ({train.trainNumber})
            </Typography>
          </Box>
          <Box display="flex">
            {mapRunningDays(train.runningDays)}
          </Box>
        </Box>

        <Grid container alignItems="center" spacing={2} sx={{ mb: 3, mt : 2 }}>
          <Grid item xs={4} sx = {{mr : 1}}>
            <Typography variant="h5" fontWeight="bold">{departureTime}</Typography>
            <Typography variant="body2" color="text.secondary">
              {sourceStop?.stationName || train.source}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Box color="text.secondary" sx = {{
              display : "flex",
              flexDirection : "row"
            }}>
              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, mt: 1 }} />
              <Typography variant="subtitle2" sx = {{ 
                pt : 0.75, 
                fontWeight : "bold"
              }}>{duration}</Typography>
            </Box>
            <Divider sx={{ color : 'black' }}>
              <Typography variant="subtitle1" color="text.secondary" sx = {{
                fontWeight : "bold",
                ml : -1
              }}>
                ({destStop?.distanceFromSource - (sourceStop?.distanceFromSource || 0)} km)
              </Typography>
            </Divider>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <Typography variant="h5" fontWeight="bold">{arrivalTime}</Typography>
            <Typography variant="body2" color="text.secondary">
              {destStop?.stationName || train.destination}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
          {train.coachClasses.map((coachClass, index) => {
            // Using actual live data
            const isAvailable = coachClass.availableSeats > 0;
            const statusText = isAvailable 
              ? `AVL ${coachClass.availableSeats}` 
              : `WL ${coachClass.waitlistCount}`;
            
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
                    {statusText}
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