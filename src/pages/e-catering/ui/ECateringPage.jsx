import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Card, CardContent, Divider, Alert, IconButton } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { bookingService } from '../../booking/api/bookingService';
// Mock restaurant and menu data
const RESTAURANT = {
  name: "Haldiram's Express",
  deliveryStation: "Nagpur Junction",
  menu: [
    { id: 1, name: "Premium Veg Thali", price: 250, desc: "Paneer Butter Masala, Dal Makhani, 3 Rotis, Rice, Sweet" },
    { id: 2, name: "Hyderabadi Veg Biryani", price: 180, desc: "Aromatic basmati rice with mixed vegetables and raita" },
    { id: 3, name: "Chole Bhature", price: 150, desc: "Spicy chickpea curry with 2 fluffy bhatures" },
    { id: 4, name: "Cold Coffee", price: 80, desc: "Chilled blended coffee with ice cream" }
  ]
};

export const ECateringPage = () => {
  const [pnr, setPnr] = useState('');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cart, setCart] = useState({}); 
  const [orderSuccess, setOrderSuccess] = useState(false);

  // 1. PNR Validation
  const handleSearchPNR = async () => {
    if (pnr.length !== 10) {
      setError("Please enter a valid 10-digit PNR.");
      return;
    }
    setLoading(true);
    setError('');
    setOrderSuccess(false);
    try {
      const data = await bookingService.getBookingByPNR(pnr);
      if (data.bookingStatus === 'CANCELLED') {
        setError("Food cannot be ordered for a cancelled ticket.");
      } else {
        setBooking(data);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid PNR or booking not found.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Cart Management
  const updateCart = (item, delta) => {
    setCart(prev => {
      const currentQty = prev[item.id]?.quantity || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        const newCart = { ...prev };
        delete newCart[item.id];
        return newCart;
      }
      return { ...prev, [item.id]: { ...item, quantity: newQty } };
    });
  };

  const cartItems = Object.values(cart);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // 3. Checkout Submission
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const mealData = {
        restaurantName: RESTAURANT.name,
        deliveryStation: RESTAURANT.deliveryStation,
        items: cartItems.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
        totalAmount: cartTotal
      };
      
      await bookingService.addMealToBooking(pnr, mealData);
      setOrderSuccess(true);
      setCart({});
      setBooking(null);
      setPnr('');
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <RestaurantMenuIcon sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            E-Catering Portal
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
            Get delicious, hygienic food delivered right to your train seat.
          </Typography>
          
          <Box display="flex" gap={2}>
            <TextField 
              fullWidth
              variant="outlined"
              placeholder="Enter 10-digit PNR Number"
              value={pnr}
              onChange={(e) => setPnr(e.target.value.replace(/\D/g, '').slice(0, 10))}
              sx={{ bgcolor: 'white', borderRadius: 1 }}
            />
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={handleSearchPNR}
              disabled={loading || pnr.length !== 10}
            >
              {loading && !booking ? 'Checking...' : 'Search'}
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {error && <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>}
        {orderSuccess && <Alert severity="success" sx={{ mb: 4 }}>Your food order has been confirmed and attached to your PNR!</Alert>}

        {booking && (
          <Grid container spacing={4}>
            
            {/* Left: Restaurant Menu */}
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {RESTAURANT.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Delivering at: {RESTAURANT.deliveryStation}
              </Typography>

              <Grid container spacing={3}>
                {RESTAURANT.menu.map(item => (
                  <Grid item xs={12} sm={6} key={item.id}>
                    <Card elevation={1} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography fontWeight="bold">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40, mb: 2 }}>
                          {item.desc}
                        </Typography>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography fontWeight="bold" color="primary">
                            ₹{item.price}
                          </Typography>
                          
                          <Box display="flex" alignItems="center">
                            <IconButton size="small" onClick={() => updateCart(item, -1)} color="primary">
                              <RemoveIcon />
                            </IconButton>
                            <Typography sx={{ mx: 1, fontWeight: 'bold' }}>
                              {cart[item.id]?.quantity || 0}
                            </Typography>
                            <IconButton size="small" onClick={() => updateCart(item, 1)} color="primary">
                              <AddIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Right: Cart Summary */}
            <Grid item xs={12} md={4}>
              <Card elevation={3} sx={{ position: 'sticky', top: 90, borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Order Summary
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  {cartItems.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" textAlign="center" py={4}>
                      Your cart is empty
                    </Typography>
                  ) : (
                    <Box>
                      {cartItems.map(item => (
                        <Box key={item.id} display="flex" justifyContent="space-between" mb={1}>
                          <Typography variant="body2">{item.name} x {item.quantity}</Typography>
                          <Typography variant="body2" fontWeight="bold">₹{item.price * item.quantity}</Typography>
                        </Box>
                      ))}
                      <Divider sx={{ my: 2 }} />
                      <Box display="flex" justifyContent="space-between" mb={3}>
                        <Typography fontWeight="bold">Total Amount</Typography>
                        <Typography fontWeight="bold" color="primary" variant="h6">₹{cartTotal}</Typography>
                      </Box>
                      <Button 
                        fullWidth 
                        variant="contained" 
                        color="success" 
                        size="large"
                        onClick={handleCheckout}
                        disabled={loading}
                      >
                        {loading ? 'Processing...' : 'Pay & Place Order'}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};