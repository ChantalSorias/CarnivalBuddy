import TopBar from '../TopBar/TopBar';
import Nav from '../Nav/Nav';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import './Layout.css';

export default function Layout({ children }) {
    const drawerWidth = 200;
    const toolbarHeight = 64;
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <>
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: isDesktop ? `${drawerWidth}px` : "",
                    height: '100vh',
                }}
            >
                <TopBar />
                <Box className='layout-children-container' sx={{ flexGrow: 1, overflow: 'auto', p: 0 }}>{children}</Box>
                <Nav isDesktop={isDesktop} drawerWidth={drawerWidth} toolbarHeight={toolbarHeight} />
            </Box>
        </>
    );
};