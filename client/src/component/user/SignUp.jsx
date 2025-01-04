import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function BasicGrid() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    userType: 'user',
    password: '',
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:7000/api/v1/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User Registered:', data);
        navigate('/user/signin');
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('An error occurred. Please try again later.');
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
            alignItems: 'center',
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
              alignItems: 'center',
              width: '100%',
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h2" sx={{ color: 'grey' }}>
              USER REGISTRATION
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl
                sx={{
                  margin: 0,
                  padding: 0,
                  width: '100%',
                  gap: 2,
                }}
              >
                <TextField
                  type="text"
                  name="name"
                  label="Enter Name"
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
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
                  Sign Up
                </Button>
                <Typography>
                  Existing User? <Link to="/user/signin">Login</Link>
                  &nbsp; <br /><Link to="/">home</Link>
                </Typography>

              </FormControl>
            </form>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
