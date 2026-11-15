import React, { useState } from 'react';
import { Alert, Box, Container } from '@mui/material';

import { Navbar } from '../../../header/ui/Navbar';
import { pnrStatusService } from '../../pnr-status/api/pnrStatusService';
import { cateringService } from '../api/cateringService';
import { ECateringHero } from './components/ECateringHero';
import { JourneyStationsSection } from './components/JourneyStationsSection';
import { RestaurantsSection } from './components/RestaurantsSection';
import { CartFloatingBar } from './components/CartFloatingBar';
import { CartDialog } from './components/CartDialog';
import { VendorMenuDialog } from './components/VendorMenuDialog';

export const ECateringPage = () => {
  const [pnr, setPnr] = useState('');
  const [booking, setBooking] = useState(null);
  const [journeyStations, setJourneyStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedStation, setSelectedStation] = useState(null);

  const [openVendor, setOpenVendor] = useState(null);
  const [vendorMenu, setVendorMenu] = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);

  const [cart, setCart] = useState({});
  const [cartDialogOpen, setCartDialogOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const cartItems = Object.values(cart);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const vendorGroups = Object.values(
    cartItems.reduce((groups, item) => {
      if (!groups[item.vendorId]) {
        groups[item.vendorId] = {
          vendorId: item.vendorId,
          vendorName: item.vendorName,
          items: [],
        };
      }
      groups[item.vendorId].items.push(item);
      return groups;
    }, {})
  );

  const handleSearchPNR = async () => {
    if (pnr.length !== 10) {
      setError('Please enter a valid 10-digit PNR.');
      return;
    }
    if (cartItems.length > 0) {
      setError('Complete or clear your cart before searching for another PNR.');
      return;
    }

    setLoading(true);
    setError('');
    setOrderSuccess(false);
    setBooking(null);
    setSelectedStation(null);

    try {
      const data = await pnrStatusService.getBookingByPNR(pnr);
      if (data.bookingStatus === 'CANCELLED') {
        setError('Food cannot be ordered for a cancelled ticket.');
        return;
      }
      setBooking(data);
      const trainId = data.train?._id || 'DUMMY_TRAIN';
      const stations = await cateringService.getStationsWithVendors(trainId);
      setJourneyStations(stations);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid PNR or booking not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectStation = (station) => {
    if (!station.canOrder || loading) return;
    if (selectedStation && selectedStation.code !== station.code && cartItems.length > 0) {
      setError(`Your cart is for ${selectedStation.name}. Clear it before changing delivery stations.`);
      return;
    }
    setError('');
    setOrderSuccess(false);
    setSelectedStation(station);
  };

  const handleOpenVendor = async (vendor) => {
    setOpenVendor(vendor);
    setMenuLoading(true);
    try {
      const menu = await cateringService.getVendorMenu(vendor.id || vendor._id);
      setVendorMenu(menu);
    } catch (err) {
      console.error('Failed to load menu', err);
    } finally {
      setMenuLoading(false);
    }
  };

  const updateCart = (item, delta, vendor) => {
    setError('');
    setOrderSuccess(false);
    setCart((prev) => {
      const itemId = item._id;
      const currentQuantity = prev[itemId]?.quantity || 0;
      const nextQuantity = Math.max(0, currentQuantity + delta);

      if (nextQuantity === 0) {
        const nextCart = { ...prev };
        delete nextCart[itemId];
        return nextCart;
      }

      return {
        ...prev,
        [itemId]: {
          ...item,
          vendorId: vendor?.id || vendor?._id || item.vendorId,
          vendorName: vendor?.name || item.vendorName,
          quantity: nextQuantity,
        },
      };
    });
  };

  const handleClearCart = () => {
    setCart({});
    setCartDialogOpen(false);
    setError('');
    setOrderSuccess(false);
  };

  const handleCheckout = async () => {
    if (!selectedStation || vendorGroups.length === 0) return;
    setLoading(true);
    setError('');
    setOrderSuccess(false);
    const completedVendors = [];
    let currentVendorName = '';

    try {
      for (const group of vendorGroups) {
        currentVendorName = group.vendorName;

        const orderPayload = {
          bookingId: booking._id,
          stationCode: selectedStation.code,
          vendorId: group.vendorId,
          restaurantName: group.vendorName,
          items: group.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          deliveryEta: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        };
        await cateringService.placeOrder(orderPayload);
        completedVendors.push(group.vendorName);

        const completedItemIds = new Set(group.items.map((item) => item._id));
        setCart((prev) => Object.fromEntries(Object.entries(prev).filter(([itemId]) => !completedItemIds.has(itemId))));
      }
      setOrderSuccess(true);
      setCartDialogOpen(false);
    } catch (err) {
      const detail = err.response?.data?.message || 'Please try again.';
      const pendingVendors = vendorGroups.slice(completedVendors.length).map((group) => group.vendorName);

      if (completedVendors.length > 0) {
        setError(
          `Orders from ${completedVendors.join(', ')} were placed. We could not complete orders from ${pendingVendors.join(', ')}; those items remain in your cart. ${detail}`
        );
      } else {
        setError(`Could not complete the order from ${currentVendorName}. ${detail}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8', pb: { xs: cartCount > 0 ? 12 : 4, md: 8 } }}>
      <Navbar />

      <ECateringHero pnr={pnr} setPnr={setPnr} loading={loading} handleSearchPNR={handleSearchPNR} booking={booking} />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 2, fontWeight: 500 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {orderSuccess && (
          <Alert severity="success" sx={{ mb: 4, borderRadius: 2, fontWeight: 500 }}>
            Your orders have been successfully placed and attached to PNR {pnr}.
          </Alert>
        )}

        {booking && (
          <>
            <JourneyStationsSection
              pnr={pnr}
              journeyStations={journeyStations}
              selectedStation={selectedStation}
              handleSelectStation={handleSelectStation}
              loading={loading}
            />

            {selectedStation && <RestaurantsSection selectedStation={selectedStation} handleOpenVendor={handleOpenVendor} />}
          </>
        )}
      </Container>

      {cartCount > 0 && <CartFloatingBar cartCount={cartCount} cartTotal={cartTotal} setCartDialogOpen={setCartDialogOpen} />}

      <CartDialog
        cartDialogOpen={cartDialogOpen}
        setCartDialogOpen={setCartDialogOpen}
        error={error}
        setError={setError}
        selectedStation={selectedStation}
        cartItems={cartItems}
        vendorGroups={vendorGroups}
        cartTotal={cartTotal}
        loading={loading}
        handleCheckout={handleCheckout}
        handleClearCart={handleClearCart}
        updateCart={updateCart}
      />

      <VendorMenuDialog
        openVendor={openVendor}
        setOpenVendor={setOpenVendor}
        menuLoading={menuLoading}
        vendorMenu={vendorMenu}
        cart={cart}
        updateCart={updateCart}
      />
    </Box>
  );
};