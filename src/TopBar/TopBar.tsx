import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './TopBar.css';

export default function TopBar() {
    const [auth, setAuth] = React.useState(true);
    return (
        <Box sx={{ pt: 6 }}>
            <AppBar position="fixed" className='topbar-appbar'>
                <Toolbar className='topbar-toolbar'>
                    <Typography variant="h6" component="div">Carnival Buddy</Typography>
                    <div>
                        {auth && (
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        )}
                        <IconButton
                            size="large"
                            aria-label="notifications"
                            color="inherit"
                        >
                            <NotificationsIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}