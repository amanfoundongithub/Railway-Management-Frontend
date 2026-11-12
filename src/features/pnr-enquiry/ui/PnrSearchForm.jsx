import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const PnrSearchForm = ({ onSearch, loading = false }) => {
  const [pnr, setPnr] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pnr.length !== 10 || isNaN(pnr)) {
      setError('Please enter a valid 10-digit PNR number.');
      return;
    }
    setError('');
    onSearch(pnr);
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 2, mb: 4, maxWidth: 600, mx: 'auto' }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom textAlign="center">
          Check PNR Status
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }} mt={2}>
            <TextField
              fullWidth
              label="Enter 10-digit PNR"
              variant="outlined"
              value={pnr}
              onChange={(e) => {
                setPnr(e.target.value);
                if (error) setError('');
              }}
              error={!!error}
              helperText={error}
              inputProps={{ maxLength: 10 }}
              disabled={loading}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              disabled={loading}
              sx={{ minWidth: 150, height: 56 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : (
                <>
                  <SearchIcon sx={{ mr: 1 }} />
                  Status
                </>
              )}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};