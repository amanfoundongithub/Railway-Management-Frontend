import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { TrainSearchForm } from '../../../features/train-search/ui/TrainSearchForm';
// Import the feature you just built
export const HeroSearchBlock = () => {
  return (
    <Box>
      {/* The Blue Background Area */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        pt: { xs: 8, md: 12 }, 
        pb: { xs: 12, md: 16 }, 
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" fontWeight="700" gutterBottom>
            Where is your next journey?
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, mb: 4, fontWeight: 400 }}>
            Book tickets, check live status, and manage your travel with NXT_RAIL.
          </Typography>
        </Container>
      </Box>

      {/* The Floating Form Container */}
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <TrainSearchForm />
      </Container>
    </Box>
  );
};