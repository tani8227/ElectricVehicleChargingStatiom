import React, { useEffect, useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getEVBunkSlot } from '../reducers/user/EVBunk/EVBunkSlots/getEVBunkSlot';
import { bookEVBunkSlot } from '../reducers/user/EVBunk/EVBunkSlots/bookEVBunkSlotThunk';
import { getUser } from '../reducers/user/Auth/authThunks/getUserThunk';
import Footer from '../component/footer/footer';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));


const EVBunkDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [bunkDetails, setBunkDetails] = useState(null);
  // const {authUser, token}= useSelector((state)=>state.Auth);

  useEffect(() => {
    async function fetchEVBunkSlot() {
      try {
        const evSlot = await dispatch(getEVBunkSlot(id)).unwrap();
        const user = await dispatch(getUser()).unwrap();
        console.log(user.user);
        console.log(evSlot.data);



        // Ensure evSlot and availableSlots are valid
        if (!evSlot || !evSlot.data || !evSlot.data.availableSlots) {
          throw new Error('EV Bunk Slot data is invalid');
        }

        // Get the user.slotbook and map it to strings for comparison
        const userslot = user.user.slotbook ? user.user.slotbook.map(String) : [];

        // Map availableSlots and add isBooked property based on user.slotbook
        const updatedSlots = evSlot.data.availableSlots.map((slot) => ({
          ...slot,
          isBooked: userslot.includes(String(slot._id)), // Check if slot._id exists in slotbook
        }));

        // Combine evSlot data with updatedSlots
        const combinedData = {
          ...evSlot.data,
          availableSlots: updatedSlots,
        };

        // Update state with combined data

        console.log(combinedData);
        setBunkDetails(combinedData);


      } catch (error) {
        console.error('Error fetching EV Bunk Slot:', error);
      }
    }
    fetchEVBunkSlot();
  }, [dispatch, id]);

  async function handlebBookSlot(evbunkId, slotId) {

    try {
      const evSlot = await dispatch(bookEVBunkSlot({ evbunkId, slotId })).unwrap();


      console.log(evSlot.message);
      window.location.reload()
    } catch (error) {
      console.log("errro in slot booking")
      console.error('Error fetching EV Bunk Slot:', error);
    }


  }



  if (!bunkDetails) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 1 }}>
        <Typography variant="h6" color="textSecondary">
          Loading EV Bunk Details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, marginTop: 5, padding: 2, backgroundColor: "#C5E1A5" }}>
      <Typography variant="h4" align="center" gutterBottom>
        {bunkDetails.evbunkname}
      </Typography>
      <Grid container spacing={3}>
        {bunkDetails.availableSlots.map((slot) => (
          <Grid item xs={12} sm={6} md={4} key={slot._id}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {slot.time}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Available Slots: {slot.vacancy}
                </Typography>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#757575", marginTop: 1 }}
                  onClick={() => { handlebBookSlot(bunkDetails._id, slot._id) }}
                  disabled={slot.vacancy === 0 || slot.isBooked === true} // Disabled if no vacancy or already booked
                >
                  {`${slot.isBooked ? 'Booked' : 'Book Slot'}`}
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EVBunkDetails;
