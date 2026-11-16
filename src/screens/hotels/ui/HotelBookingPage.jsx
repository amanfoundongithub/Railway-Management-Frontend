import React, { useState } from 'react';
import { Alert, Box, Container } from '@mui/material';
import { Navbar } from '../../../header/ui/Navbar';
import { pnrStatusService } from '../../pnr-status/api/pnrStatusService';
import { hotelService } from '../api/hotelService';
import { HotelBookingDialog } from './components/HotelBookingDialog';
import { HotelBookingHero } from './components/HotelBookingHero';
import { JourneyStationsSection } from './components/JourneyStationsSection';

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

  const handleBookRoom = async (bookingDetails) => {
    if (!selectedHotel) return;

    setLoading(true);
    setError('');
    try {
      await hotelService.bookHotel({
        bookingId: booking._id || booking.id,
        hotelId: selectedHotel._id || selectedHotel.id,
        checkInDate: bookingDetails.checkInDate,
        checkOutDate: bookingDetails.checkOutDate,
        roomsCount: bookingDetails.roomsCount,
        totalAmount: bookingDetails.totalAmount,
      });
      
      setSuccessMsg(`Successfully booked ${bookingDetails.roomsCount} room(s) at ${selectedHotel.name}!`);
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
      <HotelBookingHero
        pnr={pnr}
        onPnrChange={(value) => setPnr(value.replace(/\D/g, ''))}
        onSearch={handleSearchPNR}
        loading={loading}
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>{error}</Alert>}
        {successMsg && <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMsg('')}>{successMsg}</Alert>}

        {booking && (
          <JourneyStationsSection
            journeyStations={journeyStations}
            onSelectStation={handleOpenStationModal}
          />
        )}
      </Container>

      <HotelBookingDialog
        open={openHotelModal}
        station={selectedStation}
        selectedHotel={selectedHotel}
        loading={loading}
        onClose={() => setOpenHotelModal(false)}
        onSelectHotel={setSelectedHotel}
        onBook={handleBookRoom}
      />
    </Box>
  );
};