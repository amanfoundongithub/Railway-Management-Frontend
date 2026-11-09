import React from 'react';
import { Card, CardContent, Grid, TextField, Button, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const TrackerSearchWidget = ({ onSearch }) => {
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
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField 
              select 
              fullWidth 
              label="Journey Start Date" 
              defaultValue="Today"
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
              startIcon={<SearchIcon />}
              onClick={() => onSearch()}
              sx={{ py: 1.5 }}
            >
              Track Train
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};