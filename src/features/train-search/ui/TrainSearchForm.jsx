import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { SearchFormProvider, useSearchForm } from '../model/SearchFormContext';

import StationSelector from './components/StationSelector';
import DateClassFilters from './components/DateClassFilters';
import SearchOptions from './components/SearchOptions';

const FormWrapper = () => {
  const { 
    formData, 
    handleChange, 
    handleSubmit, 
    errors, 
    setFromStation, 
    setToStation
  } = useSearchForm();

  return (
    <form onSubmit={handleSubmit}>
      <StationSelector 
        onFromStationChange={(station) => {
          setFromStation(station)
        }}
        onToStationChange={(station) => {
          setToStation(station)
        }}
      />
      {errors.general && (
        <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1, ml: 1 }}>
          {errors.general}
        </Typography>
      )}
      <DateClassFilters 
        searchData={formData} 
        onChange={handleChange} 
      />
      <SearchOptions />
    </form>
  );
};

export const TrainSearchForm = () => {
  return (
    <Card 
      elevation={10} 
      sx={{ 
        maxWidth: 1000, 
        mx: 'auto', 
        borderRadius: 4,
        overflow: 'visible',
        mt: -9,
        position: 'relative',
        zIndex: 10
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="700" color="primary.dark">
            Search Your Next Journey
          </Typography>
        </Box>
        <SearchFormProvider>
          <FormWrapper />
        </SearchFormProvider>
      </CardContent>
    </Card>
  );
};