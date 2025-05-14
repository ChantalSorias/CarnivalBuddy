import { useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import CarnivalCard from '../CarnivalList/CarnivalCard/CarnivalCard';
import './FavouriteCarnivalList.css';

export default function FavouriteCarnivalList({ carnivals, handleLikeToggle }) {

    const sortedCarnivals = useMemo(() => {
        return carnivals
            .filter(carnival => carnival.liked)
            .sort((a, b) => new Date(a.paradeDates[0]).getTime() - new Date(b.paradeDates[0]).getTime());
    }, [carnivals]);

    if (sortedCarnivals.length === 0) {
        return (
            <div>You have no favourites.</div>
        )
    }

    return (
        <div className='fav-carnival-list-container'>
            <Box className='fav-carnival-list-box' sx={{ flexGrow: 1 }} >
                <Grid container spacing={1}>
                    {sortedCarnivals.map((c, index) => (
                        <Grid key={index}>
                            <CarnivalCard content={c} handleLikeToggle={handleLikeToggle} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}