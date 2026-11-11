import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Alert, 
  CircularProgress 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';

export const LoginForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  
  // API integration states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // Clear error message as soon as the user starts typing again
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // 1. Call the backend via our centralized auth service
      const response = await authService.login(credentials);
      
      // 2. Extract token and user
      const { token, user } = response.data;
      
      // 3. Store in localStorage for the Axios Interceptor and app state
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // 4. Route securely based on the actual database role
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/'); // Go to home page
      }
    } catch (err) {
      // 5. Differentiate between server errors and network/down errors
      if (err.response) {
        // Server responded with a status code outside 2xx (e.g., 401 Unauthorized)
        setError(err.response.data?.message || 'Invalid email or password. Please try again.');
      } else if (err.request) {
        // Request was made but no response was received (Backend is down or network issue)
        setError('Unable to connect to the server. Please check if the backend is running.');
      } else {
        // Something else happened while setting up the request
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Display API errors cleanly at the top of the form */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
        disabled={loading} // Prevent edits while submitting
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
        disabled={loading}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
        <FormControlLabel 
          control={<Checkbox color="primary" disabled={loading} />} 
          label="Remember me" 
        />
        <Typography 
          variant="body2" 
          component={Link} 
          to="/forgot-password" 
          sx={{ textDecoration: 'none', color: 'primary.main', pointerEvents: loading ? 'none' : 'auto' }}
        >
          Forgot password?
        </Typography>
      </Box>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        disabled={loading} // Prevent double-clicks
        sx={{ mt: 2, mb: 3, py: 1.5 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
      </Button>

      <Typography variant="body2" align="center">
        Don't have an account?{' '}
        <Link 
          to="/register" 
          style={{ 
            textDecoration: 'none', 
            fontWeight: 'bold', 
            color: loading ? 'gray' : '#f97316',
            pointerEvents: loading ? 'none' : 'auto'
          }}
        >
          Create an account
        </Link>
      </Typography>
    </form>
  );
};