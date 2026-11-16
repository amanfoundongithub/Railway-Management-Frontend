import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

export const CabBookingConfirmation = ({
  selectedCab,
  selectedVehicle,
  dropLocation,
  loading,
  onDropLocationChange,
  onBook,
}) => (
  <Box mt={1} p={2} bgcolor="#f8faff" borderRadius={3} border="1px solid #e0e4e8">
    <Typography variant="subtitle2" fontWeight={700} color="#1a365d" mb={1.5}>
      Selected: {selectedVehicle.type} from {selectedCab.name}
    </Typography>
    <TextField
      fullWidth
      label="Enter Drop-off Location / Hotel"
      placeholder="e.g., Connaught Place, Hotel Taj"
      value={dropLocation}
      onChange={(event) => onDropLocationChange(event.target.value)}
      sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }}
    />
    <Button
      fullWidth
      variant="contained"
      color="success"
      size="large"
      onClick={onBook}
      disabled={loading}
      sx={{ py: 1.5, fontWeight: 800, borderRadius: 2, fontSize: '1.05rem' }}
    >
      {loading ? 'Confirming...' : 'Confirm & Book Cab'}
    </Button>
  </Box>
);
