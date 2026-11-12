import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { TrainCard } from '../../../features/train-booking/ui/TrainCard';
import { trainService } from '../api/trainService';
import { parseApiError } from '../../../utils/errorHelper';

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  
  // Extract params from URL
  const src = searchParams.get('src') || '';
  const dst = searchParams.get('dst') || '';
  const date = searchParams.get('date') || '';
  const cls = searchParams.get('cls') || 'All Classes';
  const qta = searchParams.get('qta') || 'General';

  // API states
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrains = async () => {
      if (!src || !dst || !date) { 
        setError('Missing source, destination, or date. Please try your search again.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const results = await trainService.searchTrains(src, dst, date);
        setTrains(results);
      } catch (err) {
        setError(parseApiError(err));
      } finally {
        setLoading(false);
      }
    };
    fetchTrains();
  }, [src, dst, date, cls, qta]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Paper 
        square 
        elevation={1} 
        sx={{ bgcolor: 'primary.dark', color: 'white', py: 2, position: 'sticky', top: 64, zIndex: 5 }}
      >
        <Container maxWidth="lg">
          <Typography variant="h4">
            Search Results For:
          </Typography>
          <Typography variant="h6">
            {src} to {dst}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Journey Date: {date} | Quota: {qta} | Class: {cls}
          </Typography>
        </Container>
      </Paper>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: 280 }}>
            <Paper sx={{ p: 2, height: '100%' }}>
              <Typography variant="h6" gutterBottom>Filters</Typography>
              <Typography variant="body2" color="text.secondary">
                Departure Time, Train Type, Class, etc. will go here.
              </Typography>
            </Paper>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            {loading && (
              <Box display="flex" justifyContent="center" alignItems="center" py={10}>
                <CircularProgress />
                <Typography sx={{ ml: 2, color: 'text.secondary' }}>
                  Searching available trains...
                </Typography>
              </Box>
            )}
            {!loading && error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            {!loading && !error && trains.length === 0 && (
              <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  No trains found running between these stations on this date.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Try changing your journey date or quota.
                </Typography>
              </Paper>
            )}
            {!loading && !error && trains.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  {trains.length} Trains Found
                </Typography>
                {trains.map((train) => (
                  <TrainCard key={train._id} train={train} />
                ))}
              </>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};