import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const navLinks = [
  { title: 'Search Trains', path: '/' },
  { title: 'Get Train Schedule', path: '/schedule' },
  { title: 'Get PNR Status', path: '/pnr-status' },
  { title: 'Live Map', path: '/live-status' },
  { title: 'E-Catering', path: '/e-catering' },
  { title: 'Cabs', path: '/cabs' },
  { title: 'Hotels', path: '/hotels' },
];

const DesktopNavLinks = () => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1.5 }}>
      {navLinks.map((link) => (
        <Button
          key={link.title}
          component={Link}
          to={link.path}
          sx={{ color: 'white', display: 'block', opacity: 0.9, '&:hover': { opacity: 1 }, fontSize: '0.9rem', px: 1 }}
        >
          {link.title}
        </Button>
      ))}
    </Box>
  );
};

export default DesktopNavLinks;