import React, { useMemo, useState } from 'react';
import { Box, TextField, IconButton, Autocomplete, CircularProgress } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash/debounce';
import { stationService } from '../../api/stationService';

const StationSelector = ({
  onFromStationChange,
  onToStationChange
}) => {

  const [fromStation, setFromStation] = useState(null);
  const [toStation, setToStation] = useState(null);

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStations = useMemo(
    () =>
      debounce(async (request, callback) => {
        try {
          const results = await stationService.searchStations(request.input);
          callback(results);
        } catch (error) {
          console.error('Failed to fetch stations', error);
          callback([]);
        }
      }, 400),
    []
  );

  const handleInputChange = (event, newInputValue) => {
    if (newInputValue) {
      setLoading(true);
      fetchStations({ input: newInputValue }, (results) => {
        const formattedOptions = results.map(station => ({
          ...station,
          label: `${station.stationName} (${station.stationCode})`
        }));
        setOptions(formattedOptions);
        setLoading(false);
      });
    } else {
      setOptions([]);
    }
  };

  const handleSwap = () => {
    const temp = fromStation;

    setFromStation(toStation);
    if (onFromStationChange) {
      onFromStationChange(toStation);
    }

    setToStation(temp);
    if (onToStationChange) {
      onToStationChange(temp);
    }

  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>

      <Autocomplete
        fullWidth
        options={options}
        getOptionLabel={(option) => option.label || ''}
        filterOptions={(x) => x}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={fromStation}
        noOptionsText="No stations found"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setFromStation(newValue);
          if (onFromStationChange) onFromStationChange(newValue);
        }}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="From"
            placeholder="Leaving from..."
            InputProps={{
              ...params.InputProps,
              startAdornment: <SearchIcon color="action" sx={{ ml: 1, mr: -0.5 }} />,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps?.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

      <IconButton
        color="secondary"
        onClick={handleSwap}
        sx={{
          transform: { xs: 'rotate(90deg)', md: 'rotate(0deg)' },
          bgcolor: 'action.hover',
          transition: 'transform 0.3s ease-in-out',
          '&:active': {
            transform: { xs: 'rotate(270deg)', md: 'rotate(180deg)' } // Cool spin effect on click
          }
        }}
      >
        <SwapHorizIcon fontSize="large" />
      </IconButton>

      <Autocomplete
        fullWidth
        options={options}
        getOptionLabel={(option) => option.label || ''}
        filterOptions={(x) => x}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={toStation}
        noOptionsText="No stations found"
        onChange={(event, newValue) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setToStation(newValue);
          if (onToStationChange) onToStationChange(newValue);
        }}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="To"
            placeholder="Going to..."
            InputProps={{
              ...params.InputProps,
              startAdornment: <LocationOnIcon color="action" sx={{ ml: 1, mr: -0.5 }} />,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps?.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />

    </Box>
  );
};

export default StationSelector;