import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../reducers/user/Auth/authThunks/getUserThunk';
import { getEVBunkWithSlot } from '../../../reducers/user/EVBunk/EVBunkSlots/getEVBunkWithSlot';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ViewSlot() {
    const dispatch = useDispatch();
    const params = useParams();
    console.log(params);

    useEffect(() => {
        async function handleUser() {
            try {
                const user = await dispatch(getUser()).unwrap();
                const evbunk = await dispatch(getEVBunkWithSlot(params.id)).unwrap();
                console.log('Login successful:', user);
                console.log('EV Bunk data:', evbunk);
            } catch (error) {
                console.error('Login failed:', error);
            }
        }
        handleUser();
    }, [dispatch, params.id]);

    const { EVBunkWithSlot } = useSelector((state) => state.EVBunk);

    if (!EVBunkWithSlot) {
        return <h1>Loading...</h1>;
    }
    console.log(EVBunkWithSlot);

    return (

        <Box
            sx={{
                flexGrow: 1,
                height: { xs: '65vh' },
                width: '100%',
            }}
        >
            <Grid
                container
                spacing={0}
                sx={{
                    width: '100%',
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
                        flexDirection: 'column',
                        padding: 3,
                        gap: 2,
                        backgroundColor: '#4DB6AC',
                    }}
                >
                   
                 
                    <Item elevation={0} sx={{ alignItems: 'center' }}>
                        <Typography variant="h4" sx={{ color: 'grey' }}>
                            EV BUNK DETAILS
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {EVBunkWithSlot && EVBunkWithSlot.evbunkname}
                        </Typography>
                        <Typography>{EVBunkWithSlot && EVBunkWithSlot.evbunk_ref.address}</Typography>
                       
                    </Item>
                    <Item elevation={0} sx={{ alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            Available Slots:
                        </Typography>
                        {EVBunkWithSlot && EVBunkWithSlot.availableSlots && EVBunkWithSlot && EVBunkWithSlot.availableSlots.length > 0 ? (
                            EVBunkWithSlot.availableSlots.map((slot) => (
                                <Box key={slot._id} sx={{ marginBottom: 2 }}>
                                    <Typography variant="body1">
                                        {slot.time} - {slot.vacancy} slots available
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography>No slots available</Typography>
                        )}
                    </Item>

                </Grid>
            </Grid>
        </Box>
    );
}
