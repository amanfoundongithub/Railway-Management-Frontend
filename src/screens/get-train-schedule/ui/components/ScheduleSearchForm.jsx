import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';

export const ScheduleSearchForm = ({ onSearch, loading = false }) => {
  const [trainQuery, setTrainQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trainQuery.trim()) {
      onSearch(trainQuery.trim());
    }
  };

  return (
    <Card elevation={2} sx={{ borderRadius: 2, mb: 4, maxWidth: 800, mx: 'auto' }}>
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Train Timetable & Route
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter a 5-digit train number to view its complete schedule, halts, and route timeline.
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <TextField
              fullWidth
              label="Train Number (e.g. 12273)"
              variant="outlined"
              value={trainQuery}
              onChange={(e) => setTrainQuery(e.target.value)}
              disabled={loading}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              sx={{ minWidth: 160 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  <TimelineIcon sx={{ mr: 1 }} />
                  Get Schedule
                </>
              )}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};