import React from 'react';
import TopBar from '../TopBar/TopBar';
import Nav from '../Nav/Nav';
import { Box, useMediaQuery, useTheme } from '@mui/material';

export default function Layout({ children }) {
    const drawerWidth = 130;
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    ml: isDesktop ? `${drawerWidth}px` : "",
                    p: 3,
                }}
            >
                <TopBar />
                {children}
                <Nav isDesktop={isDesktop} drawerWidth={drawerWidth} />
            </Box>
        </>
    );
};