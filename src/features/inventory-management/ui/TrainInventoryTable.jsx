import React from 'react';
import { 
  Card, CardContent, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, IconButton, Button, Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';

const mockInventory = [
  { id: '12951', name: 'Mumbai Rajdhani', capacity: 1200, booked: 1180, status: 'Active' },
  { id: '12903', name: 'Golden Temple Mail', capacity: 1500, booked: 850, status: 'Active' },
  { id: '12009', name: 'Shatabdi Express', capacity: 900, booked: 900, status: 'Full' },
  { id: '19019', name: 'Dehradun Express', capacity: 1100, booked: 0, status: 'Cancelled' },
];

export const TrainInventoryTable = () => {
  const getStatusColor = (status) => {
    if (status === 'Active') return 'success';
    if (status === 'Full') return 'warning';
    return 'error';
  };

  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Train Inventory & Status
          </Typography>
          <Button variant="contained" color="primary" size="small">
            + Add Train Route
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: 'grey.100' }}>
              <TableRow>
                <TableCell fontWeight="bold">Train No.</TableCell>
                <TableCell fontWeight="bold">Name</TableCell>
                <TableCell align="center" fontWeight="bold">Occupancy</TableCell>
                <TableCell align="center" fontWeight="bold">Status</TableCell>
                <TableCell align="right" fontWeight="bold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockInventory.map((train) => (
                <TableRow key={train.id} hover>
                  <TableCell fontWeight="bold">{train.id}</TableCell>
                  <TableCell>{train.name}</TableCell>
                  <TableCell align="center">
                    {train.booked} / {train.capacity}
                    <Typography variant="caption" display="block" color="text.secondary">
                      {Math.round((train.booked / train.capacity) * 100)}% Booked
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={train.status} 
                      color={getStatusColor(train.status)} 
                      size="small" 
                      sx={{ fontWeight: 'bold' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" size="small">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton color="error" size="small">
                      <BlockIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};