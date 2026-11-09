import React from 'react';
import { Box, TextField, IconButton, Autocomplete } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';

// Mock data: In a real app, this comes from an API debounce search
const stations = [
  { label: 'New Delhi (NDLS)', code: 'NDLS' },
  { label: 'Mumbai Central (BCT)', code: 'BCT' },
  { label: 'Howrah Junction (HWH)', code: 'HWH' },
  { label: 'Chennai Central (MAS)', code: 'MAS' },
  { label: 'Secunderabad (SC)', code: 'SC' }
];

const StationSelector = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
      
      <Autocomplete
        fullWidth
        options={stations}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="From" 
            placeholder="Leaving from..."
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon color="action" sx={{ ml: 1, mr: -0.5 }} />
            }}
          />
        )}
      />

      <IconButton 
        color="secondary" 
        sx={{ 
          transform: { xs: 'rotate(90deg)', md: 'rotate(0deg)' },
          bgcolor: 'action.hover'
        }}
      >
        <SwapHorizIcon fontSize="large" />
      </IconButton>

      <Autocomplete
        fullWidth
        options={stations}
        renderInput={(params) => (
          <TextField 
            {...params} 
            label="To" 
            placeholder="Going to..."
            InputProps={{
              ...params.InputProps,
              startAdornment: <LocationOnIcon color="action" sx={{ ml: 1, mr: -0.5 }} />
            }}
          />
        )}
      />

    </Box>
  );
};

export default StationSelector;