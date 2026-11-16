import React from 'react';
import { Box, Card, Chip, Typography } from '@mui/material';
import { CabVehicleTable } from './CabVehicleTable';

export const CabVendorCard = ({ cab, selectedCab, selectedVehicle, onSelectVehicle }) => {
  const isVendorSelected = (selectedCab?._id || selectedCab?.id) === (cab._id || cab.id);

  return (
    <Card
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 3,
        borderColor: isVendorSelected ? '#1a365d' : '#e0e4e8',
        bgcolor: isVendorSelected ? '#f8faff' : 'background.paper',
        boxShadow: isVendorSelected ? '0 4px 16px rgba(26,54,93,0.08)' : 'none',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="subtitle1" fontWeight={800} color="#1a365d">{cab.name}</Typography>
        <Chip label={`⭐ ${cab.rating}`} size="small" color="success" sx={{ fontWeight: 700 }} />
      </Box>
      <CabVehicleTable
        cab={cab}
        isVendorSelected={isVendorSelected}
        selectedVehicle={selectedVehicle}
        onSelectVehicle={onSelectVehicle}
      />
    </Card>
  );
};
