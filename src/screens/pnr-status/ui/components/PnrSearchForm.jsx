import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Box, Typography, CircularProgress, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const PnrSearchForm = ({
  onSearch,
  loading = false
}) => {

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

        <Typography 
          variant="h6" 
          fontWeight="bold" 
          gutterBottom 
          sx={{ display: 'flex', alignItems: "start", justifyContent: 'left', gap: 1 }}
        >
          Check Your PNR Status
          <Tooltip
            title="Passenger Name Record (PNR) is a unique 10-digit number printed on the top-left corner of your ticket." 
            arrow 
            placement="top"
          >
            <InfoOutlinedIcon fontSize="small" color="action" sx={{ cursor: 'help', mt : 0.7, ml : -0.5 }} />
          </Tooltip>
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }} mt={2}>
            <TextField
              fullWidth
              label   = "Enter 10-digit PNR"
              variant = "standard"
              value   = {pnr}
              onChange={(e) => {
                setPnr(e.target.value);
                if (error) setError('');
              }}
              error={!!error}
              helperText={error}
              inputProps={{ maxLength: 10 }}
              disabled={loading}
              sx={{ mb : 2, mt : 1}}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              disabled={loading}
              sx={{ minWidth: 120, height: 45, justifyContent : 'flex-start', ml : -1 }}
              
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : (
                <>
                  <SearchIcon sx={{ mr : 1, ml : -1 }} />
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