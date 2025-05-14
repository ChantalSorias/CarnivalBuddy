import { useEffect, useState } from 'react';
import 'react-multi-carousel/lib/styles.css';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import CarnivalCard from './CarnivalCard/CarnivalCard';
import { Carnival } from '../Models/Carnival';
import './CarnivalList.css';

export default function CarnivalList({ carnivals, handleLikeToggle }) {
    const [nextCarnival, setNextCarnival] = useState<Carnival | undefined>(undefined);
    const [upcomingCarnivals, setUpcomingCarnivals] = useState<Carnival[] | undefined>(undefined);
    const [pastCarnivals, setPastCarnivals] = useState<Carnival[] | undefined>(undefined);

    const SPLICED_LIST_LENGTH = 4;
    const [showAllUpcoming, setShowAllUpcoming] = useState(false);
    const upcomingCarnivalsToDisplay = showAllUpcoming ? upcomingCarnivals : upcomingCarnivals?.slice(0, SPLICED_LIST_LENGTH);

    const [showAllPrevious, setShowAllPrevious] = useState(false);
    const previousCarnivalsToDisplay = showAllPrevious ? pastCarnivals : pastCarnivals?.slice(0, SPLICED_LIST_LENGTH);

    useEffect(() => {
        sortCarnivals(carnivals);
    }, [carnivals]);

    const sortCarnivals = (carnivalList: Carnival[]) => {
        const currentDate = new Date();

        var futureCarnivals: Carnival[] = [];
        var previousCarnivals: Carnival[] = [];

        carnivalList.forEach(carnival => {
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

    if (upcomingCarnivals === undefined || pastCarnivals === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {nextCarnival && <div className='carnival-list-next-container'>
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
                                <CarnivalCard content={nextCarnival} handleLikeToggle={handleLikeToggle} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </div>}
            {upcomingCarnivals.length > 0 && <Box className='carnival-list-upcoming-container'
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
                <Grid container spacing={3}>
                    {upcomingCarnivalsToDisplay?.map((c, index) => (
                        <Grid key={index}>
                            <CarnivalCard content={c} handleLikeToggle={handleLikeToggle} />
                        </Grid>
                    ))}
                </Grid>
                {!showAllUpcoming && upcomingCarnivals.length > SPLICED_LIST_LENGTH && (
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
            </Box>}
            {pastCarnivals.length > 0 && <Box className='carnival-list-upcoming-container'
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
                            <CarnivalCard content={c} handleLikeToggle={handleLikeToggle} />
                        </Grid>
                    ))}
                </Grid>
                {!showAllPrevious && pastCarnivals.length > SPLICED_LIST_LENGTH && (
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
            </Box>}
        </div>
    )
}