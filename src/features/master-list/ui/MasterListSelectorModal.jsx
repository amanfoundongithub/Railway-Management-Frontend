import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, List, ListItem, ListItemButton, ListItemIcon, 
  ListItemText, Checkbox, Typography 
} from '@mui/material';
import { useMasterList } from '../model/useMasterList';

export const MasterListSelectorModal = ({ open, onClose, onImport, currentPassengerCount }) => {
  const { savedPassengers } = useMasterList();
  const [selectedIds, setSelectedIds] = useState([]);

  const handleToggle = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
    );
  };

  const handleImport = () => {
    const availableSlots = 6 - currentPassengerCount;
    if (selectedIds.length > availableSlots) {
      alert(`You can only add ${availableSlots} more passengers to this ticket.`);
      return;
    }

    const passengersToImport = savedPassengers.filter(p => selectedIds.includes(p.id));
    onImport(passengersToImport);
    setSelectedIds([]); // Reset selection
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">Select from Master List</DialogTitle>
      <DialogContent dividers sx={{ p: 0 }}>
        {savedPassengers.length === 0 ? (
          <Typography variant="body2" color="text.secondary" p={3} textAlign="center">
            You have no saved passengers. Add them in your Profile.
          </Typography>
        ) : (
          <List disablePadding>
            {savedPassengers.map((p) => (
              <ListItem key={p.id} disablePadding divider>
                <ListItemButton onClick={() => handleToggle(p.id)}>
                  <ListItemIcon>
                    <Checkbox 
                      edge="start" 
                      checked={selectedIds.includes(p.id)} 
                      disableRipple 
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={p.name} 
                    secondary={`${p.age} Yrs | ${p.gender} | ${p.idType}`} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button 
          onClick={handleImport} 
          variant="contained" 
          color="secondary"
          disabled={selectedIds.length === 0}
        >
          Import ({selectedIds.length}) Passengers
        </Button>
      </DialogActions>
    </Dialog>
  );
};