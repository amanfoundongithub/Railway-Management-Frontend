import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Button, Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

export const StationStopsForm = () => {
  // Start with Origin and Destination
  const [stops, setStops] = useState([
    { id: 1, code: '', arrival: '--:--', departure: '', distance: 0 },
    { id: 2, code: '', arrival: '', departure: '--:--', distance: '' }
  ]);

  const addStop = () => {
    // Insert before the last stop (destination)
    const newStops = [...stops];
    newStops.splice(stops.length - 1, 0, { id: Date.now(), code: '', arrival: '', departure: '', distance: '' });
    setStops(newStops);
  };

  const removeStop = (id) => {
    setStops(stops.filter(s => s.id !== id));
  };

  return (
    <Card elevation={2} sx={{ mb: 4, borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="bold">2. Route & Halts</Typography>
          <Button variant="outlined" size="small" startIcon={<AddLocationAltIcon />} onClick={addStop}>
            Add Halt Station
          </Button>
        </Box>

        {stops.map((stop, index) => (
          <Box key={stop.id} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', border: '1px solid #e0e0e0', borderRadius: 1 }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle2" color="primary">
                {index === 0 ? 'Origin Station' : index === stops.length - 1 ? 'Destination Station' : `Halt ${index}`}
              </Typography>
              {index !== 0 && index !== stops.length - 1 && (
                <IconButton color="error" size="small" onClick={() => removeStop(stop.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField fullWidth size="small" label="Station Code" placeholder="e.g. BCT" />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField fullWidth size="small" label="Arrival Time" type="time" disabled={index === 0} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField fullWidth size="small" label="Departure Time" type="time" disabled={index === stops.length - 1} InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField fullWidth size="small" label="Distance (km)" type="number" />
              </Grid>
            </Grid>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};