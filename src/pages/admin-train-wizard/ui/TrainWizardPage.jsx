import React from 'react';
import { Box, Container, Typography, AppBar, Toolbar, Button } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import { useNavigate } from 'react-router-dom';
import { TrainBasicDetailsForm } from '../../../features/route-management/ui/TrainBasicDetailsForm';
import { StationStopsForm } from '../../../features/route-management/ui/StationStopsForm';
import { CoachConfigurationForm } from '../../../features/route-management/ui/CoachConfigurationForm';

export const TrainWizardPage = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    alert("Train provisioned successfully! Inventory updated.");
    navigate('/admin');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', pb: 8 }}>
      
      {/* Admin specific header (copied from AdminDashboard) */}
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <TrainIcon sx={{ mr: 1 }} />
          <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1, letterSpacing: 1 }}>
            NXT_RAIL | ADMIN COMMAND
          </Typography>
          <Button color="inherit" onClick={() => navigate('/admin')}>
            Back to Dashboard
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Provision New Train
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          Configure identity, routing, and inventory for a new rolling stock asset.
        </Typography>

        <TrainBasicDetailsForm />
        <StationStopsForm />
        <CoachConfigurationForm />

        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
          <Button variant="text" size="large" onClick={() => navigate('/admin')}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" size="large" onClick={handleSave}>
            Save & Publish Train
          </Button>
        </Box>

      </Container>
    </Box>
  );
};