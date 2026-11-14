import React, { useMemo, useState } from 'react';
import { 
  Typography, TextField, Button, Box, IconButton, 
  Autocomplete, CircularProgress 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import debounce from 'lodash/debounce';

import { stationSearchService } from '../../../home/api/stationSearchService'; 

const normalizeStationCode = (stationCode) => String(stationCode || '').trim().toUpperCase();

const isArrivalAfterDeparture = (previousStop, nextStop) => {
  if (!previousStop.departureTime || !nextStop.arrivalTime) {
    return true;
  }

  const previousDay = Number(previousStop.dayCounter);
  const nextDay = Number(nextStop.dayCounter);
  if (!Number.isInteger(previousDay) || previousDay < 1 || !Number.isInteger(nextDay) || nextDay < 1) {
    return false;
  }
  if (nextDay !== previousDay) {
    return nextDay > previousDay;
  }

  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  return toMinutes(nextStop.arrivalTime) > toMinutes(previousStop.departureTime);
};

const StationAutocomplete = ({ stop, index, handleStationChange, usedStationCodes, label }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchStations = useMemo(
    () =>
      debounce(async (request, callback) => {
        try {
          const results = await stationSearchService.searchStations(request.input);
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
        const formattedOptions = results
          .filter(station => !usedStationCodes.has(normalizeStationCode(station.stationCode)))
          .map(station => ({
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

  const currentValue = stop.stationCode 
    ? { label: `${stop.stationName} (${stop.stationCode})`, stationCode: stop.stationCode, stationName: stop.stationName } 
    : null;

  return (
    <Autocomplete
      fullWidth
      size="small"
      options={options.filter(option => !usedStationCodes.has(normalizeStationCode(option.stationCode)))}
      getOptionLabel={(option) => option.label || ''}
      filterOptions={(x) => x}
      autoComplete
      includeInputInList
      filterSelectedOptions
      getOptionDisabled={(option) => usedStationCodes.has(normalizeStationCode(option.stationCode))}
      value={currentValue}
      noOptionsText="No stations found"
      isOptionEqualToValue={(option, value) => option.stationCode === value.stationCode}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        handleStationChange(index, newValue);
      }}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder="Search station..."
          required
          InputProps={{
            ...params.InputProps,
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
  );
};


export const StationStopsForm = ({ trainData, updateTrainData }) => {
  const stops = trainData.route;
  const [timeErrors, setTimeErrors] = useState({});

  const handleStopChange = (index, field, value) => {
    const updatedStops = [...stops];
    updatedStops[index] = { ...updatedStops[index], [field]: value };

    let error = '';
    if (field === 'arrivalTime' && index > 0 && !isArrivalAfterDeparture(updatedStops[index - 1], updatedStops[index])) {
      error = "Arrival must be after the previous stop's departure.";
    } else if (field === 'departureTime' && index < updatedStops.length - 1 && !isArrivalAfterDeparture(updatedStops[index], updatedStops[index + 1])) {
      error = "Departure must be before the next stop's arrival.";
    } else if (field === 'dayCounter') {
      if (!Number.isInteger(value) || value < 1) {
        error = 'Day must be 1 or later.';
      } else if (
        (index > 0 && !isArrivalAfterDeparture(updatedStops[index - 1], updatedStops[index])) ||
        (index < updatedStops.length - 1 && !isArrivalAfterDeparture(updatedStops[index], updatedStops[index + 1]))
      ) {
        error = 'Day must keep this stop after the previous departure and before the next arrival.';
      }
    }

    if (error) {
      setTimeErrors((currentErrors) => ({ ...currentErrors, [`${index}.${field}`]: error }));
      return;
    }

    if (['arrivalTime', 'departureTime', 'dayCounter'].includes(field)) {
      setTimeErrors({});
    }
    updateTrainData('route', updatedStops);
  };

  const handleStationChange = (index, station) => {
    const stationCode = station?.stationCode || '';
    const normalizedCode = normalizeStationCode(stationCode);
    const isAlreadySelected = normalizedCode && stops.some(
      (stop, stopIndex) => stopIndex !== index && normalizeStationCode(stop.stationCode) === normalizedCode
    );

    if (isAlreadySelected) {
      return;
    }

    const updatedStops = [...stops];
    updatedStops[index] = {
      ...updatedStops[index],
      stationName: station?.stationName || '',
      stationCode,
    };
    updateTrainData('route', updatedStops);
  };

  const addHalt = () => {
    const newStops = [...stops];
    newStops.splice(stops.length - 1, 0, { 
      stationCode: '', 
      stationName: '', 
      arrivalTime: '', 
      departureTime: '', 
      distanceFromSource: '',
      dayCounter: 1
    });
    updateTrainData('route', newStops);
  };

  const removeHalt = (index) => {
    const updatedStops = stops.filter((_, i) => i !== index);
    updateTrainData('route', updatedStops);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        mb={3}
        sx = {{
          mb : 2
        }}
      >
        <Typography variant="h6" fontWeight="bold" color="primary.main" sx = {{
          mb : 1
        }}>
          Configure Train's Route & Halts
        </Typography>
        <Button 
          variant="outlined" 
          size="small" 
          startIcon={<AddLocationAltIcon />} 
          onClick={addHalt}
          color="secondary"
        >
          Add Intermediate Halt
        </Button>
      </Box>

      {stops.map((stop, index) => {
        const isOrigin = index === 0;
        const isDestination = index === stops.length - 1;
        const usedStationCodes = new Set(
          stops
            .filter((_, stopIndex) => stopIndex !== index)
            .map(otherStop => normalizeStationCode(otherStop.stationCode))
            .filter(Boolean)
        );

        return (
          <Box key={index} sx={{ mb: 3, p: { xs: 1.5, sm: 2 }, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: isOrigin || isDestination ? 'primary.main' : 'text.primary', mb : 2 }}>
                {isOrigin ? 'Start (Origin)' : isDestination ? 'End (Destination)' : `Halt ${index}`}
              </Typography>
              {!isOrigin && !isDestination && (
                <IconButton color="error" size="small" onClick={() => removeHalt(index)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
                gap: 2,
              }}
            >
              <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' }, minWidth: 0 }}>
                <StationAutocomplete
                  stop={stop}
                  index={index}
                  handleStationChange={handleStationChange}
                  usedStationCodes={usedStationCodes}
                  label="Search Station"
                />
              </Box>

              <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 3' }, minWidth: 0 }}>
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Arrival" 
                  type="time" 
                  value={stop.arrivalTime}
                  onChange={(e) => handleStopChange(index, 'arrivalTime', e.target.value)}
                  InputLabelProps={{ shrink: true }} 
                  required={!isOrigin}
                  error={Boolean(timeErrors[`${index}.arrivalTime`])}
                  helperText={timeErrors[`${index}.arrivalTime`]}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 3' }, minWidth: 0 }}>
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Departure" 
                  type="time" 
                  disabled={isDestination} 
                  value={stop.departureTime}
                  onChange={(e) => handleStopChange(index, 'departureTime', e.target.value)}
                  InputLabelProps={{ shrink: true }} 
                  required={!isDestination}
                  error={Boolean(timeErrors[`${index}.departureTime`])}
                  helperText={timeErrors[`${index}.departureTime`]}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 6' }, minWidth: 0 }}>
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Dist (km)" 
                  type="number" 
                  disabled={isOrigin}
                  value={stop.distanceFromSource}
                  onChange={(e) => handleStopChange(index, 'distanceFromSource', Number(e.target.value))}
                />
              </Box>
              <Box sx={{ gridColumn: { xs: 'span 6', md: 'span 6' }, minWidth: 0 }}>
                <TextField 
                  fullWidth 
                  size="small" 
                  label="Day No." 
                  type="number"
                  inputProps={{ min: 1 }}
                  value={stop.dayCounter}
                  onChange={(e) => handleStopChange(index, 'dayCounter', Number(e.target.value))}
                  error={Boolean(timeErrors[`${index}.dayCounter`])}
                  helperText={timeErrors[`${index}.dayCounter`]}
                />
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};