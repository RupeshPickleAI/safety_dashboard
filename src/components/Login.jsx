// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { TextField, Button, Typography, Box, Container, Paper } from '@mui/material';
// // import { styled } from '@mui/material/styles';

// // const StyledPaper = styled(Paper)(({ theme }) => ({
// //   marginTop: theme.spacing(8),
// //   padding: theme.spacing(4),
// //   display: 'flex',
// //   flexDirection: 'column',
// //   alignItems: 'center',
// //   background: 'rgba(255, 255, 255, 0.9)',
// //   backdropFilter: 'blur(10px)',
// //   borderRadius: '15px',
// //   boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
// // }));

// // const Login = () => {
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     password: '',
// //   });   
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Add your login logic here
// //     console.log('Login attempt:', formData);
// //     if (formData.username === 'abc' && formData.password === '123') {
// //       // Set authentication state
// //       localStorage.setItem('isAuthenticated', 'true');
// //       // Navigate to insights page
// //       navigate('/insights');
// //     } else {
// //       alert('Invalid username or password');
// //     }
// //   };

// //   return (
// //     <Box
// //       sx={{
// //         minHeight: '100vh',
// //         display: 'flex',
// //         background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
// //       }}
// //     >
// //       {/* Left side - Image/Pattern */}
// //       {/* <Box
// //         sx={{
// //           flex: 1,
// //           display: { xs: 'none', md: 'flex' },
// //           background: 'linear-gradient(45deg, rgba(13, 20, 48, 0.8), rgba(16, 35, 94, 0.8))',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           position: 'relative',
// //           overflow: 'hidden',
// //         }}
// //       >
// //         <Box
// //           sx={{
// //             position: 'absolute',
// //             width: '100%',
// //             height: '100%',
// //             background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
// //             animation: 'pulse 4s infinite',
// //           }}
// //         />
// //       </Box> */}

// //       {/* Right side - Login Form */}
// //       <Container component="main" maxWidth="xs" sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
// //         <StyledPaper elevation={6}>
// //           <img
// //             src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/indus_logo_dev.png"
// //             alt="Logo"
// //             style={{ width: '200px', marginBottom: '2rem' }}
// //           />
// //           <Typography component="h1" variant="h5" sx={{ mb: 3, color: '#1a237e' }}>
// //             Welcome Back
// //           </Typography>
// //           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
// //             <TextField
// //               margin="normal"
// //               required
// //               fullWidth
// //               id="username"
// //               label="Username"
// //               name="username"
// //               autoComplete="username"
// //               autoFocus
// //               value={formData.username}
// //               onChange={handleChange}
// //               sx={{ mb: 2 }}
// //             />
// //             <TextField
// //               margin="normal"
// //               required
// //               fullWidth
// //               name="password"
// //               label="Password"
// //               type="password"
// //               id="password"
// //               autoComplete="current-password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               sx={{ mb: 3 }}
// //             />
// //             <Button
// //               type="submit"
// //               fullWidth
// //               variant="contained"
// //               sx={{
// //                 mt: 3,
// //                 mb: 2,
// //                 py: 1.5,
// //                 background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
// //                 '&:hover': {
// //                   background: 'linear-gradient(45deg, #0d47a1 30%, #1a237e 90%)',
// //                 },
// //               }}
// //             >
// //               Sign In
// //             </Button>
// //             <Box sx={{ textAlign: 'center', mt: 2 }}>
// //               <Typography variant="body2" color="text.secondary">
// //                 Don't have an account?{' '}
// //                 <Link to="/signup" style={{ color: '#1a237e', textDecoration: 'none' }}>
// //                   Sign Up
// //                 </Link>
// //               </Typography>
// //             </Box>
// //           </Box>
// //         </StyledPaper>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default Login; 
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography, Box, Container, Paper, Alert } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import axios from 'axios';

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   marginTop: theme.spacing(8),
//   padding: theme.spacing(4),
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   background: 'rgba(255, 255, 255, 0.9)',
//   backdropFilter: 'blur(10px)',
//   borderRadius: '15px',
//   boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
// }));

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//   });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     setError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload={
//         username: formData.username,
//         password: formData.password,
//       }
//       const response = await axios.post('http://142.93.214.65:8000/api/login/',payload, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.data && response.data.message == 'Login successfull' && response.data.access && response.data.refresh) {
//         localStorage.setItem('isAuthenticated', 'true');
//         localStorage.setItem('accessToken', response.data.access);
//         localStorage.setItem('refreshToken', response.data.refresh);
//         console.log(response.data.message)
//         navigate('/insights');
//       } else {
//         setError('Invalid login response');
//       }
//     } catch (err) {
//       setError('Login failed. Please check your credentials and try again.');
//       console.error('Login error:', err);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
//         display: 'flex',
//         background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
//       }}
//     >
//       <Container component="main" maxWidth="xs" sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
//         <StyledPaper elevation={6}>
//           <img
//             src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/indus_logo_dev.png"
//             alt="Logo"
//             style={{ width: '200px', marginBottom: '2rem' }}
//           />
//           <Typography component="h1" variant="h5" sx={{ mb: 3, color: '#1a237e' }}>
//             Welcome Back
//           </Typography>
//           {error && (
//             <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
//               {error}
//             </Alert>
//           )}
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="username"
//               label="Username"
//               name="username"
//               autoComplete="username"
//               autoFocus
//               value={formData.username}
//               onChange={handleChange}
//               sx={{ mb: 2 }}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//               sx={{ mb: 3 }}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 3,
//                 mb: 2,
//                 py: 1.5,
//                 background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
//                 '&:hover': {
//                   background: 'linear-gradient(45deg, #0d47a1 30%, #1a237e 90%)',
//                 },
//               }}
//             >
//               Sign In
//             </Button>
//             <Box sx={{ textAlign: 'center', mt: 2 }}>
//               <Typography variant="body2" color="text.secondary">
//                 Don't have an account?{' '}
//                 <Link to="/signup" style={{ color: '#1a237e', textDecoration: 'none' }}>
//                   Sign Up
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </StyledPaper>
//       </Container>
//     </Box>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Container, Paper, Alert, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

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

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://142.93.214.65:8000/api/login/', {
        username: formData.username,
        password: formData.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.message === 'Login successfull' && response.data.access && response.data.refresh) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('accessToken', response.data.access);
        localStorage.setItem('refreshToken', response.data.refresh);
        navigate('/insights', { replace: true });
      } else {
        setError('Invalid login response');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
      console.error('Login error:', err);
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
      <Container component="main" maxWidth="xs" sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <StyledPaper elevation={6}>
          <img
            src="https://eimkeia.stripocdn.email/content/guids/CABINET_8270216c780e362a1fbcd636b59c67ae376eb446dc5f95e17700b638b8c3f618/images/indus_logo_dev.png"
            alt="Logo"
            style={{ width: '200px', marginBottom: '2rem' }}
          />
          <Typography component="h1" variant="h5" sx={{ mb: 3, color: '#1a237e' }}>
            Welcome Back
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
              {error}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              disabled={loading}
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
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
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
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#1a237e', textDecoration: 'none' }}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default Login;