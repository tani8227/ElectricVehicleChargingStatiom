import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { Actions } from '../../reducers/user/Auth/authSlice.jsx'
import { loginUser } from '../../reducers/user/Auth/authThunks/loginThunk.jsx';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  const [user, setUser] = useState({
    email: '',
    userType: 'user',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    console.log("hghghghg")

    try {
      const response = await dispatch(loginUser(user)).unwrap();

      // Successful login, navigate to dashboard
      console.log('Login successful:', response);
      navigate('/user/dashboard');
    } catch (error) {
      console.error('Login failed:', error);

      // Handle specific errors
      if (error.status === 401) {
        if (error.message === "wrongpassword") {
          navigate('/signin'); // Incorrect password, stay on Sign In
        } else if (error.message === "invaliduser") {
          navigate('/signup'); // Invalid user, redirect to Sign Up
        }

      } else {
        console.error('Unhandled error:', error);
        alert(error.message); // Handle other errors as needed
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

  }

  return (
    <Box
      sx={{
        flexGrow: 0,
        height: {
          xs: '50vh',
          sm: '70vh',
          md: '80vh',
        },
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#e0ebeb54',
        }}
      >
        <Grid
          size={{ md: 6 }}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: '#4DB6AC',
            padding: 2,
          }}
        >
          <Item
            elevation={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              width: '100%',
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h2" sx={{ color: 'grey' }}>
              LOGIN AS USER
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ margin: 0, padding: 0, width: '100%', gap: 2 }}>
                <TextField
                  type="email"
                  name="email"
                  label="Enter Email"
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
                <TextField
                  type="text"
                  name="password"
                  label="Enter Password"
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Sign In
                </Button>
              </FormControl>
            </form>
            <Typography>
              New Admin? <Link to="/admin/signup">Register</Link>
              &nbsp; <br /><Link to="/">home</Link>
            </Typography>

          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
