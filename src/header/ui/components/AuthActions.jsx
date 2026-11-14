import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Avatar, Menu, MenuItem, Typography, CircularProgress } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { cookieService } from '../../../utils/cookieService';
import { authService } from '../../../screens/auth/api/authService';

const AuthActions = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Check auth state on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (cookieService.getToken()) {
        try {
          const userData = await authService.getMe();
          setUser(userData);
        } catch (error) {
          console.error("Session expired or invalid", error);
          cookieService.removeToken();
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const isAuthenticated = !!user;

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    cookieService.removeToken();
    setUser(null);
    handleCloseUserMenu();
    navigate('/');
  };

  if (loading) {
    return <CircularProgress color="inherit" size={24} sx={{ mr: 2 }} />;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
      <IconButton color="inherit" sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
        <LanguageIcon />
      </IconButton>

      {isAuthenticated ? (
        // LOGGED IN VIEW
        <>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt={user.name} sx={{ bgcolor: 'secondary.main', width: 36, height: 36 }}>
              {user.fullName.charAt(0).toUpperCase()}
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
            <MenuItem onClick={() => { handleCloseUserMenu(); navigate('/profile'); }}>
              <Typography textAlign="center">My Profile</Typography>
            </MenuItem>
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
          {/* Desktop Buttons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button variant="contained" color="secondary" component={Link} to="/register" disableElevation>
              Sign Up
            </Button>
          </Box>
          
          {/* Mobile Icon (Shows generic account icon instead of breaking layout) */}
          <IconButton 
            color="inherit" 
            component={Link} 
            to="/login"
            sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          >
            <AccountCircleIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default AuthActions;