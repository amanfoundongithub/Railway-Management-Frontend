import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { SearchFormProvider, useSearchForm } from '../model/SearchFormContext';

import StationSelector from './components/StationSelector';
import DateClassFilters from './components/DateClassFilters';
import SearchOptions from './components/SearchOptions';

// Create an inner component to access the context for the form wrapper
const FormWrapper = () => {
  const { handleSubmit, errors } = useSearchForm();

  return (
    <form onSubmit={handleSubmit}>
      <StationSelector />
      
      {/* Show manual validation error */}
      {errors.general && (
        <Typography color="error" variant="caption" sx={{ display: 'block', mt: 1, ml: 1 }}>
          {errors.general}
        </Typography>
      )}

      <DateClassFilters />
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
        borderRadius: 3,
        overflow: 'visible',
        mt: -8,
        position: 'relative',
        zIndex: 10
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 5 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight="700" color="primary.dark">
            Book Ticket
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Search availability and book your next journey.
          </Typography>
        </Box>

        {/* Wrap the child components in our custom native provider */}
        <SearchFormProvider>
          <FormWrapper />
        </SearchFormProvider>

      </CardContent>
    </Card>
  );
};