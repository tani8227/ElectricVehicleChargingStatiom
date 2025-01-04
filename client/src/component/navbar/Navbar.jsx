import React, { useEffect, useState } from 'react';
import { styled, alpha, } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import Grid from '@mui/material/Grid';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Applogo from '../../assets/logo.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TemporaryDrawer from './Drawer.jsx';
import { NavLink, Outlet, Link, useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../reducers/user/Auth/authThunks/getUserThunk.jsx';
import { Actions } from '../../reducers/user/Auth/authSlice.jsx';
import Footer from '../footer/footer.jsx';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));







export default function Navbar() {

  const [authUser, setAuthUser] = useState()
  const token = localStorage.getItem('token');
  const navigate= useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {
    async function handleUser() {
      try {
        const localuser = await dispatch(getUser()).unwrap();
        console.log('Login 78:', localuser.user);
        setAuthUser(localuser.user)

      } catch (error) {
        console.error('Login failed:', error);
        navigate('/');
      }
    }
    handleUser();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);





  const handleProfileMenuOpen = (event) => {
    if(authUser)
      {
        
        setAnchorEl(event.currentTarget);
      }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ width: 'auto', height: 'auto', top: '30px', left: '25px' }}

    >
      {token !== 'null' && authUser && authUser.usertype === 'user' &&
        <MenuItem onClick={handleMenuClose}><NavLink to={'/user/dashboard'}>Home</NavLink></MenuItem>
      }
      {authUser&&
        <MenuItem onClick={() => { dispatch(Actions.logout(), handleMenuClose()) }}><NavLink to={'/'}>Logout</NavLink></MenuItem>
      }

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  
  


  return (
    <Box  >

      <AppBar position="sticky" sx={{ boxShadow: "none", backgroundColor: "green" }}>
        <Toolbar>
          <Grid container sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between", alignItems: "center", }}>
            <Grid item xs={1} sm={1} sx={{ display: "flex", justifyContent: "center" }} >
              <Item square elevation={0} sx={{ display: { xs: 'flex', sm: "none", justifyContent: 'center', backgroundColor: 'green' } }}>

                <TemporaryDrawer />

              </Item>

              <Item square elevation={0} sx={{ display: { xs: 'none', sm: "block", backgroundColor: "transparent" } }}>
               
                  <img src={Applogo} style={{ width: '4rem' }} alt="App Logo" />
                

              </Item>
            </Grid>


            <Grid item xs={8} sx={{ display: "flex", flexWrap: 'nowrap', justifyContent: { xs: "space-evenly" }, alignItems: "center", }}>

              <Item square elevation={0} sx={{ display: { xs: 'none', md: 'block', backgroundColor: "transparent", color: "white" } }}>
                <IconButton
                  size="medium"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"

                >
                  <AccountCircle />
                 
                  <Typography variant="body2" sx={{ fontSize: '18px', }}>
                    {`${authUser && authUser.name ? authUser.name : "Login"}`}
                  </Typography>                
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Item>

              <Item square elevation={0} sx={{ display: { xs: 'none', sm: 'block', justifyContent: "center", backgroundColor: "green", color: "white" } }}>

                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"

                >

                  <NavLink to={`/${authUser && authUser.userType ? `${authUser.userType}/dashboard` : ''}`}  style={{ textDecoration: "none", display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center", color: "white" }}>


                    <Typography variant='body2' sx={{ fontSize: '16px', display: { sm: "none", md: "block" } }}>
                      Home
                    </Typography>
                  </NavLink>

                </IconButton>
              </Item>
              <Item square elevation={0} sx={{ display: { xs: 'none', md: 'block', justifyContent: "center", backgroundColor: "green", color: "white" } }}>

                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"

                >
                  <NavLink style={{ textDecoration: "none", display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center", color: "white" }}>


                    <Typography variant='body2' sx={{ fontSize: '16px', display: { sm: "none", md: "block" } }}>
                      Services
                    </Typography>
                  </NavLink>
                </IconButton>
              </Item>

              <Item square elevation={0} sx={{ display: { xs: 'none', md: 'block', justifyContent: "center", backgroundColor: "green", color: "white" } }}>

                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"

                >
                  <NavLink to={'/about'} style={{ textDecoration: "none", display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center", color: "white" }}>
                    <Typography variant='body2' sx={{ fontSize: '16px', display: { sm: "none", md: "block" } }}>
                      About
                    </Typography>
                  </NavLink>
                </IconButton>
              </Item>
              <Item square elevation={0} sx={{ display: { xs: 'none', sm: 'block', justifyContent: "center", backgroundColor: "green", color: "white" } }}>

                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"

                >
                  <NavLink to={'/contact-us'} style={{ textDecoration: "none", display: "flex", flexDirection: 'row', justifyContent: "center", alignItems: "center", color: "white" }}>
                    <Typography variant='body2' sx={{ fontSize: '16px', display: { sm: "none", md: "block" } }}>
                      Contact us
                    </Typography>
                  </NavLink>
                </IconButton>
              </Item>

            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}

      <Outlet />
      <Footer />
    </Box>
  );
}
