import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Box, Typography } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';

export const ScheduleSearchForm = ({ onSearch }) => {
  const [trainQuery, setTrainQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (trainQuery.trim()) {
      onSearch(trainQuery);
    }
  };

  return (
    <Card elevation={2} sx={{ borderRadius: 2, mb: 4, maxWidth: 800, mx: 'auto' }}>
      <CardContent sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Train Timetable & Route
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Enter a train name or 5-digit number to view its complete schedule, halts, and platform details.
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
            <TextField
              fullWidth
              label="Train Number or Name (e.g. 12951)"
              variant="outlined"
              value={trainQuery}
              onChange={(e) => setTrainQuery(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<TimelineIcon />}
              sx={{ minWidth: 160 }}
            >
              Get Schedule
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};