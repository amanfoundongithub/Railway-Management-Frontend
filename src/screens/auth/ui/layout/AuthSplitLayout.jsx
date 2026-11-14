import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import { APPLICATION_DESC, APPLICATION_NAME } from "../../../../app/constants";

export const AuthSplitLayout = ({ children, title, subtitle }) => {
  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      
      {/* Left Pane: Branding & Image (Hidden on mobile) */}
      <Grid 
        item xs={12} md={6} 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
          // You can replace this gradient with a background image of a train
          background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)' 
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrainIcon sx={{ fontSize: 48, mr: 2 }} />
          <Typography variant="h3" fontWeight="bold" letterSpacing={2}>
            {APPLICATION_NAME}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ opacity: 0.8, textAlign: 'center', maxWidth: 400 }}>
            {APPLICATION_DESC}
        </Typography>
      </Grid>

      {/* Right Pane: The Form Area */}
      <Grid 
        item xs={12} md={6} 
        component={Paper} 
        elevation={0} 
        square 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          p: { xs: 4, sm: 8 }
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 450 }}>
          
          {/* Mobile Logo Fallback */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', mb: 4, color: 'primary.main' }}>
            <TrainIcon sx={{ fontSize: 32, mr: 1 }} />
            <Typography variant="h5" fontWeight="bold">NXT_RAIL</Typography>
          </Box>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            {subtitle}
          </Typography>

          {/* Render the injected feature (Login or Register form) */}
          {children}
          
        </Box>
      </Grid>

    </Grid>
  );
};