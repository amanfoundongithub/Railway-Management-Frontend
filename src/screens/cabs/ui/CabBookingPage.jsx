import React, { useState } from 'react';
import { Alert, Box, Container } from '@mui/material';
import { Navbar } from '../../../header/ui/Navbar';
import { pnrStatusService } from '../../pnr-status/api/pnrStatusService';
import { cabService } from '../api/cabService';
import { CabBookingDialog } from './components/CabBookingDialog';
import { CabBookingHero } from './components/CabBookingHero';
import { JourneyStationsSection } from './components/JourneyStationsSection';
import { calculateDistanceKm, calculateCabFare } from '../../../utils/geoUtils';

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
  const [dropCoords, setDropCoords] = useState(null);

  const stationCoords = selectedStation?.coordinates || { lat: 28.6415, lng: 77.2208 };

  // Dynamic distance & fare calculation (falls back to 10 km if user types manually without clicking map)
  const distanceKm = dropCoords
    ? calculateDistanceKm(stationCoords.lat, stationCoords.lng, dropCoords.lat, dropCoords.lng)
    : 0;

  const estimatedFare = selectedVehicle
    ? calculateCabFare(
        selectedVehicle.baseFare,
        selectedVehicle.pricePerKm,
        distanceKm > 0 ? distanceKm : 10
      )
    : 0;

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
    setDropCoords(null);
    setOpenCabModal(true);
  };

  const handleMapSelect = ({ lat, lng, address }) => {
    setDropCoords({ lat, lng });
    setDropLocation(address);
  };

  const handleBookCab = async () => {
    if (!selectedCab || !selectedVehicle || !dropLocation) {
      setError('Please select a vendor, choose a vehicle from the table, and pin/enter a drop location.');
      return;
    }

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
      
      const distText = distanceKm > 0 ? ` (${distanceKm} km)` : '';
      setSuccessMsg(
        `Cab (${selectedVehicle.type}) booked at ${selectedStation.name} to ${dropLocation}${distText} — Fare: ₹${estimatedFare}!`
      );
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
      <CabBookingHero
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

      <CabBookingDialog
        open={openCabModal}
        station={selectedStation}
        selectedCab={selectedCab}
        selectedVehicle={selectedVehicle}
        dropLocation={dropLocation}
        dropCoords={dropCoords}
        distanceKm={distanceKm}
        estimatedFare={estimatedFare}
        loading={loading}
        onClose={() => setOpenCabModal(false)}
        onSelectVehicle={(cab, vehicle) => {
          setSelectedCab(cab);
          setSelectedVehicle(vehicle);
        }}
        onDropLocationChange={setDropLocation}
        onMapSelect={handleMapSelect}
        onBook={handleBookCab}
      />
    </Box>
  );
};