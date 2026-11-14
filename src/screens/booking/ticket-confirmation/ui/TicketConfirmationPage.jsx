import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePDF } from 'react-to-pdf';

import { Navbar } from '../../../../widgets/header/ui/Navbar';
import { DigitalTicketCard } from './components/DigitalTicketCard';
import { TicketActions } from './components/TicketActions';
import { pnrStatusService } from '../../../pnr-status/api/pnrStatusService';


export const TicketConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const pnr = searchParams.get('pnr');
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { toPDF, targetRef } = usePDF({ filename: `NXT_RAIL_Ticket_${pnr}.pdf` });

  useEffect(() => {
    if (!pnr) {
      navigate('/');
      return;
    }

    const fetchTicket = async () => {
      try {
        const data = await pnrStatusService.getBookingByPNR(pnr);
        setBooking(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load ticket details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [pnr, navigate]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />

      <Container maxWidth="md" sx={{ py: 6 }}>
        {loading && (
          <Box display="flex" flexDirection="column" alignItems="center" py={10}>
            <CircularProgress size={48} mb={2} />
            <Typography mt={2} color="text.secondary">Fetching ticket details...</Typography>
          </Box>
        )}

        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {!loading && booking && (
          <>
            <Box textAlign="center" mb={5}>
              <CheckCircleOutlineIcon color="success" sx={{ fontSize: 64, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Booking Confirmed!
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Your ticket has been generated successfully.
              </Typography>
            </Box>
            <Box ref={targetRef}>
              <DigitalTicketCard booking={booking} />
            </Box>
            <TicketActions pnr={booking.pnr} onDownload={toPDF} />
          </>
        )}
      </Container>
    </Box>
  );
};