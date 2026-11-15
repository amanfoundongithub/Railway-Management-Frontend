import React from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export const ECateringHero = ({ pnr, setPnr, loading, handleSearchPNR, booking }) => {
  return (
    <Box sx={{ bgcolor: '#1a365d', color: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box sx={{ py: { xs: 5, md: 6 }, textAlign: 'center' }}>
          <Box display="flex" alignItems="center" justifyContent="center" gap={1.5} mb={2}>
            <RestaurantMenuIcon sx={{ fontSize: 40, opacity: 0.9 }} />
          </Box>
          <Typography variant="h3" fontWeight={800} gutterBottom sx={{ letterSpacing: '-0.5px' }}>
            E-Catering Portal
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
            Enter your PNR to find restaurants and get delicious food delivered right to your train seat.
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 1,
              maxWidth: 600,
              mx: 'auto',
              borderRadius: 12,
              display: 'flex',
              gap: 1,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <TextField
              fullWidth
              placeholder="Enter 10-digit PNR"
              value={pnr}
              disabled={loading}
              inputProps={{ maxLength: 10, inputMode: 'numeric' }}
              onChange={(event) => setPnr(event.target.value.replace(/\D/g, '').slice(0, 10))}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleSearchPNR();
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'white',
                  borderRadius: 10,
                  '& fieldset': { border: 'none' },
                  '& input': { py: 2, px: 3, fontWeight: 500 },
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={handleSearchPNR}
              disabled={loading || pnr.length !== 10}
              sx={{
                minWidth: 140,
                borderRadius: 10,
                fontWeight: 700,
                px: 4,
                textTransform: 'none',
                fontSize: '1.1rem',
              }}
            >
              {loading && !booking ? 'Searching' : 'Search'}
            </Button>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};
