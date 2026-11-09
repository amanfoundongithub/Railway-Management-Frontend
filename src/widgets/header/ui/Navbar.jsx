import React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';

// Import private components
import MobileNavMenu from './components/MobileNavMenu';
import NavLogo from './components/NavLogo';
import DesktopNavLinks from './components/DesktopNavLinks';
import AuthActions from './components/AuthActions';

export const Navbar = () => {
  return (
    <AppBar 
      position="sticky" 
      color="primary" 
      elevation={0} 
      sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/* Mobile hamburger menu (hidden on desktop) */}
          <MobileNavMenu />

          {/* Logo (auto-adjusts sizing for mobile/desktop) */}
          <NavLogo />

          {/* Center Links (hidden on mobile) */}
          <DesktopNavLinks />

          {/* Right Side Actions (Lang, Login/Avatar) */}
          <AuthActions />
          
        </Toolbar>
      </Container>
    </AppBar>
  );
};