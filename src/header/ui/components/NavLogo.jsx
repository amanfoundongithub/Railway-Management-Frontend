import React from 'react';
import { Typography, Box } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import { Link } from 'react-router-dom';

const NavLogo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: { md: 4, xs: 2 }, flexGrow: { xs: 1, md: 0 } }}>
      <TrainIcon sx={{ mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component={Link}
        to="/"
        sx={{
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.1rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        NXT_RAIL
      </Typography>
    </Box>
  );
};

export default NavLogo;