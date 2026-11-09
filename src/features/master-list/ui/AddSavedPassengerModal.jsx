import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, TextField, MenuItem, Grid 
} from '@mui/material';

export const AddSavedPassengerModal = ({ open, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: '', age: '', gender: 'Male', idType: 'Aadhar', idNumber: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    if (!formData.name || !formData.age || !formData.idNumber) {
      alert("Please fill all fields.");
      return;
    }
    onAdd(formData);
    setFormData({ name: '', age: '', gender: 'Male', idType: 'Aadhar', idNumber: '' });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">Add New Passenger</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={8}>
            <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleChange} size="small" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField fullWidth label="Age" name="age" type="number" value={formData.age} onChange={handleChange} size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange} size="small">
              {['Male', 'Female', 'Transgender'].map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="ID Card Type" name="idType" value={formData.idType} onChange={handleChange} size="small">
              {['Aadhar', 'PAN', 'Voter ID', 'Passport'].map(id => <MenuItem key={id} value={id}>{id}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="ID Card Number" name="idNumber" value={formData.idNumber} onChange={handleChange} size="small" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Save Passenger</Button>
      </DialogActions>
    </Dialog>
  );
};