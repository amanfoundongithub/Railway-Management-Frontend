import React from 'react';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { HotelBookingConfirmation } from './HotelBookingConfirmation';
import { HotelTable } from './HotelTable';

export const HotelBookingDialog = ({
  open,
  station,
  selectedHotel,
  loading,
  onClose,
  onSelectHotel,
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
          Retiring Rooms & Hotels at {station?.name} ({station?.code})
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Select your preferred room category from the table below
        </Typography>
      </Box>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers sx={{ p: 3 }}>
      {station?.hotels?.length === 0 ? (
        <Typography textAlign="center" py={4} color="text.secondary">
          No accommodations available at this station.
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={4}>
          <HotelTable
            hotels={station?.hotels}
            selectedHotel={selectedHotel}
            onSelectHotel={onSelectHotel}
          />
          {selectedHotel && (
            <HotelBookingConfirmation
              hotel={selectedHotel}
              loading={loading}
              onBook={onBook}
            />
          )}
        </Box>
      )}
    </DialogContent>
  </Dialog>
);