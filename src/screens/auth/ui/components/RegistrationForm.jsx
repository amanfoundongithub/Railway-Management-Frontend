import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  CircularProgress 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from "../../api/authService";
import { cookieService } from "../../../../utils/cookieService";
import { parseApiError } from '../../../../utils/errorHelper';

export const RegistrationForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ 
    fullName: '',
    email: '', 
    phoneNumber: '',
    password: '', 
    confirmPassword: '' 
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // 1. Client-side validations
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Mirroring your Zod regex on the frontend for instant validation
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setError('Please provide a valid 10-digit Indian mobile number');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // 2. Build payload strictly matching the Zod body object
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        password: formData.password
      };

      const response = await authService.register(payload);
      const token    = response.token
      const { user } = response.data;
      cookieService.setToken(token);
      localStorage.setItem('user', JSON.stringify(user));
      
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(parseApiError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Full Name"
        name="fullName"
        type="text"
        variant="outlined"
        margin="normal"
        value={formData.fullName}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        variant="outlined"
        margin="normal"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Mobile Number"
        name="phoneNumber"
        type="tel"
        variant="outlined"
        margin="normal"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
        disabled={loading}
        inputProps={{ maxLength: 10 }}
      />
      
      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        margin="normal"
        value={formData.password}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        variant="outlined"
        margin="normal"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        disabled={loading}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        disabled={loading}
        sx={{ mt: 3, mb: 3, py: 1.5 }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
      </Button>

      <Typography variant="body2" align="center">
        Already have an account?{' '}
        <Link 
          to="/login" 
          style={{ 
            textDecoration: 'none', 
            fontWeight: 'bold', 
            color: loading ? 'gray' : '#f97316',
            pointerEvents: loading ? 'none' : 'auto'
          }}
        >
          Sign In
        </Link>
      </Typography>
    </form>
  );
};