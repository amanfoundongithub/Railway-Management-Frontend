import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddIcon from '@mui/icons-material/Add';

import { MasterListSelectorModal } from './widgets/MasterListSelectorModal';
import { authService } from "../../../../auth/api/authService";

export const PassengerFormComponent = ({ 
  passengers, 
  addPassenger, 
  removePassenger, 
  updatePassenger, 
  appendPassengers 
}) => {
  const [masterList, setMasterList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAddFromMasterList = (selectedPassengers) => {
    const newPassengers = selectedPassengers.map(p => ({
      name: p.name,
      age: p.age,
      gender: p.gender === 'M' ? 'Male' : p.gender === 'F' ? 'Female' : 'Transgender',
      berth: 'No Preference' 
    }));
    
    appendPassengers(newPassengers);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">Passenger Details</Typography>
        <Box display="flex" gap={1} flexWrap="wrap">
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            size="small"
            onClick={addPassenger}
          >
            Add Passenger
          </Button>
          <Button
            variant="outlined"
            startIcon={<GroupAddIcon />}
            size="small"
            onClick={() => setIsModalOpen(true)}
          >
            Add from Master List
          </Button>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        variant="outlined"
        sx={{ borderRadius: 2, overflowX: 'auto' }}
      >
        <Table size="small" aria-label="Passenger details" sx={{ minWidth: 620 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>Passenger</TableCell>
              <TableCell sx={{ fontWeight: 600, minWidth: 220 }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: 600, width: 110 }}>Age</TableCell>
              <TableCell sx={{ fontWeight: 600, width: 170 }}>Gender</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, width: 72 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {passengers.map((passenger, index) => (
              <TableRow key={passenger.id ?? index} hover>
                <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                  {index + 1}
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    size="small"
                    value={passenger.name}
                    inputProps={{ 'aria-label': `Passenger ${index + 1} full name` }}
                    onChange={(event) => updatePassenger(index, 'name', event.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    size="small"
                    value={passenger.age}
                    inputProps={{
                      min: 1,
                      'aria-label': `Passenger ${index + 1} age`
                    }}
                    onChange={(event) => updatePassenger(index, 'age', event.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    select
                    size="small"
                    value={passenger.gender}
                    SelectProps={{ displayEmpty: true }}
                    inputProps={{ 'aria-label': `Passenger ${index + 1} gender` }}
                    onChange={(event) => updatePassenger(index, 'gender', event.target.value)}
                  >
                    <MenuItem value="" disabled>Select gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Transgender">Transgender</MenuItem>
                  </TextField>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="error"
                    aria-label={`Remove passenger ${index + 1}`}
                    onClick={() => removePassenger(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <MasterListSelectorModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        masterList={masterList}
        onConfirmSelection={handleAddFromMasterList}
      />
    </Box>
  );
};