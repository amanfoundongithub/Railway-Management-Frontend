import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // MOCK RBAC LOGIC: 
    // If user types 'admin@nxtrail.com', we assume admin role. Otherwise, passenger.
    if (credentials.email === 'admin@nxtrail.com') {
      alert('Logged in as Admin');
      navigate('/admin');
    } else {
      alert('Logged in as Passenger');
      navigate('/'); // Go to home page
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        variant="outlined"
        margin="normal"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        margin="normal"
        value={credentials.password}
        onChange={handleChange}
        required
      />

      <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
        <FormControlLabel control={<Checkbox color="primary" />} label="Remember me" />
        <Typography variant="body2" component={Link} to="/forgot-password" sx={{ textDecoration: 'none', color: 'primary.main' }}>
          Forgot password?
        </Typography>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 2, mb: 3, py: 1.5 }}
      >
        Sign In
      </Button>

      <Typography variant="body2" align="center">
        Don't have an account?{' '}
        <Link to="/register" style={{ textDecoration: 'none', fontWeight: 'bold', color: '#f97316' }}>
          Create an account
        </Link>
      </Typography>
    </form>
  );
};