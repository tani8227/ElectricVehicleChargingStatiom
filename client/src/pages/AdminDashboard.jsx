import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LayersIcon from '@mui/icons-material/Layers';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AddEVBunk from '../component/admin/manageBunk/AddEVBunk.jsx';
import { Actions } from '../reducers/user/Auth/authSlice.jsx';
import { getUser } from '../reducers/user/Auth/authThunks/getUserThunk.jsx';
import { useEffect } from 'react';
import EVBunkList from '../component/admin/manageBunk/EVBunkList.jsx';
import AddSlot from '../component/admin/manageslotforEVBunk/ManageSlot.jsx';




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Dashboard() {


  const [manageBunk, setManageBunk] = useState(false);
  const [manageRechaegeSlot, setManageRechaegeSlot] = useState(false);

  const dispatch= useDispatch();
  const token = localStorage.getItem('token');


  console.log(token);

  useEffect(()=>
    {
       async function handleUser()
        {    
          try {
            const user=await dispatch(getUser()).unwrap(); 
            console.log('Login successful:', user);
            
            
          } catch (error) {
            console.error('Login failed:', error);
          }
        }
        handleUser();
    },[])

  // const { authUser, token } = useSelector((state) => state.Auth);




  // console.log(authUser, token);

  const param = useParams();

  console.log(param.item);

  const handleClickManageBunk = () => {
    setManageBunk(!manageBunk);

  };
  const handleClickManageRecharge = () => {
    setManageRechaegeSlot(!manageRechaegeSlot);
  };

  return (

    <Box sx={{ flexGrow: 1, marginTop: 5 }}>
      <Grid container spacing={2} sx={{ display: "flex", justifyContent: "flex-start" }} >
        <Grid item xs={3} sm={4} sx={{ display: "flex", justifyContent: "center", }}>
          <Item elevation={0} square sx={{ display: "flex", justifyContent: "center", backgroundColor: "pink" }}>
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"

            >


              <ListItemButton onClick={handleClickManageBunk}>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: "blue" }} />
                </ListItemIcon>
                <ListItemText primary="Manage Bunk Details" />
                {manageBunk ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>


              <Collapse in={manageBunk} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <Link to={'/admin/dashboard/createEVBunk'} style={{textDecoration:"none"}}>
                    <ListItemText primary=" Create EV Bunk Location" />
                    </Link>
                  </ListItemButton>
                </List>
                
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <Link to={'/admin/dashboard/EVList'} style={{textDecoration:"none"}}>
                    <ListItemText primary="EV Bunk Location List" />
                    </Link>
                  </ListItemButton>
                </List>
              </Collapse>




              <ListItemButton onClick={handleClickManageRecharge}>
                <ListItemIcon>
                  <LayersIcon sx={{ color: "blue" }} />
                </ListItemIcon>
                <ListItemText primary="Manage Recharge Slots" />
                {manageRechaegeSlot ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>

              <Collapse in={manageRechaegeSlot} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <Link to={'/admin/dashboard/create-slot'} style={{textDecoration:"none"}}>
                      <ListItemText primary=" Create Slot For EV Bunk " />
                    </Link>
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary=" Delete EV Bunk Location" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary=" Edit EV Bunk Location" />
                  </ListItemButton>
                </List>
              </Collapse>



            </List>
          </Item>

        </Grid>
        <Grid item xs={3} sm={8} sx={{ display: "flex", justifyContent: "center", }}>
          <Item elevation={0} sx={{ display: "flex", justifyContent: "center", backgroundColor: "pink", width: "100%" }} >

            {param && param.item === undefined && <AddEVBunk />}
            {param && param.item === 'createEVBunk' &&<AddEVBunk />}
            {param && param.item === 'undefined'|| param.item==='EVList' && <EVBunkList />}
            {param && param.item === 'create-slot' && <AddSlot />}

          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}





