import React from 'react';
import {
  Badge,
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

export const CartFloatingBar = ({ cartCount, cartTotal, setCartDialogOpen }) => {
  return (
    <Paper
      elevation={10}
      sx={{
        position: 'fixed',
        right: { xs: 12, sm: 24 },
        bottom: { xs: 12, sm: 24 },
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: 1.5 },
        p: 1,
        pl: 1.5,
        maxWidth: 'calc(100vw - 24px)',
        border: '1px solid #e3eaf2',
        borderRadius: 999,
        bgcolor: 'background.paper',
        boxShadow: '0 10px 32px rgba(20, 42, 70, 0.2)',
      }}
    >
      <Box sx={{ width: 42, height: 42, flexShrink: 0, display: 'grid', placeItems: 'center', borderRadius: '50%', bgcolor: '#eef3f9', color: '#1a365d' }}>
        <Badge badgeContent={cartCount} max={99} color="success" overlap="circular" sx={{ '& .MuiBadge-badge': { fontWeight: 700 } }}>
          <ShoppingBagOutlinedIcon />
        </Badge>
      </Box>
      <Box sx={{ minWidth: 0, pr: { xs: 0, sm: 0.5 } }}>
        <Typography variant="caption" color="text.secondary" noWrap>
          {cartCount} {cartCount === 1 ? 'item' : 'items'} in cart
        </Typography>
        <Typography variant="subtitle1" fontWeight={800} color="#1a365d" lineHeight={1.2} noWrap>
          ₹{cartTotal}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="success"
        endIcon={<ArrowForwardRoundedIcon />}
        onClick={() => setCartDialogOpen(true)}
        sx={{
          flexShrink: 0,
          borderRadius: 999,
          px: { xs: 1.5, sm: 2 },
          py: 1.1,
          fontWeight: 700,
          textTransform: 'none',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 12px rgba(46,125,50,0.24)',
        }}
      >
        View cart
      </Button>
    </Paper>
  );
};
