import React, { useEffect, useState } from 'react';
import {
  Card, Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton, CircularProgress,
  TablePagination, TextField, InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import RestoreIcon from '@mui/icons-material/Restore';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../api/adminService';

export const TrainInventoryTable = () => {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);

  // Server-side State
  const [page, setPage] = useState(0); // MUI uses 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce the search input by 500ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(0); // Reset to page 0 when search changes
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Fetch from backend whenever page, rowsPerPage, or debouncedSearch changes
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        // Backend expects 1-based page index, so we pass page + 1
        const data = await adminService.getTrainInventory(page + 1, rowsPerPage, debouncedSearch);
        setInventory(data.inventory);
        setTotalRows(data.totalCount);
      } catch (error) {
        console.error("Failed to fetch inventory", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, [page, rowsPerPage, debouncedSearch]);

  const handleAddTrain = () => navigate('/admin/wizard');

  const handleToggleStatus = async (trainId, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await adminService.toggleTrainStatus(trainId, newStatus);
      setInventory(prev => prev.map(train =>
        train._id === trainId ? { ...train, isActive: newStatus } : train
      ));
    } catch (error) {
      console.error("Failed to toggle train status", error);
      alert("Could not update train status. Please try again.");
    }
  };

  const getStatusChip = (train) => {
    if (!train.isActive) return <Chip label="Cancelled" color="error" size="small" sx={{ fontWeight: 'bold', minWidth: 80 }} />;
    if (train.currentOccupancy >= train.totalCapacity) return <Chip label="Full" color="warning" size="small" sx={{ fontWeight: 'bold', minWidth: 80 }} />;
    return <Chip label="Active" color="success" size="small" sx={{ fontWeight: 'bold', minWidth: 80 }} />;
  };

  return (
    <Card elevation={2} sx={{ borderRadius: 3, p: 3, overflow: 'hidden' }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Typography variant="h6" fontWeight="bold">
          Train Inventory & Status
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap" alignItems="center">
          <TextField
            size="small"
            placeholder="Search trains..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ bgcolor: '#1a365d', '&:hover': { bgcolor: '#112543' }, whiteSpace: 'nowrap' }}
            onClick={handleAddTrain}
          >
            + Add Train Route
          </Button>
        </Box>
      </Box>

      {/* Show loading overlay while allowing table headers to render */}
      <Box sx={{ position: 'relative' }}>
        {loading && (
          <Box
            sx={{
              position: 'absolute', top: 50, left: 0, right: 0, bottom: 0,
              display: 'flex', justifyContent: 'center', alignItems: 'flex-start', pt: 5,
              bgcolor: 'rgba(255, 255, 255, 0.7)', zIndex: 1
            }}
          >
            <CircularProgress />
          </Box>
        )}

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
                  ? Math.round((train.currentOccupancy / train.totalCapacity) * 100) : 0;

                return (
                  <TableRow key={train._id} hover sx={{ opacity: train.isActive ? 1 : 0.6 }}>
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
                      <IconButton
                        size="small"
                        color={train.isActive ? "error" : "success"}
                        onClick={() => handleToggleStatus(train._id, train.isActive)}
                      >
                        {train.isActive ? <BlockIcon fontSize="small" /> : <RestoreIcon fontSize="small" />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

              {!loading && inventory.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    {totalRows === 0 && searchInput ? "No trains match your search." : "No trains provisioned yet."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Box>
    </Card>
  );
};