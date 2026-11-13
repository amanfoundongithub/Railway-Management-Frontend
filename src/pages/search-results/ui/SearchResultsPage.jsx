import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container, Typography, Paper, CircularProgress, Alert } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { TrainCard } from '../../../features/train-booking/ui/TrainCard';
import { trainService } from '../api/trainService';
import { parseApiError } from '../../../utils/errorHelper';
import { SearchFiltersWidget } from '../../../widgets/search-filters/ui/SearchFiltersWidget';

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

  // Filter states
  const [filters, setFilters] = useState({
    availableOnly: false,
    times: [],    
    classes: [],  
  });

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

  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      if (category === 'availableOnly') {
        return { ...prev, availableOnly: value };
      }
      
      const list = prev[category];
      const newList = list.includes(value) 
        ? list.filter(item => item !== value) 
        : [...list, value];                   
        
      return { ...prev, [category]: newList };
    });
  };

  const getTimeBucket = (timeString) => {
    if (!timeString) return 'morning'; // Fallback
    const hour = parseInt(timeString.split(':')[0], 10);
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour <= 23) return 'evening';
    return 'night';
  };

  // Derive filtered trains securely without mutating the original API data
  const filteredTrains = useMemo(() => {
    return trains.filter(train => {
      // 1. Departure Time Filter
      if (filters.times.length > 0) {
        const bucket = getTimeBucket(train.departureTime);
        if (!filters.times.includes(bucket)) return false;
      }

      // 2. Class Filter
      if (filters.classes.length > 0) {
        // Adapt this mapping if your seatInventory array is nested differently
        const trainClasses = train.seatInventory?.map(inv => inv.classType) || [];
        const hasMatchingClass = filters.classes.some(c => trainClasses.includes(c));
        if (!hasMatchingClass) return false;
      }

      // 3. Availability Filter
      if (filters.availableOnly) {
        const hasAvailable = train.seatInventory?.some(inv => inv.availableSeats > 0);
        if (!hasAvailable) return false;
      }

      return true;
    });
  }, [trains, filters]);

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
          
          {/* Left Column: Filters Widget */}
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: 280, flexShrink: 0 }}>
            <SearchFiltersWidget 
              filters={filters} 
              onFilterChange={handleFilterChange} 
            />
          </Box>
          
          {/* Right Column: Dynamic Results */}
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
            
            {!loading && !error && filteredTrains.length === 0 && (
              <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  {trains.length > 0 
                    ? "No trains match your selected filters." 
                    : "No trains found running between these stations on this date."}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Try adjusting your filters, journey date, or quota.
                </Typography>
              </Paper>
            )}
            
            {!loading && !error && filteredTrains.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom>
                  {filteredTrains.length} {filteredTrains.length === 1 ? 'Train' : 'Trains'} Found
                </Typography>
                {filteredTrains.map((train) => (
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