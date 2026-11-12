import React, { useState } from 'react';
import { Card, CardContent, Grid, TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const TrackerSearchWidget = ({ onSearch, loading = false }) => {
  const [trainNo, setTrainNo] = useState('');
  const [journeyDate, setJourneyDate] = useState('Today');

  const handleSearchClick = () => {
    if (!trainNo.trim()) return;
    onSearch(trainNo.trim(), journeyDate);
  };

  return (
    <Card elevation={3} sx={{ borderRadius: 2, mb: 4 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField 
              fullWidth 
              label="Train Number or Name" 
              placeholder="e.g. 12951 or Rajdhani"
              variant="outlined" 
              value={trainNo}
              onChange={(e) => setTrainNo(e.target.value)}
              disabled={loading}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField 
              select 
              fullWidth 
              label="Journey Start Date" 
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              disabled={loading}
            >
              <MenuItem value="Yesterday">Yesterday</MenuItem>
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="Tomorrow">Tomorrow</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <Button 
              fullWidth 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={handleSearchClick}
              disabled={loading || !trainNo.trim()}
              sx={{ py: 1.5 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  <SearchIcon sx={{ mr: 1 }} />
                  Track Train
                </>
              )}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};