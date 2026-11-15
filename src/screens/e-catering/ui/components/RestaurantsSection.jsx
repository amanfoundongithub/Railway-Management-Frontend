import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StorefrontIcon from '@mui/icons-material/Storefront';

export const RestaurantsSection = ({ selectedStation, handleOpenVendor }) => {
  return (
    <Grid container spacing={4} alignItems="flex-start">
      <Grid item xs={12}>
        <Typography variant="h5" fontWeight={800} color="#1a365d" mb={1}>
          Restaurants at {selectedStation.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Tap a restaurant to view their menu. You can add items from multiple vendors to the same cart.
        </Typography>

        <Grid container spacing={2}>
          {selectedStation.vendors.map((vendor) => (
            <Grid item xs={12} sm={6} key={vendor.id || vendor._id}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid #e0e4e8',
                  transition: 'all 0.2s',
                  '&:hover': { borderColor: '#1a365d', transform: 'translateY(-2px)' },
                }}
              >
                <CardActionArea onClick={() => handleOpenVendor(vendor)} sx={{ p: 2 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <StorefrontIcon color="primary" fontSize="small" />
                      <Typography fontWeight={700}>{vendor.name}</Typography>
                    </Box>
                    <Chip
                      icon={<StarIcon sx={{ fontSize: 14 }} />}
                      label={vendor.rating.toFixed(1)}
                      size="small"
                      color="success"
                      sx={{ fontWeight: 800, height: 20, '& .MuiChip-label': { px: 1 } }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {vendor.tags}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
