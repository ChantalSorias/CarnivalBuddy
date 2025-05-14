import { useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { User } from '../Models/User';
import { countries, Country } from '../Models/Country';
import { getUser } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { useSnackbar } from '../context/SnackbarContext';

export default function ViewProfile() {
    const { showSnackbar } = useSnackbar();
    const { username } = useParams();
    const [user, setUser] = useState<User>();
    const [location, setLocation] = useState<Country | undefined>();
    const [background, setBackground] = useState<Country[]>();
    const [favouriteCarnivalDesination, setFavouriteCarnivalDesination] = useState<Country | undefined>();
    const { currentUser } = useAuth();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        if (!username) {
            console.error('Failed to fetch user: username is undefined');
            showSnackbar('Failed to fetch user: username is not defined', 'error');
            return;
        }

        try {
            var user = await getUser(username);
            setUser(user);
            setLocation(countries.find(c => c.code === user.location));
            setBackground(
                user.background
                .map(country => countries.find(c => c.code === country))
                .filter((c): c is Country => c !== undefined)
            );
            setFavouriteCarnivalDesination(countries.find(c => c.code === user.favouriteCarnivalDesination));
        } catch (error) {
            console.error('Failed to fetch user:', error);
            showSnackbar(error.response.data, 'error');
        }
    };

    return (
        <>
            <Layout>
                {!user ?
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
                        <Avatar sx={{ width: 100, height: 100 }} />
                    </Box>
                </Box> : 
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
                        <Avatar src={user?.image} sx={{ width: 100, height: 100, mr: 3 }} />
                        <Box>
                            <Typography variant="h5" sx={{ color: 'text.primary', fontWeight: 'bold' }}>{user?.username}</Typography>
                            <Typography variant="body1" sx={{ color: 'text.primary' }}>{location?.flag} {location?.name}</Typography>
                            {currentUser?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] === user?.id  && <Button variant='contained' component={Link} to={`/profile/edit`}>Edit Profile</Button>}
                        </Box>
                    </Box>
                    <Box>
                        <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                            {user?.profileImages.map((img, index) => (
                                <Grid key={index}>
                                    {img && 
                                    <img src={img ?? ""}
                                        alt={`Profile Image ${index}`}
                                        style={{ width: 250, height: 250, borderRadius: 20 }}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                          }}
                                    />
                                    }
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box>
                        <Grid container sx={{ display: 'flex', justifyContent: 'space-around', m: 3, height: '100%' }} rowSpacing={3}>
                            <Grid sx={{ textAlign: 'center', height: '100%' }}>
                                <Typography variant="overline" sx={{ color: 'primary.main' }}>Bio</Typography>
                                <Typography variant="body1" sx={{ color: 'text.primary', maxWidth: 500 }}>{user?.bio}</Typography>
                            </Grid>
                            <Grid container spacing={5} sx={{ height: '100%' }} direction="column">
                                <Grid>
                                    <Typography variant="overline" sx={{ color: 'primary.main' }}>Representing</Typography>
                                    {background?.map((country, index) => (
                                        <Typography key={index} variant="body1" sx={{ color: 'text.primary' }}>{country?.flag} {country?.name}</Typography>
                                    ))}
                                </Grid>
                                <Grid>
                                    <Typography variant="overline" sx={{ color: 'primary.main' }}>Favourite Song At The Moment</Typography>
                                    <Typography variant="body1" sx={{ color: 'text.primary' }}>🎵 {user?.favouriteSong.name} by {user?.favouriteSong.artist}</Typography>

                                </Grid>
                                { favouriteCarnivalDesination && <Grid>
                                    <Typography variant="overline" sx={{ color: 'primary.main' }}>Favourite Carnival Destination</Typography>
                                    <Typography variant="body1" sx={{ color: 'text.primary' }}>{favouriteCarnivalDesination?.flag} {favouriteCarnivalDesination?.name}</Typography>
                                </Grid>}
                            </Grid>

                        </Grid>
                    </Box>
                </Box>
                }
            </Layout>
        </>
    );
}