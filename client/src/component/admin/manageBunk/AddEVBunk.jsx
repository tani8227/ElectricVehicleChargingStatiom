import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../../reducers/user/Auth/authThunks/getUserThunk';
import { createEVBunk } from '../../../reducers/user/EVBunk/EVBunkThunks/createEVBunkThunk';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function AddEVBunk() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authUser } = useSelector((state) => state.Auth);
  const [EVBunk, setEVBunk] = useState({
    evbunkname: '',
    address: '',
    state: '',
    city: '',
    mobile: '',
    operatingHours: '',
    admin_ref: authUser ? authUser._id : '' // Initialize admin_ref with authUser._id
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      setIsLoading(false); // If user is available, stop loading
    } else {
      dispatch(getUser()) // Fetch user if not available
        .unwrap()
        .then((user) => {
          console.log('User fetched:', user);
          setIsLoading(false); // Stop loading once the user is fetched
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          setIsLoading(false);
        });
    }
  }, [dispatch, authUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (authUser) {
      EVBunk.admin_ref = authUser._id;
    } else {
      alert('User not authenticated');
      return;
    }

    try {
      // No need to update admin_ref here since it's already in the state
      const response = await dispatch(createEVBunk(EVBunk)).unwrap();
      console.log('EV Bunk created:', response);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error creating EV Bunk:', error);
      alert(error.message); // Handle errors appropriately
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setEVBunk((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  if (isLoading) {
    return <h1>Loading...</h1>; // Display loading message while fetching user data
  }

  return (
    <Box
      sx={{
        flexGrow: 0,
        height: {
          xs: '50vh',
          sm: '70vh',
        },
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          width: '50vw',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: '#e0ebeb54',
        }}
      >
        <Grid
          item
          xs={12}
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
              height: 'fit-content',
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h2" sx={{ color: 'grey' }}>
              CREATE EV BUNK
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ margin: 0, padding: 0, width: '100%' }}>
                <Grid container spacing={2}>

                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      name="evbunkname"
                      label="Enter Bunk Name"
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      type="text"
                      name="operatingHours"
                      label="Operating Hours"
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>

                 
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="mobile"
                      label="Phone No."
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="city"
                      label="City"
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      type="text"
                      name="state"
                      label="State"
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>

                 
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      name="address"
                      label="Address"
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      ADD
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </form>

           
          </Item>
        </Grid>
      </Grid>
    </Box>

  );
}
