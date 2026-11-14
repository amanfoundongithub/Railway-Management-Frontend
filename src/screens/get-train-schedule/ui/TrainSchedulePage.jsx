import React, { useState } from 'react';
import { Box, Container, Alert } from '@mui/material';
import { Navbar } from '../../../header/ui/Navbar';
import { ScheduleSearchForm } from './components/ScheduleSearchForm';
import { RouteTableWidget } from './components/RouteTableWidget';
import { getTrainScheduleService } from '../api/getTrainScheduleService';

const DAYS_MAP = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const TrainSchedulePage = () => {
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateHaltTime = (arrivalTime, departureTime) => {
    if (!arrivalTime || !departureTime) return '-';
    
    const [aH, aM] = arrivalTime.split(':').map(Number);
    const [dH, dM] = departureTime.split(':').map(Number);
    
    let diff = (dH * 60 + dM) - (aH * 60 + aM);
    if (diff < 0) diff += 24 * 60; 
    return `${diff} min`;
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    setScheduleData(null);

    try {
      const train = await getTrainScheduleService.getTrainSchedule(query);
      const formattedResponse = {
        trainNumber: train.trainNumber,
        trainName: train.trainName,
        runsOn: train.runningDays.map(dayNum => DAYS_MAP[dayNum]),
        route: train.route.map((station, index) => {
          
          let haltTime = '';
          if (index === 0) haltTime = 'Source';
          else if (index === train.route.length - 1) haltTime = 'Destination';
          else haltTime = calculateHaltTime(station.arrivalTime, station.departureTime);

          return {
            stationName: station.stationName,
            stationCode: station.stationCode,
            arrivalTime: station.arrivalTime,
            departureTime: station.departureTime,
            haltTime: haltTime,
            distance: station.distanceFromSource,
            day: station.dayCounter
          };
        })
      };

      setScheduleData(formattedResponse);
    } catch (err) {
      setError(err.response?.data?.message || 'Train not found or server error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <ScheduleSearchForm onSearch={handleSearch} loading={loading} />
        
        {error && (
          <Alert severity="error" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            {error}
          </Alert>
        )}

        {scheduleData && (
          <RouteTableWidget scheduleData={scheduleData} />
        )}
      </Container>
    </Box>
  );
};