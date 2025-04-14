import { Autocomplete, Avatar, Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Layout from '../Layout/Layout';
import EditIcon from '@mui/icons-material/Edit';
import Resizer from 'react-image-file-resizer';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { countries } from '../Models/Country';
import SnackbarAlert from '../ReusableComponents/SnackBarAlert/SnackBarAlert';
import { User } from '../Models/User';

export default function CreateProfile() {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [imageUrl, setImageUrl] = useState<string>('');
    const [profileImages, setProfileImages] = useState<(string)[]>(['', '', '']);
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const countryOptions = Object.values(countries).map((country) => ({
        label: `${country.flag} ${country.name}`,
        code: country.code,
    }));

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [formData, setFormData] = useState<User>({
        image: null,
        username: '',
        location: '',
        background: [],
        favouriteSong: { name: '', artist: '' },
        favouriteCarnivalDesination: '',
        bio: '',
        profileImages: []
    });

    const [errors, setErrors] = useState({
        image: false,
        username: false,
        location: false,
        background: false,
        favouriteSong: { name: false, artist: false }
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            const file = files[0];
            if (fileSizeIsValid(file)) {
                setImageUrl(URL.createObjectURL(file));
                setFormData((prev) => ({ ...prev, image: file }));
            }
        } if (name.includes('.')) {
            const keys = name.split('.');
            setFormData(prev => ({
                ...prev,
                [keys[0]]: {
                    ...prev[keys[0]],
                    [keys[1]]: value,
                },
            }));
            // setErrors(prev => ({
            //     ...prev,
            //     [keys[0]]: {
            //         ...prev[keys[0]],
            //         [keys[1]]: false,
            //     },
            // }));
            setErrors(prev => ({ ...prev, [name]: false }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            setErrors(prev => ({ ...prev, [name]: false }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {
            image: !formData.image,
            username: !formData.username.trim(),
            location: !formData.location.trim(),
            background: formData.background.length === 0,
            favouriteSong: { name: !formData.favouriteSong.name.trim(), artist: !formData.favouriteSong.artist.trim() },
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(err => {
            if (typeof err === 'string') return !!err;
            if (typeof err === 'object' && err !== null) {
                return Object.values(err).some(nestedErr => !!nestedErr);
            }
            return false;
        });

        if (hasErrors) return;

        // Submit your form here
        console.log('Form submitted:', formData);
    };



    useEffect(() => {
        return () => {
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
            profileImages.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [imageUrl, profileImages]);

    const fileSizeIsValid = (file) => {
        if (file && file.size > 1.5 * 1024 * 1024) {
            setSnackbarMessage("File size is too large. Please select a file smaller than 1.5MB.");
            setOpenSnackBar(true);
            return false;
        }
        return true;
    }

    const handleImageChange = (index: number, file: File) => {
        if (fileSizeIsValid(file)) {
            const newImages = [...profileImages];
            newImages[index] = URL.createObjectURL(file);
            setProfileImages(newImages);
            setFormData(prev => ({ ...prev, profileImages: newImages }));
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = [...profileImages];
        if (newImages[index]) {
            URL.revokeObjectURL(newImages[index]!);
        }
        newImages[index] = '';
        setProfileImages(newImages);
        setFormData(prev => ({ ...prev, profileImages: newImages }));
    };

    const handlePlaceholderClick = (index: number) => {
        fileInputRefs.current[index]?.click();
    };

    const selectedCountryOptions = formData.background
        .map(code => countryOptions.find(opt => opt.code === code))
        .filter(Boolean);

    const handleCloseSnackbar = () => {
        setOpenSnackBar(false);
    };

    return (
        <>
            <Layout>
                <Grid component="form"
                    onSubmit={handleSubmit}
                    container
                    sx={{ p: 4, height: '100%', display: 'flex', justifyContent: 'space-around' }}
                >
                    <Grid size={{ md: 6, xs: 12 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                        <Typography variant="h4" sx={{ color: 'primary.main' }}>Create Your Account</Typography>
                        <Box>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>Upload a profile picture*</Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                    <Avatar src={imageUrl} sizes=''
                                        sx={{ width: 100, height: 100, border: errors.image && !imageUrl ? '2px solid red' : '2px solid transparent', }}
                                    />
                                    <IconButton
                                        size="small"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            right: 0,
                                            bgcolor: 'primary.main',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'secondary.main',
                                            },
                                        }}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    <input
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleChange}
                                        ref={fileInputRef}
                                        hidden
                                    />
                                </Box>
                            </Box>
                            <Typography variant='caption' color='error'>{errors.image ? 'Image is required' : ''}</Typography>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>What should we call you?*</Typography>
                            <Typography variant="caption" sx={{ color: 'text.primary' }}>A username that other users will see</Typography>
                            <TextField
                                variant="outlined"
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                error={errors.username}
                                helperText={errors.username ? 'Username is required' : ''}
                            />
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>Where do you live?*</Typography>
                            <Autocomplete
                                options={countryOptions}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Location"
                                        variant="outlined"
                                        error={errors.location}
                                        helperText={errors.location ? 'Location is required' : ''}
                                    />
                                )}
                                value={countryOptions.find(opt => opt.code === formData.location) || null}
                                onChange={(_, value) => {
                                    setFormData(prev => ({ ...prev, location: value ? value.code : '' }));
                                    setErrors((prev) => ({ ...prev, location: false }));
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>What countries do you represent?*</Typography>
                            <Typography variant="caption" sx={{ color: 'text.primary' }}>What is your cultural background? What flags do you wave?</Typography>
                            <Autocomplete
                                multiple
                                options={countryOptions}
                                getOptionLabel={(option) => option!.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Background"
                                        variant="outlined"
                                        error={errors.background}
                                        helperText={errors.background ? 'Background is required' : ''}
                                    />
                                )}
                                value={selectedCountryOptions || null}
                                onChange={(_, value) => {
                                    setFormData(prev => ({ ...prev, background: value.map(option => option!.code) }));
                                    setErrors((prev) => ({ ...prev, background: value.length === 0 }));
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>What song are you feeling right now?*</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <TextField
                                    sx={{ pr: 3 }}
                                    variant="outlined"
                                    label="Song Name"
                                    name="favouriteSong.name"
                                    value={formData.favouriteSong.name}
                                    onChange={handleChange}
                                    error={errors.favouriteSong.name}
                                    helperText={errors.favouriteSong.name ? 'Song name is required' : ''}
                                />
                                <TextField
                                    variant="outlined"
                                    label="Artist"
                                    name="favouriteSong.artist"
                                    value={formData.favouriteSong.artist}
                                    onChange={handleChange}
                                    error={errors.favouriteSong.artist}
                                    helperText={errors.favouriteSong.artist ? 'Artist is required' : ''}
                                />
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>Favourite carnival destination?</Typography>
                            <Autocomplete
                                options={countryOptions}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Destination"
                                        variant="outlined"
                                    />
                                )}
                                value={countryOptions.find(opt => opt.code === formData.favouriteCarnivalDesination) || null}
                                onChange={(_, value) => {
                                    setFormData(prev => ({ ...prev, favouriteCarnivalDesination: value ? value.code : '' }));
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>Tell us a little about yourself</Typography>
                            <TextField
                                variant="outlined"
                                multiline
                                rows={5}
                                label="Bio"
                                name='bio'
                                value={formData.bio}
                                onChange={handleChange}
                            />
                        </Box>
                    </Grid>
                    <Grid>
                        <Box sx={{ height: '100%' }}>
                            <Typography variant="h6" sx={{ color: 'text.primary' }}>Upload up to 3 additional images for your profile</Typography>
                            <Grid container sx={{ width: '100%', p: 3, display: 'flex', alignContent: 'center' }} spacing={4} direction="column">
                                {profileImages.map((img, index) => (
                                    <Grid
                                        key={index}
                                        sx={{
                                            width: 250,
                                            height: 250,
                                            border: '2px dashed #ccc',
                                            borderRadius: 2,
                                            position: 'relative',
                                            overflow: 'hidden',
                                            backgroundColor: '#f5f5f5',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {img ? (
                                            <Box>
                                                <img
                                                    src={img}
                                                    alt={`Profile Image ${index}`}
                                                    style={{ width: 250, height: 250 }}
                                                />
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 5,
                                                        right: 5,
                                                        backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                        zIndex: 2,
                                                    }}
                                                    onClick={() => handleRemoveImage(index)}
                                                >
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        ) : (
                                            <Box
                                                onClick={() => handlePlaceholderClick(index)}
                                                sx={{
                                                    width: '100%',
                                                    height: '100%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#aaa',
                                                }}
                                            >
                                                <AddIcon fontSize="large" />
                                            </Box>
                                        )}

                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            ref={(el) => {
                                                fileInputRefs.current[index] = el;
                                            }}
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) handleImageChange(index, file);
                                            }}
                                        />

                                    </Grid>
                                ))}

                            </Grid>
                            <Button variant='contained' type="submit" sx={{ width: '100%' }}>Submit</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Layout>

            <SnackbarAlert open={openSnackBar} handleClose={handleCloseSnackbar} message={snackbarMessage} severity="error" />
        </>
    )
}