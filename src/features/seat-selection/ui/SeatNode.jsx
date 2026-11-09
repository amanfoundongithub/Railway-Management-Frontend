import React from 'react';
import { Box, Typography } from '@mui/material';

export const SeatNode = ({ seatNumber, berthType, status, isSelected, onToggle }) => {
  // Determine colors based on state
  let bgColor = 'grey.300';
  let borderColor = 'grey.400';
  let cursor = 'pointer';

  if (status === 'BOOKED') {
    bgColor = 'grey.200';
    borderColor = 'grey.300';
    cursor = 'not-allowed';
  } else if (isSelected) {
    bgColor = 'secondary.main'; // Orange
    borderColor = 'secondary.dark';
  } else if (status === 'AVAILABLE') {
    bgColor = 'success.light'; // Greenish
    borderColor = 'success.main';
  }

  // Abbreviate Berth Type (e.g., Lower -> L, Upper -> U)
  const typeCode = berthType.charAt(0);

  return (
    <Box
      onClick={() => status === 'AVAILABLE' && onToggle(seatNumber)}
      sx={{
        width: 45,
        height: 60,
        bgcolor: bgColor,
        border: '2px solid',
        borderColor: borderColor,
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: cursor,
        transition: 'all 0.2s',
        '&:hover': {
          transform: status === 'AVAILABLE' ? 'scale(1.05)' : 'none',
          boxShadow: status === 'AVAILABLE' ? 2 : 0,
        },
      }}
    >
      <Typography variant="caption" fontWeight="bold" color={isSelected ? 'white' : 'text.primary'}>
        {seatNumber}
      </Typography>
      <Typography variant="caption" sx={{ fontSize: '0.65rem', color: isSelected ? 'white' : 'text.secondary' }}>
        {typeCode}
      </Typography>
    </Box>
  );
};