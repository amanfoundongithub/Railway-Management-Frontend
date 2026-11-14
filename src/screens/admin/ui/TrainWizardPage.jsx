import React, { useState } from 'react';
import { Box, Container, Typography, AppBar, Toolbar, Button, Stepper, Step, StepLabel, Paper } from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';
import { useNavigate } from 'react-router-dom';
import { TrainBasicDetailsForm } from './components/TrainBasicDetailsForm';
import { StationStopsForm } from './components/StationStopsForm';
import { CoachConfigurationForm } from './components/CoachConfigurationForm';
import { adminService } from '../api/adminService';

const steps = ['Basic Details', 'Route & Halts', 'Coach Configuration'];

export const TrainWizardPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Master State for the entire train provision
  const [trainData, setTrainData] = useState({
    trainNumber: '',
    trainName: '',
    source: '',
    destination: '',
    runningDays: [0, 1, 2, 3, 4, 5, 6],
    route: [
      { stationCode: '', stationName: '', arrivalTime: '00:00', departureTime: '', distanceFromSource: 0, dayCounter: 1 },
      { stationCode: '', stationName: '', arrivalTime: '', departureTime: '00:00', distanceFromSource: '', dayCounter: 1 }
    ],
    coachClasses: []
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      // Set top-level source and destination from the route array before saving
      const finalPayload = {
        ...trainData,
        source: trainData.route[0].stationCode,
        destination: trainData.route[trainData.route.length - 1].stationCode
      };
      
      await adminService.createTrain(finalPayload);
      alert("Train provisioned successfully! Inventory updated.");
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert("Failed to provision train. Please check details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateTrainData = (field, value) => {
    setTrainData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.100', pb: 8 }}>
      
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }}>
            <TrainIcon sx={{ fontSize: 32 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 1, m: 0 }}>
              NXT_RAIL 
              <Typography component="span" sx={{ opacity: 0.7, ml: 1 }}>| ADMIN COMMAND</Typography>
            </Typography>
          </Box>
          <Button color="inherit" onClick={() => navigate('/admin')}>
            Cancel & Exit
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Provision New Train
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure identity, routing, and inventory for a new rolling stock asset.
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box>
            {activeStep === 0 && (
              <TrainBasicDetailsForm trainData={trainData} updateTrainData={updateTrainData} />
            )}
            {activeStep === 1 && (
              <StationStopsForm trainData={trainData} updateTrainData={updateTrainData} />
            )}
            {activeStep === 2 && (
              <CoachConfigurationForm trainData={trainData} updateTrainData={updateTrainData} />
            )}
          </Box>

          <Box display="flex" justifyContent="space-between" mt={4} pt={3} borderTop="1px solid #eee">
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button 
                  variant="contained" 
                  color="secondary" 
                  size="large" 
                  onClick={handleSave}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Provisioning...' : 'Save & Publish Train'}
                </Button>
              ) : (
                <Button variant="contained" onClick={handleNext}>
                  Next Step
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};