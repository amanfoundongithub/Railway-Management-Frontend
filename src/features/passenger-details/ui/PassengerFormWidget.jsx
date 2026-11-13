import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, TextField, MenuItem, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddIcon from '@mui/icons-material/Add';

import { MasterListSelectorModal } from '../../train-booking/ui/MasterListSelectorModal';
import { authService } from '../../authentication/api/authService';

export const PassengerFormWidget = ({ 
  passengers, 
  addPassenger, 
  removePassenger, 
  updatePassenger, 
  appendPassengers 
}) => {
  const [masterList, setMasterList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch the logged-in user's Master List on mount
  useEffect(() => {
    const fetchMasterList = async () => {
      try {
        const user = await authService.getMe();
        if (user && user.masterList) {
          setMasterList(user.masterList);
        }
      } catch (error) {
        console.error("Could not load master list", error);
      }
    };
    fetchMasterList();
  }, []);

  // Receive selected passengers from the modal
  const handleAddFromMasterList = (selectedPassengers) => {
    // Map backend gender codes to frontend Select labels
    const newPassengers = selectedPassengers.map(p => ({
      name: p.name,
      age: p.age,
      gender: p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : 'Transgender',
      berth: 'No Preference' // Ensure this matches your default state keys
    }));
    
    appendPassengers(newPassengers);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">Passenger Details</Typography>
        
        {/* Trigger for the Master List Modal */}
        <Button 
          variant="outlined" 
          startIcon={<GroupAddIcon />} 
          size="small"
          onClick={() => setIsModalOpen(true)}
        >
          Add from Master List
        </Button>
      </Box>

      {/* Render Current Passengers */}
      {passengers.map((p, index) => (
        <Grid container spacing={2} key={index} mb={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField 
              fullWidth label="Full Name" size="small" 
              value={p.name} 
              onChange={(e) => updatePassenger(index, 'name', e.target.value)} 
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField 
              fullWidth label="Age" type="number" size="small" 
              value={p.age} 
              onChange={(e) => updatePassenger(index, 'age', e.target.value)} 
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField 
              fullWidth select label="Gender" size="small" 
              value={p.gender} 
              onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Transgender">Transgender</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={1} textAlign="center">
            <IconButton color="error" onClick={() => removePassenger(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      <Button 
        startIcon={<AddIcon />} 
        onClick={addPassenger} 
        sx={{ mt: 1 }}
      >
        Add Passenger Manually
      </Button>

      {/* Mount the Modal */}
      <MasterListSelectorModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        masterList={masterList}
        onConfirmSelection={handleAddFromMasterList}
      />
    </Box>
  );
};