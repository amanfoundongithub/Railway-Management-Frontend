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
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../api/adminService';

export const TrainInventoryTable = () => {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
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

  const handleAddTrain = () => navigate('/admin/add-train');

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
    <Card elevation={2} sx={{ borderRadius: 3, p: { xs: 2, md: 3 }, overflow: 'hidden' }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', md: 'center' }}
        mb={3}
        gap={2}
        sx = {{
          mb : 2
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Train Inventory & Status
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="flex-end"
        >
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
            // Added explicit margins to guarantee spacing
            sx={{
              width: { xs: '100%', sm: 300 },
              mr: { sm: 2 },
              mb: { xs: 2, sm: 0 }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: '#1a365d',
              '&:hover': { bgcolor: '#112543' },
              whiteSpace: 'nowrap',
              width: { xs: '100%', sm: 'auto' },
              py: 0.75
            }}
            onClick={handleAddTrain}
          >
            Add Train Route
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