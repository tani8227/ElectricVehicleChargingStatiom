import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import bgImage from '../assets/main.jpg';
import { useSelector } from 'react-redux';
import Map from '../component/googlemap/Googlemap';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function MapWrapper() {
    
  const { authUser, token } = useSelector((state) => state.Auth);
  console.log(authUser, token);

  return (
    <Box sx={{ flexGrow: 1, marginTop:2 }}>
      <Grid 
        container 
        sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Grid 
          item 
          xs={12} 
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: { xs: "center", sm: "center" },
            alignItems: 'center',
            height: { xs: '75vh', sm: '80vh' }, 
            width: "100%",
          }}
        >
          <Item square elevation={0}
            sx={{
              display: 'flex',
              flexDirection: "column",
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: "#11111142",
              width:  "80%" ,
             
            }}
          >
            <Map /> 
          </Item>
        </Grid>
      </Grid>

     

     
    </Box>
  );
}
