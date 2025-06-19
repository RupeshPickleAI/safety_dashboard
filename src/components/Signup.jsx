import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
}));

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    location: '',
    password: '',
    confirm_password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.first_name || !formData.last_name || !formData.email || 
        !formData.phone_number || !formData.location || !formData.password || 
        !formData.confirm_password) {
      setError('All fields are required');
      return false;
    }

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://ai-safety.indusvision.ai/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      setSuccess('Signup successful! Please login to continue.');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        location: '',
        password: '',
        confirm_password: '',
      });
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
      }}
    >
    
      <Container
  component="main"
  maxWidth="sm" // sets maxWidth based on theme (sm ≈ 600px)
  sx={{ flex: 1, display: 'flex', alignItems: 'center' ,alignItems:'center',justifyContent:'center'}}
>

        <StyledPaper elevation={6}>
          
         <Box
                     sx={{
                       backgroundColor: '#1a237e', // Blue background
                       padding: 2,
                       borderRadius: 2,
                       marginBottom: 3,
                       boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                       display: 'flex',
                       justifyContent: 'center',
                       alignItems: 'center',
                       width: '100%',
                     }}
                   >
                     <img
                       src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/indus_logo_dev.png"
                       alt="Logo"
                       style={{ width: '200px' }}
                     />
                   </Box>
          <Typography component="h1" variant="h5" sx={{ mb: 3, color: '#1a237e' }}>
            Create Account
          </Typography>
          {/* <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}  sx={{
                mt: 2,
                mb: 1,}}>
                  
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  autoComplete="given-name"
                   sx={{ width: '300px' }} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  autoComplete="family-name"
                   sx={{ width: '300px' }} 
                />
              </Grid>
                  <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                   sx={{ width: '300px' }} 
                />
              </Grid>
                 <Grid item xs={12} sm={6}>
                <TextField
                  required
                  type='number'
                  fullWidth
                  label="Phone Number"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  autoComplete="tel"
                   sx={{ width: '300px' }} 
                />
              </Grid>
               <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    sx={{ width: '300px' }} // Change this value as needed
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                   sx={{ width: '300px' }} 
                />
              </Grid>
                   <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  autoComplete="new-password"
                   sx={{ width: '300px' }} 
                   
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0d47a1 30%, #1a237e 90%)',
                },
              }}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#1a237e', textDecoration: 'none' }}>
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box> */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
  {error && (
    <Alert severity="error" sx={{ mb: 2 }}>
      {error}
    </Alert>
  )}

  {success && (
    <Alert severity="success" sx={{ mb: 2 }}>
      {success}
    </Alert>
  )}

  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        label="First Name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
        autoComplete="given-name"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        label="Last Name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
        autoComplete="family-name"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        autoComplete="email"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        type="number"
        fullWidth
        label="Phone Number"
        name="phone_number"
        value={formData.phone_number}
        onChange={handleChange}
        autoComplete="tel"
      />
    </Grid>
 
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        autoComplete="new-password"
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        required
        fullWidth
        label="Confirm Password"
        name="confirm_password"
        type="password"
        value={formData.confirm_password}
        onChange={handleChange}
        autoComplete="new-password"
      />
    </Grid>
     <Grid item xs={12} sm={12}>
      <TextField
        required
        fullWidth
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        
      />
    </Grid>
{/*     
       <Grid item xs={12} sm={12}>
      <TextField
        required
        fullWidth
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
      />
    </Grid> */}
  </Grid>

  <Button
    type="submit"
    fullWidth
    variant="contained"
    sx={{
      mt: 3,
      mb: 2,
      py: 1.5,
      background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
      '&:hover': {
        background: 'linear-gradient(45deg, #0d47a1 30%, #1a237e 90%)',
      },
    }}
    disabled={loading}
  >
    {loading ? 'Signing up...' : 'Sign Up'}
  </Button>

  <Box sx={{ textAlign: 'center', mt: 2 }}>
    <Typography variant="body2" color="text.secondary">
      Already have an account?{' '}
      <Link to="/login" style={{ color: '#1a237e', textDecoration: 'none' }}>
        Sign In
      </Link>
    </Typography>
  </Box>
</Box>

        </StyledPaper>
      </Container>
    </Box>
  );
};

export default Signup; 