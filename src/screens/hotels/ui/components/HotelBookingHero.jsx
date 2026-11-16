import React from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';

export const HotelBookingHero = ({ pnr, onPnrChange, onSearch, loading }) => (
  <Box sx={{ bgcolor: '#1a365d', color: 'white', py: 6, textAlign: 'center' }}>
    <Container maxWidth="md">
      <HotelIcon sx={{ fontSize: 40, mb: 1 }} />
      <Typography variant="h3" fontWeight={800} gutterBottom>
        Station Retiring Rooms & Hotels
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
        Secure clean AC suites, dormitories, and retiring rooms directly linked to your PNR journey.
      </Typography>

      <Paper elevation={0} sx={{ p: 1, display: 'flex', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 12 }}>
        <TextField
          fullWidth
          placeholder="Enter 10-digit PNR"
          value={pnr}
          inputProps={{ maxLength: 10 }}
          onChange={(event) => onPnrChange(event.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'white', borderRadius: 10, '& fieldset': { border: 'none' } } }}
        />
        <Button
          variant="contained"
          size="large"
          onClick={onSearch}
          disabled={loading}
          sx={{ borderRadius: 10, px: 4, fontWeight: 700 }}
        >
          Search PNR
        </Button>
      </Paper>
    </Container>
  </Box>
);
