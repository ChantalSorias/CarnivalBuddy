import React, { useRef } from 'react';
import Layout from '../Layout/Layout';
import Post from './Post/Post';
import { Avatar, Box, Button, Card, CardActions, Grid, IconButton, InputBase, List, ListItem, useMediaQuery, useTheme } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import posts from './Post/postsJson.json';
import './Feed.css';

export default function Feed() {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleSelectImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!fileInputRef || !fileInputRef.current) return;

        fileInputRef.current.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Selected file:', file.name);
            // You can handle uploading or previewing here
        }
    };
    return (
        <Layout>
            <Box className="feed-container">
            <Grid container spacing={4} sx={{ pt: 2 }} direction="column">
                <Grid size={12}>
                    <Card className='feed-add-post'>
                        <CardActions className='post-comment'>
                            <Avatar aria-label="user image" />
                            <InputBase
                                placeholder="Share a post..."
                                multiline
                                maxRows={4}
                                className='feed-add-post-input-field'
                                size="small"
                                sx={{ p: 0.5 }}
                                inputProps={{ 'aria-label': 'add a post' }}
                            />
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <IconButton aria-label="add to favorites" onClick={() => fileInputRef.current?.click()}>
                                <ImageOutlinedIcon />
                            </IconButton>

                            <Button aria-label="add a post" color="secondary" variant='contained' sx={{ color: 'white', pr: 3, pl: 3 }}>
                                Post
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

                {posts.map((post, index) => (
                    <Grid key={index}>
                        <Post content={post} />
                    </Grid>
                ))}
            </Grid>
            </Box>
        </Layout>
    );
}