import React, { useState } from 'react';
import { Box, Button, IconButton, Avatar, Menu, MenuItem, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { Link, useNavigate } from 'react-router-dom';

const AuthActions = () => {
  const navigate = useNavigate();
  
  // MOCK AUTH STATE (Replace with your useAuth() context or Redux selector)
  const isAuthenticated = false; 
  const user = { name: 'Aman Raj', role: 'PASSENGER' };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    handleCloseUserMenu();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {/* Universal Action */}
      <IconButton color="inherit" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
        <LanguageIcon />
      </IconButton>

      {isAuthenticated ? (
        // PASSENGER / ADMIN VIEW
        <>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user.name} sx={{ bgcolor: 'secondary.main' }}>
              {user.name.charAt(0)}
            </Avatar>
          </IconButton>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/my-tickets'); }}>
              <Typography textAlign="center">My Tickets</Typography>
            </MenuItem>
            {user.role === 'ADMIN' && (
              <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/admin'); }}>
                <Typography textAlign="center">Admin Dashboard</Typography>
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout}>
              <Typography textAlign="center" color="error">Logout</Typography>
            </MenuItem>
          </Menu>
        </>
      ) : (
        // GUEST VIEW
        <>
          <Button 
            color="inherit" 
            component={Link} 
            to="/login"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Login
          </Button>
          <Button 
            variant="contained" 
            color="secondary"
            component={Link} 
            to="/register"
            disableElevation
          >
            Sign Up
          </Button>
        </>
      )}
    </Box>
  );
};

export default AuthActions;