import { Box, Typography, Container } from '@mui/material';
import { TrainSearchForm } from './TrainSearchForm';

export const HeroSearchBlock = () => {
  return (
    <Box>
      <Box sx={{
        bgcolor: 'primary.main',
        color: 'white',
        pt: { xs: 8, md: 12 },
        pb: { xs: 12, md: 16 },
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" fontWeight="700" gutterBottom>
            Planning for a new journey?
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, mb: 4, fontWeight: 400 }}>
            Book your tickets, get live status and get e-catering facilities seamlessly!
            What are you waiting for? Let's get started!
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ px: { xs: 2, md: 4 } }}>
        <TrainSearchForm />
      </Container>
    </Box>
  );
};