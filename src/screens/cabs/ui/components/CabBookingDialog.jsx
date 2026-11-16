import React from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CabBookingConfirmation } from './CabBookingConfirmation';
import { CabVendorCard } from './CabVendorCard';

export const CabBookingDialog = ({
  open,
  station,
  selectedCab,
  selectedVehicle,
  dropLocation,
  loading,
  onClose,
  onSelectVehicle,
  onDropLocationChange,
  onBook,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    maxWidth="md"
    fullWidth
    PaperProps={{ sx: { borderRadius: 4, p: 1.5, maxHeight: '85vh' } }}
  >
    <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
      <Box>
        <Typography variant="h6" fontWeight={800} color="#1a365d">
          Book Cab at {station?.name} ({station?.code})
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Select your preferred vendor and vehicle from the table below
        </Typography>
      </Box>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers sx={{ p: 3 }}>
      {station?.cabs?.length === 0 ? (
        <Typography textAlign="center" py={4} color="text.secondary">
          No cabs available at this station.
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={4}>
          {station?.cabs.map((cab) => (
            <CabVendorCard
              key={cab._id || cab.id}
              cab={cab}
              selectedCab={selectedCab}
              selectedVehicle={selectedVehicle}
              onSelectVehicle={onSelectVehicle}
            />
          ))}

          {selectedVehicle && (
            <CabBookingConfirmation
              selectedCab={selectedCab}
              selectedVehicle={selectedVehicle}
              dropLocation={dropLocation}
              loading={loading}
              onDropLocationChange={onDropLocationChange}
              onBook={onBook}
            />
          )}
        </Box>
      )}
    </DialogContent>
  </Dialog>
);
