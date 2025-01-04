import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userHomeBgm from '../assets/userHomeBgm.webp';
import { getUser } from '../reducers/user/Auth/authThunks/getUserThunk.jsx';
import { FormControl, TextField, Button, Typography } from '@mui/material';
import { getNearByEVBunkList } from '../reducers/user/EVBunk/EVBunkThunks/getNearByEVBunkListThunk.jsx';
import { Link } from 'react-router-dom';




const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'white',
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function UserDashboard() {
    const dispatch = useDispatch();
    const { NearByEVBunkList } = useSelector((state) => state.EVBunk)

    const token = localStorage.getItem('token');
    const [userLocation, setUserLocation] = useState({ lat: '', lng: '' });
    const [searchLocation, setSearchLocation] = useState({ lat: '', lng: '' });

    //   console.log(token);

    // Fetch user location

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation({ lat: latitude, lng: longitude });
                setSearchLocation({ lat: latitude, lng: longitude });

                console.log('User location:', latitude, longitude);
            },
            (error) => {
                console.error("Error fetching user location:", error);
            }
        );
    }, []);

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setSearchLocation((prevLocation) => ({
            ...prevLocation,
            [name]: value,
        }));
    };

    // Trigger search when the user clicks 'Go'
    const handleSearch = async () => {

        const ressult = await dispatch(getNearByEVBunkList(searchLocation)).unwrap();
        console.log(ressult);
        console.log("Searching for EV bunks near:", searchLocation);

    };

    useEffect(() => {
        async function handleUser() {
            try {
                const user = await dispatch(getUser()).unwrap();
                console.log('Login successful:', user);
            } catch (error) {
                console.error('Login failed:', error);
            }
        }
        handleUser();
    }, [dispatch]);



    console.log(NearByEVBunkList)

    return (
        <Box sx={{ flexGrow: 1, marginTop: 0.2 }}>
            <Grid
                container
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Grid
                    item
                    size={12}
                    sx={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                        alignItems: 'center',
                        backgroundImage: `url(${userHomeBgm})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: { xs: '45vh', sm: '86vh' },
                        width: '100%',
                    }}
                >
                    <Item square elevation={0}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: "flex-end",
                            backgroundColor: 'transparent',
                            width: { xs: '60%', sm: '40%', md: '30%' },
                        }}
                    >
                        <form>
                            <FormControl
                                sx={{
                                    marginTop: 8,
                                    padding: 0,
                                    backgroundColor: '#11111142',
                                    width: '100%',
                                    color: 'white',
                                    gap: 2,
                                }}
                            >
                                <TextField
                                    type="Text"
                                    name="lat"
                                    label="Location"
                                    variant="outlined"
                                    required
                                    value={`${userLocation.lat!==null&&searchLocation.lat!==null&&"Fetched Your Location"}`} 
                                    onChange={handleLocationChange}
                                    sx={{
                                        '& .MuiInputLabel-root': { color: 'white' },
                                        '& .MuiInputBase-root': { color: 'white' },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            color: 'white',
                                        },
                                    }}
                                />
                               
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 0}}
                                    onClick={handleSearch}
                                >
                                    Go
                                </Button>
                            </FormControl>
                        </form>
                    </Item>
                </Grid>

                {NearByEVBunkList &&
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            backgroundColor: '#4DB6AC',
                            alignItems: "center",
                            flexDirection: "column",
                            padding: 3,
                            gap: 2,
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
                                backgroundColor: "grey"
                            }}
                        >
                            <Typography variant="h4" component="h2" sx={{ color: 'White' }}>
                                NEAR BY EV BUNK LIST
                            </Typography>


                        </Item>

                        <Item
                            elevation={5}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignContent: "flex-start",
                                width: '100%',

                            }}
                        >
                            {NearByEVBunkList && NearByEVBunkList.map((item, key) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: "column", md: "row" },
                                        justifyContent: "space-between",
                                        gap: 1,
                                        width: "100%",
                                        borderBottom: "1px solid lightgrey"
                                    }}
                                    key={key}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: 'black',
                                            textAlign: "left",
                                            width: { xs: "100%", md: "50%" },

                                        }}
                                    >
                                        {`${key + 1}. ${item.address} `}
                                    </Typography>
                                    
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection:{xs:"row"},
                                            justifyContent: {xs:"flex-start",md:"space-evenly",},
                                            gap: {xs:5, md:2},
                                            width: {xs:"100%",md:"40%"},
                                        }}
                                        key={key}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                color: 'black',
                                                textAlign: "left",
                                                
                                                
                                            }}
                                        >
                                           {`${item.operatingHours?`OPEN : ${item.operatingHours}`:''}`}

                                        </Typography>

                                        <Link to={`/user/dashboard/map-loaction/${item.location.coordinates}`}>
                                            <LocationOnIcon sx={{ color: "red" }} />
                                        </Link>
                                        <Link to={`/evbunk-details/${item._id}`}>
                                            <EventAvailableIcon sx={{ color: "red" }} />
                                        </Link>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: 'black',
                                                    textAlign: "left",
                                                   
    
                                                }}
                                            >
                                               {`+91 ${item.mobile ? `${item.mobile}` : '9999999999'}`}
    
                                            </Typography>

                                    </Box>
                                </Box>
                            ))}
                        </Item>
                    </Grid>


                }



            </Grid>
        </Box>
    );
}
