import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Radio
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { Navbar } from '../../../header/ui/Navbar';
import { pnrStatusService } from '../../pnr-status/api/pnrStatusService';
import { cabService } from '../api/cabService';

export const CabBookingPage = () => {
  const [pnr, setPnr] = useState('');
  const [booking, setBooking] = useState(null);
  const [journeyStations, setJourneyStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Modal / Popup States
  const [openCabModal, setOpenCabModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedCab, setSelectedCab] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [dropLocation, setDropLocation] = useState('');

  const handleSearchPNR = async () => {
    if (pnr.length !== 10) {
      setError('Please enter a valid 10-digit PNR.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccessMsg('');
    setBooking(null);
    setJourneyStations([]);

    try {
      const data = await pnrStatusService.getBookingByPNR(pnr);
      if (data.bookingStatus === 'CANCELLED') {
        setError('Cannot book cabs for a cancelled ticket.');
        return;
      }
      setBooking(data);
      
      const trainId = data.train?.id || data.train?._id || 'DUMMY_TRAIN';
      const stations = await cabService.getStationsWithCabs(trainId);
      setJourneyStations(stations);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid PNR or booking not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenStationModal = (station) => {
    if (!station.canBookCab) return;
    setSelectedStation(station);
    setSelectedCab(null);
    setSelectedVehicle(null);
    setDropLocation('');
    setOpenCabModal(true);
  };

  const handleBookCab = async () => {
    if (!selectedCab || !selectedVehicle || !dropLocation) {
      setError('Please select a vendor, choose a vehicle from the table, and enter a drop location.');
      return;
    }

    const estimatedFare = selectedVehicle.baseFare + (selectedVehicle.pricePerKm * 10);

    setLoading(true);
    setError('');
    try {
      await cabService.bookCab({
        bookingId: booking._id || booking.id,
        stationCode: selectedStation.code,
        vendorId: selectedCab._id || selectedCab.id,
        vehicleType: selectedVehicle.type,
        pickupTime: new Date().toISOString(),
        dropLocation,
        fare: estimatedFare
      });
      
      setSuccessMsg(`Cab successfully booked at station ${selectedStation.name} to ${dropLocation}!`);
      setOpenCabModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to complete cab booking.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', pb: 8 }}>
      <Navbar />
      <Box sx={{ bgcolor: '#1a365d', color: 'white', py: 6, textAlign: 'center' }}>
        <Container maxWidth="md">
          <LocalTaxiIcon sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h3" fontWeight={800} gutterBottom>Station Cab Booking</Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
            Book reliable last-mile cabs and autos right when your train arrives at any station.
          </Typography>

          <Paper elevation={0} sx={{ p: 1, display: 'flex', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 12 }}>
            <TextField
              fullWidth
              placeholder="Enter 10-digit PNR"
              value={pnr}
              inputProps={{ maxLength: 10 }}
              onChange={(e) => setPnr(e.target.value.replace(/\D/g, ''))}
              sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'white', borderRadius: 10, '& fieldset': { border: 'none' } } }}
            />
            <Button variant="contained" size="large" onClick={handleSearchPNR} disabled={loading} sx={{ borderRadius: 10, px: 4, fontWeight: 700 }}>
              Search PNR
            </Button>
          </Paper>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMsg('')}>{successMsg}</Alert>}

        {booking && (
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight={800} color="#1a365d" gutterBottom>Journey Stops & Cab Availability</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>Click an upcoming station to open cab booking options:</Typography>
            
            <Grid container spacing={3}>
              {journeyStations.map((station) => (
                <Grid item xs={12} sm={4} key={station.code}>
                  <Card 
                    onClick={() => handleOpenStationModal(station)}
                    sx={{ 
                      p: 2.5, cursor: station.canBookCab ? 'pointer' : 'not-allowed', borderRadius: 3,
                      opacity: station.canBookCab ? 1 : 0.6,
                      border: '1px solid #e0e4e8',
                      transition: '0.2s',
                      '&:hover': station.canBookCab ? { borderColor: '#1a365d', transform: 'translateY(-2px)' } : {}
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography fontWeight={700}>{station.name} ({station.code})</Typography>
                      <Chip size="small" label={station.status} color={station.status === 'NEXT' ? 'primary' : 'default'} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {station.cabs.length} cab fleets available
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </Container>

      {/* Cab Booking Popup Modal */}
      <Dialog 
        open={openCabModal} 
        onClose={() => setOpenCabModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, p: 1.5, maxHeight: '85vh' } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={800} color="#1a365d">
              Book Cab at {selectedStation?.name} ({selectedStation?.code})
            </Typography>
            <Typography variant="caption" color="text.secondary">Select your preferred vendor and vehicle from the table below</Typography>
          </Box>
          <IconButton onClick={() => setOpenCabModal(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          {selectedStation?.cabs?.length === 0 ? (
            <Typography textAlign="center" py={4} color="text.secondary">No cabs available at this station.</Typography>
          ) : (
            <Box display="flex" flexDirection="column" gap={4}>
              {selectedStation?.cabs.map((cab) => {
                const isVendorSelected = (selectedCab?._id || selectedCab?.id) === (cab._id || cab.id);
                return (
                  <Card 
                    key={cab._id || cab.id} 
                    variant="outlined" 
                    sx={{ 
                      p: 3, borderRadius: 3, 
                      borderColor: isVendorSelected ? '#1a365d' : '#e0e4e8',
                      bgcolor: isVendorSelected ? '#f8faff' : 'background.paper',
                      boxShadow: isVendorSelected ? '0 4px 16px rgba(26,54,93,0.08)' : 'none'
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                      <Typography variant="subtitle1" fontWeight={800} color="#1a365d">{cab.name}</Typography>
                      <Chip label={`⭐ ${cab.rating}`} size="small" color="success" sx={{ fontWeight: 700 }} />
                    </Box>

                    {/* Cleanly spaced table organizing vehicle types */}
                    <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e4e8', borderRadius: 2 }}>
                      <Table size="medium">
                        <TableHead sx={{ bgcolor: '#f4f6f8' }}>
                          <TableRow>
                            <TableCell padding="checkbox" sx={{ pl: 2 }} />
                            <TableCell><Typography variant="body2" fontWeight={700}>Vehicle Type</Typography></TableCell>
                            <TableCell><Typography variant="body2" fontWeight={700}>Capacity</Typography></TableCell>
                            <TableCell><Typography variant="body2" fontWeight={700}>Base Fare</Typography></TableCell>
                            <TableCell><Typography variant="body2" fontWeight={700}>Per KM Rate</Typography></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {cab.vehicles.map((v) => {
                            const isSelectedRow = isVendorSelected && selectedVehicle?.type === v.type;
                            return (
                              <TableRow 
                                key={v.type} 
                                hover 
                                onClick={() => { setSelectedCab(cab); setSelectedVehicle(v); }}
                                sx={{ cursor: 'pointer' }}
                              >
                                <TableCell padding="checkbox" sx={{ pl: 2 }}>
                                  <Radio checked={isSelectedRow} size="small" />
                                </TableCell>
                                <TableCell><Typography variant="body2" fontWeight={600}>{v.type}</Typography></TableCell>
                                <TableCell><Typography variant="body2">{v.capacity} Passengers</Typography></TableCell>
                                <TableCell><Typography variant="body2">₹{v.baseFare}</Typography></TableCell>
                                <TableCell><Typography variant="body2">₹{v.pricePerKm}/km</Typography></TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                );
              })}

              {selectedVehicle && (
                <Box mt={1} p={2} bgcolor="#f8faff" borderRadius={3} border="1px solid #e0e4e8">
                  <Typography variant="subtitle2" fontWeight={700} color="#1a365d" mb={1.5}>
                    Selected: {selectedVehicle.type} from {selectedCab.name}
                  </Typography>
                  <TextField
                    fullWidth
                    label="Enter Drop-off Location / Hotel"
                    placeholder="e.g., Connaught Place, Hotel Taj"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                    sx={{ mb: 3, bgcolor: 'white', borderRadius: 2 }}
                  />
                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="success" 
                    size="large"
                    onClick={handleBookCab} 
                    disabled={loading}
                    sx={{ py: 1.5, fontWeight: 800, borderRadius: 2, fontSize: '1.05rem' }}
                  >
                    {loading ? 'Confirming...' : 'Confirm & Book Cab'}
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};