import React, { useState } from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, List, ListItem, ListItemText, Checkbox, Typography 
} from '@mui/material';

export const MasterListSelectorModal = ({ open, onClose, masterList, onConfirmSelection }) => {
  const [selected, setSelected] = useState([]);

  const handleToggle = (passenger) => {
    setSelected(prev => {
      const isSelected = prev.some(p => p._id === passenger._id);
      if (isSelected) {
        return prev.filter(p => p._id !== passenger._id);
      } else {
        return [...prev, passenger];
      }
    });
  };

  const handleConfirm = () => {
    onConfirmSelection(selected);
    setSelected([]); // Reset for next time
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle fontWeight="bold">Select from Master List</DialogTitle>
      <DialogContent dividers>
        {masterList.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={2}>
            No passengers saved in your Master List. 
            Add them from your Profile.
          </Typography>
        ) : (
          <List>
            {masterList.map((p) => {
              const isChecked = selected.some(sel => sel._id === p._id);
              return (
                <ListItem 
                  key={p._id} 
                  button 
                  onClick={() => handleToggle(p)}
                  sx={{ borderBottom: '1px solid #eee' }}
                >
                  <Checkbox checked={isChecked} color="primary" />
                  <ListItemText 
                    primary={<Typography fontWeight="bold">{p.name}</Typography>} 
                    secondary={`Age: ${p.age} | Gender: ${p.gender}`} 
                  />
                </ListItem>
              );
            })}
          </List>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button 
          onClick={handleConfirm} 
          variant="contained" 
          disabled={selected.length === 0}
        >
          Add Selected ({selected.length})
        </Button>
      </DialogActions>
    </Dialog>
  );
};