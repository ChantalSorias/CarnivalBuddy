import React from 'react';
import { AppBar, Avatar, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './TopBar.css';
import { GENERAL } from '../constants/general';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TopBar() {
    const { currentUser: user, setCurrentUser: setUser } = useAuth();

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };
    
    return (
        <Box sx={{ pt: 9 }}>
            <AppBar position="fixed" className='topbar-appbar'>
                <Toolbar className='topbar-toolbar'>
                    <Typography variant="h6" component="div">{GENERAL.APP_NAME}</Typography>
                    <div>
                        {user && (
                            <>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    color="inherit"
                                >
                                    
                                    <Avatar src={user.image} component={Link} href={`/profile/${user.username}`} />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="notifications"
                                    color="inherit"
                                >
                                    <NotificationsIcon />
                                </IconButton>
                                <Button onClick={handleLogout} sx={{ color: 'white' }}>Log Out</Button>
                            </>
                        )}
                        {!user && (
                            <Button component={Link} href="/login" sx={{ color: 'white' }}>Log In</Button>
                        )}

                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}