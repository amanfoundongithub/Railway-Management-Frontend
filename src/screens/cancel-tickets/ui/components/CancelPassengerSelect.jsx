import React from 'react';
import { Card, CardContent, Typography, Box, Checkbox, FormControlLabel, Divider, Chip } from '@mui/material';

export const CancelPassengerSelect = ({ passengers, selectedForCancel, onTogglePassenger }) => {
  return (
    <Card elevation={2} sx={{ borderRadius: 2, mb: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Select Passengers to Cancel
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Check the box next to the passenger(s) whose journey you wish to cancel.
        </Typography>

        {passengers.map((p, index) => {
          const isSelected = selectedForCancel.includes(p.id);
          const isAlreadyCancelled = p.status === 'CANCELLED';

          return (
            <Box key={p.id}>
              <Box sx={{ display: 'flex', alignItems: 'center', py: 2, opacity: isAlreadyCancelled ? 0.6 : 1 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={isSelected} 
                      onChange={() => onTogglePassenger(p.id)}
                      disabled={isAlreadyCancelled}
                      color="error"
                    />
                  }
                  label={
                    <Box display="flex" flexDirection="column" gap={0.5}>
                      <Box display="flex" alignItems="center" gap={2}>
                        <Typography variant="body1" fontWeight="bold">
                          {p.name} ({p.age}, {p.gender.charAt(0)})
                        </Typography>
                        <Chip 
                          label={p.status} 
                          size="small" 
                          color={p.status === 'CONFIRMED' ? 'success' : p.status === 'CANCELLED' ? 'error' : 'warning'}
                          sx={{ height: 20, fontSize: '0.7rem', fontWeight: 'bold' }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {isAlreadyCancelled 
                          ? 'Ticket Cancelled' 
                          : `Coach: ${p.coach} | Seat: ${p.seat}`
                        }
                      </Typography>
                    </Box>
                  }
                  sx={{ width: '100%', ml: 0 }}
                />
              </Box>
              {index < passengers.length - 1 && <Divider />}
            </Box>
          );
        })}
      </CardContent>
    </Card>
  );
};