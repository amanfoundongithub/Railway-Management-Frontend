import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TimelineNode } from './TimelineNode';

export const TrainTimelineWidget = ({ trainData }) => {
  if (!trainData) return null;

  const title = trainData.trainName || trainData.name;
  const number = trainData.trainNumber || trainData.number;
  const delay = trainData.totalDelay || 0;

  // Determine overall status text based on the mock data
  const isComplete = trainData.route[trainData.route.length - 1].status === 'PASSED';
  const isNotStarted = trainData.route[0].status === 'UPCOMING';
  
  let journeyStatus = 'En Route';
  if (isComplete) journeyStatus = 'Journey Completed';
  if (isNotStarted) journeyStatus = 'Not Started Yet';

  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 4 }}>
        
        {/* Header Data */}
        <Box mb={4} pb={2} borderBottom="1px solid" borderColor="divider">
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            {title} ({number})
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mt={0.5}>
            Started: {trainData.startDate} | Status: <strong>{journeyStatus}</strong>
          </Typography>
          
          <Box mt={1}>
            <Typography variant="body1" component="span" fontWeight="medium">
              Overall Delay:{' '}
            </Typography>
            <Typography 
              variant="body1" 
              component="span" 
              fontWeight="bold"
              color={delay > 0 ? 'error.main' : 'success.main'}
            >
              {delay === 0 ? 'Right Time (RT)' : `${delay} mins late`}
            </Typography>
          </Box>
        </Box>

        {/* The Timeline */}
        <Box>
          {trainData.route?.map((stop, index) => (
            <TimelineNode 
              key={stop.stationCode || index}
              stationName={`${stop.stationName} (${stop.stationCode})`}
              arrivalTime={stop.arrivalTime}
              status={stop.status}
              // Passed stations show actual historical delay, upcoming show expected delay
              delay={stop.delay || 0}
              isCurrent={stop.status === 'CURRENT'}
            />
          ))}
        </Box>

      </CardContent>
    </Card>
  );
};