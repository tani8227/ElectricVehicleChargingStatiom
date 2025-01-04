import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { FormControl, TextField, Button, Typography, Checkbox, MenuItem, ListItemText, Select, OutlinedInput, InputLabel } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../reducers/user/Auth/authThunks/loginThunk.jsx';
import { getUser } from '../../../reducers/user/Auth/authThunks/getUserThunk.jsx';
import { getEVBunk } from '../../../reducers/user/EVBunk/EVBunkThunks/getOneEVBunkThunk.jsx';
import { createEVBunkSlot } from '../../../reducers/user/EVBunk/EVBunkThunks/createEVBunkSlotThunk.jsx';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function AddSlotPage() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  
  useEffect(() => {
      async function fetchData() {
          try {
              await dispatch(getUser()).unwrap();
              await dispatch(getEVBunk(params.id)).unwrap();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    const { EVOneBunk } = useSelector((state) => state.EVBunk);

    const [selectedSlots, setSelectedSlots] = useState([]);
    const [slotCapacities, setSlotCapacities] = useState({});

    console.log(EVOneBunk);
  
    const [slotdata, setSlotData] = useState({
    evbunkname: `${EVOneBunk!==null?EVOneBunk.evbunkname:null}`,
    admin_ref: `${EVOneBunk!==null?EVOneBunk.admin_ref:null}`,
    evbunk_ref: `${EVOneBunk!==null?EVOneBunk._id:null}`,
    availableSlots:[]
});




  

  const handleSlotChange = (event) => {
    const { value } = event.target;
    setSelectedSlots(typeof value === 'string' ? value.split(',') : value);
  };

  const handleCapacityChange = (slot, value) => {
    setSlotCapacities((prev) => ({
      ...prev,
      [slot]: value,
    }));
     
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
     
    let newArr = Object.entries(slotCapacities).map(([slot, capacity]) => ({
        time: slot,
        vacancy: capacity,
      }));
      slotdata.evbunkname=EVOneBunk.evbunkname
      slotdata.admin_ref=EVOneBunk.admin_ref
      slotdata.evbunk_ref=EVOneBunk._id
      slotdata.availableSlots=newArr  
      console.log(slotdata)
    
    try {


      await dispatch(createEVBunkSlot(slotdata)).unwrap();
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      if (error.status === 401) {
        navigate(error.message === 'wrongpassword' ? '/signin' : '/signup');
      }
    }
  };

  const slots = [
    'Morning Slot (8 AM - 10 AM)',
    'Late Morning Slot (10 AM - 12 PM)',
    'Afternoon Slot (12 PM - 2 PM)',
    'Evening Slot (4 PM - 6 PM)',
    'Night Slot (6 PM - 8 PM)',
  ];

  return (
    <Box
      sx={{
        flexGrow: 0,
       
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
          item
          xs={12}
          
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
              justifyContent: "flex-start",
              alignItems: 'center',
              
              marginTop:2,
               width:"100%",// Set the width to make the form more compact
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h2" sx={{ color: 'darkgrey' }}>
            CREATE SLOT FOR EV BUNK
            </Typography>
            <form onSubmit={handleLoginSubmit}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="slot-select-label">Select Time Slots</InputLabel>
                <Select
                  labelId="slot-select-label"
                  id="slot-select"
                  multiple
                  value={selectedSlots}
                  onChange={handleSlotChange}
                  input={<OutlinedInput label="Select Time Slots" />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {slots.map((slot) => (
                    <MenuItem key={slot} value={slot}>
                      <Checkbox checked={selectedSlots.includes(slot)} />
                      <ListItemText primary={slot} />
                    </MenuItem>
                  ))}
                </Select>

                {/* Display selected slots with their corresponding capacity inputs */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {selectedSlots.map((slot) => (
                    <Grid item xs={12} key={slot}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body1">{`Time: ${slot}`}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label={`Capacity for ${slot}`}
                            type="number"
                            value={slotCapacities[slot] || ''}
                            onChange={(e) => handleCapacityChange(slot, e.target.value)}
                            variant="outlined"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                >
               ADD
              </Button>
                </FormControl>
            </form>
            
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
