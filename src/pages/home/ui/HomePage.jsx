import { Box } from '@mui/material';

import { Navbar } from '../../../widgets/header/ui/Navbar';
import { HeroSearchBlock } from '../../../widgets/hero/ui/HeroSearchBlock';

/**
 * Home Page of our application. This is where we can search for the 
 * trains here, and it requires no authentication.
 * 
 * @returns JSX element of the home page.
 */
export const HomePage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <HeroSearchBlock />
    </Box>
  );
};