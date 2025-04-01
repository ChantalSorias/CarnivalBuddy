import React from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function TopBar() {
    const [auth, setAuth] = React.useState(true);
    return (
        <Box>
            <AppBar>
                <Toolbar>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                    )}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Canival Buddy</Typography>
                    <IconButton
                        size="large"
                        aria-label="notifications"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <NotificationsIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}