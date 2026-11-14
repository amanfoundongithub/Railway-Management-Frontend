import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, MenuItem, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const MasterListWidget = ({ masterList = [], onUpdateList }) => {
  const [newPassenger, setNewPassenger] = useState({ name: '', age: '', gender: '' });

  const handleAdd = () => {
    if (!newPassenger.name || !newPassenger.age || !newPassenger.gender) return;
    onUpdateList('add', newPassenger);
    setNewPassenger({ name: '', age: '', gender: '' }); // Reset form
  };

  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Master Passenger List
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Save frequent co-passengers for faster booking.
        </Typography>

        {/* Add New Passenger Form */}
        <Grid container spacing={2} mb={3} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField 
              fullWidth label="Full Name" size="small" 
              value={newPassenger.name} 
              onChange={e => setNewPassenger({...newPassenger, name: e.target.value})} 
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField 
              fullWidth label="Age" type="number" size="small" 
              value={newPassenger.age} 
              onChange={e => setNewPassenger({...newPassenger, age: e.target.value})} 
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField 
              fullWidth select label="Gender" size="small" 
              value={newPassenger.gender} 
              onChange={e => setNewPassenger({...newPassenger, gender: e.target.value})}
            >
              <MenuItem value="M">Male</MenuItem>
              <MenuItem value="F">Female</MenuItem>
              <MenuItem value="T">Transgender</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              fullWidth variant="contained" 
              startIcon={<PersonAddIcon />} 
              onClick={handleAdd}
              disabled={!newPassenger.name || !newPassenger.age || !newPassenger.gender}
            >
              Add
            </Button>
          </Grid>
        </Grid>

        {/* Saved Passengers List */}
        <List sx={{ bgcolor: 'grey.50', borderRadius: 1 }}>
          {masterList.length === 0 ? (
            <Typography variant="body2" color="text.secondary" textAlign="center" py={2}>
              No passengers saved yet.
            </Typography>
          ) : (
            masterList.map((p, index) => (
              <ListItem 
                key={p._id || index} 
                secondaryAction={
                  <IconButton edge="end" color="error" onClick={() => onUpdateList('remove', p)}>
                    <DeleteIcon />
                  </IconButton>
                }
                sx={{ borderBottom: index !== masterList.length - 1 ? '1px solid #e0e0e0' : 'none' }}
              >
                <ListItemText 
                  primary={<Typography fontWeight="bold">{p.name}</Typography>} 
                  secondary={`Age: ${p.age} | Gender: ${p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : 'Transgender'}`} 
                />
              </ListItem>
            ))
          )}
        </List>
      </CardContent>
    </Card>
  );
};