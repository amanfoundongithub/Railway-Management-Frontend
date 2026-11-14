import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, AppBar, Toolbar, Avatar, CircularProgress, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../screens/auth/api/authService';
import { cookieService } from '../../../utils/cookieService';

import { KpiCardsWidget } from '../../../widgets/admin-kpis/ui/KpiCardsWidget';
import { TrainInventoryTable } from '../../../features/inventory-management/ui/TrainInventoryTable';

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchAdminData = async () => {
      if (!cookieService.getToken()) {
        navigate('/login');
        return;
      }

      try {
        const response = await authService.getMe();
        const userData = response.data?.user || response.user || response;
        
        if (userData.role !== 'ADMIN') {
          navigate('/');
          return;
        }
        
        setAdminUser(userData);
      } catch (error) {
        console.error("Failed to authenticate admin", error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleGoHome = () => {
    handleMenuClose();
    navigate('/');
  };

  const handleLogout = () => {
    handleMenuClose();
    cookieService.removeToken();
    navigate('/');
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  const adminName = adminUser?.fullName || 'Admin';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Left Side: Logo & Brand */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
            <TrainIcon sx={{ fontSize: 32 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 1, m: 0 }}>
              NXT_RAIL 
              <Typography component="span" sx={{ opacity: 0.7, ml: 1 }}>
                | ADMIN COMMAND
              </Typography>
            </Typography>
          </Box>
          
          {/* Right Side: Admin Details & Interactive Avatar */}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', m: 0, display: { xs: 'none', sm: 'block' } }}>
              {adminName} (SM)
            </Typography>
            
            <IconButton
              onClick={handleMenuClick}
              size="small"
              sx={{ ml: 2, p: 0 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ bgcolor: 'secondary.main', width: 36, height: 36, cursor: 'pointer' }}>
                {adminName.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            
            {/* The Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  minWidth: 180,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleGoHome}>
                <HomeIcon sx={{ mr: 2, color: 'text.secondary', fontSize: 20 }} />
                Passenger Portal
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <LogoutIcon sx={{ mr: 2, color: 'error.main', fontSize: 20 }} />
                Secure Logout
              </MenuItem>
            </Menu>
          </Box>
          
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        
        <Box mb={4}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            System Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage rolling stock, monitor revenue, and update operational statuses.
          </Typography>
        </Box>

        {/* 1. High-Level Metrics */}
        <KpiCardsWidget />

        {/* 2. Deep Dive Data Table */}
        <TrainInventoryTable />

      </Container>
    </Box>
  );
};