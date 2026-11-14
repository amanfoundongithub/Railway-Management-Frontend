import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const navLinks = [
  { title: 'Search Trains', path: '/' },
  { title: 'PNR Status', path: '/pnr-status' },
  { title: 'Live Map', path: '/live-status' },
  { title: 'E-Catering', path: '/e-catering' },
];

const DesktopNavLinks = () => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2 }}>
      {navLinks.map((link) => (
        <Button
          key={link.title}
          component={Link}
          to={link.path}
          sx={{ color: 'white', display: 'block', opacity: 0.9, '&:hover': { opacity: 1 } }}
        >
          {link.title}
        </Button>
      ))}
    </Box>
  );
};

export default DesktopNavLinks;