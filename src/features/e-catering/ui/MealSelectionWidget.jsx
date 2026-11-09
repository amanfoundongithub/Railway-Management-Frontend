import React, { useState, useEffect } from 'react';
import { 
  Accordion, AccordionSummary, AccordionDetails, Typography, 
  Box, Grid, Card, CardContent, IconButton 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useBooking } from '../../../app/providers/BookingProvider';

const menuItems = [
  { id: 'm1', name: 'Standard Veg Thali', price: 150, type: 'Veg' },
  { id: 'm2', name: 'Chicken Biryani', price: 250, type: 'Non-Veg' },
  { id: 'm3', name: 'Paneer Butter Masala Combo', price: 200, type: 'Veg' },
];

export const MealSelectionWidget = () => {
  const { setMealTotal } = useBooking();
  const [cart, setCart] = useState({});

  const handleUpdateQuantity = (id, delta) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Calculate total and push to global context whenever the cart changes
  useEffect(() => {
    const total = menuItems.reduce((sum, item) => {
      return sum + (item.price * (cart[item.id] || 0));
    }, 0);
    setMealTotal(total);
  }, [cart, setMealTotal]);

  return (
    <Accordion elevation={2} sx={{ mb: 3, borderRadius: 2, '&:before': { display: 'none' } }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box display="flex" alignItems="center" gap={2}>
          <RestaurantIcon color="secondary" />
          <Typography variant="h6" fontWeight="bold">
            Add Meals (E-Catering)
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: 'grey.50', pt: 3 }}>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Food will be delivered to your seat from our verified kitchen partners during journey time.
        </Typography>

        <Grid container spacing={2}>
          {menuItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card variant="outlined" sx={{ bgcolor: 'white' }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography fontWeight="bold" variant="body2">
                      {item.name}
                    </Typography>
                    <Box 
                      sx={{ 
                        width: 12, height: 12, borderRadius: '50%', 
                        bgcolor: item.type === 'Veg' ? 'success.main' : 'error.main' 
                      }} 
                    />
                  </Box>
                  <Typography variant="subtitle2" color="primary" mb={2}>
                    ₹ {item.price}
                  </Typography>

                  <Box display="flex" alignItems="center" justifyContent="space-between" bgcolor="grey.100" borderRadius={1}>
                    <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, -1)} color="error">
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography fontWeight="bold">
                      {cart[item.id] || 0}
                    </Typography>
                    <IconButton size="small" onClick={() => handleUpdateQuantity(item.id, 1)} color="success">
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};