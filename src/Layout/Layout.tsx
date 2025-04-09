import React from 'react';
import TopBar from '../TopBar/TopBar';
import Nav from '../Nav/Nav';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import './Layout.css';

export default function Layout({ children }) {
    const drawerWidth = 160;
    const toolbarHeight = 64;
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: isDesktop ? `${drawerWidth}px` : "",
                    p: 1,
                }}
            >
                <TopBar />
                <div className='layout-children-container'>{children}</div>
                <Nav isDesktop={isDesktop} drawerWidth={drawerWidth} toolbarHeight={toolbarHeight} />
            </Box>
        </>
    );
};