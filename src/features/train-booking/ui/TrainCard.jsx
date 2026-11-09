import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../../app/providers/BookingProvider'; // <-- Import Context

export const TrainCard = ({ train }) => {
  const navigate = useNavigate();
  const { setSelectedTrain, setSelectedClass } = useBooking(); // <-- Hook into Context

  const handleBook = (trainClass) => {
    // Save the selected data to global memory
    setSelectedTrain(train);
    setSelectedClass(trainClass);
    
    // Move to the booking page
    navigate('/book');
  };

  return (
    <Card elevation={2} sx={{ mb: 3 }}>
      {/* ... (Train Info Top Row remains the same) ... */}
      
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2, mt: 3, overflowX: 'auto', pb: 1 }}>
          {train.availability.map((cls, index) => (
            <Card key={index} variant="outlined" sx={{ minWidth: 150 }}>
              <CardContent>
                <Typography variant="subtitle2" fontWeight="bold">{cls.className}</Typography>
                <Typography variant="subtitle2">₹{cls.price}</Typography>
                
                <Button 
                  fullWidth 
                  variant="contained" 
                  color={cls.status === 'AVAILABLE' ? 'success' : 'error'}
                  disabled={cls.status !== 'AVAILABLE'}
                  onClick={() => handleBook(cls)} // <-- Trigger the save & navigate
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};