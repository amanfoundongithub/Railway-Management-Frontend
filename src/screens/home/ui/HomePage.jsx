import { Box } from '@mui/material';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { HeroSearchBlock } from '../components/HeroSearchBlock';

export const HomePage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <HeroSearchBlock />
    </Box>
  );
};