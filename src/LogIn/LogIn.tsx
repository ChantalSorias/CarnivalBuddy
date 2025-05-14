import Layout from '../Layout/Layout';
import { Button, Grid, Typography } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { GENERAL } from '../constants/general';
import { useNavigate } from 'react-router-dom';
import { getUserByGoogleId } from '../services/userService';
import { DecodedToken, useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from '../context/SnackbarContext';

export default function LogIn() {

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
                        <GoogleSignUpButton />
                    </Grid>

                </Grid>
            </Layout>
        </>
    )
}

export const GoogleLoginButton = () => {
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { setCurrentUser } = useAuth();

    const login = useGoogleLogin({
        onSuccess: async credentialResponse => {
            try {
                const googleProfile = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${credentialResponse.access_token}` }
                })
                .then(res => res.json());
                
                var userData = await getUserByGoogleId(googleProfile.sub);
                var token = userData.token;

                localStorage.setItem('token', token);
                const decoded: DecodedToken = jwtDecode(token);
                setCurrentUser(decoded);
                navigate('/');
            } catch (error) {
                console.log('Login Failed: ', error);
                showSnackbar('Login Failed', 'error');
            }
        },
        onError: () => {
            console.log('Login Failed');
            showSnackbar('Login Failed', 'error');
        }
    })

    return (
        <Button variant='contained' onClick={() => login()}>Login With Google</Button>
    )
}

export const GoogleSignUpButton = () => {
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const signup = useGoogleLogin({
        onSuccess: async credentialResponse => {
            try {
                const googleProfile = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${credentialResponse.access_token}` }
                })
                .then(res => res.json());
                
                const googleUser = {
                    sub: googleProfile.sub,
                    email: googleProfile.email,
                    name: googleProfile.name
                };
                localStorage.setItem("googleUser", JSON.stringify(googleUser));
                navigate('/signup');
            } catch (error) {
                console.log('Sign Up Failed: ', error);
                showSnackbar('Sign Up Failed', 'error');
            }
        },
        onError: () => {
            console.log('Sign Up Failed');
            showSnackbar('Sign Up Failed', 'error');
        }
    })

    return (
        <Button variant='outlined' onClick={() => signup()}>Sign Up With Google</Button>
    )
}