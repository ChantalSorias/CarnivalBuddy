import React from 'react';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import './BottomNav.css';

export default function BottomNav() {
  return (
    <Box sx={{ pb: 8 }}>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }} className='bottom-nav-appbar'>
        <Toolbar className='bottom-nav-toolbar'>
          <IconButton color="inherit">
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit">
            <FeedIcon />
          </IconButton>
          <IconButton color="inherit">
            <ChatIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}