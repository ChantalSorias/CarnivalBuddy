import React from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import './Nav.css';

export default function Nav({ isDesktop, drawerWidth }) {

  const navItems = [
    { label: 'Home', icon: <HomeIcon /> },
    { label: 'Feed', icon: <FeedIcon /> },
    { label: 'Chats', icon: <ChatIcon /> }
  ];

  const getDrawerNavigation = () => {
    return (
      <Drawer variant="permanent" anchor="left" sx={{ width: drawerWidth }}>
        <List>
          {navItems.map((item, index) => (
            <ListItem key={item.label}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }

  const getBottomNavigation = () => {
    return (
      <Box sx={{ pb: 5 }}>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }} className='bottom-nav-appbar'>
          <Toolbar className='bottom-nav-toolbar'>
            {navItems.map((item, index) => (
              <IconButton key={item.label} color="inherit">
                {item.icon}
              </IconButton>
            ))}
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  return (
    <div>
      {isDesktop ? getDrawerNavigation() : getBottomNavigation()}
    </div>
  );
}