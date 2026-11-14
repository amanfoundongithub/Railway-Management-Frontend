import React from 'react';
import { 
  Card, CardContent, Typography, Box, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip 
} from '@mui/material';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';

export const RouteTableWidget = ({ scheduleData }) => {
  if (!scheduleData) return null;

  return (
    <Card elevation={3} sx={{ borderRadius: 2, maxWidth: 1000, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.dark', color: 'white', p: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <DirectionsRailwayIcon fontSize="large" />
          <Typography variant="h5" fontWeight="bold">
            {scheduleData.trainName} ({scheduleData.trainNumber})
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Runs on: {scheduleData.runsOn.join(', ')}
        </Typography>
      </Box>

      {/* Timetable */}
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table size="small" sx={{ minWidth: 650 }}>
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell><b>#</b></TableCell>
                <TableCell><b>Station Name (Code)</b></TableCell>
                <TableCell><b>Arrives</b></TableCell>
                <TableCell><b>Departs</b></TableCell>
                <TableCell><b>Halt</b></TableCell>
                <TableCell><b>Distance</b></TableCell>
                <TableCell><b>Day</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scheduleData.route.map((stop, index) => (
                <TableRow key={stop.stationCode} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Typography component="span" variant="body2" fontWeight="bold">
                      {stop.stationName}
                    </Typography>
                    {' '}
                    <Typography component="span" variant="caption" color="text.secondary">
                      ({stop.stationCode})
                    </Typography>
                  </TableCell>
                  <TableCell>{stop.arrivalTime}</TableCell>
                  <TableCell>{stop.departureTime}</TableCell>
                  <TableCell>
                    {stop.haltTime === 'Source' || stop.haltTime === 'Destination' ? (
                      <Chip label={stop.haltTime} size="small" color="secondary" />
                    ) : (
                      <Typography variant="body2">{stop.haltTime}</Typography>
                    )}
                  </TableCell>
                  <TableCell>{stop.distance} km</TableCell>
                  <TableCell>Day {stop.day}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};