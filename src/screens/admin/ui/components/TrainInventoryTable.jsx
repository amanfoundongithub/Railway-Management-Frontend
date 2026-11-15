import React, { useEffect, useState } from 'react';
import {
  Card, Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, IconButton, CircularProgress,
  TablePagination, TextField, Checkbox, Select, MenuItem,
  FormControl, InputLabel, Collapse
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../api/adminService';

export const TrainInventoryTable = () => {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);

  // Pagination & Selection
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTrains, setSelectedTrains] = useState([]);

  // Column Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    trainNumber: '',
    trainName: '',
    status: 'all'
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Debounce typed filters (number, name)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
      setPage(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  // Fetch Logic
  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        console.log(debouncedFilters)
        const data = await adminService.getTrainInventory(page + 1, rowsPerPage, debouncedFilters.trainNumber);
        setInventory(data.inventory);
        setTotalRows(data.totalCount);
        setSelectedTrains([]); // clear selection on page/filter change
      } catch (error) {
        console.error("Failed to fetch inventory", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, [page, rowsPerPage, debouncedFilters]);

  // Handle Checkbox Selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = inventory.map((n) => n._id);
      setSelectedTrains(newSelected);
      return;
    }
    setSelectedTrains([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedTrains.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedTrains, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedTrains.slice(1));
    } else if (selectedIndex === selectedTrains.length - 1) {
      newSelected = newSelected.concat(selectedTrains.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedTrains.slice(0, selectedIndex),
        selectedTrains.slice(selectedIndex + 1),
      );
    }
    setSelectedTrains(newSelected);
  };

  const isSelected = (id) => selectedTrains.indexOf(id) !== -1;

  // Bulk Action
  const handleBulkToggle = async () => {
    if (selectedTrains.length === 0) return;
    setLoading(true);
    try {
      await adminService.bulkToggleTrainStatus(selectedTrains);
      
      // Optimistic UI update - invert status of selected
      setInventory(prev => prev.map(train =>
        selectedTrains.includes(train._id) ? { ...train, isActive: !train.isActive } : train
      ));
      setSelectedTrains([]);
    } catch (error) {
      console.error("Failed to bulk toggle", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const getStatusChip = (train) => {
    if (!train.isActive) return <Chip label="Cancelled" color="error" size="small" sx={{ fontWeight: 'bold', minWidth: 80 }} />;
    if (train.currentOccupancy >= train.totalCapacity) return <Chip label="Full" color="warning" size="small" sx={{ fontWeight: 'bold', minWidth: 80 }} />;
    return <Chip label="Active" color="success" size="small" sx={{ fontWeight: 'bold', minWidth: 80 }} />;
  };

  return (
    <Card elevation={2} sx={{ borderRadius: 3, p: { xs: 2, md: 3 }, overflow: 'hidden' }}>
      
      {/* Header Area using strict sx props */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', md: 'center' }, 
        mb: 3, 
        gap: 2 
      }}>
        <Typography variant="h5" fontWeight="bold">
          Train Inventory & Status
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: 'center', 
          justifyContent: 'flex-end', 
          gap: 2, 
          width: { xs: '100%', md: 'auto' } 
        }}>
          {selectedTrains.length > 0 && (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<SwapHorizIcon />}
              onClick={handleBulkToggle}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Toggle Status ({selectedTrains.length})
            </Button>
          )}
          
          <Button 
            variant={showFilters ? "contained" : "outlined"}
            color="primary"
            startIcon={<FilterListIcon />}
            onClick={() => setShowFilters(!showFilters)}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Filters
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ bgcolor: '#1a365d', '&:hover': { bgcolor: '#112543' }, whiteSpace: 'nowrap', py: 0.75 }}
            onClick={() => navigate('/admin/add-train')}
          >
            Add Train Route
          </Button>
        </Box>
      </Box>

      {/* Expandable Filter Row using strict sx props */}
      <Collapse in={showFilters}>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mb: 3,
          p: 2,
          bgcolor: 'grey.50',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200',
          alignItems: 'center'
        }}>
          <TextField
            size="small"
            label="Filter Train No."
            value={filters.trainNumber}
            onChange={(e) => handleFilterChange('trainNumber', e.target.value)}
            sx={{ minWidth: 150, flexGrow: 1 }}
          />
          <TextField
            size="small"
            label="Filter Train Name"
            value={filters.trainName}
            onChange={(e) => handleFilterChange('trainName', e.target.value)}
            sx={{ minWidth: 200, flexGrow: 1 }}
          />
          <FormControl size="small" sx={{ minWidth: 150, flexGrow: 1 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              label="Status"
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="full">Full</MenuItem>
            </Select>
          </FormControl>
          <Button 
            variant="text" 
            color="inherit" 
            onClick={() => { setFilters({ trainNumber: '', trainName: '', status: 'all' }); }}
            sx={{ ml: 'auto' }}
          >
            Clear
          </Button>
        </Box>
      </Collapse>

      {/* Table Area */}
      <Box sx={{ position: 'relative' }}>
        {loading && (
          <Box sx={{ position: 'absolute', top: 50, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', pt: 5, bgcolor: 'rgba(255, 255, 255, 0.7)', zIndex: 1 }}>
            <CircularProgress />
          </Box>
        )}

        <TableContainer>
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ bgcolor: 'grey.50' }}>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selectedTrains.length > 0 && selectedTrains.length < inventory.length}
                    checked={inventory.length > 0 && selectedTrains.length === inventory.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Train No.</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Occupancy</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((train, index) => {
                const isItemSelected = isSelected(train._id);
                const occupancyPercent = train.totalCapacity > 0 ? Math.round((train.currentOccupancy / train.totalCapacity) * 100) : 0;

                return (
                  <TableRow 
                    key={train._id} 
                    hover 
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ opacity: train.isActive ? 1 : 0.6, cursor: 'pointer' }}
                    onClick={(event) => handleClick(event, train._id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} />
                    </TableCell>
                    <TableCell>{train.trainNumber}</TableCell>
                    <TableCell fontWeight="medium">{train.trainName}</TableCell>
                    <TableCell>
                      {train.currentOccupancy} / {train.totalCapacity}
                      <Typography component="span" variant="caption" color="text.secondary" ml={1}>
                        {occupancyPercent}% Booked
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(train)}</TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <IconButton size="small" color="primary">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}

              {!loading && inventory.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                    No trains match your filters.
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