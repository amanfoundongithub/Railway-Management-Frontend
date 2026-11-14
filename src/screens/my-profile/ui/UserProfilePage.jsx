// src/pages/profile/ui/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { Navbar } from '../../../header/ui/Navbar';
import { MasterListWidget } from './components/MasterListWidget';
import { authService } from "../../../screens/auth/api/authService";

export const UserProfilePage = () => {
  const [masterList, setMasterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the user's master list when they open their profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await authService.getMe();
        setMasterList(user.masterList || []);
      } catch (err) {
        setError('Failed to load profile data.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // This function is triggered by the MasterListWidget
  const handleUpdateList = async (action, passenger) => {
    try {
      // Calls the API and returns the newly updated array from MongoDB
      const updatedList = await authService.updateMasterList(action, passenger);
      setMasterList(updatedList);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update master list');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          My Profile
        </Typography>
        
        {loading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        ) : (
          <MasterListWidget 
            masterList={masterList} 
            onUpdateList={handleUpdateList} 
          />
        )}
      </Container>
    </Box>
  );
};