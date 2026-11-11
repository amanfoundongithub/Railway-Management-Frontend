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
import { cookieService } from '../../../utils/cookieService';
import { parseApiError } from '../../../utils/errorHelper';

export const LoginForm = () => {

  const navigate                      = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '', 
    password: '' 
  });
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) { 
      setError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response        = await authService.login(credentials);
      const token           = response.token;
      const { user }        = response.data;
      cookieService.setToken(token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/'); 
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
        disabled={loading}
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
        disabled={loading}
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