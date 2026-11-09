import React from 'react';
import { Card, CardContent, Typography, Box, TextField, MenuItem, Button, IconButton, Grid } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export const PassengerFormWidget = ({ passengers, addPassenger, removePassenger, updatePassenger }) => {
  const berthOptions = ['No Preference', 'Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper'];
  const genderOptions = ['Male', 'Female', 'Transgender'];

  return (
    <Card elevation={2} sx={{ mb: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Passenger Details
        </Typography>

        {passengers.map((passenger, index) => (
          <Box key={passenger.id} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle2" color="primary">Passenger {index + 1}</Typography>
              {passengers.length > 1 && (
                <IconButton color="error" onClick={() => removePassenger(passenger.id)} size="small">
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField 
                  fullWidth size="small" label="Full Name" 
                  value={passenger.name} 
                  onChange={(e) => updatePassenger(passenger.id, 'name', e.target.value)} 
                />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField 
                  fullWidth size="small" label="Age" type="number" 
                  value={passenger.age} 
                  onChange={(e) => updatePassenger(passenger.id, 'age', e.target.value)} 
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField 
                  select fullWidth size="small" label="Gender" 
                  value={passenger.gender} 
                  onChange={(e) => updatePassenger(passenger.id, 'gender', e.target.value)}
                >
                  {genderOptions.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField 
                  select fullWidth size="small" label="Berth Pref." 
                  value={passenger.berth} 
                  onChange={(e) => updatePassenger(passenger.id, 'berth', e.target.value)}
                >
                  {berthOptions.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        ))}

        <Button 
          variant="outlined" 
          startIcon={<PersonAddAlt1Icon />} 
          onClick={addPassenger}
          disabled={passengers.length >= 6}
        >
          Add Passenger
        </Button>
      </CardContent>
    </Card>
  );
};