import React from 'react';
import { Box, Typography } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';

export const TimelineNode = ({ stationName, arrivalTime, status, delay, isCurrent }) => {
  // Determine styles based on whether the train has passed, is currently here, or hasn't arrived yet
  const isPassed = status === 'PASSED';
  
  const dotColor = isCurrent ? 'secondary.main' : isPassed ? 'success.main' : 'grey.400';
  const lineColor = isPassed ? 'success.main' : 'grey.300';
  const delayColor = delay > 0 ? 'error.main' : 'success.main';

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 0, position: 'relative' }}>
      
      {/* Time Column */}
      <Box sx={{ width: 60, textAlign: 'right', pt: 0.5 }}>
        <Typography variant="body2" fontWeight={isCurrent ? 'bold' : 'normal'} color={isPassed ? 'text.primary' : 'text.secondary'}>
          {arrivalTime}
        </Typography>
        {delay > 0 && (
          <Typography variant="caption" color={delayColor} sx={{ display: 'block' }}>
            +{delay}m
          </Typography>
        )}
      </Box>

      {/* The Visual Line & Dot */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box 
          sx={{ 
            width: 16, 
            height: 16, 
            borderRadius: '50%', 
            bgcolor: dotColor, 
            zIndex: 2,
            border: isCurrent ? '4px solid #fde68a' : 'none' // Highlight ring for current station
          }} 
        />
        {/* The connecting vertical line */}
        <Box sx={{ width: 2, flexGrow: 1, bgcolor: lineColor, minHeight: 40, my: 0.5 }} />
      </Box>

      {/* Station Name & Details */}
      <Box sx={{ pt: 0.5, pb: 3, flexGrow: 1 }}>
        <Typography variant="body1" fontWeight={isCurrent ? 'bold' : 'normal'} color={isPassed ? 'text.primary' : 'text.secondary'}>
          {stationName}
        </Typography>
        
        {isCurrent && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1, bgcolor: 'secondary.light', p: 1, borderRadius: 1, width: 'fit-content', color: 'secondary.contrastText' }}>
            <TrainIcon fontSize="small" />
            <Typography variant="caption" fontWeight="bold">Currently at {stationName}</Typography>
          </Box>
        )}
      </Box>

    </Box>
  );
};