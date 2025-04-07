import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './TopBar.css';

export default function TopBar() {
    const [auth, setAuth] = React.useState(true);
    return (
        <Box sx={{ pt: 4 }}>
            <AppBar position="fixed" className='topbar-appbar'>
                <Toolbar className='topbar-toolbar'>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    )}
                    <Typography variant="h6" component="div">Carnival Buddy</Typography>
                    <IconButton
                        size="large"
                        aria-label="notifications"
                        color="inherit"
                    >
                        <NotificationsIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}