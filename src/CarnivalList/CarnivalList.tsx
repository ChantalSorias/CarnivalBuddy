import React, { useMemo, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, Grid, Paper, Typography } from '@mui/material';
import CarnivalCard from './CarnivalCard/CarnivalCard';
import carnivalListData from './CarnivalListData.json';
import './CarnivalList.css';

export default function CarnivalList({ likedOnly }) {
    const sortedCarnivals = useMemo(() => {
        let filteredList = likedOnly
            ? carnivalListData.filter(carnival => carnival.liked)
            : [...carnivalListData];

        return filteredList.sort(
            (a, b) => new Date(a.paradeDates[0]).getTime() - new Date(b.paradeDates[0]).getTime()
        );
    }, [likedOnly]);

    const [firstCarnival, ...upcomingCarnivals] = sortedCarnivals;

    const carouselResponsiveInputs = {
        largeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 6
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    return (
        <div>
            <div className='carnival-list-upcoming-container'>
                <Box className='carnival-list-box'>
                    <Paper
                        elevation={6}
                        sx={{
                            backgroundColor: 'secondary.main',
                            p: 3,
                            borderRadius: 2,
                            boxShadow: 4,
                            mt: 3
                        }}
                    >
                        <Grid container className='carnival-list-grid'>
                            <Grid className='carnival-list-grid-item'>
                                <Typography variant="h4" component="div" sx={{ color: 'white' }}>Upcoming Carnival...</Typography>
                            </Grid>
                            <Box sx={{ mr: 3, ml: 3, mb: 1 }}></Box>
                            <Grid>
                                <CarnivalCard content={firstCarnival} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </div>
            <div className='carnival-list-all-container'>
                <div>
                    <Typography variant="h4" component="div" className='carnival-list-all-title'>All Carnivals</Typography>
                </div>
                <Carousel responsive={carouselResponsiveInputs}>
                    {upcomingCarnivals.map((c) => {
                        return (
                            <CarnivalCard content={c} />
                        );
                    })}
                </Carousel>
            </div>
        </div>
    )
}