import React from 'react';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

export const CabBookingHero = ({ pnr, onPnrChange, onSearch, loading }) => (
  <Box sx={{ bgcolor: '#1a365d', color: 'white', py: 6, textAlign: 'center' }}>
    <Container maxWidth="md">
      <LocalTaxiIcon sx={{ fontSize: 40, mb: 1 }} />
      <Typography variant="h3" fontWeight={800} gutterBottom>Station Cab Booking</Typography>
      <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
        Book reliable last-mile cabs and autos right when your train arrives at any station.
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
