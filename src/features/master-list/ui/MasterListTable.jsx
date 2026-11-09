import React, { useState } from 'react';
import { 
  Card, CardContent, Typography, Box, Button, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, IconButton 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useMasterList } from '../model/useMasterList';
import { AddSavedPassengerModal } from './AddSavedPassengerModal';

export const MasterListTable = () => {
  const { savedPassengers, addSavedPassenger, deleteSavedPassenger } = useMasterList();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="bold">Saved Passengers</Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="small" 
            startIcon={<PersonAddIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            Add New
          </Button>
        </Box>

        <TableContainer>
          <Table size="small">
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Age/Gender</b></TableCell>
                <TableCell><b>ID Card</b></TableCell>
                <TableCell align="right"><b>Action</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedPassengers.length === 0 && (
                <TableRow><TableCell colSpan={4} align="center">No saved passengers.</TableCell></TableRow>
              )}
              {savedPassengers.map((p) => (
                <TableRow key={p.id}>
                  <TableCell fontWeight="bold">{p.name}</TableCell>
                  <TableCell>{p.age} Yrs, {p.gender}</TableCell>
                  <TableCell>{p.idType} ({p.idNumber})</TableCell>
                  <TableCell align="right">
                    <IconButton color="error" size="small" onClick={() => deleteSavedPassenger(p.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <AddSavedPassengerModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addSavedPassenger} 
      />
    </Card>
  );
};