import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const navLinks = [
  { title: 'Search Trains', path: '/' },
  { title: 'PNR Status', path: '/pnr' },
  { title: 'Live Map', path: '/live-status' },
];

const MobileNavMenu = () => {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleNavigate = (path) => {
    handleCloseNavMenu();
    navigate(path);
  };

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        {navLinks.map((link) => (
          <MenuItem key={link.title} onClick={() => handleNavigate(link.path)}>
            <Typography textAlign="center">{link.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default MobileNavMenu;