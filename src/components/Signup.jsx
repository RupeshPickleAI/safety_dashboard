import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    last_name:'',
    email: '',
    phone_number: '',
    location:'',
    password: '',
   confirm_password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup attempt:', formData);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
      }}
    >
      {/* Left side - Image/Pattern */}
      {/* <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          background: 'linear-gradient(45deg, rgba(13, 20, 48, 0.8), rgba(16, 35, 94, 0.8))',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
            animation: 'pulse 4s infinite',
          }}
        />
      </Box> */}

      {/* Right side - Signup Form */}
      <Container component="main" maxWidth="xs" sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <StyledPaper elevation={6}>
          <img
            src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/indus_logo_dev.png"
            alt="Logo"
            style={{ width: '200px', marginBottom: '2rem' }}
          />
          <Typography component="h1" variant="h5" sx={{ mb: 3, color: '#1a237e' }}>
            Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="first_name"
              label="First Name"
              name="first_name"
              autoComplete="name"
              autoFocus
              value={formData.fullName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="last_name"
              label="Last Name"
              name="last_name"
              autoComplete="name"
              autoFocus
              value={formData.fullName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id=" phone_number"
              label="Phone Number"
              name="phone number"
              autoComplete="number"
              autoFocus
              value={formData.fullName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Location"
              name="location"
              autoComplete=""
              autoFocus
              value={formData.fullName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{ mb: 3 }}
            />
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
            >
              Sign Up
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