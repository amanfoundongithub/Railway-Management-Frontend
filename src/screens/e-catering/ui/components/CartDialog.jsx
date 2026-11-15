import React from 'react';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export const CartDialog = ({
  cartDialogOpen,
  setCartDialogOpen,
  error,
  setError,
  selectedStation,
  cartItems,
  vendorGroups,
  cartTotal,
  loading,
  handleCheckout,
  handleClearCart,
  updateCart,
}) => {
  return (
    <Dialog
      open={cartDialogOpen}
      onClose={() => setCartDialogOpen(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <ShoppingBagOutlinedIcon color="primary" />
          <Typography variant="h6" fontWeight={800} color="#1a365d">Your Cart</Typography>
        </Box>
        <IconButton aria-label="Close cart" onClick={() => setCartDialogOpen(false)}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: { xs: 2, sm: 3 } }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Delivery at {selectedStation?.name}
        </Typography>
        {cartItems.length === 0 ? (
          <Box py={4} display="flex" flexDirection="column" alignItems="center" textAlign="center">
            <ShoppingBagOutlinedIcon sx={{ fontSize: 48, color: '#e0e4e8', mb: 1 }} />
            <Typography variant="h6" fontWeight={700} color="text.secondary">Your cart is empty</Typography>
            <Button onClick={() => setCartDialogOpen(false)} sx={{ mt: 1, textTransform: 'none' }}>
              Continue browsing
            </Button>
          </Box>
        ) : (
          <>
            {vendorGroups.map((group) => (
              <Box key={group.vendorId} sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="primary.main" fontWeight={800} sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {group.vendorName}
                </Typography>
                {group.items.map((item) => (
                  <Box
                    key={item._id}
                    sx={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto auto', alignItems: 'center', gap: 1, py: 1.5, borderBottom: '1px dashed #e0e4e8' }}
                  >
                    <Box sx={{ minWidth: 0 }}>
                      <Typography fontWeight={600}>{item.name}</Typography>
                      <Typography variant="caption" color="text.secondary">₹{item.price} each</Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '32px minmax(24px, 1fr) 32px', alignItems: 'center', justifyItems: 'center', border: '1px solid #d1d5db', borderRadius: 1.5, bgcolor: 'white', minWidth: 96 }}>
                      <IconButton size="small" aria-label={`Decrease ${item.name} quantity`} onClick={() => updateCart(item, -1, { id: group.vendorId, name: group.vendorName })} sx={{ width: 32, height: 32, p: 0, borderRadius: 1.5, color: 'error.main' }}>
                        <RemoveIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <Typography variant="body2" fontWeight={700} sx={{ minWidth: 24, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton size="small" aria-label={`Increase ${item.name} quantity`} onClick={() => updateCart(item, 1, { id: group.vendorId, name: group.vendorName })} sx={{ width: 32, height: 32, p: 0, borderRadius: 1.5, color: 'success.main' }}>
                        <AddIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle2" fontWeight={700} sx={{ minWidth: 56, textAlign: 'right' }}>
                      ₹{item.price * item.quantity}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ))}
            <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight={700}>Total Amount</Typography>
              <Typography variant="h5" fontWeight={800} color="primary.main">₹{cartTotal}</Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              size="large"
              color="success"
              onClick={handleCheckout}
              disabled={loading}
              sx={{ mt: 3, borderRadius: 2, py: 1.5, fontWeight: 800, fontSize: '1.05rem', textTransform: 'none', boxShadow: '0 4px 14px rgba(46, 125, 50, 0.25)' }}
            >
              {loading ? 'Placing order...' : 'Place order'}
            </Button>
            <Button
              fullWidth
              size="small"
              color="error"
              onClick={handleClearCart}
              disabled={loading}
              sx={{ mt: 1, fontWeight: 600, textTransform: 'none' }}
            >
              Clear cart
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
