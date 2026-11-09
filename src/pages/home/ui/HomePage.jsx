import React from 'react';
import { Box } from '@mui/material';

// Import your Widgets
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { HeroSearchBlock } from '../../../widgets/hero/ui/HeroSearchBlock';

export const HomePage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      
      {/* 1. Top Navigation */}
      <Navbar />

      {/* 2. The Hero Section with the Search Form */}
      <HeroSearchBlock />

      {/* 3. Later, you can add your AlertsWidget or Footer here */}
      
    </Box>
  );
};