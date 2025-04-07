import React, { useMemo } from 'react';
import carnivalListData from '../CarnivalList/CarnivalListData.json';
import { Box, Grid } from '@mui/material';
import CarnivalCard from '../CarnivalList/CarnivalCard/CarnivalCard';
import './FavouriteCarnivalList.css';

export default function FavouriteCarnivalList() {
    const sortedCarnivals = useMemo(() => {
        return carnivalListData
            .filter(carnival => carnival.liked)
            .sort((a, b) => new Date(a.paradeDates[0]).getTime() - new Date(b.paradeDates[0]).getTime());
    }, []);

    return (
        <div className='fav-carnival-list-container'>
            <Box className='fav-carnival-list-box' sx={{ flexGrow: 1 }} >
                <Grid container spacing={1}>
                    {sortedCarnivals.map((c, index) => (
                        <Grid key={index}>
                            <CarnivalCard content={c} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}