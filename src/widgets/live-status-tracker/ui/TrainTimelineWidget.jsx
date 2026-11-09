import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TimelineNode } from '../../../features/live-tracking/ui/TimelineNode';

export const TrainTimelineWidget = ({ trainData }) => {
  if (!trainData) return null;

  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 4 }}>
        
        {/* Header Data */}
        <Box mb={4} pb={2} borderBottom="1px solid" borderColor="divider">
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            {trainData.name} ({trainData.number})
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Started: {trainData.startDate} | Current Delay: <span style={{ color: 'red' }}>{trainData.totalDelay} mins</span>
          </Typography>
        </Box>

        {/* The Timeline */}
        <Box>
          {trainData.route.map((stop, index) => (
            <TimelineNode 
              key={stop.stationCode}
              stationName={`${stop.stationName} (${stop.stationCode})`}
              arrivalTime={stop.arrivalTime}
              status={stop.status}
              delay={stop.delay}
              isCurrent={stop.status === 'CURRENT'}
            />
          ))}
        </Box>

      </CardContent>
    </Card>
  );
};