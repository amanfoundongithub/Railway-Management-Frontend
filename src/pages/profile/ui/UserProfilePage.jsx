import React from 'react';
import { Box, Container, Grid, Typography, Paper, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Navbar } from '../../../widgets/header/ui/Navbar';
import { MasterListTable } from '../../../features/master-list/ui/MasterListTable';

export const UserProfilePage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Account Settings
        </Typography>
        
        <Grid container spacing={4} mt={1}>
          {/* Settings Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton selected>
                    <ListItemText primary="Master List" secondary="Saved Passengers" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Preferences" secondary="Food & Berth" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="Security" secondary="Change Password" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Settings Content Area */}
          <Grid item xs={12} md={9}>
            <MasterListTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};