import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import { Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { GENERAL } from '../constants/general';
import { useNavigate } from 'react-router-dom';


export default function LogIn() {
    const [user, setUser] = useState();
    const navigate = useNavigate();


    const handleLogin = async (user) => {
        try {
            const res = await axios.post('/users', user);
            setUser(res.data);
            console.log(user);
        } catch (error) {
            console.error('Failed to login:', error);
        }
    };

    return (
        <>
            <Layout>
                <Grid container sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                    <Grid size={{ md: 8, }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', bgcolor: 'secondary.main' }}>
                        <Typography variant="h3" sx={{ p: 3, fontWeight: 'bold' }}>Welcome to {GENERAL.APP_NAME}</Typography>
                    </Grid>
                    <Grid size={{ md: 4 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                        <Typography variant="h4" sx={{ color: 'primary.main', pb: 3 }}>Log in to Your Account</Typography>
                        <GoogleLoginButton />
                        <Typography variant="body1" sx={{ pt: 8 }}>Don't have an account?</Typography>
                        <Button variant='outlined' onClick={() => navigate('/signup')}>Sign Up</Button>
                        {/* <GoogleSignUpButton /> */}
                    </Grid>

                </Grid>
            </Layout>
        </>
    )
}

export const GoogleLoginButton = () => {
    const login = useGoogleLogin({
        onSuccess: credentialResponse => {
            console.log(credentialResponse); // contains JWT token
            // send token to backend to verify and save to MongoDB
        },
        onError: () => {
            console.log('Login Failed');
        }
    })

    return (
        <Button variant='contained'>Login With Google</Button>
    )
}

export const GoogleSignUpButton = () => {
    const navigate = useNavigate();
    navigate('/signup');
    // const login = useGoogleLogin({
    //     onSuccess: credentialResponse => {
    //         console.log(credentialResponse); // contains JWT token
    //         // send token to your backend to verify and save to MongoDB
    //         navigate('/signup');
    //     },
    //     onError: () => {
    //         console.log('Sign up Failed');
    //     }
    // })

    return (
        <Button variant='outlined'>Sign Up With Google</Button>
    )
}