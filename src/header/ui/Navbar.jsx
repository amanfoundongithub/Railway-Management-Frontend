import React from 'react';
import { AppBar, Toolbar, Container, Box } from '@mui/material';

import MobileNavMenu from './components/MobileNavMenu';
import NavLogo from './components/NavLogo';
import DesktopNavLinks from './components/DesktopNavLinks';
import AuthActions from './components/AuthActions';

export const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={1}
      sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* Left Section: Mobile Menu (Hamburger) & Brand Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MobileNavMenu />
            <NavLogo />
          </Box>

          {/* Center Section: Navigation Links (Hidden on Mobile) */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1, ml: 4 }}>
            <DesktopNavLinks />
          </Box>

          {/* Right Section: User Login / Profile Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AuthActions />
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};