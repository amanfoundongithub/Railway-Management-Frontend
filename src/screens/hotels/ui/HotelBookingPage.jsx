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
import HotelIcon from '@mui/icons-material/Hotel';
import { Navbar } from '../../../header/ui/Navbar';
import { pnrStatusService } from '../../pnr-status/api/pnrStatusService';
import { hotelService } from '../api/hotelService';

export const HotelBookingPage = () => {
  const [pnr, setPnr] = useState('');
  const [booking, setBooking] = useState(null);
  const [journeyStations, setJourneyStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Modal / Popup States
  const [openHotelModal, setOpenHotelModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

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
        setError('Cannot book rooms for a cancelled ticket.');
        return;
      }
      setBooking(data);
      
      const trainId = data.train?.id || data.train?._id || 'DUMMY_TRAIN';
      const stations = await hotelService.getStationsWithHotels(trainId);
      setJourneyStations(stations);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid PNR or booking not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenStationModal = (station) => {
    if (!station.canBookHotel) return;
    setSelectedStation(station);
    setSelectedHotel(null);
    setOpenHotelModal(true);
  };

  const handleBookRoom = async () => {
    if (!selectedHotel) {
      setError('Please select a room tier from the table.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await hotelService.bookHotel({
        bookingId: booking._id || booking.id,
        hotelId: selectedHotel._id || selectedHotel.id,
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(Date.now() + 86400000).toISOString(), // 1 day stay
        roomsCount: 1,
        totalAmount: selectedHotel.pricePerNight
      });
      
      setSuccessMsg(`Successfully booked room at ${selectedHotel.name}!`);
      setOpenHotelModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book room.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', pb: 8 }}>
      <Navbar />
      <Box sx={{ bgcolor: '#1a365d', color: 'white', py: 6, textAlign: 'center' }}>
        <Container maxWidth="md">
          <HotelIcon sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h3" fontWeight={800} gutterBottom>Station Retiring Rooms & Hotels</Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
            Secure clean AC suites, dormitories, and retiring rooms directly linked to your PNR journey.
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
            <Typography variant="h6" fontWeight={800} color="#1a365d" gutterBottom>Journey Stops & Accommodation Availability</Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>Click an upcoming station to browse available rooms:</Typography>
            
            <Grid container spacing={3}>
              {journeyStations.map((station) => (
                <Grid item xs={12} sm={4} key={station.code}>
                  <Card 
                    onClick={() => handleOpenStationModal(station)}
                    sx={{ 
                      p: 2.5, cursor: station.canBookHotel ? 'pointer' : 'not-allowed', borderRadius: 3,
                      opacity: station.canBookHotel ? 1 : 0.6,
                      border: '1px solid #e0e4e8',
                      transition: '0.2s',
                      '&:hover': station.canBookHotel ? { borderColor: '#1a365d', transform: 'translateY(-2px)' } : {}
                    }}
                  >
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography fontWeight={700}>{station.name} ({station.code})</Typography>
                      <Chip size="small" label={station.status} color={station.status === 'NEXT' ? 'primary' : 'default'} />
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {station.hotels.length} properties available
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
      </Container>

      {/* Hotel Booking Popup Modal */}
      <Dialog 
        open={openHotelModal} 
        onClose={() => setOpenHotelModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 4, p: 1.5, maxHeight: '85vh' } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
          <Box>
            <Typography variant="h6" fontWeight={800} color="#1a365d">
              Retiring Rooms & Hotels at {selectedStation?.name} ({selectedStation?.code})
            </Typography>
            <Typography variant="caption" color="text.secondary">Select your preferred room category from the table below</Typography>
          </Box>
          <IconButton onClick={() => setOpenHotelModal(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          {selectedStation?.hotels?.length === 0 ? (
            <Typography textAlign="center" py={4} color="text.secondary">No accommodations available at this station.</Typography>
          ) : (
            <Box display="flex" flexDirection="column" gap={4}>
              <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e4e8', borderRadius: 3 }}>
                <Table size="medium">
                  <TableHead sx={{ bgcolor: '#f4f6f8' }}>
                    <TableRow>
                      <TableCell padding="checkbox" sx={{ pl: 2 }} />
                      <TableCell><Typography variant="body2" fontWeight={700}>Property / Room Name</Typography></TableCell>
                      <TableCell><Typography variant="body2" fontWeight={700}>Type</Typography></TableCell>
                      <TableCell><Typography variant="body2" fontWeight={700}>Available Rooms</Typography></TableCell>
                      <TableCell><Typography variant="body2" fontWeight={700}>Price / Night</Typography></TableCell>
                      <TableCell><Typography variant="body2" fontWeight={700}>Rating</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedStation?.hotels.map((hotel) => {
                      const isSelectedRow = (selectedHotel?._id || selectedHotel?.id) === (hotel._id || hotel.id);
                      return (
                        <TableRow 
                          key={hotel._id || hotel.id} 
                          hover 
                          onClick={() => setSelectedHotel(hotel)}
                          sx={{ cursor: 'pointer', bgcolor: isSelectedRow ? '#f8faff' : 'inherit' }}
                        >
                          <TableCell padding="checkbox" sx={{ pl: 2 }}>
                            <Radio checked={isSelectedRow} size="small" disabled={hotel.availableRooms <= 0} />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight={700}>{hotel.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {hotel.amenities?.join(' · ')}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={hotel.type.replace('_', ' ')} size="small" color="primary" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color={hotel.availableRooms > 0 ? 'text.primary' : 'error.main'} fontWeight={600}>
                              {hotel.availableRooms > 0 ? `${hotel.availableRooms} Left` : 'Sold Out'}
                            </Typography>
                          </TableCell>
                          <TableCell><Typography variant="body2" fontWeight={700} color="#1a365d">₹{hotel.pricePerNight}</Typography></TableCell>
                          <TableCell><Typography variant="body2">⭐ {hotel.rating}</Typography></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

              {selectedHotel && (
                <Box mt={1} p={2} bgcolor="#f8faff" borderRadius={3} border="1px solid #e0e4e8">
                  <Typography variant="subtitle2" fontWeight={700} color="#1a365d" mb={0.5}>
                    Selected: {selectedHotel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Total Amount to Pay: <strong>₹{selectedHotel.pricePerNight}</strong> (1 Night Stay)
                  </Typography>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="success" 
                    size="large"
                    onClick={handleBookRoom} 
                    disabled={loading || selectedHotel.availableRooms <= 0}
                    sx={{ py: 1.5, fontWeight: 800, borderRadius: 2, fontSize: '1.05rem' }}
                  >
                    {loading ? 'Confirming...' : 'Confirm & Book Room'}
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