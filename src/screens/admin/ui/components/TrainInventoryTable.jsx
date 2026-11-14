import React, { useEffect, useState } from 'react';
import { 
  Card, Box, Typography, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, IconButton, CircularProgress 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../api/adminService';

export const TrainInventoryTable = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await adminService.getTrainInventory();
        setInventory(data);
      } catch (error) {
        console.error("Failed to fetch inventory", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  const handleAddTrain = () => {
    navigate('/admin/add-train'); 
  };

  const getStatusChip = (train) => {
    if (!train.isActive) {
      return <Chip label="Cancelled" color="error" size="small" sx={{ fontWeight: 'bold', minWidth: 80 }} />;
    }
    if (train.currentOccupancy >= train.totalCapacity) {
      return <Chip label="Full" color="warning" size="small" sx={{ fontWeight: 'bold', minWidth: 80 }} />;
    }
    return <Chip label="Active" color="success" size="small" sx={{ fontWeight: 'bold', minWidth: 80 }} />;
  };

  return (
    <Card elevation={2} sx={{ borderRadius: 3, p: 3, overflow: 'hidden' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h6" fontWeight="bold">
          Train Inventory & Status
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ bgcolor: '#1a365d', '&:hover': { bgcolor: '#112543' } }}
          onClick={handleAddTrain}
        >
          + Add Train Route
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Train No.</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Occupancy</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((train) => {
                const occupancyPercent = train.totalCapacity > 0 
                  ? Math.round((train.currentOccupancy / train.totalCapacity) * 100) 
                  : 0;

                return (
                  <TableRow key={train._id} hover>
                    <TableCell>{train.trainNumber}</TableCell>
                    <TableCell fontWeight="medium">{train.trainName}</TableCell>
                    <TableCell>
                      {train.currentOccupancy} / {train.totalCapacity} 
                      <Typography component="span" variant="caption" color="text.secondary" ml={1}>
                        {occupancyPercent}% Booked
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(train)}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <BlockIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              
              {inventory.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    No trains provisioned yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Card>
  );
};