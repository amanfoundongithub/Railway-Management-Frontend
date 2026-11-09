import React from 'react';
import { Box, Button, FormControlLabel, Switch } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSearchForm } from '../../model/SearchFormContext';

const SearchOptions = () => {
  // Pull state natively from context
  const { formData, handleChange } = useSearchForm();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        
        <FormControlLabel 
          control={
            <Switch 
              checked={formData.isFlexible} 
              onChange={(e) => handleChange('isFlexible', e.target.checked)} 
            />
          } 
          label="Flexible with Date" 
        />
        
      </Box>

      <Button 
        type="submit" 
        variant="contained" 
        color="secondary" 
        size="large"
        endIcon={<ArrowForwardIcon />}
      >
        Search Trains
      </Button>
    </Box>
  );
};

export default SearchOptions;