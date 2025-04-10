import React, { useMemo, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import CarnivalCard from './CarnivalCard/CarnivalCard';
import carnivalListData from './CarnivalListData.json';
import { Carnival } from '../Models/Carnival';
import './CarnivalList.css';

export default function CarnivalList({ likedOnly }) {
    const [nextCarnival, setNextCarnival] = useState<Carnival | undefined>(undefined);
    const [upcomingCarnivals, setUpcomingCarnivals] = useState<Carnival[] | undefined>(undefined);
    const [pastCarnivals, setPastCarnivals] = useState<Carnival[] | undefined>(undefined);

    const splicedListLength = 4;
    const [showAllUpcoming, setShowAllUpcoming] = useState(false);
    const upcomingCarnivalsToDisplay = showAllUpcoming ? upcomingCarnivals : upcomingCarnivals?.slice(0, splicedListLength);

    const [showAllPrevious, setShowAllPrevious] = useState(false);
    const previousCarnivalsToDisplay = showAllPrevious ? pastCarnivals : pastCarnivals?.slice(0, splicedListLength);

    React.useEffect(() => {
        sortCarnivals(carnivalListData);
    }, []);

    const sortCarnivals = (carnivals) => {
        const currentDate = new Date();

        var futureCarnivals: Carnival[] = [];
        var previousCarnivals: Carnival[] = [];

        carnivals.forEach(carnival => {
            const paradeDate = new Date(carnival.paradeDates[0]);
            if (paradeDate >= currentDate) {
                futureCarnivals.push(carnival);
            } else {
                previousCarnivals.push(carnival);
            }
        });

        futureCarnivals.sort((a, b) => new Date(a.paradeDates[0]).getTime() - new Date(b.paradeDates[0]).getTime());

        const upcomingCarnival = futureCarnivals.shift();

        setNextCarnival(upcomingCarnival);
        setUpcomingCarnivals(futureCarnivals);
        setPastCarnivals(previousCarnivals);
    };

    // const carouselResponsiveInputs = {
    //     largeDesktop: {
    //         breakpoint: { max: 4000, min: 3000 },
    //         items: 6
    //     },
    //     desktop: {
    //         breakpoint: { max: 3000, min: 1024 },
    //         items: 4
    //     },
    //     tablet: {
    //         breakpoint: { max: 1024, min: 464 },
    //         items: 2
    //     },
    //     mobile: {
    //         breakpoint: { max: 464, min: 0 },
    //         items: 1
    //     }
    // };

    if (nextCarnival === undefined || upcomingCarnivals === undefined || pastCarnivals === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='carnival-list-next-container'>
                <Box className='carnival-list-box'>
                    <Paper
                        elevation={6}
                        sx={{
                            backgroundColor: 'secondary.main',
                            p: 1,
                            borderRadius: 2,
                            boxShadow: 4,
                            mt: 1
                        }}
                    >
                        <Grid container className='carnival-list-grid'>
                            <Grid className='carnival-list-grid-item'>
                                <Typography variant="h4" component="div" sx={{ color: 'white' }}>Next Carnival...</Typography>
                            </Grid>
                            <Box sx={{ mr: 2, ml: 2, mb: 1 }}></Box>
                            <Grid>
                                <CarnivalCard content={nextCarnival} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </div>
            <Box className='carnival-list-upcoming-container'
                sx={{
                    borderTop: 1,
                    borderColor: 'primary.main',
                    pb: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <div>
                    <Typography sx={{ fontWeight: 'bold' }} variant="h4" component="div" color='primary' className='carnival-list-all-title'>Upcoming Carnivals</Typography>
                </div>
                {/* <Carousel responsive={carouselResponsiveInputs}>
                    {upcomingCarnivals.map((c) => {
                        return (
                            <CarnivalCard content={c} />
                        );
                    })}
                </Carousel> */}
                <Grid container spacing={3}>
                    {upcomingCarnivalsToDisplay?.map((c, index) => (
                        <Grid key={index}>
                            <CarnivalCard content={c} />
                        </Grid>
                    ))}
                </Grid>
                {!showAllUpcoming && upcomingCarnivals.length > splicedListLength && (
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => setShowAllUpcoming(true)}
                        sx={{ marginTop: 2, float: 'right' }}
                    >
                        View All
                    </Button>
                )}
                {showAllUpcoming && (
                    <Button
                        variant="text"
                        color="secondary"
                        onClick={() => setShowAllUpcoming(false)}
                        sx={{ marginTop: 2, float: 'right' }}
                    >
                        Show Less
                    </Button>
                )}
            </Box>
            <Box className='carnival-list-upcoming-container'
                sx={{
                    borderTop: 1,
                    borderColor: 'primary.main',
                    pb: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <div>
                    <Typography sx={{ fontWeight: 'bold' }} variant="h4" component="div" color='primary' className='carnival-list-all-title'>Past Carnivals</Typography>
                </div>
                <Grid container spacing={1}>
                    {previousCarnivalsToDisplay?.map((c, index) => (
                        <Grid key={index}>
                            <CarnivalCard content={c} />
                        </Grid>
                    ))}
                </Grid>
                {!showAllPrevious && pastCarnivals.length > splicedListLength && (
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => setShowAllPrevious(true)}
                        sx={{ marginTop: 2, float: 'right' }}
                    >
                        View All
                    </Button>
                )}
                {showAllPrevious && (
                    <Button
                        variant="text"
                        color="secondary"
                        onClick={() => setShowAllPrevious(false)}
                        sx={{ marginTop: 2, float: 'right' }}
                    >
                        Show Less
                    </Button>
                )}
            </Box>
        </div>
    )
}