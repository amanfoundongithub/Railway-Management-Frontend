import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { DropLocationMapPicker } from './DropLocationMapPicker';

export const CabBookingConfirmation = ({
  station,
  selectedCab,
  selectedVehicle,
  dropLocation,
  dropCoords,
  distanceKm,
  estimatedFare,
  loading,
  onDropLocationChange,
  onMapSelect,
  onBook,
}) => {
  const stationCoords = station?.coordinates || { lat: 28.6415, lng: 77.2208 };

  return (
    <Box mt={1} p={2} bgcolor="#f8faff" borderRadius={3} border="1px solid #e0e4e8">
      <Typography variant="subtitle2" fontWeight={700} color="#1a365d" mb={1.5}>
        Selected: {selectedVehicle.type} from {selectedCab.name}
      </Typography>

      <Box mb={2}>
        <DropLocationMapPicker
          stationCoords={stationCoords}
          stationName={station?.name}
          dropPoint={dropCoords ? { ...dropCoords, address: dropLocation } : null}
          onSelectDrop={onMapSelect}
        />
      </Box>

      <TextField
        fullWidth
        label="Enter Drop-off Location / Hotel"
        placeholder="Click on the map above or type manually (e.g., Connaught Place, Hotel Taj)"
        value={dropLocation}
        onChange={(event) => onDropLocationChange(event.target.value)}
        sx={{ mb: 2, bgcolor: 'white', borderRadius: 2 }}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2.5}>
        <Typography variant="body2" color="text.secondary">
          Estimated Distance:{' '}
          <strong>{distanceKm > 0 ? `${distanceKm} km` : '10 km (default)'}</strong>
          {' '} (Base ₹{selectedVehicle.baseFare} + ₹{selectedVehicle.pricePerKm}/km)
        </Typography>
        <Typography variant="subtitle1" fontWeight={800} color="#1a365d">
          Estimated Fare: ₹{estimatedFare}
        </Typography>
      </Box>

      <Button
        fullWidth
        variant="contained"
        color="success"
        size="large"
        onClick={onBook}
        disabled={loading || !dropLocation}
        sx={{ py: 1.5, fontWeight: 800, borderRadius: 2, fontSize: '1.05rem' }}
      >
        {loading ? 'Confirming...' : `Confirm & Book Cab (₹${estimatedFare})`}
      </Button>
    </Box>
  );
};