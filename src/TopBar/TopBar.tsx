import React from 'react';
import { AppBar, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './TopBar.css';
import { GENERAL } from '../constants/general';

export default function TopBar() {
    const [auth, setAuth] = React.useState(false);
    return (
        <Box sx={{ pt: 6 }}>
            <AppBar position="fixed" className='topbar-appbar'>
                <Toolbar className='topbar-toolbar'>
                    <Typography variant="h6" component="div">{GENERAL.APP_NAME}</Typography>
                    <div>
                        {auth && (
                            <>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    aria-label="notifications"
                                    color="inherit"
                                >
                                    <NotificationsIcon />
                                </IconButton>
                            </>
                        )}
                        {!auth && (
                            <Button component={Link} href="/login" sx={{ color: 'white' }}>Log In</Button>
                        )}

                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}