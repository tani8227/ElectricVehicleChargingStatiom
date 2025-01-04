import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../reducers/user/Auth/authThunks/getUserThunk';
import { Actions } from '../../reducers/user/Auth/authSlice';
import { Link } from 'react-router-dom';









export default function TemporaryDrawer() {


    const [open, setOpen] = useState(false);
    const [authUser, setAuthUser] = useState()
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
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


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: '100%' }} role="presentation" onClick={toggleDrawer(false)}>
            <List sx={{ minWidth: '150px' }}>
                {['user','home','logout',].map((text, index) => (
                    text === authUser?.userType ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', gap: '2px' }} key={text + index}>
                            <ListItem disablePadding>
                                {authUser&&authUser&& <AccountCircle />}
                                <ListItemText
                                    primary={
                                        `${authUser?authUser.name:''}`
                                    }
                                />
                            </ListItem>
                        </Box>

                    ) : text === 'logout'&&authUser ? (
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '10px', width: '100%' }} key={text + index}>
                            <ListItem disablePadding>
                                <Link to={'/'} style={{ textDecoration: "none", color: "black" }}>
                                    <ListItemText
                                        onClick={() => { dispatch(Actions.logout()) }}
                                        primary={ 'logout'}
                                    />
                                </Link>
                            </ListItem>
                        </Box>
                    ) : text ===  'home' ?(
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '10px', width: '100%' }} key={text + index}>
                            <ListItem disablePadding>
                                <Link to={'/'} style={{ textDecoration: "none", color: "black" }}>
                                    <ListItemText
                                        primary={'home'}
                                    />
                                </Link>
                            </ListItem>
                        </Box>
                    ) : null
                ))}
            </List>
        </Box>
    );


    return (
        <>

            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                sx={{ display: { sm: 'none' } }}
            >
                <MenuIcon />

            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>

    );
}

