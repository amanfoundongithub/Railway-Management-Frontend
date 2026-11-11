import React from 'react';
import { AppBar, Toolbar, Container } from '@mui/material';

import MobileNavMenu from './components/MobileNavMenu';
import NavLogo from './components/NavLogo';
import DesktopNavLinks from './components/DesktopNavLinks';
import AuthActions from './components/AuthActions';

export const Navbar = () => {

  const LIST_OF_ITEMS_FOR_NAVBAR = [
    <MobileNavMenu />,
    <NavLogo />,
    <DesktopNavLinks />,
    <AuthActions />
  ];


  return (
    <AppBar
      position="sticky"
      color="primary"
      elevation={1}
      sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {
            LIST_OF_ITEMS_FOR_NAVBAR.map((e) => {
              return e;
            })
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};