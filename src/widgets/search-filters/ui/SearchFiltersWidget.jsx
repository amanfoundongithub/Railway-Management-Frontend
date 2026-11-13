// src/widgets/search-filters/ui/SearchFiltersWidget.jsx
import React from 'react';
import { Card, CardContent, Typography, FormGroup, FormControlLabel, Checkbox, Divider, Box } from '@mui/material';

export const SearchFiltersWidget = ({ filters, onFilterChange }) => {
  
  const handleToggle = (category, value) => {
    onFilterChange(category, value);
  };

  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Filters
        </Typography>
        
        {/* Quick Filters */}
        <Box mb={2}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={filters.availableOnly} 
                  onChange={() => handleToggle('availableOnly', !filters.availableOnly)} 
                />
              }
              label="Available Seats Only"
            />
          </FormGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Departure Time */}
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>Departure Time</Typography>
          <FormGroup>
            {[
              { label: 'Morning (06:00 - 12:00)', id: 'morning' },
              { label: 'Afternoon (12:00 - 18:00)', id: 'afternoon' },
              { label: 'Evening (18:00 - 00:00)', id: 'evening' },
              { label: 'Night (00:00 - 06:00)', id: 'night' }
            ].map(time => (
              <FormControlLabel
                key={time.id}
                control={
                  <Checkbox 
                    checked={filters.times.includes(time.id)} 
                    onChange={() => handleToggle('times', time.id)} 
                  />
                }
                label={time.label}
              />
            ))}
          </FormGroup>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Coach Class */}
        <Box>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>Coach Class</Typography>
          <FormGroup>
            {['1A', '2A', '3A', 'SL', 'CC', 'UR'].map(coachClass => (
              <FormControlLabel
                key={coachClass}
                control={
                  <Checkbox 
                    checked={filters.classes.includes(coachClass)} 
                    onChange={() => handleToggle('classes', coachClass)} 
                  />
                }
                label={coachClass}
              />
            ))}
          </FormGroup>
        </Box>
        
      </CardContent>
    </Card>
  );
};