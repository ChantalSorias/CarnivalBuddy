import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav({ isDesktop, drawerWidth, toolbarHeight }) {

  const navItems = [
    { label: 'Home', icon: <HomeIcon />, route: "/" },
    { label: 'Feed', icon: <FeedIcon />, route: "/feed" },
    { label: 'Chats', icon: <ChatIcon />, route: "/" }
  ];

  const adminItems = [
    { label: 'Carnivals', icon: <AdminPanelSettingsIcon />, route: "/admin/carnivals" },
  ];

  const getDrawerNavigation = () => {

    const getListItem = (item) => {
      return (
        <ListItem key={item.label}>
          <ListItemButton
            component={Link}
            to={item.route}
            sx={{
              '&:hover, &:focus': {
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: 'secondary.main',
                },
              },
            }}>
            <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} sx={{ color: 'primary.main' }} />
          </ListItemButton>
        </ListItem>
      );
    }

    return (
      <Drawer variant="permanent" anchor="left" sx={{
        width: drawerWidth, flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          top: toolbarHeight,
          height: `calc(100% - ${toolbarHeight}px)`,
        },
      }}>
        <List>
          {navItems.map((item, index) => (
            getListItem(item)
          ))}
        </List>
        <Divider />
        <Typography sx={{textAlign: 'center', color: 'primary.main', mt: 2}} variant='h6'>Admin</Typography>
        {adminItems.map((item, index) => (
          getListItem(item)
        ))}
      </Drawer>
    );
  }

  const getBottomNavigation = () => {

    const getIconButton = (item) => {
      return (
        <IconButton key={item.label} color="inherit" component={Link} to={item.route}>
          {item.icon}
        </IconButton>
      );
    }

    return (
      <Box sx={{ pb: 8 }}>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }} className='bottom-nav-appbar'>
          <Toolbar className='bottom-nav-toolbar'>
            {navItems.map((item, index) => (
              getIconButton(item)
            ))}
            {adminItems.map((item, index) => (
              getIconButton(item)
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